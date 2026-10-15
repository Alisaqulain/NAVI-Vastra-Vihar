"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Heart, ShoppingBag, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { useAuth } from "@/context/auth-context";
import { BrandLogo } from "@/components/storefront/BrandLogo";
import { SearchDialog } from "./SearchDialog";
import { CartDrawer } from "./CartDrawer";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Sarees", href: "/shop?category=sarees" },
  { label: "Lehengas", href: "/shop?category=lehengas" },
  { label: "Suits", href: "/shop?category=suits" },
  { label: "Kurtis", href: "/shop?category=kurtis" },
  { label: "Dupattas", href: "/shop?category=dupattas" },
  { label: "New Arrivals", href: "/shop?category=new-arrivals" },
  { label: "Festive Wear", href: "/shop?category=festive-wear" },
  { label: "Best Sellers", href: "/shop?category=best-sellers" },
];

function IconBadge({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <span className="absolute -top-0.5 -right-0.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-gold text-navy text-[9px] font-bold px-0.5">
      {count > 9 ? "9+" : count}
    </span>
  );
}

type NavbarProps = { compact?: boolean };

export function Navbar({ compact = false }: NavbarProps) {
  const { itemCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { isAuthenticated, session, logout } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logoSize = compact ? "xs" : "sm";

  return (
    <>
      <header className="bg-white/98 backdrop-blur-md border-b border-neutral-200/80">
        <div className="container-premium">
          <div
            className={cn(
              "flex items-center gap-2 sm:gap-3 transition-[height,padding] duration-300",
              compact ? "h-12 py-0" : "h-14 sm:h-[52px]"
            )}
          >
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden shrink-0">
                <Button variant="ghost" size="icon" className="h-9 w-9 -ml-1" aria-label="Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[min(100vw,300px)] p-0 bg-white">
                <div className="p-5 border-b border-neutral-100">
                  <BrandLogo size="sm" />
                </div>
                <nav className="px-3 py-2 max-h-[70vh] overflow-y-auto">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block py-3 text-sm text-navy/85 border-b border-neutral-100"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>

            <BrandLogo
              size={logoSize}
              className={cn("shrink-0 transition-all duration-300", compact ? "[&_.brand-text]:hidden" : "[&_.brand-text]:hidden sm:[&_.brand-text]:block")}
            />

            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="hidden md:flex flex-1 max-w-md mx-2 lg:mx-4 items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50/80 px-3 py-1.5 text-xs text-navy/45 hover:border-gold/35 transition-colors min-w-0"
            >
              <Search className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate text-left">Search sarees, silk &amp; more</span>
            </button>

            <div className="flex items-center gap-0 ml-auto shrink-0">
              <Button variant="ghost" size="icon" className="h-9 w-9 md:hidden" onClick={() => setSearchOpen(true)} aria-label="Search">
                <Search className="h-[17px] w-[17px]" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hidden sm:flex h-9 w-9" aria-label="Account">
                    <User className="h-[17px] w-[17px]" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {isAuthenticated ? (
                    <>
                      <DropdownMenuItem disabled className="text-xs">
                        {session?.user.firstName} {session?.user.lastName}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/account">Account</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/account/orders">Orders</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={logout}>Sign out</DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/account/login">Sign in</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/account/register">Register</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="ghost" size="icon" asChild className="relative hidden sm:flex h-9 w-9">
                <Link href="/account/wishlist" aria-label="Wishlist">
                  <Heart className="h-[17px] w-[17px]" />
                  <IconBadge count={wishlistItems.length} />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="relative h-9 w-9" onClick={() => setCartOpen(true)} aria-label="Cart">
                <ShoppingBag className="h-[17px] w-[17px]" />
                <IconBadge count={itemCount} />
              </Button>
            </div>
          </div>
        </div>

        <div className={cn("hidden md:block border-t border-neutral-100 transition-all duration-300", compact ? "py-1" : "py-1.5")}>
          <div className="container-premium">
            <nav className="flex items-center justify-center gap-4 lg:gap-6 overflow-x-auto scrollbar-hide">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[11px] lg:text-xs font-medium text-navy/70 hover:text-emerald whitespace-nowrap py-0.5"
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/shop" className="text-[11px] lg:text-xs font-semibold text-wine whitespace-nowrap">
                Shop all
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </>
  );
}
