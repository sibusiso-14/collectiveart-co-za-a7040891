import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const filePath = path.join(process.cwd(), "src/data/catalog.ts");
let content = readFileSync(filePath, "utf-8");

const find = "    portrait: GB1,\n    lookbook: [GB1, GB3, GB2],";
const replace = "    portrait: FIRE1,\n    lookbook: [LUXE1, HOODIENEW1, LEATHERNEW1],";

if (content.includes(find)) {
  content = content.replace(find, replace);
  console.log("✓ updated Galbakaline portrait + lookbook");
} else if (content.includes(replace)) {
  console.log("~ already updated");
} else {
  console.warn("~ pattern not found — needs manual check");
}

writeFileSync(filePath, content, "utf-8");
