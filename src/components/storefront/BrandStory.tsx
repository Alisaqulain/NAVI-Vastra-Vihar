import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SITE_IMAGES } from "@/lib/constants/images";

export function BrandStory() {
  return (
    <section className="section-padding bg-cream-light">
      <div className="container-premium">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 order-2 lg:order-1">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg col-span-2 sm:col-span-1">
              <Image
                src={SITE_IMAGES.brand.weave}
                alt="Handloom weaving"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 25vw"
              />
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/logo.jpeg"
                alt="NAVI heritage"
                fill
                className="object-cover"
                sizes="200px"
              />
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={SITE_IMAGES.brand.detail}
                alt="Banarasi saree detail"
                fill
                className="object-cover"
                sizes="200px"
              />
            </div>
          </div>
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <p className="text-emerald text-sm tracking-[0.2em] uppercase mb-2">Our Heritage</p>
            <div className="gold-line mx-auto lg:mx-0 mb-4" />
            <h2 className="font-serif text-3xl sm:text-4xl text-navy mb-4">
              Every Saree Tells a Story
            </h2>
            <p className="text-navy/70 leading-relaxed mb-4 text-sm sm:text-base">
              Since 1978, NAVI Vastra Vihar has been the trusted destination for authentic handloom sarees.
              We work directly with master weavers in Varanasi, Kanchipuram, and artisan clusters across India.
            </p>
            <p className="text-navy/60 leading-relaxed mb-8 text-sm sm:text-base">
              From bridal Banarasi silks to everyday cotton drapes — each piece is chosen for its craftsmanship,
              authenticity, and the grace it brings to the woman who wears it.
            </p>
            <Button asChild variant="outline" className="rounded-full border-navy/20 hover:border-emerald hover:text-emerald">
              <Link href="/about">Discover Our Story</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
