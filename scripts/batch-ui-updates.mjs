import { readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const file = (p) => path.join(root, p);
let changes = 0;

function edit(label, relPath, fn) {
  const full = file(relPath);
  if (!existsSync(full)) {
    console.warn(`~ skipped ${label} (${relPath} not found)`);
    return;
  }
  const before = readFileSync(full, "utf-8");
  const after = fn(before);
  if (after === before) {
    console.warn(`~ skipped ${label} (pattern not found or already applied)`);
    return;
  }
  writeFileSync(full, after, "utf-8");
  changes++;
  console.log(`✓ ${label}`);
}

// 1. Dark palette controlled by a class on <html>
edit("dark/light CSS", "src/styles.css", (s) => {
  if (s.includes("theme-toggle")) return s;
  let out = s.replace(/\n\/\* auto-dark[\s\S]*?\n  \}\n\}\n?/, "\n");
  out += `
/* theme-toggle: dark palette applies when <html> has the "dark" class */
:root.dark {
  color-scheme: dark;
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.97 0 0);
  --card: oklch(0.18 0 0);
  --card-foreground: oklch(0.97 0 0);
  --popover: oklch(0.18 0 0);
  --popover-foreground: oklch(0.97 0 0);
  --primary: oklch(0.97 0 0);
  --primary-foreground: oklch(0.145 0 0);
  --secondary: oklch(0.24 0 0);
  --secondary-foreground: oklch(0.97 0 0);
  --muted: oklch(0.24 0 0);
  --muted-foreground: oklch(0.68 0 0);
  --accent: oklch(0.24 0 0);
  --accent-foreground: oklch(0.97 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --destructive-foreground: oklch(0.97 0 0);
  --border: oklch(1 0 0 / 12%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.8 0 0);
}
`;
  return out;
});

// 2. Toggle button component
const togglePath = file("src/components/ThemeToggle.tsx");
if (!existsSync(togglePath)) {
  writeFileSync(
    togglePath,
    `import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    document.documentElement.style.colorScheme = next ? "dark" : "light";
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="text-[0.7rem] uppercase tracking-[0.22em] text-foreground/70 transition-colors hover:text-foreground"
    >
      {dark ? "Light" : "Dark"}
    </button>
  );
}
`,
    "utf-8",
  );
  changes++;
  console.log("✓ created ThemeToggle component");
}

// 3. Put the toggle in the header
edit("add toggle to header", "src/components/SiteHeader.tsx", (s) => {
  if (s.includes("ThemeToggle")) return s;
  let out = s.replace(
    `import { useAuth } from "@/hooks/useAuth";`,
    `import { useAuth } from "@/hooks/useAuth";\nimport { ThemeToggle } from "@/components/ThemeToggle";`,
  );
  out = out.replace(
    `<div className="flex items-center justify-end gap-6">`,
    `<div className="flex items-center justify-end gap-6">\n          <ThemeToggle />`,
  );
  if (!out.includes("<ThemeToggle />")) return s;
  return out;
});

// 4. Apply saved/device theme before first paint (no white flash)
edit("theme script in <head>", "src/routes/__root.tsx", (s) => {
  if (s.includes("THEME_SCRIPT")) return s;
  const themeScript =
    '(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;var r=document.documentElement;r.classList.toggle("dark",d);r.style.colorScheme=d?"dark":"light";}catch(e){}})();';
  let out = s.replace(
    "export const Route = createRootRouteWithContext",
    `const THEME_SCRIPT = ${JSON.stringify(themeScript)};\n\nexport const Route = createRootRouteWithContext`,
  );
  out = out.replace(/head: \(\) => \(\{\s*meta: \[/, () => `head: () => ({\n    scripts: [{ children: THEME_SCRIPT }],\n    meta: [`);
  out = out.replace(`<html lang="en">`, `<html lang="en" suppressHydrationWarning>`);
  if (!out.includes("scripts: [{ children: THEME_SCRIPT }]")) return s;
  return out;
});

// 5. Slum Jaguar: show the whole photo inside the standard frame
edit("Slum Jaguar picture fit on cards", "src/components/ProductCard.tsx", (s) => {
  const find = `className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"`;
  const replace =
    'className={`h-full w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.04] ${\n            product.designer === "slum-jaguar-streetwear" ? "bg-secondary object-contain" : "object-cover"\n          }`}';
  return s.includes(find) ? s.replace(find, replace) : s;
});

// 6. Wardrobe: 12 pictures, one per brand first, newest brands get extra
edit("Wardrobe 12 pictures", "src/routes/index.tsx", (s) => {
  if (s.includes("const byDesigner")) return s;
  const newCode = `(() => {
            const order = [
              "slum-jaguar-streetwear",
              "shonakidd",
              "anxiety",
              "last-cloud-designs",
              "galbakaline",
              "designing-balaclava",
              "damnation-designs",
              "absolute-goat",
            ];
            const seen = new Set<string>();
            const byDesigner = order.map((slug) =>
              products.filter((p) => {
                if (p.designer !== slug) return false;
                if (slug === "absolute-goat" && p.id !== "absolute-goat-snow-dark-bag") return false;
                return true;
              }),
            );
            const picked: typeof products = [];
            for (let round = 0; round < 6 && picked.length < 12; round++) {
              for (const list of byDesigner) {
                if (picked.length >= 12) break;
                const p = list[round];
                if (!p || seen.has(p.images[0])) continue;
                seen.add(p.images[0]);
                picked.push(p);
              }
            }
            return picked;
          })().map((p) => (`;
  return s.replace(
    /\(\(\) => \{\s*const seen = new Set<string>\(\);[\s\S]*?\}\)\(\)\.map\(\(p\) => \(/,
    () => newCode,
  );
});

console.log(`\nDone. ${changes} change(s) applied.`);
