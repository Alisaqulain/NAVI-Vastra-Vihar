"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ShopPaginationProps {
  page: number;
  totalPages: number;
}

export function ShopPagination({ page, totalPages }: ShopPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const goToPage = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <Button variant="outline" size="icon" disabled={page <= 1} onClick={() => goToPage(page - 1)}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <Button
          key={p}
          variant={p === page ? "emerald" : "outline"}
          size="sm"
          className="w-9"
          onClick={() => goToPage(p)}
        >
          {p}
        </Button>
      ))}
      <Button variant="outline" size="icon" disabled={page >= totalPages} onClick={() => goToPage(page + 1)}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
