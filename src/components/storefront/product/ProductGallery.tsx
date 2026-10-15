"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { ProductImage } from "@/components/ui/product-image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type ProductGalleryProps = {
  images: string[];
  productName: string;
};

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selected, setSelected] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const safeImages = images.length ? images : ["/logo.jpeg"];
  const current = safeImages[selected] ?? safeImages[0];

  const go = (dir: -1 | 1) => {
    setSelected((i) => (i + dir + safeImages.length) % safeImages.length);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-3 lg:gap-5 w-full min-w-0">
        <div
          className="hidden lg:flex flex-col gap-2.5 w-[76px] shrink-0 max-h-[min(680px,72vh)] overflow-y-auto scrollbar-hide p-0.5"
          role="tablist"
          aria-label="Product images"
        >
          {safeImages.map((img, i) => (
            <button
              key={`${img}-${i}`}
              type="button"
              role="tab"
              aria-selected={i === selected}
              aria-label={`View image ${i + 1}`}
              onClick={() => setSelected(i)}
              className={cn(
                "relative aspect-[3/4] w-full rounded-lg bg-white overflow-hidden transition-all duration-200",
                i === selected
                  ? "ring-2 ring-gold/70 shadow-md scale-[1.02]"
                  : "ring-1 ring-neutral-200 opacity-80 hover:opacity-100 hover:ring-gold/40"
              )}
            >
              <ProductImage src={img} alt="" fill className="object-cover object-top" sizes="76px" />
            </button>
          ))}
        </div>

        <div className="relative flex-1 min-w-0 group">
          <button
            type="button"
            onClick={() => setLightbox(true)}
            className="relative block w-full aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] max-h-[min(82vh,680px)] bg-gradient-to-b from-neutral-50 to-neutral-100/80 rounded-xl lg:rounded-2xl overflow-hidden ring-1 ring-neutral-200/80 shadow-[0_8px_40px_rgba(27,42,74,0.06)] cursor-zoom-in"
            aria-label="Zoom product image"
          >
            <ProductImage
              src={current}
              alt={productName}
              fill
              priority
              className="object-contain object-center p-2 sm:p-4 transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
            <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-medium text-navy/60 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
              <ZoomIn className="h-3 w-3" /> Zoom
            </span>
          </button>

          {safeImages.length > 1 && (
            <>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/95 border-neutral-200 shadow-md lg:hidden"
                onClick={() => go(-1)}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/95 border-neutral-200 shadow-md lg:hidden"
                onClick={() => go(1)}
                aria-label="Next image"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <p className="absolute bottom-3 left-3 lg:hidden text-[10px] font-medium bg-navy/75 text-white px-2 py-0.5 rounded-full tabular-nums">
                {selected + 1} / {safeImages.length}
              </p>
            </>
          )}
        </div>

        <div className="flex lg:hidden gap-2 overflow-x-auto scrollbar-hide pb-1" role="tablist">
          {safeImages.map((img, i) => (
            <button
              key={`m-${img}-${i}`}
              type="button"
              role="tab"
              aria-selected={i === selected}
              onClick={() => setSelected(i)}
              className={cn(
                "relative h-[72px] w-14 shrink-0 rounded-lg bg-white overflow-hidden ring-2 transition-all",
                i === selected ? "ring-gold/70" : "ring-neutral-200"
              )}
            >
              <ProductImage src={img} alt="" fill className="object-cover object-top" sizes="56px" />
            </button>
          ))}
        </div>
      </div>

      <Dialog open={lightbox} onOpenChange={setLightbox}>
        <DialogContent className="max-w-[min(96vw,900px)] p-2 sm:p-4 bg-neutral-950 border-none">
          <div className="relative aspect-[3/4] max-h-[85vh] w-full">
            <ProductImage src={current} alt={productName} fill className="object-contain" sizes="900px" />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
