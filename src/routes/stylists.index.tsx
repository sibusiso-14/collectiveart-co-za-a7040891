import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export const Route = createFileRoute("/stylists/")({
  head: () => ({
    meta: [
      { title: "Stylists — Collaborate.art" },
      {
        name: "description",
        content:
          "Meet the independent South African stylists who style Collaborate.art pieces and connect with clients directly.",
      },
      { property: "og:title", content: "Stylists — Collaborate.art" },
      {
        property: "og:description",
        content: "Meet the independent South African stylists on Collaborate.art.",
      },
    ],
  }),
  component: StylistIndex,
});

type Stylist = Tables<"stylists">;

function StylistIndex() {
  const [stylists, setStylists] = useState<Stylist[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const { data, error: fetchError } = await supabase
        .from("stylists")
        .select("*")
        .eq("approved", true)
        .order("created_at", { ascending: false });

      if (cancelled) return;

      if (fetchError) {
        setError("Could not load stylists right now.");
        return;
      }

      setStylists(data ?? []);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24">
          <p className="label-xs text-muted-foreground">Stylists</p>
          <h1 className="mt-5 max-w-[16ch] font-serif text-5xl leading-[0.98] md:text-8xl">
            Styled by people, not algorithms.
          </h1>
          <p className="mt-8 max-w-lg text-base leading-relaxed text-muted-foreground">
            Stylists showcase how they wear the labels on Collaborate.art — and clients
            book them directly for fittings, shoots and wardrobe work.
          </p>
          <Link
            to="/stylists/apply"
            className="mt-10 inline-flex items-center border border-foreground bg-foreground px-8 py-4 text-[0.7rem] uppercase tracking-[0.22em] text-primary-foreground transition-colors duration-300 hover:bg-transparent hover:text-foreground"
          >
            Apply as a stylist
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24">
        {error && <p className="text-sm text-destructive">{error}</p>}

        {stylists && stylists.length === 0 && (
          <p className="font-serif text-2xl text-muted-foreground">
            No stylists yet — check back soon, or be the first to apply.
          </p>
        )}

        {stylists && stylists.length > 0 && (
          <div className="grid gap-x-6 gap-y-16 md:grid-cols-2">
            {stylists.map((s, i) => (
              <Link
                key={s.id}
                to="/stylists/$stylistId"
                params={{ stylistId: s.id }}
                className={`group block ${i % 2 === 1 ? "md:mt-24" : ""}`}
              >
                <div className="mt-5">
                  <h2 className="font-serif text-3xl">{s.name}</h2>
                  {s.city && (
                    <p className="label-xs mt-2 text-muted-foreground">{s.city}</p>
                  )}
                </div>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {s.about}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
