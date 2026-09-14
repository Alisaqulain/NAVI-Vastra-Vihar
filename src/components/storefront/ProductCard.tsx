"use client";

import { ProductImage } from "@/components/ui/product-image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { Product } from "@/lib/models";
import { formatPrice, getEffectivePrice, getDiscountPercent, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/context/wishlist-context";
import { useCart } from "@/context/cart-context";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { toggleItem, isInWishlist } = useWishlist();
  const { addItem } = useCart();
  const price = getEffectivePrice(product);
  const hasDiscount = product.salePrice && product.salePrice < product.price;
  const defaultSize = product.sizes[0];
  const defaultColor = product.colors[0]?.name ?? "Default";

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ productId: product.id, quantity: 1, size: defaultSize, color: defaultColor });
    toast.success("Added to cart", { description: product.name });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product.id);
    toast.success(isInWishlist(product.id) ? "Removed from wishlist" : "Added to wishlist");
  };

  return (
    <Link href={`/product/${product.slug}`} className={cn("group block", className)}>
      <div className="premium-card relative aspect-[3/4] overflow-hidden mb-3 sm:mb-4 p-0 group-hover:-translate-y-0.5">
        <ProductImage
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex flex-col gap-1.5">
          {product.newArrival && <Badge variant="emerald" className="text-[10px] sm:text-xs shadow-sm">New</Badge>}
          {hasDiscount && (
            <Badge variant="sale" className="text-[10px] sm:text-xs shadow-sm">{getDiscountPercent(product.price, product.salePrice!)}% OFF</Badge>
          )}
          {product.bestseller && <Badge variant="gold" className="text-[10px] sm:text-xs shadow-sm">Bestseller</Badge>}
        </div>
        {/* Always visible on mobile, hover on desktop */}
        <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 flex flex-col gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-cream-light/95 backdrop-blur-sm border-beige shadow-sm"
            onClick={handleWishlist}
            aria-label="Add to wishlist"
          >
            <Heart className={cn("h-3.5 w-3.5 sm:h-4 sm:w-4", isInWishlist(product.id) && "fill-emerald text-emerald")} />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-cream-light/95 backdrop-blur-sm border-beige shadow-sm"
            onClick={handleQuickAdd}
            aria-label="Add to cart"
          >
            <ShoppingBag className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
        </div>
      </div>
      <div className="space-y-2 px-0.5 sm:px-1">
        <h3 className="font-medium text-navy line-clamp-2 group-hover:text-emerald transition-colors text-sm sm:text-[15px] leading-snug min-h-[2.5rem]">
          {product.name}
        </h3>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-semibold text-navy text-sm sm:text-base tabular-nums">{formatPrice(price)}</span>
            {hasDiscount && (
              <span className="text-xs text-navy/35 line-through tabular-nums">{formatPrice(product.price)}</span>
            )}
          </div>
          {product.colors[0] && (
            <span
              className="h-3.5 w-3.5 rounded-full border border-beige shrink-0 shadow-sm"
              style={{ backgroundColor: product.colors[0].hex }}
              title={product.colors[0].name}
            />
          )}
        </div>
      </div>
    </Link>
  );
}
