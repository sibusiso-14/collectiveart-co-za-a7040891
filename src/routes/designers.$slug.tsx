import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import {
  getDesigner,
  instagramDM,
  instagramProfile,
  productsByDesigner,
} from "@/data/catalog";

export const Route = createFileRoute("/designers/$slug")({
  loader: ({ params }) => {
    const designer = getDesigner(params.slug);
    if (!designer) throw notFound();
    return { designer };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Designer not found — Collaborate.art" }, { name: "robots", content: "noindex" }],
      };
    }
    const { designer } = loaderData;
    const title = `${designer.name} — Collaborate.art`;
    return {
      meta: [
        { title },
        { name: "description", content: designer.bio },
        { property: "og:title", content: title },
        { property: "og:description", content: designer.bio },
      ],
    };
  },
  component: DesignerPage,
  notFoundComponent: DesignerNotFound,
});

function DesignerNotFound() {
  return (
    <div className="mx-auto max-w-[1600px] px-5 py-32 md:px-10">
      <h1 className="font-serif text-4xl">This boutique isn't here.</h1>
      <Link to="/designers" className="label-xs mt-6 inline-block rule-link">
        Back to designers
      </Link>
    </div>
  );
}

function DesignerPage() {
  const { designer } = Route.useLoaderData();
  const pieces = productsByDesigner(designer.slug);

  return (
    <div>
      <section className="mx-auto max-w-[1600px] px-5 py-14 md:px-10 md:py-20">
        <Link to="/designers" className="label-xs text-muted-foreground rule-link">
          Designers
        </Link>
        <div className="mt-8 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <h1 className="font-serif text-5xl leading-[1] md:text-8xl">
              {designer.name}
            </h1>
            <p className="label-xs mt-6 text-muted-foreground">
              {designer.discipline} — {designer.location} — Est. {designer.since}
            </p>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <p className="font-serif text-2xl leading-snug italic md:text-3xl">
              “{designer.statement}”
            </p>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              {designer.bio}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={instagramDM(designer.instagram)}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-foreground bg-foreground px-6 py-3 text-[0.7rem] uppercase tracking-[0.22em] text-background transition-colors duration-300 hover:bg-background hover:text-foreground"
              >
                Message on Instagram
              </a>
              <a
                href={instagramProfile(designer.instagram)}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-border px-6 py-3 text-[0.7rem] uppercase tracking-[0.22em] transition-colors duration-300 hover:border-foreground"
              >
                @{designer.instagram}
              </a>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Orders and payment are arranged directly with the atelier.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-border">
        <div className="grid md:grid-cols-3">
          {designer.lookbook.map((img: string, i: number) => (
            <div
              key={i}
              className={`aspect-[3/4] overflow-hidden bg-secondary photo-tint ${
                i < designer.lookbook.length - 1 ? "border-b border-border md:border-b-0 md:border-r" : ""
              }`}
            >
              <img
                src={img}
                alt={`${designer.name} lookbook ${i + 1}`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24">
        <h2 className="font-serif text-3xl md:text-4xl">Available Now</h2>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {pieces.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
