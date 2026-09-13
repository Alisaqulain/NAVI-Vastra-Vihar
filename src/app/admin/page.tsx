"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  IndianRupee,
  ShoppingCart,
  Users,
  Package,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DashboardStats, Order, Inventory } from "@/lib/models";
import { reportRepository, orderRepository, inventoryRepository } from "@/lib/repositories";
import { formatPrice, formatDate } from "@/lib/utils";
import { StatsCard } from "@/components/admin/StatsCard";
import { ChartCard } from "@/components/admin/ChartCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { statusLabels, statusVariants } from "@/components/admin/OrderStatusSelect";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [revenueData, setRevenueData] = useState<{ date: string; revenue: number }[]>([]);
  const [ordersData, setOrdersData] = useState<{ date: string; orders: number }[]>([]);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [topProducts, setTopProducts] = useState<{ product: { name: string; id: string }; sold: number; revenue: number }[]>([]);
  const [lowStock, setLowStock] = useState<Inventory[]>([]);

  useEffect(() => {
    async function load() {
      const [s, revenue, ordersChart, orders, top, inventory] = await Promise.all([
        reportRepository.getDashboardStats(),
        reportRepository.getRevenueChart({ period: "30days" }),
        reportRepository.getOrdersChart({ period: "30days" }),
        orderRepository.findAll(),
        reportRepository.getTopProducts(5),
        inventoryRepository.findAll({ status: "low_stock" }),
      ]);
      setStats(s);
      setRevenueData(revenue);
      setOrdersData(ordersChart);
      setRecentOrders(orders.slice(0, 5));
      setTopProducts(top);
      setLowStock(inventory);
    }
    load();
  }, []);

  if (!stats) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-navy">Dashboard</h1>
        <p className="text-sm text-navy/60">Overview of your store performance</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard title="Total Revenue" value={formatPrice(stats.totalRevenue)} icon={IndianRupee} variant="emerald" />
        <StatsCard title="Total Orders" value={stats.totalOrders} subtitle={`${stats.pendingOrders} pending`} icon={ShoppingCart} />
        <StatsCard title="Customers" value={stats.totalCustomers} icon={Users} variant="gold" />
        <StatsCard title="Products" value={stats.totalProducts} subtitle={`${stats.lowStockProducts} low stock`} icon={Package} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Revenue Trend" description="Last 30 days">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1F6B5C" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#1F6B5C" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8DFD0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#1B2A4A80" />
              <YAxis tick={{ fontSize: 12 }} stroke="#1B2A4A80" tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v) => formatPrice(Number(v))} />
              <Area type="monotone" dataKey="revenue" stroke="#1F6B5C" fill="url(#revenueGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Orders Trend" description="Daily order volume">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={ordersData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8DFD0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#1B2A4A80" />
              <YAxis tick={{ fontSize: 12 }} stroke="#1B2A4A80" />
              <Tooltip />
              <Bar dataKey="orders" fill="#1B2A4A" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-beige bg-cream-light lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Orders</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/orders">View all</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <Link
                  key={order.id}
                  href={`/admin/orders/${order.id}`}
                  className="flex items-center justify-between rounded-lg border border-beige p-3 transition-colors hover:bg-cream-dark/30"
                >
                  <div>
                    <p className="font-medium text-navy">{order.orderNumber}</p>
                    <p className="text-sm text-navy/60">{order.customerName}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatPrice(order.total)}</p>
                    <Badge variant={statusVariants[order.orderStatus]}>{statusLabels[order.orderStatus]}</Badge>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-beige bg-cream-light">
            <CardHeader className="flex flex-row items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald" />
              <CardTitle className="text-lg">Top Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topProducts.map((item, i) => (
                  <div key={item.product.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald/10 text-xs font-bold text-emerald">
                        {i + 1}
                      </span>
                      <span className="line-clamp-1">{item.product.name}</span>
                    </div>
                    <span className="font-medium">{formatPrice(item.revenue)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-beige bg-cream-light">
            <CardHeader className="flex flex-row items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <CardTitle className="text-lg">Low Stock Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              {lowStock.length === 0 ? (
                <p className="text-sm text-navy/50">All stock levels healthy</p>
              ) : (
                <div className="space-y-2">
                  {lowStock.slice(0, 5).map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-sm">
                      <span className="line-clamp-1">{item.productName}</span>
                      <Badge variant="warning">{item.currentStock} left</Badge>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full mt-2" asChild>
                    <Link href="/admin/inventory">Manage inventory</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
