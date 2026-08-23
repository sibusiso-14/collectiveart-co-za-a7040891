import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/stylists")({
  component: AdminStylistApplications,
});

type Row = {
  id: string;
  city: string | null;
  email: string;
  portfolio: string | null;
  about: string;
  created_at: string;
};

function AdminStylistApplications() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const { data, error: fetchError } = await supabase
        .from("stylists")
        .select("*")
        .order("created_at", { ascending: false });

      if (cancelled) return;

      if (fetchError) {
        setError("Could not load stylist applications. You may not have admin access, or you're not signed in.");
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
      <h1 className="font-serif text-4xl md:text-5xl">Stylist Applications</h1>

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
              {row.city && (
              <p className="mt-1 text-sm text-muted-foreground">
                
                {row.city}
              </p>)}
              
              <p className="mt-1 text-sm">
                <span className="text-muted-foreground">Email: </span>
                <a href={`mailto:${row.email}`} className="underline underline-offset-4">{row.email}</a>
              </p>
              {row.portfolio && (
              <p className="mt-1 text-sm">
                <span className="text-muted-foreground">Portfolio: </span>
                {row.portfolio}
              </p>)}
              
              <p className="mt-1 text-sm">
                
                {row.about}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
