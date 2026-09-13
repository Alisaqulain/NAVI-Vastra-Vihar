"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { productRepository } from "@/lib/repositories";
import { Product } from "@/lib/models";
import { formatPrice, getEffectivePrice } from "@/lib/utils";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const search = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    const { data } = await productRepository.findAll({ search: q, limit: 8 });
    setResults(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => search(query), 300);
    return () => clearTimeout(timer);
  }, [query, search]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl top-[20%] translate-y-0">
        <DialogHeader>
          <DialogTitle className="sr-only">Search products</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy/40" />
          <Input
            placeholder="Search sarees, lehengas, kurtis..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
            autoFocus
          />
        </div>
        <div className="max-h-80 overflow-y-auto">
          {loading && <p className="text-sm text-navy/50 py-4 text-center">Searching...</p>}
          {!loading && query && results.length === 0 && (
            <p className="text-sm text-navy/50 py-4 text-center">No products found for &ldquo;{query}&rdquo;</p>
          )}
          {results.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-cream-dark transition-colors"
              onClick={() => onOpenChange(false)}
            >
              <div className="relative h-14 w-12 rounded overflow-hidden bg-beige shrink-0">
                <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-navy truncate">{product.name}</p>
                <p className="text-xs text-navy/50">{formatPrice(getEffectivePrice(product))}</p>
              </div>
            </Link>
          ))}
          {results.length > 0 && (
            <Link
              href={`/shop?search=${encodeURIComponent(query)}`}
              className="block text-center text-sm text-emerald hover:underline py-3"
              onClick={() => onOpenChange(false)}
            >
              View all results for &ldquo;{query}&rdquo;
            </Link>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
