import Link from "next/link";

const bands = [
  { label: "Under ₹2,000", href: "/shop?maxPrice=2000" },
  { label: "₹2,000 – ₹5,000", href: "/shop?minPrice=2000&maxPrice=5000" },
  { label: "₹5,000 – ₹10,000", href: "/shop?minPrice=5000&maxPrice=10000" },
  { label: "Above ₹10,000", href: "/shop?minPrice=10000" },
  { label: "New arrivals", href: "/shop?category=new-arrivals" },
  { label: "Best sellers", href: "/shop?category=best-sellers" },
] as const;

export function ShopByPriceStrip() {
  return (
    <section className="border-b border-neutral-100 bg-white">
      <div className="container-premium py-4 sm:py-5">
        <p className="text-[11px] uppercase tracking-[0.18em] text-navy/45 font-medium mb-3">Shop by budget</p>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {bands.map((b) => (
            <Link
              key={b.href}
              href={b.href}
              className="shrink-0 rounded-sm border border-neutral-200 bg-white px-4 py-2 text-xs sm:text-sm font-medium text-navy hover:border-navy hover:bg-neutral-50 transition-colors"
            >
              {b.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
