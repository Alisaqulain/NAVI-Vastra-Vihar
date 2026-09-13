import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-navy text-cream",
        emerald: "border-transparent bg-emerald text-cream",
        gold: "border-transparent bg-gold text-navy",
        outline: "border-beige text-navy",
        sale: "border-transparent bg-red-600 text-white",
        success: "border-transparent bg-emerald/10 text-emerald",
        warning: "border-transparent bg-amber-100 text-amber-700",
        destructive: "border-transparent bg-red-100 text-red-700",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
