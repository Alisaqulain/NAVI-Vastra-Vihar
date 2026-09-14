import { Product } from "@/lib/models";
import { getProductImages } from "@/lib/constants/images";

type Seed = Partial<Product> & Pick<Product, "id" | "name" | "slug" | "price" | "sku" | "categoryId">;

const SAREE_SIZES = ["Free Size"];
const WEAR_SIZES = ["XS", "S", "M", "L", "XL"];
const SUIT_SIZES = ["S", "M", "L", "XL", "XXL"];

const base = (seed: Seed): Product => ({
  description: "A premium piece from NAVI Vastra Vihar's curated Indian fashion collection.",
  shortDescription: "Premium ethnic wear",
  images: getProductImages(seed.id),
  sizes: SAREE_SIZES,
  colors: [{ name: "Gold", hex: "#B8956A" }],
  fabric: "Silk",
  stockQuantity: 10,
  lowStockThreshold: 5,
  rating: 4.5,
  reviewCount: 12,
  status: "active",
  featured: false,
  bestseller: false,
  newArrival: false,
  specifications: { Fabric: "Silk", Care: "Dry clean only" },
  createdAt: "2025-08-01T10:00:00Z",
  updatedAt: "2025-09-01T10:00:00Z",
  ...seed,
});

const catalog: Seed[] = [
  // Sarees (12)
  { id: "prod-001", sku: "NV-SR-001", categoryId: "cat-sarees", name: "Banarasi Silk Saree — Royal Gold", slug: "banarasi-silk-saree-royal-gold", price: 24999, salePrice: 19999, fabric: "Pure Banarasi Silk", featured: true, bestseller: true, rating: 4.9, reviewCount: 48, colors: [{ name: "Gold", hex: "#B8956A" }, { name: "Maroon", hex: "#6B1B2A" }] },
  { id: "prod-002", sku: "NV-SR-002", categoryId: "cat-sarees", name: "Kanjeevaram Temple Border Saree", slug: "kanjeevaram-temple-border-saree", price: 32999, salePrice: 28999, fabric: "Kanjeevaram Silk", featured: true, bestseller: true, newArrival: true, rating: 4.8, reviewCount: 36 },
  { id: "prod-003", sku: "NV-SR-003", categoryId: "cat-sarees", name: "Handloom Cotton Saree — Indigo Block Print", slug: "handloom-cotton-saree-indigo", price: 3499, salePrice: 2799, fabric: "Handloom Cotton", bestseller: true, colors: [{ name: "Indigo", hex: "#1B2A4A" }] },
  { id: "prod-004", sku: "NV-SR-004", categoryId: "cat-sarees", name: "Tussar Silk Saree — Natural Gold", slug: "tussar-silk-saree-natural-gold", price: 12999, fabric: "Tussar Silk", featured: true, newArrival: true },
  { id: "prod-005", sku: "NV-SR-005", categoryId: "cat-sarees", name: "Chanderi Silk Cotton Saree", slug: "chanderi-silk-cotton-saree", price: 8999, salePrice: 7499, fabric: "Chanderi Silk Cotton", newArrival: true },
  { id: "prod-006", sku: "NV-SR-006", categoryId: "cat-sarees", name: "Organza Saree — Pearl Embroidery", slug: "organza-saree-pearl-embroidery", price: 18999, salePrice: 15999, fabric: "Organza", featured: true, stockQuantity: 6 },
  { id: "prod-007", sku: "NV-SR-007", categoryId: "cat-sarees", name: "Paithani Silk Saree — Peacock Motif", slug: "paithani-silk-saree-peacock", price: 45999, fabric: "Paithani Silk", featured: true, bestseller: true, stockQuantity: 4, rating: 5, reviewCount: 22 },
  { id: "prod-008", sku: "NV-SR-008", categoryId: "cat-sarees", name: "Banarasi Red Bridal Saree", slug: "banarasi-red-bridal-saree", price: 54999, salePrice: 47999, fabric: "Pure Banarasi Silk", featured: true, bestseller: true, stockQuantity: 3, rating: 4.9, reviewCount: 31 },
  { id: "prod-009", sku: "NV-SR-009", categoryId: "cat-sarees", name: "Mysore Silk Saree — Royal Purple", slug: "mysore-silk-saree-royal-purple", price: 18999, salePrice: 16999, fabric: "Mysore Silk" },
  { id: "prod-010", sku: "NV-SR-010", categoryId: "cat-sarees", name: "Sambalpuri Ikat Saree", slug: "sambalpuri-ikat-saree", price: 6999, fabric: "Handloom Cotton", newArrival: true },
  { id: "prod-011", sku: "NV-SR-011", categoryId: "cat-sarees", name: "Muga Silk Saree — Assam Gold", slug: "muga-silk-saree-assam-gold", price: 35999, fabric: "Muga Silk", featured: true },
  { id: "prod-012", sku: "NV-SR-012", categoryId: "cat-sarees", name: "Banarasi Tissue Saree — Champagne", slug: "banarasi-tissue-champagne", price: 27999, fabric: "Banarasi Tissue" },

  // Lehengas (6)
  { id: "prod-013", sku: "NV-LG-001", categoryId: "cat-lehengas", name: "Bridal Lehenga — Maroon Zari", slug: "bridal-lehenga-maroon-zari", price: 89999, salePrice: 74999, fabric: "Raw Silk", sizes: WEAR_SIZES, featured: true, bestseller: true, rating: 4.9, reviewCount: 18 },
  { id: "prod-014", sku: "NV-LG-002", categoryId: "cat-lehengas", name: "Pastel Pink Reception Lehenga", slug: "pastel-pink-reception-lehenga", price: 54999, salePrice: 46999, fabric: "Georgette", sizes: WEAR_SIZES, newArrival: true, rating: 4.7, reviewCount: 14 },
  { id: "prod-015", sku: "NV-LG-003", categoryId: "cat-lehengas", name: "Emerald Velvet Festive Lehenga", slug: "emerald-velvet-festive-lehenga", price: 42999, fabric: "Velvet", sizes: WEAR_SIZES, featured: true },
  { id: "prod-016", sku: "NV-LG-004", categoryId: "cat-lehengas", name: "Ivory Mirror Work Lehenga", slug: "ivory-mirror-work-lehenga", price: 38999, salePrice: 32999, fabric: "Net", sizes: WEAR_SIZES, bestseller: true },
  { id: "prod-017", sku: "NV-LG-005", categoryId: "cat-lehengas", name: "Royal Blue Anarkali Lehenga Set", slug: "royal-blue-anarkali-lehenga", price: 32999, fabric: "Silk Blend", sizes: WEAR_SIZES },
  { id: "prod-018", sku: "NV-LG-006", categoryId: "cat-lehengas", name: "Haldi Yellow Floral Lehenga", slug: "haldi-yellow-floral-lehenga", price: 24999, salePrice: 19999, fabric: "Cotton Silk", sizes: WEAR_SIZES, newArrival: true },

  // Suits (6)
  { id: "prod-019", sku: "NV-ST-001", categoryId: "cat-suits", name: "Anarkali Suit — Wine Gold Embroidery", slug: "anarkali-suit-wine-gold", price: 14999, salePrice: 12499, fabric: "Georgette", sizes: SUIT_SIZES, featured: true, bestseller: true },
  { id: "prod-020", sku: "NV-ST-002", categoryId: "cat-suits", name: "Palazzo Suit — Mint Chikankari", slug: "palazzo-suit-mint-chikankari", price: 8999, fabric: "Cotton", sizes: SUIT_SIZES, newArrival: true },
  { id: "prod-021", sku: "NV-ST-003", categoryId: "cat-suits", name: "Sharara Suit — Dusty Rose", slug: "sharara-suit-dusty-rose", price: 12999, fabric: "Silk Blend", sizes: SUIT_SIZES, featured: true },
  { id: "prod-022", sku: "NV-ST-004", categoryId: "cat-suits", name: "Straight Cut Suit — Navy Gold", slug: "straight-cut-suit-navy-gold", price: 10999, salePrice: 9499, fabric: "Crepe", sizes: SUIT_SIZES },
  { id: "prod-023", sku: "NV-ST-005", categoryId: "cat-suits", name: "Festive Anarkali — Emerald Buti", slug: "festive-anarkali-emerald-buti", price: 16999, fabric: "Silk", sizes: SUIT_SIZES, bestseller: true },
  { id: "prod-024", sku: "NV-ST-006", categoryId: "cat-suits", name: "Cotton Suit — Block Print Indigo", slug: "cotton-suit-block-print-indigo", price: 5999, salePrice: 4999, fabric: "Handloom Cotton", sizes: SUIT_SIZES },

  // Kurtis (6)
  { id: "prod-025", sku: "NV-KR-001", categoryId: "cat-kurtis", name: "A-Line Kurti — Ivory Embroidered", slug: "a-line-kurti-ivory-embroidered", price: 3499, salePrice: 2999, fabric: "Cotton", sizes: ["S", "M", "L", "XL"], newArrival: true, bestseller: true },
  { id: "prod-026", sku: "NV-KR-002", categoryId: "cat-kurtis", name: "Straight Kurti — Maroon Bandhani", slug: "straight-kurti-maroon-bandhani", price: 2799, fabric: "Cotton", sizes: ["S", "M", "L", "XL"] },
  { id: "prod-027", sku: "NV-KR-003", categoryId: "cat-kurtis", name: "Angrakha Kurti — Peach Silk", slug: "angrakha-kurti-peach-silk", price: 4999, salePrice: 4299, fabric: "Silk Blend", sizes: ["S", "M", "L", "XL"], featured: true },
  { id: "prod-028", sku: "NV-KR-004", categoryId: "cat-kurtis", name: "Flared Kurti — Teal Block Print", slug: "flared-kurti-teal-block-print", price: 3299, fabric: "Cotton Voile", sizes: ["S", "M", "L", "XL"] },
  { id: "prod-029", sku: "NV-KR-005", categoryId: "cat-kurtis", name: "Designer Kurti — Gold Sequin", slug: "designer-kurti-gold-sequin", price: 6999, fabric: "Georgette", sizes: ["S", "M", "L", "XL"], newArrival: true },
  { id: "prod-030", sku: "NV-KR-006", categoryId: "cat-kurtis", name: "Office Wear Kurti — Charcoal Linen", slug: "office-wear-kurti-charcoal-linen", price: 2499, fabric: "Linen", sizes: ["S", "M", "L", "XL"], bestseller: true },

  // Dupattas (4)
  { id: "prod-031", sku: "NV-DP-001", categoryId: "cat-dupattas", name: "Banarasi Dupatta — Gold Brocade", slug: "banarasi-dupatta-gold-brocade", price: 4999, salePrice: 3999, fabric: "Banarasi Silk", sizes: SAREE_SIZES, featured: true },
  { id: "prod-032", sku: "NV-DP-002", categoryId: "cat-dupattas", name: "Phulkari Dupatta — Multicolor", slug: "phulkari-dupatta-multicolor", price: 3499, fabric: "Cotton", sizes: SAREE_SIZES, bestseller: true },
  { id: "prod-033", sku: "NV-DP-003", categoryId: "cat-dupattas", name: "Organza Dupatta — Pearl Border", slug: "organza-dupatta-pearl-border", price: 2999, fabric: "Organza", sizes: SAREE_SIZES, newArrival: true },
  { id: "prod-034", sku: "NV-DP-004", categoryId: "cat-dupattas", name: "Bandhani Dupatta — Red Gold", slug: "bandhani-dupatta-red-gold", price: 2499, fabric: "Cotton Silk", sizes: SAREE_SIZES },

  // Festive & Party (4 each overlap with categories - assign to festive/party)
  { id: "prod-035", sku: "NV-FW-001", categoryId: "cat-festive", name: "Diwali Silk Saree — Maroon Zari", slug: "diwali-silk-saree-maroon-zari", price: 14999, salePrice: 11999, fabric: "Silk", featured: true, bestseller: true, newArrival: true },
  { id: "prod-036", sku: "NV-FW-002", categoryId: "cat-festive", name: "Karwa Chauth Red Saree Set", slug: "karwa-chauth-red-saree-set", price: 11999, fabric: "Silk Blend", bestseller: true },
  { id: "prod-037", sku: "NV-FW-003", categoryId: "cat-festive", name: "Navratri Chaniya Style Saree", slug: "navratri-chaniya-style-saree", price: 7999, fabric: "Cotton Silk", featured: true },
  { id: "prod-038", sku: "NV-FW-004", categoryId: "cat-festive", name: "Eid Special Pearl White Saree", slug: "eid-special-pearl-white-saree", price: 12999, salePrice: 10999, fabric: "Silk", newArrival: true },

  { id: "prod-039", sku: "NV-PW-001", categoryId: "cat-party", name: "Designer Net Saree — Cocktail Black", slug: "designer-net-saree-cocktail", price: 16999, salePrice: 13999, fabric: "Net", featured: true, newArrival: true },
  { id: "prod-040", sku: "NV-PW-002", categoryId: "cat-party", name: "Sequin Party Lehenga — Rose Gold", slug: "sequin-party-lehenga-rose-gold", price: 44999, salePrice: 37999, fabric: "Net", sizes: WEAR_SIZES, bestseller: true, rating: 4.8, reviewCount: 19 },
  { id: "prod-041", sku: "NV-PW-003", categoryId: "cat-party", name: "Indo-Western Gown — Emerald", slug: "indo-western-gown-emerald", price: 22999, fabric: "Georgette", sizes: WEAR_SIZES, featured: true },
  { id: "prod-042", sku: "NV-PW-004", categoryId: "cat-party", name: "Ruffle Saree Gown — Blush Pink", slug: "ruffle-saree-gown-blush-pink", price: 18999, salePrice: 15999, fabric: "Georgette", sizes: SAREE_SIZES, newArrival: true },
];

export const products: Product[] = catalog.map(base);

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
