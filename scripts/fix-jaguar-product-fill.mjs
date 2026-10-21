import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const filePath = path.join(process.cwd(), "src/routes/product.$productId.tsx");
let content = readFileSync(filePath, "utf-8");
let changes = 0;

const isJaguar = 'product.designer === "slum-jaguar-streetwear"';

const divFind = '<div key={i} className="aspect-[4/5] overflow-hidden bg-secondary photo-tint">';
const divReplace =
  "<div key={i} className={`overflow-hidden bg-secondary photo-tint ${" +
  isJaguar +
  ' ? "" : "aspect-[4/5]"}`}>';
if (content.includes(divFind)) {
  content = content.replace(divFind, divReplace);
  changes++;
  console.log("✓ frame no longer forced to portrait for Slum Jaguar");
} else {
  console.warn("~ skipped frame edit (pattern not found or already applied)");
}

const imgFind = 'className="h-full w-full object-contain"';
const imgReplace =
  "className={" + isJaguar + ' ? "block h-auto w-full" : "h-full w-full object-contain"}';
if (content.includes(imgFind)) {
  content = content.replace(imgFind, imgReplace);
  changes++;
  console.log("✓ photo now fills the full width");
} else {
  console.warn("~ skipped photo edit (pattern not found or already applied)");
}

writeFileSync(filePath, content, "utf-8");
console.log(`\nDone. ${changes}/2 edits applied.`);
