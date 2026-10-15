"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Product } from "@/lib/models";
import { ProductImage } from "@/components/ui/product-image";
import { ProductPriceFromProduct, productHasDiscount } from "@/components/storefront/ProductPrice";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getDiscountPercent } from "@/lib/utils";

type PothysOurCollectionsProps = {
  products: Product[];
};

export function PothysOurCollections({ products }: PothysOurCollectionsProps) {
  const scroller = useRef<HTMLDivElement>(null);

  const scroll = (dir: -1 | 1) => {
    scroller.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  if (!products.length) return null;

  return (
    <section className="bg-white border-b border-neutral-100 py-10 sm:py-14">
      <div className="container-premium">
        <div className="grid lg:grid-cols-[minmax(0,240px)_1fr] gap-8 lg:gap-12 items-start">
          <div className="text-center lg:text-left lg:pt-4">
            <div className="relative h-14 w-14 mx-auto lg:mx-0 mb-4 rounded-full overflow-hidden ring-2 ring-gold/50 ring-offset-2 ring-offset-white">
              <Image src="/logo.jpeg" alt="NAVI" fill className="object-cover" sizes="56px" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-navy leading-tight">Our Collections</h2>
            <p className="text-sm text-navy/55 mt-3 leading-relaxed max-w-xs mx-auto lg:mx-0">
              Experience premium Indian craftsmanship with NAVI Vastra Vihar&apos;s curated saree edit.
            </p>
            <Link
              href="/shop"
              className="inline-block mt-5 text-sm font-medium text-navy border-b border-navy pb-0.5 hover:text-[#c41e3a] hover:border-[#c41e3a] transition-colors"
            >
              Shop all collections
            </Link>
          </div>

          <div className="relative min-w-0">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="absolute left-0 top-[38%] z-10 h-10 w-10 rounded-full bg-white shadow-md border-neutral-200 hidden sm:flex -translate-x-1/2"
              onClick={() => scroll(-1)}
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="absolute right-0 top-[38%] z-10 h-10 w-10 rounded-full bg-white shadow-md border-neutral-200 hidden sm:flex translate-x-1/2"
              onClick={() => scroll(1)}
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>

            <div ref={scroller} className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory">
              {products.map((product) => {
                const hasDiscount = productHasDiscount(product);
                return (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    className="group shrink-0 w-[200px] sm:w-[220px] snap-start"
                  >
                    <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden">
                      <ProductImage
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="220px"
                      />
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {hasDiscount && (
                          <Badge variant="sale" className="rounded-none text-[10px] uppercase">
                            Sale
                          </Badge>
                        )}
                      </div>
                      <span className="absolute top-2 right-2 h-8 w-8 flex items-center justify-center bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <Heart className="h-3.5 w-3.5 text-navy/60" />
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-navy/85 line-clamp-2 leading-snug group-hover:text-[#c41e3a] transition-colors">
                      {product.name}
                    </p>
                    <div className="mt-1.5">
                      <ProductPriceFromProduct product={product} size="sm" showSave={false} />
                      {hasDiscount && (
                        <p className="text-[10px] text-navy/40 mt-0.5">
                          {getDiscountPercent(product.price, product.salePrice!)}% off
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
