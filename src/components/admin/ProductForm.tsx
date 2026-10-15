"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Product, Category } from "@/lib/models";
import { categoryRepository } from "@/lib/repositories";
import { createProductAction, updateProductAction } from "@/app/actions/products";
import { getSession } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Plus, X } from "lucide-react";
import { PRODUCT_COLOR_PRESETS } from "@/lib/constants/product-colors";
import { ProductImageUpload } from "@/components/admin/ProductImageUpload";

interface ProductFormProps {
  product?: Product;
  mode: "create" | "edit";
}

const defaultValues = {
  name: "",
  slug: "",
  categoryId: "",
  subcategoryId: "",
  description: "",
  shortDescription: "",
  price: 0,
  salePrice: undefined as number | undefined,
  images: [""],
  sizes: ["Free Size"],
  colors: [{ name: "As shown", hex: "#EDE6D8" }],
  fabric: "Silk",
  sku: "",
  stockQuantity: 0,
  lowStockThreshold: 5,
  rating: 4.5,
  reviewCount: 0,
  status: "active" as const,
  featured: false,
  bestseller: false,
  newArrival: false,
  specifications: {} as Record<string, string>,
};

export function ProductForm({ product, mode }: ProductFormProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(product ?? defaultValues);
  const [specKey, setSpecKey] = useState("");
  const [specValue, setSpecValue] = useState("");

  useEffect(() => {
    categoryRepository.findAll().then(setCategories);
  }, []);

  const subcategories = categories.find((c) => c.id === form.categoryId)?.subcategories ?? [];

  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        slug: form.slug || slugify(form.name),
        salePrice: form.salePrice || undefined,
        subcategoryId: form.subcategoryId || undefined,
        images: form.images.filter(Boolean),
      };

      const session = getSession(true);
      if (!session?.token) {
        toast.error("Admin session expired. Please sign in again.");
        router.push("/admin/login");
        return;
      }

      if (mode === "create") {
        await createProductAction(session.token, payload as Omit<Product, "id" | "createdAt" | "updatedAt">);
        toast.success("Product created — now live on the storefront");
      } else if (product) {
        await updateProductAction(session.token, product.id, payload);
        toast.success("Product updated on the storefront");
      }
      router.push("/admin/products");
    } catch {
      toast.error("Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  const addSpec = () => {
    if (!specKey.trim()) return;
    update("specifications", { ...form.specifications, [specKey]: specValue });
    setSpecKey("");
    setSpecValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => {
                  update("name", e.target.value);
                  if (mode === "create") update("slug", slugify(e.target.value));
                }}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" value={form.slug} onChange={(e) => update("slug", e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sku">SKU</Label>
              <Input id="sku" value={form.sku} onChange={(e) => update("sku", e.target.value)} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={form.categoryId} onValueChange={(v) => update("categoryId", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {subcategories.length > 0 && (
                <div className="space-y-2">
                  <Label>Subcategory</Label>
                  <Select value={form.subcategoryId ?? ""} onValueChange={(v) => update("subcategoryId", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      {subcategories.map((sub) => (
                        <SelectItem key={sub.id} value={sub.id}>
                          {sub.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="shortDescription">Short Description</Label>
              <Input
                id="shortDescription"
                value={form.shortDescription}
                onChange={(e) => update("shortDescription", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Full Description</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                rows={4}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pricing & Inventory</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price (₹)</Label>
                <Input
                  id="price"
                  type="number"
                  min={0}
                  value={form.price}
                  onChange={(e) => update("price", Number(e.target.value))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salePrice">Sale Price (₹)</Label>
                <Input
                  id="salePrice"
                  type="number"
                  min={0}
                  value={form.salePrice ?? ""}
                  onChange={(e) => update("salePrice", e.target.value ? Number(e.target.value) : undefined)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input
                  id="stock"
                  type="number"
                  min={0}
                  value={form.stockQuantity}
                  onChange={(e) => update("stockQuantity", Number(e.target.value))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="threshold">Low Stock Threshold</Label>
                <Input
                  id="threshold"
                  type="number"
                  min={0}
                  value={form.lowStockThreshold}
                  onChange={(e) => update("lowStockThreshold", Number(e.target.value))}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={(v) => update("status", v as "active" | "inactive")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3 pt-2">
              {(["featured", "bestseller", "newArrival"] as const).map((flag) => (
                <div key={flag} className="flex items-center justify-between">
                  <Label htmlFor={flag} className="capitalize">
                    {flag === "newArrival" ? "New Arrival" : flag}
                  </Label>
                  <Switch id={flag} checked={form[flag]} onCheckedChange={(v) => update(flag, v)} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Images, colour & specifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Product images</Label>
            <ProductImageUpload images={form.images} onChange={(images) => update("images", images.length ? images : [""])} />
          </div>
          <div className="space-y-2">
            <Label>Or paste image URLs (one per line)</Label>
            <Textarea
              value={form.images.join("\n")}
              onChange={(e) => update("images", e.target.value.split("\n"))}
              rows={2}
              placeholder="/1750/NPD_7272.jpg"
            />
          </div>

          <div className="space-y-3">
            <Label>Colour (shown on product page)</Label>
            <p className="text-xs text-navy/45">Choose <strong>As shown</strong> when colour matches product photos (typical for sarees).</p>
            <div className="flex flex-wrap gap-2">
              {PRODUCT_COLOR_PRESETS.map((preset) => {
                const active = form.colors[0]?.name === preset.name;
                return (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => update("colors", [{ name: preset.name, hex: preset.hex }])}
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors ${
                      active ? "border-emerald bg-emerald/10 font-medium" : "border-beige hover:border-navy/30"
                    }`}
                  >
                    {preset.name !== "As shown" && (
                      <span className="h-4 w-4 rounded-full border border-neutral-300" style={{ backgroundColor: preset.hex }} />
                    )}
                    {preset.name}
                  </button>
                );
              })}
            </div>
            <div className="flex flex-wrap items-end gap-2 pt-2">
              <div className="space-y-1">
                <Label className="text-xs">Custom name</Label>
                <Input
                  value={form.colors[0]?.name ?? ""}
                  onChange={(e) =>
                    update("colors", [{ name: e.target.value, hex: form.colors[0]?.hex ?? "#EDE6D8" }])
                  }
                  placeholder="As shown"
                  className="h-9 w-40"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Swatch (optional)</Label>
                <Input
                  type="color"
                  value={form.colors[0]?.hex ?? "#EDE6D8"}
                  onChange={(e) =>
                    update("colors", [{ name: form.colors[0]?.name ?? "As shown", hex: e.target.value }])
                  }
                  className="h-9 w-14 p-1 cursor-pointer"
                />
              </div>
            </div>
            {form.colors.length > 1 && (
              <div className="space-y-2 pt-2">
                <Label className="text-xs">Additional colours</Label>
                {form.colors.slice(1).map((c, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <Input
                      value={c.name}
                      onChange={(e) => {
                        const next = [...form.colors];
                        next[idx + 1] = { ...c, name: e.target.value };
                        update("colors", next);
                      }}
                      className="h-9 flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => update("colors", form.colors.filter((_, i) => i !== idx + 1))}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => update("colors", [...form.colors, { name: "As shown", hex: "#EDE6D8" }])}
            >
              <Plus className="h-3.5 w-3.5" />
              Add another colour
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fabric">Fabric / material</Label>
            <Input id="fabric" value={form.fabric} onChange={(e) => update("fabric", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Sizes (comma-separated)</Label>
            <Input
              value={form.sizes.join(", ")}
              onChange={(e) => update("sizes", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
            />
          </div>
          <div className="space-y-2">
            <Label>Specifications</Label>
            <div className="flex gap-2">
              <Input placeholder="Key" value={specKey} onChange={(e) => setSpecKey(e.target.value)} />
              <Input placeholder="Value" value={specValue} onChange={(e) => setSpecValue(e.target.value)} />
              <Button type="button" variant="outline" onClick={addSpec}>
                Add
              </Button>
            </div>
            {Object.entries(form.specifications).length > 0 && (
              <div className="mt-2 space-y-1 rounded-md border border-beige p-3">
                {Object.entries(form.specifications).map(([k, v]) => (
                  <div key={k} className="flex justify-between text-sm">
                    <span className="font-medium">{k}</span>
                    <span className="text-navy/60">{v}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" variant="emerald" disabled={loading}>
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {mode === "create" ? "Create Product" : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
