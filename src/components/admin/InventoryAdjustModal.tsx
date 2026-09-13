"use client";

import { useState } from "react";
import { Inventory } from "@/lib/models";
import { inventoryRepository } from "@/lib/repositories";
import { getSession } from "@/lib/auth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface InventoryAdjustModalProps {
  item: Inventory | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  mode?: "adjust" | "threshold";
}

export function InventoryAdjustModal({
  item,
  open,
  onOpenChange,
  onSuccess,
  mode = "adjust",
}: InventoryAdjustModalProps) {
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [type, setType] = useState<"increase" | "decrease" | "adjustment">("increase");
  const [reason, setReason] = useState("");
  const [threshold, setThreshold] = useState(5);

  const handleOpen = (isOpen: boolean) => {
    if (isOpen && item) {
      setThreshold(item.lowStockThreshold);
      setQuantity(0);
      setReason("");
    }
    onOpenChange(isOpen);
  };

  const handleSubmit = async () => {
    if (!item) return;
    setLoading(true);
    try {
      const session = getSession(true);
      const createdBy = session?.user.email ?? "admin";

      if (mode === "threshold") {
        await inventoryRepository.setThreshold(item.productId, threshold);
        toast.success("Threshold updated");
      } else {
        const qty = type === "decrease" ? -Math.abs(quantity) : Math.abs(quantity);
        if (qty === 0) {
          toast.error("Enter a valid quantity");
          return;
        }
        await inventoryRepository.adjustStock(item.productId, qty, type, reason || "Manual adjustment", createdBy);
        toast.success("Stock adjusted");
      }
      onSuccess();
      onOpenChange(false);
    } catch {
      toast.error("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "threshold" ? "Set Threshold" : "Adjust Stock"}</DialogTitle>
          <DialogDescription>
            {item?.productName} · SKU: {item?.sku} · Current: {item?.currentStock}
          </DialogDescription>
        </DialogHeader>

        {mode === "threshold" ? (
          <div className="space-y-2">
            <Label htmlFor="threshold">Low Stock Threshold</Label>
            <Input
              id="threshold"
              type="number"
              min={0}
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Adjustment Type</Label>
              <Select value={type} onValueChange={(v) => setType(v as typeof type)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="increase">Increase</SelectItem>
                  <SelectItem value="decrease">Decrease</SelectItem>
                  <SelectItem value="adjustment">Set Exact</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min={0}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Reason</Label>
              <Textarea id="reason" value={reason} onChange={(e) => setReason(e.target.value)} rows={2} />
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="emerald" onClick={handleSubmit} disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
