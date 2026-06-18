import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(rootDir, 'dist');
const workDir = path.join(rootDir, '.gh-pages-worktree');

const run = (command, options = {}) =>
  execSync(command, { cwd: workDir, stdio: 'inherit', ...options });

execSync('npm run build', { cwd: rootDir, stdio: 'inherit' });

const remoteUrl = execSync('git remote get-url origin', {
  cwd: rootDir,
  encoding: 'utf8',
}).trim();

fs.rmSync(workDir, { recursive: true, force: true });

let hasGhPagesBranch = true;
try {
  execSync(
    `git clone --depth 1 --branch gh-pages --single-branch "${remoteUrl}" "${workDir}"`,
    { cwd: rootDir, stdio: 'inherit' },
  );
} catch {
  hasGhPagesBranch = false;
  fs.mkdirSync(workDir, { recursive: true });
  execSync('git init', { cwd: workDir, stdio: 'inherit' });
  execSync(`git remote add origin "${remoteUrl}"`, { cwd: workDir, stdio: 'inherit' });
  execSync('git checkout -b gh-pages', { cwd: workDir, stdio: 'inherit' });
}

for (const entry of fs.readdirSync(workDir, { withFileTypes: true })) {
  if (entry.name === '.git') continue;
  fs.rmSync(path.join(workDir, entry.name), { recursive: true, force: true });
}

for (const entry of fs.readdirSync(distDir, { withFileTypes: true })) {
  const source = path.join(distDir, entry.name);
  const target = path.join(workDir, entry.name);
  fs.cpSync(source, target, { recursive: true });
}

fs.writeFileSync(path.join(workDir, '.nojekyll'), '');

execSync('git config user.name "grzegorzkrzton"', { cwd: workDir, stdio: 'inherit' });
execSync('git config user.email "grzegorz.krzton@zendesk.com"', { cwd: workDir, stdio: 'inherit' });

run('git add -A');
run('git commit -m "Deploy site"');

if (hasGhPagesBranch) {
  run('git push origin gh-pages');
} else {
  run('git push -u origin gh-pages');
}

fs.rmSync(workDir, { recursive: true, force: true });

console.log('Published to gh-pages');
