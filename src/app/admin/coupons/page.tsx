"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Coupon } from "@/lib/models";
import { couponRepository } from "@/lib/repositories";
import { formatDate } from "@/lib/utils";
import { DataTable, Column } from "@/components/admin/DataTable";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { CouponForm } from "@/components/admin/CouponForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editCoupon, setEditCoupon] = useState<Coupon | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const load = () => couponRepository.findAll().then(setCoupons);

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    await couponRepository.delete(deleteId);
    toast.success("Coupon deleted");
    setDeleteId(null);
    load();
  };

  const columns: Column<Coupon>[] = [
    {
      key: "code",
      header: "Code",
      cell: (c) => <span className="font-mono font-bold">{c.code}</span>,
    },
    {
      key: "discount",
      header: "Discount",
      cell: (c) => (c.discountType === "percentage" ? `${c.discountValue}%` : `₹${c.discountValue}`),
    },
    {
      key: "minOrder",
      header: "Min Order",
      cell: (c) => `₹${c.minimumOrderValue}`,
    },
    {
      key: "usage",
      header: "Usage",
      cell: (c) => `${c.usedCount} / ${c.usageLimit}`,
    },
    {
      key: "expiry",
      header: "Expires",
      cell: (c) => formatDate(c.expiryDate),
    },
    {
      key: "status",
      header: "Status",
      cell: (c) => <Badge variant={c.status === "active" ? "emerald" : "outline"}>{c.status}</Badge>,
    },
    {
      key: "actions",
      header: "",
      className: "w-24",
      cell: (c) => (
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" onClick={() => setEditCoupon(c)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setDeleteId(c.id)}>
            <Trash2 className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-navy">Coupons</h1>
          <p className="text-sm text-navy/60">Manage discount codes and promotions</p>
        </div>
        <Button variant="emerald" onClick={() => setShowCreate(true)}>
          <Plus className="h-4 w-4" />
          Add Coupon
        </Button>
      </div>

      <DataTable columns={columns} data={coupons} emptyMessage="No coupons yet." />

      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Coupon</DialogTitle>
          </DialogHeader>
          <CouponForm mode="create" />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editCoupon} onOpenChange={(o) => !o && setEditCoupon(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Coupon</DialogTitle>
          </DialogHeader>
          {editCoupon && <CouponForm mode="edit" coupon={editCoupon} />}
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
        title="Delete Coupon"
        description="This coupon will no longer be available for customers."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        destructive
      />
    </div>
  );
}
