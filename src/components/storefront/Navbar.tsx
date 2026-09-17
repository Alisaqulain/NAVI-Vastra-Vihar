"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Heart, ShoppingBag, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { useAuth } from "@/context/auth-context";
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

const navLinks = [
  { label: "Sarees", href: "/shop?category=sarees" },
  { label: "Lehengas", href: "/shop?category=lehengas" },
  { label: "Suits", href: "/shop?category=suits" },
  { label: "Kurtis", href: "/shop?category=kurtis" },
  { label: "Dupattas", href: "/shop?category=dupattas" },
  { label: "New Arrivals", href: "/shop?category=new-arrivals" },
  { label: "Festive Wear", href: "/shop?category=festive-wear" },
  { label: "Sale", href: "/shop?category=best-sellers" },
  { label: "Best Sellers", href: "/shop?category=best-sellers" },
];

type NavbarProps = {
  /** Slightly tighter row when header is animating away */
  compact?: boolean;
};

export function Navbar({ compact = false }: NavbarProps) {
  const { itemCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { isAuthenticated, session, logout } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-cream-light/98 backdrop-blur-md border-b border-beige/70 supports-[backdrop-filter]:bg-cream-light/90">
        {/* Top row — logo · search · icons */}
        <div className="container-premium">
          <div
            className={`flex items-center gap-3 sm:gap-4 transition-[height] duration-500 ${
              compact ? "h-[58px] lg:h-[60px]" : "h-16 lg:h-[68px]"
            }`}
          >
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden shrink-0">
                <Button variant="ghost" size="icon" aria-label="Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[min(100vw,320px)] bg-cream-light overflow-y-auto">
                <div className="mt-6 mb-8 flex items-center gap-3">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden ring-1 ring-gold/50">
                    <Image src="/logo.jpeg" alt="NAVI" fill className="object-cover" sizes="48px" />
                  </div>
                  <div>
                    <p className="font-serif text-xl text-navy">NAVI</p>
                    <p className="text-[9px] tracking-[0.25em] text-emerald uppercase">Vastra Vihar</p>
                  </div>
                </div>
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href + link.label}
                      href={link.href}
                      className="py-3 text-sm text-navy/80 border-b border-beige/50 hover:text-emerald"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>

            <Link href="/" className="flex items-center gap-2 min-w-0 flex-1 overflow-hidden lg:flex-none">
              <div className="relative h-9 w-9 sm:h-11 sm:w-11 rounded-full overflow-hidden ring-1 ring-gold/45 shrink-0">
                <Image src="/logo.jpeg" alt="NAVI Vastra Vihar" fill className="object-cover" sizes="44px" />
              </div>
              <div className="min-w-0 lg:block">
                <span className="font-serif text-base sm:text-xl text-navy leading-none tracking-wide block truncate">NAVI</span>
                <span className="text-[7px] sm:text-[8px] tracking-[0.22em] sm:tracking-[0.28em] text-navy/45 uppercase mt-0.5 hidden min-[360px]:block truncate">
                  Vastra Vihar
                </span>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="hidden md:flex flex-1 max-w-xl mx-auto items-center gap-3 rounded-full bg-cream-dark/80 border border-beige/80 px-5 py-2.5 text-sm text-navy/45 hover:border-gold/40 transition-colors"
            >
              <span className="flex-1 text-left">Search for sarees, lehengas & more</span>
              <Search className="h-4 w-4 text-navy/50 shrink-0" strokeWidth={1.5} />
            </button>

            <Button variant="ghost" size="icon" className="md:hidden shrink-0" onClick={() => setSearchOpen(true)} aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>

            <div className="flex items-center gap-0 shrink-0 ml-auto md:ml-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hidden sm:flex h-10 w-10" aria-label="Account">
                    <User className="h-[18px] w-[18px]" strokeWidth={1.5} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[180px]">
                  {isAuthenticated ? (
                    <>
                      <DropdownMenuItem disabled className="text-xs text-navy/50">
                        {session?.user.firstName} {session?.user.lastName}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild><Link href="/account">My Account</Link></DropdownMenuItem>
                      <DropdownMenuItem asChild><Link href="/account/orders">Orders</Link></DropdownMenuItem>
                      <DropdownMenuItem onClick={logout}>Sign Out</DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem asChild><Link href="/account/login">Sign In</Link></DropdownMenuItem>
                      <DropdownMenuItem asChild><Link href="/account/register">Register</Link></DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="ghost" size="icon" asChild className="relative hidden sm:flex" aria-label="Wishlist">
                <Link href="/account/wishlist">
                  <Heart className="h-[18px] w-[18px]" strokeWidth={1.5} />
                  {wishlistItems.length > 0 && (
                    <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-emerald text-cream text-[10px] flex items-center justify-center">
                      {wishlistItems.length}
                    </span>
                  )}
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="relative h-10 w-10" onClick={() => setCartOpen(true)} aria-label="Bag">
                <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-gold text-navy text-[10px] font-bold flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="md:hidden container-premium pb-3 -mt-1">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="flex w-full items-center gap-2 rounded-full bg-cream-dark/90 border border-beige/80 px-4 py-2.5 text-sm text-navy/45"
          >
            <Search className="h-4 w-4 shrink-0" strokeWidth={1.5} />
            <span className="truncate text-left">Search sarees, lehengas & more</span>
          </button>
        </div>

        {/* Nav row — desktop */}
        <div className="hidden lg:block border-t border-beige/50 bg-cream-light/95">
          <div className="container-premium">
            <nav className="flex items-center justify-center gap-6 xl:gap-8 py-3 overflow-x-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="text-[11px] xl:text-xs font-medium tracking-[0.12em] uppercase text-navy/70 hover:text-emerald whitespace-nowrap transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/about" className="text-[11px] xl:text-xs font-medium tracking-[0.12em] uppercase text-navy/50 hover:text-emerald whitespace-nowrap">
                About
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
