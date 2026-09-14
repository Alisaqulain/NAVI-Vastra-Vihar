"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Heart, ShoppingBag, User, Menu, ChevronDown } from "lucide-react";
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
  { label: "New Arrivals", href: "/shop?category=new-arrivals" },
  { label: "Sarees", href: "/shop?category=sarees" },
  { label: "Lehengas", href: "/shop?category=lehengas" },
  { label: "Suits", href: "/shop?category=suits" },
  { label: "Kurtis", href: "/shop?category=kurtis" },
  { label: "Dupattas", href: "/shop?category=dupattas" },
  { label: "Festive Wear", href: "/shop?category=festive-wear" },
  { label: "Party Wear", href: "/shop?category=party-wear" },
  { label: "Best Sellers", href: "/shop?category=best-sellers" },
];

export function Navbar() {
  const { itemCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { isAuthenticated, session, logout } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-md border-b border-beige/60">
        <div className="container-premium">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[min(100vw,320px)] bg-cream overflow-y-auto">
                <div className="mt-8 mb-6">
                  <Image src="/logo.jpeg" alt="NAVI" width={48} height={48} className="rounded-full mb-3" />
                  <p className="font-serif text-xl text-charcoal">NAVI Vastra Vihar</p>
                </div>
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="py-3 text-sm font-medium text-charcoal/80 hover:text-wine border-b border-beige/40 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link href="/about" className="py-3 text-sm text-charcoal/60 hover:text-wine" onClick={() => setMobileMenuOpen(false)}>About</Link>
                  <Link href="/contact" className="py-3 text-sm text-charcoal/60 hover:text-wine" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
                </nav>
              </SheetContent>
            </Sheet>

            <Link href="/" className="flex items-center gap-3 shrink-0">
              <Image src="/logo.jpeg" alt="NAVI Vastra Vihar" width={44} height={44} className="rounded-full" />
              <div className="hidden sm:block">
                <span className="font-serif text-lg font-medium text-charcoal leading-none block tracking-wide">NAVI</span>
                <span className="text-[9px] tracking-[0.3em] text-charcoal/50 uppercase">Vastra Vihar</span>
              </div>
            </Link>

            <nav className="hidden xl:flex items-center gap-5">
              {navLinks.slice(0, 7).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[13px] font-medium text-charcoal/75 hover:text-wine transition-colors link-underline pb-0.5"
                >
                  {link.label}
                </Link>
              ))}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-0.5 text-[13px] font-medium text-charcoal/75 hover:text-wine transition-colors outline-none">
                  More <ChevronDown className="h-3.5 w-3.5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[160px]">
                  {navLinks.slice(7).map((link) => (
                    <DropdownMenuItem key={link.href} asChild>
                      <Link href={link.href}>{link.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>

            <div className="flex items-center gap-0.5 sm:gap-1">
              <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)} aria-label="Search">
                <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </Button>
              <Button variant="ghost" size="icon" asChild className="hidden sm:flex relative" aria-label="Wishlist">
                <Link href="/account/wishlist">
                  <Heart className="h-[18px] w-[18px]" strokeWidth={1.5} />
                  {wishlistItems.length > 0 && (
                    <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-wine text-cream text-[10px] flex items-center justify-center">
                      {wishlistItems.length}
                    </span>
                  )}
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="relative" onClick={() => setCartOpen(true)} aria-label="Shopping bag">
                <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-gold text-charcoal text-[10px] font-semibold flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Account">
                    <User className="h-[18px] w-[18px]" strokeWidth={1.5} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[180px]">
                  {isAuthenticated ? (
                    <>
                      <DropdownMenuItem disabled className="text-xs text-charcoal/50">
                        {session?.user.firstName} {session?.user.lastName}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild><Link href="/account">My Account</Link></DropdownMenuItem>
                      <DropdownMenuItem asChild><Link href="/account/orders">Orders</Link></DropdownMenuItem>
                      <DropdownMenuItem asChild><Link href="/account/wishlist">Wishlist</Link></DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout}>Sign Out</DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem asChild><Link href="/account/login">Sign In</Link></DropdownMenuItem>
                      <DropdownMenuItem asChild><Link href="/account/register">Create Account</Link></DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </>
  );
}
