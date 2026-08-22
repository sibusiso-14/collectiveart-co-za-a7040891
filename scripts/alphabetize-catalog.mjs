// scripts/alphabetize-catalog.mjs
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const filePath = path.join(process.cwd(), "src/data/catalog.ts");
let content = readFileSync(filePath, "utf-8");

function findMatchingBracket(str, openIdx, openChar, closeChar) {
  let depth = 0;
  for (let i = openIdx; i < str.length; i++) {
    if (str[i] === openChar) depth++;
    else if (str[i] === closeChar) {
      depth--;
      if (depth === 0) return i;
    }
  }
  throw new Error("No matching bracket found");
}

function splitObjects(body) {
  const objects = [];
  let depth = 0;
  let start = -1;
  for (let i = 0; i < body.length; i++) {
    if (body[i] === "{") {
      if (depth === 0) start = i;
      depth++;
    } else if (body[i] === "}") {
      depth--;
      if (depth === 0 && start !== -1) {
        objects.push(body.slice(start, i + 1));
        start = -1;
      }
    }
  }
  return objects;
}

function sortArrayByName(content, declRegex, label) {
  const match = content.match(declRegex);
  if (!match) {
    console.warn(`~ skipped (pattern not found): ${label}`);
    return content;
  }
  const openIdx = match.index + match[0].length - 1;
  const closeIdx = findMatchingBracket(content, openIdx, "[", "]");

  const body = content.slice(openIdx + 1, closeIdx);
  const objects = splitObjects(body);

  const withNames = objects.map((obj) => {
    const m = obj.match(/name:\s*"([^"]*)"/);
    return { obj, name: m ? m[1] : "" };
  });

  withNames.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }));

  const newBody = "\n" + withNames.map(({ obj }) => "  " + obj + ",").join("\n") + "\n";

  const before = content.slice(0, openIdx + 1);
  const after = content.slice(closeIdx);
  const newContent = before + newBody + after;

  console.log(`✓ sorted ${objects.length} entries for: ${label}`);
  return newContent;
}

content = sortArrayByName(
  content,
  /export const designers:\s*Designer\[\s*\]\s*=\s*\[/,
  "designers",
);
content = sortArrayByName(
  content,
  /export const products:\s*Product\[\s*\]\s*=\s*\[/,
  "products",
);

writeFileSync(filePath, content, "utf-8");
console.log("\nDone. Now run: npm run build");