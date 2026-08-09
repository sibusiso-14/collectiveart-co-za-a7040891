import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { products } from "@/data/catalog";

export const Route = createFileRoute("/stylists")({
  head: () => ({
    meta: [
      { title: "Stylists — Collaborate.art" },
      {
        name: "description",
        content:
          "Stylists showcase how they style Collaborate.art pieces and connect with clients who want a personal stylist. Join the roster or book a look.",
      },
      { property: "og:title", content: "Stylists — Collaborate.art" },
      {
        property: "og:description",
        content:
          "Browse styled looks from independent South African stylists and book them directly.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Stylists,
});

function Stylists() {
  const [sent, setSent] = useState(false);
  const looks = products.slice(0, 12);

  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24">
          <p className="label-xs text-muted-foreground">Stylists</p>
          <h1 className="mt-5 max-w-[16ch] font-serif text-5xl leading-[0.98] md:text-8xl">
            Styled by people, not algorithms.
          </h1>
          <p className="mt-8 max-w-lg text-base leading-relaxed text-muted-foreground">
            Stylists showcase how they wear the labels on Collaborate.art — and clients
            book them directly for fittings, shoots and wardrobe work.
          </p>
        </div>
      </section>

      <section className="border-b border-border py-10 md:py-16">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          <p className="label-xs text-muted-foreground">Looks</p>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-1 md:grid-cols-4 md:gap-1.5">
          {looks.map((p) => (
            <Link
              key={p.id}
              to="/product/$productId"
              params={{ productId: p.id }}
              className="group relative block aspect-[4/5] overflow-hidden bg-secondary"
            >
              <img
                src={p.images[0]}
                alt={`${p.name} styled look`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
              />
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="font-serif text-4xl leading-tight md:text-5xl">
              Join the stylist roster
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Send us your look book. Approved stylists get a profile, their looks on the
              site, and enquiries sent straight to them. Rates are set and settled by you.
            </p>
          </div>

          <form
            className="md:col-span-7 md:col-start-6"
            onSubmit={(e) => {
              e.preventDefault();
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
              className="mt-10 border border-foreground bg-foreground px-10 py-4 text-[0.7rem] uppercase tracking-[0.22em] text-background transition-colors duration-300 hover:bg-background hover:text-foreground"
            >
              {sent ? "Application received" : "Apply as a stylist"}
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
