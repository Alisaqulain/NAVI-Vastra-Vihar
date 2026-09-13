"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { Product } from "@/lib/models";
import { productRepository } from "@/lib/repositories";

const WISHLIST_STORAGE_KEY = "navi_wishlist";

interface WishlistContextValue {
  items: Product[];
  isLoaded: boolean;
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  toggleItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (stored) {
      try {
        const ids = JSON.parse(stored) as string[];
        Promise.all(ids.map((id) => productRepository.findById(id))).then((products) => {
          setItems(products.filter(Boolean) as Product[]);
        });
      } catch {
        setItems([]);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items.map((p) => p.id)));
  }, [items, isLoaded]);

  const addItem = useCallback((productId: string) => {
    setItems((prev) => {
      if (prev.some((p) => p.id === productId)) return prev;
      productRepository.findById(productId).then((product) => {
        if (product) setItems((current) => (current.some((p) => p.id === productId) ? current : [...current, product]));
      });
      return prev;
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((p) => p.id !== productId));
  }, []);

  const toggleItem = useCallback((productId: string) => {
    setItems((prev) => {
      if (prev.some((p) => p.id === productId)) {
        return prev.filter((p) => p.id !== productId);
      }
      productRepository.findById(productId).then((product) => {
        if (product) setItems((current) => [...current, product]);
      });
      return prev;
    });
  }, []);

  const isInWishlist = useCallback((productId: string) => items.some((p) => p.id === productId), [items]);

  const clearWishlist = useCallback(() => setItems([]), []);

  return (
    <WishlistContext.Provider value={{ items, isLoaded, addItem, removeItem, toggleItem, isInWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
