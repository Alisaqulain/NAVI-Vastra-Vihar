"use client";

import { AnnouncementBar } from "./AnnouncementBar";
import { Navbar } from "./Navbar";
import { useHideOnScroll } from "@/hooks/use-hide-on-scroll";
import { cn } from "@/lib/utils";

export function StorefrontHeader() {
  const hidden = useHideOnScroll({ threshold: 72, delta: 12 });

  return (
    <div
      className={cn(
        "sticky top-0 z-50 will-change-transform transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        hidden ? "-translate-y-full shadow-none" : "translate-y-0 shadow-[0_8px_32px_rgba(27,42,74,0.08)]"
      )}
    >
      <AnnouncementBar />
      <Navbar />
    </div>
  );
}
