"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Product } from "@/lib/models";
import { getAllProductsAdmin, productRepository, categoryRepository } from "@/lib/repositories";
import { formatPrice } from "@/lib/utils";
import { DataTable, Column } from "@/components/admin/DataTable";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryMap, setCategoryMap] = useState<Record<string, string>>({});
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = async () => {
    setProducts(getAllProductsAdmin());
    const cats = await categoryRepository.findAll();
    setCategoryMap(Object.fromEntries(cats.map((c) => [c.id, c.name])));
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    if (!search) return products;
    const q = search.toLowerCase();
    return products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)
    );
  }, [products, search]);

  const handleDelete = async () => {
    if (!deleteId) return;
    await productRepository.delete(deleteId);
    toast.success("Product deleted");
    setDeleteId(null);
    load();
  };

  const columns: Column<Product>[] = [
    {
      key: "product",
      header: "Product",
      cell: (p) => (
        <div className="flex items-center gap-3">
          {p.images[0] && (
            <Image src={p.images[0]} alt={p.name} width={40} height={40} className="rounded-md object-cover" />
          )}
          <div>
            <p className="font-medium line-clamp-1">{p.name}</p>
            <p className="text-xs text-navy/50">{p.sku}</p>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      cell: (p) => categoryMap[p.categoryId] ?? "—",
    },
    {
      key: "price",
      header: "Price",
      cell: (p) => (
        <div>
          <p>{formatPrice(p.salePrice ?? p.price)}</p>
          {p.salePrice && <p className="text-xs text-navy/40 line-through">{formatPrice(p.price)}</p>}
        </div>
      ),
    },
    {
      key: "stock",
      header: "Stock",
      cell: (p) => (
        <Badge variant={p.stockQuantity <= p.lowStockThreshold ? "warning" : "success"}>
          {p.stockQuantity}
        </Badge>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (p) => <Badge variant={p.status === "active" ? "emerald" : "outline"}>{p.status}</Badge>,
    },
    {
      key: "actions",
      header: "",
      className: "w-24",
      cell: (p) => (
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/admin/products/${p.id}`}>
              <Pencil className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setDeleteId(p.id)}>
            <Trash2 className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-navy">Products</h1>
          <p className="text-sm text-navy/60">{products.length} products total</p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search products..."
        actions={
          <Button variant="emerald" asChild>
            <Link href="/admin/products/new">
              <Plus className="h-4 w-4" />
              Add Product
            </Link>
          </Button>
        }
      />

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
        title="Delete Product"
        description="This action cannot be undone. The product will be permanently removed."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        destructive
      />
    </div>
  );
}
