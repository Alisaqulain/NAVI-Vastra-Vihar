import { Category } from "@/lib/models";

export const categories: Category[] = [
  {
    id: "cat-sarees",
    name: "All Sarees",
    slug: "sarees",
    description: "Explore our complete collection of handwoven and designer sarees.",
    image: "https://images.unsplash.com/photo-1610037129814-458c63926063?w=800&q=80",
    productCount: 32,
    status: "active",
  },
  {
    id: "cat-silk",
    name: "Silk Sarees",
    slug: "silk-sarees",
    description: "Pure silk sarees including Banarasi, Kanjeevaram, Tussar and Organza.",
    image: "https://images.unsplash.com/photo-1583391733981-9a17e7a5661d?w=800&q=80",
    productCount: 10,
    status: "active",
    parentId: "cat-sarees",
  },
  {
    id: "cat-cotton",
    name: "Cotton Sarees",
    slug: "cotton-sarees",
    description: "Breathable handloom cotton sarees for everyday elegance.",
    image: "https://images.unsplash.com/photo-1596870230752-f7cc744e274a?w=800&q=80",
    productCount: 8,
    status: "active",
    parentId: "cat-sarees",
  },
  {
    id: "cat-banarasi",
    name: "Banarasi Sarees",
    slug: "banarasi-sarees",
    description: "Authentic Banarasi silk sarees with intricate zari work from Varanasi.",
    image: "https://images.unsplash.com/photo-1610037129814-458c63926063?w=800&q=80",
    productCount: 6,
    status: "active",
    parentId: "cat-sarees",
  },
  {
    id: "cat-kanjeevaram",
    name: "Kanjeevaram Sarees",
    slug: "kanjeevaram-sarees",
    description: "Heritage Kanjeevaram silks with temple borders from Kanchipuram.",
    image: "https://images.unsplash.com/photo-1583391733981-9a17e7a5661d?w=800&q=80",
    productCount: 5,
    status: "active",
    parentId: "cat-sarees",
  },
  {
    id: "cat-wedding",
    name: "Wedding Sarees",
    slug: "wedding-sarees",
    description: "Bridal and wedding sarees for your special day.",
    image: "https://images.unsplash.com/photo-1599737367085-492f80f7807b?w=800&q=80",
    productCount: 6,
    status: "active",
    parentId: "cat-sarees",
  },
  {
    id: "cat-festive",
    name: "Festive Sarees",
    slug: "festive-sarees",
    description: "Curated sarees for Diwali, Karwa Chauth, weddings and celebrations.",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80",
    productCount: 8,
    status: "active",
    parentId: "cat-sarees",
  },
  {
    id: "cat-handloom",
    name: "Handloom Sarees",
    slug: "handloom-sarees",
    description: "Artisan handloom sarees from weaver clusters across India.",
    image: "https://images.unsplash.com/photo-1610037129814-458c63926063?w=800&q=80",
    productCount: 7,
    status: "active",
    parentId: "cat-sarees",
  },
  {
    id: "cat-new-arrivals",
    name: "New Arrivals",
    slug: "new-arrivals",
    description: "Latest saree additions to our handloom collection.",
    image: "https://images.unsplash.com/photo-1610037129814-458c63926063?w=800&q=80",
    productCount: 12,
    status: "active",
  },
  {
    id: "cat-best-sellers",
    name: "Best Sellers",
    slug: "best-sellers",
    description: "Our most loved sarees chosen by customers.",
    image: "https://images.unsplash.com/photo-1599737367085-492f80f7807b?w=800&q=80",
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
