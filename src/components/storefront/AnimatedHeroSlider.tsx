"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles, Truck } from "lucide-react";
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
      className="relative h-[min(78dvh,680px)] sm:h-[min(82dvh,740px)] lg:h-[min(88vh,820px)] overflow-hidden bg-navy-dark"
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-[1200ms] ease-in-out",
            i === active ? "opacity-100" : "opacity-0"
          )}
          aria-hidden={i !== active}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className={cn("absolute inset-0", i === active && "hero-bg-ken")}>
              <Image
                src={s.image}
                alt=""
                fill
                priority={i === 0}
                className="object-cover object-[68%_28%] sm:object-[72%_32%] lg:object-[78%_center]"
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      ))}

      {/* Light vignette — keep photo visible across the frame */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/85 via-navy/20 to-navy/10 pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/55 via-transparent to-navy/15 pointer-events-none z-[1] lg:from-navy-dark/45" />
      <div className="absolute inset-0 mandala-glow pointer-events-none z-[1] opacity-70" />

      <div className="container-premium relative z-10 h-full flex items-end lg:items-center pb-6 sm:pb-8 lg:py-10">
        <div className="w-full grid lg:grid-cols-12 gap-6 lg:gap-8 items-end lg:items-center">
          {/* Glass content card — fills left without a huge empty dark zone */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="rounded-2xl sm:rounded-3xl border border-cream/10 bg-navy/55 backdrop-blur-md shadow-[0_24px_60px_rgba(0,0,0,0.35)] p-5 sm:p-7 lg:p-8">
              <Link href="/" className="inline-flex items-center gap-2.5 mb-4 sm:mb-5">
                <div className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-full overflow-hidden ring-1 ring-gold/55 shrink-0">
                  <Image src="/logo.jpeg" alt="NAVI" fill className="object-cover" sizes="40px" priority />
                </div>
                <div>
                  <p className="font-serif text-base sm:text-lg text-cream leading-none">NAVI</p>
                  <p className="text-[8px] sm:text-[9px] tracking-[0.28em] text-gold uppercase mt-0.5">Vastra Vihar</p>
                </div>
              </Link>

              <div key={slide.id} className="hero-copy-enter">
                <p className="text-gold text-[10px] tracking-[0.3em] uppercase mb-2">
                  Slide {String(active + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
                </p>
                <h1 className="font-serif text-xl min-[380px]:text-2xl sm:text-3xl lg:text-4xl text-cream leading-snug mb-2 text-balance">
                  {slide.title}
                </h1>
                <p className="text-cream/80 text-sm sm:text-[15px] leading-relaxed mb-5">{slide.subtitle}</p>
                <Button asChild size="lg" variant="gold" className="rounded-full w-full sm:w-auto px-8 h-11">
                  <Link href={slide.cta.href}>{slide.cta.label}</Link>
                </Button>
              </div>

              <div className="flex items-center justify-between sm:justify-start gap-2 mt-5 sm:mt-6 pt-5 border-t border-cream/10">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="rounded-full border-cream/25 text-cream bg-navy/40 h-9 w-9 shrink-0"
                  onClick={() => go(-1)}
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex gap-1.5 flex-1 justify-center sm:flex-none sm:justify-start">
                  {SLIDES.map((s, i) => (
                    <button
                      key={s.id}
                      type="button"
                      aria-label={`Slide ${i + 1}`}
                      onClick={() => goTo(i)}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-500",
                        i === active ? "w-7 bg-gold" : "w-2 bg-cream/35"
                      )}
                    />
                  ))}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="rounded-full border-cream/25 text-cream bg-navy/40 h-9 w-9 shrink-0"
                  onClick={() => go(1)}
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="hidden sm:flex flex-wrap gap-x-4 gap-y-1 mt-4 text-[11px] text-cream/65">
              <span className="inline-flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-gold" /> Since 1978
              </span>
              <span className="inline-flex items-center gap-1">
                <Truck className="h-3 w-3 text-emerald-light" /> Free shipping ₹5,000+
              </span>
            </div>
          </div>

          {/* Right: slide previews — uses open space on desktop */}
          <div className="hidden lg:flex lg:col-span-7 xl:col-span-8 justify-end items-center">
            <div className="flex gap-3">
              {SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goTo(i)}
                  className={cn(
                    "relative w-[72px] xl:w-[88px] aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all duration-300 shadow-lg",
                    i === active
                      ? "border-gold scale-105 ring-2 ring-gold/30"
                      : "border-cream/20 opacity-75 hover:opacity-100 hover:border-gold/40"
                  )}
                  aria-label={s.title}
                >
                  <Image src={s.image} alt="" fill className="object-cover object-center" sizes="88px" />
                  <div className="absolute inset-0 bg-navy/25" />
                  <span className="absolute bottom-1 left-0 right-0 text-[9px] text-cream/90 text-center px-0.5 truncate">
                    {i + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold/20 via-gold/60 to-gold/20 z-10" aria-hidden />
    </section>
  );
}
