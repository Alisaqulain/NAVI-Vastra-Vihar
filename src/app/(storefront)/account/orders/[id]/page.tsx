"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { AccountNav } from "@/components/storefront/AccountNav";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/auth-context";
import { orderRepository } from "@/lib/repositories";
import { Order } from "@/lib/models";
import { formatPrice, formatDateTime } from "@/lib/utils";

export default function OrderDetailPage() {
  const { session, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push("/account/login");
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    if (params.id) {
      orderRepository.findById(params.id as string).then(setOrder);
    }
  }, [params.id]);

  if (isLoading || !session) return null;
  if (!order) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-navy/60">Order not found.</p>
        <Link href="/account/orders" className="text-emerald hover:underline mt-4 inline-block">Back to Orders</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <AccountNav />
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl text-navy">{order.orderNumber}</h1>
          <p className="text-navy/60 mt-1">Placed on {formatDateTime(order.createdAt)}</p>
        </div>
        <Badge variant="emerald" className="capitalize text-sm px-3 py-1">{order.orderStatus}</Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle className="font-serif">Items</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative h-20 w-16 shrink-0 rounded overflow-hidden">
                    <Image src={item.productImage} alt={item.productName} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-navy">{item.productName}</p>
                    <p className="text-sm text-navy/60">Size: {item.size} · Color: {item.color} · Qty: {item.quantity}</p>
                    <p className="text-sm font-medium mt-1">{formatPrice((item.salePrice ?? item.price) * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="font-serif">Order Timeline</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.timeline.map((event, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-emerald mt-2 shrink-0" />
                    <div>
                      <p className="font-medium capitalize text-navy">{event.status}</p>
                      <p className="text-sm text-navy/60">{formatDateTime(event.date)}</p>
                      {event.note && <p className="text-sm text-navy/50">{event.note}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="font-serif">Shipping Address</CardTitle></CardHeader>
            <CardContent className="text-sm text-navy/80">
              <p className="font-medium">{order.shippingAddress.fullName}</p>
              <p className="mt-2">{order.shippingAddress.addressLine1}</p>
              {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} — {order.shippingAddress.pincode}</p>
              <p className="mt-2">{order.shippingAddress.phone}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="font-serif">Payment Summary</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-navy/60">Subtotal</span><span>{formatPrice(order.subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-navy/60">Shipping</span><span>{order.shipping === 0 ? "Free" : formatPrice(order.shipping)}</span></div>
              {order.discount > 0 && <div className="flex justify-between text-emerald"><span>Discount</span><span>-{formatPrice(order.discount)}</span></div>}
              <Separator />
              <div className="flex justify-between font-semibold"><span>Total</span><span>{formatPrice(order.total)}</span></div>
              <p className="text-navy/60 pt-2">Payment: {order.paymentMethod} · <span className="capitalize">{order.paymentStatus}</span></p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
