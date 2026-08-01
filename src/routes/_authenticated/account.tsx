import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/account")({
  head: () => ({
    meta: [
      { title: "Your Account · Collaborate.art" },
      {
        name: "description",
        content: "Manage your Collaborate.art profile, label details and contact handle.",
      },
      { property: "og:title", content: "Your Account · Collaborate.art" },
      {
        property: "og:description",
        content: "Manage your Collaborate.art profile and label details.",
      },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [displayName, setDisplayName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [instagram, setInstagram] = useState("");
  const [saving, setSaving] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["account"],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) return null;
      const [{ data: profile }, { data: roles }] = await Promise.all([
        supabase
          .from("profiles")
          .select("display_name, brand_name, instagram_handle")
          .eq("id", user.id)
          .maybeSingle(),
        supabase.from("user_roles").select("role").eq("user_id", user.id),
      ]);
      return {
        email: user.email ?? "",
        profile,
        roles: (roles ?? []).map((r) => r.role),
      };
    },
  });

  useEffect(() => {
    if (!data?.profile) return;
    setDisplayName(data.profile.display_name ?? "");
    setBrandName(data.profile.brand_name ?? "");
    setInstagram(data.profile.instagram_handle ?? "");
  }, [data]);

  async function handleSave(event: React.FormEvent) {
    event.preventDefault();
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").upsert({
      id: userData.user.id,
      display_name: displayName.trim().slice(0, 80) || null,
      brand_name: brandName.trim().slice(0, 80) || null,
      instagram_handle: instagram.trim().replace(/^@/, "").slice(0, 40) || null,
    });
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Profile saved.");
    queryClient.invalidateQueries({ queryKey: ["account"] });
  }

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  const isDesigner = data?.roles.includes("designer");

  return (
    <section className="mx-auto max-w-[720px] px-5 py-16 md:px-10 md:py-24">
      <p className="text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">
        {isDesigner ? "Designer account" : "Member account"}
      </p>
      <h1 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">Your account</h1>
      <p className="mt-4 text-sm text-muted-foreground">{data?.email}</p>

      {isLoading ? (
        <p className="mt-12 text-sm text-muted-foreground">Loading…</p>
      ) : (
        <form onSubmit={handleSave} className="mt-12 space-y-6">
          <Field label="Name">
            <input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              maxLength={80}
              className="w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-foreground"
            />
          </Field>
          <Field label="Label / brand name">
            <input
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              maxLength={80}
              className="w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-foreground"
            />
          </Field>
          <Field label="Instagram handle">
            <input
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              maxLength={40}
              placeholder="withoutthe@"
              className="w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-foreground"
            />
          </Field>
          <button
            type="submit"
            disabled={saving}
            className="bg-foreground px-8 py-4 text-[0.7rem] uppercase tracking-[0.22em] text-background transition-opacity hover:opacity-85 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save profile"}
          </button>
        </form>
      )}

      <button
        type="button"
        onClick={handleSignOut}
        className="mt-16 border-b border-foreground pb-1 text-[0.7rem] uppercase tracking-[0.22em]"
      >
        Sign out
      </button>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
