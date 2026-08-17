// scripts/remove-price.mjs
// Run with: node scripts/remove-price.mjs
//
// Removes all price-related code from the catalog data model and every
// component that displays it: catalog.ts, ProductCard.tsx,
// product.$productId.tsx, and the price filter in shop.tsx.

import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();

function edit(relPath, transforms) {
  const fullPath = path.join(root, relPath);
  let content;
  try {
    content = readFileSync(fullPath, "utf-8");
  } catch {
    console.error(`✗ Could not read ${relPath} — check you're running this from the project root.`);
    return;
  }

  let changed = 0;
  for (const [label, find, replace] of transforms) {
    if (typeof find === "string") {
      if (content.includes(find)) {
        content = content.replace(find, replace);
        changed++;
      } else {
        console.warn(`  ~ skipped "${label}" in ${relPath} (pattern not found — may already be edited)`);
      }
    } else {
      // RegExp
      const before = content;
      content = content.replace(find, replace);
      if (content !== before) changed++;
      else console.warn(`  ~ skipped "${label}" in ${relPath} (pattern not found — may already be edited)`);
    }
  }

  // Clean up formatPrice from any @/data/catalog import list, and drop the
  // whole import line if formatPrice was the only named import.
  content = content.replace(
    /import\s*\{([^}]*)\}\s*from\s*(["'])@\/data\/catalog\2;\n?/g,
    (full, names, quote) => {
      const list = names
        .split(",")
        .map((n) => n.trim())
        .filter((n) => n && n !== "formatPrice");
      if (list.length === 0) return "";
      return `import { ${list.join(", ")} } from ${quote}@/data/catalog${quote};\n`;
    },
  );

  writeFileSync(fullPath, content, "utf-8");
  console.log(`✓ ${relPath} — ${changed} edit(s) applied`);
}

// 1. catalog.ts
edit("src/data/catalog.ts", [
  ["price field in Product type", "  price: number;\n", ""],
  ["all price: N, lines", /^\s*price:\s*\d+,\n/gm, ""],
  [
    "formatPrice export",
    `export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 0,
  }).format(n);
`,
    "",
  ],
  // in case the old USD version is still present instead
  [
    "formatPrice export (USD variant)",
    `export const formatPrice = (n: number) => \`$\${n.toLocaleString("en-US")}\`;\n`,
    "",
  ],
]);

// 2. ProductCard.tsx
edit("src/components/ProductCard.tsx", [
  [
    "price span",
    `<span className="shrink-0 text-sm">{formatPrice(product.price)}</span>`,
    "",
  ],
]);

// 3. product.$productId.tsx
edit("src/routes/product.$productId.tsx", [
  [
    "price paragraph block",
    `            <p className="mt-4 text-lg">
              {formatPrice(product.price)}{" "}
              <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                guide price
              </span>
            </p>
`,
    "",
  ],
]);

// 4. shop.tsx
edit("src/routes/shop.tsx", [
  [
    "priceBands array",
    `const priceBands = [
  { label: "Under $300", min: 0, max: 299 },
  { label: "$300 — $700", min: 300, max: 700 },
  { label: "Over $700", min: 701, max: Infinity },
];

`,
    "",
  ],
  ["band state", `  const [band, setBand] = useState<number | null>(null);\n`, ""],
  [
    "filtered memo",
    `  const filtered = useMemo(
    () =>
      products.filter((p) => {
        if (category && p.category !== category) return false;
        if (designer && p.designer !== designer) return false;
        if (band !== null) {
          const b = priceBands[band];
          if (p.price < b.min || p.price > b.max) return false;
        }
        return true;
      }),
    [category, designer, band],
  );`,
    `  const filtered = useMemo(
    () =>
      products.filter((p) => {
        if (category && p.category !== category) return false;
        if (designer && p.designer !== designer) return false;
        return true;
      }),
    [category, designer],
  );`,
  ],
  [
    "clear() band reset",
    `  const clear = () => {
    setCategory(null);
    setDesigner(null);
    setBand(null);
  };`,
    `  const clear = () => {
    setCategory(null);
    setDesigner(null);
  };`,
  ],
  [
    "Price FilterGroup UI",
    `
          <FilterGroup title="Price">
            <FilterButton active={band === null} onClick={() => setBand(null)}>
              Any
            </FilterButton>
            {priceBands.map((b, i) => (
              <FilterButton key={b.label} active={band === i} onClick={() => setBand(i)}>
                {b.label}
              </FilterButton>
            ))}
          </FilterGroup>
`,
    "",
  ],
]);

console.log("\nDone. Now run: grep -rn \"price\" src/ --include=\"*.ts\" --include=\"*.tsx\"");
console.log("to confirm only harmless marketing-copy mentions remain, then npm run build.");
