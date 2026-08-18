import { createFileRoute } from "@tanstack/react-router";
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
                <a href={`mailto:${app.email}`} className="underline underline-offset-4">
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
