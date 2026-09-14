export type UserRole = "customer" | "admin";

export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRole;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: string;
  userId: string;
  label: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  parentId?: string;
  subcategories?: Category[];
  productCount: number;
  status: "active" | "inactive";
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  subcategoryId?: string;
  description: string;
  shortDescription: string;
  price: number;
  salePrice?: number;
  images: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  fabric: string;
  sku: string;
  stockQuantity: number;
  lowStockThreshold: number;
  rating: number;
  reviewCount: number;
  status: "active" | "inactive";
  featured: boolean;
  bestseller: boolean;
  newArrival: boolean;
  specifications: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
  verified: boolean;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "returned";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  sku: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  salePrice?: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  shippingAddress: Address;
  subtotal: number;
  shipping: number;
  discount: number;
  couponCode?: string;
  total: number;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  paymentMethod: string;
  timeline: { status: OrderStatus; date: string; note?: string }[];
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: string;
  registrationDate: string;
  notes?: string;
  addresses: Address[];
}

export type InventoryStatus = "in_stock" | "low_stock" | "out_of_stock";

export interface Inventory {
  id: string;
  productId: string;
  sku: string;
  productName: string;
  categoryId: string;
  currentStock: number;
  reservedStock: number;
  availableStock: number;
  lowStockThreshold: number;
  status: InventoryStatus;
  updatedAt: string;
}

export type InventoryTransactionType =
  | "increase"
  | "decrease"
  | "adjustment"
  | "sale"
  | "return";

export interface InventoryTransaction {
  id: string;
  inventoryId: string;
  productId: string;
  type: InventoryTransactionType;
  quantity: number;
  previousStock: number;
  newStock: number;
  reason: string;
  createdBy: string;
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minimumOrderValue: number;
  maximumDiscount?: number;
  startDate: string;
  expiryDate: string;
  usageLimit: number;
  usedCount: number;
  status: "active" | "inactive";
}

export interface CartItem {
  productId: string;
  quantity: number;
  size: string;
  color: string;
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  lowStockProducts: number;
  outOfStockProducts: number;
  pendingOrders: number;
  completedOrders: number;
}

export interface ReportFilters {
  period: "today" | "7days" | "30days" | "year" | "custom";
  startDate?: string;
  endDate?: string;
}

export interface ProductFilters {
  search?: string;
  categoryId?: string;
  subcategoryId?: string;
  sizes?: string[];
  colors?: string[];
  fabrics?: string[];
  availability?: "in_stock" | "out_of_stock";
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "featured" | "newest" | "price_asc" | "price_desc" | "bestselling";
  page?: number;
  limit?: number;
  featured?: boolean;
  bestseller?: boolean;
  newArrival?: boolean;
}
