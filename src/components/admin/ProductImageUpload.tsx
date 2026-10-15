"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/auth";
import { toast } from "sonner";

type ProductImageUploadProps = {
  images: string[];
  onChange: (images: string[]) => void;
};

export function ProductImageUpload({ images, onChange }: ProductImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const uploadFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    const session = getSession(true);
    if (!session?.token) {
      toast.error("Admin session expired");
      return;
    }

    setUploading(true);
    const added: string[] = [];

    try {
      for (const file of Array.from(files)) {
        const form = new FormData();
        form.append("file", file);
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          headers: { "x-admin-token": session.token },
          body: form,
        });
        const data = (await res.json()) as { url?: string; error?: string };
        if (!res.ok || !data.url) {
          toast.error(data.error ?? "Upload failed");
          continue;
        }
        added.push(data.url);
      }
      if (added.length) {
        onChange([...images.filter(Boolean), ...added]);
        toast.success(`${added.length} image(s) uploaded`);
      }
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const remove = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const list = images.filter(Boolean);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3">
        {list.map((src, i) => (
          <div key={`${src}-${i}`} className="relative h-24 w-20 rounded-md border border-beige overflow-hidden bg-cream-dark">
            <Image src={src} alt="" fill className="object-cover object-top" sizes="80px" />
            <button
              type="button"
              onClick={() => remove(i)}
              className="absolute top-1 right-1 h-6 w-6 rounded-full bg-navy/80 text-white flex items-center justify-center"
              aria-label="Remove image"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
        className="hidden"
        onChange={(e) => uploadFiles(e.target.files)}
      />

      <Button
        type="button"
        variant="outline"
        className="w-full sm:w-auto"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
      >
        {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
        Upload images
      </Button>
      <p className="text-xs text-navy/45">JPEG, PNG, WebP · max 5 MB each · saved to /uploads/products/</p>
    </div>
  );
}
