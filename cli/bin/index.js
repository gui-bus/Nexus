#!/usr/bin/env node

import { existsSync, mkdirSync } from 'node:fs';
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
    }
  ]);

  const { projectName } = response;
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
