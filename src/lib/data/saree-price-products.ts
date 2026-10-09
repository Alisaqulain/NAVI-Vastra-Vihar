import { Product } from "@/lib/models";
import catalog from "./saree-catalog.json";

export type SareeCatalogEntry = {
  price: number;
  priceMax?: number;
  priceLabel: string;
  path: string;
  file: string;
};

/** Parse folder name into list price (and max for ranges like 14000-18000). */
export function parsePriceFolder(folder: string): { price: number; priceMax?: number; priceLabel: string } {
  if (folder.includes("-")) {
    const [minStr, maxStr] = folder.split("-");
    const min = Number(minStr);
    const max = Number(maxStr);
    return { price: min, priceMax: max, priceLabel: folder };
  }
  const n = Number(folder);
  return { price: n, priceLabel: folder };
}

function formatInr(n: number): string {
  return n.toLocaleString("en-IN");
}

function priceTierName(entry: SareeCatalogEntry): string {
  if (entry.priceMax) {
    return `₹${formatInr(entry.price)} – ₹${formatInr(entry.priceMax)}`;
  }
  return `₹${formatInr(entry.price)}`;
}

function slugify(entry: SareeCatalogEntry): string {
  const fileBase = entry.file.replace(/\.[^.]+$/i, "").toLowerCase();
  const label = entry.priceLabel.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
  return `saree-${label}-${fileBase}`;
}

function hashNum(s: string): number {
  return s.split("").reduce((a, c) => ((a << 5) - a + c.charCodeAt(0)) | 0, 0) >>> 0;
}

/** Normalize JSON rows (fix range folder pricing if needed). */
function normalizeCatalog(raw: SareeCatalogEntry[]): SareeCatalogEntry[] {
  return raw.map((row) => {
    const parsed = parsePriceFolder(row.priceLabel);
    return {
      ...row,
      price: parsed.price,
      priceMax: parsed.priceMax,
      priceLabel: parsed.priceLabel,
    };
  });
}

const ENTRIES = normalizeCatalog(catalog as SareeCatalogEntry[]);

export const SAREE_PRICE_TIERS = [...new Set(ENTRIES.map((e) => e.priceLabel))].sort(
  (a, b) => parsePriceFolder(a).price - parsePriceFolder(b).price
);

export function buildSareeProducts(): Product[] {
  return ENTRIES.map((entry) => {
    const tier = priceTierName(entry);
    const code = entry.file.replace(/\.[^.]+$/i, "").toUpperCase();
    const id = `saree-${entry.priceLabel}-${code}`.replace(/[^a-zA-Z0-9-_]/g, "-");
    const h = hashNum(id);

    return {
      id,
      sku: `NV-SR-${entry.priceLabel}-${code}`.replace(/[^A-Z0-9-]/gi, ""),
      categoryId: "cat-sarees",
      name: `NAVI Silk Saree ${code} — ${tier}`,
      slug: slugify(entry),
      description: `Premium saree from NAVI Vastra Vihar, Bengaluru. Listed at ${tier}. Crafted for weddings, festivals and celebrations. Visit our Sahakarnagar store or order online with pan-India delivery.`,
      shortDescription: `Silk saree · ${tier}`,
      /** Folder name = list price; ranges use minimum tier for filters/checkout base. */
      price: entry.price,
      images: [entry.path],
      sizes: ["Free Size"],
      colors: [{ name: "As shown", hex: "#1B2A4A" }],
      fabric: entry.price >= 10000 ? "Silk / Zari" : entry.price >= 5000 ? "Silk Blend" : "Cotton Silk",
      stockQuantity: 8 + (h % 12),
      lowStockThreshold: 3,
      rating: 4.2 + (h % 8) / 10,
      reviewCount: 3 + (h % 40),
      status: "active" as const,
      featured: entry.price >= 14590 || Boolean(entry.priceMax),
      bestseller: entry.priceLabel === "4995" || entry.priceLabel === "3750" || (h % 7 === 0),
      newArrival: entry.price <= 4995 && h % 5 === 0,
      specifications: {
        "List price": tier,
        Collection: entry.priceLabel.includes("-") ? "Premium range" : `₹${formatInr(entry.price)} tier`,
        Care: "Dry clean recommended",
      },
      createdAt: "2025-09-01T10:00:00Z",
      updatedAt: "2025-10-01T10:00:00Z",
    };
  });
}

export const sareeCatalogEntries = ENTRIES;
