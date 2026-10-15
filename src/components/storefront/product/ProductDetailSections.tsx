"use client";

import Link from "next/link";
import { Product, Review } from "@/lib/models";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReviewCard } from "@/components/storefront/ReviewCard";
import { BUSINESS } from "@/lib/constants/business";

type ProductDetailSectionsProps = {
  product: Product;
  reviews: Review[];
  categoryName?: string;
};

export function ProductDetailSections({ product, reviews, categoryName }: ProductDetailSectionsProps) {
  const specRows: { label: string; value: string }[] = [];

  if (product.colors[0]?.name) specRows.push({ label: "Colour", value: product.colors.map((c) => c.name).join(", ") });
  if (product.fabric) specRows.push({ label: "Fabric", value: product.fabric });
  if (product.sku) specRows.push({ label: "Product code", value: product.sku });
  if (categoryName) specRows.push({ label: "Category", value: categoryName });
  if (product.sizes.length) specRows.push({ label: "Size", value: product.sizes.join(", ") });

  Object.entries(product.specifications).forEach(([k, v]) => {
    if (v && k.toLowerCase() !== "care") specRows.push({ label: k, value: v });
  });

  const care =
    product.specifications.Care ??
    product.specifications["Care instructions"] ??
    "Dry clean recommended for silk and zari sarees.";

  return (
    <section className="mt-12 lg:mt-16">
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50/50 overflow-hidden">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="w-full justify-start rounded-none h-auto flex-wrap gap-0 bg-white border-b border-neutral-200 p-0">
            <TabsTrigger
              value="description"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-gold data-[state=active]:bg-transparent px-4 sm:px-6 py-3.5 text-xs sm:text-sm"
            >
              Description
            </TabsTrigger>
            {specRows.length > 0 && (
              <TabsTrigger
                value="details"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-gold data-[state=active]:bg-transparent px-4 sm:px-6 py-3.5 text-xs sm:text-sm"
              >
                Details
              </TabsTrigger>
            )}
            <TabsTrigger
              value="shipping"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-gold data-[state=active]:bg-transparent px-4 sm:px-6 py-3.5 text-xs sm:text-sm"
            >
              Shipping
            </TabsTrigger>
            <TabsTrigger
              value="care"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-gold data-[state=active]:bg-transparent px-4 sm:px-6 py-3.5 text-xs sm:text-sm"
            >
              Care
            </TabsTrigger>
            {reviews.length > 0 && (
              <TabsTrigger
                value="reviews"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-gold data-[state=active]:bg-transparent px-4 sm:px-6 py-3.5 text-xs sm:text-sm"
              >
                Reviews ({reviews.length})
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="description" className="p-6 sm:p-8 mt-0 bg-white">
            <p className="text-sm sm:text-base text-navy/75 leading-relaxed max-w-3xl">{product.description}</p>
            <p className="text-xs text-navy/45 mt-4">Colour may vary slightly from photos due to lighting and screen settings.</p>
          </TabsContent>

          {specRows.length > 0 && (
            <TabsContent value="details" className="p-6 sm:p-8 mt-0 bg-white">
              <dl className="grid sm:grid-cols-2 gap-x-10 gap-y-4 max-w-3xl">
                {specRows.map(({ label, value }) => (
                  <div key={label} className="flex flex-col sm:flex-row sm:gap-4 border-b border-neutral-100 pb-3">
                    <dt className="text-xs uppercase tracking-wider text-navy/45 font-medium sm:w-36 shrink-0">{label}</dt>
                    <dd className="text-sm text-navy">{value}</dd>
                  </div>
                ))}
              </dl>
            </TabsContent>
          )}

          <TabsContent value="shipping" className="p-6 sm:p-8 mt-0 bg-white space-y-3 text-sm text-navy/70 max-w-3xl">
            <p>Orders ship within 48 hours on business days. Delivery across India typically takes 5–7 days.</p>
            <p>Free shipping on orders above ₹5,000. COD available on eligible orders.</p>
            <Link href="/shipping-policy" className="inline-block text-emerald font-medium hover:underline">
              Shipping policy
            </Link>
            <Link href="/return-policy" className="inline-block text-emerald font-medium hover:underline ml-4">
              Returns
            </Link>
          </TabsContent>

          <TabsContent value="care" className="p-6 sm:p-8 mt-0 bg-white text-sm text-navy/70 max-w-3xl space-y-2">
            <p>{care}</p>
            <p>Store in a muslin bag away from direct sunlight.</p>
          </TabsContent>

          {reviews.length > 0 && (
            <TabsContent value="reviews" className="p-6 sm:p-8 mt-0 bg-white space-y-4">
              {reviews.map((r) => (
                <ReviewCard key={r.id} review={r} />
              ))}
            </TabsContent>
          )}
        </Tabs>
      </div>

      <div className="mt-8 grid sm:grid-cols-3 gap-4 text-center sm:text-left">
        {[
          { title: "Authentic quality", desc: "Inspected before dispatch" },
          { title: "Secure packaging", desc: "Careful fold & ship" },
          { title: "Bengaluru since 1978", desc: BUSINESS.phoneDisplay },
        ].map((item) => (
          <div key={item.title} className="rounded-xl border border-neutral-200 bg-white px-4 py-4">
            <p className="text-sm font-semibold text-navy">{item.title}</p>
            <p className="text-xs text-navy/50 mt-1">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
