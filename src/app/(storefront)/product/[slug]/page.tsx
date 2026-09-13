import { notFound } from "next/navigation";
import { productRepository, categoryRepository, reviewRepository } from "@/lib/repositories";
import { Breadcrumbs } from "@/components/storefront/Breadcrumbs";
import { ProductDetails } from "@/components/storefront/ProductDetails";
import { SectionHeading } from "@/components/storefront/SectionHeading";
import { ProductGrid } from "@/components/storefront/ProductGrid";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await productRepository.findBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} | NAVI Vastra Vihar`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await productRepository.findBySlug(slug);
  if (!product) notFound();

  const [category, reviews, related] = await Promise.all([
    categoryRepository.findById(product.categoryId),
    reviewRepository.findByProductId(product.id),
    productRepository.findAll({ categoryId: product.categoryId, limit: 4 }),
  ]);

  const relatedProducts = related.data.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Shop", href: "/shop" },
          ...(category ? [{ label: category.name, href: `/shop?category=${category.slug}` }] : []),
          { label: product.name },
        ]}
        className="mb-8"
      />
      <ProductDetails product={product} reviews={reviews} />

      {relatedProducts.length > 0 && (
        <section className="mt-16 pt-16 border-t border-beige">
          <SectionHeading subtitle="You May Also Like" title="Related Products" />
          <ProductGrid products={relatedProducts} />
        </section>
      )}
    </div>
  );
}
