import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/stylists/apply")({
  head: () => ({
    meta: [
      { title: "Apply as a Stylist — Collaborate.art" },
      {
        name: "description",
        content: "Apply to join the stylist roster on Collaborate.art.",
      },
    ],
  }),
  component: StylistApply,
});

function StylistApply() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24">
          <Link to="/stylists" className="label-xs text-muted-foreground rule-link">
            Stylists
          </Link>
          <h1 className="mt-5 max-w-[16ch] font-serif text-5xl leading-[0.98] md:text-7xl">
            Join the stylist roster
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Send us your look book. Approved stylists get a profile, their looks on the
              site, and enquiries sent straight to them. Rates are set and settled by you.
            </p>
          </div>

          <form
            className="md:col-span-7 md:col-start-6"
            onSubmit={async (e) => {
              e.preventDefault();
              setError(null);

              const formData = new FormData(e.currentTarget);
              const name = formData.get("stylist-name") as string;
              const email = formData.get("stylist-email") as string;
              const portfolio = formData.get("stylist-portfolio") as string;
              const city = formData.get("stylist-city") as string;
              const about = formData.get("stylist-about") as string;

              setSubmitting(true);

              const { error: insertError } = await supabase.from("stylists").insert({
                name,
                email,
                portfolio: portfolio || null,
                city: city || null,
                about,
              });

              setSubmitting(false);

              if (insertError) {
                console.error(insertError);
                setError("Something went wrong. Please try again.");
                return;
              }

              setSent(true);
            }}
          >
            <Field label="Your name" name="stylist-name" />
            <Field label="Email" name="stylist-email" type="email" />
            <Field label="Instagram / portfolio" name="stylist-portfolio" />
            <Field label="City" name="stylist-city" />
            <div className="border-b border-border py-5">
              <label htmlFor="stylist-about" className="label-xs block text-muted-foreground">
                How do you style?
              </label>
              <textarea
                id="stylist-about"
                name="stylist-about"
                rows={4}
                required
                className="mt-3 w-full resize-none bg-transparent text-base outline-none placeholder:text-muted-foreground/60"
                placeholder="Editorial, personal shopping, shoots, rates…"
              />
            </div>

            <button
              type="submit"
              disabled={submitting || sent}
              className="mt-10 border border-foreground bg-foreground px-10 py-4 text-[0.7rem] uppercase tracking-[0.22em] text-background transition-colors duration-300 hover:bg-background hover:text-foreground disabled:opacity-50"
            >
              {sent ? "Application received" : submitting ? "Sending…" : "Apply as a stylist"}
            </button>
            {sent && (
              <p className="mt-4 text-sm text-muted-foreground">
                Thank you — we'll be in touch shortly.
              </p>
            )}
            {error && (
              <p className="mt-4 text-sm text-red-500">{error}</p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
}: {
  label: string;
  name: string;
  type?: string;
}) {
  return (
    <div className="border-b border-border py-5">
      <label htmlFor={name} className="label-xs block text-muted-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        className="mt-3 w-full bg-transparent text-base outline-none"
      />
    </div>
  );
}
