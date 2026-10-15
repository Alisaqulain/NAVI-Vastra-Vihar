"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { Product } from "@/lib/models";
import { categoryRepository } from "@/lib/repositories";
import { deleteProductAction, listAdminProductsAction } from "@/app/actions/products";
import { getSession } from "@/lib/auth";
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
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    const session = getSession(true);
    if (!session?.token) {
      toast.error("Please sign in as admin");
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const list = await listAdminProductsAction(session.token);
      setProducts(list);
      const cats = await categoryRepository.findAll();
      setCategoryMap(Object.fromEntries(cats.map((c) => [c.id, c.name])));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(() => {
    if (!search) return products;
    const q = search.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q)
    );
  }, [products, search]);

  const activeCount = useMemo(() => products.filter((p) => p.status === "active").length, [products]);

  const handleDelete = async () => {
    if (!deleteId) return;
    const session = getSession(true);
    if (!session?.token) {
      toast.error("Admin session expired");
      return;
    }
    setDeleting(true);
    try {
      await deleteProductAction(session.token, deleteId);
      toast.success("Product updated on storefront");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not delete product");
    } finally {
      setDeleting(false);
      setDeleteId(null);
      load();
    }
  };

  const columns: Column<Product>[] = [
    {
      key: "product",
      header: "Product",
      cell: (p) => (
        <div className="flex items-center gap-3 min-w-[200px]">
          {p.images[0] ? (
            <Image
              src={p.images[0]}
              alt=""
              width={48}
              height={48}
              className="rounded-sm object-cover h-12 w-12 border border-neutral-200"
            />
          ) : (
            <div className="h-12 w-12 rounded-sm bg-neutral-100 border border-neutral-200" />
          )}
          <div className="min-w-0">
            <p className="font-medium line-clamp-2 text-sm">{p.name}</p>
            <p className="text-xs text-navy/50 truncate">{p.sku}</p>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      cell: (p) => <span className="text-sm">{categoryMap[p.categoryId] ?? "—"}</span>,
    },
    {
      key: "price",
      header: "Price",
      cell: (p) => (
        <div className="text-sm tabular-nums">
          <p className="font-medium">{formatPrice(p.salePrice ?? p.price)}</p>
          {p.salePrice && p.salePrice < p.price && (
            <p className="text-xs text-navy/40 line-through">{formatPrice(p.price)}</p>
          )}
        </div>
      ),
    },
    {
      key: "stock",
      header: "Stock",
      cell: (p) => (
        <Badge variant={p.stockQuantity <= p.lowStockThreshold ? "warning" : "success"}>{p.stockQuantity}</Badge>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (p) => <Badge variant={p.status === "active" ? "emerald" : "outline"}>{p.status}</Badge>,
    },
    {
      key: "actions",
      header: "Actions",
      className: "w-[140px]",
      cell: (p) => (
        <div className="flex items-center gap-1">
          <Button variant="outline" size="sm" className="h-8 gap-1.5 px-2.5" asChild>
            <Link href={`/admin/products/${p.id}`} aria-label={`Edit ${p.name}`}>
              <Pencil className="h-3.5 w-3.5" />
              <span className="hidden sm:inline text-xs">Edit</span>
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 px-2.5 text-red-600 border-red-200 hover:bg-red-50"
            onClick={() => setDeleteId(p.id)}
            aria-label={`Delete ${p.name}`}
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline text-xs">Delete</span>
          </Button>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24 text-navy/60">
        <Loader2 className="h-8 w-8 animate-spin text-emerald" />
        <p className="text-sm">Loading all products…</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-navy">Products</h1>
          <p className="text-sm text-navy/60 mt-1">
            {products.length} total · {activeCount} active on storefront
          </p>
          <p className="text-xs text-navy/45 mt-0.5">Changes are saved to MongoDB and reflected on the live shop.</p>
        </div>
        <Button variant="emerald" asChild className="shrink-0">
          <Link href="/admin/products/new">
            <Plus className="h-4 w-4" />
            Add product
          </Link>
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by name, SKU, or slug…"
        emptyMessage="No products match your search."
        actions={
          <Button variant="outline" size="sm" onClick={() => load()}>
            Refresh
          </Button>
        }
      />

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
        title="Remove product?"
        description="Built-in catalog items are hidden from the shop (inactive). Products you added in admin are removed from MongoDB."
        confirmLabel={deleting ? "Removing…" : "Confirm"}
        onConfirm={handleDelete}
        destructive
      />
    </div>
  );
}
