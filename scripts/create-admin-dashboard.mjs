import { writeFileSync, existsSync } from "node:fs";
import path from "node:path";

const filePath = path.join(process.cwd(), "src/routes/admin.index.tsx");

if (existsSync(filePath)) {
  console.log("~ src/routes/admin.index.tsx already exists — not overwriting.");
  process.exit(0);
}

const content = `import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

type Row = {
  id: string;
  name: string;
  email: string;
  city?: string | null;
  portfolio?: string | null;
  social?: string | null;
  about: string;
  created_at: string;
};

function useTable(table: string) {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const { data, error: fetchError } = await supabase
        .from(table)
        .select("*")
        .order("created_at", { ascending: false });

      if (cancelled) return;

      if (fetchError) {
        setError("Could not load — you may not have admin access, or you're not signed in.");
      } else {
        setRows(data as Row[]);
      }
      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [table]);

  return { rows, error, loading };
}

function Section({ title, table }: { title: string; table: string }) {
  const { rows, error, loading } = useTable(table);

  return (
    <section className="mt-16 first:mt-0">
      <h2 className="font-serif text-2xl md:text-3xl">{title}</h2>

      {loading && <p className="mt-4 text-sm text-muted-foreground">Loading…</p>}
      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
      {rows && rows.length === 0 && (
        <p className="mt-4 text-sm text-muted-foreground">No submissions yet.</p>
      )}

      {rows && rows.length > 0 && (
        <div className="mt-6 flex flex-col gap-6">
          {rows.map((row) => (
            <div key={row.id} className="border-b border-border pb-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-serif text-lg">{row.name}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(row.created_at).toLocaleString()}
                </p>
              </div>
              {row.city && <p className="mt-1 text-sm text-muted-foreground">{row.city}</p>}
              <p className="mt-2 text-sm">
                <span className="text-muted-foreground">Email: </span>
                <a href={\`mailto:\${row.email}\`} className="underline underline-offset-4">
                  {row.email}
                </a>
              </p>
              {row.portfolio && (
                <p className="mt-1 text-sm">
                  <span className="text-muted-foreground">Portfolio: </span>
                  {row.portfolio}
                </p>
              )}
              {row.social && (
                <p className="mt-1 text-sm">
                  <span className="text-muted-foreground">Social: </span>
                  {row.social}
                </p>
              )}
              <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed">{row.about}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function AdminDashboard() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-14 md:px-10 md:py-20">
      <h1 className="font-serif text-4xl md:text-5xl">Admin Dashboard</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        All submissions across designer, ambassador, and stylist applications.
      </p>

      <Section title="Designer Applications" table="applications" />
      <Section title="Ambassador Applications" table="ambassadors" />
      <Section title="Stylist Applications" table="stylists" />
    </div>
  );
}
`;

writeFileSync(filePath, content, "utf-8");
console.log("✓ Created src/routes/admin.index.tsx");
