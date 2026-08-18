import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "../integrations/supabase/client";

export const Route = createFileRoute("/ambassadors")({
  head: () => ({
    meta: [
      { title: "Brand Ambassadors — Collaborate.art" },
      {
        name: "description",
        content:
          "Become a Collaborate.art brand ambassador and get 30% off every piece displayed on the site, plus 30% off any stylist fee.",
      },
      { property: "og:title", content: "Brand Ambassadors — Collaborate.art" },
      {
        property: "og:description",
        content:
          "Ambassadors get 30% off all displayed clothing and 30% off stylist fees. Apply to join.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Ambassadors,
});

const perks = [
  {
    n: "01",
    title: "30% off clothing",
    body: "Every piece displayed on Collaborate.art is 30% off for active ambassadors — applied by the designer when you message them with your ambassador name.",
  },
  {
    n: "02",
    title: "30% off stylist fees",
    body: "Any stylist on the roster takes 30% off their fee for ambassadors, whether it's a fitting, a shoot or a full wardrobe edit.",
  },
  {
    n: "03",
    title: "Early access",
    body: "You see drops, lookbooks and one-off pieces before they go public, so you can claim the singles first.",
  },
  {
    n: "04",
    title: "What we ask",
    body: "Wear the labels and post them. Tag Collaborate.art and the designer. That's it — no quotas, no exclusivity.",
  },
];

function Ambassadors() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24">
          <p className="label-xs text-muted-foreground">Ambassador Programme</p>
          <h1 className="mt-5 max-w-[15ch] font-serif text-5xl leading-[0.98] md:text-8xl">
            Wear it. Share it. 30% off.
          </h1>
          <p className="mt-8 max-w-lg text-base leading-relaxed text-muted-foreground">
            Ambassadors of Collaborate.art get 30% off every piece on the site — and 30%
            off any fee a stylist charges them.
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          <div className="grid md:grid-cols-2">
            {perks.map((s, i) => (
              <div
                key={s.n}
                className={`border-border py-12 md:py-16 ${i % 2 === 0 ? "md:border-r md:pr-14" : "md:pl-14"} ${
                  i < perks.length - 1 ? "border-b md:border-b-0" : ""
                } ${i < 2 ? "md:border-b" : ""}`}
              >
                <p className="label-xs text-muted-foreground">{s.n}</p>
                <h2 className="mt-4 font-serif text-3xl md:text-4xl">{s.title}</h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="font-serif text-4xl leading-tight md:text-5xl">
              Apply to be an ambassador
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Tell us who you are and where you post. Approved ambassadors get a discount
              name to quote when messaging designers and stylists.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              New here?{" "}
              <Link to="/stylists" className="rule-link">
                See the stylists
              </Link>
              .
            </p>
          </div>

          <form
            className="md:col-span-7 md:col-start-6"
            onSubmit={async (e) => {
              e.preventDefault();
              setSubmitting(true);
              setError(null);
              const formData = new FormData(e.currentTarget);
              const { error } = await supabase.from("ambassadors").insert({
                name: formData.get("amb-name") as string,
                email: formData.get("amb-email") as string,
                social: formData.get("amb-social") as string,
                city: formData.get("amb-city") as string,
                about: formData.get("amb-about") as string,
              });
              setSubmitting(false);
              if (error) {
                setError("Something went wrong. Please try again.");
                return;
              }
              setSent(true);
            }}
          >
            <Field label="Your name" name="amb-name" />
            <Field label="Email" name="amb-email" type="email" />
            <Field label="Instagram / TikTok" name="amb-social" />
            <Field label="City" name="amb-city" />
            <div className="border-b border-border py-5">
              <label htmlFor="amb-about" className="label-xs block text-muted-foreground">
                Why you?
              </label>
              <textarea
                id="amb-about"
                name="amb-about"
                rows={4}
                required
                className="mt-3 w-full resize-none bg-transparent text-base outline-none placeholder:text-muted-foreground/60"
                placeholder="Your audience, your style, what you'd post…"
              />
            </div>

            <button
              type="submit"
              className="mt-10 border border-foreground bg-foreground px-10 py-4 text-[0.7rem] uppercase tracking-[0.22em] text-background transition-colors duration-300 hover:bg-background hover:text-foreground"
            >
              {sent ? "Application received" : "Apply as an ambassador"}
            </button>
            {sent && (
              <p className="mt-4 text-sm text-muted-foreground">
                Thank you — we'll be in touch shortly.
              </p>
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
