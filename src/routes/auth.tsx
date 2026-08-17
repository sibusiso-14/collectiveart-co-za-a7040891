import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const searchSchema = z.object({
  redirect: z.string().optional(),
});

const credentials = z.object({
  email: z.string().trim().email({ message: "Enter a valid email" }).max(255),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }).max(72),
});

export const Route = createFileRoute("/auth")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Sign In · Collaborate.art" },
      {
        name: "description",
        content:
          "Sign in or create a Collaborate.art account to save pieces, follow ateliers and manage your label.",
      },
      { property: "og:title", content: "Sign In · Collaborate.art" },
      {
        property: "og:description",
        content: "Accounts for shoppers and independent designers on Collaborate.art.",
      },
    ],
  }),
  component: AuthPage,
});

function safePath(value: string | undefined) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/account";
  return value;
}

function AuthPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/auth" });
  const destination = safePath(search.redirect);

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [accountType, setAccountType] = useState<"shopper" | "designer">("shopper");
  const [busy, setBusy] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: destination, replace: true });
    });
  }, [destination, navigate]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const parsed = credentials.safeParse({ email, password });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Check your details");
      return;
    }

    setBusy(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: {
            emailRedirectTo: window.location.origin,
            data: {
              display_name: displayName.trim().slice(0, 80),
              brand_name: accountType === "designer" ? brandName.trim().slice(0, 80) : "",
              account_type: accountType,
            },
          },
        });
        if (error) throw error;
        if (!data.session) {
          setCheckEmail(true);
          return;
        }
        navigate({ to: destination, replace: true });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: parsed.data.email,
          password: parsed.data.password,
        });
        if (error) throw error;
        navigate({ to: destination, replace: true });
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle() {
    setBusy(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}${destination ?? "/"}`,
      },
    });
    if (error) {
      setBusy(false);
      toast.error("Google sign-in failed. Please try again.");
    }
  }
  async function handleReset() {
    const parsed = credentials.shape.email.safeParse(email);
    if (!parsed.success) {
      toast.error("Enter your email first");
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(parsed.data, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) toast.error(error.message);
    else toast.success("Password reset link sent.");
  }

  if (checkEmail) {
    return (
      <section className="mx-auto max-w-[520px] px-5 py-24 text-center md:px-10">
        <h1 className="font-serif text-4xl">Check your inbox</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          We sent a confirmation link to <span className="text-foreground">{email}</span>. Click it
          to activate your Collaborate.art account.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block border-b border-foreground pb-1 text-[0.7rem] uppercase tracking-[0.22em]"
        >
          Back to the gallery
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[520px] px-5 py-16 md:px-10 md:py-24">
      <p className="text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">
        Collaborate.art
      </p>
      <h1 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
        {mode === "signin" ? "Sign in" : "Create an account"}
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {mode === "signin"
          ? "Access your saved pieces and your atelier."
          : "For shoppers keeping a wardrobe list, and designers running a boutique."}
      </p>

      <button
        type="button"
        onClick={handleGoogle}
        disabled={busy}
        className="mt-10 flex w-full items-center justify-center border border-border px-4 py-4 text-[0.7rem] uppercase tracking-[0.22em] transition-colors hover:bg-accent disabled:opacity-50"
      >
        Continue with Google
      </button>

      <div className="my-8 flex items-center gap-4">
        <span className="h-px flex-1 bg-border" />
        <span className="text-[0.6rem] uppercase tracking-[0.28em] text-muted-foreground">or</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {mode === "signup" && (
          <>
            <Field label="Name">
              <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                maxLength={80}
                className="w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-foreground"
              />
            </Field>

            <div>
              <span className="text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
                I am a
              </span>
              <div className="mt-3 flex gap-3">
                {(["shopper", "designer"] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setAccountType(type)}
                    className={`flex-1 border px-4 py-3 text-[0.65rem] uppercase tracking-[0.22em] transition-colors ${
                      accountType === type
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:bg-accent"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {accountType === "designer" && (
              <Field label="Label / brand name">
                <input
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  maxLength={80}
                  className="w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-foreground"
                />
              </Field>
            )}
          </>
        )}

        <Field label="Email">
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={255}
            required
            className="w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-foreground"
          />
        </Field>

        <Field label="Password">
          <input
            type="password"
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            maxLength={72}
            required
            className="w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-foreground"
          />
        </Field>

        <button
          type="submit"
          disabled={busy}
          className="w-full bg-foreground px-4 py-4 text-[0.7rem] uppercase tracking-[0.22em] text-background transition-opacity hover:opacity-85 disabled:opacity-50"
        >
          {busy ? "One moment…" : mode === "signin" ? "Sign in" : "Create account"}
        </button>
      </form>

      <div className="mt-8 flex flex-col gap-3 text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="text-left transition-colors hover:text-foreground"
        >
          {mode === "signin" ? "No account? Create one" : "Already a member? Sign in"}
        </button>
        {mode === "signin" && (
          <button
            type="button"
            onClick={handleReset}
            className="text-left transition-colors hover:text-foreground"
          >
            Forgot your password?
          </button>
        )}
      </div>
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
