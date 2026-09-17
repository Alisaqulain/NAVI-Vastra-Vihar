"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProductImage } from "@/components/ui/product-image";
import {
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  Package,
  Shield,
  Star,
  Sparkles,
  Banknote,
  Gem,
} from "lucide-react";
import { Product, Review } from "@/lib/models";
import { formatPrice, getEffectivePrice, getDiscountPercent, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { ReviewCard } from "./ReviewCard";
import { toast } from "sonner";

interface ProductDetailsProps {
  product: Product;
  reviews: Review[];
}

const trustItems = [
  { icon: Sparkles, title: "Artisan Crafted", desc: "Hand-finished with care" },
  { icon: Shield, title: "Quality Checked", desc: "Inspected for flawless finish" },
  { icon: Truck, title: "Insured Shipping", desc: "Secure delivery across India" },
  { icon: Banknote, title: "COD Available", desc: "Pay on delivery" },
  { icon: Gem, title: "Pure Fabric", desc: "Authentic handpicked weaves" },
  { icon: Package, title: "Heirloom Quality", desc: "Made to be treasured" },
];

export function ProductDetails({ product, reviews }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name ?? "");
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  const price = getEffectivePrice(product);
  const hasDiscount = product.salePrice && product.salePrice < product.price;
  const inStock = product.stockQuantity > 0;

  const handleAddToCart = () => {
    addItem({ productId: product.id, quantity, size: selectedSize, color: selectedColor });
    toast.success("Added to bag", { description: `${quantity} × ${product.name}` });
  };

  const handleBuyNow = () => {
    addItem({ productId: product.id, quantity, size: selectedSize, color: selectedColor });
    router.push("/checkout");
  };

  const displayRating = reviews.length
    ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    : product.rating;
  const reviewCount = reviews.length || product.reviewCount;

  return (
    <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-8 lg:gap-14 xl:gap-16">
      {/* Gallery — Mehr-style */}
      <div className="flex flex-col-reverse lg:flex-row gap-3 lg:gap-4">
        <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible lg:w-20 shrink-0">
          {product.images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelectedImage(i)}
              className={cn(
                "relative h-16 w-14 lg:h-[72px] lg:w-full rounded-lg overflow-hidden shrink-0 border-2 transition-all",
                selectedImage === i ? "border-emerald ring-1 ring-emerald/30" : "border-beige/60 opacity-80 hover:opacity-100"
              )}
            >
              <ProductImage src={img} alt="" fill className="object-cover object-top" sizes="80px" />
            </button>
          ))}
        </div>
        <div className="relative flex-1 aspect-[3/4] max-h-[85vh] rounded-2xl overflow-hidden bg-cream-dark">
          <ProductImage
            src={product.images[selectedImage]}
            alt={product.name}
            fill
            className="object-cover object-top"
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            {product.newArrival && <Badge variant="emerald">New</Badge>}
            {hasDiscount && <Badge variant="sale">{getDiscountPercent(product.price, product.salePrice!)}% OFF</Badge>}
          </div>
        </div>
      </div>

      {/* Buy box — sticky on desktop */}
      <div className="lg:sticky lg:top-28 lg:self-start space-y-6">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-navy leading-tight mb-2">{product.name}</h1>
          {displayRating > 0 && (
            <div className="flex items-center gap-2 text-sm text-navy/55 mb-3">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={cn("h-3.5 w-3.5", i < Math.round(displayRating) ? "fill-gold text-gold" : "text-beige")} />
                ))}
              </div>
              <span>{displayRating.toFixed(1)} ({reviewCount} reviews)</span>
            </div>
          )}
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="text-2xl sm:text-3xl font-semibold text-navy tabular-nums">{formatPrice(price)}</span>
            {hasDiscount && (
              <span className="text-lg text-navy/35 line-through tabular-nums">{formatPrice(product.price)}</span>
            )}
          </div>
          <p className="text-xs text-navy/45 mt-2">Taxes included. Shipping calculated at checkout.</p>
        </div>

        <p className="text-sm text-navy/65 leading-relaxed border-l-2 border-gold/50 pl-4">{product.shortDescription}</p>

        {product.colors.length > 0 && (
          <div>
            <p className="text-xs uppercase tracking-wider text-navy/50 mb-2">Colour</p>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setSelectedColor(color.name)}
                  className={cn(
                    "h-9 w-9 rounded-full border-2 transition-all",
                    selectedColor === color.name ? "border-emerald scale-110" : "border-beige"
                  )}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        )}

        <div>
          <p className="text-xs uppercase tracking-wider text-navy/50 mb-2">Size</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={cn(
                  "px-4 py-2 text-sm rounded-full border transition-colors",
                  selectedSize === size ? "bg-navy text-cream border-navy" : "border-beige hover:border-emerald"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center rounded-full border border-beige overflow-hidden">
            <Button variant="ghost" size="icon" className="rounded-none" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-10 text-center text-sm font-medium">{quantity}</span>
            <Button variant="ghost" size="icon" className="rounded-none" onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <span className={cn("text-sm", inStock ? "text-emerald" : "text-red-600")}>
            {inStock ? `${product.stockQuantity} in stock` : "Out of stock"}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="emerald" size="lg" className="flex-1 rounded-full h-12 uppercase text-xs tracking-wider" disabled={!inStock} onClick={handleAddToCart}>
            Add to Cart
          </Button>
          <Button variant="outline" size="lg" className="rounded-full h-12 w-12 p-0 shrink-0 border-beige" onClick={() => toggleItem(product.id)} aria-label="Wishlist">
            <Heart className={cn("h-4 w-4", isInWishlist(product.id) && "fill-emerald text-emerald")} />
          </Button>
        </div>
        <Button variant="gold" size="lg" className="w-full rounded-full h-12 uppercase text-xs tracking-wider" disabled={!inStock} onClick={handleBuyNow}>
          Buy Now
        </Button>

        {/* Delivery timeline */}
        <div className="grid grid-cols-3 gap-2 py-4 border-y border-beige/80">
          {["Ordered", "Shipped", "Delivered"].map((step, i) => (
            <div key={step} className="text-center">
              <div className={cn("h-2 w-2 rounded-full mx-auto mb-2", i === 0 ? "bg-emerald" : "bg-beige")} />
              <p className="text-[10px] sm:text-xs uppercase tracking-wider text-navy/50">{step}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-xs text-navy/60">
            <Truck className="h-4 w-4 text-emerald shrink-0" />
            Free shipping above ₹5,000
          </div>
          <div className="flex items-center gap-2 text-xs text-navy/60">
            <Banknote className="h-4 w-4 text-emerald shrink-0" />
            COD available
          </div>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="desc">
            <AccordionTrigger className="text-sm font-medium text-navy">Description</AccordionTrigger>
            <AccordionContent className="text-sm text-navy/70 leading-relaxed">{product.description}</AccordionContent>
          </AccordionItem>
          <AccordionItem value="material">
            <AccordionTrigger className="text-sm font-medium text-navy">Material Used</AccordionTrigger>
            <AccordionContent className="text-sm text-navy/70">{product.fabric}</AccordionContent>
          </AccordionItem>
          <AccordionItem value="care">
            <AccordionTrigger className="text-sm font-medium text-navy">Care Instructions</AccordionTrigger>
            <AccordionContent className="text-sm text-navy/70 space-y-1">
              <p>Dry clean recommended for silk and zari pieces.</p>
              <p>Store in a muslin bag away from direct sunlight.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="reviews">
            <AccordionTrigger className="text-sm font-medium text-navy">Reviews ({reviews.length})</AccordionTrigger>
            <AccordionContent className="space-y-4">
              {reviews.length === 0 ? (
                <p className="text-sm text-navy/50">No reviews yet.</p>
              ) : (
                reviews.map((r) => <ReviewCard key={r.id} review={r} />)
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Separator />

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {trustItems.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="text-center p-3 rounded-xl bg-cream-dark/40">
              <Icon className="h-5 w-5 mx-auto text-emerald mb-2" strokeWidth={1.5} />
              <p className="text-[11px] font-medium text-navy leading-tight">{title}</p>
              <p className="text-[10px] text-navy/45 mt-0.5">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
