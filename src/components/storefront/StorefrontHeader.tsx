"use client";

import { AnnouncementBar } from "./AnnouncementBar";
import { Navbar } from "./Navbar";
import { useHeaderCompact } from "@/hooks/use-header-compact";
import { cn } from "@/lib/utils";

export function StorefrontHeader() {
  const compact = useHeaderCompact(40);

  return (
    <div
      className={cn(
        "sticky top-0 z-50 header-enter shadow-[0_1px_0_rgba(27,42,74,0.06)] transition-shadow duration-300",
        compact && "shadow-md"
      )}
    >
      <div className={cn("transition-all duration-300 ease-out overflow-hidden", compact ? "max-h-0 opacity-0" : "max-h-12 opacity-100")}>
        <AnnouncementBar />
      </div>
      <Navbar compact={compact} />
    </div>
  );
}
