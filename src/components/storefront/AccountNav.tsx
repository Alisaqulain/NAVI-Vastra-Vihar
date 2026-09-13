"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/account", label: "Overview" },
  { href: "/account/profile", label: "Profile" },
  { href: "/account/addresses", label: "Addresses" },
  { href: "/account/orders", label: "Orders" },
  { href: "/account/wishlist", label: "Wishlist" },
];

export function AccountNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-2 border-b border-beige pb-4 mb-8">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "px-4 py-2 rounded-md text-sm font-medium transition-colors",
            pathname === link.href
              ? "bg-emerald text-cream"
              : "text-navy/70 hover:bg-cream-dark hover:text-navy"
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
