import { readFileSync, writeFileSync, existsSync, renameSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const assets = path.join(root, "src/assets");
const catalogPath = path.join(root, "src/data/catalog.ts");

const sets = [
  { prefix: "JAGTEE", oldName: (n) => `Slum tshirt${n}.jpg`, newName: (n) => `jaguar-slum-tee-${n}.jpg` },
  { prefix: "JAGSPOVA", oldName: (n) => `Spova Tracksuit ${n}.jpg`, newName: (n) => `jaguar-spova-tracksuit-${n}.jpg` },
  { prefix: "JAGFOOT", oldName: (n) => `Leaving a footprint Tshirt${n}.jpg`, newName: (n) => `jaguar-footprint-tee-${n}.jpg` },
];

for (const set of sets) {
  for (let n = 1; n <= 5; n++) {
    const oldPath = path.join(assets, set.oldName(n));
    const newPath = path.join(assets, set.newName(n));
    if (existsSync(oldPath)) renameSync(oldPath, newPath);
    else if (!existsSync(newPath)) {
      console.error(`✗ Missing image: ${set.oldName(n)}`);
      process.exit(1);
    }
  }
}
console.log("✓ images renamed (no spaces)");

let content = readFileSync(catalogPath, "utf-8");
if (content.includes("slum-jaguar-streetwear")) {
  console.log("~ Slum Jaguar already added, nothing to do");
  process.exit(0);
}

const importLines = sets
  .flatMap((set) => [1, 2, 3, 4, 5].map((n) => `import ${set.prefix}${n} from "@/assets/${set.newName(n)}";`))
  .join("\n");
const lines = content.split("\n");
let lastImport = -1;
lines.forEach((l, i) => {
  if (l.startsWith("import ")) lastImport = i;
});
lines.splice(lastImport + 1, 0, importLines);
content = lines.join("\n");
console.log("✓ added image imports");

function addToArray(src, declRegex, entry, label) {
  const m = src.match(declRegex);
  if (!m) {
    console.error(`✗ Could not find the ${label} array`);
    process.exit(1);
  }
  const openIdx = m.index + m[0].length - 1;
  let depth = 0;
  let closeIdx = -1;
  for (let i = openIdx; i < src.length; i++) {
    if (src[i] === "[") depth++;
    else if (src[i] === "]") {
      depth--;
      if (depth === 0) {
        closeIdx = i;
        break;
      }
    }
  }
  if (closeIdx === -1) {
    console.error(`✗ Could not find the end of the ${label} array`);
    process.exit(1);
  }
  let before = src.slice(0, closeIdx).trimEnd();
  if (!before.endsWith(",") && !before.endsWith("[")) before += ",";
  console.log(`✓ added ${label}`);
  return before + "\n" + entry + src.slice(closeIdx);
}

const designerEntry = `  {
    slug: "slum-jaguar-streetwear",
    name: "Slum Jaguar Streetwear",
    location: "Johannesburg",
    discipline: "Streetwear: tracksuits, caps & graphic tees",
    since: "2003",
    bio: "Slum Jaguar Streetwear has been building streetwear out of Johannesburg since 2003: tracksuits, caps and graphic tees with bold, story-driven designs made to be worn loud.",
    statement: "Leave your footprint.",
    portrait: JAGSPOVA1,
    lookbook: [JAGTEE1, JAGFOOT1, JAGSPOVA3],
    instagram: "slumjaguar.streetwear",
  },
`;

const productEntries = `  {
    id: "slum-jaguar-slum-tee",
    name: "Slum Tee",
    category: "Tops",
    designer: "slum-jaguar-streetwear",
    images: [JAGTEE1, JAGTEE2, JAGTEE3, JAGTEE4, JAGTEE5],
    fabric: "Cotton jersey, screen print",
    care: "Machine wash cold inside out. Tumble dry low.",
    description:
      "A graphic tee from Slum Jaguar Streetwear's signature range: bold artwork on a relaxed streetwear fit.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "slum-jaguar-spova-tracksuit",
    name: "Spova Tracksuit",
    category: "Outerwear",
    designer: "slum-jaguar-streetwear",
    images: [JAGSPOVA1, JAGSPOVA2, JAGSPOVA3, JAGSPOVA4, JAGSPOVA5],
    fabric: "Cotton blend",
    care: "Machine wash cold. Hang dry.",
    description:
      "A full two-piece tracksuit from Slum Jaguar Streetwear, cut for an easy, everyday streetwear fit.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "slum-jaguar-leaving-a-footprint-tee",
    name: "Leaving a Footprint Tee",
    category: "Tops",
    designer: "slum-jaguar-streetwear",
    images: [JAGFOOT1, JAGFOOT2, JAGFOOT3, JAGFOOT4, JAGFOOT5],
    fabric: "Cotton jersey, screen print",
    care: "Machine wash cold inside out. Tumble dry low.",
    description:
      "A statement tee built around the Slum Jaguar idea of leaving a footprint: graphic-led and made to be noticed.",
    sizes: ["S", "M", "L", "XL"],
  },
`;

content = addToArray(content, /export const designers:\s*Designer\[\s*\]\s*=\s*\[/, designerEntry, "designer entry");
content = addToArray(content, /export const products:\s*Product\[\s*\]\s*=\s*\[/, productEntries, "3 products");

writeFileSync(catalogPath, content, "utf-8");
console.log("\nDone. Now building...");
