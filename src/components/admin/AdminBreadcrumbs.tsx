"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const labelMap: Record<string, string> = {
  admin: "Dashboard",
  products: "Products",
  new: "New Product",
  orders: "Orders",
  customers: "Customers",
  inventory: "Inventory",
  categories: "Categories",
  coupons: "Coupons",
  reports: "Reports",
  settings: "Settings",
};

export function AdminBreadcrumbs({ className }: { className?: string }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length <= 1) return null;

  const crumbs = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;
    const isLast = index === segments.length - 1;
    const label = labelMap[segment] ?? (segment.startsWith("prod-") || segment.startsWith("ord-") || segment.startsWith("cust-") ? "Details" : segment);
    return { href, label, isLast };
  });

  return (
    <nav className={cn("flex items-center gap-1 text-sm text-navy/60", className)} aria-label="Breadcrumb">
      <Link href="/admin" className="flex items-center hover:text-emerald">
        <Home className="h-3.5 w-3.5" />
      </Link>
      {crumbs.slice(1).map((crumb) => (
        <span key={crumb.href} className="flex items-center gap-1">
          <ChevronRight className="h-3.5 w-3.5" />
          {crumb.isLast ? (
            <span className="font-medium text-navy">{crumb.label}</span>
          ) : (
            <Link href={crumb.href} className="hover:text-emerald">
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
