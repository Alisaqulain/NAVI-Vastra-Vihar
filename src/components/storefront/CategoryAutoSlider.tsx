"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Category } from "@/lib/models";
import { SectionHeading } from "./SectionHeading";
import { Button } from "@/components/ui/button";
import { useAutoAdvance } from "@/hooks/use-auto-advance";
import { SLIDER_AUTO_INTERVAL_MS } from "@/lib/constants/carousel";
import { cn } from "@/lib/utils";

type CategoryAutoSliderProps = {
  categories: Category[];
};

export function CategoryAutoSlider({ categories }: CategoryAutoSliderProps) {
  const [paused, setPaused] = useState(false);
  const { active, goTo } = useAutoAdvance(categories.length, SLIDER_AUTO_INTERVAL_MS, paused);

  if (!categories.length) return null;

  const current = categories[active];

  return (
    <section className="section-padding-sm bg-cream-light/50 border-y border-beige/40">
      <div className="container-premium">
        <SectionHeading subtitle="Collections" title="Shop by Category" viewAllHref="/shop" />

        <div
          className="flex flex-wrap justify-center gap-2 sm:gap-2.5 mb-6 sm:mb-8"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {categories.map((cat, i) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => goTo(i)}
              className={cn(
                "px-4 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 border",
                i === active
                  ? "bg-emerald text-cream border-emerald shadow-md"
                  : "bg-cream text-navy/70 border-beige hover:border-emerald/40 hover:text-emerald"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div
          className="grid lg:grid-cols-2 gap-4 sm:gap-6 items-stretch"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Link
            href={`/shop?category=${current.slug}`}
            className="group relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-auto lg:min-h-[420px] rounded-2xl sm:rounded-3xl overflow-hidden border border-beige shadow-lg"
          >
            {categories.map((cat, i) => (
              <div
                key={cat.id}
                className={cn(
                  "absolute inset-0 transition-opacity duration-[1200ms] ease-out",
                  i === active ? "opacity-100" : "opacity-0"
                )}
                aria-hidden={i !== active}
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={i === 0}
                />
              </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <p className="text-gold text-[10px] tracking-[0.25em] uppercase mb-2">Featured</p>
              <h3 className="font-serif text-3xl sm:text-4xl text-cream">{current.name}</h3>
              <p className="text-cream/65 text-sm mt-2">{current.productCount} styles</p>
            </div>
          </Link>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {categories.map((cat, i) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => goTo(i)}
                className={cn(
                  "group relative aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden text-left border transition-all duration-300",
                  i === active
                    ? "border-emerald ring-2 ring-emerald/30 shadow-lg scale-[1.02]"
                    : "border-beige/80 opacity-90 hover:opacity-100 hover:border-gold/40"
                )}
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover object-top"
                  sizes="200px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                <p className="absolute bottom-0 left-0 right-0 p-3 font-serif text-sm text-cream">{cat.name}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <Button asChild variant="gold" className="rounded-full px-8 h-11 gap-2">
            <Link href={`/shop?category=${current.slug}`}>
              Shop {current.name}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {categories.map((_, i) => (
            <button
              key={categories[i].id}
              type="button"
              aria-label={`Category ${i + 1}`}
              onClick={() => goTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === active ? "w-8 bg-emerald" : "w-2 bg-navy/15 hover:bg-navy/30"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
