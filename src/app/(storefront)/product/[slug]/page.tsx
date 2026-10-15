import { notFound } from "next/navigation";
import { categoryRepository, reviewRepository } from "@/lib/repositories";
import { storefrontProductRepository } from "@/lib/repositories/product-storefront.server";
import { Breadcrumbs } from "@/components/storefront/Breadcrumbs";
import { ProductDetails } from "@/components/storefront/ProductDetails";
import { SectionHeading } from "@/components/storefront/SectionHeading";
import { ProductGrid } from "@/components/storefront/ProductGrid";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await storefrontProductRepository.findBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} | NAVI Vastra Vihar`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await storefrontProductRepository.findBySlug(slug);
  if (!product) notFound();

  const [category, reviews, related] = await Promise.all([
    categoryRepository.findById(product.categoryId),
    reviewRepository.findByProductId(product.id),
    storefrontProductRepository.findAll({ categoryId: product.categoryId, limit: 4 }),
  ]);

  const relatedProducts = related.data.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 via-white to-white">
      <div className="container-premium py-4 sm:py-7 lg:py-9">
        <Breadcrumbs
          items={[
            { label: "Shop", href: "/shop" },
            ...(category ? [{ label: category.name, href: `/shop?category=${category.slug}` }] : []),
            { label: product.name },
          ]}
          className="mb-5 sm:mb-8 text-xs sm:text-sm"
        />
        <ProductDetails product={product} reviews={reviews} categoryName={category?.name} />

        {relatedProducts.length > 0 && (
          <section className="mt-14 lg:mt-20 pt-10 border-t border-neutral-200">
            <SectionHeading subtitle="You May Also Like" title="Related Products" />
            <ProductGrid products={relatedProducts} />
          </section>
        )}
      </div>
    </div>
  );
}
