import { cpSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const assetsDir = resolve(root, 'assets');
const distAssetsDir = resolve(root, 'client', 'dist', 'assets');

console.log('📦 [1/2] Construction du client Vite...');
execSync('npm run build --workspace client', { stdio: 'inherit', cwd: root });

console.log('📂 [2/2] Copie des assets statiques dans client/dist/assets...');
if (existsSync(assetsDir)) {
  if (!existsSync(distAssetsDir)) {
    mkdirSync(distAssetsDir, { recursive: true });
  }
  cpSync(assetsDir, distAssetsDir, { recursive: true });
  console.log('✅ Assets statiques copiés avec succès dans client/dist/assets !');
}

console.log('🎉 Build terminé prêt pour le déploiement.');
