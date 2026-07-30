import { createFileRoute, Link } from "@tanstack/react-router";

import { ProductCard } from "@/components/ProductCard";
import { designers, heroImage, products } from "@/data/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Collaborate.art — Where Independent Fashion Meets Art" },
      {
        name: "description",
        content:
          "A curated multi-vendor marketplace for independent fashion designers. Shop small-run collections from independent labels Damnation Designs, Galbakaline and Designing Balaclava.",
      },
      {
        property: "og:title",
        content: "Collaborate.art — Where Independent Fashion Meets Art",
      },
      {
        property: "og:description",
        content:
          "Curated collections from independent ateliers. Small runs, signed by the designer who made them.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="relative">
          <img
            src={heroImage}
            alt="Model in a Galbakaline reversible orange shell jacket against a concrete wall"
            width={1600}
            height={1104}
            className="h-[70vh] w-full object-cover md:h-[86vh]"
          />
          <div className="absolute inset-0 flex items-end">
            <div className="w-full px-5 pb-10 md:px-10 md:pb-16">
              <p className="label-xs text-foreground/60">Issue 01 — Autumn</p>
              <h1 className="mt-4 max-w-[16ch] font-serif text-[2.75rem] leading-[0.95] tracking-tight md:text-[6.5rem]">
                Where Independent Fashion Meets Art.
              </h1>
              <div className="mt-8 flex flex-wrap gap-8">
                <Link to="/shop" className="label-xs rule-link">
                  Shop the collections
                </Link>
                <Link to="/designers" className="label-xs rule-link text-foreground/60">
                  Meet the designers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured designers — horizontal scroll */}
      <section className="border-b border-border py-16 md:py-24">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
            <h2 className="font-serif text-3xl md:text-5xl">Featured Designers</h2>
            <Link to="/designers" className="label-xs shrink-0 rule-link">
              All
            </Link>
          </div>
        </div>
        <div className="hide-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 md:gap-8 md:px-10">
          {designers.map((d) => (
            <Link
              key={d.slug}
              to="/designers/$slug"
              params={{ slug: d.slug }}
              className="group w-[72vw] shrink-0 snap-start md:w-[30vw] lg:w-[24vw]"
            >
              <div className="aspect-[4/5] overflow-hidden bg-secondary">
                <img
                  src={d.portrait}
                  alt={d.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                />
              </div>
              <p className="mt-4 font-serif text-2xl">{d.name}</p>
              <p className="label-xs mt-1 text-muted-foreground">
                {d.discipline} — {d.location}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Curated collections — asymmetric grid */}
      <section className="border-b border-border py-16 md:py-24">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          <p className="label-xs text-muted-foreground">Curated Collections</p>
          <h2 className="mt-3 max-w-[18ch] font-serif text-3xl leading-tight md:text-5xl">
            Eleven pieces, made one at a time.
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-12">
            <ProductCard
              product={products[0]}
              className="md:col-span-7"
              ratio="aspect-[4/5]"
            />
            <ProductCard
              product={products[1]}
              className="md:col-span-4 md:col-start-9 md:mt-32"
              ratio="aspect-[3/4]"
            />
            <ProductCard
              product={products[2]}
              className="md:col-span-4 md:col-start-2"
              ratio="aspect-square"
            />
            <ProductCard
              product={products[3]}
              className="md:col-span-5 md:col-start-7 md:-mt-20"
              ratio="aspect-[3/4]"
            />
            <ProductCard
              product={products[4]}
              className="md:col-span-5"
              ratio="aspect-[3/4]"
            />
            <ProductCard
              product={products[5]}
              className="md:col-span-4 md:col-start-8 md:mt-24"
              ratio="aspect-square"
            />
          </div>

          <div className="mt-16">
            <Link to="/shop" className="label-xs rule-link">
              View the full catalogue
            </Link>
          </div>
        </div>
      </section>

      {/* Become a creator */}
      <section className="py-20 md:py-32">
        <div className="mx-auto grid max-w-[1600px] gap-10 px-5 md:grid-cols-12 md:px-10">
          <p className="label-xs text-muted-foreground md:col-span-3">
            Become a Creator
          </p>
          <div className="md:col-span-8">
            <h2 className="max-w-[20ch] font-serif text-4xl leading-[1.05] md:text-7xl">
              Your atelier deserves a gallery, not a shelf.
            </h2>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
              Collaborate.art hosts independent designers with their own boutique page,
              inventory and payout schedule. You set the prices, we handle the storefront,
              the checkout and the commission split.
            </p>
            <div className="mt-10">
              <Link
                to="/apply"
                className="inline-flex items-center border border-foreground px-8 py-4 text-[0.7rem] uppercase tracking-[0.22em] transition-colors duration-300 hover:bg-foreground hover:text-background"
              >
                Apply to sell
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
