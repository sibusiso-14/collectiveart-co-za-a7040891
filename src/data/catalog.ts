import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";

export type Category = "Tops" | "Outerwear" | "Bottoms" | "Accessories";

export type Designer = {
  slug: string;
  name: string;
  location: string;
  discipline: string;
  bio: string;
  statement: string;
  since: string;
  portrait: string;
  lookbook: string[];
};

export type Product = {
  id: string;
  name: string;
  price: number;
  category: Category;
  designer: string; // slug
  images: string[];
  fabric: string;
  care: string;
  description: string;
  sizes: string[];
};

export const designers: Designer[] = [
  {
    slug: "atelier-noir",
    name: "Atelier Noir",
    location: "Antwerp, BE",
    discipline: "Sculptural outerwear",
    since: "2016",
    bio: "Atelier Noir works exclusively in black, treating the coat as architecture. Every seam is drafted from a paper maquette before a single metre of wool is cut.",
    statement:
      "A garment should hold its own volume. We design the space around the body, not the body itself.",
    portrait: p2,
    lookbook: [p2, p4, p6],
  },
  {
    slug: "hana-veil",
    name: "Hana Veil",
    location: "Kyoto, JP",
    discipline: "Silk & drape",
    since: "2019",
    bio: "Hana Veil hand-dyes and layers featherweight silks in a converted machiya studio, producing fewer than eighty pieces each season.",
    statement: "Cloth remembers movement. I only try not to interrupt it.",
    portrait: p5,
    lookbook: [p5, p1, p4],
  },
  {
    slug: "morrow-supply",
    name: "Morrow Supply",
    location: "Lisbon, PT",
    discipline: "Leather & objects",
    since: "2014",
    bio: "A two-person leather workshop making unlined bags and hardware from vegetable-tanned offcuts sourced within fifty kilometres of the atelier.",
    statement: "We make objects that get better the longer you refuse to replace them.",
    portrait: p3,
    lookbook: [p3, p6, p1],
  },
  {
    slug: "linea-blanca",
    name: "Linea Blanca",
    location: "Mexico City, MX",
    discipline: "Everyday tailoring",
    since: "2021",
    bio: "Linea Blanca reduces the wardrobe to nine repeatable shapes in undyed linen and cotton, cut and finished in a family-run workshop in Roma Norte.",
    statement: "Restraint is the only luxury that never dates.",
    portrait: p1,
    lookbook: [p1, p4, p5],
  },
];

export const products: Product[] = [
  {
    id: "poplin-shirt",
    name: "Unlined Poplin Shirt",
    price: 240,
    category: "Tops",
    designer: "linea-blanca",
    images: [p1, p5, p4],
    fabric: "100% undyed European linen, 145gsm",
    care: "Cold hand wash. Dry flat in shade. Warm iron while damp.",
    description:
      "An oversized shirt drafted from a single pattern block, with a soft collar stand and mother-of-pearl buttons. Finished with French seams throughout.",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "monolith-coat",
    name: "Monolith Wool Coat",
    price: 1180,
    category: "Outerwear",
    designer: "atelier-noir",
    images: [p2, p4, p6],
    fabric: "Double-faced virgin wool, milled in Biella",
    care: "Dry clean only. Store on a broad wooden hanger.",
    description:
      "A floor-skimming double-breasted coat cut with a dropped shoulder and a hand-set collar that stands unaided.",
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: "carry-tote",
    name: "Carry Tote, Tan",
    price: 380,
    category: "Accessories",
    designer: "morrow-supply",
    images: [p3, p6, p2],
    fabric: "Vegetable-tanned full-grain calf leather",
    care: "Wipe with a dry cloth. Condition twice yearly.",
    description:
      "An unlined tote with saddle-stitched handles, made to slouch and patina. Each bag is stamped with its maker's initials.",
    sizes: ["One size"],
  },
  {
    id: "pleated-trouser",
    name: "Wide Pleated Trouser",
    price: 420,
    category: "Bottoms",
    designer: "atelier-noir",
    images: [p4, p2, p1],
    fabric: "Japanese wool-mohair, permanent pleat",
    care: "Dry clean. Do not press pleats flat.",
    description:
      "A voluminous trouser with a concealed hook closure and pleats set to fall from the hip rather than the waist.",
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: "veil-dress",
    name: "Veil Silk Dress",
    price: 690,
    category: "Tops",
    designer: "hana-veil",
    images: [p5, p1, p4],
    fabric: "Hand-dyed mulberry silk georgette",
    care: "Professional silk clean only.",
    description:
      "Two layers of georgette knotted at the waist, cut on the bias so the skirt opens with the wearer's stride.",
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: "forged-hoop",
    name: "Forged Hoop, Silver",
    price: 190,
    category: "Accessories",
    designer: "morrow-supply",
    images: [p6, p3, p5],
    fabric: "Recycled 925 sterling silver, brushed finish",
    care: "Polish with a soft cloth. Remove before swimming.",
    description:
      "A hand-forged open hoop with a flattened outer face, finished individually so no two catch the light the same way.",
    sizes: ["One size"],
  },
];

export const categories: Category[] = ["Tops", "Outerwear", "Bottoms", "Accessories"];

export const getDesigner = (slug: string) => designers.find((d) => d.slug === slug);
export const getProduct = (id: string) => products.find((p) => p.id === id);
export const productsByDesigner = (slug: string) =>
  products.filter((p) => p.designer === slug);
export const formatPrice = (n: number) => `$${n.toLocaleString("en-US")}`;
