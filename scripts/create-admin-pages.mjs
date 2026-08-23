import { writeFileSync, existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();

function createAdminPage(routeName, tableName, title, fields) {
  const filePath = path.join(root, `src/routes/admin.${routeName}.tsx`);
  if (existsSync(filePath)) {
    console.log(`~ src/routes/admin.${routeName}.tsx already exists — skipping.`);
    return;
  }

  const fieldRows = fields
    .map(
      (f) => `              ${f.optional ? `{row.${f.key} && (` : ""}
              <p className="mt-1 text-sm${f.muted ? " text-muted-foreground" : ""}">
                ${f.label ? `<span className="text-muted-foreground">${f.label}: </span>` : ""}
                ${f.isEmail ? `<a href={\`mailto:\${row.${f.key}}\`} className="underline underline-offset-4">{row.${f.key}}</a>` : `{row.${f.key}}`}
              </p>${f.optional ? ")}" : ""}`,
    )
    .join("\n");

  const content = `import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/${routeName}")({
  component: Admin${title.replace(/\s/g, "")},
});

type Row = {
  id: string;
  ${fields.map((f) => `${f.key}: string${f.optional ? " | null" : ""};`).join("\n  ")}
  created_at: string;
};

function Admin${title.replace(/\s/g, "")}() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const { data, error: fetchError } = await supabase
        .from("${tableName}")
        .select("*")
        .order("created_at", { ascending: false });

      if (cancelled) return;

      if (fetchError) {
        setError("Could not load ${title.toLowerCase()}. You may not have admin access, or you're not signed in.");
      } else {
        setRows(data as Row[]);
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
      <h1 className="font-serif text-4xl md:text-5xl">${title}</h1>

      {loading && <p className="mt-8 text-sm text-muted-foreground">Loading…</p>}
      {error && <p className="mt-8 text-sm text-destructive">{error}</p>}
      {rows && rows.length === 0 && (
        <p className="mt-8 text-sm text-muted-foreground">No submissions yet.</p>
      )}

      {rows && rows.length > 0 && (
        <div className="mt-10 flex flex-col gap-8">
          {rows.map((row) => (
            <div key={row.id} className="border-b border-border pb-8">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-serif text-xl">{row.name}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(row.created_at).toLocaleString()}
                </p>
              </div>
${fieldRows}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
`;

  writeFileSync(filePath, content, "utf-8");
  console.log(`✓ Created src/routes/admin.${routeName}.tsx`);
}

createAdminPage("ambassadors", "ambassadors", "Ambassador Applications", [
  { key: "city", muted: true, optional: true },
  { key: "email", label: "Email", isEmail: true },
  { key: "social", label: "Social", optional: true },
  { key: "about", label: "" },
]);

createAdminPage("stylists", "stylists", "Stylist Applications", [
  { key: "city", muted: true, optional: true },
  { key: "email", label: "Email", isEmail: true },
  { key: "portfolio", label: "Portfolio", optional: true },
  { key: "about", label: "" },
]);

console.log("\nDone. Now run: npm run build");
