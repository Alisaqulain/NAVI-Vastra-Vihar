"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/lib/models";
import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductCarouselProps {
  products: Product[];
  className?: string;
}

export function ProductCarousel({ products, className }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  if (!products.length) return null;

  return (
    <div className={cn("relative group/carousel", className)}>
      <div
        ref={scrollRef}
        className="flex gap-5 sm:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-4 px-4 sm:mx-0 sm:px-0"
        style={{ scrollbarWidth: "none" }}
      >
        {products.map((product) => (
          <div key={product.id} className="snap-start shrink-0 w-[72vw] sm:w-[280px] lg:w-[300px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      {products.length > 3 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="hidden md:flex absolute -left-4 top-[38%] -translate-y-1/2 h-10 w-10 rounded-full bg-cream/95 border-beige shadow-md opacity-0 group-hover/carousel:opacity-100 transition-opacity"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="hidden md:flex absolute -right-4 top-[38%] -translate-y-1/2 h-10 w-10 rounded-full bg-cream/95 border-beige shadow-md opacity-0 group-hover/carousel:opacity-100 transition-opacity"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  );
}
