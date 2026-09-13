"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Order, OrderStatus } from "@/lib/models";
import { orderRepository } from "@/lib/repositories";
import { formatPrice, formatDate } from "@/lib/utils";
import { DataTable, Column } from "@/components/admin/DataTable";
import { OrderStatusSelect, statusLabels, statusVariants } from "@/components/admin/OrderStatusSelect";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye } from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");

  useEffect(() => {
    orderRepository.findAll().then(setOrders);
  }, []);

  const filtered = useMemo(() => {
    let result = orders;
    if (statusFilter !== "all") result = result.filter((o) => o.orderStatus === statusFilter);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q) ||
          o.customerEmail.toLowerCase().includes(q)
      );
    }
    return result;
  }, [orders, search, statusFilter]);

  const columns: Column<Order>[] = [
    {
      key: "orderNumber",
      header: "Order",
      cell: (o) => (
        <div>
          <p className="font-medium">{o.orderNumber}</p>
          <p className="text-xs text-navy/50">{formatDate(o.createdAt)}</p>
        </div>
      ),
    },
    {
      key: "customer",
      header: "Customer",
      cell: (o) => (
        <div>
          <p>{o.customerName}</p>
          <p className="text-xs text-navy/50">{o.customerEmail}</p>
        </div>
      ),
    },
    {
      key: "items",
      header: "Items",
      cell: (o) => o.items.length,
    },
    {
      key: "total",
      header: "Total",
      cell: (o) => formatPrice(o.total),
    },
    {
      key: "payment",
      header: "Payment",
      cell: (o) => (
        <Badge variant={o.paymentStatus === "paid" ? "success" : o.paymentStatus === "failed" ? "destructive" : "warning"}>
          {o.paymentStatus}
        </Badge>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (o) => <OrderStatusSelect value={o.orderStatus} onChange={() => {}} showBadge />,
    },
    {
      key: "actions",
      header: "",
      className: "w-16",
      cell: (o) => (
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/admin/orders/${o.id}`}>
            <Eye className="h-4 w-4" />
          </Link>
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-navy">Orders</h1>
        <p className="text-sm text-navy/60">{orders.length} orders total</p>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search orders..."
        actions={
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as OrderStatus | "all")}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {(["pending", "confirmed", "processing", "shipped", "delivered", "cancelled", "returned"] as OrderStatus[]).map(
                (s) => (
                  <SelectItem key={s} value={s}>
                    {statusLabels[s]}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        }
      />
    </div>
  );
}
