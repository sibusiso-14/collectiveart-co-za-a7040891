// scripts/add-shonakidd.mjs
// Run with: node scripts/add-shonakidd.mjs
//
// Adds the ShonaKidd designer entry and two products to
// src/data/catalog.ts, using the existing SK1.jpg-SK4.jpg assets.

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

// 1. Add the SK1-SK4 imports, right after the LC5 import.
const importAnchor = `import LC5 from "@/assets/lc5.jpg";\n`;
const newImports = `import SK1 from "@/assets/SK1.jpg";
import SK2 from "@/assets/SK2.jpg";
import SK3 from "@/assets/SK3.jpg";
import SK4 from "@/assets/SK4.jpg";
`;
if (content.includes(importAnchor) && !content.includes('import SK1 from "@/assets/SK1.jpg";')) {
  content = content.replace(importAnchor, importAnchor + newImports);
  changes++;
} else {
  console.warn("~ skipped image imports (anchor not found, or already added)");
}

// 2. Add the ShonaKidd designer entry, right before the designers array closes.
const designerAnchor = `    instagram: "lastcloud_designs",
  },
];`;
const newDesigner = `    instagram: "lastcloud_designs",
  },
  {
    slug: "shonakidd",
    name: "ShonaKidd",
    location: "Cosmo City, Johannesburg",
    discipline: "Music-inspired streetwear & printed tees",
    since: "2025",
    bio: "ShonaKidd is a fashion and lifestyle brand born from the connection between music, street culture and self-expression, carrying Zimbabwean heritage into the streets of Johannesburg. Pieces for people who move differently, think independently and define their own identity through what they wear.",
    statement: "Define Your Style.",
    portrait: SK1,
    lookbook: [SK2, SK3, SK4],
    instagram: "shonakiddwtw",
  },
];`;
if (content.includes(designerAnchor) && !content.includes('slug: "shonakidd"')) {
  content = content.replace(designerAnchor, newDesigner);
  changes++;
} else {
  console.warn("~ skipped designer entry (anchor not found, or already added)");
}

// 3. Add the two ShonaKidd products, right before the products array closes.
const productAnchor = `    sizes: ["4Y", "6Y", "8Y", "10Y"],
  },
];`;
const newProducts = `    sizes: ["4Y", "6Y", "8Y", "10Y"],
  },
  {
    id: "shonakidd-flow-rider-tee",
    name: "Flow Rider Printed Tee",
    category: "Tops",
    designer: "shonakidd",
    images: [SK1, SK2],
    fabric: "Heavyweight cotton jersey, screen print",
    care: "Machine wash cold inside out. Tumble dry low.",
    description:
      "A bold graphic tee built for professional flow riders — ShonaKidd's music-and-streetwear energy in a heavyweight cotton print.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "shonakidd-define-your-style-tee",
    name: "Define Your Style Tee",
    category: "Tops",
    designer: "shonakidd",
    images: [SK3, SK4],
    fabric: "Heavyweight cotton jersey, screen print",
    care: "Machine wash cold inside out. Tumble dry low.",
    description:
      "Where fashion meets the flow — a statement tee for anyone who isn't afraid to define their own identity.",
    sizes: ["S", "M", "L", "XL"],
  },
];`;
if (content.includes(productAnchor) && !content.includes('id: "shonakidd-flow-rider-tee"')) {
  content = content.replace(productAnchor, newProducts);
  changes++;
} else {
  console.warn("~ skipped products (anchor not found, or already added)");
}

writeFileSync(filePath, content, "utf-8");
console.log(`\nDone. ${changes}/3 edits applied to src/data/catalog.ts.`);
console.log("Now run: npm run build");
