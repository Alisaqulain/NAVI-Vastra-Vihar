/** Real NAVI Vastra Vihar catalog photography (public/) */
export const CATALOG_IMAGES = [
  {
    src: "/NPD_6077.jpg",
    alt: "Black silk saree with gold zari and orange blouse — premium wedding saree at NAVI Vastra Vihar Bengaluru",
  },
  {
    src: "/NPD_6176.jpg",
    alt: "Full-length black and gold Banarasi-style saree with traditional zari work — NAVI Vastra Vihar",
  },
  {
    src: "/NPD_6185.jpg",
    alt: "Black silk saree with gold border draped at heritage stone corridor — NAVI ethnic wear",
  },
  {
    src: "/NPD_6216.jpg",
    alt: "Mother and daughter in navy silk saree and emerald lehenga — festive family collection NAVI Vastra Vihar",
  },
  {
    src: "/NPD_6264.jpg",
    alt: "Mustard yellow saree with chocolate brown gold border — handpicked silk saree NAVI Bengaluru",
  },
  {
    src: "/NPD_6285.jpg",
    alt: "Pastel striped organza saree with scalloped border — designer party wear saree NAVI Vastra Vihar",
  },
  {
    src: "/NPD_6286.jpg",
    alt: "Striped chiffon saree with crystal scalloped hem and forest green blouse — NAVI designer sarees",
  },
  {
    src: "/NPD_6289.jpg",
    alt: "Striped saree and kurta mother-son festive look — NAVI Vastra Vihar ethnic wear",
  },
  {
    src: "/NPD_6295.jpg",
    alt: "Yellow silk saree with brown border, pallu in motion — NAVI Vastra Vihar silk collection",
  },
  {
    src: "/NPD_6314.jpg",
    alt: "Multi-color striped embellished saree with olive blouse — NAVI party wear sarees",
  },
  {
    src: "/NPD_6322.jpg",
    alt: "Coral and grey striped saree with gold beadwork — NAVI Vastra Vihar Bengaluru",
  },
  {
    src: "/NPD_6331.jpg",
    alt: "Striped designer saree at scenic viewpoint — NAVI Vastra Vihar curated fashion",
  },
  {
    src: "/NPD_6334.jpg",
    alt: "Mustard yellow saree with brown zari border on rocky landscape — NAVI silk sarees",
  },
  {
    src: "/NPD_6345.jpg",
    alt: "Golden yellow saree at Nandi Hills — lifestyle silk saree NAVI Vastra Vihar Karnataka",
  },
  {
    src: "/NPD_6350.jpg",
    alt: "Flowing mustard and brown traditional saree — NAVI Vastra Vihar since 1978",
  },
] as const;

export type CatalogImage = (typeof CATALOG_IMAGES)[number];

export const PLACEHOLDER_IMAGE = "/logo.jpeg";

export const DEFAULT_OG_IMAGE = CATALOG_IMAGES[3].src;

function hashId(id: string): number {
  return id.split("").reduce((a, c) => ((a << 5) - a + c.charCodeAt(0)) | 0, 0) >>> 0;
}

export function catalogAt(index: number): CatalogImage {
  const i = ((index % CATALOG_IMAGES.length) + CATALOG_IMAGES.length) % CATALOG_IMAGES.length;
  return CATALOG_IMAGES[i];
}

export function catalogSrc(index: number): string {
  return catalogAt(index).src;
}

export function catalogAlt(index: number): string {
  return catalogAt(index).alt;
}

export function getProductImage(productId: string): string {
  return catalogSrc(hashId(productId));
}

export function getProductImageAlt(productId: string): string {
  return catalogAlt(hashId(productId));
}

export function getProductImages(productId: string, count = 6): string[] {
  const start = hashId(productId) % CATALOG_IMAGES.length;
  return Array.from({ length: count }, (_, i) => catalogSrc(start + i));
}

export const HERO_SLIDES = [
  {
    id: "heritage",
    image: CATALOG_IMAGES[3].src,
    imageAlt: CATALOG_IMAGES[3].alt,
    objectPosition: "65% center",
    title: "Heritage Silk Sarees",
    subtitle: "Handpicked silks & zari weaves for weddings and festivals.",
    cta: { label: "Shop sarees", href: "/shop?category=sarees" },
  },
  {
    id: "festive",
    image: CATALOG_IMAGES[4].src,
    imageAlt: CATALOG_IMAGES[4].alt,
    objectPosition: "50% 35%",
    title: "Festive Season Edit",
    subtitle: "Pujo, Diwali & weddings — drapes for every celebration.",
    cta: { label: "Shop Festive", href: "/shop?category=festive-wear" },
  },
  {
    id: "bridal",
    image: CATALOG_IMAGES[0].src,
    imageAlt: CATALOG_IMAGES[0].alt,
    objectPosition: "55% 25%",
    title: "Bridal & Lehengas",
    subtitle: "Ceremony-ready looks with master-quality finish.",
    cta: { label: "Shop Lehengas", href: "/shop?category=lehengas" },
  },
  {
    id: "everyday",
    image: CATALOG_IMAGES[5].src,
    imageAlt: CATALOG_IMAGES[5].alt,
    objectPosition: "50% 30%",
    title: "Everyday Elegance",
    subtitle: "Light georgette & cotton for office to evening.",
    cta: { label: "New Arrivals", href: "/shop?category=new-arrivals" },
  },
] as const;

export const SITE_IMAGES = {
  hero: {
    mobile: CATALOG_IMAGES[3].src,
    main: CATALOG_IMAGES[3].src,
    secondary: CATALOG_IMAGES[4].src,
    accent: CATALOG_IMAGES[0].src,
  },
  brand: {
    weave: CATALOG_IMAGES[13].src,
    detail: CATALOG_IMAGES[1].src,
  },
  about: CATALOG_IMAGES[3].src,
  contact: {
    hero: CATALOG_IMAGES[3].src,
    gallery1: CATALOG_IMAGES[4].src,
    gallery2: CATALOG_IMAGES[0].src,
  },
  newsletter: CATALOG_IMAGES[12].src,
  promo: CATALOG_IMAGES[0].src,
  instagram: CATALOG_IMAGES.slice(0, 8).map(({ src, alt }) => ({ src, alt })),
  categories: {
    "cat-sarees": CATALOG_IMAGES[0].src,
    "cat-lehengas": CATALOG_IMAGES[3].src,
    "cat-suits": CATALOG_IMAGES[4].src,
    "cat-kurtis": CATALOG_IMAGES[8].src,
    "cat-dupattas": CATALOG_IMAGES[6].src,
    "cat-festive": CATALOG_IMAGES[13].src,
    "cat-party": CATALOG_IMAGES[5].src,
    "cat-new-arrivals": CATALOG_IMAGES[11].src,
    "cat-best-sellers": CATALOG_IMAGES[0].src,
  } as Record<string, string>,
};
