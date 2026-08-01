import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset Password · Collaborate.art" },
      { name: "description", content: "Choose a new password for your Collaborate.art account." },
      { property: "og:title", content: "Reset Password · Collaborate.art" },
      {
        property: "og:description",
        content: "Choose a new password for your Collaborate.art account.",
      },
    ],
  }),
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setReady(!!data.session));
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const parsed = z.string().min(8).max(72).safeParse(password);
    if (!parsed.success) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password: parsed.data });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Password updated.");
    navigate({ to: "/account", replace: true });
  }

  return (
    <section className="mx-auto max-w-[520px] px-5 py-24 md:px-10">
      <h1 className="font-serif text-4xl">Set a new password</h1>
      {!ready && (
        <p className="mt-4 text-sm text-muted-foreground">
          Open this page from the reset link in your email.
        </p>
      )}
      <form onSubmit={handleSubmit} className="mt-10 space-y-6">
        <label className="block">
          <span className="text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
            New password
          </span>
          <input
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            maxLength={72}
            required
            className="mt-2 w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-foreground"
          />
        </label>
        <button
          type="submit"
          disabled={busy || !ready}
          className="w-full bg-foreground px-4 py-4 text-[0.7rem] uppercase tracking-[0.22em] text-background transition-opacity hover:opacity-85 disabled:opacity-50"
        >
          {busy ? "Saving…" : "Update password"}
        </button>
      </form>
    </section>
  );
}
