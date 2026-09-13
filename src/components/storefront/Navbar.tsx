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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { label: "All Sarees", href: "/shop?category=sarees" },
  { label: "Silk Sarees", href: "/shop?category=silk-sarees" },
  { label: "Banarasi", href: "/shop?category=banarasi-sarees" },
  { label: "Kanjeevaram", href: "/shop?category=kanjeevaram-sarees" },
  { label: "Wedding", href: "/shop?category=wedding-sarees" },
  { label: "Festive", href: "/shop?category=festive-sarees" },
];

export function Navbar() {
  const { itemCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { isAuthenticated } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-md border-b border-beige">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <nav className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="font-serif text-lg text-navy hover:text-emerald transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link href="/shop?category=new-arrivals" className="text-navy/70 hover:text-emerald" onClick={() => setMobileMenuOpen(false)}>New Arrivals</Link>
                  <Link href="/about" className="text-navy/70 hover:text-emerald" onClick={() => setMobileMenuOpen(false)}>About</Link>
                  <Link href="/contact" className="text-navy/70 hover:text-emerald" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
                </nav>
              </SheetContent>
            </Sheet>

            <Link href="/" className="flex items-center gap-3 shrink-0">
              <Image src="/logo.jpeg" alt="NAVI Vastra Vihar" width={48} height={48} className="rounded-full" />
              <div className="hidden sm:block">
                <span className="font-serif text-xl font-semibold text-navy leading-none block">NAVI</span>
                <span className="text-[10px] tracking-[0.25em] text-emerald uppercase">Vastra Vihar</span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-navy/80 hover:text-emerald transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all hover:after:w-full"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-1 sm:gap-2">
              <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}>
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" asChild className="hidden sm:flex relative">
                <Link href="/account/wishlist">
                  <Heart className="h-5 w-5" />
                  {wishlistItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-emerald text-cream text-[10px] flex items-center justify-center">
                      {wishlistItems.length}
                    </span>
                  )}
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild className="relative">
                <Link href="/cart">
                  <ShoppingBag className="h-5 w-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gold text-navy text-[10px] font-bold flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href={isAuthenticated ? "/account" : "/account/login"}>
                  <User className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
