import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const targetDirs = [join(process.cwd(), 'src')];

function getFiles(dir, files = []) {
  const list = readdirSync(dir);
  for (const file of list) {
    const fullPath = join(dir, file);
    if (statSync(fullPath).isDirectory()) {
      getFiles(fullPath, files);
    } else {
      const ext = extname(fullPath);
      if (['.ts', '.tsx', '.js', '.jsx'].includes(ext)) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

function stripComments(content) {
  let cleaned = content.replace(/\/\*[\s\S]*?\*\//g, '');
  cleaned = cleaned.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
  cleaned = cleaned.replace(/(?<!:|https:|http:)\/\/.*$/gm, '');
  return cleaned;
}

function run() {
  for (const dir of targetDirs) {
    const files = getFiles(dir);
    for (const file of files) {
      const content = readFileSync(file, 'utf8');
      const stripped = stripComments(content);
      if (content !== stripped) {
        writeFileSync(file, stripped, 'utf8');
      }
    }
  }
}

run();
