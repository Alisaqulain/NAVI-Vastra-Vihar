"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Product } from "@/lib/models";
import { productRepository } from "@/lib/repositories";
import { ProductForm } from "@/components/admin/ProductForm";
import { Loader2 } from "lucide-react";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    productRepository.findById(id).then(setProduct);
  }, [id]);

  if (!product) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-navy">Edit Product</h1>
        <p className="text-sm text-navy/60">{product.name}</p>
      </div>
      <ProductForm mode="edit" product={product} />
    </div>
  );
}
