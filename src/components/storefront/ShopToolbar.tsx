"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { Category } from "@/lib/models";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { formatPrice } from "@/lib/utils";
import { ShopFilterPanel } from "./ShopFilterPanel";

interface ShopToolbarProps {
  categories: Category[];
  maxPrice: number;
  category?: Category;
  showing: number;
  total: number;
}

export function ShopToolbar({ categories, maxPrice, category, showing, total }: ShopToolbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") ?? "featured";
  const currentSearch = searchParams.get("search") ?? "";
  const currentColors = searchParams.get("colors")?.split(",").filter(Boolean) ?? [];
  const minPrice = searchParams.get("minPrice");
  const maxPriceFilter = searchParams.get("maxPrice");

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "") params.delete(key);
        else params.set(key, value);
      });
      params.delete("page");
      router.push(`/shop?${params.toString()}`);
    },
    [router, searchParams]
  );

  const activeFilters: { label: string; clear: () => void }[] = [];
  if (currentSearch) activeFilters.push({ label: `"${currentSearch}"`, clear: () => updateParams({ search: null }) });
  currentColors.forEach((c) =>
    activeFilters.push({ label: c, clear: () => updateParams({ colors: currentColors.filter((x) => x !== c).join(",") || null }) })
  );
  if (minPrice || maxPriceFilter) {
    activeFilters.push({
      label: `${formatPrice(Number(minPrice ?? 0))} – ${formatPrice(Number(maxPriceFilter ?? maxPrice))}`,
      clear: () => updateParams({ minPrice: null, maxPrice: null }),
    });
  }

  return (
    <div className="mb-6 sm:mb-8 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-beige/80">
        <div className="min-w-0">
          {!category && (
            <h2 className="font-serif text-xl sm:text-2xl text-navy mb-1 lg:hidden">All Sarees</h2>
          )}
          <p className="text-sm text-navy/55">
            Showing <span className="font-medium text-navy">{showing}</span> of{" "}
            <span className="font-medium text-navy">{total}</span> sarees
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="lg:hidden rounded-full border-beige bg-cream-light hover:border-emerald hover:text-emerald">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="overflow-y-auto w-[min(100vw,320px)] bg-cream-light">
              <SheetHeader>
                <SheetTitle className="font-serif text-navy">Refine</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <ShopFilterPanel categories={categories} maxPrice={maxPrice} />
              </div>
            </SheetContent>
          </Sheet>

          <Select value={currentSort} onValueChange={(v) => updateParams({ sort: v })}>
            <SelectTrigger className="w-full sm:w-[200px] rounded-full border-beige bg-cream-light text-sm h-10 shadow-sm">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
              <SelectItem value="bestselling">Best Selling</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-navy/45 uppercase tracking-wider mr-1">Active</span>
          {activeFilters.map((f) => (
            <button
              key={f.label}
              onClick={f.clear}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-cream-dark/80 text-navy border border-beige hover:border-emerald/40 transition-colors"
            >
              {f.label}
              <X className="h-3 w-3 opacity-60" />
            </button>
          ))}
          <button
            onClick={() => router.push(category ? `/shop?category=${category.slug}` : "/shop")}
            className="text-xs text-emerald hover:underline ml-1"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
