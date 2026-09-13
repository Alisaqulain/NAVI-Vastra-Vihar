"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Package, MapPin, Heart, User, LogOut } from "lucide-react";
import { AccountNav } from "@/components/storefront/AccountNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/auth-context";
import { orderRepository } from "@/lib/repositories";
import { formatPrice, formatDate } from "@/lib/utils";
import { useState } from "react";
import { Order } from "@/lib/models";

export default function AccountPage() {
  const { session, isLoading, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push("/account/login");
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    if (session?.user.id) {
      orderRepository.findByUserId(session.user.id).then((orders) => setRecentOrders(orders.slice(0, 3)));
    }
  }, [session?.user.id]);

  if (isLoading || !session) return null;

  const quickLinks = [
    { href: "/account/orders", icon: Package, label: "My Orders", desc: "Track and view order history" },
    { href: "/account/addresses", icon: MapPin, label: "Addresses", desc: "Manage delivery addresses" },
    { href: "/account/wishlist", icon: Heart, label: "Wishlist", desc: "Saved items for later" },
    { href: "/account/profile", icon: User, label: "Profile", desc: "Update personal information" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-serif text-3xl text-navy">My Account</h1>
        <Button variant="ghost" size="sm" onClick={() => { logout(); router.push("/"); }}>
          <LogOut className="h-4 w-4 mr-2" /> Sign Out
        </Button>
      </div>
      <p className="text-navy/60 mb-6">Welcome back, {session.user.firstName}!</p>
      <AccountNav />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {quickLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <Card className="h-full hover:border-emerald transition-colors cursor-pointer">
              <CardContent className="p-6">
                <link.icon className="h-8 w-8 text-emerald mb-3" />
                <h3 className="font-serif text-lg text-navy">{link.label}</h3>
                <p className="text-sm text-navy/60 mt-1">{link.desc}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {recentOrders.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl text-navy">Recent Orders</h2>
            <Link href="/account/orders" className="text-sm text-emerald hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <Link key={order.id} href={`/account/orders/${order.id}`}>
                <Card className="hover:border-emerald transition-colors">
                  <CardContent className="p-4 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-navy">{order.orderNumber}</p>
                      <p className="text-sm text-navy/60">{formatDate(order.createdAt)} · {order.items.length} item(s)</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatPrice(order.total)}</p>
                      <p className="text-sm capitalize text-emerald">{order.orderStatus}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
