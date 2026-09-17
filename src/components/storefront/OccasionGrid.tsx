import Image from "next/image";
import Link from "next/link";
import { SITE_IMAGES } from "@/lib/constants/images";

const occasions = [
  { label: "Festive Wear", href: "/shop?category=festive-wear", image: SITE_IMAGES.hero.accent, count: "8 styles" },
  { label: "Party Wear", href: "/shop?category=party-wear", image: SITE_IMAGES.hero.secondary, count: "6 styles" },
  { label: "Bridal Lehengas", href: "/shop?category=lehengas", image: SITE_IMAGES.hero.main, count: "6 styles" },
  { label: "Everyday Kurtis", href: "/shop?category=kurtis", image: SITE_IMAGES.brand.weave, count: "6 styles" },
];

export function OccasionGrid() {
  return (
    <section className="section-padding-sm">
      <div className="container-premium">
        <div className="text-center mb-10 sm:mb-12">
          <p className="text-[11px] tracking-[0.25em] uppercase text-emerald mb-3">Shop by Occasion</p>
          <div className="gold-line mx-auto mb-4" />
          <h2 className="editorial-heading">Drapes for Every Celebration</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {occasions.map(({ label, href, image, count }) => (
            <Link
              key={label}
              href={href}
              className="group relative aspect-[3/4] overflow-hidden bg-navy"
            >
              <Image
                src={image}
                alt={label}
                fill
                className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-90"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/25 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <p className="font-serif text-lg sm:text-xl text-cream mb-0.5">{label}</p>
                <p className="text-cream/60 text-xs">{count}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
