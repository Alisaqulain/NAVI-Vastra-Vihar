import { Category } from "@/lib/models";
import { SITE_IMAGES, unsplash, SAREE_PHOTOS } from "@/lib/constants/images";

const catImg = (i: number) => unsplash(SAREE_PHOTOS[i % SAREE_PHOTOS.length]);

export const categories: Category[] = [
  {
    id: "cat-new-arrivals",
    name: "New Arrivals",
    slug: "new-arrivals",
    description: "The latest additions to our curated Indian fashion collection.",
    image: catImg(3),
    productCount: 14,
    status: "active",
  },
  {
    id: "cat-best-sellers",
    name: "Best Sellers",
    slug: "best-sellers",
    description: "Our most loved pieces, chosen by women across India.",
    image: catImg(0),
    productCount: 16,
    status: "active",
  },
  {
    id: "cat-sarees",
    name: "Sarees",
    slug: "sarees",
    description: "Handwoven Banarasi, Kanjeevaram, silk and cotton sarees for every occasion.",
    image: SITE_IMAGES.categories["cat-sarees"] ?? catImg(0),
    productCount: 12,
    status: "active",
  },
  {
    id: "cat-lehengas",
    name: "Lehengas",
    slug: "lehengas",
    description: "Bridal and festive lehengas with exquisite embroidery and rich fabrics.",
    image: catImg(2),
    productCount: 6,
    status: "active",
  },
  {
    id: "cat-suits",
    name: "Suits",
    slug: "suits",
    description: "Elegant salwar suits and anarkali sets for celebrations and everyday grace.",
    image: catImg(1),
    productCount: 6,
    status: "active",
  },
  {
    id: "cat-kurtis",
    name: "Kurtis",
    slug: "kurtis",
    description: "Contemporary kurtis blending comfort with artisan craftsmanship.",
    image: catImg(4),
    productCount: 6,
    status: "active",
  },
  {
    id: "cat-dupattas",
    name: "Dupattas",
    slug: "dupattas",
    description: "Luxurious dupattas to complete your ethnic ensemble.",
    image: catImg(3),
    productCount: 4,
    status: "active",
  },
  {
    id: "cat-festive",
    name: "Festive Wear",
    slug: "festive-wear",
    description: "Curated for Diwali, weddings, Karwa Chauth and every celebration.",
    image: catImg(2),
    productCount: 8,
    status: "active",
  },
  {
    id: "cat-party",
    name: "Party Wear",
    slug: "party-wear",
    description: "Statement pieces for evening soirées and cocktail celebrations.",
    image: catImg(0),
    productCount: 6,
    status: "active",
  },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
