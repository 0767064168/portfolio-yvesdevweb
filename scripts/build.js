import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { getPublicData } from '../server/src/db.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const assetsDir = resolve(root, 'assets');
const clientPublicAssetsDir = resolve(root, 'client', 'public', 'assets');
const rootPublicAssetsDir = resolve(root, 'public', 'assets');
const clientDistDir = resolve(root, 'client', 'dist');
const rootDistDir = resolve(root, 'dist');
const distAssetsDir = resolve(rootDistDir, 'assets');
const defaultDataFile = resolve(root, 'client', 'src', 'defaultData.json');

console.log('🔄 [1/4] Synchronisation des données par défaut pour le client...');
try {
  const publicData = await getPublicData();
  writeFileSync(defaultDataFile, JSON.stringify(publicData, null, 2), 'utf8');
  console.log('✅ defaultData.json synchronisé');
} catch (e) {
  console.warn('⚠️ Impossible de pré-remplir defaultData.json:', e.message);
}

console.log('📂 [2/4] Synchronisation des assets dans public/...');
for (const targetDir of [clientPublicAssetsDir, rootPublicAssetsDir]) {
  if (existsSync(assetsDir)) {
    if (!existsSync(targetDir)) {
      mkdirSync(targetDir, { recursive: true });
    }
    cpSync(assetsDir, targetDir, { recursive: true });
  }
}
console.log('✅ Dossiers public synchronisés');

console.log('📦 [3/4] Construction Vite...');
execSync('npm run build --workspace client', { stdio: 'inherit', cwd: root });

console.log('🚀 [4/4] Copie finale garantie des assets dans dist/assets et client/dist...');
if (existsSync(assetsDir)) {
  if (!existsSync(distAssetsDir)) {
    mkdirSync(distAssetsDir, { recursive: true });
  }
  cpSync(assetsDir, distAssetsDir, { recursive: true });
}

if (existsSync(rootDistDir)) {
  if (existsSync(clientDistDir)) {
    rmSync(clientDistDir, { recursive: true, force: true });
  }
  mkdirSync(clientDistDir, { recursive: true });
  cpSync(rootDistDir, clientDistDir, { recursive: true });
}

console.log('🎉 Build complet terminé !');
