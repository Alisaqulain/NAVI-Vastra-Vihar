import Image from "next/image";
import Link from "next/link";
import { SITE_IMAGES } from "@/lib/constants/images";

const trends = [
  {
    title: "Wedding Sarees",
    subtitle: "Celebrate every ceremony in exquisite style",
    href: "/shop?category=sarees",
    image: SITE_IMAGES.hero.accent,
    align: "left" as const,
  },
  {
    title: "Festive Edit",
    subtitle: "Pujo, Diwali & celebrations — curated drapes",
    href: "/shop?category=festive-wear",
    image: SITE_IMAGES.hero.secondary,
    align: "right" as const,
  },
];

export function ShopByTrend() {
  return (
    <section className="section-padding-sm bg-cream">
      <div className="container-premium">
        <h2 className="font-serif text-2xl sm:text-4xl text-navy text-center mb-6 sm:mb-14">Shop By Trend</h2>
        <div className="grid md:grid-cols-2 gap-3 sm:gap-6">
          {trends.map(({ title, subtitle, href, image, align }) => (
            <Link
              key={title}
              href={href}
              className="group relative aspect-[3/4] sm:aspect-[16/10] md:aspect-[4/5] overflow-hidden rounded-xl sm:rounded-3xl"
            >
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/75 via-navy/20 to-transparent" />
              <div
                className={`absolute bottom-0 left-0 right-0 p-4 sm:p-8 text-cream ${align === "right" ? "md:text-right" : ""}`}
              >
                <h3 className="font-serif text-xl sm:text-3xl lg:text-4xl mb-1.5 sm:mb-2 leading-tight">{title}</h3>
                <p className="text-cream/75 text-sm sm:text-base max-w-xs mb-4">{subtitle}</p>
                <span className="inline-block text-sm font-medium border-b border-gold/80 pb-0.5 group-hover:text-gold transition-colors">
                  Shop Now
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
