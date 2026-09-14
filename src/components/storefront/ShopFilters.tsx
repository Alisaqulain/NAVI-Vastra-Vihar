"use client";

import { Category } from "@/lib/models";
import { ShopFilterPanel } from "./ShopFilterPanel";

interface ShopFiltersProps {
  categories: Category[];
  maxPrice: number;
}

/** Desktop sticky sidebar — mobile filters live in ShopToolbar sheet */
export function ShopFilters({ categories, maxPrice }: ShopFiltersProps) {
  return (
    <aside className="hidden lg:block w-72 xl:w-80 shrink-0">
      <div className="sticky top-24 premium-card p-6 xl:p-7 bg-cream-light/95 backdrop-blur-sm">
        <div className="mb-6">
          <p className="text-[11px] tracking-[0.2em] uppercase text-emerald mb-1">Browse</p>
          <div className="gold-line mb-2" />
          <h2 className="font-serif text-xl text-navy">Refine</h2>
        </div>
        <ShopFilterPanel categories={categories} maxPrice={maxPrice} />
      </div>
    </aside>
  );
}
