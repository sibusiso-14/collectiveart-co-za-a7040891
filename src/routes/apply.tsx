import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { products } from "@/data/catalog";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/apply")({
  head: () => ({
    meta: [
      { title: "Become a Creator — Collaborate.art" },
      {
        name: "description",
        content:
          "Apply to sell on Collaborate.art. Your own boutique page, inventory tools, and a storefront built for independent designers.",
      },
      { property: "og:title", content: "Become a Creator — Collaborate.art" },
      {
        property: "og:description",
        content:
          "Independent designers: open a boutique, list your inventory, and keep 100% of what you sell.",
      },
    ],
  }),
  component: Apply,
});

const steps = [
  {
    n: "01",
    title: "Apply",
    body: "Send us your lookbook, your production story and three pieces you'd list first. We review every application ourselves — usually within ten days.",
  },
  {
    n: "02",
    title: "Open your boutique",
    body: "You get a dedicated profile page, a lookbook gallery and inventory tracking per size. Upload once; the storefront handles the rest.",
  },
  {
    n: "03",
    title: "List inventory",
    body: "Set your own prices, run limited drops and mark pieces made-to-order. Stock decrements at checkout so you never oversell a one-off.",
  },
  {
    n: "04",
    title: "Keep 100% of your sales",
    body: "There's no commission on what you sell. You set your prices, and every sale is yours.",
  },
];

function Apply() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-[1600px] items-center gap-10 px-5 py-16 md:grid-cols-12 md:px-10 md:py-24">
          <div className="md:col-span-6">
            <p className="label-xs text-muted-foreground">Designer Portal</p>
            <h1 className="mt-5 font-serif text-5xl leading-[0.98] md:text-8xl">
              Sell where the work is taken seriously.
            </h1>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-muted-foreground">
              Collaborate.art gives independent designers their own storefront — your own
              profile, your own inventory, no commission on what you sell.
            </p>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <div className="aspect-[3/4] overflow-hidden bg-secondary photo-tint">
              <img
                src={products[3].images[0]}
                alt="Designer piece photographed in an empty studio"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          <div className="grid md:grid-cols-2">
            {steps.map((s, i) => (
              <div
                key={s.n}
                className={`border-border py-12 md:py-16 ${i % 2 === 0 ? "md:border-r md:pr-14" : "md:pl-14"} ${
                  i < steps.length - 1 ? "border-b md:border-b-0" : ""
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
              Apply to sell
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Applications are reviewed by a person, not a form filter. Tell us what you
              make and how you make it.
            </p>
          </div>

          <form
            className="md:col-span-7 md:col-start-6"
            onSubmit={async (e) => {
              e.preventDefault();
              setError(null);
              setSending(true);

              const form = e.currentTarget;
              const data = new FormData(form);

              const { error: fnError } = await supabase.from("applications").insert({
                name: data.get("name") as string,
                label: data.get("label") as string,
                email: data.get("email") as string,
                portfolio: data.get("portfolio") as string,
                about: data.get("about") as string,
              });

              setSending(false);

              if (fnError) {
                setError("Something went wrong — please try again or email us directly.");
                return;
              }

              setSent(true);
            }}
          >
            <Field label="Your name" name="name" />
            <Field label="Label / atelier" name="label" />
            <Field label="Email" name="email" type="email" />
            <Field label="Portfolio or Instagram" name="portfolio" />
            <div className="border-b border-border py-5">
              <label
                htmlFor="about"
                className="label-xs block text-muted-foreground"
              >
                What do you make?
              </label>
              <textarea
                id="about"
                name="about"
                rows={4}
                required
                className="mt-3 w-full resize-none bg-transparent text-base outline-none placeholder:text-muted-foreground/60"
                placeholder="Materials, production, season cadence…"
              />
            </div>

            <button
              type="submit"
              disabled={sending || sent}
              className="mt-10 border border-foreground bg-foreground px-10 py-4 text-[0.7rem] uppercase tracking-[0.22em] text-background transition-colors duration-300 hover:bg-background hover:text-foreground disabled:opacity-50"
            >
              {sent ? "Application received" : sending ? "Sending…" : "Submit application"}
            </button>
            {error && (
              <p className="mt-4 text-sm text-destructive">{error}</p>
            )}
            {sent && (
              <p className="mt-4 text-sm text-muted-foreground">
                Thank you — we'll be in touch within ten days.
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
