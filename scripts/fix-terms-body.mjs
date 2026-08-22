import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const filePath = path.join(process.cwd(), "src/routes/terms.tsx");
let content = readFileSync(filePath, "utf-8");

const find = `            Spaces are strictly limited to five (5) Designers per three (3)
            month cycle ("Cohort"). Inclusion in a Cohort is at the sole
            discretion of the Website. At the end of your designated 3-month
            cycle, your listings will be automatically deactivated to allow the
            next Cohort to launch.`;

const replace = `            Designer enrollment is open, with no fixed limit on the number
            of Designers listed at any time. Inclusion on the Website is at
            the sole discretion of the Website, and listings remain active
            on an ongoing basis unless otherwise agreed or terminated in
            line with these Terms.`;

if (content.includes(find)) {
  content = content.replace(find, replace);
  console.log("✓ updated 3.1 body text");
} else {
  console.warn("~ still not found — needs manual check");
}

writeFileSync(filePath, content, "utf-8");
