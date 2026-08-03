import { createFileRoute, Link } from "@tanstack/react-router";

import markAsset from "@/assets/collaborate-mark-square.png.asset.json";
import { ProductCard } from "@/components/ProductCard";
import { designers, products } from "@/data/catalog";

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
      {/* Hero — oversized logo watermark with wording in front */}
      <section className="relative overflow-hidden border-b border-border bg-background">
        {/* Large logo watermark */}
        <img
          src={markAsset.url}
          alt=""
          aria-hidden="true"
          width={800}
          height={800}
          className="pointer-events-none absolute right-1/2 top-1/2 z-0 w-[90vw] max-w-[700px] -translate-y-1/2 translate-x-1/2 object-contain opacity-[0.22] md:right-0 md:translate-x-0"
          style={{
            maskImage: "radial-gradient(closest-side, #000 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(closest-side, #000 30%, transparent 75%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-32">
          <p className="label-xs text-foreground/70">Curated in South Africa</p>
          <h1 className="mt-5 max-w-[14ch] font-serif text-[3rem] leading-[0.95] tracking-tight md:text-[7rem]">
            South Africa's finest designers.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-foreground/80">
            Fashion as Unique as Your Fingerprint
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-8">
            <Link
              to="/shop"
              className="inline-flex items-center border border-foreground bg-foreground px-8 py-4 text-[0.7rem] uppercase tracking-[0.22em] text-primary-foreground transition-colors duration-300 hover:bg-transparent hover:text-foreground"
            >
              Shop
            </Link>
            <Link to="/designers" className="label-xs rule-link">
              Designers
            </Link>
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
            </div>
            <div>
              <p className="label-xs text-muted-foreground">02 — Direct</p>
              <h3 className="mt-4 font-serif text-2xl md:text-3xl">Message the maker</h3>
            </div>
            <div>
              <p className="label-xs text-muted-foreground">03 — Local</p>
              <h3 className="mt-4 font-serif text-2xl md:text-3xl">South African design</h3>
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
      <section className="relative overflow-hidden py-20 md:py-32">
        {/* Oversized monogram watermark */}
        <img
          src={markAsset.url}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="pointer-events-none absolute right-2 top-1/2 w-[52vw] max-w-[420px] -translate-y-1/2 object-contain opacity-[0.5] mix-blend-multiply md:right-10"
          style={{
            maskImage: "radial-gradient(closest-side, #000 38%, transparent 78%)",
            WebkitMaskImage: "radial-gradient(closest-side, #000 38%, transparent 78%)",
          }}
        />
        <div className="relative mx-auto grid max-w-[1600px] gap-10 px-5 md:grid-cols-12 md:px-10">

          <p className="label-xs text-muted-foreground md:col-span-3">
            Become a Creator
          </p>
          <div className="md:col-span-8">
            <h2 className="max-w-[20ch] font-serif text-4xl leading-[1.05] md:text-7xl">
              Your atelier deserves a gallery, not a shelf.
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
              Your own boutique page. Your prices. Direct orders.
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
