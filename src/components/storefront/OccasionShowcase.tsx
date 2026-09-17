import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { SITE_IMAGES, unsplash, SAREE_PHOTOS } from "@/lib/constants/images";
import { cn } from "@/lib/utils";

const occasions = [
  {
    label: "Festive Wear",
    tagline: "Pujo, Diwali & celebrations",
    href: "/shop?category=festive-wear",
    image: SITE_IMAGES.hero.accent,
    featured: true,
  },
  {
    label: "Bridal Lehengas",
    tagline: "For your big day",
    href: "/shop?category=lehengas",
    image: SITE_IMAGES.hero.main,
  },
  {
    label: "Wedding Sarees",
    tagline: "Banarasi & silk classics",
    href: "/shop?category=sarees",
    image: unsplash(SAREE_PHOTOS[2], 900),
  },
  {
    label: "Party Wear",
    tagline: "Evening & cocktail",
    href: "/shop?category=party-wear",
    image: SITE_IMAGES.hero.secondary,
  },
  {
    label: "Engagement Edit",
    tagline: "Pastels & delicate zari",
    href: "/shop?category=party-wear",
    image: unsplash(SAREE_PHOTOS[0], 900),
  },
  {
    label: "Everyday Kurtis",
    tagline: "Office to brunch",
    href: "/shop?category=kurtis",
    image: SITE_IMAGES.brand.weave,
  },
] as const;

type Occasion = (typeof occasions)[number];

function OccasionTile({
  item,
  className,
  imageSizes,
  tall,
}: {
  item: Occasion;
  className?: string;
  imageSizes: string;
  tall?: boolean;
}) {
  return (
    <Link
      href={item.href}
      className={cn(
        "group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-navy border border-gold/25",
        "shadow-[0_8px_32px_rgba(27,42,74,0.08)] transition-all duration-500",
        "hover:border-gold/55 hover:shadow-[0_20px_48px_rgba(27,42,74,0.14)]",
        className
      )}
    >
      <Image
        src={item.image}
        alt={item.label}
        fill
        className="object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
        sizes={imageSizes}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/92 via-navy/35 to-navy/10 transition-opacity duration-500 group-hover:from-navy/95" />
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 p-5 sm:p-6 flex items-end justify-between gap-3",
          tall && "sm:p-8"
        )}
      >
        <div>
          <p
            className={cn(
              "font-serif text-cream leading-tight",
              tall ? "text-2xl sm:text-3xl lg:text-4xl" : "text-lg sm:text-xl"
            )}
          >
            {item.label}
          </p>
          <p className="text-cream/65 text-xs sm:text-sm mt-1.5 max-w-[240px]">{item.tagline}</p>
          <span className="inline-block mt-3 text-[11px] tracking-[0.2em] uppercase text-gold border-b border-gold/50 pb-0.5 opacity-90 group-hover:border-gold transition-colors">
            Shop Now
          </span>
        </div>
        <span className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-cream/10 text-gold backdrop-blur-sm transition-all duration-500 group-hover:bg-gold group-hover:text-navy group-hover:border-gold">
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
        </span>
      </div>
    </Link>
  );
}

export function OccasionShowcase() {
  const [featured, ...rest] = occasions;
  const [sideA, sideB, ...bottomRow] = rest;

  return (
    <section className="section-padding-sm overflow-hidden">
      <div className="container-premium">
        <SectionHeading
          subtitle="Shop by Occasion"
          title="Drapes for Every Celebration"
          viewAllHref="/shop"
          viewAllLabel="Explore All"
        />

        {/* Desktop: hero tile + side stack + bottom trio */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:grid-rows-[1fr_1fr_auto] gap-4">
          <OccasionTile
            item={featured}
            tall
            className="col-span-2 row-span-2 min-h-[520px]"
            imageSizes="(max-width: 1400px) 55vw, 640px"
          />
          {sideA && (
            <OccasionTile item={sideA} className="min-h-[252px]" imageSizes="320px" />
          )}
          {sideB && (
            <OccasionTile item={sideB} className="min-h-[252px]" imageSizes="320px" />
          )}
          <div className="col-span-3 grid grid-cols-3 gap-4">
            {bottomRow.map((item) => (
              <OccasionTile key={item.label} item={item} className="aspect-[4/5] min-h-[240px]" imageSizes="320px" />
            ))}
          </div>
        </div>

        {/* Tablet */}
        <div className="hidden md:block lg:hidden space-y-4">
          <OccasionTile item={featured} tall className="aspect-[21/9] min-h-[280px]" imageSizes="100vw" />
          <div className="grid grid-cols-3 gap-4">
            {rest.map((item) => (
              <OccasionTile key={item.label} item={item} className="aspect-[3/4]" imageSizes="33vw" />
            ))}
          </div>
        </div>

        {/* Mobile */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          <OccasionTile item={featured} tall className="aspect-[4/5]" imageSizes="100vw" />
          <div className="grid grid-cols-2 gap-3">
            {rest.map((item) => (
              <OccasionTile key={item.label} item={item} className="aspect-[3/4]" imageSizes="50vw" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
