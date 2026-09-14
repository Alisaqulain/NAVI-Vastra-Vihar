"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { Category } from "@/lib/models";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { formatPrice, cn } from "@/lib/utils";
import { X } from "lucide-react";

const ALL_SIZES = ["Free Size"];

const FILTER_COLORS: { name: string; hex: string }[] = [
  { name: "Gold", hex: "#C9A962" },
  { name: "Maroon", hex: "#6B1B2A" },
  { name: "Emerald", hex: "#1F6B5C" },
  { name: "Navy", hex: "#1B2A4A" },
  { name: "Red", hex: "#8B1A1A" },
  { name: "Pink", hex: "#E8A8C4" },
  { name: "Purple", hex: "#4A1B6B" },
  { name: "White", hex: "#F7F3EB" },
];

interface ShopFilterPanelProps {
  categories: Category[];
  maxPrice: number;
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-navy/45 mb-3">{title}</p>
      {children}
    </div>
  );
}

export function ShopFilterPanel({ categories, maxPrice }: ShopFilterPanelProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category") ?? "";
  const currentSearch = searchParams.get("search") ?? "";
  const currentSizes = searchParams.get("sizes")?.split(",").filter(Boolean) ?? [];
  const currentColors = searchParams.get("colors")?.split(",").filter(Boolean) ?? [];
  const minPrice = Number(searchParams.get("minPrice") ?? 0);
  const maxPriceFilter = Number(searchParams.get("maxPrice") ?? maxPrice);

  const [priceRange, setPriceRange] = useState([minPrice, maxPriceFilter]);

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

  return (
    <div className="space-y-7">
      {currentSearch && (
        <div className="flex items-center justify-between bg-cream-dark/60 rounded-xl px-3 py-2.5 border border-beige/60">
          <span className="text-sm text-navy/80 truncate">Search: &ldquo;{currentSearch}&rdquo;</span>
          <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => updateParams({ search: null })}>
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}

      <FilterSection title="Categories">
        <nav className="space-y-0.5">
          <button
            onClick={() => updateParams({ category: null, subcategory: null })}
            className={cn(
              "w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all",
              !currentCategory
                ? "bg-emerald/10 text-emerald font-medium border-l-2 border-emerald"
                : "text-navy/70 hover:bg-cream-dark/50 hover:text-navy"
            )}
          >
            All Sarees
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => updateParams({ category: cat.slug === currentCategory ? null : cat.slug, subcategory: null })}
              className={cn(
                "w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all flex items-center justify-between gap-2",
                currentCategory === cat.slug
                  ? "bg-emerald/10 text-emerald font-medium border-l-2 border-emerald"
                  : "text-navy/70 hover:bg-cream-dark/50 hover:text-navy"
              )}
            >
              <span>{cat.name}</span>
              <span className="text-[11px] text-navy/35 tabular-nums">{cat.productCount}</span>
            </button>
          ))}
        </nav>
      </FilterSection>

      <FilterSection title="Size">
        <div className="flex flex-wrap gap-2">
          {ALL_SIZES.map((size) => (
            <button
              key={size}
              onClick={() => toggleArrayParam("sizes", size, currentSizes)}
              className={cn(
                "px-4 py-2 text-xs rounded-full border transition-all",
                currentSizes.includes(size)
                  ? "bg-navy text-cream border-navy shadow-sm"
                  : "border-beige bg-cream-light text-navy/80 hover:border-navy/30"
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Color">
        <div className="grid grid-cols-4 gap-2">
          {FILTER_COLORS.map(({ name, hex }) => {
            const active = currentColors.includes(name);
            return (
              <button
                key={name}
                onClick={() => toggleArrayParam("colors", name, currentColors)}
                title={name}
                className={cn(
                  "flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all",
                  active ? "bg-emerald/10 ring-2 ring-emerald/40 ring-offset-1 ring-offset-cream-light" : "hover:bg-cream-dark/50"
                )}
              >
                <span
                  className={cn(
                    "h-7 w-7 rounded-full border shadow-sm",
                    name === "White" ? "border-beige" : "border-transparent"
                  )}
                  style={{ backgroundColor: hex }}
                />
                <span className="text-[10px] text-navy/55 leading-none truncate w-full text-center">{name}</span>
              </button>
            );
          })}
        </div>
      </FilterSection>

      <FilterSection title="Price Range">
        <p className="text-sm text-navy/70 mb-4 tabular-nums">
          {formatPrice(priceRange[0])} — {formatPrice(priceRange[1])}
        </p>
        <Slider
          min={0}
          max={maxPrice}
          step={500}
          value={priceRange}
          onValueChange={setPriceRange}
          onValueCommit={(val) => updateParams({ minPrice: String(val[0]), maxPrice: String(val[1]) })}
          className="mt-1"
        />
      </FilterSection>

      <Button
        variant="outline"
        className="w-full rounded-full border-beige hover:border-navy/20 hover:bg-cream-dark/50"
        onClick={() => router.push("/shop")}
      >
        Clear All Filters
      </Button>
    </div>
  );
}
