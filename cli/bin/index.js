#!/usr/bin/env node

import { execSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { cancel, confirm, intro, isCancel, outro, select, spinner, text } from '@clack/prompts';
import pc from 'picocolors';

function handleCancel(value) {
  if (isCancel(value)) {
    cancel('Operação cancelada.');
    process.exit(0);
  }
}

async function init() {
  intro(pc.cyan(pc.bold(' Nexus App CLI ')));

  const projectName = await text({
    message: 'Qual é o nome do seu projeto?',
    placeholder: 'my-nexus-app',
    initialValue: 'my-nexus-app',
    validate(value) {
      if (value.trim().length === 0) return 'O nome do projeto não pode ser vazio!';
    }
  });
  handleCancel(projectName);

  const useI18n = await confirm({
    message: 'Deseja configurar suporte a múltiplos idiomas (i18n)?',
    initialValue: true
  });
  handleCancel(useI18n);

  const useDocker = await confirm({
    message: 'Deseja incluir suporte a Docker (Dockerfile/Compose)?',
    initialValue: true
  });
  handleCancel(useDocker);

  const useGithubActions = await confirm({
    message: 'Deseja incluir automações de CI/CD do GitHub Actions?',
    initialValue: true
  });
  handleCancel(useGithubActions);

  const useReactQuery = await confirm({
    message: 'Deseja configurar o TanStack Query (React Query) e Devtools?',
    initialValue: true
  });
  handleCancel(useReactQuery);

  const setupAi = await confirm({
    message: 'Deseja configurar regras de IA para assistentes (setup-ai)?',
    initialValue: true
  });
  handleCancel(setupAi);

  const packageManager = await select({
    message: 'Qual gerenciador de pacotes você deseja usar?',
    options: [
      { label: 'pnpm', value: 'pnpm' },
      { label: 'npm', value: 'npm' },
      { label: 'yarn', value: 'yarn' },
      { label: 'bun', value: 'bun' }
    ],
    initialValue: 'pnpm'
  });
  handleCancel(packageManager);

  const installDeps = await confirm({
    message: 'Deseja instalar as dependências agora?',
    initialValue: true
  });
  handleCancel(installDeps);

  const targetDir = join(process.cwd(), projectName);

  if (existsSync(targetDir)) {
    cancel(`Erro: O diretório "${projectName}" já existe.`);
    process.exit(1);
  }

  const s = spinner();

  try {
    s.start('Clonando o repositório do Nexus...');
    const REPO_URL = 'https://github.com/gui-bus/Nexus.git';
    execSync(`git clone --depth 1 ${REPO_URL} "${targetDir}"`, { stdio: 'ignore' });
    s.stop('Repositório clonado com sucesso.');

    const gitFolder = join(targetDir, '.git');
    const rmCommand = process.platform === 'win32' ? `rmdir /s /q "${gitFolder}"` : `rm -rf "${gitFolder}"`;
    execSync(rmCommand);

    const cleanupCmdMap = {
      pnpm: 'pnpm cleanup',
      npm: 'npm run cleanup',
      yarn: 'yarn cleanup',
      bun: 'bun cleanup'
    };
    const targetCleanupCmd = cleanupCmdMap[packageManager] || 'pnpm cleanup';

    if (targetCleanupCmd !== 'pnpm cleanup') {
      s.start('Configurando comandos do gerenciador de pacotes selecionado...');
      const filesToReplace = [
        join(targetDir, 'src', 'app', '[locale]', 'page.tsx'),
        join(targetDir, '.nexus-no-i18n', 'page.tsx'),
        join(targetDir, 'messages', 'pt.json'),
        join(targetDir, 'messages', 'en.json'),
      ];

      for (const file of filesToReplace) {
        if (existsSync(file)) {
          const content = readFileSync(file, 'utf8');
          const updated = content.replace(/pnpm cleanup/g, targetCleanupCmd);
          writeFileSync(file, updated, 'utf8');
        }
      }
      s.stop('Comandos configurados.');
    }

    if (!useI18n) {
      s.start('Removendo configurações de i18n (next-intl)...');

      const backupDir = join(targetDir, '.nexus-no-i18n');
      const appDir = join(targetDir, 'src', 'app');

      copyFileSync(join(backupDir, 'next.config.mjs'), join(targetDir, 'next.config.mjs'));
      copyFileSync(join(backupDir, 'layout.tsx'), join(appDir, 'layout.tsx'));
      copyFileSync(join(backupDir, 'page.tsx'), join(appDir, 'page.tsx'));
      copyFileSync(join(backupDir, 'error.tsx'), join(appDir, 'error.tsx'));
      copyFileSync(join(backupDir, 'not-found.tsx'), join(appDir, 'not-found.tsx'));

      const pkJsonPath = join(targetDir, 'package.json');
      const pkJson = JSON.parse(readFileSync(pkJsonPath, 'utf8'));
      if (pkJson.dependencies && pkJson.dependencies['next-intl']) {
        delete pkJson.dependencies['next-intl'];
      }
      writeFileSync(pkJsonPath, JSON.stringify(pkJson, null, 2), 'utf8');

      rmSync(join(targetDir, 'messages'), { recursive: true, force: true });
      rmSync(join(targetDir, 'src', 'i18n'), { recursive: true, force: true });
      rmSync(join(targetDir, 'src', 'app', '[locale]'), { recursive: true, force: true });
      
      const langSwitcher = join(targetDir, 'src', 'components', 'common', 'languageSwitcher.tsx');
      if (existsSync(langSwitcher)) {
        rmSync(langSwitcher, { force: true });
      }

      const proxyFile = join(targetDir, 'src', 'proxy.ts');
      if (existsSync(proxyFile)) {
        rmSync(proxyFile, { force: true });
      }
      s.stop('Configurações de i18n removidas.');
    }

    const backupFolder = join(targetDir, '.nexus-no-i18n');
    if (existsSync(backupFolder)) {
      rmSync(backupFolder, { recursive: true, force: true });
    }

    if (!useDocker) {
      s.start('Removendo suporte a Docker...');
      const dockerfiles = [
        join(targetDir, 'Dockerfile'),
        join(targetDir, '.dockerignore'),
        join(targetDir, 'docker-compose.yml')
      ];
      for (const file of dockerfiles) {
        if (existsSync(file)) {
          rmSync(file, { force: true });
        }
      }
      s.stop('Suporte a Docker removido.');
    }

    if (!useGithubActions) {
      s.start('Removendo fluxos de trabalho do GitHub Actions...');
      const githubFolder = join(targetDir, '.github');
      if (existsSync(githubFolder)) {
        rmSync(githubFolder, { recursive: true, force: true });
      }
      s.stop('Fluxos do GitHub Actions removidos.');
    }

    if (!useReactQuery) {
      s.start('Removendo TanStack Query (React Query) e Devtools...');
      const providerFile = join(targetDir, 'src', 'lib', 'query-provider.tsx');
      if (existsSync(providerFile)) {
        rmSync(providerFile, { force: true });
      }

      const pkJsonPath = join(targetDir, 'package.json');
      const pkJson = JSON.parse(readFileSync(pkJsonPath, 'utf8'));
      if (pkJson.dependencies) {
        if (pkJson.dependencies['@tanstack/react-query']) {
          delete pkJson.dependencies['@tanstack/react-query'];
        }
        if (pkJson.dependencies['@tanstack/react-query-devtools']) {
          delete pkJson.dependencies['@tanstack/react-query-devtools'];
        }
      }
      writeFileSync(pkJsonPath, JSON.stringify(pkJson, null, 2), 'utf8');
      s.stop('TanStack Query e Devtools removidos.');
    }

    if (packageManager !== 'pnpm') {
      const lockfile = join(targetDir, 'pnpm-lock.yaml');
      if (existsSync(lockfile)) {
        rmSync(lockfile, { force: true });
      }
    }

    if (installDeps) {
      console.log(pc.green(`\nInstalando dependências usando o ${packageManager}...`));
      const installCommand = `${packageManager} install`;
      execSync(installCommand, { cwd: targetDir, stdio: 'inherit' });
    }

    execSync('git init', { cwd: targetDir, stdio: 'ignore' });

    if (setupAi) {
      console.log(pc.green('\nConfigurando regras de IA do Bloom UI...'));
      try {
        execSync('npx @bloomui-react/cli setup-ai', { cwd: targetDir, stdio: 'inherit' });
      } catch (err) {
        console.warn('Aviso: Falha ao rodar o setup de IA do Bloom UI.');
      }
    }

    outro(pc.green(pc.bold('Projeto criado com sucesso!')));
    console.log(`Execute os seguintes comandos para começar:\n`);
    console.log(pc.cyan(`  cd ${projectName}`));
    if (!installDeps) {
      console.log(pc.cyan(`  ${packageManager} install`));
    }
    const devRunCommand = packageManager === 'npm' ? 'npm run dev' : `${packageManager} dev`;
    console.log(pc.cyan(`  ${devRunCommand}\n`));

  } catch (error) {
    cancel('Ocorreu um erro durante a criação do projeto.');
    console.error(error);
  }
}

init();
