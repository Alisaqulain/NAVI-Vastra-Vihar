import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Category } from "@/lib/models";

type CategoryShopGridProps = {
  categories: Category[];
  title?: string;
};

export function CategoryShopGrid({ categories, title = "Shop by category" }: CategoryShopGridProps) {
  const items = categories.slice(0, 8);
  if (!items.length) return null;

  return (
    <section className="section-padding-sm bg-white border-b border-neutral-100">
      <div className="container-premium">
        <div className="flex items-end justify-between gap-4 mb-5 sm:mb-7">
          <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl text-navy">{title}</h2>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1 text-sm font-medium text-navy/70 hover:text-navy shrink-0"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {items.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className="group premium-card rounded-sm overflow-hidden"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
                <Image
                  src={cat.image}
                  alt={`Shop ${cat.name} at NAVI Vastra Vihar`}
                  fill
                  className="object-cover object-[center_25%] transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width:640px) 45vw, 220px"
                />
              </div>
              <div className="p-3 sm:p-3.5 border-t border-neutral-100">
                <p className="font-medium text-sm text-navy group-hover:text-emerald transition-colors">{cat.name}</p>
                <p className="text-[11px] text-navy/45 mt-0.5">{cat.productCount}+ styles</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
