"use client";

import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ReportFilters } from "@/lib/models";
import { reportRepository } from "@/lib/repositories";
import { formatPrice } from "@/lib/utils";
import { ChartCard } from "@/components/admin/ChartCard";
import { StatsCard } from "@/components/admin/StatsCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IndianRupee, ShoppingCart, Users, Package } from "lucide-react";
import { DashboardStats } from "@/lib/models";

const PERIODS: { value: ReportFilters["period"]; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "7days", label: "7 Days" },
  { value: "30days", label: "30 Days" },
  { value: "year", label: "Year" },
  { value: "custom", label: "Custom" },
];

const PIE_COLORS = ["#1B2A4A", "#1F6B5C", "#C9A962", "#2A3F6B", "#2D8A78", "#A88B4A"];

export default function AdminReportsPage() {
  const [period, setPeriod] = useState<ReportFilters["period"]>("30days");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [revenueData, setRevenueData] = useState<{ date: string; revenue: number }[]>([]);
  const [ordersData, setOrdersData] = useState<{ date: string; orders: number }[]>([]);
  const [categoryData, setCategoryData] = useState<{ category: string; revenue: number; orders: number }[]>([]);
  const [topProducts, setTopProducts] = useState<{ product: { name: string }; sold: number; revenue: number }[]>([]);

  const filters: ReportFilters = {
    period,
    startDate: period === "custom" ? startDate : undefined,
    endDate: period === "custom" ? endDate : undefined,
  };

  useEffect(() => {
    async function load() {
      const [s, revenue, orders, categories, top] = await Promise.all([
        reportRepository.getDashboardStats(),
        reportRepository.getRevenueChart(filters),
        reportRepository.getOrdersChart(filters),
        reportRepository.getSalesByCategory(filters),
        reportRepository.getTopProducts(8),
      ]);
      setStats(s);
      setRevenueData(revenue);
      setOrdersData(orders);
      setCategoryData(categories);
      setTopProducts(top);
    }
    load();
  }, [period, startDate, endDate]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-navy">Reports</h1>
          <p className="text-sm text-navy/60">Analytics and business insights</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {PERIODS.map((p) => (
            <Button
              key={p.value}
              variant={period === p.value ? "emerald" : "outline"}
              size="sm"
              onClick={() => setPeriod(p.value)}
            >
              {p.label}
            </Button>
          ))}
        </div>
      </div>

      {period === "custom" && (
        <div className="flex gap-3">
          <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
      )}

      {stats && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatsCard title="Revenue" value={formatPrice(stats.totalRevenue)} icon={IndianRupee} variant="emerald" />
          <StatsCard title="Orders" value={stats.totalOrders} icon={ShoppingCart} />
          <StatsCard title="Customers" value={stats.totalCustomers} icon={Users} variant="gold" />
          <StatsCard title="Products" value={stats.totalProducts} icon={Package} />
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Revenue Over Time">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8DFD0" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v) => formatPrice(Number(v))} />
              <Area type="monotone" dataKey="revenue" stroke="#1F6B5C" fill="#1F6B5C20" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Orders Over Time">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ordersData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8DFD0" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="orders" fill="#1B2A4A" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Sales by Category">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="revenue"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={(props) => `${props.name ?? ""} (${((props.percent ?? 0) * 100).toFixed(0)}%)`}
              >
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => formatPrice(Number(v))} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Top Selling Products">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts.map((p) => ({ name: p.product.name.slice(0, 20), revenue: p.revenue, sold: p.sold }))} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E8DFD0" />
              <XAxis type="number" tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => formatPrice(Number(v))} />
              <Bar dataKey="revenue" fill="#C9A962" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
