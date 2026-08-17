// scripts/fix-wardrobe-duplicates.mjs
// Run with: node scripts/fix-wardrobe-duplicates.mjs
//
// Reorders the images arrays for balaclava-crop-tank and cross-leather-pant
// so their first image (used as the Wardrobe grid thumbnail) doesn't
// duplicate another product's thumbnail.

import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const filePath = path.join(process.cwd(), "src/data/catalog.ts");
let content;
try {
  content = readFileSync(filePath, "utf-8");
} catch {
  console.error("✗ Could not read src/data/catalog.ts — run this from your project root.");
  process.exit(1);
}

let changes = 0;

const fixes = [
  {
    label: "balaclava-crop-tank: BC2,BC5 -> BC5,BC2",
    find: `    designer: "designing-balaclava",
    images: [BC2, BC5],`,
    replace: `    designer: "designing-balaclava",
    images: [BC5, BC2],`,
  },
  {
    label: "cross-leather-pant: GB2,GB4 -> GB4,GB2",
    find: `    designer: "galbakaline",
    images: [GB2, GB4],`,
    replace: `    designer: "galbakaline",
    images: [GB4, GB2],`,
  },
];

for (const { label, find, replace } of fixes) {
  if (content.includes(find)) {
    content = content.replace(find, replace);
    changes++;
    console.log(`✓ ${label}`);
  } else if (content.includes(replace)) {
    console.log(`~ ${label} (already applied)`);
  } else {
    console.warn(`~ skipped "${label}" (pattern not found — check the file manually)`);
  }
}

writeFileSync(filePath, content, "utf-8");
console.log(`\nDone. ${changes} edit(s) applied to src/data/catalog.ts.`);
console.log("Now run: npm run build");
