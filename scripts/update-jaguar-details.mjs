import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const filePath = path.join(process.cwd(), "src/data/catalog.ts");
let content = readFileSync(filePath, "utf-8");

function patchProduct(id, fabric, description) {
  const start = content.indexOf(`id: "${id}"`);
  if (start === -1) {
    console.warn(`~ ${id} not found (run the Slum Jaguar script first)`);
    return;
  }
  const nextProduct = content.indexOf('\n    id: "', start + 10);
  const arrayEnd = content.indexOf("\n];", start);
  const end = nextProduct !== -1 && nextProduct < arrayEnd ? nextProduct : arrayEnd;
  let block = content.slice(start, end);
  block = block.replace(/fabric: "[^"]*",/, `fabric: ${JSON.stringify(fabric)},`);
  block = block.replace(/description:\s*\n\s*"[^"]*",/, `description:\n      ${JSON.stringify(description)},`);
  content = content.slice(0, start) + block + content.slice(end);
  console.log(`✓ updated ${id}`);
}

patchProduct(
  "slum-jaguar-spova-tracksuit",
  "Lightweight, smooth, slightly crinkled, often water-resistant",
  "A lightweight, smooth tracksuit with a slightly crinkled finish and often water-resistant, great for the jacket and sporty streetwear look.",
);

patchProduct(
  "slum-jaguar-leaving-a-footprint-tee",
  "White heavyweight cotton jersey",
  "A statement tee in white heavyweight cotton jersey, built around the Slum Jaguar idea of leaving a footprint: graphic-led and made to be noticed.",
);

writeFileSync(filePath, content, "utf-8");
