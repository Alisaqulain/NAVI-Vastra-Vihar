"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_IMAGES, catalogSrc, catalogAlt } from "@/lib/constants/images";
import { centerCoverflowStyle, offsetFromActive } from "@/lib/carousel-3d";
import { useAutoAdvance } from "@/hooks/use-auto-advance";
import { SLIDER_AUTO_INTERVAL_MS } from "@/lib/constants/carousel";
import { cn } from "@/lib/utils";

const looks = [
  { label: "Bridal Ensemble", href: "/shop?category=lehengas", img: catalogSrc(3), alt: catalogAlt(3) },
  { label: "Engagement Edit", href: "/shop?category=sarees", img: catalogSrc(0), alt: catalogAlt(0) },
  { label: "Haldi Handpicked", href: "/shop?category=festive-wear", img: catalogSrc(4), alt: catalogAlt(4) },
  { label: "Reception Glam", href: "/shop?category=party-wear", img: catalogSrc(5), alt: catalogAlt(5) },
  { label: "Mehendi Muse", href: "/shop?category=kurtis", img: SITE_IMAGES.brand.weave, alt: catalogAlt(13) },
  { label: "Cocktail Drape", href: "/shop?category=party-wear", img: SITE_IMAGES.brand.detail, alt: catalogAlt(1) },
] as const;

export function WeddingSeasonGrid() {
  const [paused, setPaused] = useState(false);
  const [spacingPx, setSpacingPx] = useState(180);
  const [reducedMotion, setReducedMotion] = useState(false);
  const router = useRouter();
  const { active, go, goTo } = useAutoAdvance(looks.length, SLIDER_AUTO_INTERVAL_MS, paused);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const update = () => setSpacingPx(window.innerWidth < 640 ? 108 : window.innerWidth < 1024 ? 132 : 148);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const handleSelect = (index: number) => {
    if (index === active) {
      router.push(looks[index].href);
      return;
    }
    goTo(index);
  };

  return (
    <section className="relative py-10 sm:py-12 lg:py-14 overflow-x-hidden">
      <div
        className="absolute inset-0 bg-navy"
        style={{
          backgroundImage: `linear-gradient(rgba(27,42,74,0.92), rgba(27,42,74,0.88)), url(${SITE_IMAGES.hero.main})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="container-premium relative z-10">
        <div className="text-center mb-4 sm:mb-6">
          <p className="font-serif text-cream/70 text-sm sm:text-base mb-1">Weaves for the</p>
          <h2 className="font-serif text-xl sm:text-3xl lg:text-4xl text-gold tracking-[0.1em] sm:tracking-[0.12em] uppercase px-2">
            Wedding Season
          </h2>
        </div>

        <div
          className="relative mx-auto max-w-3xl lg:max-w-4xl px-1 sm:px-8 lg:px-10 py-2 sm:py-4 overflow-visible"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div className="relative h-[min(70vw,260px)] sm:h-[300px] lg:h-[340px] [perspective:1200px] sm:[perspective:1400px] [perspective-origin:50%_46%] overflow-visible">
            <div className="relative h-full w-full [transform-style:preserve-3d] overflow-visible">
              {looks.map((item, i) => {
                const offset = offsetFromActive(i, active, looks.length);
                const { transform, opacity, zIndex, hidden, abs } = centerCoverflowStyle(offset, reducedMotion, {
                  spacingPx,
                  maxVisible: 2,
                  dramatic: false,
                });

                return (
                  <div
                    key={item.label}
                    className="absolute left-1/2 top-[46%] w-[56%] max-w-[180px] sm:w-[46%] sm:max-w-[220px] lg:max-w-[240px] aspect-[3/4] will-change-transform"
                    style={{
                      transform,
                      opacity,
                      zIndex,
                      pointerEvents: hidden ? "none" : "auto",
                      transition: "transform 1200ms cubic-bezier(0.22, 1, 0.36, 1), opacity 1200ms ease, box-shadow 1200ms ease",
                    }}
                  >
                    {abs === 0 ? (
                      <Link
                        href={item.href}
                        className="group block h-full rounded-lg sm:rounded-xl overflow-visible border-2 border-gold/60 shadow-[0_20px_48px_rgba(0,0,0,0.45)] ring-1 ring-gold/25"
                      >
                        <CardImage item={item} featured />
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSelect(i)}
                        className="block h-full w-full rounded-xl overflow-hidden border border-gold/35 shadow-xl cursor-pointer text-left"
                        aria-label={`Show ${item.label}`}
                      >
                        <CardImage item={item} featured={false} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon"
            className="absolute left-0 sm:left-2 top-[44%] z-50 -translate-y-1/2 h-9 w-9 sm:h-11 sm:w-11 rounded-full border-gold/40 bg-navy/70 text-gold hover:bg-navy/80"
            onClick={() => go(-1)}
            aria-label="Previous look"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="absolute right-0 sm:right-2 top-[44%] z-50 -translate-y-1/2 h-9 w-9 sm:h-11 sm:w-11 rounded-full border-gold/40 bg-navy/70 text-gold hover:bg-navy/80"
            onClick={() => go(1)}
            aria-label="Next look"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        <p className="text-center font-serif text-gold text-base sm:text-lg mt-1">{looks[active].label}</p>
        <p className="text-center text-cream/45 text-[11px] sm:text-xs mt-1">Tap center card to shop · Swipe or use arrows</p>

        <div className="flex justify-center gap-2 mt-4">
          {looks.map((item, i) => (
            <button
              key={item.label}
              type="button"
              aria-label={item.label}
              onClick={() => goTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === active ? "w-8 bg-gold" : "w-2 bg-cream/25 hover:bg-cream/45"
              )}
            />
          ))}
        </div>

        <div className="flex justify-center mt-5 sm:mt-6">
          <Button asChild variant="gold" className="rounded-full h-10 sm:h-11 px-8">
            <Link href="/shop?category=lehengas">Shop wedding collection</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function CardImage({
  item,
  featured,
}: {
  item: (typeof looks)[number];
  featured: boolean;
}) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden rounded-xl bg-navy", featured && "rounded-xl")}>
      <Image
        src={item.img}
        alt={item.alt}
        fill
        className={cn(
          "object-cover object-top transition-transform duration-700",
          featured && "group-hover:scale-[1.03]"
        )}
        sizes="320px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent pointer-events-none" />
      <p className="absolute bottom-0 left-0 right-0 py-3 px-3 text-center font-serif text-xs sm:text-sm text-gold/95 pointer-events-none">
        {item.label}
      </p>
    </div>
  );
}
