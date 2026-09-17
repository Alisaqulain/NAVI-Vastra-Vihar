import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SITE_IMAGES } from "@/lib/constants/images";

export function HeroBanner() {
  return (
    <section className="relative min-h-[88vh] lg:min-h-[90vh] flex items-end lg:items-center overflow-hidden bg-navy">
      <Image
        src={SITE_IMAGES.hero.main}
        alt="NAVI Vastra Vihar collection"
        fill
        priority
        className="object-cover object-top opacity-45"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/75 to-navy/30 lg:bg-gradient-to-r lg:from-navy lg:via-navy/85 lg:to-navy/40" />
      <div className="absolute inset-0 mandala-glow pointer-events-none" />

      <div className="container-premium relative z-10 w-full pb-12 pt-28 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="max-w-xl">
            <div className="flex items-center gap-4 mb-6 lg:mb-8">
              <div className="relative h-16 w-16 sm:h-20 sm:w-20 logo-ring shrink-0 overflow-hidden">
                <Image src="/logo.jpeg" alt="NAVI" fill className="object-cover" sizes="80px" priority />
              </div>
              <div>
                <p className="text-gold text-[10px] sm:text-xs tracking-[0.3em] uppercase">NAVI Vastra Vihar</p>
                <p className="text-cream/55 text-xs sm:text-sm mt-0.5">Saree Shop · Handloom · Since 1978</p>
              </div>
            </div>
            <p className="text-emerald-light text-[11px] sm:text-xs tracking-[0.35em] uppercase mb-4">Premium Indian Fashion</p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-cream leading-[1.08] mb-5">
              Drape Yourself in
              <span className="block text-gold mt-2 italic font-light">Timeless Heritage</span>
            </h1>
            <p className="text-cream/75 text-sm sm:text-base leading-relaxed mb-8 max-w-md">
              Sarees, lehengas, suits and kurtis — handpicked from master weavers in navy silks, emerald weaves and gold zari.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button asChild size="lg" variant="gold" className="rounded-full px-8 h-12">
                <Link href="/shop">Explore Collection</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 h-12 border-cream/25 text-cream hover:bg-cream/10">
                <Link href="/shop?category=new-arrivals">New Arrivals</Link>
              </Button>
            </div>
          </div>

          <div className="hidden lg:grid grid-cols-2 gap-2 h-[480px]">
            <div className="relative row-span-2 rounded-2xl overflow-hidden border border-gold/20">
              <Image src={SITE_IMAGES.hero.main} alt="" fill className="object-cover" sizes="300px" />
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-gold/20">
              <Image src={SITE_IMAGES.hero.secondary} alt="" fill className="object-cover" sizes="200px" />
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-gold/20">
              <Image src={SITE_IMAGES.hero.accent} alt="" fill className="object-cover" sizes="200px" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
