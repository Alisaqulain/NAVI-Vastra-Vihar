import { Category } from "@/lib/models";
import { productRepository, categoryRepository, reviewRepository } from "@/lib/repositories";
import { HeroBanner } from "@/components/storefront/HeroBanner";
import { BrandStory } from "@/components/storefront/BrandStory";
import { SectionHeading } from "@/components/storefront/SectionHeading";
import { ProductCarousel } from "@/components/storefront/ProductCarousel";
import { ProductGrid } from "@/components/storefront/ProductGrid";
import { CategoryCard } from "@/components/storefront/CategoryCard";
import { PromoBanner } from "@/components/storefront/PromoBanner";
import { ReviewCard } from "@/components/storefront/ReviewCard";
import { InstagramGallery } from "@/components/storefront/InstagramGallery";
import { Newsletter } from "@/components/storefront/Newsletter";
import { WhyNavi } from "@/components/storefront/WhyNavi";
import { OccasionGrid } from "@/components/storefront/OccasionGrid";

export default async function HomePage() {
  const [newArrivals, bestSellers, featured, categories] = await Promise.all([
    productRepository.findAll({ newArrival: true, limit: 8 }),
    productRepository.findAll({ bestseller: true, limit: 8 }),
    productRepository.findAll({ featured: true, limit: 4 }),
    categoryRepository.findAll(),
  ]);

  const shopCategories = categories.filter(
    (c: Category) => !["cat-new-arrivals", "cat-best-sellers"].includes(c.id)
  );

  const [{ data: sarees }, { data: lehengas }, { data: festive }] = await Promise.all([
    productRepository.findAll({ categoryId: "cat-sarees", limit: 4 }),
    productRepository.findAll({ categoryId: "cat-lehengas", limit: 4 }),
    productRepository.findAll({ categoryId: "cat-festive", limit: 4 }),
  ]);

  const allReviews = await Promise.all(
    ["prod-001", "prod-013", "prod-008", "prod-040"].map((id) => reviewRepository.findByProductId(id))
  );
  const reviews = allReviews.flat().slice(0, 4);

  return (
    <>
      <HeroBanner />

      <section className="section-padding-sm border-b border-beige/40">
        <div className="container-premium">
          <SectionHeading subtitle="Just Arrived" title="New Arrivals" viewAllHref="/shop?category=new-arrivals" />
          <ProductCarousel products={newArrivals.data} />
        </div>
      </section>

      <section className="section-padding-sm">
        <div className="container-premium">
          <SectionHeading subtitle="Collections" title="Shop by Category" viewAllHref="/shop" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {shopCategories.slice(0, 8).map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding-sm bg-ivory-dark/40">
        <div className="container-premium">
          <SectionHeading subtitle="Most Loved" title="Best Sellers" viewAllHref="/shop?category=best-sellers" />
          <ProductCarousel products={bestSellers.data} />
        </div>
      </section>

      <OccasionGrid />

      <section className="section-padding-sm">
        <div className="container-premium">
          <SectionHeading subtitle="Featured Edit" title="Curated for You" viewAllHref="/shop" />
          <ProductGrid products={featured.data} columns={4} />
        </div>
      </section>

      <section className="section-padding-sm border-y border-beige/40">
        <div className="container-premium">
          <SectionHeading subtitle="Pure Luxury" title="Silk Sarees" viewAllHref="/shop?category=sarees" />
          <ProductGrid products={sarees} columns={4} />
        </div>
      </section>

      <section className="section-padding-sm">
        <div className="container-premium">
          <SectionHeading subtitle="Bridal & Festive" title="Lehenga Collection" viewAllHref="/shop?category=lehengas" />
          <ProductGrid products={lehengas} columns={4} />
        </div>
      </section>

      <section className="container-premium section-padding-sm pt-0">
        <PromoBanner
          title="Festive Season Edit"
          subtitle="Up to 20% off on sarees, lehengas and suits. Code FESTIVE20."
          ctaLabel="Shop Festive Wear"
          ctaHref="/shop?category=festive-wear"
        />
      </section>

      <section className="section-padding-sm bg-ivory-dark/40">
        <div className="container-premium">
          <SectionHeading subtitle="Celebrate" title="Festive Collection" viewAllHref="/shop?category=festive-wear" />
          <ProductGrid products={festive} columns={4} />
        </div>
      </section>

      <BrandStory />
      <WhyNavi />

      <section className="section-padding-sm border-t border-beige/40">
        <div className="container-premium">
          <SectionHeading subtitle="Testimonials" title="Loved by Women Across India" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding-sm">
        <div className="container-premium">
          <InstagramGallery />
        </div>
      </section>

      <section className="container-premium pb-14 sm:pb-20">
        <Newsletter />
      </section>
    </>
  );
}
