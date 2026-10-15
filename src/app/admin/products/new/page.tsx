import { ProductForm } from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-navy">Add Product</h1>
        <p className="text-sm text-navy/60">
          New products appear on the storefront immediately after you save. Sign in at{" "}
          <strong>/admin/login</strong> if prompted.
        </p>
      </div>
      <ProductForm mode="create" />
    </div>
  );
}
