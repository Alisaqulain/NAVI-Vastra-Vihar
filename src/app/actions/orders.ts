"use server";

import { orderRepository, couponRepository } from "@/lib/repositories";
import { Order, OrderItem, Address, Coupon } from "@/lib/models";
import { SHIPPING_COST, FREE_SHIPPING_THRESHOLD, generateId } from "@/lib/utils";

export interface PlaceOrderInput {
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: {
    productId: string;
    productName: string;
    productImage: string;
    sku: string;
    size: string;
    color: string;
    quantity: number;
    price: number;
    salePrice?: number;
  }[];
  shippingAddress: Omit<Address, "id" | "userId">;
  couponCode?: string;
  paymentMethod: string;
}

function calculateDiscount(coupon: Coupon, subtotal: number): number {
  if (subtotal < coupon.minimumOrderValue) return 0;
  if (coupon.discountType === "fixed") return coupon.discountValue;
  const discount = (subtotal * coupon.discountValue) / 100;
  return coupon.maximumDiscount ? Math.min(discount, coupon.maximumDiscount) : discount;
}

export async function placeOrder(input: PlaceOrderInput): Promise<{ success: boolean; order?: Order; error?: string }> {
  try {
    const subtotal = input.items.reduce(
      (sum, item) => sum + (item.salePrice ?? item.price) * item.quantity,
      0
    );

    let discount = 0;
    let couponCode: string | undefined;

    if (input.couponCode) {
      const coupon = await couponRepository.findByCode(input.couponCode);
      if (!coupon || coupon.status !== "active") {
        return { success: false, error: "Invalid coupon code" };
      }
      const now = new Date();
      if (new Date(coupon.startDate) > now || new Date(coupon.expiryDate) < now) {
        return { success: false, error: "Coupon has expired" };
      }
      discount = calculateDiscount(coupon, subtotal);
      if (discount === 0) {
        return { success: false, error: `Minimum order value of ₹${coupon.minimumOrderValue} required for this coupon` };
      }
      couponCode = coupon.code;
    }

    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const total = subtotal + shipping - discount;

    const orderItems: OrderItem[] = input.items.map((item) => ({
      id: generateId("item"),
      ...item,
    }));

    const address: Address = {
      id: generateId("addr"),
      userId: input.userId ?? "guest",
      ...input.shippingAddress,
    };

    const order = await orderRepository.create({
      orderNumber: `NV-${Date.now().toString().slice(-8)}`,
      userId: input.userId ?? "guest",
      customerName: input.customerName,
      customerEmail: input.customerEmail,
      customerPhone: input.customerPhone,
      items: orderItems,
      shippingAddress: address,
      subtotal,
      shipping,
      discount,
      couponCode,
      total,
      paymentStatus: "paid",
      orderStatus: "confirmed",
      paymentMethod: input.paymentMethod,
      timeline: [
        { status: "pending", date: new Date().toISOString(), note: "Order placed" },
        { status: "confirmed", date: new Date().toISOString(), note: "Payment received" },
      ],
    });

    return { success: true, order };
  } catch {
    return { success: false, error: "Failed to place order. Please try again." };
  }
}
