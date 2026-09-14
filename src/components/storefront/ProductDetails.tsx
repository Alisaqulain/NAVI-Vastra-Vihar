"use client";

import { useState } from "react";
import { ProductImage } from "@/components/ui/product-image";
import { Heart, Minus, Plus, ShoppingBag, Truck, RotateCcw, Shield } from "lucide-react";
import { Product, Review } from "@/lib/models";
import { formatPrice, getEffectivePrice, getDiscountPercent, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { ReviewCard } from "./ReviewCard";
import { toast } from "sonner";

interface ProductDetailsProps {
  product: Product;
  reviews: Review[];
}

export function ProductDetails({ product, reviews }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name ?? "");
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  const price = getEffectivePrice(product);
  const hasDiscount = product.salePrice && product.salePrice < product.price;
  const inStock = product.stockQuantity > 0;

  const handleAddToCart = () => {
    addItem({ productId: product.id, quantity, size: selectedSize, color: selectedColor });
    toast.success("Added to cart", { description: `${quantity} × ${product.name}` });
  };

  const avgRating = reviews.length
    ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    : 0;

  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
      <div className="space-y-4">
        <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-beige-light">
          <ProductImage
            src={product.images[selectedImage]}
            alt={product.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            {product.newArrival && <Badge variant="emerald">New</Badge>}
            {hasDiscount && <Badge variant="sale">{getDiscountPercent(product.price, product.salePrice!)}% OFF</Badge>}
          </div>
        </div>
        {product.images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={cn(
                  "relative h-20 w-16 rounded-md overflow-hidden shrink-0 border-2 transition-colors",
                  selectedImage === i ? "border-emerald" : "border-transparent"
                )}
              >
                <ProductImage src={img} alt="" fill className="object-cover" sizes="64px" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-sm text-navy/50 mb-1">SKU: {product.sku}</p>
          <h1 className="font-serif text-3xl sm:text-4xl text-navy mb-2">{product.name}</h1>
          {reviews.length > 0 && (
            <p className="text-sm text-navy/60">
              ★ {avgRating.toFixed(1)} ({reviews.length} reviews)
            </p>
          )}
        </div>

        <div className="flex items-baseline gap-3">
          <span className="text-2xl font-semibold text-navy">{formatPrice(price)}</span>
          {hasDiscount && (
            <>
              <span className="text-lg text-navy/40 line-through">{formatPrice(product.price)}</span>
              <Badge variant="sale">Save {formatPrice(product.price - product.salePrice!)}</Badge>
            </>
          )}
        </div>

        <p className="text-navy/70 leading-relaxed">{product.shortDescription}</p>

        {product.colors.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-2">Color: {selectedColor}</p>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={cn(
                    "h-8 w-8 rounded-full border-2 transition-all",
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
          <p className="text-sm font-medium mb-2">Size</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={cn(
                  "px-4 py-2 text-sm rounded-md border transition-colors",
                  selectedSize === size ? "bg-emerald text-cream border-emerald" : "border-beige hover:border-emerald"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center border border-beige rounded-md">
            <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-10 text-center">{quantity}</span>
            <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <span className={cn("text-sm", inStock ? "text-emerald" : "text-red-500")}>
            {inStock ? `${product.stockQuantity} in stock` : "Out of stock"}
          </span>
        </div>

        <div className="flex gap-3">
          <Button variant="emerald" size="lg" className="flex-1" disabled={!inStock} onClick={handleAddToCart}>
            <ShoppingBag className="h-4 w-4 mr-2" /> Add to Bag
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              toggleItem(product.id);
              toast.success(isInWishlist(product.id) ? "Removed from wishlist" : "Added to wishlist");
            }}
          >
            <Heart className={cn("h-4 w-4", isInWishlist(product.id) && "fill-emerald text-emerald")} />
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4 py-4">
          {[
            { icon: Truck, label: "Free shipping above ₹5,000" },
            { icon: RotateCcw, label: "7-day easy returns" },
            { icon: Shield, label: "100% authentic handloom" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="text-center">
              <Icon className="h-5 w-5 mx-auto text-emerald mb-1" />
              <p className="text-[10px] sm:text-xs text-navy/60">{label}</p>
            </div>
          ))}
        </div>

        <Separator />

        <Tabs defaultValue="description">
          <TabsList className="w-full">
            <TabsTrigger value="description" className="flex-1">Description</TabsTrigger>
            <TabsTrigger value="specs" className="flex-1">Specifications</TabsTrigger>
            <TabsTrigger value="reviews" className="flex-1">Reviews ({reviews.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-4 text-navy/70 leading-relaxed">
            {product.description}
          </TabsContent>
          <TabsContent value="specs" className="mt-4">
            <dl className="space-y-2">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm py-2 border-b border-beige">
                  <dt className="text-navy/60">{key}</dt>
                  <dd className="font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </TabsContent>
          <TabsContent value="reviews" className="mt-4 space-y-4">
            {reviews.length === 0 ? (
              <p className="text-navy/60 text-sm">No reviews yet. Be the first to review!</p>
            ) : (
              reviews.map((r) => <ReviewCard key={r.id} review={r} />)
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
