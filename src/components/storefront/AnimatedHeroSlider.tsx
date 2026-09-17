"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_IMAGES, unsplash, SAREE_PHOTOS } from "@/lib/constants/images";
import { useAutoAdvance } from "@/hooks/use-auto-advance";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    id: "heritage",
    image: SITE_IMAGES.hero.main,
    title: "Timeless Heritage Sarees",
    subtitle: "Handloom silks, zari & navy weaves — curated since 1978.",
    cta: { label: "Shop Collection", href: "/shop" },
  },
  {
    id: "festive",
    image: SITE_IMAGES.hero.secondary,
    title: "Festive Season Edit",
    subtitle: "Pujo, Diwali & weddings — drapes for every celebration.",
    cta: { label: "Shop Festive", href: "/shop?category=festive-wear" },
  },
  {
    id: "bridal",
    image: SITE_IMAGES.hero.accent,
    title: "Bridal & Lehengas",
    subtitle: "Ceremony-ready looks with master-quality finish.",
    cta: { label: "Shop Lehengas", href: "/shop?category=lehengas" },
  },
  {
    id: "everyday",
    image: unsplash(SAREE_PHOTOS[4], 1400),
    title: "Everyday Elegance",
    subtitle: "Light georgette & cotton for office to evening.",
    cta: { label: "New Arrivals", href: "/shop?category=new-arrivals" },
  },
] as const;

export function AnimatedHeroSlider() {
  const [paused, setPaused] = useState(false);
  const { active, go, goTo } = useAutoAdvance(SLIDES.length, undefined, paused);
  const slide = SLIDES[active];

  return (
    <section
      className="relative min-h-[75dvh] sm:min-h-[85vh] lg:min-h-[90vh] overflow-hidden bg-navy-dark"
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-[1200ms] ease-out",
            i === active ? "opacity-100 z-0" : "opacity-0 z-0"
          )}
          aria-hidden={i !== active}
        >
          <Image
            src={s.image}
            alt=""
            fill
            priority={i === 0}
            className={cn(
              "object-cover object-[center_20%] sm:object-top",
              i === active && "scale-105 animate-[hero-zoom_8s_ease-in-out_infinite_alternate]"
            )}
            sizes="100vw"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy/75 to-navy/40 sm:bg-gradient-to-r sm:from-navy-dark/95 sm:via-navy/70 sm:to-navy/30 pointer-events-none" />
      <div className="absolute inset-0 mandala-glow pointer-events-none" />

      <div className="container-premium relative z-10 flex flex-col justify-end sm:justify-center min-h-[75dvh] sm:min-h-[85vh] lg:min-h-[90vh] pt-16 pb-24 sm:py-20 lg:py-16">
        <div className="max-w-xl w-full">
          <Link href="/" className="inline-flex items-center gap-2.5 sm:gap-3 mb-5 sm:mb-8">
            <div className="relative h-11 w-11 sm:h-14 sm:w-14 logo-ring shrink-0 overflow-hidden ring-offset-navy-dark">
              <Image src="/logo.jpeg" alt="NAVI Vastra Vihar" fill className="object-cover" sizes="56px" priority />
            </div>
            <div>
              <p className="font-serif text-xl sm:text-2xl text-cream leading-none">NAVI</p>
              <p className="text-[9px] sm:text-[10px] tracking-[0.28em] text-gold uppercase mt-1">Vastra Vihar</p>
            </div>
          </Link>

          <div key={slide.id} className="hero-copy-enter">
            <h1 className="font-serif text-[1.65rem] leading-tight min-[380px]:text-3xl sm:text-5xl lg:text-6xl text-cream mb-3 sm:mb-4">
              {slide.title}
            </h1>
            <p className="text-cream/80 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 max-w-md line-clamp-3 sm:line-clamp-none">
              {slide.subtitle}
            </p>
            <Button asChild size="lg" variant="gold" className="rounded-full w-full sm:w-auto px-8 h-11 sm:h-12">
              <Link href={slide.cta.href}>{slide.cta.label}</Link>
            </Button>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 mt-6 sm:mt-10">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="rounded-full border-cream/30 text-cream bg-navy/30 hover:bg-navy/50 h-9 w-9 sm:h-10 sm:w-10"
              onClick={() => go(-1)}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex gap-1.5 sm:gap-2">
              {SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === active ? "w-7 sm:w-8 bg-gold" : "w-2 bg-cream/35"
                  )}
                />
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="rounded-full border-cream/30 text-cream bg-navy/30 hover:bg-navy/50 h-9 w-9 sm:h-10 sm:w-10"
              onClick={() => go(1)}
              aria-label="Next slide"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <a
        href="#home-content"
        className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-1 text-cream/50 hover:text-gold transition-colors"
        aria-label="Scroll to content"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
}
