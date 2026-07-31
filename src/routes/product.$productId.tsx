import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { formatPrice, getDesigner, getProduct, productsByDesigner } from "@/data/catalog";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/product/$productId")({
  loader: ({ params }) => {
    const product = getProduct(params.productId);
    if (!product) throw notFound();
    return { product, designer: getDesigner(product.designer) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Piece not found — Collaborate.art" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { product, designer } = loaderData;
    const title = `${product.name} by ${designer?.name} — Collaborate.art`;
    return {
      meta: [
        { title },
        { name: "description", content: product.description },
        { property: "og:title", content: title },
        { property: "og:description", content: product.description },
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: ProductNotFound,
});

function ProductNotFound() {
  return (
    <div className="mx-auto max-w-[1600px] px-5 py-32 md:px-10">
      <h1 className="font-serif text-4xl">This piece has moved on.</h1>
      <Link to="/shop" className="label-xs mt-6 inline-block rule-link">
        Back to the catalogue
      </Link>
    </div>
  );
}

function ProductPage() {
  const { product, designer } = Route.useLoaderData();
  const [size, setSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  const related = productsByDesigner(product.designer).filter((p) => p.id !== product.id);

  return (
    <div>
      <div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-10 md:grid-cols-12 md:gap-14 md:px-10 md:py-16">
        {/* Gallery */}
        <div className="flex flex-col gap-4 md:col-span-7">
          {product.images.map((img: string, i: number) => (
            <div key={i} className="aspect-[4/5] overflow-hidden bg-secondary">
              <img
                src={img}
                alt={`${product.name} view ${i + 1}`}
                loading={i === 0 ? "eager" : "lazy"}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Buy box */}
        <div className="md:col-span-4 md:col-start-9">
          <div className="md:sticky md:top-28">
            <Link
              to="/designers/$slug"
              params={{ slug: product.designer }}
              className="label-xs text-muted-foreground rule-link"
            >
              {designer?.name}
            </Link>
            <h1 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 text-lg">{formatPrice(product.price)}</p>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            <div className="mt-10">
              <p className="label-xs text-muted-foreground">Size</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((s: string) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setSize(s);
                      setAdded(false);
                    }}
                    className={`min-w-14 border px-4 py-3 text-xs uppercase tracking-[0.15em] transition-colors duration-200 ${
                      size === s
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <a
              href={designer ? instagramDM(designer.instagram) : "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 block w-full border border-foreground bg-foreground px-8 py-4 text-center text-[0.7rem] uppercase tracking-[0.22em] text-background transition-colors duration-300 hover:bg-background hover:text-foreground"
            >
              Message {designer?.name} on Instagram
            </a>
            <a
              href={designer ? instagramProfile(designer.instagram) : "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block w-full border border-border px-8 py-4 text-center text-[0.7rem] uppercase tracking-[0.22em] transition-colors duration-300 hover:border-foreground"
            >
              @{designer?.instagram}
            </a>
            <p className="mt-3 text-xs text-muted-foreground">
              {size ? `Mention size ${size}. ` : "Pick a size to mention. "}
              No checkout here — you order and pay directly with the atelier, so sizing,
              colourway and shipping from {designer?.location} are confirmed before any
              money changes hands.
            </p>


            <dl className="mt-12 border-t border-border text-sm">
              <Spec term="Fabric" detail={product.fabric} />
              <Spec term="Care" detail={product.care} />
              <Spec term="Category" detail={product.category} />
              <Spec
                term="Attribution"
                detail={`Made by ${designer?.name}, ${designer?.location}. Independent atelier since ${designer?.since}.`}
              />
            </dl>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t border-border">
          <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-20">
            <h2 className="font-serif text-3xl md:text-4xl">
              More from {designer?.name}
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function Spec({ term, detail }: { term: string; detail: string }) {
  return (
    <div className="grid grid-cols-[90px_minmax(0,1fr)] gap-4 border-b border-border py-4">
      <dt className="label-xs text-muted-foreground">{term}</dt>
      <dd className="min-w-0 leading-relaxed">{detail}</dd>
    </div>
  );
}
