import { Product } from "@/lib/models";
import { buildSareeProducts } from "@/lib/data/saree-price-products";

export const products: Product[] = buildSareeProducts();

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
