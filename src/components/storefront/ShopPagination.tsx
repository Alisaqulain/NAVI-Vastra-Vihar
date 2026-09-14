"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

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

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter((p) => {
    if (totalPages <= 7) return true;
    return p === 1 || p === totalPages || Math.abs(p - page) <= 1;
  });

  return (
    <nav className="flex items-center justify-center gap-1.5 sm:gap-2 mt-12 sm:mt-16 pt-8 border-t border-beige/60" aria-label="Pagination">
      <Button
        variant="outline"
        size="icon"
        disabled={page <= 1}
        onClick={() => goToPage(page - 1)}
        className="rounded-full h-10 w-10 border-beige"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {pages.map((p, i) => {
        const prev = pages[i - 1];
        const showEllipsis = prev !== undefined && p - prev > 1;
        return (
          <span key={p} className="flex items-center gap-1.5">
            {showEllipsis && <span className="px-1 text-navy/30">…</span>}
            <Button
              variant={p === page ? "emerald" : "outline"}
              size="sm"
              className={cn(
                "min-w-10 h-10 rounded-full tabular-nums",
                p !== page && "border-beige bg-cream-light hover:border-emerald/40"
              )}
              onClick={() => goToPage(p)}
            >
              {p}
            </Button>
          </span>
        );
      })}
      <Button
        variant="outline"
        size="icon"
        disabled={page >= totalPages}
        onClick={() => goToPage(page + 1)}
        className="rounded-full h-10 w-10 border-beige"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  );
}
