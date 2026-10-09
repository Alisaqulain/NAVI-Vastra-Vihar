import { getProductById } from "@/lib/data/mock/products";

/** Real NAVI Vastra Vihar catalog photography (public/) */
export const CATALOG_IMAGES = [
  {
    src: "/14590/NPD_7185.jpg",
    alt: "Premium silk saree ₹14,590 — NAVI Vastra Vihar Bengaluru",
  },
  {
    src: "/4995/NPD_7160.jpg",
    alt: "Silk blend saree ₹4,995 — NAVI Vastra Vihar",
  },
  {
    src: "/3750/NPD_7138.jpg",
    alt: "Cotton silk saree ₹3,750 — NAVI Vastra Vihar",
  },
  {
    src: "/14000-18000/NPD_7098.jpg",
    alt: "Premium wedding saree ₹14,000–₹18,000 — NAVI Vastra Vihar",
  },
  {
    src: "/7599/NPD_7309.jpg",
    alt: "Designer saree ₹7,599 — NAVI Vastra Vihar",
  },
  {
    src: "/1750/NPD_7272.jpg",
    alt: "Everyday saree ₹1,750 — NAVI Vastra Vihar",
  },
  {
    src: "/16990/NPD_7192.jpg",
    alt: "Bridal silk saree ₹16,990 — NAVI Vastra Vihar",
  },
  {
    src: "/6490/NPD_7250.jpg",
    alt: "Festive saree ₹6,490 — NAVI Vastra Vihar",
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
  const product = getProductById(productId);
  if (product?.images[0]) return product.images[0];
  return catalogSrc(hashId(productId));
}

export function getProductImageAlt(productId: string): string {
  return catalogAlt(hashId(productId));
}

export function getProductImages(productId: string, count = 6): string[] {
  const primary = getProductImage(productId);
  const start = hashId(productId) % CATALOG_IMAGES.length;
  const extras = Array.from({ length: count - 1 }, (_, i) => catalogSrc(start + i + 1));
  return [primary, ...extras].slice(0, count);
}

export const HERO_SLIDES = [
  {
    id: "heritage",
    image: "/14590/NPD_7185.jpg",
    imageAlt: "Premium silk saree collection at NAVI Vastra Vihar",
    objectPosition: "65% center",
    title: "Heritage Silk Sarees",
    subtitle: "Shop real inventory with prices from ₹1,750 to ₹17,490.",
    cta: { label: "Shop sarees", href: "/shop?category=sarees" },
  },
  {
    id: "festive",
    image: "/4995/NPD_7160.jpg",
    imageAlt: "Festive saree edit NAVI Vastra Vihar",
    objectPosition: "50% 35%",
    title: "Festive Season Edit",
    subtitle: "Pujo, Diwali & weddings — priced per piece as in-store.",
    cta: { label: "Shop festive", href: "/shop?category=festive-wear" },
  },
  {
    id: "bridal",
    image: "/16990/NPD_7192.jpg",
    imageAlt: "Bridal saree ₹16,990",
    objectPosition: "55% 25%",
    title: "Bridal & Premium",
    subtitle: "Ceremony-ready silks from our premium price tiers.",
    cta: { label: "Shop premium", href: "/shop?category=festive-wear" },
  },
  {
    id: "value",
    image: "/1750/NPD_7272.jpg",
    imageAlt: "Everyday saree ₹1,750",
    objectPosition: "50% 30%",
    title: "Everyday Value",
    subtitle: "Beautiful drapes starting at ₹1,750.",
    cta: { label: "Shop under ₹5,000", href: "/shop?maxPrice=5000" },
  },
] as const;

export const SITE_IMAGES = {
  hero: {
    mobile: HERO_SLIDES[0].image,
    main: HERO_SLIDES[0].image,
    secondary: HERO_SLIDES[1].image,
    accent: HERO_SLIDES[2].image,
  },
  brand: {
    weave: "/14000-18000/NPD_7100.jpg",
    detail: "/17490/NPD_7180.jpg",
  },
  about: "/14000-18000/NPD_7098.jpg",
  contact: {
    hero: "/14590/NPD_7187.jpg",
    gallery1: "/4995/NPD_7214.jpg",
    gallery2: "/7599/NPD_7310.jpg",
  },
  newsletter: "/6490/NPD_7251.jpg",
  promo: "/16990/NPD_7193.jpg",
  instagram: CATALOG_IMAGES.map(({ src, alt }) => ({ src, alt })),
  categories: {
    "cat-sarees": "/3750/NPD_7140.jpg",
    "cat-lehengas": "/16990/NPD_7194.jpg",
    "cat-suits": "/7599/NPD_7315.jpg",
    "cat-kurtis": "/2849/NPD_7285.jpg",
    "cat-dupattas": "/4675/NPD_7264.jpg",
    "cat-festive": "/14590/NPD_7190.jpg",
    "cat-party": "/5399/NPD_7236.jpg",
    "cat-new-arrivals": "/1750/NPD_7274.jpg",
    "cat-best-sellers": "/4995/4995.jpg",
  } as Record<string, string>,
};
