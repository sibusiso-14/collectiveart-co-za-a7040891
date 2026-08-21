import { Link } from "@tanstack/react-router";
import { designers, instagramProfile } from "@/data/catalog";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-16 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:px-10">
        <div>
          <p className="font-serif text-3xl leading-tight md:text-4xl">
            Where independent fashion meets art.
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            A curated gallery for independent ateliers. Every piece is made in small
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
          <Link to="/stylists" className="w-fit hover:underline">
            Stylists
          </Link>
          <Link to="/ambassadors" className="w-fit hover:underline">
            Brand ambassadors
          </Link>
          <Link to="/apply" className="w-fit hover:underline">
            Become a creator
          </Link>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <span className="text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
            Info
          </span>
          <Link to="/terms" className="w-fit hover:underline">
            Terms & Conditions
          </Link>
          <Link to="/privacy" className="w-fit hover:underline">
            Privacy Policy
          </Link>
          <a
            href="mailto:collaborateart@outlook.com"
            className="w-fit hover:underline"
          >
            collaborateart@outlook.com
          </a>
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
        </div>
      </div>
      <div className="border-t border-border px-5 py-6 text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground md:px-10">
        © {new Date().getFullYear()} Collaborate.art
      </div>
    </footer>
  );
}
