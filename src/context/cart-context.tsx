"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { CartItem, Product } from "@/lib/models";
import { productRepository } from "@/lib/repositories";
import { getEffectivePrice } from "@/lib/utils";

const CART_STORAGE_KEY = "navi_cart";

export interface EnrichedCartItem extends CartItem {
  product?: Product;
}

interface CartContextValue {
  items: EnrichedCartItem[];
  itemCount: number;
  subtotal: number;
  isLoaded: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string, size: string, color: string) => boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

function cartKey(productId: string, size: string, color: string) {
  return `${productId}:${size}:${color}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<EnrichedCartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as CartItem[];
        enrichItems(parsed).then(setItems);
      } catch {
        setItems([]);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    const raw = items.map(({ productId, quantity, size, color }) => ({ productId, quantity, size, color }));
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(raw));
  }, [items, isLoaded]);

  async function enrichItems(cartItems: CartItem[]): Promise<EnrichedCartItem[]> {
    const enriched = await Promise.all(
      cartItems.map(async (item) => {
        const product = await productRepository.findById(item.productId);
        return { ...item, product: product ?? undefined };
      })
    );
    return enriched.filter((i) => i.product);
  }

  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => {
      const key = cartKey(item.productId, item.size, item.color);
      const existing = prev.find((i) => cartKey(i.productId, i.size, i.color) === key);
      if (existing) {
        return prev.map((i) =>
          cartKey(i.productId, i.size, i.color) === key
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      productRepository.findById(item.productId).then((product) => {
        if (product) {
          setItems((current) => {
            if (current.some((i) => cartKey(i.productId, i.size, i.color) === key)) return current;
            return [...current, { ...item, product }];
          });
        }
      });
      return [...prev, { ...item }];
    });
  }, []);

  const removeItem = useCallback((productId: string, size: string, color: string) => {
    const key = cartKey(productId, size, color);
    setItems((prev) => prev.filter((i) => cartKey(i.productId, i.size, i.color) !== key));
  }, []);

  const updateQuantity = useCallback((productId: string, size: string, color: string, quantity: number) => {
    const key = cartKey(productId, size, color);
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => cartKey(i.productId, i.size, i.color) !== key));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (cartKey(i.productId, i.size, i.color) === key ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const isInCart = useCallback(
    (productId: string, size: string, color: string) =>
      items.some((i) => cartKey(i.productId, i.size, i.color) === cartKey(productId, size, color)),
    [items]
  );

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => {
    if (!i.product) return sum;
    return sum + getEffectivePrice(i.product) * i.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{ items, itemCount, subtotal, isLoaded, addItem, removeItem, updateQuantity, clearCart, isInCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
