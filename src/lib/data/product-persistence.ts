import { promises as fs } from "fs";
import path from "path";
import { Product } from "@/lib/models";

const DATA_FILE = path.join(process.cwd(), "src/lib/data/persisted-products.json");

export async function readPersistedProducts(): Promise<Product[]> {
  if (typeof window !== "undefined") return [];
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw) as Product[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function writePersistedProducts(products: Product[]): Promise<void> {
  if (typeof window !== "undefined") return;
  await fs.writeFile(DATA_FILE, `${JSON.stringify(products, null, 2)}\n`, "utf-8");
}

export async function upsertPersistedProduct(product: Product): Promise<Product> {
  const list = await readPersistedProducts();
  const idx = list.findIndex((p) => p.id === product.id);
  if (idx >= 0) list[idx] = product;
  else list.push(product);
  await writePersistedProducts(list);
  return product;
}

export async function removePersistedProduct(id: string): Promise<boolean> {
  const list = await readPersistedProducts();
  const next = list.filter((p) => p.id !== id);
  if (next.length === list.length) return false;
  await writePersistedProducts(next);
  return true;
}

export async function isPersistedProduct(id: string): Promise<boolean> {
  const list = await readPersistedProducts();
  return list.some((p) => p.id === id);
}
