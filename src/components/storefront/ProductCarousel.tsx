"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/lib/models";
import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useHorizontalAutoScroll } from "@/hooks/use-horizontal-auto-scroll";
import { SLIDER_AUTO_INTERVAL_MS } from "@/lib/constants/carousel";

interface ProductCarouselProps {
  products: Product[];
  className?: string;
  /** Subtle lift on hover */
  premium3d?: boolean;
  /** Auto-advance horizontal scroll */
  autoScroll?: boolean;
  autoScrollIntervalMs?: number;
}

export function ProductCarousel({
  products,
  className,
  premium3d,
  autoScroll = true,
  autoScrollIntervalMs = SLIDER_AUTO_INTERVAL_MS,
}: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { pause, resume } = useHorizontalAutoScroll(scrollRef, {
    enabled: autoScroll && products.length > 1,
    intervalMs: autoScrollIntervalMs,
  });

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  if (!products.length) return null;

  return (
    <div
      className={cn("relative group/carousel overflow-hidden", className)}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onTouchStart={pause}
      onTouchEnd={resume}
      onFocusCapture={pause}
      onBlurCapture={resume}
    >
      <div
        ref={scrollRef}
        className="flex gap-3.5 sm:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-3.5 px-3.5 sm:mx-0 sm:px-0"
        style={{ scrollbarWidth: "none" }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            data-auto-scroll-item
            className={cn(
              "snap-start shrink-0 w-[46vw] min-w-[148px] max-w-[200px] sm:w-[280px] sm:max-w-none lg:w-[300px]",
              premium3d &&
                "transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(27,42,74,0.12)]"
            )}
          >
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
