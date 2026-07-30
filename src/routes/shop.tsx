import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { categories, designers, products, type Category } from "@/data/catalog";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All — Collaborate.art" },
      {
        name: "description",
        content:
          "Browse every piece on Collaborate.art. Filter by category, designer and price across independent ateliers.",
      },
      { property: "og:title", content: "Shop All — Collaborate.art" },
      {
        property: "og:description",
        content:
          "Filterable catalogue of small-run pieces from independent fashion designers.",
      },
    ],
  }),
  component: Shop,
});

const priceBands = [
  { label: "Under $300", min: 0, max: 299 },
  { label: "$300 — $700", min: 300, max: 700 },
  { label: "Over $700", min: 701, max: Infinity },
];

function Shop() {
  const [category, setCategory] = useState<Category | null>(null);
  const [designer, setDesigner] = useState<string | null>(null);
  const [band, setBand] = useState<number | null>(null);

  const filtered = useMemo(
    () =>
      products.filter((p) => {
        if (category && p.category !== category) return false;
        if (designer && p.designer !== designer) return false;
        if (band !== null) {
          const b = priceBands[band];
          if (p.price < b.min || p.price > b.max) return false;
        }
        return true;
      }),
    [category, designer, band],
  );

  const clear = () => {
    setCategory(null);
    setDesigner(null);
    setBand(null);
  };

  return (
    <div className="mx-auto max-w-[1600px] px-5 py-14 md:px-10 md:py-20">
      <header className="grid gap-4 border-b border-border pb-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <div className="min-w-0">
          <p className="label-xs text-muted-foreground">Catalogue</p>
          <h1 className="mt-3 font-serif text-4xl md:text-6xl">Shop All</h1>
        </div>
        <p className="shrink-0 text-sm text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
        </p>
      </header>

      <div className="grid gap-12 pt-10 md:grid-cols-[220px_minmax(0,1fr)] md:gap-14">
        <aside className="md:sticky md:top-24 md:self-start">
          <FilterGroup title="Category">
            <FilterButton active={category === null} onClick={() => setCategory(null)}>
              All
            </FilterButton>
            {categories.map((c) => (
              <FilterButton
                key={c}
                active={category === c}
                onClick={() => setCategory(c)}
              >
                {c}
              </FilterButton>
            ))}
          </FilterGroup>

          <FilterGroup title="Designer">
            <FilterButton active={designer === null} onClick={() => setDesigner(null)}>
              All
            </FilterButton>
            {designers.map((d) => (
              <FilterButton
                key={d.slug}
                active={designer === d.slug}
                onClick={() => setDesigner(d.slug)}
              >
                {d.name}
              </FilterButton>
            ))}
          </FilterGroup>

          <FilterGroup title="Price">
            <FilterButton active={band === null} onClick={() => setBand(null)}>
              Any
            </FilterButton>
            {priceBands.map((b, i) => (
              <FilterButton key={b.label} active={band === i} onClick={() => setBand(i)}>
                {b.label}
              </FilterButton>
            ))}
          </FilterGroup>

          <button
            type="button"
            onClick={clear}
            className="label-xs mt-4 text-muted-foreground rule-link"
          >
            Clear all
          </button>
        </aside>

        <div>
          {filtered.length === 0 ? (
            <p className="font-serif text-2xl text-muted-foreground">
              Nothing matches that combination — yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <p className="label-xs mb-4 text-muted-foreground">{title}</p>
      <div className="flex flex-wrap gap-x-4 gap-y-2 md:flex-col md:items-start">
        {children}
      </div>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left text-sm transition-colors ${
        active ? "text-foreground underline underline-offset-4" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
