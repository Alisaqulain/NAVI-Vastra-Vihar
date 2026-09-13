"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Breadcrumbs } from "@/components/storefront/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import { placeOrder } from "@/app/actions/orders";
import { couponRepository } from "@/lib/repositories";
import { formatPrice, getEffectivePrice, SHIPPING_COST, FREE_SHIPPING_THRESHOLD } from "@/lib/utils";

function CheckoutForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const couponParam = searchParams.get("coupon") ?? "";
  const { items, subtotal, clearCart, isLoaded } = useCart();
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [form, setForm] = useState({
    fullName: session?.user.firstName ? `${session.user.firstName} ${session.user.lastName}` : "",
    email: session?.user.email ?? "",
    phone: session?.user.phone ?? "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
  });

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : items.length > 0 ? SHIPPING_COST : 0;
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    if (couponParam && subtotal > 0) {
      couponRepository.findByCode(couponParam).then((coupon) => {
        if (!coupon || subtotal < coupon.minimumOrderValue) return;
        const disc =
          coupon.discountType === "fixed"
            ? coupon.discountValue
            : Math.min(
                (subtotal * coupon.discountValue) / 100,
                coupon.maximumDiscount ?? Infinity
              );
        setDiscount(disc);
      });
    }
  }, [couponParam, subtotal]);

  const total = subtotal + shipping - discount;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    if (!form.fullName || !form.email || !form.phone || !form.addressLine1 || !form.city || !form.state || !form.pincode) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    const result = await placeOrder({
      userId: session?.user.id,
      customerName: form.fullName,
      customerEmail: form.email,
      customerPhone: form.phone,
      items: items.map((item) => ({
        productId: item.productId,
        productName: item.product!.name,
        productImage: item.product!.images[0],
        sku: item.product!.sku,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        price: item.product!.price,
        salePrice: item.product!.salePrice,
      })),
      shippingAddress: {
        label: "Shipping",
        fullName: form.fullName,
        phone: form.phone,
        addressLine1: form.addressLine1,
        addressLine2: form.addressLine2,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
        country: "India",
        isDefault: true,
      },
      couponCode: couponParam || undefined,
      paymentMethod: paymentMethod.toUpperCase(),
    });

    setLoading(false);

    if (result.success && result.order) {
      clearCart();
      toast.success("Order placed successfully!");
      router.push(`/account/orders/${result.order.id}`);
    } else {
      toast.error(result.error ?? "Failed to place order");
    }
  }

  if (!isLoaded) return null;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="font-serif text-2xl text-navy mb-4">Nothing to checkout</h1>
        <Button asChild variant="emerald">
          <Link href="/shop">Browse Collection</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cart", href: "/cart" }, { label: "Checkout" }]} />
      <h1 className="font-serif text-3xl text-navy mt-4 mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="p-6 rounded-lg border border-beige bg-cream-light space-y-4">
            <h2 className="font-serif text-xl text-navy">Contact Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input id="fullName" required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input id="phone" type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
            </div>
          </section>

          <section className="p-6 rounded-lg border border-beige bg-cream-light space-y-4">
            <h2 className="font-serif text-xl text-navy">Delivery Address</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="addressLine1">Address Line 1 *</Label>
                <Input id="addressLine1" required value={form.addressLine1} onChange={(e) => setForm({ ...form, addressLine1: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="addressLine2">Address Line 2</Label>
                <Input id="addressLine2" value={form.addressLine2} onChange={(e) => setForm({ ...form, addressLine2: e.target.value })} />
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input id="city" required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="state">State *</Label>
                  <Input id="state" required value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="pincode">Pincode *</Label>
                  <Input id="pincode" required value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} />
                </div>
              </div>
            </div>
          </section>

          <section className="p-6 rounded-lg border border-beige bg-cream-light space-y-4">
            <h2 className="font-serif text-xl text-navy">Payment Method</h2>
            <p className="text-sm text-navy/60">Payment gateway integration ready — currently using mock payment.</p>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
              {[
                { value: "upi", label: "UPI (Google Pay, PhonePe, Paytm)" },
                { value: "card", label: "Credit / Debit Card" },
                { value: "netbanking", label: "Net Banking" },
                { value: "cod", label: "Cash on Delivery" },
              ].map((method) => (
                <div key={method.value} className="flex items-center space-x-3 border border-beige rounded-md p-4">
                  <RadioGroupItem value={method.value} id={method.value} />
                  <Label htmlFor={method.value} className="cursor-pointer flex-1">{method.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </section>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 p-6 rounded-lg border border-beige bg-cream-light space-y-4">
            <h2 className="font-serif text-xl text-navy">Order Summary</h2>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {items.map((item) => {
                if (!item.product) return null;
                return (
                  <div key={`${item.productId}-${item.size}`} className="flex gap-3">
                    <div className="relative h-16 w-14 shrink-0 rounded overflow-hidden">
                      <Image src={item.product.images[0]} alt="" fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-2">{item.product.name}</p>
                      <p className="text-xs text-navy/60">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium">{formatPrice(getEffectivePrice(item.product) * item.quantity)}</p>
                  </div>
                );
              })}
            </div>
            <Separator />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-navy/60">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-navy/60">Shipping</span><span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span></div>
              {discount > 0 && <div className="flex justify-between text-emerald"><span>Discount</span><span>-{formatPrice(discount)}</span></div>}
              <Separator />
              <div className="flex justify-between font-semibold text-lg"><span>Total</span><span>{formatPrice(total)}</span></div>
            </div>
            <Button type="submit" variant="emerald" className="w-full" size="lg" disabled={loading}>
              {loading ? "Processing..." : "Place Order"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-12 text-center">Loading checkout...</div>}>
      <CheckoutForm />
    </Suspense>
  );
}
