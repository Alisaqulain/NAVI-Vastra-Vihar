import Link from "next/link";
import { Category } from "@/lib/models";
import { productRepository, categoryRepository, reviewRepository } from "@/lib/repositories";
import { HeroBanner } from "@/components/storefront/HeroBanner";
import { SectionHeading } from "@/components/storefront/SectionHeading";
import { ProductGrid } from "@/components/storefront/ProductGrid";
import { CategoryCard } from "@/components/storefront/CategoryCard";
import { PromoBanner } from "@/components/storefront/PromoBanner";
import { ReviewCard } from "@/components/storefront/ReviewCard";
import { InstagramGallery } from "@/components/storefront/InstagramGallery";
import { Newsletter } from "@/components/storefront/Newsletter";
import { Button } from "@/components/ui/button";

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

      <section className="container mx-auto px-4 py-16">
        <SectionHeading subtitle="Just In" title="New Arrivals" viewAllHref="/shop?category=new-arrivals" />
        <ProductGrid products={newArrivals.data} />
      </section>

      <section className="container mx-auto px-4 py-16">
        <SectionHeading subtitle="Customer Favourites" title="Best Selling Sarees" viewAllHref="/shop?category=best-sellers" />
        <ProductGrid products={bestSellers.data} />
      </section>

      <section className="container mx-auto px-4 py-16">
        <SectionHeading subtitle="Browse By Weave" title="Saree Collections" viewAllHref="/shop" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sareeCategories.slice(0, 8).map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      <section className="bg-cream-dark py-16">
        <div className="container mx-auto px-4">
          <SectionHeading subtitle="Pure Luxury" title="Silk Sarees" viewAllHref="/shop?category=silk-sarees" />
          <ProductGrid products={silkSarees} />
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <SectionHeading subtitle="Heritage Weaves" title="Banarasi Sarees" viewAllHref="/shop?category=banarasi-sarees" />
        <ProductGrid products={banarasiSarees} />
      </section>

      <section className="bg-navy py-16">
        <div className="container mx-auto px-4">
          <SectionHeading subtitle="Celebrate in Style" title="Festive Sarees" viewAllHref="/shop?category=festive-sarees" />
          <ProductGrid products={festiveSarees} />
          <div className="text-center mt-8 sm:hidden">
            <Button asChild variant="gold">
              <Link href="/shop?category=festive-sarees">View Festive Sarees</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <SectionHeading subtitle="For Your Special Day" title="Wedding Sarees" viewAllHref="/shop?category=wedding-sarees" />
        <ProductGrid products={weddingSarees} />
      </section>

      <section className="container mx-auto px-4 py-16">
        <PromoBanner
          title="Diwali Edit — Up to 20% Off Sarees"
          subtitle="Use code FESTIVE20 on saree orders above ₹10,000. Limited time offer on our festive collection."
          ctaLabel="Shop Festive Sarees"
          ctaHref="/shop?category=festive-sarees"
          variant="emerald"
        />
      </section>

      <section className="container mx-auto px-4 py-16">
        <SectionHeading subtitle="Curated For You" title="Recommended Sarees" viewAllHref="/shop" />
        <ProductGrid products={featured.data} />
      </section>

      <section className="bg-cream-dark py-16">
        <div className="container mx-auto px-4">
          <SectionHeading subtitle="Testimonials" title="What Our Customers Say" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <InstagramGallery />
      </section>

      <section className="container mx-auto px-4 pb-16">
        <Newsletter />
      </section>
    </>
  );
}
