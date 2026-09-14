import { Category } from "@/lib/models";
import { productRepository, categoryRepository, reviewRepository } from "@/lib/repositories";
import { HeroBanner } from "@/components/storefront/HeroBanner";
import { BrandStory } from "@/components/storefront/BrandStory";
import { SectionHeading } from "@/components/storefront/SectionHeading";
import { ProductGrid } from "@/components/storefront/ProductGrid";
import { CategoryCard } from "@/components/storefront/CategoryCard";
import { PromoBanner } from "@/components/storefront/PromoBanner";
import { ReviewCard } from "@/components/storefront/ReviewCard";
import { InstagramGallery } from "@/components/storefront/InstagramGallery";
import { Newsletter } from "@/components/storefront/Newsletter";
export default async function HomePage() {
  const [newArrivals, bestSellers, featured, categories] = await Promise.all([
    productRepository.findAll({ newArrival: true, limit: 4 }),
    productRepository.findAll({ bestseller: true, limit: 4 }),
    productRepository.findAll({ featured: true, limit: 4 }),
    categoryRepository.findAll(),
  ]);

  const sareeCategories = categories.filter(
    (c: Category) => !["cat-new-arrivals", "cat-best-sellers", "cat-sarees"].includes(c.id)
  );

  const { data: silkSarees } = await productRepository.findAll({ categoryId: "cat-silk", limit: 4 });
  const { data: banarasiSarees } = await productRepository.findAll({ categoryId: "cat-banarasi", limit: 4 });
  const { data: festiveSarees } = await productRepository.findAll({ categoryId: "cat-festive", limit: 4 });
  const { data: weddingSarees } = await productRepository.findAll({ categoryId: "cat-wedding", limit: 4 });

  const allReviews = await Promise.all(
    ["prod-001", "prod-002", "prod-030", "prod-003"].map((id) => reviewRepository.findByProductId(id))
  );
  const reviews = allReviews.flat().slice(0, 4);

  return (
    <>
      <HeroBanner />

      <section className="section-padding">
        <div className="container-premium">
          <SectionHeading subtitle="Just In" title="New Arrivals" viewAllHref="/shop?category=new-arrivals" />
          <ProductGrid products={newArrivals.data} />
        </div>
      </section>

      <BrandStory />

      <section className="section-padding">
        <div className="container-premium">
          <SectionHeading subtitle="Customer Favourites" title="Best Selling Sarees" viewAllHref="/shop?category=best-sellers" />
          <ProductGrid products={bestSellers.data} />
        </div>
      </section>

      <section className="section-padding bg-cream-dark">
        <div className="container-premium">
          <SectionHeading subtitle="Browse By Weave" title="Saree Collections" viewAllHref="/shop" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {sareeCategories.slice(0, 8).map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-premium">
          <SectionHeading subtitle="Pure Luxury" title="Silk Sarees" viewAllHref="/shop?category=silk-sarees" />
          <ProductGrid products={silkSarees} />
        </div>
      </section>

      <section className="section-padding bg-cream-dark">
        <div className="container-premium">
          <SectionHeading subtitle="Heritage Weaves" title="Banarasi Sarees" viewAllHref="/shop?category=banarasi-sarees" />
          <ProductGrid products={banarasiSarees} />
        </div>
      </section>

      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-navy" />
        <div className="container-premium relative z-10">
          <SectionHeading subtitle="Celebrate in Style" title="Festive Sarees" viewAllHref="/shop?category=festive-sarees" light />
          <ProductGrid products={festiveSarees} />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-premium">
          <SectionHeading subtitle="For Your Special Day" title="Wedding Sarees" viewAllHref="/shop?category=wedding-sarees" />
          <ProductGrid products={weddingSarees} />
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-premium">
          <PromoBanner
            title="Diwali Edit — Up to 20% Off"
            subtitle="Use code FESTIVE20 on saree orders above ₹10,000."
            ctaLabel="Shop Festive Sarees"
            ctaHref="/shop?category=festive-sarees"
          />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-premium">
          <SectionHeading subtitle="Curated For You" title="Recommended Sarees" viewAllHref="/shop" />
          <ProductGrid products={featured.data} />
        </div>
      </section>

      <section className="section-padding bg-cream-dark">
        <div className="container-premium">
          <SectionHeading subtitle="Testimonials" title="What Our Customers Say" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-premium">
          <InstagramGallery />
        </div>
      </section>

      <section className="container-premium pb-12 sm:pb-16">
        <Newsletter />
      </section>
    </>
  );
}
