import DD1 from "@/assets/dd1.jpg";
import DD2 from "@/assets/dd2.jpg";
import DD3 from "@/assets/dd3.jpg";
import DD4 from "@/assets/dd4.jpg";
import DD5 from "@/assets/dd5.jpg";
import DD6 from "@/assets/dd6.jpg";
import GB1 from "@/assets/gb1.jpg";
import GB2 from "@/assets/gb2.jpg";
import GB3 from "@/assets/gb3.jpg";
import GB4 from "@/assets/gb4.jpg";
import BC1 from "@/assets/bc1.jpg";
import BC2 from "@/assets/bc2.jpg";
import BC3 from "@/assets/bc3.jpg";
import BC4 from "@/assets/bc4.jpg";
import BC5 from "@/assets/bc5.jpg";
import LC1 from "@/assets/lc1.jpg";
import LC2 from "@/assets/lc2.jpg";
import LC3 from "@/assets/lc3.jpg";
import LC4 from "@/assets/lc4.jpg";
import LC5 from "@/assets/lc5.jpg";
import SK1 from "@/assets/SK1.jpg";
import SK2 from "@/assets/SK2.jpg";
import SK3 from "@/assets/SK3.jpg";
import SK4 from "@/assets/SK4.jpg";
import LC3New from "@/assets/LC3.JPG";
import LC4New from "@/assets/LC4.JPG";
import LC5New from "@/assets/LC5.jpg";
import LC6 from "@/assets/LC6.jpg";
import LC7 from "@/assets/LC7.jpg";
import LC8 from "@/assets/LC8.JPG";
import LC9 from "@/assets/LC9.JPG";
import LC11 from "@/assets/LC11.jpg";
import LC12 from "@/assets/LC12.JPG";
import LC13 from "@/assets/LC13.JPG";
import LC15 from "@/assets/LC15.png";
import LC20 from "@/assets/LC20.JPG";


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
  {
    slug: "shonakidd",
    name: "ShonaKidd",
    location: "Cosmo City, Johannesburg",
    discipline: "Music-inspired streetwear & printed tees",
    since: "2025",
    bio: "ShonaKidd is a fashion and lifestyle brand born from the connection between music, street culture and self-expression, carrying Zimbabwean heritage into the streets of Johannesburg. Pieces for people who move differently, think independently and define their own identity through what they wear.",
    statement: "Define Your Style.",
    portrait: SK1,
    lookbook: [SK2, SK3, SK4],
    instagram: "shonakiddwtw",
  },
];


export const products: Product[] = [
  {
    id: "destroyed-tee",
    name: "Destroyed Layered Tee",
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
    category: "Bottoms",
    designer: "galbakaline",
    images: [GB4, GB2],
    fabric: "Panelled leather, oxblood and black",
    care: "Wipe clean. Condition twice yearly.",
    description:
      "A baggy leather trouser built from oxblood and black panels with appliqué crosses set down each leg.",
    sizes: ["28", "30", "32", "34", "36"],
  },
  {
    id: "denim-patch-set",
    name: "Denim Patchwork Hooded Set",
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
    category: "Tops",
    designer: "designing-balaclava",
    images: [BC5, BC2],
    fabric: "Cotton rib jersey, black",
    care: "Machine wash cold. Hang dry.",
    description:
      "A cropped black rib tank with the small balaclava mark at the chest — the everyday base layer of the studio wardrobe.",
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: "quantum-strider-trouser",
    name: "Quantum Strider Panelled Trouser",
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
    category: "Outerwear",
    designer: "last-cloud-designs",
    images: [LC1, LC2, LC13],
    fabric: "Chambray denim, red contrast stitch",
    care: "Cold wash separately. Tumble dry low.",
    description:
      "The SS2025 unisex kids two-piece: a short-sleeve denim camp shirt and cargo short traced in red stitch, with the embroidered Last Cloud mark on the pocket.",
    sizes: ["4Y", "6Y", "8Y", "10Y"],
  },
  {
    id: "shonakidd-flow-rider-tee",
    name: "Flow Rider Printed Tee",
    category: "Tops",
    designer: "shonakidd",
    images: [SK1, SK2],
    fabric: "Heavyweight cotton jersey, screen print",
    care: "Machine wash cold inside out. Tumble dry low.",
    description:
      "A bold graphic tee built for professional flow riders — ShonaKidd's music-and-streetwear energy in a heavyweight cotton print.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "shonakidd-define-your-style-tee",
    name: "Define Your Style Tee",
    category: "Tops",
    designer: "shonakidd",
    images: [SK3, SK4],
    fabric: "Heavyweight cotton jersey, screen print",
    care: "Machine wash cold inside out. Tumble dry low.",
    description:
      "Where fashion meets the flow — a statement tee for anyone who isn't afraid to define their own identity.",
    sizes: ["S", "M", "L", "XL"],
  },
];


export const categories: Category[] = ["Tops", "Outerwear", "Bottoms", "Accessories"];

export const getDesigner = (slug: string) => designers.find((d) => d.slug === slug);
export const getProduct = (id: string) => products.find((p) => p.id === id);
export const productsByDesigner = (slug: string) =>
  products.filter((p) => p.designer === slug);
