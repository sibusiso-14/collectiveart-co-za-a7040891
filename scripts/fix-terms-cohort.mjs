import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const filePath = path.join(process.cwd(), "src/routes/terms.tsx");
let content = readFileSync(filePath, "utf-8");
let changes = 0;

const find1 = "3. For Designers (Seller Cohorts)";
const replace1 = "3. For Designers";
if (content.includes(find1)) {
  content = content.replace(find1, replace1);
  changes++;
  console.log("✓ updated section 3 heading");
} else {
  console.warn("~ skipped heading (pattern not found)");
}

const find2 = "3.1 Curation and Rotational Model";
const replace2 = "3.1 Curation and Listing";
if (content.includes(find2)) {
  content = content.replace(find2, replace2);
  changes++;
  console.log("✓ updated 3.1 subheading");
} else {
  console.warn("~ skipped 3.1 subheading (pattern not found)");
}

const find3 = `Spaces are strictly limited to five (5) Designers per three (3)
            month cycle ("Cohort"). Inclusion in a Cohort is at the sole
            discretion of the Website. At the end of your designated
            3-month cycle, your listings will be automatically deactivated
            to allow the next Cohort to launch.`;
const replace3 = `Designer enrollment is open, with no fixed limit on the number of
            Designers listed at any time. Inclusion on the Website is at
            the sole discretion of the Website, and listings remain active
            on an ongoing basis unless otherwise agreed or terminated in
            line with these Terms.`;
if (content.includes(find3)) {
  content = content.replace(find3, replace3);
  changes++;
  console.log("✓ updated 3.1 body text");
} else {
  console.warn("~ skipped 3.1 body (exact text not found — will need manual check)");
}

writeFileSync(filePath, content, "utf-8");
console.log(`\nDone. ${changes}/3 edits applied.`);
