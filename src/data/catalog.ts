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
import FIRE1 from "@/assets/Fire-2-piece-combo.jpeg";
import FIRE2 from "@/assets/Fire-2-piece-combo1.jpeg";
import FIRE3 from "@/assets/Fire-2-piece-combo2.jpeg";
import FIRE4 from "@/assets/Fire-2-piece-combo3.jpeg";
import HOODIENEW1 from "@/assets/Galbakaline-hoodie.JPG";
import HOODIENEW2 from "@/assets/Galbakaline-hoodie1.jpg";
import HOODIENEW3 from "@/assets/Galbakaline-hoodie2.JPG";
import LEATHERNEW1 from "@/assets/Galbakaline-leather-pants.JPG";
import LEATHERNEW2 from "@/assets/Galbakaline-leather-pants1.JPG";
import LEATHERNEW3 from "@/assets/Galbakaline-leather-pants2.JPG";
import LUXE1 from "@/assets/luxe-denim-2-piece.jpg";
import LUXE2 from "@/assets/luxe-denim-2-piece1.jpg";
import LUXE3 from "@/assets/luxe-denim-2-piece2.JPG";
import LUXE4 from "@/assets/luxe-denim-2-piece3.JPG";
import GOAT1 from "@/assets/chronic-wear-3-piece.jpg";
import GOAT2 from "@/assets/chronic-wear-3-piece1.jpg";
import GOAT3 from "@/assets/chronic-wear-3-piece2.jpg";
import GOAT4 from "@/assets/chronic-wear-3-piece3.jpg";
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
import AnxietyDenim from "@/assets/anxiety-denim.jpg";
import AnxietyDenim1 from "@/assets/anxiety-denim1.jpg";
import AnxietyDenim2 from "@/assets/anxiety-denim2.jpg";
import AnxietyDenim3 from "@/assets/anxiety-denim3.jpg";
import AnxietyCrop from "@/assets/anxiety-crop.jpg";
import AnxietyCrop1 from "@/assets/anxiety-crop1.jpg";
import AnxietyCrop2 from "@/assets/anxiety-crop2.jpg";
import AnxietyCrop3 from "@/assets/anxiety-crop3.jpg";
import AnxietyCustom from "@/assets/anxiety-custom.jpg";
import AnxietyCustom1 from "@/assets/anxiety-custom1.jpg";
import AnxietyCustom2 from "@/assets/anxiety-custom2.jpg";
import AnxietyCustom3 from "@/assets/anxiety-custom3.jpg";
import AnxietyCustomTwoPiece from "@/assets/anxiety-custom-two-piece.jpg";
import AnxietyCustomTwoPiece1 from "@/assets/anxiety-custom-two-piece1.jpg";
import AnxietyCustomTwoPiece2 from "@/assets/anxiety-custom-two-piece2.jpg";
import GoatSnowDarkBag from "@/assets/Absolute-snow-dark-bag.jpg";
import GoatSnowDarkBag1 from "@/assets/Absolute-snow-dark-bag1.jpg";
import GoatSnowDarkPants from "@/assets/Absolute-snow-dark-pants.jpg";
import GoatSnowDarkPants1 from "@/assets/Absolute-snow-dark-pants1.jpg";
import GoatSnowDarkShared from "@/assets/Absolute-snow-dark-.jpg";


export const heroImage = GB4;

export type Category = "Tops" | "Outerwear" | "Bottoms" | "Accessories";
export type Audience = "Men" | "Women" | "Unisex" | "Kids";

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
  audience: Audience;
  designer: string; // slug
  images: string[];
  fabric: string;
  care: string;
  description: string;
  sizes: string[];
};

export const designers: Designer[

] = [
  {
    slug: "absolute-goat",
    name: "Absolute Goat",
    location: "Cosmo City, Johannesburg",
    discipline: "Bold statement streetwear",
    since: "2025",
    bio: "Absolute Goat represents Chronic Wear — bold statement streetwear built around striking black-and-white colourways and unapologetic design, for those who wear their identity loud.",
    statement: "Chronic Wear.",
    portrait: GOAT1,
    lookbook: [GOAT2, GOAT3, GOAT4],
    instagram: "absolute_goat00000",
  },
  {
    slug: "anxiety",
    name: "ANXIETY",
    location: "Cosmo City, Randburg",
    discipline: "Streetwear & wearable art",
    since: "2021",
    bio: "ANXIETY is a streetwear clothing brand born in South Africa for the anxious generation. We turn inner struggles, overthinking, and raw emotion into wearable art. Each piece is designed to make you feel seen, confident, and understood — because anxiety isn't weakness, it's power.",
    statement: "Don't let your anxiety bring you down.",
    portrait: AnxietyDenim,
    lookbook: [AnxietyCustom1, AnxietyDenim, AnxietyDenim1],
    instagram: "anxi3tystop",
  },
  {
    slug: "damnation-designs",
    name: "Damnation Designs",
    location: "Cosmo City, Johannesburg",
    discipline: "Skatewear & destroyed knits",
    since: "2021",
    bio: "Damnation Designs builds skate-worn silhouettes out of destroyed jersey, frayed denim and hand-pulled graphics. Every piece is cut, shredded and rebuilt by hand in small drops.",
    statement: "Destroy to create.",
    portrait: DD2,
    lookbook: [DD1, DD4, DD3],
    instagram: "damnationdesigns",
  },
  {
    slug: "designing-balaclava",
    name: "Designing Balaclava",
    location: "Cosmo City, Johannesburg",
    discipline: "Balaclava-marked knits & studio outerwear",
    since: "2023",
    bio: "Designing Balaclava builds a studio-lit wardrobe around one mark: the balaclava. Galaxy-shimmer zip hoodies, contrast-stitch cargo denim and light knit tanks, cut clean and released in short runs.",
    statement: "One mark. Every fit.",
    portrait: BC4,
    lookbook: [BC3, BC1, BC2],
    instagram: "designingbalaclava",
  },
  {
    slug: "galbakaline",
    name: "Galbakaline",
    location: "Cosmo City, Johannesburg",
    discipline: "Fur, denim & outerwear",
    since: "2022",
    bio: "Galbakaline makes premium hoodies and outerwear from luxurious fur, reclaimed denim and technical shells, finished with hand-drawn character graphics. Comfort meets style in every stitch.",
    statement: "Every stitch is a signature.",
    portrait: FIRE1,
    lookbook: [LUXE1, HOODIENEW1, LEATHERNEW1],
    instagram: "galbakaline",
  },
  {
    slug: "last-cloud-designs",
    name: "Last Cloud Designs",
    location: "Cosmo City, Johannesburg",
    discipline: "Panelled satin, denim tailoring & streetwear",
    since: "2024",
    bio: "Last Cloud Designs works in story-driven collections — panelled satin trousers, red-stitch denim two-pieces and soft-green streetwear sets, all cut in studio and released as short narrative drops.",
    statement: "Last Cloud to the world.",
    portrait: LC5New,
    lookbook: [LC11, LC20, LC15],
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


export const products: Product[

] = [
  {
    id: "aetheline-satin-stack",
    name: "Aetheline Stacked Satin Pant",
    category: "Bottoms",
    audience: "Unisex",
    designer: "last-cloud-designs",
    images: [LC4, LC3],
    fabric: "Liquid satin with contrast cream cuff panels",
    care: "Hand wash cold. Dry flat.",
    description:
      "A high-rise satin pant in mauve with cream cuff banding, ruched to stack deep over the boot.",
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: "balaclava-tank",
    name: "Balaclava Knit Tank",
    category: "Tops",
    audience: "Unisex",
    designer: "designing-balaclava",
    images: [BC1, BC2],
    fabric: "Fine marled knit, ribbed hem",
    care: "Hand wash cold. Dry flat.",
    description:
      "A lightweight marled knit tank with the balaclava mark at the chest — the summer release, cut close through the body.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "balaclava-zip-hoodie-white",
    name: "Balaclava Zip Hoodie — Bone",
    category: "Outerwear",
    audience: "Unisex",
    designer: "designing-balaclava",
    images: [BC3],
    fabric: "Heavyweight brushed fleece, bone",
    care: "Cold wash inside out. Hang dry.",
    description:
      "A bone-white full-zip hood with a deep pointed hood and the balaclava mark printed dead centre. Formal look 101, worn over a shirt and tie.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "absolute-goat-chronic-wear-shorts",
    name: "Chronic Wear Below-Knee Shorts",
    category: "Bottoms",
    audience: "Unisex",
    designer: "absolute-goat",
    images: [GOAT4, GOAT1],
    fabric: "Heavyweight cotton twill",
    care: "Machine wash cold. Tumble dry low.",
    description:
      "Below-knee shorts cut from heavyweight twill and stamped with the Chronic Wear mark — part of Absolute Goat's 3-piece statement set.",
    sizes: ["28", "30", "32", "34", "36"],
  },
  {
    id: "absolute-goat-snow-dark-bag",
    name: "Snow Dark Bag",
    category: "Accessories",
    audience: "Unisex",
    designer: "absolute-goat",
    images: [GoatSnowDarkBag, GoatSnowDarkBag1, GoatSnowDarkShared],
    fabric: "Heavyweight cotton twill",
    care: "Spot clean only.",
    description:
      "A statement bag from Absolute Goat's Snow Dark drop, built in heavyweight twill with the Chronic Wear mark.",
    sizes: ["28", "30", "32", "34", "36"],
  },
  {
    id: "absolute-goat-snow-dark-pants",
    name: "Snow Dark Pants",
    category: "Bottoms",
    audience: "Unisex",
    designer: "absolute-goat",
    images: [GoatSnowDarkPants, GoatSnowDarkPants1, GoatSnowDarkShared],
    fabric: "Heavyweight cotton twill",
    care: "Machine wash cold. Tumble dry low.",
    description:
      "Snow Dark pants from Absolute Goat — heavyweight twill cut with the Chronic Wear mark.",
    sizes: ["28", "30", "32", "34", "36"],
  },
  {
    id: "absolute-goat-chronic-wear-hat",
    name: "Chronic Wear Bucket Hat",
    category: "Accessories",
    audience: "Unisex",
    designer: "absolute-goat",
    images: [GOAT2, GOAT1],
    fabric: "Cotton twill",
    care: "Spot clean only.",
    description:
      "A statement bucket hat carrying the Chronic Wear mark in a striking black-and-white colourway — the finishing piece of the set.",
    sizes: ["One size"],
  },
  {
    id: "absolute-goat-chronic-wear-top",
    name: "Chronic Wear Graphic Top",
    category: "Tops",
    audience: "Unisex",
    designer: "absolute-goat",
    images: [GOAT3, GOAT1],
    fabric: "Heavyweight cotton jersey, screen print",
    care: "Machine wash cold inside out. Tumble dry low.",
    description:
      "A bold graphic top built around the Chronic Wear identity — heavyweight cotton in Absolute Goat's signature black-and-white colourway.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "cloudy-bag",
    name: "Cloudy Bag",
    category: "Accessories",
    audience: "Unisex",
    designer: "last-cloud-designs",
    images: [LC7],
    fabric: "Soft-structure canvas",
    care: "Spot clean only.",
    description:
      "The Cloudy Bag, part of the Last Cloud Designs accessories line.",
    sizes: ["One Size"],
  },
  {
    id: "galaxy-zip-hoodie",
    name: "Contagious Galaxy Zip Hoodie — Black",
    category: "Outerwear",
    audience: "Unisex",
    designer: "designing-balaclava",
    images: [BC4, BC5],
    fabric: "Galaxy-shimmer bouclé with coated iridescent collar",
    care: "Hand wash cold. Dry flat away from heat.",
    description:
      "An oversized full-zip hoodie in midnight galaxy-shimmer bouclé, finished with an iridescent coated collar and a cropped, boxy shoulder.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "cool-summer-bag",
    name: "Cool Summer Bag",
    category: "Accessories",
    audience: "Unisex",
    designer: "last-cloud-designs",
    images: [LC6],
    fabric: "Lightweight canvas",
    care: "Spot clean only.",
    description:
      "A breezy warm-weather tote from Last Cloud Designs, built for everyday carry.",
    sizes: ["One Size"],
  },
  {
    id: "anxiety-crop-top",
    name: "Crop Top",
    category: "Tops",
    audience: "Women",
    designer: "anxiety",
    images: [AnxietyCrop, AnxietyCrop1, AnxietyCrop2, AnxietyCrop3],
    fabric: "Cotton blend",
    care: "Machine wash cold. Hang dry.",
    description:
      "An ANXIETY crop top — raw emotion turned into wearable art.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "cross-leather-pant",
    name: "Cross Panel Leather Pant",
    category: "Bottoms",
    audience: "Unisex",
    designer: "galbakaline",
    images: [GB2, LEATHERNEW1, LEATHERNEW2, LEATHERNEW3],
    fabric: "Panelled leather, oxblood and black",
    care: "Wipe clean. Condition twice yearly.",
    description:
      "A baggy leather trouser built from oxblood and black panels with appliqué crosses set down each leg.",
    sizes: ["28", "30", "32", "34", "36"],
  },
  {
    id: "skate-crossbody",
    name: "Crossbody Skateboard Bag",
    category: "Accessories",
    audience: "Unisex",
    designer: "damnation-designs",
    images: [DD3],
    fabric: "Coated canvas with webbing straps",
    care: "Spot clean with a damp cloth.",
    description:
      "A full-length carry sling that holds a deck across the back, with a zipped utility pocket and adjustable webbing. Get ready to roll.",
    sizes: ["One size"],
  },
  {
    id: "anxiety-custom-tshirt",
    name: "Custom Hand-Painted T-Shirt",
    category: "Tops",
    audience: "Unisex",
    designer: "anxiety",
    images: [AnxietyCustom, AnxietyCustom1, AnxietyCustom2, AnxietyCustom3],
    fabric: "Cotton, hand-painted",
    care: "Hand wash cold. Do not tumble dry.",
    description:
      "A one-of-a-kind hand-painted t-shirt from ANXIETY — each piece designed to make you feel seen.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "anxiety-custom-two-piece",
    name: "Custom Hand-Painted Two Piece",
    category: "Tops",
    audience: "Unisex",
    designer: "anxiety",
    images: [AnxietyCustomTwoPiece, AnxietyCustomTwoPiece1, AnxietyCustomTwoPiece2],
    fabric: "Cotton, hand-painted",
    care: "Hand wash cold. Do not tumble dry.",
    description:
      "A custom hand-painted two-piece set from ANXIETY — confident, understood, and one of a kind.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "damnation-graphic-tee",
    name: "Damnation Skate Graphic Tee",
    category: "Tops",
    audience: "Unisex",
    designer: "damnation-designs",
    images: [DD5, DD6, DD4],
    fabric: "260gsm cotton, DTG print",
    care: "Machine wash cold. Tumble dry low.",
    description:
      "The iconic skatewear graphic returns in white with electrifying purple and blue undersleeves — an oversized body cut long through the shoulder.",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "shonakidd-define-your-style-tee",
    name: "Define Your Style Tee",
    category: "Tops",
    audience: "Unisex",
    designer: "shonakidd",
    images: [SK3, SK4],
    fabric: "Heavyweight cotton jersey, screen print",
    care: "Machine wash cold inside out. Tumble dry low.",
    description:
      "Where fashion meets the flow — a statement tee for anyone who isn't afraid to define their own identity.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "anxiety-denim-two-piece",
    name: "Denim B/W Two Piece",
    category: "Tops",
    audience: "Unisex",
    designer: "anxiety",
    images: [AnxietyDenim, AnxietyDenim1, AnxietyDenim2, AnxietyDenim3],
    fabric: "Denim, black and white",
    care: "Machine wash cold. Hang dry.",
    description:
      "A black and white denim two-piece from ANXIETY — wearable art for the anxious generation.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "denim-cut-kids-set",
    name: "Denim Cut Two-Piece — Kids",
    category: "Outerwear",
    audience: "Kids",
    designer: "last-cloud-designs",
    images: [LC1, LC13],
    fabric: "Chambray denim, red contrast stitch",
    care: "Cold wash separately. Tumble dry low.",
    description:
      "The SS2025 unisex kids two-piece: a short-sleeve denim camp shirt and cargo short traced in red stitch, with the embroidered Last Cloud mark on the pocket.",
    sizes: ["4Y", "6Y", "8Y", "10Y"],
  },
  {
    id: "destroyed-tee",
    name: "Destroyed Layered Tee",
    category: "Tops",
    audience: "Unisex",
    designer: "damnation-designs",
    images: [DD1, DD2],
    fabric: "Heavyweight cotton jersey, hand-distressed",
    care: "Cold wash inside out. Hang dry. Do not bleach.",
    description:
      "A boxy double-sleeve tee with hand-cut openings and raw hems, screen-printed with the Damnation script. No two are shredded the same way.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "shonakidd-flow-rider-tee",
    name: "Flow Rider Printed Tee",
    category: "Tops",
    audience: "Unisex",
    designer: "shonakidd",
    images: [SK1, SK2],
    fabric: "Heavyweight cotton jersey, screen print",
    care: "Machine wash cold inside out. Tumble dry low.",
    description:
      "A bold graphic tee built for professional flow riders — ShonaKidd's music-and-streetwear energy in a heavyweight cotton print.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "frayed-bucket-hat",
    name: "Frayed Bucket Hat",
    category: "Accessories",
    audience: "Unisex",
    designer: "damnation-designs",
    images: [DD6, DD4],
    fabric: "Distressed black denim",
    care: "Spot clean only.",
    description:
      "A deep-brim bucket hat in shredded denim panels, stitched to keep its shape while the surface keeps unravelling.",
    sizes: ["One size"],
  },
  {
    id: "frayed-shorts",
    name: "Frayed Patchwork Shorts",
    category: "Bottoms",
    audience: "Unisex",
    designer: "damnation-designs",
    images: [DD4, DD6],
    fabric: "Patchworked black denim, frayed by hand",
    care: "Cold wash separately. Fraying will develop with wear.",
    description:
      "Knee-length shorts assembled from overlapping denim panels, every edge pulled open so the texture grows with each session.",
    sizes: ["28", "30", "32", "34", "36"],
  },
  {
    id: "nebula-trousers",
    name: "Nebula Trousers",
    category: "Bottoms",
    audience: "Women",
    designer: "last-cloud-designs",
    images: [LC15],
    fabric: "Structured woven blend",
    care: "Machine wash cold. Hang dry.",
    description:
      "Nebula Trousers from Last Cloud Designs — a tailored silhouette with a wide leg.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "quantum-strider-trouser",
    name: "Quantum Strider Panelled Trouser",
    category: "Bottoms",
    audience: "Women",
    designer: "last-cloud-designs",
    images: [LC3, LC5],
    fabric: "Satin and textured black panels, wide leg",
    care: "Hand wash cold. Cool iron on reverse.",
    description:
      "A wide-leg trouser built from silver satin shards set into textured black panels — the centrepiece of the Quantum Strider storyline.",
    sizes: ["28", "30", "32", "34", "36"],
  },
  {
    id: "reversible-shell",
    name: "Reversible Waterproof Jacket",
    category: "Outerwear",
    audience: "Unisex",
    designer: "galbakaline",
    images: [GB4],
    fabric: "Waterproof shell, reversible to white lining",
    care: "Wipe clean. Do not tumble dry.",
    description:
      "A boxy hooded shell in high-visibility orange that flips to a clean white face — two jackets, one zip.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "fur-hoodie",
    name: "Signature Fur Hoodie",
    category: "Outerwear",
    audience: "Unisex",
    designer: "galbakaline",
    images: [GB1, GB2, HOODIENEW1, HOODIENEW2, HOODIENEW3],
    fabric: "High-pile faux fur with brushed fleece body",
    care: "Hand wash cold. Dry flat away from heat.",
    description:
      "A premium hoodie crafted from luxurious high-pile fur with a hand-drawn character graphic across the back. Comfort meets style in every stitch.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "ss2025-mojito-kids-two-piece",
    name: "SS2025 Mojito — Kids Unisex Two Piece",
    category: "Tops",
    audience: "Kids",
    designer: "last-cloud-designs",
    images: [LC3New, LC4New, LC12],
    fabric: "Cotton blend",
    care: "Machine wash cold. Hang dry.",
    description:
      "The SS2025 Mojito two-piece, sized for kids — from the Last Cloud Designs summer collection.",
    sizes: ["4Y", "6Y", "8Y", "10Y"],
  },
  {
    id: "ss2025-mojito-unisex-two-piece",
    name: "SS2025 Mojito — Unisex Two Piece",
    category: "Tops",
    audience: "Unisex",
    designer: "last-cloud-designs",
    images: [LC4New],
    fabric: "Cotton blend",
    care: "Machine wash cold. Hang dry.",
    description:
      "The SS2025 Mojito two-piece in adult sizing — from the Last Cloud Designs summer collection.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "ss2025-rosa-gallica-two-piece",
    name: "SS2025 Rosa Gallica — Unisex Two Piece",
    category: "Tops",
    audience: "Unisex",
    designer: "last-cloud-designs",
    images: [LC8, LC9],
    fabric: "Cotton blend",
    care: "Machine wash cold. Hang dry.",
    description:
      "The Rosa Gallica two-piece from the SS2025 Last Cloud Designs collection.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "ss2025-tshirt-cream-white",
    name: "SS2025 T-Shirt — Cream White",
    category: "Tops",
    audience: "Unisex",
    designer: "last-cloud-designs",
    images: [LC20],
    fabric: "Cotton jersey",
    care: "Machine wash cold. Hang dry.",
    description:
      "Part of the SS2025 collection — a clean cream white tee from Last Cloud Designs.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "ss2026-two-piece-brown",
    name: "SS2026 Two Piece",
    category: "Tops",
    audience: "Unisex",
    designer: "last-cloud-designs",
    images: [LC5New, LC11],
    fabric: "Cotton blend",
    care: "Machine wash cold. Hang dry.",
    description:
      "An early look from the SS2026 Last Cloud Designs collection.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "stacked-trouser",
    name: "Stacked Padded Trouser",
    category: "Bottoms",
    audience: "Unisex",
    designer: "damnation-designs",
    images: [DD2, DD1],
    fabric: "Padded cotton twill, contrast stitch",
    care: "Cold wash. Dry flat.",
    description:
      "An extra-long padded trouser built to stack at the ankle, quilted through the leg for impact and volume.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "lastcloud-mint-set",
    name: "To The World Mint Set",
    category: "Outerwear",
    audience: "Unisex",
    designer: "last-cloud-designs",
    images: [LC2],
    fabric: "Cotton twill, soft mint",
    care: "Machine wash cold. Hang dry.",
    description:
      "An overshirt and short set in soft mint twill, worn over the graphic Last Cloud streetwear tee. Boxy through the shoulder, relaxed at the leg.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "luxe-denim-2-piece",
    name: "Luxe Denim 2 Piece",
    category: "Outerwear",
    audience: "Men",
    designer: "galbakaline",
    images: [LUXE1, LUXE2, LUXE3, LUXE4],
    fabric: "Premium denim, reclaimed panels",
    care: "Cold wash separately. Hang dry.",
    description:
      "A luxe two-piece denim set built from premium reclaimed panels, cut for a boxy, elevated silhouette.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "fire-2-piece-combo",
    name: "Fire 2 Piece Combo",
    category: "Outerwear",
    audience: "Unisex",
    designer: "galbakaline",
    images: [FIRE1, FIRE2, FIRE3, FIRE4],
    fabric: "Technical shell with graphic detailing",
    care: "Wipe clean. Do not tumble dry.",
    description:
      "A bold two-piece combo finished with Galbakaline's signature flame-streaked graphics — comfort meets style in every stitch.",
    sizes: ["S", "M", "L", "XL"],
  },
];


export const categories: Category[] = ["Tops", "Outerwear", "Bottoms", "Accessories"];
export const audiences: Audience[] = ["Men", "Women", "Unisex", "Kids"];

export const getDesigner = (slug: string) => designers.find((d) => d.slug === slug);
export const getProduct = (id: string) => products.find((p) => p.id === id);
export const productsByDesigner = (slug: string) =>
  products.filter((p) => p.designer === slug);
