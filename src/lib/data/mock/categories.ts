import { Category } from "@/lib/models";
import { SITE_IMAGES } from "@/lib/constants/images";

export const categories: Category[] = [
  {
    id: "cat-sarees",
    name: "All Sarees",
    slug: "sarees",
    description: "Explore our complete collection of handwoven and designer sarees.",
    image: SITE_IMAGES.categories["cat-sarees"],
    productCount: 32,
    status: "active",
  },
  {
    id: "cat-silk",
    name: "Silk Sarees",
    slug: "silk-sarees",
    description: "Pure silk sarees including Banarasi, Kanjeevaram, Tussar and Organza.",
    image: SITE_IMAGES.categories["cat-silk"],
    productCount: 10,
    status: "active",
    parentId: "cat-sarees",
  },
  {
    id: "cat-cotton",
    name: "Cotton Sarees",
    slug: "cotton-sarees",
    description: "Breathable handloom cotton sarees for everyday elegance.",
    image: SITE_IMAGES.categories["cat-cotton"],
    productCount: 8,
    status: "active",
    parentId: "cat-sarees",
  },
  {
    id: "cat-banarasi",
    name: "Banarasi Sarees",
    slug: "banarasi-sarees",
    description: "Authentic Banarasi silk sarees with intricate zari work from Varanasi.",
    image: SITE_IMAGES.categories["cat-banarasi"],
    productCount: 6,
    status: "active",
    parentId: "cat-sarees",
  },
  {
    id: "cat-kanjeevaram",
    name: "Kanjeevaram Sarees",
    slug: "kanjeevaram-sarees",
    description: "Heritage Kanjeevaram silks with temple borders from Kanchipuram.",
    image: SITE_IMAGES.categories["cat-kanjeevaram"],
    productCount: 5,
    status: "active",
    parentId: "cat-sarees",
  },
  {
    id: "cat-wedding",
    name: "Wedding Sarees",
    slug: "wedding-sarees",
    description: "Bridal and wedding sarees for your special day.",
    image: SITE_IMAGES.categories["cat-wedding"],
    productCount: 6,
    status: "active",
    parentId: "cat-sarees",
  },
  {
    id: "cat-festive",
    name: "Festive Sarees",
    slug: "festive-sarees",
    description: "Curated sarees for Diwali, Karwa Chauth, weddings and celebrations.",
    image: SITE_IMAGES.categories["cat-festive"],
    productCount: 8,
    status: "active",
    parentId: "cat-sarees",
  },
  {
    id: "cat-handloom",
    name: "Handloom Sarees",
    slug: "handloom-sarees",
    description: "Artisan handloom sarees from weaver clusters across India.",
    image: SITE_IMAGES.categories["cat-handloom"],
    productCount: 7,
    status: "active",
    parentId: "cat-sarees",
  },
  {
    id: "cat-new-arrivals",
    name: "New Arrivals",
    slug: "new-arrivals",
    description: "Latest saree additions to our handloom collection.",
    image: SITE_IMAGES.categories["cat-new-arrivals"],
    productCount: 12,
    status: "active",
  },
  {
    id: "cat-best-sellers",
    name: "Best Sellers",
    slug: "best-sellers",
    description: "Our most loved sarees chosen by customers.",
    image: SITE_IMAGES.categories["cat-best-sellers"],
    productCount: 12,
    status: "active",
  },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
