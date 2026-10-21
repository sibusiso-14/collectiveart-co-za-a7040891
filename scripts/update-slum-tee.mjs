import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const filePath = path.join(process.cwd(), "src/data/catalog.ts");
let content = readFileSync(filePath, "utf-8");

const id = "slum-jaguar-slum-tee";
const start = content.indexOf(`id: "${id}"`);
if (start === -1) {
  console.warn(`~ ${id} not found (run the Slum Jaguar script first)`);
  process.exit(0);
}
const nextProduct = content.indexOf('\n    id: "', start + 10);
const arrayEnd = content.indexOf("\n];", start);
const end = nextProduct !== -1 && nextProduct < arrayEnd ? nextProduct : arrayEnd;
let block = content.slice(start, end);
block = block.replace(/fabric: "[^"]*",/, 'fabric: "Cotton",');
block = block.replace(
  /description:\s*\n\s*"[^"]*",/,
  'description:\n      "A cotton graphic tee from Slum Jaguar Streetwear\'s signature range: bold artwork on a relaxed streetwear fit.",',
);
content = content.slice(0, start) + block + content.slice(end);
writeFileSync(filePath, content, "utf-8");
console.log(`✓ updated ${id}`);
