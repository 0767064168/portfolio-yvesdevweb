import { cpSync, existsSync, mkdirSync, rmSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const assetsDir = resolve(root, 'assets');
const clientDistDir = resolve(root, 'client', 'dist');
const clientDistAssetsDir = resolve(clientDistDir, 'assets');
const rootDistDir = resolve(root, 'dist');

console.log('📦 [1/3] Construction du client Vite...');
execSync('npm run build --workspace client', { stdio: 'inherit', cwd: root });

console.log('📂 [2/3] Copie des assets statiques dans client/dist/assets...');
if (existsSync(assetsDir)) {
  if (!existsSync(clientDistAssetsDir)) {
    mkdirSync(clientDistAssetsDir, { recursive: true });
  }
  cpSync(assetsDir, clientDistAssetsDir, { recursive: true });
  console.log('✅ Assets statiques copiés dans client/dist/assets');
}

console.log('🚀 [3/3] Synchronisation vers le dossier racine dist (attendu par Vercel)...');
if (existsSync(clientDistDir)) {
  if (existsSync(rootDistDir)) {
    rmSync(rootDistDir, { recursive: true, force: true });
  }
  mkdirSync(rootDistDir, { recursive: true });
  cpSync(clientDistDir, rootDistDir, { recursive: true });
  console.log('✅ Dossier racine dist prêt avec index.html et tous les assets !');
}

console.log('🎉 Build terminé prêt pour le déploiement.');
