import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SITE_IMAGES } from "@/lib/constants/images";

export function HeroBanner() {
  return (
    <section className="relative min-h-[90vh] lg:min-h-[92vh] flex items-end lg:items-center overflow-hidden bg-charcoal">
      <Image
        src={SITE_IMAGES.hero.main}
        alt="NAVI Vastra Vihar — premium Indian fashion"
        fill
        priority
        className="object-cover object-top opacity-60"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-charcoal/20 lg:bg-gradient-to-r lg:from-charcoal lg:via-charcoal/70 lg:to-transparent" />

      <div className="container-premium relative z-10 w-full pb-12 pt-32 lg:py-0">
        <div className="max-w-xl lg:max-w-2xl">
          <p className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-gold mb-4 lg:mb-6">Since 1978 · Premium Indian Fashion</p>
          <h1 className="editorial-heading text-cream mb-4 lg:mb-6">
            Where Heritage
            <span className="block italic font-light text-cream/90 mt-1">Meets Modern Grace</span>
          </h1>
          <p className="text-cream/70 text-sm sm:text-base lg:text-lg leading-relaxed mb-8 max-w-md lg:max-w-lg">
            Sarees, lehengas, suits and kurtis — curated from master artisans for weddings, festivals and every beautiful moment.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button asChild size="lg" variant="gold" className="rounded-full px-8 h-12 text-sm tracking-wide">
              <Link href="/shop">Explore Collection</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8 h-12 border-cream/30 text-cream hover:bg-cream/10 text-sm">
              <Link href="/shop?category=new-arrivals">New Arrivals</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
