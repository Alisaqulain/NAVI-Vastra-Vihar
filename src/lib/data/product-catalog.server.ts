import "server-only";

import { Product } from "@/lib/models";
import { products as mockProducts } from "@/lib/data/mock/products";
import { findAllDbProducts } from "@/lib/db/products";
import { readPersistedProducts } from "@/lib/data/product-persistence";

/** Built-in catalog + MongoDB overrides / admin-created products (+ legacy JSON fallback). */
export async function getMergedProducts(): Promise<Product[]> {
  let overlays: Product[] = [];
  try {
    overlays = await findAllDbProducts();
  } catch {
    overlays = await readPersistedProducts().catch(() => []);
  }

  const byId = new Map<string, Product>();
  for (const p of mockProducts) byId.set(p.id, p);
  for (const p of overlays) byId.set(p.id, p);
  return Array.from(byId.values());
}

/** Full catalog for admin (includes inactive), newest updates first. */
export async function getAdminCatalogProducts(): Promise<Product[]> {
  const merged = await getMergedProducts();
  return merged.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}
