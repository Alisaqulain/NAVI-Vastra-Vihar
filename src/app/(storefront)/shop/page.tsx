import { Suspense } from "react";
import { productRepository, categoryRepository } from "@/lib/repositories";
import { ProductFilters } from "@/lib/models";
import { Breadcrumbs } from "@/components/storefront/Breadcrumbs";
import { ShopFilters } from "@/components/storefront/ShopFilters";
import { ShopToolbar } from "@/components/storefront/ShopToolbar";
import { ShopCategoryHero } from "@/components/storefront/ShopCategoryHero";
import { ProductGrid } from "@/components/storefront/ProductGrid";
import { ShopPagination } from "@/components/storefront/ShopPagination";
import { Skeleton } from "@/components/ui/skeleton";

interface ShopPageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

async function ShopContent({
  searchParams,
  categories,
  category,
  maxPrice,
}: {
  searchParams: Record<string, string | undefined>;
  categories: Awaited<ReturnType<typeof categoryRepository.findAll>>;
  category?: Awaited<ReturnType<typeof categoryRepository.findAll>>[number];
  maxPrice: number;
}) {
  const subSlug = searchParams.subcategory;
  const subcategory = category?.subcategories?.find((s) => s.slug === subSlug);

  const filters: ProductFilters = {
    search: searchParams.search,
    categoryId: category?.id,
    subcategoryId: subcategory?.id,
    sizes: searchParams.sizes?.split(",").filter(Boolean),
    colors: searchParams.colors?.split(",").filter(Boolean),
    fabrics: searchParams.fabrics?.split(",").filter(Boolean),
    availability: searchParams.availability as ProductFilters["availability"],
    minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
    sortBy: (searchParams.sort as ProductFilters["sortBy"]) ?? "featured",
    page: searchParams.page ? Number(searchParams.page) : 1,
    limit: 12,
  };

  const result = await productRepository.findAll(filters);

  return (
    <div className="flex flex-col lg:flex-row lg:items-start gap-8 xl:gap-12">
      <ShopFilters categories={categories} maxPrice={maxPrice} />
      <div className="flex-1 min-w-0">
        <ShopToolbar
          categories={categories}
          maxPrice={maxPrice}
          category={category}
          showing={result.data.length}
          total={result.total}
        />
        <ProductGrid products={result.data} />
        <ShopPagination page={result.page} totalPages={result.totalPages} />
      </div>
    </div>
  );
}

function ShopSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <Skeleton className="hidden lg:block w-72 h-[520px] rounded-2xl shrink-0" />
      <div className="flex-1 space-y-6">
        <Skeleton className="h-14 w-full rounded-xl" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-7">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[3/4] rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const categories = await categoryRepository.findAll();
  const category = params.category ? categories.find((c) => c.slug === params.category) : undefined;
  const maxPrice = 50000;

  return (
    <>
      {category && <ShopCategoryHero category={category} />}

      <div className="container-premium py-5 sm:py-8 lg:py-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            ...(category ? [{ label: category.name }] : []),
          ]}
          className="mb-6 lg:mb-8"
        />

        {!category && (
          <header className="mb-8 lg:mb-10 text-center lg:text-left">
            <p className="text-emerald text-xs sm:text-sm tracking-[0.25em] uppercase mb-2">Our Collection</p>
            <div className="gold-line mx-auto lg:mx-0 mb-4" />
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-navy mb-3">Shop All Sarees</h1>
            <p className="text-navy/60 text-sm sm:text-base max-w-2xl mx-auto lg:mx-0">
              Explore handwoven Banarasi, Kanjeevaram, silk and cotton sarees curated for every occasion.
            </p>
          </header>
        )}

        <Suspense fallback={<ShopSkeleton />}>
          <ShopContent searchParams={params} categories={categories} category={category} maxPrice={maxPrice} />
        </Suspense>
      </div>
    </>
  );
}
