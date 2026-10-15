"use client";

import { formatPrice, getEffectivePrice } from "@/lib/utils";
import { Product } from "@/lib/models";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

type ProductMobileBuyBarProps = {
  product: Product;
  inStock: boolean;
  adding: boolean;
  onAddToCart: () => void;
};

export function ProductMobileBuyBar({ product, inStock, adding, onAddToCart }: ProductMobileBuyBarProps) {
  const price = getEffectivePrice(product);

  return (
    <div className="fixed bottom-[calc(3.75rem+env(safe-area-inset-bottom))] left-0 right-0 z-30 lg:hidden border-t border-neutral-200 bg-white/95 backdrop-blur-md px-4 py-2.5 shadow-[0_-4px_24px_rgba(27,42,74,0.08)]">
      <div className="flex items-center gap-3 max-w-lg mx-auto">
        <div className="min-w-0 flex-1">
          <p className="text-lg font-bold text-navy tabular-nums">{formatPrice(price)}</p>
          <p className="text-[10px] text-navy/45 truncate">{product.name}</p>
        </div>
        <Button
          variant="emerald"
          className="h-11 px-5 rounded-full font-semibold shrink-0"
          disabled={!inStock || adding}
          onClick={onAddToCart}
        >
          <ShoppingBag className="h-4 w-4 mr-1.5" />
          {adding ? "Adding…" : "Add to bag"}
        </Button>
      </div>
    </div>
  );
}
