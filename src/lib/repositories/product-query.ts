import { Product, ProductFilters } from "@/lib/models";

export function sortProducts(items: Product[], sortBy?: ProductFilters["sortBy"]): Product[] {
  const sorted = [...items];
  switch (sortBy) {
    case "newest":
      return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case "price_asc":
      return sorted.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
    case "price_desc":
      return sorted.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
    case "bestselling":
      return sorted.sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0));
    case "featured":
    default:
      return sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }
}

export function filterProducts(items: Product[], filters?: ProductFilters): Product[] {
  let result = items.filter((p) => p.status === "active");

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q)
    );
  }
  if (filters?.categoryId) {
    if (filters.categoryId === "cat-new-arrivals") {
      result = result.filter((p) => p.newArrival);
    } else if (filters.categoryId === "cat-best-sellers") {
      result = result.filter((p) => p.bestseller);
    } else if (filters.categoryId === "cat-festive") {
      result = result.filter(
        (p) => p.price >= 14000 || (p.specifications["List price"]?.includes("–") ?? false)
      );
    } else if (filters.categoryId === "cat-party") {
      result = result.filter((p) => {
        const effective = p.salePrice ?? p.price;
        return effective >= 5000 && effective < 14000;
      });
    } else if (
      ["cat-lehengas", "cat-suits", "cat-kurtis", "cat-dupattas"].includes(filters.categoryId)
    ) {
      result = [];
    } else {
      result = result.filter(
        (p) => p.categoryId === filters.categoryId || p.subcategoryId === filters.categoryId
      );
    }
  }
  if (filters?.subcategoryId) {
    result = result.filter((p) => p.subcategoryId === filters.subcategoryId);
  }
  if (filters?.sizes?.length) {
    result = result.filter((p) => filters.sizes!.some((s) => p.sizes.includes(s)));
  }
  if (filters?.colors?.length) {
    result = result.filter((p) => filters.colors!.some((c) => p.colors.some((pc) => pc.name === c)));
  }
  if (filters?.fabrics?.length) {
    result = result.filter((p) => filters.fabrics!.some((f) => p.fabric.toLowerCase().includes(f.toLowerCase())));
  }
  if (filters?.availability === "in_stock") {
    result = result.filter((p) => p.stockQuantity > 0);
  }
  if (filters?.availability === "out_of_stock") {
    result = result.filter((p) => p.stockQuantity === 0);
  }
  if (filters?.minPrice !== undefined) {
    result = result.filter((p) => (p.salePrice ?? p.price) >= filters.minPrice!);
  }
  if (filters?.maxPrice !== undefined) {
    result = result.filter((p) => (p.salePrice ?? p.price) <= filters.maxPrice!);
  }
  if (filters?.featured) result = result.filter((p) => p.featured);
  if (filters?.bestseller) result = result.filter((p) => p.bestseller);
  if (filters?.newArrival) result = result.filter((p) => p.newArrival);

  return sortProducts(result, filters?.sortBy);
}
