import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/applications")({
  component: AdminApplications,
});

type CreatorApplication = {
  type: "creator";
  id: string;
  name: string;
  label: string | null;
  email: string;
  portfolio: string | null;
  about: string;
  created_at: string;
};

type AmbassadorApplication = {
  type: "ambassador";
  id: string;
  name: string;
  email: string;
  social: string | null;
  city: string | null;
  about: string;
  created_at: string;
};

type StylistApplication = {
  type: "stylist";
  id: string;
  name: string;
  email: string;
  portfolio: string | null;
  city: string | null;
  about: string;
  created_at: string;
  approved: boolean;
};

type Application = CreatorApplication | AmbassadorApplication | StylistApplication;

function AdminApplications() {
  const [applications, setApplications] = useState<Application[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [approvingId, setApprovingId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    load();
    return () => {
      cancelled = true;
    };

    async function load() {
      const [creatorsResult, ambassadorsResult, stylistsResult] = await Promise.all([
        supabase.from("applications").select("*").order("created_at", { ascending: false }),
        supabase.from("ambassadors").select("*").order("created_at", { ascending: false }),
        supabase.from("stylists").select("*").order("created_at", { ascending: false }),
      ]);

      if (cancelled) return;

      if (creatorsResult.error || ambassadorsResult.error || stylistsResult.error) {
        setError(
          "Could not load applications. You may not have admin access, or you're not signed in.",
        );
        setLoading(false);
        return;
      }

      const creators: Application[] = (creatorsResult.data ?? []).map((a) => ({
        ...a,
        type: "creator" as const,
      }));
      const ambassadors: Application[] = (ambassadorsResult.data ?? []).map((a) => ({
        ...a,
        type: "ambassador" as const,
      }));
      const stylists: Application[] = (stylistsResult.data ?? []).map((s) => ({
        ...s,
        type: "stylist" as const,
      }));

      const combined = [...creators, ...ambassadors, ...stylists].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );

      setApplications(combined);
      setLoading(false);
    }
  }, []);

  async function handleDelete(app: Application) {
    const confirmed = window.confirm(`Delete the application from "${app.name}"? This can't be undone.`);
    if (!confirmed) return;

    setDeletingId(app.id);
    const table =
      app.type === "creator" ? "applications" : app.type === "ambassador" ? "ambassadors" : "stylists";
    const { error: deleteError } = await supabase.from(table).delete().eq("id", app.id);
    setDeletingId(null);

    if (deleteError) {
      window.alert("Could not delete this application. Please try again.");
      return;
    }

    setApplications((prev) => (prev ? prev.filter((a) => a.id !== app.id) : prev));
  }

  async function handleToggleApprove(app: StylistApplication) {
    setApprovingId(app.id);
    const { error: updateError } = await supabase
      .from("stylists")
      .update({ approved: !app.approved })
      .eq("id", app.id);
    setApprovingId(null);

    if (updateError) {
      window.alert("Could not update approval status. Please try again.");
      return;
    }

    setApplications((prev) =>
      prev
        ? prev.map((a) =>
            a.id === app.id && a.type === "stylist" ? { ...a, approved: !app.approved } : a,
          )
        : prev,
    );
  }

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
            <div key={`${app.type}-${app.id}`} className="border-b border-border pb-8">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="flex items-baseline gap-3">
                  <p className="font-serif text-xl">{app.name}</p>
                  <span className="rounded-full border border-border px-2 py-0.5 text-[0.65rem] uppercase tracking-wide text-muted-foreground">
                    {app.type === "creator" ? "Creator" : app.type === "ambassador" ? "Ambassador" : "Stylist"}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-xs text-muted-foreground">
                    {new Date(app.created_at).toLocaleString()}
                  </p>
                  {app.type === "stylist" && (
                    <button
                      type="button"
                      onClick={() => handleToggleApprove(app)}
                      disabled={approvingId === app.id}
                      className="text-xs uppercase tracking-wide underline underline-offset-4 disabled:opacity-50"
                    >
                      {approvingId === app.id
                        ? "Updating…"
                        : app.approved
                          ? "Unapprove"
                          : "Approve"}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDelete(app)}
                    disabled={deletingId === app.id}
                    className="text-xs uppercase tracking-wide text-destructive underline underline-offset-4 disabled:opacity-50"
                  >
                    {deletingId === app.id ? "Deleting…" : "Delete"}
                  </button>
                </div>
              </div>
              {app.type === "creator" && app.label && (
                <p className="mt-1 text-sm text-muted-foreground">{app.label}</p>
              )}
              {app.type === "ambassador" && app.city && (
                <p className="mt-1 text-sm text-muted-foreground">{app.city}</p>
              )}
              {app.type === "stylist" && app.city && (
                <p className="mt-1 text-sm text-muted-foreground">{app.city}</p>
              )}
              <p className="mt-3 text-sm">
                <span className="text-muted-foreground">Email: </span>
                <a href={`mailto:${app.email}`} className="underline underline-offset-4">
                  {app.email}
                </a>
              </p>
              {app.type === "creator" && app.portfolio && (
                <p className="mt-1 text-sm">
                  <span className="text-muted-foreground">Portfolio: </span>
                  {app.portfolio}
                </p>
              )}
              {app.type === "ambassador" && app.social && (
                <p className="mt-1 text-sm">
                  <span className="text-muted-foreground">Social: </span>
                  {app.social}
                </p>
              )}
              {app.type === "stylist" && app.portfolio && (
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
