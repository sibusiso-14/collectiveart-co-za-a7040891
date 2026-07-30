import { Link } from "@tanstack/react-router";
import { useState } from "react";

const nav = [
  { to: "/shop", label: "Shop" },
  { to: "/designers", label: "Designers" },
  { to: "/apply", label: "Become a Creator" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="mx-auto grid max-w-[1600px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 md:px-10">
        <Link
          to="/"
          className="font-serif text-xl tracking-tight text-foreground md:text-2xl"
          onClick={() => setOpen(false)}
        >
          Collaborate<span className="text-muted-foreground">.art</span>
        </Link>

        <nav className="hidden justify-center gap-10 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-[0.7rem] uppercase tracking-[0.22em] text-foreground/70 transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-6">
          <span className="hidden text-[0.7rem] uppercase tracking-[0.22em] text-foreground/70 md:inline">
            Bag (0)
          </span>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-6 w-7 shrink-0 flex-col justify-center gap-[5px] md:hidden"
          >
            <span
              className={`h-px w-full bg-foreground transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-full bg-foreground transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-border transition-[max-height,opacity] duration-300 md:hidden ${
          open ? "max-h-72 border-t opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col px-5 py-2">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="border-b border-border py-4 font-serif text-2xl last:border-0"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
