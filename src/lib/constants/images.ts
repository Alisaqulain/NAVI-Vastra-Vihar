/** Verified working Unsplash saree photo IDs (404-safe as of 2025) */
export const SAREE_PHOTOS = [
  "photo-1732381917488-39f31539cd4f", // blue & gold wedding saree
  "photo-1734527224906-92eaabc0f665", // yellow saree portrait
  "photo-1735331467260-0153c5fbd31d", // red & green saree
  "photo-1706685481823-b8f1a1c11fca", // traditional fashion saree
  "photo-1718104561384-c51083b9ace8", // heritage saree on stairs
] as const;

export const PLACEHOLDER_IMAGE = "/logo.jpeg";

export function unsplash(photoId: string, width = 800): string {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&h=${Math.round(width * 1.25)}&q=85`;
}

function hashId(id: string): number {
  return id.split("").reduce((a, c) => ((a << 5) - a + c.charCodeAt(0)) | 0, 0) >>> 0;
}

export function getProductImage(productId: string, width = 800): string {
  const idx = hashId(productId) % SAREE_PHOTOS.length;
  return unsplash(SAREE_PHOTOS[idx], width);
}

export function getProductImages(productId: string, count = 6): string[] {
  const idx = hashId(productId) % SAREE_PHOTOS.length;
  return Array.from({ length: count }, (_, i) =>
    unsplash(SAREE_PHOTOS[(idx + i) % SAREE_PHOTOS.length], 800)
  );
}

export const SITE_IMAGES = {
  hero: {
    mobile: unsplash(SAREE_PHOTOS[0], 1200),
    main: unsplash(SAREE_PHOTOS[0], 1200),
    secondary: unsplash(SAREE_PHOTOS[1], 800),
    accent: unsplash(SAREE_PHOTOS[2], 800),
  },
  brand: {
    weave: unsplash(SAREE_PHOTOS[3], 600),
    detail: unsplash(SAREE_PHOTOS[0], 600),
  },
  about: unsplash(SAREE_PHOTOS[4], 1200),
  contact: {
    hero: unsplash(SAREE_PHOTOS[0], 1200),
    gallery1: unsplash(SAREE_PHOTOS[1], 600),
    gallery2: unsplash(SAREE_PHOTOS[2], 600),
  },
  newsletter: unsplash(SAREE_PHOTOS[3], 1200),
  promo: unsplash(SAREE_PHOTOS[2], 1200),
  instagram: SAREE_PHOTOS.map((id, i) => ({
    src: unsplash(id, 400),
    alt: [
      "Banarasi wedding saree",
      "Yellow silk saree",
      "Festive red saree",
      "Designer saree look",
      "Heritage handloom saree",
    ][i],
  })),
  categories: {
    "cat-sarees": unsplash(SAREE_PHOTOS[0]),
    "cat-lehengas": unsplash(SAREE_PHOTOS[2]),
    "cat-suits": unsplash(SAREE_PHOTOS[1]),
    "cat-kurtis": unsplash(SAREE_PHOTOS[4]),
    "cat-dupattas": unsplash(SAREE_PHOTOS[3]),
    "cat-festive": unsplash(SAREE_PHOTOS[2]),
    "cat-party": unsplash(SAREE_PHOTOS[0]),
    "cat-new-arrivals": unsplash(SAREE_PHOTOS[3]),
    "cat-best-sellers": unsplash(SAREE_PHOTOS[0]),
  } as Record<string, string>,
};
