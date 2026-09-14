"use client";

import Link from "next/link";
import { Product } from "@/lib/models";
import { ProductImage } from "@/components/ui/product-image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice, getEffectivePrice, getDiscountPercent } from "@/lib/utils";
import { useCart } from "@/context/cart-context";
import { toast } from "sonner";

interface QuickViewDialogProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuickViewDialog({ product, open, onOpenChange }: QuickViewDialogProps) {
  const { addItem } = useCart();

  if (!product) return null;

  const price = getEffectivePrice(product);
  const hasDiscount = product.salePrice && product.salePrice < product.price;
  const defaultSize = product.sizes[0];
  const defaultColor = product.colors[0]?.name ?? "Default";

  const handleAdd = () => {
    addItem({ productId: product.id, quantity: 1, size: defaultSize, color: defaultColor });
    toast.success("Added to bag", { description: product.name });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg sm:max-w-2xl p-0 overflow-hidden gap-0">
        <div className="grid sm:grid-cols-2">
          <div className="relative aspect-[3/4] sm:aspect-auto sm:min-h-[420px] bg-ivory-dark">
            <ProductImage src={product.images[0]} alt={product.name} fill className="object-cover object-top" sizes="400px" />
          </div>
          <div className="p-6 sm:p-8 flex flex-col">
            <DialogHeader className="text-left space-y-2 mb-4">
              <div className="flex gap-2 flex-wrap">
                {product.newArrival && <Badge variant="emerald">New</Badge>}
                {hasDiscount && <Badge variant="sale">{getDiscountPercent(product.price, product.salePrice!)}% OFF</Badge>}
              </div>
              <DialogTitle className="font-serif text-xl sm:text-2xl text-charcoal leading-snug">{product.name}</DialogTitle>
              <p className="text-xs text-charcoal/50">{product.fabric}</p>
            </DialogHeader>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-xl font-semibold tabular-nums">{formatPrice(price)}</span>
              {hasDiscount && <span className="text-sm text-charcoal/40 line-through tabular-nums">{formatPrice(product.price)}</span>}
            </div>
            <p className="text-sm text-charcoal/60 line-clamp-3 mb-6 flex-1">{product.shortDescription}</p>
            <div className="space-y-2 mt-auto">
              <Button variant="emerald" className="w-full rounded-full" size="lg" onClick={handleAdd}>
                Add to Bag
              </Button>
              <Button asChild variant="outline" className="w-full rounded-full" onClick={() => onOpenChange(false)}>
                <Link href={`/product/${product.slug}`}>View Full Details</Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
