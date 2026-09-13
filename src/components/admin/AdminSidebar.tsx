"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Warehouse,
  FolderTree,
  Ticket,
  BarChart3,
  Settings,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/inventory", label: "Inventory", icon: Warehouse },
  { href: "/admin/categories", label: "Categories", icon: FolderTree },
  { href: "/admin/coupons", label: "Coupons", icon: Ticket },
  { href: "/admin/reports", label: "Reports", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

interface AdminSidebarProps {
  mobile?: boolean;
  onClose?: () => void;
}

export function AdminSidebar({ mobile, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <aside
      className={cn(
        "flex h-full flex-col bg-navy text-cream",
        mobile ? "w-full" : "hidden w-64 shrink-0 lg:flex"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-navy-light px-4">
        <Link href="/admin" className="flex items-center gap-3" onClick={onClose}>
          <Image src="/logo.jpeg" alt="NAVI Vastra Vihar" width={36} height={36} className="rounded-full" />
          <div>
            <p className="font-serif text-sm font-semibold leading-tight">NAVI Vastra Vihar</p>
            <p className="text-[10px] uppercase tracking-wider text-gold">Admin CRM</p>
          </div>
        </Link>
        {mobile && onClose && (
          <button onClick={onClose} className="rounded-md p-1 hover:bg-navy-light lg:hidden">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-emerald text-cream"
                  : "text-cream/70 hover:bg-navy-light hover:text-cream"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-navy-light p-4">
        <p className="text-xs text-cream/50">Since 1978 · Handloom Excellence</p>
      </div>
    </aside>
  );
}
