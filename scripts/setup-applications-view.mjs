// scripts/setup-applications-view.mjs
// Run with: node scripts/setup-applications-view.mjs
//
// 1. Updates src/routes/apply.tsx to insert directly into the
//    `applications` table instead of calling the email function.
// 2. Creates src/routes/admin.applications.tsx — an admin-only page
//    that lists all submitted applications.

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();

// ---------- 1. Update apply.tsx ----------
const applyPath = path.join(root, "src/routes/apply.tsx");
let applyContent;
try {
  applyContent = readFileSync(applyPath, "utf-8");
} catch {
  console.error("✗ Could not read src/routes/apply.tsx — run this from your project root.");
  process.exit(1);
}

let applyChanges = 0;
function applyEdit(label, find, replace) {
  if (applyContent.includes(find)) {
    applyContent = applyContent.replace(find, replace);
    applyChanges++;
    console.log(`✓ apply.tsx: ${label}`);
  } else if (applyContent.includes(replace)) {
    console.log(`~ apply.tsx: ${label} (already applied)`);
  } else {
    console.warn(`~ skipped "apply.tsx: ${label}" (pattern not found — check the file manually)`);
  }
}

applyEdit(
  "replace edge-function call with direct table insert",
  `              const { error: fnError } = await supabase.functions.invoke("send-application", {
                body: {
                  name: data.get("name"),
                  label: data.get("label"),
                  email: data.get("email"),
                  portfolio: data.get("portfolio"),
                  about: data.get("about"),
                },
              });

              setSending(false);

              if (fnError) {`,
  `              const { error: fnError } = await supabase.from("applications").insert({
                name: data.get("name") as string,
                label: data.get("label") as string,
                email: data.get("email") as string,
                portfolio: data.get("portfolio") as string,
                about: data.get("about") as string,
              });

              setSending(false);

              if (fnError) {`,
);

writeFileSync(applyPath, applyContent, "utf-8");
console.log(`apply.tsx: ${applyChanges}/1 edit(s) applied.\n`);

// ---------- 2. Create admin.applications.tsx ----------
const adminPath = path.join(root, "src/routes/admin.applications.tsx");
if (existsSync(adminPath)) {
  console.log("~ src/routes/admin.applications.tsx already exists — not overwriting.");
} else {
  const adminPageContent = `import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/applications")({
  component: AdminApplications,
});

type Application = {
  id: string;
  name: string;
  label: string | null;
  email: string;
  portfolio: string | null;
  about: string;
  created_at: string;
};

function AdminApplications() {
  const [applications, setApplications] = useState<Application[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const { data, error: fetchError } = await supabase
        .from("applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (cancelled) return;

      if (fetchError) {
        setError(
          "Could not load applications. You may not have admin access, or you're not signed in.",
        );
      } else {
        setApplications(data as Application[]);
      }
      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-5 py-14 md:px-10 md:py-20">
      <h1 className="font-serif text-4xl md:text-5xl">Applications</h1>

      {loading && (
        <p className="mt-8 text-sm text-muted-foreground">Loading…</p>
      )}

      {error && (
        <p className="mt-8 text-sm text-destructive">{error}</p>
      )}

      {applications && applications.length === 0 && (
        <p className="mt-8 text-sm text-muted-foreground">No applications yet.</p>
      )}

      {applications && applications.length > 0 && (
        <div className="mt-10 flex flex-col gap-8">
          {applications.map((app) => (
            <div key={app.id} className="border-b border-border pb-8">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-serif text-xl">{app.name}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(app.created_at).toLocaleString()}
                </p>
              </div>
              {app.label && (
                <p className="mt-1 text-sm text-muted-foreground">{app.label}</p>
              )}
              <p className="mt-3 text-sm">
                <span className="text-muted-foreground">Email: </span>
                <a href={\`mailto:\${app.email}\`} className="underline underline-offset-4">
                  {app.email}
                </a>
              </p>
              {app.portfolio && (
                <p className="mt-1 text-sm">
                  <span className="text-muted-foreground">Portfolio: </span>
                  {app.portfolio}
                </p>
              )}
              <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed">{app.about}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
`;
  writeFileSync(adminPath, adminPageContent, "utf-8");
  console.log("✓ Created src/routes/admin.applications.tsx");
}

console.log("\nDone. Now run: npm run build");
