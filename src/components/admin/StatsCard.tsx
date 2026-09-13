import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: string; positive?: boolean };
  variant?: "default" | "emerald" | "gold" | "warning";
}

const iconVariants = {
  default: "bg-navy/10 text-navy",
  emerald: "bg-emerald/10 text-emerald",
  gold: "bg-gold/20 text-gold-dark",
  warning: "bg-amber-100 text-amber-700",
};

export function StatsCard({ title, value, subtitle, icon: Icon, trend, variant = "default" }: StatsCardProps) {
  return (
    <Card className="border-beige bg-cream-light">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-navy/60">{title}</p>
            <p className="text-2xl font-serif font-bold text-navy">{value}</p>
            {subtitle && <p className="text-xs text-navy/50">{subtitle}</p>}
            {trend && (
              <p className={cn("text-xs font-medium", trend.positive ? "text-emerald" : "text-red-600")}>
                {trend.value}
              </p>
            )}
          </div>
          <div className={cn("rounded-lg p-3", iconVariants[variant])}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
