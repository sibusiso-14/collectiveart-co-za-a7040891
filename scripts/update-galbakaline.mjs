// scripts/update-galbakaline.mjs
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const filePath = path.join(process.cwd(), "src/data/catalog.ts");
let content = readFileSync(filePath, "utf-8");
let changes = 0;

const importAnchor = `import SK4 from "@/assets/SK4.jpg";\n`;
const newImports = `import FIRE1 from "@/assets/Fire-2-piece-combo.jpeg";
import FIRE2 from "@/assets/Fire-2-piece-combo1.jpeg";
import FIRE3 from "@/assets/Fire-2-piece-combo2.jpeg";
import FIRE4 from "@/assets/Fire-2-piece-combo3.jpeg";
import HOODIENEW1 from "@/assets/Galbakaline-hoodie.JPG";
import HOODIENEW2 from "@/assets/Galbakaline-hoodie1.jpg";
import HOODIENEW3 from "@/assets/Galbakaline-hoodie2.JPG";
import LEATHERNEW1 from "@/assets/Galbakaline-leather-pants.JPG";
import LEATHERNEW2 from "@/assets/Galbakaline-leather-pants1.JPG";
import LEATHERNEW3 from "@/assets/Galbakaline-leather-pants2.JPG";
import LUXE1 from "@/assets/luxe-denim-2-piece.jpg";
import LUXE2 from "@/assets/luxe-denim-2-piece1.jpg";
import LUXE3 from "@/assets/luxe-denim-2-piece2.JPG";
import LUXE4 from "@/assets/luxe-denim-2-piece3.JPG";
`;
if (content.includes(importAnchor) && !content.includes("import FIRE1")) {
  content = content.replace(importAnchor, importAnchor + newImports);
  changes++;
  console.log("✓ added image imports");
} else {
  console.warn("~ skipped image imports (anchor not found, or already added)");
}

const leatherFind = `    designer: "galbakaline",
    images: [GB2],`;
const leatherReplace = `    designer: "galbakaline",
    images: [GB2, LEATHERNEW1, LEATHERNEW2, LEATHERNEW3],`;
if (content.includes(leatherFind)) {
  content = content.replace(leatherFind, leatherReplace);
  changes++;
  console.log("✓ added photos to Cross Panel Leather Pant");
} else if (content.includes(leatherReplace)) {
  console.log("~ leather pant photos already added");
} else {
  console.warn("~ skipped leather pant photos (pattern not found)");
}

const hoodieFind = `    designer: "galbakaline",
    images: [GB1, GB2],`;
const hoodieReplace = `    designer: "galbakaline",
    images: [GB1, GB2, HOODIENEW1, HOODIENEW2, HOODIENEW3],`;
if (content.includes(hoodieFind)) {
  content = content.replace(hoodieFind, hoodieReplace);
  changes++;
  console.log("✓ added photos to Signature Fur Hoodie");
} else if (content.includes(hoodieReplace)) {
  console.log("~ hoodie photos already added");
} else {
  console.warn("~ skipped hoodie photos (pattern not found)");
}

const catMarker = "export const categories: Category[]";
const catIdx = content.indexOf(catMarker);
if (catIdx !== -1 && !content.includes('id: "luxe-denim-2-piece"')) {
  const closeIdx = content.lastIndexOf("];", catIdx);
  if (closeIdx !== -1) {
    const newProducts = `  {
    id: "luxe-denim-2-piece",
    name: "Luxe Denim 2 Piece",
    category: "Outerwear",
    designer: "galbakaline",
    images: [LUXE1, LUXE2, LUXE3, LUXE4],
    fabric: "Premium denim, reclaimed panels",
    care: "Cold wash separately. Hang dry.",
    description:
      "A luxe two-piece denim set built from premium reclaimed panels, cut for a boxy, elevated silhouette.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "fire-2-piece-combo",
    name: "Fire 2 Piece Combo",
    category: "Outerwear",
    designer: "galbakaline",
    images: [FIRE1, FIRE2, FIRE3, FIRE4],
    fabric: "Technical shell with graphic detailing",
    care: "Wipe clean. Do not tumble dry.",
    description:
      "A bold two-piece combo finished with Galbakaline's signature flame-streaked graphics — comfort meets style in every stitch.",
    sizes: ["S", "M", "L", "XL"],
  },
`;
    content = content.slice(0, closeIdx) + newProducts + content.slice(closeIdx);
    changes++;
    console.log("✓ added 2 new products (Luxe Denim 2 Piece, Fire 2 Piece Combo)");
  } else {
    console.warn("~ skipped new products (could not find array close)");
  }
} else {
  console.warn("~ skipped new products (anchor not found, or already added)");
}

writeFileSync(filePath, content, "utf-8");
console.log(`\nDone. ${changes}/4 edits applied.`);
