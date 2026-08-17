import { Link } from "@tanstack/react-router";
import { getDesigner, type Product } from "@/data/catalog";

export function ProductCard({
  product,
  className = "",
  ratio = "aspect-[3/4]",
}: {
  product: Product;
  className?: string;
  ratio?: string;
}) {
  const designer = getDesigner(product.designer);

  return (
    <Link
      to="/product/$productId"
      params={{ productId: product.id }}
      className={`group block ${className}`}
    >
      <div className={`overflow-hidden bg-secondary ${ratio}`}>
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
        <div className="min-w-0">
          <p className="truncate font-serif text-lg leading-snug">{product.name}</p>
          <p className="mt-1 text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
            {designer?.name}
          </p>
        </div>
        
      </div>
    </Link>
  );
}
