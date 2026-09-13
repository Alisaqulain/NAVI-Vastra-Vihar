import { Suspense } from "react";
import { productRepository, categoryRepository } from "@/lib/repositories";
import { ProductFilters } from "@/lib/models";
import { Breadcrumbs } from "@/components/storefront/Breadcrumbs";
import { ShopFilters } from "@/components/storefront/ShopFilters";
import { ProductGrid } from "@/components/storefront/ProductGrid";
import { ShopPagination } from "@/components/storefront/ShopPagination";
import { Skeleton } from "@/components/ui/skeleton";

interface ShopPageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

async function ShopContent({ searchParams }: { searchParams: Record<string, string | undefined> }) {
  const categories = await categoryRepository.findAll();
  const maxPrice = 50000;

  const categorySlug = searchParams.category;
  const category = categorySlug ? categories.find((c) => c.slug === categorySlug) : undefined;
  const subSlug = searchParams.subcategory;
  const subcategory = category?.subcategories?.find((s) => s.slug === subSlug);

  const filters: ProductFilters = {
    search: searchParams.search,
    categoryId: category?.id,
    subcategoryId: subcategory?.id,
    sizes: searchParams.sizes?.split(",").filter(Boolean),
    colors: searchParams.colors?.split(",").filter(Boolean),
    minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
    sortBy: (searchParams.sort as ProductFilters["sortBy"]) ?? "featured",
    page: searchParams.page ? Number(searchParams.page) : 1,
    limit: 12,
  };

  const result = await productRepository.findAll(filters);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <ShopFilters categories={categories} maxPrice={maxPrice} />
      <div className="flex-1">
        <p className="text-sm text-navy/60 mb-4">
          Showing {result.data.length} of {result.total} products
        </p>
        <ProductGrid products={result.data} />
        <ShopPagination page={result.page} totalPages={result.totalPages} />
      </div>
    </div>
  );
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const categories = await categoryRepository.findAll();
  const category = params.category ? categories.find((c) => c.slug === params.category) : undefined;

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Shop", href: "/shop" },
          ...(category ? [{ label: category.name }] : []),
        ]}
        className="mb-6"
      />
      {!category && (
        <div className="mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl text-navy mb-2">Shop All Sarees</h1>
          <p className="text-navy/60">Explore our complete collection of handwoven and designer sarees</p>
        </div>
      )}
      <Suspense
        fallback={
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[3/4] rounded-lg" />
            ))}
          </div>
        }
      >
        <ShopContent searchParams={params} />
      </Suspense>
    </div>
  );
}
