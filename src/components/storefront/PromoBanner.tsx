import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SITE_IMAGES } from "@/lib/constants/images";

interface PromoBannerProps {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  image?: string;
}

export function PromoBanner({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  image = SITE_IMAGES.promo,
}: PromoBannerProps) {
  return (
    <section className="relative rounded-2xl sm:rounded-3xl overflow-hidden min-h-[280px] sm:min-h-[320px] flex items-center">
      <Image src={image} alt="" fill className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/75 to-navy/40" />
      <div className="container-premium relative z-10 py-10 sm:py-14 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left max-w-lg">
          <p className="text-gold text-xs tracking-[0.2em] uppercase mb-2">Limited Offer</p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-cream mb-3">{title}</h2>
          <p className="text-cream/75 text-sm sm:text-base">{subtitle}</p>
        </div>
        <Button asChild variant="gold" size="lg" className="rounded-full px-8 shrink-0 w-full sm:w-auto">
          <Link href={ctaHref}>{ctaLabel}</Link>
        </Button>
      </div>
    </section>
  );
}
