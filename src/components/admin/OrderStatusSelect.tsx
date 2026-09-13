"use client";

import { OrderStatus } from "@/lib/models";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const statuses: OrderStatus[] = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
  "returned",
];

const statusLabels: Record<OrderStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
  returned: "Returned",
};

const statusVariants: Record<OrderStatus, "warning" | "default" | "emerald" | "success" | "destructive" | "outline"> = {
  pending: "warning",
  confirmed: "default",
  processing: "default",
  shipped: "emerald",
  delivered: "success",
  cancelled: "destructive",
  returned: "outline",
};

interface OrderStatusSelectProps {
  value: OrderStatus;
  onChange: (status: OrderStatus) => void;
  disabled?: boolean;
  showBadge?: boolean;
}

export function OrderStatusSelect({ value, onChange, disabled, showBadge }: OrderStatusSelectProps) {
  if (showBadge) {
    return <Badge variant={statusVariants[value]}>{statusLabels[value]}</Badge>;
  }

  return (
    <Select value={value} onValueChange={(v) => onChange(v as OrderStatus)} disabled={disabled}>
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {statuses.map((status) => (
          <SelectItem key={status} value={status}>
            {statusLabels[status]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export { statusLabels, statusVariants };
