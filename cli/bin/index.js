#!/usr/bin/env node

import { existsSync, mkdirSync, rmSync, readFileSync, writeFileSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';
import prompts from 'prompts';
import { red, green, bold } from 'kolorist';

async function init() {
  const response = await prompts([
    {
      type: 'text',
      name: 'projectName',
      message: 'Qual é o nome do seu projeto?',
      initial: 'my-nexus-app'
    },
    {
      type: 'confirm',
      name: 'useI18n',
      message: 'Deseja configurar suporte a múltiplos idiomas (i18n)?',
      initial: true
    },
    {
      type: 'confirm',
      name: 'useDocker',
      message: 'Deseja incluir suporte a Docker (Dockerfile/Compose)?',
      initial: true
    },
    {
      type: 'confirm',
      name: 'useGithubActions',
      message: 'Deseja incluir automações de CI/CD do GitHub Actions?',
      initial: true
    },
    {
      type: 'select',
      name: 'packageManager',
      message: 'Qual gerenciador de pacotes você deseja usar?',
      choices: [
        { title: 'pnpm', value: 'pnpm' },
        { title: 'npm', value: 'npm' },
        { title: 'yarn', value: 'yarn' },
        { title: 'bun', value: 'bun' }
      ],
      initial: 0
    },
    {
      type: 'confirm',
      name: 'installDeps',
      message: 'Deseja instalar as dependências agora?',
      initial: true
    }
  ]);

  const { projectName, useI18n, useDocker, useGithubActions, packageManager, installDeps } = response;
  if (!projectName || !packageManager) {
    return;
  }

  const targetDir = join(process.cwd(), projectName);

  if (existsSync(targetDir)) {
    console.error(red(`Erro: O diretório "${projectName}" já existe.`));
    process.exit(1);
  }

  console.log(green(`\nCriando um novo projeto Nexus em: ${targetDir}...`));
  mkdirSync(targetDir, { recursive: true });

  try {
    const REPO_URL = 'https://github.com/gui-bus/Nexus.git';
    execSync(`git clone --depth 1 ${REPO_URL} "${targetDir}"`, { stdio: 'inherit' });

    const gitFolder = join(targetDir, '.git');
    const rmCommand = process.platform === 'win32' ? `rmdir /s /q "${gitFolder}"` : `rm -rf "${gitFolder}"`;
    execSync(rmCommand);

    if (!useI18n) {
      console.log(green('\nRemovendo configurações de i18n (next-intl)...'));

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
    }

    const backupFolder = join(targetDir, '.nexus-no-i18n');
    if (existsSync(backupFolder)) {
      rmSync(backupFolder, { recursive: true, force: true });
    }

    if (!useDocker) {
      console.log(green('\nRemovendo suporte a Docker...'));
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
    }

    if (!useGithubActions) {
      console.log(green('\nRemovendo fluxos de trabalho do GitHub Actions (CI/CD)...'));
      const githubFolder = join(targetDir, '.github');
      if (existsSync(githubFolder)) {
        rmSync(githubFolder, { recursive: true, force: true });
      }
    }

    if (packageManager !== 'pnpm') {
      const lockfile = join(targetDir, 'pnpm-lock.yaml');
      if (existsSync(lockfile)) {
        rmSync(lockfile, { force: true });
      }
    }

    if (installDeps) {
      console.log(green(`\nInstalando dependências usando o ${packageManager}...`));
      const installCommand = `${packageManager} install`;
      execSync(installCommand, { cwd: targetDir, stdio: 'inherit' });
    }

    execSync('git init', { cwd: targetDir, stdio: 'ignore' });

    console.log(green('\nProjeto criado com sucesso!'));
    console.log(`\nExecute os seguintes comandos para começar:\n`);
    console.log(bold(`  cd ${projectName}`));
    if (!installDeps) {
      console.log(bold(`  ${packageManager} install`));
    }
    const devRunCommand = packageManager === 'npm' ? 'npm run dev' : `${packageManager} dev`;
    console.log(bold(`  ${devRunCommand}\n`));

  } catch (error) {
    console.error(red('Ocorreu um erro durante a criação do projeto:'), error);
  }
}

init();
