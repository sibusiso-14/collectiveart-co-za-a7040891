import { createFileRoute, Link } from "@tanstack/react-router";

import markAsset from "@/assets/collaborate-mark-square.png.asset.json";
import { ProductCard } from "@/components/ProductCard";
import { designers, heroImage, products } from "@/data/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CollaborateArt — South Africa's Finest Curated Fashion Designers" },
      {
        name: "description",
        content:
          "CollaborateArt connects you directly to South Africa's finest curated fashion designers. Discover small-run collections from independent ateliers and message designers for orders.",
      },
      {
        property: "og:title",
        content: "CollaborateArt — South Africa's Finest Curated Fashion Designers",
      },
      {
        property: "og:description",
        content:
          "A curated marketplace connecting you directly to independent South African fashion designers. Small runs, made to order, settled with the atelier.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* Hero — premium editorial */}
      <section className="border-b border-border">
        <div className="relative">
          <img
            src={heroImage}
            alt="Model in a Galbakaline reversible orange shell jacket against a concrete wall"
            width={1600}
            height={1104}
            className="h-[72vh] w-full object-cover md:h-[88vh]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

          {/* Brand seal — the couture button mark */}
          <div className="absolute right-5 top-5 md:right-10 md:top-10">
            <div className="group relative grid h-24 w-24 place-items-center rounded-full bg-background/85 backdrop-blur-sm md:h-36 md:w-36">
              <img
                src={markAsset.url}
                alt="Collaborate.art monogram — a copper button stitched into a cursive C"
                width={800}
                height={800}
                className="h-[78%] w-[78%] object-contain mix-blend-multiply transition-transform duration-[1200ms] ease-out group-hover:rotate-[8deg]"
              />
              <span className="pointer-events-none absolute inset-0 rounded-full border border-foreground/15" />
            </div>
          </div>

          <div className="absolute inset-0 flex items-end">
            <div className="w-full px-5 pb-12 md:px-10 md:pb-20">
              <p className="label-xs text-foreground/70">Curated in South Africa</p>
              <h1 className="mt-5 max-w-[18ch] font-serif text-[2.5rem] leading-[0.95] tracking-tight md:max-w-[20ch] md:text-[6rem] lg:text-[7rem]">
                CollaborateArt: Connecting you directly to South Africa's finest curated fashion designers.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/80 md:text-lg">
                A link-only gallery for independent ateliers. Browse the collections, then message the designer to confirm sizing, colour and payment — every order is settled directly with the maker.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-8">
                <Link
                  to="/shop"
                  className="inline-flex items-center border border-foreground bg-foreground px-8 py-4 text-[0.7rem] uppercase tracking-[0.22em] text-primary-foreground transition-colors duration-300 hover:bg-transparent hover:text-foreground"
                >
                  Shop the collections
                </Link>
                <Link to="/designers" className="label-xs rule-link">
                  Meet the designers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value proposition — three pillars */}
      <section className="border-b border-border py-16 md:py-24">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            <div>
              <p className="label-xs text-muted-foreground">01 — Curated</p>
              <h3 className="mt-4 font-serif text-2xl md:text-3xl">Hand-picked ateliers</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Every designer on CollaborateArt is selected for craft, point of view and small-run production. No mass-market listings — only work worth wearing.
              </p>
            </div>
            <div>
              <p className="label-xs text-muted-foreground">02 — Direct</p>
              <h3 className="mt-4 font-serif text-2xl md:text-3xl">Message the maker</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Prices shown are guide prices. Tap through to Instagram, ask about fit and fabric, then settle payment and delivery directly with the designer.
              </p>
            </div>
            <div>
              <p className="label-xs text-muted-foreground">03 — Local</p>
              <h3 className="mt-4 font-serif text-2xl md:text-3xl">South African design</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                From Maseru to Johannesburg, we spotlight independent labels building the next chapter of African fashion — and keep the value in their hands.
              </p>
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
            Twenty-one pieces, made one at a time.
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
              CollaborateArt hosts independent designers with their own boutique page,
              lookbook and direct contact link. You set the prices, we handle the
              storefront — and customers reach you directly for every order.
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
