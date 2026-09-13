"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Customer } from "@/lib/models";
import { customerRepository } from "@/lib/repositories";
import { formatPrice, formatDate } from "@/lib/utils";
import { DataTable, Column } from "@/components/admin/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    customerRepository.findAll().then(setCustomers);
  }, []);

  const filtered = useMemo(() => {
    if (!search) return customers;
    const q = search.toLowerCase();
    return customers.filter(
      (c) =>
        c.firstName.toLowerCase().includes(q) ||
        c.lastName.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q)
    );
  }, [customers, search]);

  const columns: Column<Customer>[] = [
    {
      key: "name",
      header: "Customer",
      cell: (c) => (
        <div>
          <p className="font-medium">{c.firstName} {c.lastName}</p>
          <p className="text-xs text-navy/50">{c.email}</p>
        </div>
      ),
    },
    {
      key: "phone",
      header: "Phone",
      cell: (c) => c.phone,
    },
    {
      key: "orders",
      header: "Orders",
      cell: (c) => c.totalOrders,
    },
    {
      key: "spent",
      header: "Total Spent",
      cell: (c) => formatPrice(c.totalSpent),
    },
    {
      key: "lastOrder",
      header: "Last Order",
      cell: (c) => (c.lastOrderDate ? formatDate(c.lastOrderDate) : "—"),
    },
    {
      key: "status",
      header: "Status",
      cell: (c) => <Badge variant={c.status === "active" ? "success" : "outline"}>{c.status}</Badge>,
    },
    {
      key: "actions",
      header: "",
      className: "w-16",
      cell: (c) => (
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/admin/customers/${c.id}`}>
            <Eye className="h-4 w-4" />
          </Link>
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-navy">Customers</h1>
        <p className="text-sm text-navy/60">{customers.length} registered customers</p>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search customers..."
      />
    </div>
  );
}
