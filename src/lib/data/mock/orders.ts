import { Order } from "@/lib/models";

export const orders: Order[] = [
  {
    id: "ord-001",
    orderNumber: "NV-2025-001",
    userId: "user-001",
    customerName: "Priya Sharma",
    customerEmail: "priya.sharma@email.com",
    customerPhone: "+91 9876543211",
    items: [{
      id: "oi-001", productId: "prod-001", productName: "Banarasi Silk Saree - Royal Gold",
      productImage: "https://images.unsplash.com/photo-1610037129814-458c63926063?w=800&q=80",
      sku: "NV-SR-001", size: "Free Size", color: "Gold", quantity: 1, price: 24999, salePrice: 19999,
    }],
    shippingAddress: {
      id: "addr-001", userId: "user-001", label: "Home", fullName: "Priya Sharma", phone: "+91 9876543211",
      addressLine1: "42, Green Park Extension", addressLine2: "Near Metro Station",
      city: "New Delhi", state: "Delhi", pincode: "110016", country: "India", isDefault: true,
    },
    subtotal: 19999, shipping: 0, discount: 2000, couponCode: "NAVI10", total: 17999,
    paymentStatus: "paid", orderStatus: "delivered", paymentMethod: "UPI",
    timeline: [
      { status: "pending", date: "2025-09-01T10:00:00Z", note: "Order placed" },
      { status: "confirmed", date: "2025-09-01T11:00:00Z" },
      { status: "processing", date: "2025-09-02T09:00:00Z" },
      { status: "shipped", date: "2025-09-03T14:00:00Z", note: "Shipped via BlueDart" },
      { status: "delivered", date: "2025-09-06T16:00:00Z" },
    ],
    createdAt: "2025-09-01T10:00:00Z", updatedAt: "2025-09-06T16:00:00Z",
  },
  {
    id: "ord-002",
    orderNumber: "NV-2025-002",
    userId: "user-002",
    customerName: "Ananya Patel",
    customerEmail: "ananya.patel@email.com",
    customerPhone: "+91 9876543212",
    items: [{
      id: "oi-002", productId: "prod-030", productName: "Bridal Kanjeevaram - Gold Red",
      productImage: "https://images.unsplash.com/photo-1599737367085-492f80f7807b?w=800&q=80",
      sku: "NV-SR-030", size: "Free Size", color: "Red", quantity: 1, price: 65999, salePrice: 58999,
    }],
    shippingAddress: {
      id: "addr-002", userId: "user-002", label: "Home", fullName: "Ananya Patel", phone: "+91 9876543212",
      addressLine1: "15, Satellite Road", city: "Ahmedabad", state: "Gujarat", pincode: "380015", country: "India", isDefault: true,
    },
    subtotal: 58999, shipping: 0, discount: 0, total: 58999,
    paymentStatus: "paid", orderStatus: "shipped", paymentMethod: "Credit Card",
    timeline: [
      { status: "pending", date: "2025-09-05T10:00:00Z" },
      { status: "confirmed", date: "2025-09-05T12:00:00Z" },
      { status: "processing", date: "2025-09-06T09:00:00Z" },
      { status: "shipped", date: "2025-09-08T11:00:00Z" },
    ],
    createdAt: "2025-09-05T10:00:00Z", updatedAt: "2025-09-08T11:00:00Z",
  },
  {
    id: "ord-003",
    orderNumber: "NV-2025-003",
    userId: "user-003",
    customerName: "Meera Reddy",
    customerEmail: "meera.reddy@email.com",
    customerPhone: "+91 9876543213",
    items: [
      { id: "oi-003", productId: "prod-003", productName: "Handloom Cotton Saree - Indigo Block Print",
        productImage: "https://images.unsplash.com/photo-1596870230752-f7cc744e274a?w=800&q=80",
        sku: "NV-SR-003", size: "Free Size", color: "Indigo", quantity: 2, price: 3499, salePrice: 2799 },
      { id: "oi-004", productId: "prod-013", productName: "Kota Doria Cotton Saree",
        productImage: "https://images.unsplash.com/photo-1617629644389-bda4d5f2c6c8?w=800&q=80",
        sku: "NV-SR-013", size: "Free Size", color: "White", quantity: 1, price: 4499, salePrice: 3799 },
    ],
    shippingAddress: {
      id: "addr-003", userId: "user-003", label: "Office", fullName: "Meera Reddy", phone: "+91 9876543213",
      addressLine1: "88, Jubilee Hills", city: "Hyderabad", state: "Telangana", pincode: "500033", country: "India", isDefault: true,
    },
    subtotal: 9397, shipping: 99, discount: 0, total: 9496,
    paymentStatus: "paid", orderStatus: "processing", paymentMethod: "UPI",
    timeline: [
      { status: "pending", date: "2025-09-08T14:00:00Z" },
      { status: "confirmed", date: "2025-09-08T15:00:00Z" },
      { status: "processing", date: "2025-09-09T10:00:00Z" },
    ],
    createdAt: "2025-09-08T14:00:00Z", updatedAt: "2025-09-09T10:00:00Z",
  },
  {
    id: "ord-004",
    orderNumber: "NV-2025-004",
    userId: "user-005",
    customerName: "Rahul Verma",
    customerEmail: "rahul.verma@email.com",
    customerPhone: "+91 9876543215",
    items: [{
      id: "oi-005", productId: "prod-019", productName: "Diwali Special Silk Saree",
      productImage: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80",
      sku: "NV-SR-019", size: "Free Size", color: "Maroon", quantity: 1, price: 14999, salePrice: 11999,
    }],
    shippingAddress: {
      id: "addr-004", userId: "user-005", label: "Home", fullName: "Rahul Verma", phone: "+91 9876543215",
      addressLine1: "23, MG Road", city: "Bangalore", state: "Karnataka", pincode: "560001", country: "India", isDefault: true,
    },
    subtotal: 11999, shipping: 99, discount: 0, total: 12098,
    paymentStatus: "pending", orderStatus: "pending", paymentMethod: "COD",
    timeline: [{ status: "pending", date: "2025-09-10T09:00:00Z" }],
    createdAt: "2025-09-10T09:00:00Z", updatedAt: "2025-09-10T09:00:00Z",
  },
  {
    id: "ord-005",
    orderNumber: "NV-2025-005",
    userId: "user-001",
    customerName: "Priya Sharma",
    customerEmail: "priya.sharma@email.com",
    customerPhone: "+91 9876543211",
    items: [{
      id: "oi-006", productId: "prod-002", productName: "Kanjeevaram Temple Border Saree",
      productImage: "https://images.unsplash.com/photo-1583391733981-9a17e7a5661d?w=800&q=80",
      sku: "NV-SR-002", size: "Free Size", color: "Emerald", quantity: 1, price: 32999, salePrice: 28999,
    }],
    shippingAddress: {
      id: "addr-001", userId: "user-001", label: "Home", fullName: "Priya Sharma", phone: "+91 9876543211",
      addressLine1: "42, Green Park Extension", city: "New Delhi", state: "Delhi", pincode: "110016", country: "India", isDefault: true,
    },
    subtotal: 28999, shipping: 0, discount: 0, total: 28999,
    paymentStatus: "paid", orderStatus: "confirmed", paymentMethod: "Net Banking",
    timeline: [
      { status: "pending", date: "2025-09-09T16:00:00Z" },
      { status: "confirmed", date: "2025-09-09T17:00:00Z" },
    ],
    createdAt: "2025-09-09T16:00:00Z", updatedAt: "2025-09-09T17:00:00Z",
  },
  {
    id: "ord-006",
    orderNumber: "NV-2025-006",
    userId: "user-002",
    customerName: "Ananya Patel",
    customerEmail: "ananya.patel@email.com",
    customerPhone: "+91 9876543212",
    items: [{
      id: "oi-007", productId: "prod-026", productName: "Kanjeevaram Emerald Festive Saree",
      productImage: "https://images.unsplash.com/photo-1596870230752-f7cc744e274a?w=800&q=80",
      sku: "NV-SR-026", size: "Free Size", color: "Emerald", quantity: 1, price: 34999, salePrice: 29999,
    }],
    shippingAddress: {
      id: "addr-002", userId: "user-002", label: "Home", fullName: "Ananya Patel", phone: "+91 9876543212",
      addressLine1: "15, Satellite Road", city: "Ahmedabad", state: "Gujarat", pincode: "380015", country: "India", isDefault: true,
    },
    subtotal: 29999, shipping: 0, discount: 3000, couponCode: "NAVI10", total: 26999,
    paymentStatus: "failed", orderStatus: "cancelled", paymentMethod: "Credit Card",
    timeline: [
      { status: "pending", date: "2025-08-20T10:00:00Z" },
      { status: "cancelled", date: "2025-08-20T11:00:00Z", note: "Payment failed" },
    ],
    createdAt: "2025-08-20T10:00:00Z", updatedAt: "2025-08-20T11:00:00Z",
  },
];

export function getOrderById(id: string): Order | undefined {
  return orders.find((o) => o.id === id);
}
