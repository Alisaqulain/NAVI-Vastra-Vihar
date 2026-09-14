import Image from "next/image";
import Link from "next/link";
import { Category } from "@/lib/models";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  category: Category;
  className?: string;
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  return (
    <Link
      href={`/shop?category=${category.slug}`}
      className={cn(
        "group relative block overflow-hidden rounded-xl sm:rounded-2xl aspect-[3/4] sm:aspect-[4/5] shadow-md hover:shadow-xl transition-shadow duration-300",
        className
      )}
    >
      <Image
        src={category.image}
        alt={category.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 640px) 50vw, 25vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/25 to-transparent" />
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold/40 rounded-xl sm:rounded-2xl transition-colors" />
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5">
        <h3 className="font-serif text-base sm:text-xl lg:text-2xl text-cream mb-0.5">{category.name}</h3>
        <p className="text-cream/55 text-[10px] sm:text-xs tracking-wide">{category.productCount} styles</p>
      </div>
    </Link>
  );
}
