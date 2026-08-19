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
    }
  ]);

  const { projectName, useI18n } = response;
  if (!projectName) {
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
    const REPO_URL = 'https://github.com/gui-bus/Template.git';
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

    execSync('git init', { cwd: targetDir, stdio: 'ignore' });

    console.log(green('\nProjeto criado com sucesso!'));
    console.log(`\nExecute os seguintes comandos para começar:\n`);
    console.log(bold(`  cd ${projectName}`));
    console.log(bold(`  pnpm install`));
    console.log(bold(`  pnpm dev\n`));

  } catch (error) {
    console.error(red('Ocorreu um erro durante a criação do projeto:'), error);
  }
}

init();
