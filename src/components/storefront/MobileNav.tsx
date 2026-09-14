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
  { href: "/account/wishlist", icon: Heart, label: "Saved" },
  { href: "/account", icon: User, label: "Account" },
];

export function MobileNav() {
  const pathname = usePathname();
  const { itemCount } = useCart();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-cream/95 backdrop-blur-lg border-t border-beige/80 safe-area-pb shadow-[0_-4px_20px_rgba(27,42,74,0.08)]">
      <div className="flex items-center justify-around h-[60px] px-1">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 min-w-[56px] py-1 rounded-lg transition-colors relative",
                isActive ? "text-emerald" : "text-navy/45 active:text-emerald"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "stroke-[2.5]")} />
              <span className="text-[10px] font-medium">{label}</span>
              {href === "/cart" && itemCount > 0 && (
                <span className="absolute top-0 right-2 h-4 min-w-4 px-1 rounded-full bg-gold text-navy text-[9px] font-bold flex items-center justify-center">
                  {itemCount}
                </span>
              )}
              {isActive && <span className="absolute -bottom-0.5 h-0.5 w-5 rounded-full bg-emerald" />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
