import type { Metadata } from "next";
import Link from "next/link";
import { Category } from "@/lib/models";
import { categoryRepository, reviewRepository } from "@/lib/repositories";
import { storefrontProductRepository } from "@/lib/repositories/product-storefront.server";
import { CommerceHero } from "@/components/storefront/CommerceHero";
import { PothysOurCollections } from "@/components/storefront/PothysOurCollections";
import { ExploreCollectionsArched } from "@/components/storefront/ExploreCollectionsArched";
import { StoreTrustBar } from "@/components/storefront/StoreTrustBar";
import { CategoryShopGrid } from "@/components/storefront/CategoryShopGrid";
import { DealStrip } from "@/components/storefront/DealStrip";
import { ShopByPriceStrip } from "@/components/storefront/ShopByPriceStrip";
import { WeddingSeasonGrid } from "@/components/storefront/WeddingSeasonGrid";
import { ScrollReveal } from "@/components/storefront/ScrollReveal";
import { SectionHeading } from "@/components/storefront/SectionHeading";
import { ProductGrid } from "@/components/storefront/ProductGrid";
import { PromoBanner } from "@/components/storefront/PromoBanner";
import { ReviewCard } from "@/components/storefront/ReviewCard";
import { Newsletter } from "@/components/storefront/Newsletter";
import { WhyNavi } from "@/components/storefront/WhyNavi";
import { Button } from "@/components/ui/button";
import { DEFAULT_OG_IMAGE, CATALOG_IMAGES } from "@/lib/constants/images";

export const metadata: Metadata = {
  title: "Shop Premium Sarees, Lehengas & Festive Wear Online",
  description:
    "Buy sarees, lehengas, suits and kurtis online at NAVI Vastra Vihar Bengaluru. Free shipping ₹5,000+. Easy returns. Code FESTIVE20.",
  openGraph: {
    title: "NAVI Vastra Vihar — Online Ethnic Wear Store",
    description: "Modern online shopping for premium Indian fashion since 1978.",
    images: [{ url: DEFAULT_OG_IMAGE, alt: CATALOG_IMAGES[3].alt }],
  },
};

export default async function HomePage() {
  const [newArrivals, bestSellers, featured, categories, allHighlight] = await Promise.all([
    storefrontProductRepository.findAll({ newArrival: true, limit: 8 }),
    storefrontProductRepository.findAll({ bestseller: true, limit: 8 }),
    storefrontProductRepository.findAll({ featured: true, limit: 8 }),
    categoryRepository.findAll(),
    storefrontProductRepository.findAll({ limit: 12 }),
  ]);

  const shopCategories = categories.filter(
    (c: Category) => !["cat-new-arrivals", "cat-best-sellers"].includes(c.id)
  );

  const reviewSeeds = bestSellers.data.slice(0, 4).map((p) => p.id);
  const allReviews = await Promise.all(reviewSeeds.map((id) => reviewRepository.findByProductId(id)));
  const reviews = allReviews.flat().slice(0, 4);

  return (
    <>
      <CommerceHero />
      <StoreTrustBar />

      <PothysOurCollections
        products={featured.data.length ? featured.data.slice(0, 12) : allHighlight.data.slice(0, 12)}
      />

      <ExploreCollectionsArched />

      <ShopByPriceStrip />

      <ScrollReveal variant="fade-up">
        <CategoryShopGrid categories={shopCategories} title="Shop by category" />
      </ScrollReveal>

      <DealStrip />

      <ScrollReveal variant="scale-up">
        <WeddingSeasonGrid />
      </ScrollReveal>

      <ScrollReveal variant="fade-up" delayMs={60}>
        <section className="section-padding-sm border-b border-neutral-100 bg-white">
          <div className="container-premium">
            <SectionHeading subtitle="Trending" title="Best Sellers" viewAllHref="/shop?category=best-sellers" />
            <ProductGrid products={bestSellers.data} columns={4} />
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal variant="fade-up" delayMs={80}>
        <section className="section-padding-sm bg-neutral-50 border-b border-neutral-100">
          <div className="container-premium">
            <SectionHeading subtitle="Fresh drops" title="New Arrivals" viewAllHref="/shop?category=new-arrivals" />
            <ProductGrid products={newArrivals.data} columns={4} />
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal variant="fade-in">
        <section className="container-premium section-padding-sm pt-0">
          <PromoBanner
            title="Wedding & festive edit"
            subtitle="Sarees, lehengas and suits for every function. Apply FESTIVE20 at checkout."
            ctaLabel="Browse collection"
            ctaHref="/shop"
          />
        </section>
      </ScrollReveal>

      <ScrollReveal variant="slide-right">
        <section className="section-padding-sm">
          <div className="container-premium">
            <SectionHeading subtitle="Editor's pick" title="Featured Products" viewAllHref="/shop" />
            <ProductGrid products={featured.data.length ? featured.data : allHighlight.data.slice(0, 8)} columns={4} />
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal variant="fade-up">
        <WhyNavi />
      </ScrollReveal>

      <section className="section-padding-sm border-t border-neutral-100 bg-white">
        <div className="container-premium">
          <SectionHeading subtitle="Reviews" title="What customers say" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-premium pb-6 sm:pb-8">
        <div className="rounded-2xl sm:rounded-3xl bg-navy text-center px-6 py-10 sm:py-12">
          <h2 className="font-serif text-2xl sm:text-3xl text-cream mb-2">Ready to shop?</h2>
          <p className="text-cream/65 text-sm sm:text-base max-w-md mx-auto mb-6">
            Browse 50+ styles with filters for fabric, size and price. Delivered across India.
          </p>
          <Button asChild variant="gold" size="lg" className="rounded-full px-10 h-12">
            <Link href="/shop">Go to shop</Link>
          </Button>
        </div>
      </section>

      <ScrollReveal variant="fade-up">
        <section className="container-premium pb-14 sm:pb-20">
          <Newsletter />
        </section>
      </ScrollReveal>
    </>
  );
}
