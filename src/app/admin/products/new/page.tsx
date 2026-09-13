import { ProductForm } from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-navy">Add Product</h1>
        <p className="text-sm text-navy/60">Create a new product listing</p>
      </div>
      <ProductForm mode="create" />
    </div>
  );
}
