"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Package } from "lucide-react";
import { AccountNav } from "@/components/storefront/AccountNav";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/auth-context";
import { orderRepository } from "@/lib/repositories";
import { Order } from "@/lib/models";
import { formatPrice, formatDate } from "@/lib/utils";

const statusVariant: Record<string, "default" | "emerald" | "warning" | "destructive"> = {
  pending: "warning",
  confirmed: "default",
  processing: "default",
  shipped: "emerald",
  delivered: "emerald",
  cancelled: "destructive",
  returned: "destructive",
};

export default function OrdersPage() {
  const { session, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push("/account/login");
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    if (session?.user.id) {
      orderRepository.findByUserId(session.user.id).then(setOrders);
    }
  }, [session?.user.id]);

  if (isLoading || !session) return null;

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <h1 className="font-serif text-3xl text-navy mb-6">My Orders</h1>
      <AccountNav />

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <Package className="h-12 w-12 mx-auto text-navy/20 mb-4" />
          <p className="text-navy/60 mb-4">You haven&apos;t placed any orders yet.</p>
          <Link href="/shop" className="text-emerald hover:underline">Start Shopping</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link key={order.id} href={`/account/orders/${order.id}`}>
              <Card className="hover:border-emerald transition-colors">
                <CardContent className="p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="font-serif text-lg text-navy">{order.orderNumber}</p>
                      <p className="text-sm text-navy/60 mt-1">Placed on {formatDate(order.createdAt)}</p>
                      <p className="text-sm text-navy/60">{order.items.length} item(s) · {order.paymentMethod}</p>
                    </div>
                    <div className="text-right space-y-2">
                      <p className="font-semibold text-lg">{formatPrice(order.total)}</p>
                      <Badge variant={statusVariant[order.orderStatus] ?? "default"} className="capitalize">
                        {order.orderStatus}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
