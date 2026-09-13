"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Breadcrumbs } from "@/components/storefront/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/context/cart-context";
import { couponRepository } from "@/lib/repositories";
import { formatPrice, getEffectivePrice, SHIPPING_COST, FREE_SHIPPING_THRESHOLD } from "@/lib/utils";

export default function CartPage() {
  const { items, isLoaded, subtotal, updateQuantity, removeItem } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState("");

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : items.length > 0 ? SHIPPING_COST : 0;
  const total = subtotal + shipping - discount;

  async function applyCoupon() {
    if (!couponCode.trim()) return;
    const coupon = await couponRepository.findByCode(couponCode);
    if (!coupon || coupon.status !== "active") {
      toast.error("Invalid coupon code");
      return;
    }
    const now = new Date();
    if (new Date(coupon.startDate) > now || new Date(coupon.expiryDate) < now) {
      toast.error("This coupon has expired");
      return;
    }
    if (subtotal < coupon.minimumOrderValue) {
      toast.error(`Minimum order of ${formatPrice(coupon.minimumOrderValue)} required`);
      return;
    }
    let disc =
      coupon.discountType === "fixed"
        ? coupon.discountValue
        : (subtotal * coupon.discountValue) / 100;
    if (coupon.maximumDiscount) disc = Math.min(disc, coupon.maximumDiscount);
    setDiscount(disc);
    setAppliedCoupon(coupon.code);
    toast.success("Coupon applied!");
  }

  if (!isLoaded) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-48 mb-8" />
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="h-16 w-16 mx-auto text-navy/20 mb-4" />
        <h1 className="font-serif text-2xl text-navy mb-2">Your cart is empty</h1>
        <p className="text-navy/60 mb-8">Discover our handloom collection and add something beautiful.</p>
        <Button asChild variant="emerald" size="lg">
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cart" }]} />
      <h1 className="font-serif text-3xl text-navy mt-4 mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            if (!item.product) return null;
            const price = getEffectivePrice(item.product);
            return (
              <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-4 p-4 rounded-lg border border-beige bg-cream-light">
                <Link href={`/product/${item.product.slug}`} className="relative h-28 w-24 shrink-0 overflow-hidden rounded-md">
                  <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link href={`/product/${item.product.slug}`} className="font-serif text-lg text-navy hover:text-emerald line-clamp-2">
                    {item.product.name}
                  </Link>
                  <p className="text-sm text-navy/60 mt-1">
                    Size: {item.size} · Color: {item.color}
                  </p>
                  <p className="font-semibold text-navy mt-2">{formatPrice(price)}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center border border-beige rounded-md">
                      <button
                        type="button"
                        className="p-2 hover:bg-cream-dark"
                        onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-3 text-sm font-medium">{item.quantity}</span>
                      <button
                        type="button"
                        className="p-2 hover:bg-cream-dark"
                        onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      type="button"
                      className="text-red-600 hover:text-red-700 p-2"
                      onClick={() => {
                        removeItem(item.productId, item.size, item.color);
                        toast.success("Item removed");
                      }}
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="font-semibold text-navy hidden sm:block">{formatPrice(price * item.quantity)}</p>
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 p-6 rounded-lg border border-beige bg-cream-light space-y-4">
            <h2 className="font-serif text-xl text-navy">Order Summary</h2>
            <Separator />
            <div className="flex gap-2">
              <Input
                placeholder="Coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                disabled={!!appliedCoupon}
              />
              <Button variant="outline" onClick={applyCoupon} disabled={!!appliedCoupon}>
                Apply
              </Button>
            </div>
            {appliedCoupon && (
              <p className="text-sm text-emerald">Coupon {appliedCoupon} applied</p>
            )}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-navy/60">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-navy/60">Shipping</span>
                <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald">
                  <span>Discount</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            {subtotal < FREE_SHIPPING_THRESHOLD && (
              <p className="text-xs text-navy/50">
                Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping
              </p>
            )}
            <Button asChild variant="emerald" className="w-full" size="lg">
              <Link href={`/checkout${appliedCoupon ? `?coupon=${appliedCoupon}` : ""}`}>Proceed to Checkout</Link>
            </Button>
            <Button asChild variant="ghost" className="w-full">
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
