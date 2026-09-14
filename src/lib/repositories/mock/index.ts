import {
  Product,
  ProductFilters,
  Category,
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
import {
  IProductRepository,
  ICategoryRepository,
  IOrderRepository,
  ICustomerRepository,
  ICouponRepository,
  IReviewRepository,
  IInventoryRepository,
  IUserRepository,
  IReportRepository,
  PaginatedResult,
} from "../interfaces";
import { products as mockProducts } from "@/lib/data/mock/products";
import { categories as mockCategories } from "@/lib/data/mock/categories";
import { orders as mockOrders } from "@/lib/data/mock/orders";
import { customers as mockCustomers, users as mockUsers, getUserByEmail } from "@/lib/data/mock/users";
import { coupons as mockCoupons, reviews as mockReviews, inventory as mockInventory, inventoryTransactions as mockTransactions } from "@/lib/data/mock/coupons-reviews-inventory";
import { generateId } from "@/lib/utils";

let products = [...mockProducts];
let categories = [...mockCategories];
let orders = [...mockOrders];
let customers = [...mockCustomers];
let coupons = [...mockCoupons];
let reviews = [...mockReviews];
let inventory = [...mockInventory];
let transactions = [...mockTransactions];
let users = [...mockUsers];

function sortProducts(items: Product[], sortBy?: ProductFilters["sortBy"]): Product[] {
  const sorted = [...items];
  switch (sortBy) {
    case "newest":
      return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case "price_asc":
      return sorted.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
    case "price_desc":
      return sorted.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
    case "bestselling":
      return sorted.sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0));
    case "featured":
    default:
      return sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }
}

function filterProducts(items: Product[], filters?: ProductFilters): Product[] {
  let result = items.filter((p) => p.status === "active");

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q)
    );
  }
  if (filters?.categoryId) {
    if (filters.categoryId === "cat-new-arrivals") {
      result = result.filter((p) => p.newArrival);
    } else if (filters.categoryId === "cat-best-sellers") {
      result = result.filter((p) => p.bestseller);
    } else {
      result = result.filter(
        (p) => p.categoryId === filters.categoryId || p.subcategoryId === filters.categoryId
      );
    }
  }
  if (filters?.subcategoryId) {
    result = result.filter((p) => p.subcategoryId === filters.subcategoryId);
  }
  if (filters?.sizes?.length) {
    result = result.filter((p) => filters.sizes!.some((s) => p.sizes.includes(s)));
  }
  if (filters?.colors?.length) {
    result = result.filter((p) => filters.colors!.some((c) => p.colors.some((pc) => pc.name === c)));
  }
  if (filters?.fabrics?.length) {
    result = result.filter((p) => filters.fabrics!.some((f) => p.fabric.toLowerCase().includes(f.toLowerCase())));
  }
  if (filters?.availability === "in_stock") {
    result = result.filter((p) => p.stockQuantity > 0);
  }
  if (filters?.availability === "out_of_stock") {
    result = result.filter((p) => p.stockQuantity === 0);
  }
  if (filters?.minPrice !== undefined) {
    result = result.filter((p) => (p.salePrice ?? p.price) >= filters.minPrice!);
  }
  if (filters?.maxPrice !== undefined) {
    result = result.filter((p) => (p.salePrice ?? p.price) <= filters.maxPrice!);
  }
  if (filters?.featured) result = result.filter((p) => p.featured);
  if (filters?.bestseller) result = result.filter((p) => p.bestseller);
  if (filters?.newArrival) result = result.filter((p) => p.newArrival);

  return sortProducts(result, filters?.sortBy);
}

function syncInventory(product: Product) {
  const idx = inventory.findIndex((i) => i.productId === product.id);
  const status: Inventory["status"] =
    product.stockQuantity === 0
      ? "out_of_stock"
      : product.stockQuantity <= product.lowStockThreshold
        ? "low_stock"
        : "in_stock";
  const entry: Inventory = {
    id: idx >= 0 ? inventory[idx].id : `inv-${product.id}`,
    productId: product.id,
    sku: product.sku,
    productName: product.name,
    categoryId: product.categoryId,
    currentStock: product.stockQuantity,
    reservedStock: idx >= 0 ? inventory[idx].reservedStock : 0,
    availableStock: Math.max(0, product.stockQuantity - (idx >= 0 ? inventory[idx].reservedStock : 0)),
    lowStockThreshold: product.lowStockThreshold,
    status,
    updatedAt: new Date().toISOString(),
  };
  if (idx >= 0) inventory[idx] = entry;
  else inventory.push(entry);
}

export const productRepository: IProductRepository = {
  async findAll(filters) {
    const page = filters?.page ?? 1;
    const limit = filters?.limit ?? 12;
    const filtered = filterProducts(products, filters);
    const start = (page - 1) * limit;
    return {
      data: filtered.slice(start, start + limit),
      total: filtered.length,
      page,
      totalPages: Math.ceil(filtered.length / limit),
    };
  },
  async findById(id) {
    return products.find((p) => p.id === id) ?? null;
  },
  async findBySlug(slug) {
    return products.find((p) => p.slug === slug) ?? null;
  },
  async create(data) {
    const now = new Date().toISOString();
    const product: Product = {
      ...data,
      id: generateId("prod"),
      createdAt: now,
      updatedAt: now,
    };
    products.push(product);
    syncInventory(product);
    return product;
  },
  async update(id, data) {
    const idx = products.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    products[idx] = { ...products[idx], ...data, updatedAt: new Date().toISOString() };
    syncInventory(products[idx]);
    return products[idx];
  },
  async delete(id) {
    const idx = products.findIndex((p) => p.id === id);
    if (idx === -1) return false;
    products.splice(idx, 1);
    inventory = inventory.filter((i) => i.productId !== id);
    return true;
  },
};

export const categoryRepository: ICategoryRepository = {
  async findAll() {
    return categories;
  },
  async findById(id) {
    return categories.find((c) => c.id === id) ?? null;
  },
  async findBySlug(slug) {
    return categories.find((c) => c.slug === slug) ?? null;
  },
  async create(data) {
    const category: Category = { ...data, id: generateId("cat") };
    categories.push(category);
    return category;
  },
  async update(id, data) {
    const idx = categories.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    categories[idx] = { ...categories[idx], ...data };
    return categories[idx];
  },
  async delete(id) {
    const idx = categories.findIndex((c) => c.id === id);
    if (idx === -1) return false;
    categories.splice(idx, 1);
    return true;
  },
};

export const orderRepository: IOrderRepository = {
  async findAll(filters) {
    let result = [...orders];
    if (filters?.status) result = result.filter((o) => o.orderStatus === filters.status);
    if (filters?.paymentStatus) result = result.filter((o) => o.paymentStatus === filters.paymentStatus);
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q) ||
          o.customerEmail.toLowerCase().includes(q)
      );
    }
    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },
  async findById(id) {
    return orders.find((o) => o.id === id) ?? null;
  },
  async findByUserId(userId) {
    return orders.filter((o) => o.userId === userId);
  },
  async create(data) {
    const now = new Date().toISOString();
    const order: Order = { ...data, id: generateId("ord"), createdAt: now, updatedAt: now };
    orders.unshift(order);
    return order;
  },
  async updateStatus(id, orderStatus, note) {
    const idx = orders.findIndex((o) => o.id === id);
    if (idx === -1) return null;
    orders[idx].orderStatus = orderStatus;
    orders[idx].timeline.push({ status: orderStatus, date: new Date().toISOString(), note });
    orders[idx].updatedAt = new Date().toISOString();
    return orders[idx];
  },
  async updatePaymentStatus(id, paymentStatus) {
    const idx = orders.findIndex((o) => o.id === id);
    if (idx === -1) return null;
    orders[idx].paymentStatus = paymentStatus;
    orders[idx].updatedAt = new Date().toISOString();
    return orders[idx];
  },
};

export const customerRepository: ICustomerRepository = {
  async findAll(filters) {
    let result = [...customers];
    if (filters?.status) result = result.filter((c) => c.status === filters.status);
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (c) =>
          c.firstName.toLowerCase().includes(q) ||
          c.lastName.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q)
      );
    }
    return result;
  },
  async findById(id) {
    return customers.find((c) => c.id === id) ?? null;
  },
  async update(id, data) {
    const idx = customers.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    customers[idx] = { ...customers[idx], ...data };
    return customers[idx];
  },
};

export const couponRepository: ICouponRepository = {
  async findAll() {
    return coupons;
  },
  async findByCode(code) {
    return coupons.find((c) => c.code.toLowerCase() === code.toLowerCase()) ?? null;
  },
  async findById(id) {
    return coupons.find((c) => c.id === id) ?? null;
  },
  async create(data) {
    const coupon: Coupon = { ...data, id: generateId("coup"), usedCount: 0 };
    coupons.push(coupon);
    return coupon;
  },
  async update(id, data) {
    const idx = coupons.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    coupons[idx] = { ...coupons[idx], ...data };
    return coupons[idx];
  },
  async delete(id) {
    const idx = coupons.findIndex((c) => c.id === id);
    if (idx === -1) return false;
    coupons.splice(idx, 1);
    return true;
  },
};

export const reviewRepository: IReviewRepository = {
  async findByProductId(productId) {
    return reviews.filter((r) => r.productId === productId);
  },
  async create(data) {
    const review: Review = { ...data, id: generateId("rev"), createdAt: new Date().toISOString() };
    reviews.push(review);
    return review;
  },
};

export const inventoryRepository: IInventoryRepository = {
  async findAll(filters) {
    let result = [...inventory];
    if (filters?.status) result = result.filter((i) => i.status === filters.status);
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (i) => i.productName.toLowerCase().includes(q) || i.sku.toLowerCase().includes(q)
      );
    }
    return result;
  },
  async findByProductId(productId) {
    return inventory.find((i) => i.productId === productId) ?? null;
  },
  async adjustStock(productId, quantity, type, reason, createdBy) {
    const idx = inventory.findIndex((i) => i.productId === productId);
    if (idx === -1) return null;
    const prev = inventory[idx].currentStock;
    const newStock = Math.max(0, prev + quantity);
    inventory[idx].currentStock = newStock;
    inventory[idx].availableStock = Math.max(0, newStock - inventory[idx].reservedStock);
    inventory[idx].status =
      newStock === 0 ? "out_of_stock" : newStock <= inventory[idx].lowStockThreshold ? "low_stock" : "in_stock";
    inventory[idx].updatedAt = new Date().toISOString();

    const prodIdx = products.findIndex((p) => p.id === productId);
    if (prodIdx >= 0) products[prodIdx].stockQuantity = newStock;

    transactions.unshift({
      id: generateId("txn"),
      inventoryId: inventory[idx].id,
      productId,
      type,
      quantity,
      previousStock: prev,
      newStock,
      reason,
      createdBy,
      createdAt: new Date().toISOString(),
    });
    return inventory[idx];
  },
  async setThreshold(productId, threshold) {
    const idx = inventory.findIndex((i) => i.productId === productId);
    if (idx === -1) return null;
    inventory[idx].lowStockThreshold = threshold;
    inventory[idx].status =
      inventory[idx].currentStock === 0
        ? "out_of_stock"
        : inventory[idx].currentStock <= threshold
          ? "low_stock"
          : "in_stock";
    const prodIdx = products.findIndex((p) => p.id === productId);
    if (prodIdx >= 0) products[prodIdx].lowStockThreshold = threshold;
    return inventory[idx];
  },
  async getTransactions(productId) {
    if (productId) return transactions.filter((t) => t.productId === productId);
    return transactions;
  },
};

export const userRepository: IUserRepository = {
  async findByEmail(email) {
    return getUserByEmail(email) ?? null;
  },
  async findById(id) {
    return users.find((u) => u.id === id) ?? null;
  },
  async create(data) {
    const now = new Date().toISOString();
    const user: User = { ...data, id: generateId("user"), createdAt: now, updatedAt: now };
    users.push(user);
    return user;
  },
};

export const reportRepository: IReportRepository = {
  async getDashboardStats(): Promise<DashboardStats> {
    const paidOrders = orders.filter((o) => o.paymentStatus === "paid");
    return {
      totalRevenue: paidOrders.reduce((sum, o) => sum + o.total, 0),
      totalOrders: orders.length,
      totalCustomers: customers.length,
      totalProducts: products.filter((p) => p.status === "active").length,
      lowStockProducts: inventory.filter((i) => i.status === "low_stock").length,
      outOfStockProducts: inventory.filter((i) => i.status === "out_of_stock").length,
      pendingOrders: orders.filter((o) => o.orderStatus === "pending").length,
      completedOrders: orders.filter((o) => o.orderStatus === "delivered").length,
    };
  },
  async getRevenueChart(filters) {
    const paidOrders = orders.filter((o) => o.paymentStatus === "paid");
    const grouped: Record<string, number> = {};
    paidOrders.forEach((o) => {
      const date = new Date(o.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric" });
      grouped[date] = (grouped[date] ?? 0) + o.total;
    });
    return Object.entries(grouped).map(([date, revenue]) => ({ date, revenue }));
  },
  async getOrdersChart(_filters?: ReportFilters) {
    const grouped: Record<string, number> = {};
    orders.forEach((o) => {
      const date = new Date(o.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric" });
      grouped[date] = (grouped[date] ?? 0) + 1;
    });
    return Object.entries(grouped).map(([date, count]) => ({ date, orders: count }));
  },
  async getTopProducts(limit = 5) {
    const sales: Record<string, { sold: number; revenue: number }> = {};
    orders.forEach((o) => {
      o.items.forEach((item) => {
        if (!sales[item.productId]) sales[item.productId] = { sold: 0, revenue: 0 };
        sales[item.productId].sold += item.quantity;
        sales[item.productId].revenue += (item.salePrice ?? item.price) * item.quantity;
      });
    });
    return Object.entries(sales)
      .map(([productId, data]) => ({
        product: products.find((p) => p.id === productId)!,
        ...data,
      }))
      .filter((item) => item.product)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, limit);
  },
  async getSalesByCategory() {
    const sales: Record<string, { revenue: number; orders: number }> = {};
    orders.forEach((o) => {
      o.items.forEach((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) return;
        const cat = categories.find((c) => c.id === product.categoryId);
        const name = cat?.name ?? "Other";
        if (!sales[name]) sales[name] = { revenue: 0, orders: 0 };
        sales[name].revenue += (item.salePrice ?? item.price) * item.quantity;
        sales[name].orders += 1;
      });
    });
    return Object.entries(sales).map(([category, data]) => ({ category, ...data }));
  },
};

export function getAllProductsAdmin(): Product[] {
  return products;
}

export function resetMockData() {
  products = [...mockProducts];
  categories = [...mockCategories];
  orders = [...mockOrders];
  customers = [...mockCustomers];
  coupons = [...mockCoupons];
  reviews = [...mockReviews];
  inventory = [...mockInventory];
  transactions = [...mockTransactions];
  users = [...mockUsers];
}
