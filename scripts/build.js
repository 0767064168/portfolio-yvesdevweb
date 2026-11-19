import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { getPublicData } from '../server/src/db.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const assetsDir = resolve(root, 'assets');
const clientDistDir = resolve(root, 'client', 'dist');
const clientDistAssetsDir = resolve(clientDistDir, 'assets');
const rootDistDir = resolve(root, 'dist');
const defaultDataFile = resolve(root, 'client', 'src', 'defaultData.json');

console.log('🔄 [1/4] Synchronisation des données par défaut pour le client...');
try {
  const publicData = await getPublicData();
  writeFileSync(defaultDataFile, JSON.stringify(publicData, null, 2), 'utf8');
  console.log('✅ defaultData.json synchronisé');
} catch (e) {
  console.warn('⚠️ Impossible de pré-remplir defaultData.json:', e.message);
}

console.log('📦 [2/4] Construction du client Vite...');
execSync('npm run build --workspace client', { stdio: 'inherit', cwd: root });

console.log('📂 [3/4] Copie des assets statiques dans client/dist/assets...');
if (existsSync(assetsDir)) {
  if (!existsSync(clientDistAssetsDir)) {
    mkdirSync(clientDistAssetsDir, { recursive: true });
  }
  cpSync(assetsDir, clientDistAssetsDir, { recursive: true });
  console.log('✅ Assets statiques copiés dans client/dist/assets');
}

console.log('🚀 [4/4] Synchronisation vers le dossier racine dist (attendu par Vercel)...');
if (existsSync(clientDistDir)) {
  if (existsSync(rootDistDir)) {
    rmSync(rootDistDir, { recursive: true, force: true });
  }
  mkdirSync(rootDistDir, { recursive: true });
  cpSync(clientDistDir, rootDistDir, { recursive: true });
  console.log('✅ Dossier racine dist prêt avec index.html et tous les assets !');
}

console.log('🎉 Build terminé avec succès prêt pour le déploiement.');
