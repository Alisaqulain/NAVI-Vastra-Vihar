import { Product } from "@/lib/models";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export function ProductGrid({ products, columns = 4, className }: ProductGridProps) {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-20 px-6 premium-card bg-cream-light/80">
        <p className="font-serif text-2xl sm:text-3xl text-navy mb-2">No sarees found</p>
        <p className="text-navy/55 text-sm sm:text-base max-w-md mx-auto">
          Try adjusting your filters or browse our full collection.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("grid gap-3.5 sm:gap-7 lg:gap-8", gridCols[columns], className)}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
