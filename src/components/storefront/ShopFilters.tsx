"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { Category } from "@/lib/models";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { formatPrice } from "@/lib/utils";
import { SlidersHorizontal, X } from "lucide-react";

const ALL_SIZES = ["Free Size"];
const ALL_COLORS = ["Gold", "Maroon", "Emerald", "Navy", "Red", "Pink", "White", "Ivory", "Purple", "Multicolor", "Indigo", "Natural Gold", "Champagne"];

interface ShopFiltersProps {
  categories: Category[];
  maxPrice: number;
}

export function ShopFilters({ categories, maxPrice }: ShopFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category") ?? "";
  const currentSub = searchParams.get("subcategory") ?? "";
  const currentSort = searchParams.get("sort") ?? "featured";
  const currentSearch = searchParams.get("search") ?? "";
  const currentSizes = searchParams.get("sizes")?.split(",").filter(Boolean) ?? [];
  const currentColors = searchParams.get("colors")?.split(",").filter(Boolean) ?? [];
  const minPrice = Number(searchParams.get("minPrice") ?? 0);
  const maxPriceFilter = Number(searchParams.get("maxPrice") ?? maxPrice);

  const [priceRange, setPriceRange] = useState([minPrice, maxPriceFilter]);

  const selectedCategory = categories.find((c) => c.slug === currentCategory);

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

  const toggleArrayParam = (key: string, value: string, current: string[]) => {
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
    updateParams({ [key]: next.length ? next.join(",") : null });
  };

  const clearFilters = () => router.push("/shop");

  const filterContent = (
    <div className="space-y-6">
      {currentSearch && (
        <div className="flex items-center justify-between bg-cream-dark rounded-md px-3 py-2">
          <span className="text-sm">Search: &ldquo;{currentSearch}&rdquo;</span>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => updateParams({ search: null })}>
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}

      <div>
        <Label className="mb-3 block font-serif text-lg">Category</Label>
        <div className="space-y-2">
          {categories.map((cat) => (
            <div key={cat.id}>
              <button
                onClick={() => updateParams({ category: cat.slug === currentCategory ? null : cat.slug, subcategory: null })}
                className={`text-sm w-full text-left py-1 transition-colors ${currentCategory === cat.slug ? "text-emerald font-medium" : "text-navy/70 hover:text-emerald"}`}
              >
                {cat.name} ({cat.productCount})
              </button>
              {currentCategory === cat.slug && cat.subcategories && (
                <div className="ml-4 mt-1 space-y-1">
                  {cat.subcategories.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => updateParams({ subcategory: sub.slug === currentSub ? null : sub.slug })}
                      className={`text-xs w-full text-left py-0.5 ${currentSub === sub.slug ? "text-emerald" : "text-navy/50 hover:text-emerald"}`}
                    >
                      {sub.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <Label className="mb-3 block">Size</Label>
        <div className="flex flex-wrap gap-2">
          {ALL_SIZES.map((size) => (
            <button
              key={size}
              onClick={() => toggleArrayParam("sizes", size, currentSizes)}
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${currentSizes.includes(size) ? "bg-emerald text-cream border-emerald" : "border-beige hover:border-emerald"}`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <Label className="mb-3 block">Color</Label>
        <div className="space-y-2">
          {ALL_COLORS.map((color) => (
            <div key={color} className="flex items-center gap-2">
              <Checkbox
                id={`color-${color}`}
                checked={currentColors.includes(color)}
                onCheckedChange={() => toggleArrayParam("colors", color, currentColors)}
              />
              <Label htmlFor={`color-${color}`} className="text-sm font-normal cursor-pointer">
                {color}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <Label className="mb-3 block">
          Price: {formatPrice(priceRange[0])} — {formatPrice(priceRange[1])}
        </Label>
        <Slider
          min={0}
          max={maxPrice}
          step={500}
          value={priceRange}
          onValueChange={setPriceRange}
          onValueCommit={(val) => updateParams({ minPrice: String(val[0]), maxPrice: String(val[1]) })}
          className="mt-2"
        />
      </div>

      <Button variant="outline" className="w-full" onClick={clearFilters}>
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <>
      <div className="hidden lg:block w-64 shrink-0">{filterContent}</div>

      <div className="lg:hidden flex items-center gap-3 mb-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm">
              <SlidersHorizontal className="h-4 w-4 mr-2" /> Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">{filterContent}</div>
          </SheetContent>
        </Sheet>

        <Select value={currentSort} onValueChange={(v) => updateParams({ sort: v })}>
          <SelectTrigger className="w-[180px]">
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

      <div className="hidden lg:flex items-center justify-between mb-6">
        <div>
          {selectedCategory && (
            <h1 className="font-serif text-2xl text-navy">{selectedCategory.name}</h1>
          )}
        </div>
        <Select value={currentSort} onValueChange={(v) => updateParams({ sort: v })}>
          <SelectTrigger className="w-[200px]">
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
    </>
  );
}
