"use server";

import { revalidatePath } from "next/cache";
import { Product } from "@/lib/models";
import { authProvider } from "@/lib/auth";
import { generateId, slugify } from "@/lib/utils";
import { getAdminCatalogProducts, getMergedProducts } from "@/lib/data/product-catalog.server";
import { products as mockProducts } from "@/lib/data/mock/products";
import {
  deleteDbProduct,
  hasDbProduct,
  upsertDbProduct,
} from "@/lib/db/products";
import { isMongoConfigured } from "@/lib/mongodb";

async function assertAdmin(token: string) {
  const session = await authProvider.validateToken(token);
  if (!session || session.role !== "admin") {
    throw new Error("Unauthorized");
  }
  return session;
}

function assertMongo() {
  if (!isMongoConfigured()) {
    throw new Error("MongoDB is not configured. Set MONGODB_URI in .env.local");
  }
}

export type ProductUpsertInput = Omit<Product, "id" | "createdAt" | "updatedAt"> & {
  id?: string;
};

export async function createProductAction(token: string, data: ProductUpsertInput) {
  await assertAdmin(token);
  assertMongo();
  const now = new Date().toISOString();
  const product: Product = {
    ...data,
    id: generateId("prod"),
    slug: data.slug || slugify(data.name),
    salePrice: data.salePrice && data.salePrice < data.price ? data.salePrice : undefined,
    images: data.images.filter(Boolean),
    subcategoryId: data.subcategoryId || undefined,
    createdAt: now,
    updatedAt: now,
  };
  await upsertDbProduct(product);
  revalidatePath("/shop");
  revalidatePath("/");
  revalidatePath("/admin/products");
  return product;
}

export async function updateProductAction(token: string, id: string, data: Partial<ProductUpsertInput>) {
  await assertAdmin(token);
  assertMongo();
  const merged = await getMergedProducts();
  const existing = merged.find((p) => p.id === id);
  if (!existing) throw new Error("Product not found");

  const now = new Date().toISOString();
  const updated: Product = {
    ...existing,
    ...data,
    id: existing.id,
    slug: data.slug ?? existing.slug,
    salePrice:
      data.salePrice !== undefined
        ? data.salePrice && data.salePrice < (data.price ?? existing.price)
          ? data.salePrice
          : undefined
        : existing.salePrice,
    images: data.images ? data.images.filter(Boolean) : existing.images,
    updatedAt: now,
  };

  await upsertDbProduct(updated);
  revalidatePath("/shop");
  revalidatePath(`/product/${updated.slug}`);
  revalidatePath("/admin/products");
  return updated;
}

export async function deleteProductAction(token: string, id: string) {
  await assertAdmin(token);
  assertMongo();
  const merged = await getMergedProducts();
  const existing = merged.find((p) => p.id === id);
  if (!existing) throw new Error("Product not found");

  const isBuiltIn = mockProducts.some((p) => p.id === id);

  if (isBuiltIn) {
    const now = new Date().toISOString();
    await upsertDbProduct({ ...existing, status: "inactive", updatedAt: now });
  } else if (await hasDbProduct(id)) {
    await deleteDbProduct(id);
  } else {
    throw new Error("Product not found in database");
  }

  revalidatePath("/shop");
  revalidatePath("/admin/products");
  return true;
}

export async function listAdminProductsAction(token: string) {
  await assertAdmin(token);
  return getAdminCatalogProducts();
}

export async function getProductByIdAction(id: string) {
  const merged = await getMergedProducts();
  return merged.find((p) => p.id === id) ?? null;
}

export async function searchProductsAction(query: string, limit = 8) {
  const merged = await getMergedProducts();
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return merged
    .filter(
      (p) =>
        p.status === "active" &&
        (p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q))
    )
    .slice(0, limit);
}
