import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/stylists/$stylistId")({
  loader: async ({ params }) => {
    const { data, error } = await supabase
      .from("stylists")
      .select("*")
      .eq("id", params.stylistId)
      .eq("approved", true)
      .maybeSingle();

    if (error || !data) throw notFound();
    return { stylist: data };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Stylist not found — Collaborate.art" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { stylist } = loaderData;
    return {
      meta: [
        { title: `${stylist.name} — Collaborate.art` },
        { name: "description", content: stylist.about },
      ],
    };
  },
  component: StylistProfile,
  notFoundComponent: StylistNotFound,
});

function StylistNotFound() {
  return (
    <div className="mx-auto max-w-[1600px] px-5 py-32 md:px-10">
      <h1 className="font-serif text-4xl">This stylist couldn't be found.</h1>
      <Link to="/stylists" className="label-xs mt-6 inline-block rule-link">
        Back to stylists
      </Link>
    </div>
  );
}

function StylistProfile() {
  const { stylist } = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-[1600px] px-5 py-14 md:px-10 md:py-20">
      <Link to="/stylists" className="label-xs text-muted-foreground rule-link">
        Stylists
      </Link>
      <h1 className="mt-4 font-serif text-5xl leading-tight md:text-6xl">
        {stylist.name}
      </h1>
      {stylist.city && (
        <p className="label-xs mt-3 text-muted-foreground">{stylist.city}</p>
      )}
      <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground">
        {stylist.about}
      </p>
      {stylist.portfolio && (
        <p className="mt-6 text-sm">
          <span className="text-muted-foreground">Portfolio: </span>
          {stylist.portfolio}
        </p>
      )}
    </div>
  );
}
