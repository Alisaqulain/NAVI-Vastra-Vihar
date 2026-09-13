"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Coupon } from "@/lib/models";
import { couponRepository } from "@/lib/repositories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface CouponFormProps {
  coupon?: Coupon;
  mode: "create" | "edit";
}

const defaultValues = {
  code: "",
  description: "",
  discountType: "percentage" as const,
  discountValue: 10,
  minimumOrderValue: 1000,
  maximumDiscount: undefined as number | undefined,
  startDate: new Date().toISOString().split("T")[0],
  expiryDate: "",
  usageLimit: 100,
  status: "active" as const,
};

export function CouponForm({ coupon, mode }: CouponFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(
    coupon
      ? {
          ...coupon,
          startDate: coupon.startDate.split("T")[0],
          expiryDate: coupon.expiryDate.split("T")[0],
        }
      : defaultValues
  );

  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        code: form.code.toUpperCase(),
        description: form.description,
        discountType: form.discountType,
        discountValue: form.discountValue,
        minimumOrderValue: form.minimumOrderValue,
        maximumDiscount: form.maximumDiscount || undefined,
        startDate: new Date(form.startDate).toISOString(),
        expiryDate: new Date(form.expiryDate).toISOString(),
        usageLimit: form.usageLimit,
        status: form.status,
      };

      if (mode === "create") {
        await couponRepository.create(payload);
        toast.success("Coupon created");
      } else if (coupon) {
        await couponRepository.update(coupon.id, payload);
        toast.success("Coupon updated");
      }
      router.push("/admin/coupons");
    } catch {
      toast.error("Failed to save coupon");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{mode === "create" ? "New Coupon" : "Edit Coupon"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="code">Coupon Code</Label>
              <Input
                id="code"
                value={form.code}
                onChange={(e) => update("code", e.target.value.toUpperCase())}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={(v) => update("status", v as "active" | "inactive")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Discount Type</Label>
              <Select
                value={form.discountType}
                onValueChange={(v) => update("discountType", v as "percentage" | "fixed")}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage</SelectItem>
                  <SelectItem value="fixed">Fixed Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="discountValue">
                Discount Value {form.discountType === "percentage" ? "(%)" : "(₹)"}
              </Label>
              <Input
                id="discountValue"
                type="number"
                min={0}
                value={form.discountValue}
                onChange={(e) => update("discountValue", Number(e.target.value))}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minOrder">Minimum Order (₹)</Label>
              <Input
                id="minOrder"
                type="number"
                min={0}
                value={form.minimumOrderValue}
                onChange={(e) => update("minimumOrderValue", Number(e.target.value))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxDiscount">Max Discount (₹)</Label>
              <Input
                id="maxDiscount"
                type="number"
                min={0}
                value={form.maximumDiscount ?? ""}
                onChange={(e) => update("maximumDiscount", e.target.value ? Number(e.target.value) : undefined)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={form.startDate}
                onChange={(e) => update("startDate", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                type="date"
                value={form.expiryDate}
                onChange={(e) => update("expiryDate", e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="usageLimit">Usage Limit</Label>
            <Input
              id="usageLimit"
              type="number"
              min={1}
              value={form.usageLimit}
              onChange={(e) => update("usageLimit", Number(e.target.value))}
              required
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" variant="emerald" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {mode === "create" ? "Create Coupon" : "Save Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
