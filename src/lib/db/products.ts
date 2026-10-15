import "server-only";

import { Product } from "@/lib/models";
import { getMongoDb, isMongoConfigured } from "@/lib/mongodb";

const COLLECTION = "products";

function fromDocument(doc: Record<string, unknown>): Product {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, ...rest } = doc;
  return rest as unknown as Product;
}

export async function findAllDbProducts(): Promise<Product[]> {
  if (!isMongoConfigured()) return [];
  const db = await getMongoDb();
  const docs = await db.collection(COLLECTION).find({}).sort({ updatedAt: -1 }).toArray();
  return docs.map((d) => fromDocument(d as Record<string, unknown>));
}

export async function findDbProductById(id: string): Promise<Product | null> {
  if (!isMongoConfigured()) return null;
  const db = await getMongoDb();
  const doc = await db.collection(COLLECTION).findOne({ id });
  return doc ? fromDocument(doc as Record<string, unknown>) : null;
}

export async function upsertDbProduct(product: Product): Promise<Product> {
  const db = await getMongoDb();
  await db.collection(COLLECTION).updateOne(
    { id: product.id },
    { $set: { ...product, updatedAt: product.updatedAt } },
    { upsert: true }
  );
  return product;
}

export async function deleteDbProduct(id: string): Promise<boolean> {
  const db = await getMongoDb();
  const result = await db.collection(COLLECTION).deleteOne({ id });
  return result.deletedCount > 0;
}

export async function hasDbProduct(id: string): Promise<boolean> {
  if (!isMongoConfigured()) return false;
  const db = await getMongoDb();
  const count = await db.collection(COLLECTION).countDocuments({ id }, { limit: 1 });
  return count > 0;
}
