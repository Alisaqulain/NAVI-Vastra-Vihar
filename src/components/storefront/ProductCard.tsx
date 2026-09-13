"use client";

import Image from "next/image";
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
    addItem({ productId: product.id, quantity: 1, size: defaultSize, color: defaultColor });
    toast.success("Added to cart", { description: product.name });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleItem(product.id);
    toast.success(isInWishlist(product.id) ? "Removed from wishlist" : "Added to wishlist");
  };

  return (
    <Link href={`/product/${product.slug}`} className={cn("group block", className)}>
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-beige-light mb-3">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.newArrival && <Badge variant="emerald">New</Badge>}
          {hasDiscount && (
            <Badge variant="sale">{getDiscountPercent(product.price, product.salePrice!)}% OFF</Badge>
          )}
          {product.bestseller && <Badge variant="gold">Bestseller</Badge>}
        </div>
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="icon"
            variant="outline"
            className="h-9 w-9 rounded-full bg-cream-light/90 backdrop-blur-sm"
            onClick={handleWishlist}
          >
            <Heart className={cn("h-4 w-4", isInWishlist(product.id) && "fill-emerald text-emerald")} />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="h-9 w-9 rounded-full bg-cream-light/90 backdrop-blur-sm"
            onClick={handleQuickAdd}
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="space-y-1">
        <h3 className="font-medium text-navy line-clamp-2 group-hover:text-emerald transition-colors text-sm sm:text-base">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-navy">{formatPrice(price)}</span>
          {hasDiscount && (
            <span className="text-sm text-navy/40 line-through">{formatPrice(product.price)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
