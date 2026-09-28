"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HERO_SLIDES } from "@/lib/constants/images";
import { useAutoAdvance } from "@/hooks/use-auto-advance";
import { cn } from "@/lib/utils";

const QUICK_CATEGORIES = [
  { label: "Sarees", href: "/shop?category=sarees" },
  { label: "Lehengas", href: "/shop?category=lehengas" },
  { label: "New in", href: "/shop?category=new-arrivals" },
  { label: "Sale", href: "/shop?category=best-sellers" },
] as const;

export function CommerceHero() {
  const [paused, setPaused] = useState(false);
  const { active, go, goTo } = useAutoAdvance(HERO_SLIDES.length, undefined, paused);
  const slide = HERO_SLIDES[active];

  return (
    <section
      className="relative overflow-hidden bg-navy-dark"
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
      aria-label="Store highlights"
    >
      <div className="relative h-[min(88dvh,640px)] sm:h-[min(85vh,720px)] lg:h-[min(90vh,820px)]">
        {HERO_SLIDES.map((s, i) => (
          <div
            key={s.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-[900ms] ease-out",
              i === active ? "opacity-100" : "opacity-0"
            )}
            aria-hidden={i !== active}
          >
            <Image
              src={s.image}
              alt={i === active ? s.imageAlt : ""}
              fill
              priority={i === 0}
              className="object-cover object-center"
              style={{ objectPosition: s.objectPosition }}
              sizes="100vw"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/85 via-navy/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/70 via-transparent to-navy/20 pointer-events-none lg:hidden" />

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full border-cream/30 bg-navy/50 text-cream hover:bg-navy/70"
          onClick={() => go(-1)}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full border-cream/30 bg-navy/50 text-cream hover:bg-navy/70"
          onClick={() => go(1)}
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>

        <div className="container-premium relative z-10 h-full flex items-end sm:items-center pb-8 sm:pb-0">
          <div className="w-full max-w-xl">
            <div key={slide.id} className="hero-copy-enter">
              <span className="inline-flex rounded-full bg-gold/20 text-gold-light px-2.5 py-1 text-[10px] sm:text-xs font-semibold mb-3">
                {String(active + 1).padStart(2, "0")} / {String(HERO_SLIDES.length).padStart(2, "0")} · Since 1978
              </span>

              <h1 className="font-serif text-2xl min-[380px]:text-3xl sm:text-4xl lg:text-[2.75rem] text-cream leading-snug text-balance mb-3">
                {slide.title}
              </h1>
              <p className="text-cream/80 text-sm sm:text-base leading-relaxed mb-6 max-w-md">
                {slide.subtitle}
              </p>

              <Button asChild variant="gold" className="rounded-full h-11 sm:h-12 w-full sm:w-auto px-8 text-sm font-semibold mb-3">
                <Link href={slide.cta.href}>{slide.cta.label}</Link>
              </Button>
              <Link
                href="/shop"
                className="inline-flex items-center gap-1 text-sm font-medium text-gold-light hover:text-gold transition-colors"
              >
                Browse all products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="flex gap-1.5 mt-6 sm:mt-8">
              {HERO_SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  aria-label={s.title}
                  onClick={() => goTo(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500",
                    i === active ? "w-8 bg-gold" : "w-2 bg-cream/35 hover:bg-cream/55"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-beige/20 bg-cream-light">
        <div className="container-premium py-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-0.5">
            {QUICK_CATEGORIES.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="snap-start shrink-0 rounded-full border border-beige bg-cream px-4 py-2 text-xs sm:text-sm font-medium text-navy hover:border-emerald hover:text-emerald transition-colors"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
