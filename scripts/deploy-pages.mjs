import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(rootDir, 'dist');
const workDir = path.join(rootDir, '.gh-pages-worktree');

execSync('npm run build', { cwd: rootDir, stdio: 'inherit' });

fs.rmSync(workDir, { recursive: true, force: true });
fs.mkdirSync(workDir, { recursive: true });

for (const entry of fs.readdirSync(distDir, { withFileTypes: true })) {
  const source = path.join(distDir, entry.name);
  const target = path.join(workDir, entry.name);
  fs.cpSync(source, target, { recursive: true });
}

fs.writeFileSync(path.join(workDir, '.nojekyll'), '');

const remoteUrl = execSync('git remote get-url origin', {
  cwd: rootDir,
  encoding: 'utf8',
}).trim();

execSync('git init', { cwd: workDir, stdio: 'inherit' });
execSync('git config user.name "grzegorzkrzton"', { cwd: workDir, stdio: 'inherit' });
execSync('git config user.email "grzegorz.krzton@zendesk.com"', { cwd: workDir, stdio: 'inherit' });
execSync(`git remote add origin ${remoteUrl}`, { cwd: workDir, stdio: 'inherit' });
execSync('git checkout -b gh-pages', { cwd: workDir, stdio: 'inherit' });
execSync('git add -A', { cwd: workDir, stdio: 'inherit' });
execSync('git commit -m "Deploy site"', { cwd: workDir, stdio: 'inherit' });
execSync('git push -f origin gh-pages', { cwd: workDir, stdio: 'inherit' });

fs.rmSync(workDir, { recursive: true, force: true });

console.log('Published to gh-pages');
