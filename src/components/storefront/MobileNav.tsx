"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid3X3, ShoppingBag, Heart, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/cart-context";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/shop", icon: Grid3X3, label: "Shop" },
  { href: "/cart", icon: ShoppingBag, label: "Cart" },
  { href: "/account/wishlist", icon: Heart, label: "Wishlist" },
  { href: "/account", icon: User, label: "Account" },
];

export function MobileNav() {
  const pathname = usePathname();
  const { itemCount } = useCart();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-cream/95 backdrop-blur-md border-t border-beige safe-area-pb">
      <div className="flex items-center justify-around h-16">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] transition-colors relative",
                isActive ? "text-emerald" : "text-navy/50"
              )}
            >
              <Icon className="h-5 w-5" />
              {label}
              {href === "/cart" && itemCount > 0 && (
                <span className="absolute top-0 right-1 h-4 w-4 rounded-full bg-gold text-navy text-[9px] font-bold flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
