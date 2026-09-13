import { Coupon, Review, Inventory, InventoryTransaction } from "@/lib/models";
import { products } from "./products";

export const coupons: Coupon[] = [
  {
    id: "coup-001", code: "NAVI10", description: "10% off on saree orders above ₹5,000",
    discountType: "percentage", discountValue: 10, minimumOrderValue: 5000, maximumDiscount: 5000,
    startDate: "2025-01-01T00:00:00Z", expiryDate: "2025-12-31T23:59:59Z", usageLimit: 1000, usedCount: 245, status: "active",
  },
  {
    id: "coup-002", code: "WELCOME500", description: "Flat ₹500 off for new customers",
    discountType: "fixed", discountValue: 500, minimumOrderValue: 2000,
    startDate: "2025-01-01T00:00:00Z", expiryDate: "2025-12-31T23:59:59Z", usageLimit: 500, usedCount: 128, status: "active",
  },
  {
    id: "coup-003", code: "FESTIVE20", description: "20% off festive saree collection",
    discountType: "percentage", discountValue: 20, minimumOrderValue: 10000, maximumDiscount: 10000,
    startDate: "2025-09-01T00:00:00Z", expiryDate: "2025-10-31T23:59:59Z", usageLimit: 200, usedCount: 45, status: "active",
  },
  {
    id: "coup-004", code: "EXPIRED50", description: "Expired test coupon",
    discountType: "fixed", discountValue: 50, minimumOrderValue: 500,
    startDate: "2024-01-01T00:00:00Z", expiryDate: "2024-12-31T23:59:59Z", usageLimit: 100, usedCount: 100, status: "inactive",
  },
];

export const reviews: Review[] = [
  { id: "rev-001", productId: "prod-001", userId: "user-001", userName: "Priya Sharma", rating: 5, title: "Absolutely stunning saree!", comment: "The zari work is exquisite and the fabric quality is premium. Received so many compliments at the wedding.", createdAt: "2025-09-07T10:00:00Z", verified: true },
  { id: "rev-002", productId: "prod-001", userId: "user-002", userName: "Ananya Patel", rating: 5, title: "Worth every rupee", comment: "Authentic Banarasi silk with beautiful drape. NAVI never disappoints.", createdAt: "2025-08-15T10:00:00Z", verified: true },
  { id: "rev-003", productId: "prod-003", userId: "user-003", userName: "Meera Reddy", rating: 4, title: "Perfect daily wear saree", comment: "Comfortable cotton, beautiful block print. Drapes beautifully for office wear.", createdAt: "2025-08-20T10:00:00Z", verified: true },
  { id: "rev-004", productId: "prod-030", userId: "user-002", userName: "Ananya Patel", rating: 5, title: "Dream bridal saree", comment: "Made me feel like a queen on my wedding day. The Kanjeevaram zari is breathtaking.", createdAt: "2025-09-06T10:00:00Z", verified: true },
  { id: "rev-005", productId: "prod-002", userId: "user-001", userName: "Priya Sharma", rating: 5, title: "Authentic Kanjeevaram", comment: "The temple border is perfectly woven. A heirloom piece.", createdAt: "2025-09-10T10:00:00Z", verified: true },
  { id: "rev-006", productId: "prod-019", userId: "user-005", userName: "Kavita Singh", rating: 4, title: "Beautiful Diwali saree", comment: "Rich maroon colour and excellent zari work. Perfect for festive occasions.", createdAt: "2025-08-25T10:00:00Z", verified: true },
];

function getInventoryStatus(stock: number, threshold: number): Inventory["status"] {
  if (stock === 0) return "out_of_stock";
  if (stock <= threshold) return "low_stock";
  return "in_stock";
}

export const inventory: Inventory[] = products.map((p) => ({
  id: `inv-${p.id}`,
  productId: p.id,
  sku: p.sku,
  productName: p.name,
  categoryId: p.categoryId,
  currentStock: p.stockQuantity,
  reservedStock: p.stockQuantity > 0 ? Math.min(2, p.stockQuantity) : 0,
  availableStock: Math.max(0, p.stockQuantity - Math.min(2, p.stockQuantity)),
  lowStockThreshold: p.lowStockThreshold,
  status: getInventoryStatus(p.stockQuantity, p.lowStockThreshold),
  updatedAt: p.updatedAt,
}));

export const inventoryTransactions: InventoryTransaction[] = [
  { id: "txn-001", inventoryId: "inv-prod-001", productId: "prod-001", type: "sale", quantity: -1, previousStock: 13, newStock: 12, reason: "Order NV-2025-001", createdBy: "system", createdAt: "2025-09-01T10:00:00Z" },
  { id: "txn-002", inventoryId: "inv-prod-001", productId: "prod-001", type: "increase", quantity: 5, previousStock: 8, newStock: 13, reason: "Restock from warehouse", createdBy: "Admin NAVI", createdAt: "2025-08-28T09:00:00Z" },
  { id: "txn-003", inventoryId: "inv-prod-020", productId: "prod-020", type: "sale", quantity: -3, previousStock: 3, newStock: 0, reason: "Festive season sales", createdBy: "system", createdAt: "2025-09-05T14:00:00Z" },
];

export function getCouponByCode(code: string): Coupon | undefined {
  return coupons.find((c) => c.code.toLowerCase() === code.toLowerCase());
}

export function getReviewsByProductId(productId: string): Review[] {
  return reviews.filter((r) => r.productId === productId);
}
