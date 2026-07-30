import { createFileRoute, Link } from "@tanstack/react-router";
import { designers, productsByDesigner } from "@/data/catalog";

export const Route = createFileRoute("/designers/")({
  head: () => ({
    meta: [
      { title: "Designers — Collaborate.art" },
      {
        name: "description",
        content:
          "The independent ateliers on Collaborate.art: destroyed skatewear from Damnation Designs, fur, denim and outerwear from Galbakaline, and balaclava-marked knits from Designing Balaclava.",
      },
      { property: "og:title", content: "Designers — Collaborate.art" },
      {
        property: "og:description",
        content: "Meet the independent ateliers behind every piece on Collaborate.art.",
      },
    ],
  }),
  component: DesignerIndex,
});

function DesignerIndex() {
  return (
    <div className="mx-auto max-w-[1600px] px-5 py-14 md:px-10 md:py-20">
      <header className="border-b border-border pb-10">
        <p className="label-xs text-muted-foreground">The Roster</p>
        <h1 className="mt-3 max-w-[14ch] font-serif text-4xl leading-tight md:text-6xl">
          Three labels. No middle ground.
        </h1>
      </header>

      <div className="grid gap-x-6 gap-y-16 pt-14 md:grid-cols-2">
        {designers.map((d, i) => (
          <Link
            key={d.slug}
            to="/designers/$slug"
            params={{ slug: d.slug }}
            className={`group block ${i % 2 === 1 ? "md:mt-24" : ""}`}
          >
            <div className="aspect-[4/5] overflow-hidden bg-secondary">
              <img
                src={d.portrait}
                alt={d.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
              />
            </div>
            <div className="mt-5 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
              <div className="min-w-0">
                <h2 className="font-serif text-3xl">{d.name}</h2>
                <p className="label-xs mt-2 text-muted-foreground">
                  {d.discipline} — {d.location}
                </p>
              </div>
              <span className="shrink-0 text-sm text-muted-foreground">
                {productsByDesigner(d.slug).length} pieces
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              {d.bio}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
