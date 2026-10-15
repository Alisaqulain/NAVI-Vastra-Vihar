"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, Minus, Plus, ShoppingBag, Star, Truck, Banknote, ShieldCheck, Tag, Sparkles } from "lucide-react";
import { Product, Review } from "@/lib/models";
import { getDiscountPercent, cn, FREE_SHIPPING_THRESHOLD, formatPrice } from "@/lib/utils";
import { isAsShownColor } from "@/lib/constants/product-colors";
import { ProductPriceFromProduct, productHasDiscount } from "@/components/storefront/ProductPrice";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { toast } from "sonner";
import { ProductGallery } from "@/components/storefront/product/ProductGallery";
import { ProductPincodeChecker } from "@/components/storefront/product/ProductPincodeChecker";
import { ProductDetailSections } from "@/components/storefront/product/ProductDetailSections";
import { ProductMobileBuyBar } from "@/components/storefront/product/ProductMobileBuyBar";

interface ProductDetailsProps {
  product: Product;
  reviews: Review[];
  categoryName?: string;
}

export function ProductDetails({ product, reviews, categoryName }: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name ?? "");
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const router = useRouter();
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  const hasDiscount = productHasDiscount(product);
  const inStock = product.stockQuantity > 0;
  const lowStock = inStock && product.stockQuantity <= 5;

  const handleAddToCart = async () => {
    setAdding(true);
    try {
      addItem({ productId: product.id, quantity, size: selectedSize, color: selectedColor });
      toast.success("Added to bag", { description: `${quantity} × ${product.name}` });
    } finally {
      setAdding(false);
    }
  };

  const handleBuyNow = () => {
    addItem({ productId: product.id, quantity, size: selectedSize, color: selectedColor });
    router.push("/checkout");
  };

  const displayRating = reviews.length
    ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    : product.rating;
  const reviewCount = reviews.length || product.reviewCount;
  const showRating = displayRating > 0 && reviewCount > 0;

  return (
    <div className="w-full min-w-0 pb-24 lg:pb-0">
      <div className="grid lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] gap-8 lg:gap-12 xl:gap-14 items-start">
        <div className="min-w-0 relative">
          <div className="flex flex-wrap gap-2 mb-3 lg:absolute lg:z-10 lg:top-4 lg:left-4 lg:pointer-events-none">
            {product.newArrival && (
              <Badge variant="emerald" className="rounded-full text-[10px] uppercase tracking-wide gap-1">
                <Sparkles className="h-3 w-3" /> New
              </Badge>
            )}
            {hasDiscount && (
              <Badge variant="sale" className="rounded-full text-[10px] uppercase tracking-wide">
                {getDiscountPercent(product.price, product.salePrice!)}% off
              </Badge>
            )}
          </div>
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        <div className="lg:sticky lg:top-[4.5rem] lg:self-start min-w-0">
          <article className="rounded-2xl border border-neutral-200 bg-white shadow-[0_4px_32px_rgba(27,42,74,0.06)] p-5 sm:p-6 lg:p-7 space-y-5">
            <header className="space-y-2">
              {categoryName && (
                <p className="text-[11px] uppercase tracking-[0.15em] text-emerald font-semibold">{categoryName}</p>
              )}
              <h1 className="font-serif text-2xl sm:text-[1.75rem] lg:text-3xl text-navy leading-snug text-balance">{product.name}</h1>
              {showRating && (
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex" aria-hidden>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn("h-4 w-4", i < Math.round(displayRating) ? "fill-gold text-gold" : "text-neutral-200")}
                      />
                    ))}
                  </div>
                  <span className="text-navy/55">{displayRating.toFixed(1)} · {reviewCount} reviews</span>
                </div>
              )}
            </header>

            <div className="rounded-xl bg-neutral-50 border border-neutral-100 px-4 py-4">
              <ProductPriceFromProduct product={product} size="lg" layout="pdp" />
              <p className="text-[11px] text-navy/45 mt-2 flex items-center gap-1">
                <Tag className="h-3 w-3" /> Inclusive of all taxes · MRP in ₹
              </p>
            </div>

            {product.shortDescription && (
              <p className="text-sm text-navy/65 leading-relaxed border-l-2 border-gold/60 pl-4">{product.shortDescription}</p>
            )}

            <div className="flex flex-wrap gap-2 text-xs">
              {inStock ? (
                <span className={cn("inline-flex items-center rounded-full px-3 py-1 font-medium", lowStock ? "bg-amber-50 text-amber-900" : "bg-emerald/10 text-emerald-dark")}>
                  {lowStock ? `Only ${product.stockQuantity} left` : "In stock · Ready to ship"}
                </span>
              ) : (
                <span className="inline-flex rounded-full px-3 py-1 font-medium bg-red-50 text-red-700">Out of stock</span>
              )}
              {product.fabric && (
                <span className="inline-flex rounded-full px-3 py-1 bg-neutral-100 text-navy/70">{product.fabric}</span>
              )}
              {product.sku && (
                <span className="inline-flex rounded-full px-3 py-1 bg-neutral-100 text-navy/50">SKU {product.sku}</span>
              )}
            </div>

            {product.colors.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-navy/50 mb-2.5">
                  Colour · <span className="text-navy normal-case tracking-normal font-medium">{selectedColor}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) =>
                    isAsShownColor(color.name) ? (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelectedColor(color.name)}
                        className={cn(
                          "px-4 py-2 text-xs font-medium rounded-full border-2 transition-all",
                          selectedColor === color.name
                            ? "border-navy bg-navy text-white"
                            : "border-neutral-200 hover:border-gold/50"
                        )}
                        aria-pressed={selectedColor === color.name}
                      >
                        As shown
                      </button>
                    ) : (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelectedColor(color.name)}
                        className={cn(
                          "h-9 w-9 rounded-full border-2 transition-all ring-offset-2",
                          selectedColor === color.name ? "border-navy ring-2 ring-gold/40 scale-105" : "border-neutral-200"
                        )}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                        aria-label={`Colour ${color.name}`}
                        aria-pressed={selectedColor === color.name}
                      />
                    )
                  )}
                </div>
              </div>
            )}

            {product.sizes.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-navy/50 mb-2.5">Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "min-w-[3.25rem] px-4 py-2.5 text-sm rounded-full border-2 font-medium transition-all",
                        selectedSize === size
                          ? "bg-navy text-white border-navy"
                          : "border-neutral-200 hover:border-navy/40"
                      )}
                      aria-pressed={selectedSize === size}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-navy/50 mb-2.5">Quantity</p>
              <div className="inline-flex items-center rounded-full border-2 border-neutral-200 bg-white overflow-hidden">
                <Button type="button" variant="ghost" size="icon" className="h-11 w-11 rounded-none" onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={!inStock} aria-label="Decrease">
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-semibold tabular-nums">{quantity}</span>
                <Button type="button" variant="ghost" size="icon" className="h-11 w-11 rounded-none" onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))} disabled={!inStock} aria-label="Increase">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <ProductPincodeChecker className="rounded-xl border border-neutral-100 bg-neutral-50/80 p-4" />

            <div className="flex flex-col gap-2.5 pt-1">
              <Button
                variant="emerald"
                size="lg"
                className="w-full h-12 rounded-full text-sm font-bold uppercase tracking-wide shadow-lg shadow-emerald/20"
                disabled={!inStock || adding}
                onClick={handleAddToCart}
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                {adding ? "Adding…" : "Add to cart"}
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 h-12 rounded-full font-semibold border-2 border-navy text-navy hover:bg-navy hover:text-white"
                  disabled={!inStock}
                  onClick={handleBuyNow}
                >
                  Buy now
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 shrink-0 rounded-full border-2"
                  onClick={() => toggleItem(product.id)}
                  aria-label="Wishlist"
                >
                  <Heart className={cn("h-5 w-5", isInWishlist(product.id) && "fill-emerald text-emerald")} />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-neutral-100">
              {[
                { icon: Truck, text: `Free ship ${formatPrice(FREE_SHIPPING_THRESHOLD)}+` },
                { icon: Banknote, text: "COD available" },
                { icon: ShieldCheck, text: "Quality checked" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-[11px] text-navy/55">
                  <Icon className="h-4 w-4 text-emerald shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>

      <ProductDetailSections product={product} reviews={reviews} categoryName={categoryName} />

      <ProductMobileBuyBar product={product} inStock={inStock} adding={adding} onAddToCart={handleAddToCart} />
    </div>
  );
}
