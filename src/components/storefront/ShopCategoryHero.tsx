import Image from "next/image";
import { Category } from "@/lib/models";

interface ShopCategoryHeroProps {
  category: Category;
}

export function ShopCategoryHero({ category }: ShopCategoryHeroProps) {
  return (
    <section className="relative h-44 sm:h-52 lg:h-60 overflow-hidden bg-navy">
      <Image
        src={category.image}
        alt={category.name}
        fill
        priority
        className="object-cover object-center opacity-50"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/70 to-navy/30" />
      <div className="container-premium relative z-10 h-full flex flex-col justify-center">
        <p className="text-gold text-xs sm:text-sm tracking-[0.25em] uppercase mb-2">Collection</p>
        <div className="gold-line mb-3" />
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream mb-2">{category.name}</h1>
        <p className="text-cream/75 text-sm sm:text-base max-w-xl line-clamp-2">{category.description}</p>
        <p className="text-cream/50 text-xs sm:text-sm mt-3">{category.productCount} sarees</p>
      </div>
    </section>
  );
}
