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
      className={cn("group relative block overflow-hidden rounded-xl aspect-[4/5]", className)}
    >
      <Image
        src={category.image}
        alt={category.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 640px) 50vw, 25vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
        <h3 className="font-serif text-xl sm:text-2xl text-cream mb-1">{category.name}</h3>
        <p className="text-cream/70 text-xs sm:text-sm">{category.productCount} pieces</p>
      </div>
    </Link>
  );
}
