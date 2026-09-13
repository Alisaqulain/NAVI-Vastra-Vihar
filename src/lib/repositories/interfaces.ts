import {
  Product,
  Category,
  ProductFilters,
  Order,
  OrderStatus,
  PaymentStatus,
  Customer,
  Coupon,
  Review,
  Inventory,
  InventoryTransaction,
  DashboardStats,
  ReportFilters,
  User,
} from "@/lib/models";

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}

export interface IProductRepository {
  findAll(filters?: ProductFilters): Promise<PaginatedResult<Product>>;
  findById(id: string): Promise<Product | null>;
  findBySlug(slug: string): Promise<Product | null>;
  create(product: Omit<Product, "id" | "createdAt" | "updatedAt">): Promise<Product>;
  update(id: string, data: Partial<Product>): Promise<Product | null>;
  delete(id: string): Promise<boolean>;
}

export interface ICategoryRepository {
  findAll(): Promise<Category[]>;
  findById(id: string): Promise<Category | null>;
  findBySlug(slug: string): Promise<Category | null>;
  create(category: Omit<Category, "id">): Promise<Category>;
  update(id: string, data: Partial<Category>): Promise<Category | null>;
  delete(id: string): Promise<boolean>;
}

export interface IOrderRepository {
  findAll(filters?: { status?: OrderStatus; paymentStatus?: PaymentStatus; search?: string }): Promise<Order[]>;
  findById(id: string): Promise<Order | null>;
  findByUserId(userId: string): Promise<Order[]>;
  create(order: Omit<Order, "id" | "createdAt" | "updatedAt">): Promise<Order>;
  updateStatus(id: string, orderStatus: OrderStatus, note?: string): Promise<Order | null>;
  updatePaymentStatus(id: string, paymentStatus: PaymentStatus): Promise<Order | null>;
}

export interface ICustomerRepository {
  findAll(filters?: { search?: string; status?: string }): Promise<Customer[]>;
  findById(id: string): Promise<Customer | null>;
  update(id: string, data: Partial<Customer>): Promise<Customer | null>;
}

export interface ICouponRepository {
  findAll(): Promise<Coupon[]>;
  findByCode(code: string): Promise<Coupon | null>;
  findById(id: string): Promise<Coupon | null>;
  create(coupon: Omit<Coupon, "id" | "usedCount">): Promise<Coupon>;
  update(id: string, data: Partial<Coupon>): Promise<Coupon | null>;
  delete(id: string): Promise<boolean>;
}

export interface IReviewRepository {
  findByProductId(productId: string): Promise<Review[]>;
  create(review: Omit<Review, "id" | "createdAt">): Promise<Review>;
}

export interface IInventoryRepository {
  findAll(filters?: { status?: string; search?: string }): Promise<Inventory[]>;
  findByProductId(productId: string): Promise<Inventory | null>;
  adjustStock(productId: string, quantity: number, type: InventoryTransaction["type"], reason: string, createdBy: string): Promise<Inventory | null>;
  setThreshold(productId: string, threshold: number): Promise<Inventory | null>;
  getTransactions(productId?: string): Promise<InventoryTransaction[]>;
}

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(user: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User>;
}

export interface IReportRepository {
  getDashboardStats(): Promise<DashboardStats>;
  getRevenueChart(filters: ReportFilters): Promise<{ date: string; revenue: number }[]>;
  getOrdersChart(filters: ReportFilters): Promise<{ date: string; orders: number }[]>;
  getTopProducts(limit?: number): Promise<{ product: Product; sold: number; revenue: number }[]>;
  getSalesByCategory(filters: ReportFilters): Promise<{ category: string; revenue: number; orders: number }[]>;
}
