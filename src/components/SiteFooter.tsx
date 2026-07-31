import { Link } from "@tanstack/react-router";
import { designers, instagramProfile } from "@/data/catalog";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-16 md:grid-cols-[1.5fr_1fr_1fr] md:px-10">
        <div>
          <p className="font-serif text-3xl leading-tight md:text-4xl">
            Where independent fashion meets art.
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            A curated marketplace for independent ateliers. Every piece is made in small
            runs by the designer who signed it.
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <span className="text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
            Explore
          </span>
          <Link to="/shop" className="w-fit hover:underline">
            Shop all
          </Link>
          <Link to="/designers" className="w-fit hover:underline">
            Designers
          </Link>
          <Link to="/apply" className="w-fit hover:underline">
            Become a creator
          </Link>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <span className="text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
            Contact the ateliers
          </span>
          {designers.map((d) => (
            <a
              key={d.slug}
              href={instagramProfile(d.instagram)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit hover:underline"
            >
              {d.name} — @{d.instagram}
            </a>
          ))}
          <a href="mailto:studio@collaborate.art" className="w-fit hover:underline">
            studio@collaborate.art
          </a>
        </div>
      </div>
      <div className="border-t border-border px-5 py-6 text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground md:px-10">
        © {new Date().getFullYear()} Collaborate.art
      </div>
    </footer>
  );
}
