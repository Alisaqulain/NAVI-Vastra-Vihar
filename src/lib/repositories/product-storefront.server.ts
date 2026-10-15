import "server-only";

import { ProductFilters } from "@/lib/models";
import { getMergedProducts } from "@/lib/data/product-catalog.server";
import { filterProducts } from "@/lib/repositories/product-query";

export const storefrontProductRepository = {
  async findAll(filters?: ProductFilters) {
    const catalog = await getMergedProducts();
    const page = filters?.page ?? 1;
    const limit = filters?.limit ?? 12;
    const filtered = filterProducts(catalog, filters);
    const start = (page - 1) * limit;
    return {
      data: filtered.slice(start, start + limit),
      total: filtered.length,
      page,
      totalPages: Math.ceil(filtered.length / limit),
    };
  },
  async findBySlug(slug: string) {
    const catalog = await getMergedProducts();
    return catalog.find((p) => p.slug === slug) ?? null;
  },
  async findById(id: string) {
    const catalog = await getMergedProducts();
    return catalog.find((p) => p.id === id) ?? null;
  },
};
