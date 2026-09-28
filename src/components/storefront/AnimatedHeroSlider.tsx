"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HERO_SLIDES } from "@/lib/constants/images";
import { useAutoAdvance } from "@/hooks/use-auto-advance";
import { cn } from "@/lib/utils";

export function AnimatedHeroSlider() {
  const [paused, setPaused] = useState(false);
  const { active, go, goTo } = useAutoAdvance(HERO_SLIDES.length, undefined, paused);
  const slide = HERO_SLIDES[active];

  return (
    <section
      className="relative h-[min(78dvh,680px)] sm:h-[min(82dvh,740px)] lg:h-[min(88vh,820px)] overflow-hidden bg-wine-dark"
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured collections"
    >
      {HERO_SLIDES.map((s, i) => (
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
                alt={i === active ? s.imageAlt : ""}
                fill
                priority={i === 0}
                className="object-cover saturate-[1.03]"
                style={{ objectPosition: s.objectPosition }}
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      ))}

      <div className="absolute inset-0 hero-warm-vignette pointer-events-none z-[1]" />
      <div
        className="absolute inset-0 pointer-events-none z-[1] opacity-40 mix-blend-soft-light"
        style={{
          backgroundImage: "radial-gradient(circle at 20% 80%, rgba(212,175,82,0.35) 0%, transparent 45%)",
        }}
      />

      <div className="container-premium relative z-10 h-full flex items-end lg:items-center pb-6 sm:pb-8 lg:py-10">
        <div className="w-full grid lg:grid-cols-12 gap-6 lg:gap-10 items-end lg:items-center">
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="hero-luxury-card pl-6 sm:pl-8 pr-5 sm:pr-7 py-5 sm:py-7 lg:py-8">
              <Link href="/" className="inline-flex items-center gap-3 mb-4 sm:mb-5 group">
                <div className="relative h-10 w-10 sm:h-11 sm:w-11 rounded-full overflow-hidden logo-ring ring-offset-cream-light shrink-0">
                  <Image src="/logo.jpeg" alt="NAVI Vastra Vihar logo" fill className="object-cover" sizes="44px" priority />
                </div>
                <div>
                  <p className="font-serif text-lg sm:text-xl text-navy leading-none group-hover:text-wine transition-colors">
                    NAVI
                  </p>
                  <p className="text-[8px] sm:text-[9px] tracking-[0.32em] text-accent-gradient uppercase mt-1 font-medium">
                    Vastra Vihar
                  </p>
                </div>
              </Link>

              <div key={slide.id} className="hero-copy-enter">
                <p className="text-[10px] tracking-[0.28em] uppercase mb-2 font-semibold text-accent-gradient">
                  {String(active + 1).padStart(2, "0")} · Collection {String(HERO_SLIDES.length).padStart(2, "0")}
                </p>
                <h1 className="font-serif text-xl min-[380px]:text-2xl sm:text-3xl lg:text-[2.35rem] text-navy leading-snug mb-2.5 text-balance">
                  {slide.title}
                </h1>
                <p className="text-navy/65 text-sm sm:text-[15px] leading-relaxed mb-6">{slide.subtitle}</p>
                <Button asChild size="lg" variant="gold" className="rounded-full w-full sm:w-auto px-9 h-11 sm:h-12">
                  <Link href={slide.cta.href}>{slide.cta.label}</Link>
                </Button>
              </div>

              <div className="flex items-center justify-between sm:justify-start gap-2 mt-6 pt-5 border-t border-beige/80">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="rounded-full border-gold/40 text-navy bg-cream hover:bg-gold/15 h-9 w-9 shrink-0"
                  onClick={() => go(-1)}
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex gap-1.5 flex-1 justify-center sm:flex-none sm:justify-start">
                  {HERO_SLIDES.map((s, i) => (
                    <button
                      key={s.id}
                      type="button"
                      aria-label={`Slide ${i + 1}: ${s.title}`}
                      aria-current={i === active ? "true" : undefined}
                      onClick={() => goTo(i)}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-500",
                        i === active
                          ? "w-8 bg-gradient-to-r from-wine via-gold to-gold-light"
                          : "w-2 bg-navy/15 hover:bg-gold/40"
                      )}
                    />
                  ))}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="rounded-full border-gold/40 text-navy bg-cream hover:bg-gold/15 h-9 w-9 shrink-0"
                  onClick={() => go(1)}
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="hidden sm:flex flex-wrap gap-2 mt-4">
              <span className="pill-trust bg-cream-light/95 text-wine border-wine/15 shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-gold" /> Heritage since 1978
              </span>
              <span className="pill-trust bg-cream-light/95 text-emerald-dark border-emerald/20 shadow-sm">
                <Truck className="h-3.5 w-3.5 text-emerald" /> Free ship ₹5,000+
              </span>
            </div>
          </div>

          <div className="hidden lg:flex lg:col-span-7 xl:col-span-8 justify-end items-center">
            <div className="flex gap-3 xl:gap-4 p-3 rounded-2xl bg-navy/25 backdrop-blur-sm border border-gold/20">
              {HERO_SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goTo(i)}
                  className={cn(
                    "relative w-[76px] xl:w-[92px] aspect-[3/4] rounded-xl overflow-hidden transition-all duration-300",
                    i === active
                      ? "ring-2 ring-gold scale-[1.04] shadow-[0_12px_32px_rgba(212,175,82,0.35)]"
                      : "ring-1 ring-cream/30 opacity-80 hover:opacity-100 hover:ring-gold/50"
                  )}
                  aria-label={s.title}
                >
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    className="object-cover object-top"
                    sizes="92px"
                    unoptimized
                  />
                  <div
                    className={cn(
                      "absolute inset-0 transition-colors",
                      i === active ? "bg-gradient-to-t from-wine/70 to-transparent" : "bg-navy/30"
                    )}
                  />
                  <span className="absolute bottom-2 left-0 right-0 text-[10px] font-medium text-cream text-center px-1 leading-tight">
                    {s.title.split(" ").slice(0, 2).join(" ")}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-1 z-10 bg-gradient-to-r from-wine via-gold to-emerald opacity-90"
        aria-hidden
      />
    </section>
  );
}
