import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SITE_IMAGES } from "@/lib/constants/images";

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-navy">
      {/* Mobile: stacked hero */}
      <div className="lg:hidden">
        <div className="relative h-[55vh] min-h-[420px]">
          <Image
            src={SITE_IMAGES.hero.mobile}
            alt="NAVI premium saree collection"
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
        </div>
        <div className="relative -mt-24 px-4 pb-10 text-center">
          <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full border-2 border-gold shadow-lg">
            <Image src="/logo.jpeg" alt="NAVI" width={80} height={80} className="h-full w-full object-cover" />
          </div>
          <p className="text-gold text-xs tracking-[0.25em] uppercase mb-3">Since 1978</p>
          <h1 className="font-serif text-3xl text-cream leading-tight mb-3">
            Handloom Sarees of
            <span className="block text-gold mt-1">Timeless Heritage</span>
          </h1>
          <p className="text-cream/75 text-sm mb-6 max-w-sm mx-auto">
            Banarasi · Kanjeevaram · Silk · Cotton — curated for the modern Indian woman.
          </p>
          <div className="flex flex-col gap-3 max-w-xs mx-auto">
            <Button asChild size="lg" variant="gold" className="w-full rounded-full">
              <Link href="/shop">Shop Sarees</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full rounded-full border-cream/30 text-cream hover:bg-cream/10">
              <Link href="/shop?category=new-arrivals">New Arrivals</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop: split hero with dual imagery */}
      <div className="hidden lg:grid lg:grid-cols-2 min-h-[85vh]">
        <div className="relative flex items-center px-8 xl:px-16 bg-navy">
          <div className="max-w-xl animate-slide-up z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-gold">
                <Image src="/logo.jpeg" alt="NAVI" width={64} height={64} className="object-cover" />
              </div>
              <div>
                <p className="text-gold text-sm tracking-[0.3em] uppercase">NAVI Vastra Vihar</p>
                <p className="text-cream/60 text-sm">Saree Shop · Handloom Elegance</p>
              </div>
            </div>
            <h1 className="font-serif text-5xl xl:text-6xl text-cream leading-[1.1] mb-6">
              Drape Yourself in
              <span className="block text-gold mt-2">Timeless Heritage</span>
            </h1>
            <p className="text-cream/80 text-lg mb-8 leading-relaxed">
              Discover handwoven Banarasi, Kanjeevaram, cotton and designer sarees crafted by master artisans across India.
            </p>
            <div className="flex gap-4">
              <Button asChild size="lg" variant="gold" className="rounded-full px-8">
                <Link href="/shop">Shop Collection</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-cream/30 text-cream hover:bg-cream/10 px-8">
                <Link href="/shop?category=wedding-sarees">Wedding Edit</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="relative grid grid-cols-2 gap-1">
          <div className="relative col-span-2 h-[45%]">
            <Image
              src={SITE_IMAGES.hero.mobile}
              alt="Banarasi silk saree"
              fill
              priority
              className="object-cover"
              sizes="50vw"
            />
          </div>
          <div className="relative h-full">
            <Image
              src={SITE_IMAGES.hero.secondary}
              alt="Kanjeevaram saree"
              fill
              className="object-cover"
              sizes="25vw"
            />
          </div>
          <div className="relative h-full">
            <Image
              src={SITE_IMAGES.hero.accent}
              alt="Festive saree"
              fill
              className="object-cover"
              sizes="25vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
