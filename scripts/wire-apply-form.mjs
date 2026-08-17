// scripts/wire-apply-form.mjs
// Run with: node scripts/wire-apply-form.mjs
//
// Updates src/routes/apply.tsx so the form actually calls the
// send-application Supabase Edge Function on submit, instead of
// just faking success with local state.

import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const filePath = path.join(process.cwd(), "src/routes/apply.tsx");
let content;
try {
  content = readFileSync(filePath, "utf-8");
} catch {
  console.error("✗ Could not read src/routes/apply.tsx — run this from your project root.");
  process.exit(1);
}

let changes = 0;

function apply(label, find, replace) {
  if (content.includes(find)) {
    content = content.replace(find, replace);
    changes++;
    console.log(`✓ ${label}`);
  } else if (content.includes(replace)) {
    console.log(`~ ${label} (already applied)`);
  } else {
    console.warn(`~ skipped "${label}" (pattern not found — check the file manually)`);
  }
}

// 1. Add the supabase client import, right after the catalog import.
apply(
  "import supabase client",
  `import { products } from "@/data/catalog";\n`,
  `import { products } from "@/data/catalog";\nimport { supabase } from "@/integrations/supabase/client";\n`,
);

// 2. Add sending/error state alongside the existing sent state.
apply(
  "add sending/error state",
  `  const [sent, setSent] = useState(false);`,
  `  const [sent, setSent] = useState(false);\n  const [sending, setSending] = useState(false);\n  const [error, setError] = useState<string | null>(null);`,
);

// 3. Replace the fake onSubmit with a real call to the Edge Function.
apply(
  "wire real onSubmit handler",
  `            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}`,
  `            onSubmit={async (e) => {
              e.preventDefault();
              setError(null);
              setSending(true);

              const form = e.currentTarget;
              const data = new FormData(form);

              const { error: fnError } = await supabase.functions.invoke("send-application", {
                body: {
                  name: data.get("name"),
                  label: data.get("label"),
                  email: data.get("email"),
                  portfolio: data.get("portfolio"),
                  about: data.get("about"),
                },
              });

              setSending(false);

              if (fnError) {
                setError("Something went wrong — please try again or email us directly.");
                return;
              }

              setSent(true);
            }}`,
);

// 4. Update the submit button to reflect sending/disabled state.
apply(
  "update submit button + add error message",
  `            <button
              type="submit"
              className="mt-10 border border-foreground bg-foreground px-10 py-4 text-[0.7rem] uppercase tracking-[0.22em] text-background transition-colors duration-300 hover:bg-background hover:text-foreground"
            >
              {sent ? "Application received" : "Submit application"}
            </button>
            {sent && (
              <p className="mt-4 text-sm text-muted-foreground">
                Thank you — we'll be in touch within ten days.
              </p>
            )}`,
  `            <button
              type="submit"
              disabled={sending || sent}
              className="mt-10 border border-foreground bg-foreground px-10 py-4 text-[0.7rem] uppercase tracking-[0.22em] text-background transition-colors duration-300 hover:bg-background hover:text-foreground disabled:opacity-50"
            >
              {sent ? "Application received" : sending ? "Sending…" : "Submit application"}
            </button>
            {error && (
              <p className="mt-4 text-sm text-destructive">{error}</p>
            )}
            {sent && (
              <p className="mt-4 text-sm text-muted-foreground">
                Thank you — we'll be in touch within ten days.
              </p>
            )}`,
);

writeFileSync(filePath, content, "utf-8");
console.log(`\nDone. ${changes}/4 edits applied to src/routes/apply.tsx.`);
console.log("Now run: npm run build");
