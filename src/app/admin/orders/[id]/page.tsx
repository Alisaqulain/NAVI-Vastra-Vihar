"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Order, OrderStatus, PaymentStatus } from "@/lib/models";
import { orderRepository } from "@/lib/repositories";
import { formatPrice, formatDateTime } from "@/lib/utils";
import { OrderStatusSelect, statusLabels } from "@/components/admin/OrderStatusSelect";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Package, MapPin, CreditCard } from "lucide-react";
import { toast } from "sonner";

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const load = () => orderRepository.findById(id).then(setOrder);

  useEffect(() => {
    load();
  }, [id]);

  const updateStatus = async (status: OrderStatus) => {
    setLoading(true);
    const updated = await orderRepository.updateStatus(id, status, note || undefined);
    if (updated) {
      setOrder(updated);
      setNote("");
      toast.success(`Order status updated to ${statusLabels[status]}`);
    }
    setLoading(false);
  };

  const updatePayment = async (status: PaymentStatus) => {
    const updated = await orderRepository.updatePaymentStatus(id, status);
    if (updated) {
      setOrder(updated);
      toast.success("Payment status updated");
    }
  };

  if (!order) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-navy">{order.orderNumber}</h1>
          <p className="text-sm text-navy/60">Placed on {formatDateTime(order.createdAt)}</p>
        </div>
        <div className="flex items-center gap-3">
          <OrderStatusSelect value={order.orderStatus} onChange={updateStatus} disabled={loading} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="border-beige bg-cream-light">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Package className="h-5 w-5" />
                Order Items
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4 border-b border-beige pb-4 last:border-0 last:pb-0">
                  <Image src={item.productImage} alt={item.productName} width={64} height={64} className="rounded-md object-cover" />
                  <div className="flex-1">
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-sm text-navy/60">
                      {item.size} · {item.color} · Qty: {item.quantity}
                    </p>
                    <p className="text-sm text-navy/50">SKU: {item.sku}</p>
                  </div>
                  <p className="font-medium">{formatPrice((item.salePrice ?? item.price) * item.quantity)}</p>
                </div>
              ))}
              <div className="space-y-1 border-t border-beige pt-4 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(order.subtotal)}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>{formatPrice(order.shipping)}</span></div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-emerald">
                    <span>Discount {order.couponCode && `(${order.couponCode})`}</span>
                    <span>-{formatPrice(order.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-base pt-1">
                  <span>Total</span><span>{formatPrice(order.total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-beige bg-cream-light">
            <CardHeader>
              <CardTitle className="text-lg">Status Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative space-y-4 pl-6 before:absolute before:left-[7px] before:top-2 before:h-[calc(100%-16px)] before:w-0.5 before:bg-beige">
                {order.timeline.map((entry, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-6 top-1 h-3.5 w-3.5 rounded-full border-2 border-emerald bg-cream-light" />
                    <div>
                      <p className="font-medium capitalize">{statusLabels[entry.status]}</p>
                      <p className="text-sm text-navy/60">{formatDateTime(entry.date)}</p>
                      {entry.note && <p className="text-sm text-navy/50 mt-1">{entry.note}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-beige bg-cream-light">
            <CardHeader>
              <CardTitle className="text-lg">Update Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="note">Note (optional)</Label>
                <Input id="note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add a note..." />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {(["confirmed", "processing", "shipped", "delivered"] as OrderStatus[]).map((s) => (
                  <Button key={s} variant="outline" size="sm" onClick={() => updateStatus(s)} disabled={loading}>
                    {statusLabels[s]}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-beige bg-cream-light">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CreditCard className="h-5 w-5" />
                Payment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">Method: {order.paymentMethod}</p>
              <Select value={order.paymentStatus} onValueChange={(v) => updatePayment(v as PaymentStatus)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(["pending", "paid", "failed", "refunded"] as PaymentStatus[]).map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card className="border-beige bg-cream-light">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="h-5 w-5" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-1">
              <p className="font-medium">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.addressLine1}</p>
              {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}</p>
              <p>{order.shippingAddress.phone}</p>
            </CardContent>
          </Card>

          <Card className="border-beige bg-cream-light">
            <CardHeader>
              <CardTitle className="text-lg">Customer</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-1">
              <p className="font-medium">{order.customerName}</p>
              <p>{order.customerEmail}</p>
              <p>{order.customerPhone}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
