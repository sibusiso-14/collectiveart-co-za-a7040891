import dd1 from "@/assets/dd1.jpg.asset.json";
import dd2 from "@/assets/dd2.jpg.asset.json";
import dd3 from "@/assets/dd3.jpg.asset.json";
import dd4 from "@/assets/dd4.jpg.asset.json";
import dd5 from "@/assets/dd5.jpg.asset.json";
import dd6 from "@/assets/dd6.jpg.asset.json";
import gb1 from "@/assets/gb1.jpg.asset.json";
import gb2 from "@/assets/gb2.jpg.asset.json";
import gb3 from "@/assets/gb3.jpg.asset.json";
import gb4 from "@/assets/gb4.jpg.asset.json";
import bc1 from "@/assets/bc1.jpg.asset.json";
import bc2 from "@/assets/bc2.jpg.asset.json";
import bc3 from "@/assets/bc3.jpg.asset.json";
import bc4 from "@/assets/bc4.jpg.asset.json";
import bc5 from "@/assets/bc5.jpg.asset.json";
import lc1 from "@/assets/lc1.jpg.asset.json";
import lc2 from "@/assets/lc2.jpg.asset.json";
import lc3 from "@/assets/lc3.jpg.asset.json";
import lc4 from "@/assets/lc4.jpg.asset.json";
import lc5 from "@/assets/lc5.jpg.asset.json";

const DD1 = dd1.url;
const DD2 = dd2.url;
const DD3 = dd3.url;
const DD4 = dd4.url;
const DD5 = dd5.url;
const DD6 = dd6.url;
const GB1 = gb1.url;
const GB2 = gb2.url;
const GB3 = gb3.url;
const GB4 = gb4.url;
const BC1 = bc1.url;
const BC2 = bc2.url;
const BC3 = bc3.url;
const BC4 = bc4.url;
const BC5 = bc5.url;
const LC1 = lc1.url;
const LC2 = lc2.url;
const LC3 = lc3.url;
const LC4 = lc4.url;
const LC5 = lc5.url;

export const heroImage = GB4;

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
  instagram: string; // handle without @
};

export const instagramProfile = (handle: string) => `https://instagram.com/${handle}`;
export const instagramDM = (handle: string) => `https://ig.me/m/${handle}`;

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
    slug: "damnation-designs",
    name: "Damnation Designs",
    location: "Maseru, LS",
    discipline: "Skatewear & destroyed knits",
    since: "2021",
    bio: "Damnation Designs builds skate-worn silhouettes out of destroyed jersey, frayed denim and hand-pulled graphics. Every piece is cut, shredded and rebuilt by hand in small drops.",
    statement: "Destroy to create.",
    portrait: DD2,
    lookbook: [DD1, DD4, DD3],
    instagram: "damnationdesigns",
  },
  {
    slug: "galbakaline",
    name: "Galbakaline",
    location: "Maseru, LS",
    discipline: "Fur, denim & outerwear",
    since: "2022",
    bio: "Galbakaline makes premium hoodies and outerwear from luxurious fur, reclaimed denim and technical shells, finished with hand-drawn character graphics. Comfort meets style in every stitch.",
    statement: "Every stitch is a signature.",
    portrait: GB1,
    lookbook: [GB1, GB3, GB2],
    instagram: "galbakaline",
  },
  {
    slug: "designing-balaclava",
    name: "Designing Balaclava",
    location: "Maseru, LS",
    discipline: "Balaclava-marked knits & studio outerwear",
    since: "2023",
    bio: "Designing Balaclava builds a studio-lit wardrobe around one mark: the balaclava. Galaxy-shimmer zip hoodies, contrast-stitch cargo denim and light knit tanks, cut clean and released in short runs.",
    statement: "One mark. Every fit.",
    portrait: BC4,
    lookbook: [BC3, BC1, BC2],
    instagram: "designingbalaclava",
  },
  {
    slug: "last-cloud-designs",
    name: "Last Cloud Designs",
    location: "Maseru, LS",
    discipline: "Panelled satin, denim tailoring & streetwear",
    since: "2024",
    bio: "Last Cloud Designs works in story-driven collections — panelled satin trousers, red-stitch denim two-pieces and soft-green streetwear sets, all cut in studio and released as short narrative drops.",
    statement: "Last Cloud to the world.",
    portrait: LC3,
    lookbook: [LC4, LC2, LC5],
    instagram: "lastcloud_designs",
  },
];

export const products: Product[] = [
  {
    id: "destroyed-tee",
    name: "Destroyed Layered Tee",
    price: 120,
    category: "Tops",
    designer: "damnation-designs",
    images: [DD1, DD2, DD6],
    fabric: "Heavyweight cotton jersey, hand-distressed",
    care: "Cold wash inside out. Hang dry. Do not bleach.",
    description:
      "A boxy double-sleeve tee with hand-cut openings and raw hems, screen-printed with the Damnation script. No two are shredded the same way.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "damnation-graphic-tee",
    name: "Damnation Skate Graphic Tee",
    price: 95,
    category: "Tops",
    designer: "damnation-designs",
    images: [DD5, DD6, DD4],
    fabric: "260gsm cotton, DTG print",
    care: "Machine wash cold. Tumble dry low.",
    description:
      "The iconic skatewear graphic returns in white with electrifying purple and blue undersleeves — an oversized body cut long through the shoulder.",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "skate-crossbody",
    name: "Crossbody Skateboard Bag",
    price: 180,
    category: "Accessories",
    designer: "damnation-designs",
    images: [DD3, DD1],
    fabric: "Coated canvas with webbing straps",
    care: "Spot clean with a damp cloth.",
    description:
      "A full-length carry sling that holds a deck across the back, with a zipped utility pocket and adjustable webbing. Get ready to roll.",
    sizes: ["One size"],
  },
  {
    id: "frayed-shorts",
    name: "Frayed Patchwork Shorts",
    price: 140,
    category: "Bottoms",
    designer: "damnation-designs",
    images: [DD4, DD6],
    fabric: "Patchworked black denim, frayed by hand",
    care: "Cold wash separately. Fraying will develop with wear.",
    description:
      "Knee-length shorts assembled from overlapping denim panels, every edge pulled open so the texture grows with each session.",
    sizes: ["28", "30", "32", "34", "36"],
  },
  {
    id: "stacked-trouser",
    name: "Stacked Padded Trouser",
    price: 210,
    category: "Bottoms",
    designer: "damnation-designs",
    images: [DD2, DD1],
    fabric: "Padded cotton twill, contrast stitch",
    care: "Cold wash. Dry flat.",
    description:
      "An extra-long padded trouser built to stack at the ankle, quilted through the leg for impact and volume.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "frayed-bucket-hat",
    name: "Frayed Bucket Hat",
    price: 70,
    category: "Accessories",
    designer: "damnation-designs",
    images: [DD6, DD4],
    fabric: "Distressed black denim",
    care: "Spot clean only.",
    description:
      "A deep-brim bucket hat in shredded denim panels, stitched to keep its shape while the surface keeps unravelling.",
    sizes: ["One size"],
  },
  {
    id: "fur-hoodie",
    name: "Signature Fur Hoodie",
    price: 320,
    category: "Outerwear",
    designer: "galbakaline",
    images: [GB1, GB2],
    fabric: "High-pile faux fur with brushed fleece body",
    care: "Hand wash cold. Dry flat away from heat.",
    description:
      "A premium hoodie crafted from luxurious high-pile fur with a hand-drawn character graphic across the back. Comfort meets style in every stitch.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "galba-hoodie",
    name: "Galbakaline Flame Hoodie",
    price: 180,
    category: "Tops",
    designer: "galbakaline",
    images: [GB2, GB1],
    fabric: "Cotton fleece with fur-trim sleeves",
    care: "Cold wash inside out. Hang dry.",
    description:
      "A cream heavyweight hoodie with flame-streaked sleeves and hood, finished with the Galbakaline stamp across the chest.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "cross-leather-pant",
    name: "Cross Panel Leather Pant",
    price: 390,
    category: "Bottoms",
    designer: "galbakaline",
    images: [GB2, GB4],
    fabric: "Panelled leather, oxblood and black",
    care: "Wipe clean. Condition twice yearly.",
    description:
      "A baggy leather trouser built from oxblood and black panels with appliqué crosses set down each leg.",
    sizes: ["28", "30", "32", "34", "36"],
  },
  {
    id: "denim-patch-set",
    name: "Denim Patchwork Hooded Set",
    price: 450,
    category: "Outerwear",
    designer: "galbakaline",
    images: [GB3, GB1],
    fabric: "Reclaimed denim patchwork, raw edges",
    care: "Cold wash alone. Expect fading.",
    description:
      "A hooded jacket and trouser cut entirely from reclaimed denim offcuts, each panel placed by hand so no two sets repeat.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "reversible-shell",
    name: "Reversible Waterproof Jacket",
    price: 280,
    category: "Outerwear",
    designer: "galbakaline",
    images: [GB4, GB3],
    fabric: "Waterproof shell, reversible to white lining",
    care: "Wipe clean. Do not tumble dry.",
    description:
      "A boxy hooded shell in high-visibility orange that flips to a clean white face — two jackets, one zip.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "galaxy-zip-hoodie",
    name: "Contagious Galaxy Zip Hoodie",
    price: 260,
    category: "Outerwear",
    designer: "designing-balaclava",
    images: [BC4, BC5],
    fabric: "Galaxy-shimmer bouclé with coated iridescent collar",
    care: "Hand wash cold. Dry flat away from heat.",
    description:
      "An oversized full-zip hoodie in midnight galaxy-shimmer bouclé, finished with an iridescent coated collar and a cropped, boxy shoulder.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "balaclava-zip-hoodie-white",
    name: "Balaclava Zip Hoodie — Bone",
    price: 240,
    category: "Outerwear",
    designer: "designing-balaclava",
    images: [BC3, BC4],
    fabric: "Heavyweight brushed fleece, bone",
    care: "Cold wash inside out. Hang dry.",
    description:
      "A bone-white full-zip hood with a deep pointed hood and the balaclava mark printed dead centre. Formal look 101, worn over a shirt and tie.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "balaclava-tank",
    name: "Balaclava Knit Tank",
    price: 85,
    category: "Tops",
    designer: "designing-balaclava",
    images: [BC1, BC3],
    fabric: "Fine marled knit, ribbed hem",
    care: "Hand wash cold. Dry flat.",
    description:
      "A lightweight marled knit tank with the balaclava mark at the chest — the summer release, cut close through the body.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "contrast-cargo-denim",
    name: "Contrast Stitch Cargo Denim",
    price: 190,
    category: "Bottoms",
    designer: "designing-balaclava",
    images: [BC2, BC1],
    fabric: "Washed black denim, white contrast stitch",
    care: "Cold wash separately. Expect fading.",
    description:
      "Wide-leg washed black cargo denim traced in white contrast stitch, with drop side pockets and a relaxed stack at the hem.",
    sizes: ["28", "30", "32", "34", "36"],
  },
  {
    id: "balaclava-crop-tank",
    name: "Balaclava Cropped Tank",
    price: 75,
    category: "Tops",
    designer: "designing-balaclava",
    images: [BC2, BC5],
    fabric: "Cotton rib jersey, black",
    care: "Machine wash cold. Hang dry.",
    description:
      "A cropped black rib tank with the small balaclava mark at the chest — the everyday base layer of the studio wardrobe.",
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: "quantum-strider-trouser",
    name: "Quantum Strider Panelled Trouser",
    price: 290,
    category: "Bottoms",
    designer: "last-cloud-designs",
    images: [LC3, LC5],
    fabric: "Satin and textured black panels, wide leg",
    care: "Hand wash cold. Cool iron on reverse.",
    description:
      "A wide-leg trouser built from silver satin shards set into textured black panels — the centrepiece of the Quantum Strider storyline.",
    sizes: ["28", "30", "32", "34", "36"],
  },
  {
    id: "aetheline-satin-stack",
    name: "Aetheline Stacked Satin Pant",
    price: 260,
    category: "Bottoms",
    designer: "last-cloud-designs",
    images: [LC4, LC3],
    fabric: "Liquid satin with contrast cream cuff panels",
    care: "Hand wash cold. Dry flat.",
    description:
      "A high-rise satin pant in mauve with cream cuff banding, ruched to stack deep over the boot.",
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: "aetheline-crop-set",
    name: "Aetheline Mesh Crop Tee",
    price: 110,
    category: "Tops",
    designer: "last-cloud-designs",
    images: [LC5, LC4],
    fabric: "Printed mesh overlay on cotton jersey",
    care: "Cold wash inside out. Hang dry.",
    description:
      "A cropped white tee layered with a printed mesh bodice panel — soft armour from the Echoes of Aetheline drop.",
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: "lastcloud-mint-set",
    name: "To The World Mint Set",
    price: 240,
    category: "Outerwear",
    designer: "last-cloud-designs",
    images: [LC2, LC1],
    fabric: "Cotton twill, soft mint",
    care: "Machine wash cold. Hang dry.",
    description:
      "An overshirt and short set in soft mint twill, worn over the graphic Last Cloud streetwear tee. Boxy through the shoulder, relaxed at the leg.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "denim-cut-kids-set",
    name: "Denim Cut Two-Piece — Kids",
    price: 150,
    category: "Outerwear",
    designer: "last-cloud-designs",
    images: [LC1, LC2],
    fabric: "Chambray denim, red contrast stitch",
    care: "Cold wash separately. Tumble dry low.",
    description:
      "The SS2025 unisex kids two-piece: a short-sleeve denim camp shirt and cargo short traced in red stitch, with the embroidered Last Cloud mark on the pocket.",
    sizes: ["4Y", "6Y", "8Y", "10Y"],
  },
];

export const categories: Category[] = ["Tops", "Outerwear", "Bottoms", "Accessories"];

export const getDesigner = (slug: string) => designers.find((d) => d.slug === slug);
export const getProduct = (id: string) => products.find((p) => p.id === id);
export const productsByDesigner = (slug: string) => products.filter((p) => p.designer === slug);
export const formatPrice = (n: number) => `$${n.toLocaleString("en-US")}`;
