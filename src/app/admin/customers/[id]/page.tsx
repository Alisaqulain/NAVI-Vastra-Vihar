"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Customer, Order } from "@/lib/models";
import { customerRepository, orderRepository } from "@/lib/repositories";
import { formatPrice, formatDate } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, MapPin, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function CustomerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    async function load() {
      const c = await customerRepository.findById(id);
      setCustomer(c);
      if (c) {
        setNotes(c.notes ?? "");
        const allOrders = await orderRepository.findAll();
        setOrders(allOrders.filter((o) => o.userId === c.id || o.customerEmail === c.email));
      }
    }
    load();
  }, [id]);

  const saveNotes = async () => {
    if (!customer) return;
    const updated = await customerRepository.update(customer.id, { notes });
    if (updated) {
      setCustomer(updated);
      toast.success("Notes saved");
    }
  };

  if (!customer) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-navy">
          {customer.firstName} {customer.lastName}
        </h1>
        <p className="text-sm text-navy/60">Member since {formatDate(customer.registrationDate)}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-beige bg-cream-light">
          <CardContent className="p-4">
            <p className="text-sm text-navy/60">Total Orders</p>
            <p className="text-2xl font-serif font-bold">{customer.totalOrders}</p>
          </CardContent>
        </Card>
        <Card className="border-beige bg-cream-light">
          <CardContent className="p-4">
            <p className="text-sm text-navy/60">Total Spent</p>
            <p className="text-2xl font-serif font-bold">{formatPrice(customer.totalSpent)}</p>
          </CardContent>
        </Card>
        <Card className="border-beige bg-cream-light">
          <CardContent className="p-4">
            <p className="text-sm text-navy/60">Status</p>
            <Badge variant={customer.status === "active" ? "success" : "outline"} className="mt-1">
              {customer.status}
            </Badge>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-beige bg-cream-light">
          <CardHeader>
            <CardTitle className="text-lg">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><span className="text-navy/60">Email:</span> {customer.email}</p>
            <p><span className="text-navy/60">Phone:</span> {customer.phone}</p>
            {customer.lastOrderDate && (
              <p><span className="text-navy/60">Last Order:</span> {formatDate(customer.lastOrderDate)}</p>
            )}
          </CardContent>
        </Card>

        <Card className="border-beige bg-cream-light">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MapPin className="h-5 w-5" />
              Addresses
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {customer.addresses.length === 0 ? (
              <p className="text-sm text-navy/50">No addresses on file</p>
            ) : (
              customer.addresses.map((addr) => (
                <div key={addr.id} className="rounded-md border border-beige p-3 text-sm">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{addr.label}</p>
                    {addr.isDefault && <Badge variant="gold">Default</Badge>}
                  </div>
                  <p>{addr.fullName}</p>
                  <p>{addr.addressLine1}, {addr.city} {addr.pincode}</p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="border-beige bg-cream-light">
        <CardHeader>
          <CardTitle className="text-lg">Admin Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Internal notes about this customer..." />
          <Button variant="emerald" size="sm" onClick={saveNotes}>Save Notes</Button>
        </CardContent>
      </Card>

      <Card className="border-beige bg-cream-light">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <ShoppingBag className="h-5 w-5" />
            Order History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <p className="text-sm text-navy/50">No orders found</p>
          ) : (
            <div className="space-y-2">
              {orders.map((order) => (
                <Link
                  key={order.id}
                  href={`/admin/orders/${order.id}`}
                  className="flex items-center justify-between rounded-md border border-beige p-3 text-sm hover:bg-cream-dark/30"
                >
                  <div>
                    <p className="font-medium">{order.orderNumber}</p>
                    <p className="text-navy/60">{formatDate(order.createdAt)}</p>
                  </div>
                  <p className="font-medium">{formatPrice(order.total)}</p>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
