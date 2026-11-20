#!/usr/bin/env node
/**
 * Optimise les images du portfolio :
 * - logo-yy.png → WebP + PNG compressé (max 512px large)
 * - portrait.jpg → WebP + JPEG compressé (max 800px large)
 * - portrait-generated.jpg → WebP + JPEG compressé (max 800px large)
 * - Copie les versions optimisées dans assets/, client/public/assets/, dist/assets/
 */
import sharp from 'sharp';
import { resolve, dirname, basename, extname } from 'path';
import { fileURLToPath } from 'url';
import { cpSync, existsSync, mkdirSync, statSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const assetsDir = resolve(root, 'assets');

const targets = [
  { src: 'logo-yy.png',            maxWidth: 512,  format: 'png',  pngQuality: 80 },
  { src: 'portrait.jpg',           maxWidth: 800,  format: 'jpeg', jpegQuality: 80 },
  { src: 'portrait-generated.jpg', maxWidth: 800,  format: 'jpeg', jpegQuality: 80 },
];

function sizeKB(path) {
  return (statSync(path).size / 1024).toFixed(0);
}

for (const target of targets) {
  const inputPath = resolve(assetsDir, target.src);
  if (!existsSync(inputPath)) {
    console.log(`⏭️  ${target.src} introuvable, ignoré.`);
    continue;
  }

  const beforeKB = sizeKB(inputPath);
  const ext = extname(target.src);
  const name = basename(target.src, ext);

  // Optimise dans le format original
  const pipeline = sharp(inputPath).resize({ width: target.maxWidth, withoutEnlargement: true });

  if (target.format === 'png') {
    await pipeline.png({ quality: target.pngQuality, compressionLevel: 9, palette: true }).toFile(inputPath + '.opt');
  } else {
    await pipeline.jpeg({ quality: target.jpegQuality, mozjpeg: true }).toFile(inputPath + '.opt');
  }

  // Génère aussi une version WebP
  const webpPath = resolve(assetsDir, `${name}.webp`);
  await sharp(inputPath)
    .resize({ width: target.maxWidth, withoutEnlargement: true })
    .webp({ quality: target.format === 'png' ? 85 : 78 })
    .toFile(webpPath);

  // Remplace l'original par la version optimisée
  const { default: fs } = await import('fs');
  fs.renameSync(inputPath + '.opt', inputPath);

  const afterKB = sizeKB(inputPath);
  const webpKB = sizeKB(webpPath);
  console.log(`✅ ${target.src}: ${beforeKB} KB → ${afterKB} KB (${target.format}) | WebP: ${webpKB} KB`);
}

// Synchronise vers les dossiers cibles
const syncDirs = [
  resolve(root, 'client', 'public', 'assets'),
  resolve(root, 'public', 'assets'),
];
for (const dir of syncDirs) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  cpSync(assetsDir, dir, { recursive: true });
}
console.log('📂 Assets synchronisés dans client/public/ et public/');
