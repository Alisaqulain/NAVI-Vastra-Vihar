"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_IMAGES, unsplash, SAREE_PHOTOS } from "@/lib/constants/images";
import { centerCoverflowStyle, offsetFromActive } from "@/lib/carousel-3d";
import { useAutoAdvance } from "@/hooks/use-auto-advance";
import { SLIDER_AUTO_INTERVAL_MS } from "@/lib/constants/carousel";
import { cn } from "@/lib/utils";

const looks = [
  { label: "Bridal Ensemble", href: "/shop?category=lehengas", img: unsplash(SAREE_PHOTOS[2], 900) },
  { label: "Engagement Edit", href: "/shop?category=sarees", img: unsplash(SAREE_PHOTOS[0], 900) },
  { label: "Haldi Handpicked", href: "/shop?category=festive-wear", img: unsplash(SAREE_PHOTOS[1], 900) },
  { label: "Reception Glam", href: "/shop?category=party-wear", img: unsplash(SAREE_PHOTOS[3], 900) },
  { label: "Mehendi Muse", href: "/shop?category=kurtis", img: SITE_IMAGES.brand.weave },
  { label: "Cocktail Drape", href: "/shop?category=party-wear", img: SITE_IMAGES.brand.detail },
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
    const update = () => setSpacingPx(window.innerWidth < 640 ? 140 : 188);
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
    <section className="relative section-padding-sm overflow-x-hidden">
      <div
        className="absolute inset-0 bg-navy"
        style={{
          backgroundImage: `linear-gradient(rgba(27,42,74,0.92), rgba(27,42,74,0.88)), url(${SITE_IMAGES.hero.main})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="container-premium relative z-10">
        <div className="text-center mb-6 sm:mb-10">
          <p className="font-serif text-cream/70 text-lg sm:text-xl mb-1">Weaves for the</p>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-gold tracking-[0.08em] sm:tracking-[0.15em] uppercase px-2">
            Wedding Season
          </h2>
        </div>

        <div
          className="relative mx-auto max-w-5xl px-1 sm:px-10 lg:px-14 py-4 sm:py-10 overflow-visible"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div className="relative h-[min(88vw,380px)] sm:h-[460px] lg:h-[500px] [perspective:1600px] sm:[perspective:2000px] [perspective-origin:50%_42%] overflow-visible">
            <div className="relative h-full w-full [transform-style:preserve-3d] overflow-visible">
              {looks.map((item, i) => {
                const offset = offsetFromActive(i, active, looks.length);
                const { transform, opacity, zIndex, hidden, abs } = centerCoverflowStyle(offset, reducedMotion, {
                  spacingPx,
                  maxVisible: 2,
                  dramatic: true,
                });

                return (
                  <div
                    key={item.label}
                    className="absolute left-1/2 top-[44%] w-[68%] max-w-[240px] sm:w-[54%] sm:max-w-[320px] aspect-[3/4] will-change-transform"
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
                        className="group block h-full rounded-xl overflow-visible border-2 border-gold/70 shadow-[0_32px_80px_rgba(0,0,0,0.55)] ring-2 ring-gold/30"
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

        <p className="text-center font-serif text-gold text-lg sm:text-xl mt-2">{looks[active].label}</p>

        <div className="flex justify-center gap-2 mt-5">
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
        alt={item.label}
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
