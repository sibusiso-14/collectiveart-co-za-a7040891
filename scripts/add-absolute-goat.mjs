// scripts/add-absolute-goat.mjs
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

const importAnchor = `import SK4 from "@/assets/SK4.jpg";\n`;
const newImports = `import GOAT1 from "@/assets/chronic-wear-3-piece.jpg";
import GOAT2 from "@/assets/chronic-wear-3-piece1.jpg";
import GOAT3 from "@/assets/chronic-wear-3-piece2.jpg";
import GOAT4 from "@/assets/chronic-wear-3-piece3.jpg";
`;
if (content.includes(importAnchor) && !content.includes('import GOAT1 from')) {
  content = content.replace(importAnchor, importAnchor + newImports);
  changes++;
  console.log("✓ added image imports");
} else {
  console.warn("~ skipped image imports (anchor not found, or already added)");
}

const designerAnchor = `    instagram: "shonakiddwtw",
  },
];`;
const newDesigner = `    instagram: "shonakiddwtw",
  },
  {
    slug: "absolute-goat",
    name: "Absolute Goat",
    location: "Cosmo City, Johannesburg",
    discipline: "Bold statement streetwear",
    since: "2025",
    bio: "Absolute Goat represents Chronic Wear — bold statement streetwear built around striking black-and-white colourways and unapologetic design, for those who wear their identity loud.",
    statement: "Chronic Wear.",
    portrait: GOAT1,
    lookbook: [GOAT2, GOAT3, GOAT4],
    instagram: "absolute_goat00000",
  },
];`;
if (content.includes(designerAnchor) && !content.includes('slug: "absolute-goat"')) {
  content = content.replace(designerAnchor, newDesigner);
  changes++;
  console.log("✓ added designer entry");
} else {
  console.warn("~ skipped designer entry (anchor not found, or already added)");
}

const productAnchor = `    sizes: ["S", "M", "L", "XL"],
  },
];`;
const newProducts = `    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "absolute-goat-chronic-wear-hat",
    name: "Chronic Wear Bucket Hat",
    category: "Accessories",
    designer: "absolute-goat",
    images: [GOAT2, GOAT1],
    fabric: "Cotton twill",
    care: "Spot clean only.",
    description:
      "A statement bucket hat carrying the Chronic Wear mark in a striking black-and-white colourway — the finishing piece of the set.",
    sizes: ["One size"],
  },
  {
    id: "absolute-goat-chronic-wear-top",
    name: "Chronic Wear Graphic Top",
    category: "Tops",
    designer: "absolute-goat",
    images: [GOAT3, GOAT1],
    fabric: "Heavyweight cotton jersey, screen print",
    care: "Machine wash cold inside out. Tumble dry low.",
    description:
      "A bold graphic top built around the Chronic Wear identity — heavyweight cotton in Absolute Goat's signature black-and-white colourway.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "absolute-goat-chronic-wear-shorts",
    name: "Chronic Wear Below-Knee Shorts",
    category: "Bottoms",
    designer: "absolute-goat",
    images: [GOAT4, GOAT1],
    fabric: "Heavyweight cotton twill",
    care: "Machine wash cold. Tumble dry low.",
    description:
      "Below-knee shorts cut from heavyweight twill and stamped with the Chronic Wear mark — part of Absolute Goat's 3-piece statement set.",
    sizes: ["28", "30", "32", "34", "36"],
  },
];`;
if (content.includes(productAnchor) && !content.includes('id: "absolute-goat-chronic-wear-hat"')) {
  content = content.replace(productAnchor, newProducts);
  changes++;
  console.log("✓ added 3 products");
} else {
  console.warn("~ skipped products (anchor not found, or already added)");
}

writeFileSync(filePath, content, "utf-8");
console.log(`\nDone. ${changes}/3 edits applied to src/data/catalog.ts.`);
