"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { AccountNav } from "@/components/storefront/AccountNav";
import { ProductGrid } from "@/components/storefront/ProductGrid";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { useWishlist } from "@/context/wishlist-context";

export default function WishlistPage() {
  const { isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const { items: products, isLoaded } = useWishlist();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push("/account/login");
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !isLoaded) return null;

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <h1 className="font-serif text-3xl text-navy mb-6">My Wishlist</h1>
      <AccountNav />

      {products.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="h-12 w-12 mx-auto text-navy/20 mb-4" />
          <p className="text-navy/60 mb-4">Your wishlist is empty.</p>
          <Button asChild variant="emerald">
            <Link href="/shop">Explore Collection</Link>
          </Button>
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}
