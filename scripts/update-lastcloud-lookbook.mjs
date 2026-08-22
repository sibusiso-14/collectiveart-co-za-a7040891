import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const filePath = path.join(process.cwd(), "src/data/catalog.ts");
let content = readFileSync(filePath, "utf-8");

let changes = 0;

const portraitFind = "    portrait: LC3,\n    lookbook: [LC4, LC2, LC5],";
const portraitReplace = "    portrait: LC5New,\n    lookbook: [LC11, LC20, LC15],";

if (content.includes(portraitFind)) {
  content = content.replace(portraitFind, portraitReplace);
  changes++;
  console.log("✓ updated Last Cloud Designs portrait + lookbook");
} else {
  console.warn("~ skipped (pattern not found) — check the file manually");
}

writeFileSync(filePath, content, "utf-8");
console.log(`\nDone. ${changes} edit(s) applied.`);
