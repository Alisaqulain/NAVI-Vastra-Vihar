"use client";

import { useState } from "react";
import { ProductImage } from "@/components/ui/product-image";
import Link from "next/link";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { Product } from "@/lib/models";
import { formatPrice, getEffectivePrice, getDiscountPercent, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/context/wishlist-context";
import { useCart } from "@/context/cart-context";
import { QuickViewDialog } from "./QuickViewDialog";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { toggleItem, isInWishlist } = useWishlist();
  const { addItem } = useCart();
  const [quickView, setQuickView] = useState(false);
  const [hovered, setHovered] = useState(false);

  const price = getEffectivePrice(product);
  const hasDiscount = product.salePrice && product.salePrice < product.price;
  const defaultSize = product.sizes[0];
  const defaultColor = product.colors[0]?.name ?? "Default";
  const secondaryImage = product.images[1] ?? product.images[0];
  const inStock = product.stockQuantity > 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!inStock) return;
    addItem({ productId: product.id, quantity: 1, size: defaultSize, color: defaultColor });
    toast.success("Added to bag", { description: product.name });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product.id);
    toast.success(isInWishlist(product.id) ? "Removed from wishlist" : "Added to wishlist");
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickView(true);
  };

  return (
    <>
      <Link
        href={`/product/${product.slug}`}
        className={cn("group block", className)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative aspect-[3/4] overflow-hidden mb-3 sm:mb-4 bg-ivory-dark">
          <ProductImage
            src={product.images[0]}
            alt={product.name}
            fill
            className={cn(
              "object-cover object-top transition-all duration-700",
              hovered && product.images.length > 1 ? "opacity-0 scale-105" : "opacity-100 group-hover:scale-[1.03]"
            )}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {product.images.length > 1 && (
            <ProductImage
              src={secondaryImage}
              alt={`${product.name} alternate view`}
              fill
              className={cn(
                "object-cover object-top transition-all duration-700",
                hovered ? "opacity-100 scale-[1.03]" : "opacity-0"
              )}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          )}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.newArrival && <Badge variant="emerald" className="text-[10px] uppercase tracking-wider">New</Badge>}
            {hasDiscount && (
              <Badge variant="sale" className="text-[10px]">{getDiscountPercent(product.price, product.salePrice!)}% OFF</Badge>
            )}
            {product.bestseller && <Badge variant="gold" className="text-[10px] uppercase tracking-wider">Bestseller</Badge>}
            {!inStock && <Badge variant="destructive" className="text-[10px]">Sold Out</Badge>}
          </div>
          <div className="absolute top-3 right-3 flex flex-col gap-2 z-10 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
            <Button size="icon" variant="outline" className="h-8 w-8 rounded-full bg-cream/95 border-beige/80 shadow-sm" onClick={handleWishlist} aria-label="Wishlist">
              <Heart className={cn("h-3.5 w-3.5", isInWishlist(product.id) && "fill-emerald text-emerald")} />
            </Button>
            <Button size="icon" variant="outline" className="h-8 w-8 rounded-full bg-cream/95 border-beige/80 shadow-sm" onClick={handleQuickView} aria-label="Quick view">
              <Eye className="h-3.5 w-3.5" />
            </Button>
            {inStock && (
              <Button size="icon" variant="outline" className="h-8 w-8 rounded-full bg-cream/95 border-beige/80 shadow-sm" onClick={handleQuickAdd} aria-label="Add to bag">
                <ShoppingBag className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        </div>
        <div className="space-y-1.5 px-0.5">
          <p className="text-[10px] uppercase tracking-wider text-charcoal/40">{product.fabric}</p>
          <h3 className="font-medium text-navy line-clamp-2 group-hover:text-emerald transition-colors text-sm leading-snug min-h-[2.5rem]">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-charcoal text-sm tabular-nums">{formatPrice(price)}</span>
            {hasDiscount && (
              <span className="text-xs text-charcoal/35 line-through tabular-nums">{formatPrice(product.price)}</span>
            )}
          </div>
        </div>
      </Link>
      <QuickViewDialog product={product} open={quickView} onOpenChange={setQuickView} />
    </>
  );
}
