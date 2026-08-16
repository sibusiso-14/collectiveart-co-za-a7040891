import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const BASE_URL = "https://collectiveart-co-za.lovable.app";
const ASSETS_DIR = path.resolve("src/assets");

const files = (await readdir(ASSETS_DIR)).filter((f) => f.endsWith(".asset.json"));

if (files.length === 0) {
  console.log("No .asset.json files found in src/assets/. Nothing to do.");
  process.exit(0);
}

console.log(`Found ${files.length} asset pointer files. Downloading...\n`);

let ok = 0;
let failed = 0;

for (const file of files) {
  const fullPath = path.join(ASSETS_DIR, file);
  const meta = JSON.parse(await readFile(fullPath, "utf-8"));
  const url = BASE_URL + meta.url;
  const outPath = path.join(ASSETS_DIR, meta.original_filename);

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(outPath, buf);
    console.log(`✓ ${meta.original_filename} (${buf.length} bytes)`);
    ok++;
  } catch (err) {
    console.error(`✗ ${meta.original_filename} — ${err.message}`);
    failed++;
  }
}

console.log(`\nDone. ${ok} downloaded, ${failed} failed.`);
if (failed > 0) process.exit(1);
