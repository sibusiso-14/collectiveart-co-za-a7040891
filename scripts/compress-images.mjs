// scripts/compress-images.mjs
// Run with: node scripts/compress-images.mjs
//
// Finds every image in src/assets over SIZE_THRESHOLD_KB, resizes it to a
// sensible max dimension, and compresses it — overwriting the file in
// place with the SAME filename (including case), so every existing
// import in catalog.ts keeps working unchanged.

import { readdir, stat, rename, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ASSETS_DIR = path.join(process.cwd(), "src/assets");
const SIZE_THRESHOLD_KB = 150; // only touch files bigger than this
const MAX_DIMENSION = 1600; // px, longest side

const IMAGE_EXT = /\.(jpe?g|png)$/i;

async function run() {
  let files;
  try {
    files = await readdir(ASSETS_DIR);
  } catch {
    console.error("✗ Could not read src/assets — run this from your project root.");
    process.exit(1);
  }

  const targets = [];
  for (const file of files) {
    if (!IMAGE_EXT.test(file)) continue;
    const fullPath = path.join(ASSETS_DIR, file);
    const s = await stat(fullPath);
    const kb = s.size / 1024;
    if (kb > SIZE_THRESHOLD_KB) {
      targets.push({ file, fullPath, originalKb: kb });
    }
  }

  if (targets.length === 0) {
    console.log(`No images over ${SIZE_THRESHOLD_KB} KB found. Nothing to do.`);
    return;
  }

  console.log(`Found ${targets.length} image(s) over ${SIZE_THRESHOLD_KB} KB. Compressing...\n`);

  let totalBefore = 0;
  let totalAfter = 0;

  for (const { file, fullPath, originalKb } of targets) {
    const tempPath = fullPath + ".compressing.tmp";
    const isPng = /\.png$/i.test(file);

    try {
      let pipeline = sharp(fullPath).resize({
        width: MAX_DIMENSION,
        height: MAX_DIMENSION,
        fit: "inside",
        withoutEnlargement: true,
      });

      if (isPng) {
        pipeline = pipeline.png({ quality: 80, compressionLevel: 9, palette: true });
      } else {
        pipeline = pipeline.jpeg({ quality: 80, mozjpeg: true });
      }

      await pipeline.toFile(tempPath);

      const newStat = await stat(tempPath);
      const newKb = newStat.size / 1024;

      if (newKb < originalKb) {
        await unlink(fullPath);
        await rename(tempPath, fullPath);
        totalBefore += originalKb;
        totalAfter += newKb;
        console.log(
          `✓ ${file}: ${originalKb.toFixed(0)} KB -> ${newKb.toFixed(0)} KB (${Math.round(
            (1 - newKb / originalKb) * 100,
          )}% smaller)`,
        );
      } else {
        await unlink(tempPath);
        console.log(`~ ${file}: compression didn't help, left unchanged`);
      }
    } catch (err) {
      console.error(`✗ ${file}: ${err.message}`);
      try {
        await unlink(tempPath);
      } catch {}
    }
  }

  console.log(
    `\nDone. Total: ${(totalBefore / 1024).toFixed(2)} MB -> ${(totalAfter / 1024).toFixed(
      2,
    )} MB.`,
  );
  console.log("Now run: npm run build");
}

run();
