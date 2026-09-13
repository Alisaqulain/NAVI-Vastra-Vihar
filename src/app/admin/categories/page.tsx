"use client";

import { useEffect, useState } from "react";
import { Category } from "@/lib/models";
import { categoryRepository } from "@/lib/repositories";
import { slugify } from "@/lib/utils";
import { DataTable, Column } from "@/components/admin/DataTable";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState<{ name: string; slug: string; description: string; image: string; status: "active" | "inactive" }>({ name: "", slug: "", description: "", image: "", status: "active" });

  const load = () => categoryRepository.findAll().then(setCategories);

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ name: "", slug: "", description: "", image: "", status: "active" });
    setDialogOpen(true);
  };

  const openEdit = (cat: Category) => {
    setEditing(cat);
    setForm({ name: cat.name, slug: cat.slug, description: cat.description, image: cat.image, status: cat.status });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    const payload = {
      ...form,
      slug: form.slug || slugify(form.name),
      productCount: editing?.productCount ?? 0,
    };
    if (editing) {
      await categoryRepository.update(editing.id, payload);
      toast.success("Category updated");
    } else {
      await categoryRepository.create(payload);
      toast.success("Category created");
    }
    setDialogOpen(false);
    load();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await categoryRepository.delete(deleteId);
    toast.success("Category deleted");
    setDeleteId(null);
    load();
  };

  const columns: Column<Category>[] = [
    {
      key: "name",
      header: "Category",
      cell: (c) => (
        <div>
          <p className="font-medium">{c.name}</p>
          <p className="text-xs text-navy/50">/{c.slug}</p>
        </div>
      ),
    },
    {
      key: "products",
      header: "Products",
      cell: (c) => c.productCount,
    },
    {
      key: "subcategories",
      header: "Subcategories",
      cell: (c) => c.subcategories?.length ?? 0,
    },
    {
      key: "status",
      header: "Status",
      cell: (c) => <Badge variant={c.status === "active" ? "emerald" : "outline"}>{c.status}</Badge>,
    },
    {
      key: "actions",
      header: "",
      className: "w-24",
      cell: (c) => (
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" onClick={() => openEdit(c)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setDeleteId(c.id)}>
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
          <h1 className="font-serif text-2xl font-bold text-navy">Categories</h1>
          <p className="text-sm text-navy/60">Organize your product catalog</p>
        </div>
        <Button variant="emerald" onClick={openCreate}>
          <Plus className="h-4 w-4" />
          Add Category
        </Button>
      </div>

      <DataTable columns={columns} data={categories} emptyMessage="No categories yet." />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Category" : "New Category"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="catName">Name</Label>
              <Input
                id="catName"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value, slug: slugify(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="catSlug">Slug</Label>
              <Input id="catSlug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="catDesc">Description</Label>
              <Textarea id="catDesc" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="catImage">Image URL</Label>
              <Input id="catImage" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button variant="emerald" onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
        title="Delete Category"
        description="Products in this category will need reassignment."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        destructive
      />
    </div>
  );
}
