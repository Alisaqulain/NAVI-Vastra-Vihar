"use client";

import { useEffect, useRef, type RefObject } from "react";
import { SLIDER_AUTO_INTERVAL_MS } from "@/lib/constants/carousel";

type Options = {
  enabled?: boolean;
  intervalMs?: number;
  itemSelector?: string;
  pauseWhenHidden?: boolean;
};

export function useHorizontalAutoScroll(
  scrollRef: RefObject<HTMLElement | null>,
  {
    enabled = true,
    intervalMs = SLIDER_AUTO_INTERVAL_MS,
    itemSelector = "[data-auto-scroll-item]",
    pauseWhenHidden = true,
  }: Options = {}
) {
  const pausedRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    const tick = () => {
      if (pausedRef.current) return;
      if (pauseWhenHidden && document.visibilityState === "hidden") return;

      const el = scrollRef.current;
      if (!el) return;

      const max = el.scrollWidth - el.clientWidth;
      if (max <= 8) return;

      const firstItem = el.querySelector<HTMLElement>(itemSelector);
      const gapStyle = getComputedStyle(el).gap || "24px";
      const gap = parseFloat(gapStyle) || 24;
      const step = firstItem ? firstItem.offsetWidth + gap : 300;

      if (el.scrollLeft >= max - 8) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: step, behavior: "smooth" });
      }
    };

    const id = window.setInterval(tick, intervalMs);
    return () => window.clearInterval(id);
  }, [enabled, intervalMs, itemSelector, pauseWhenHidden, scrollRef]);

  return {
    pause: () => {
      pausedRef.current = true;
    },
    resume: () => {
      pausedRef.current = false;
    },
  };
}
