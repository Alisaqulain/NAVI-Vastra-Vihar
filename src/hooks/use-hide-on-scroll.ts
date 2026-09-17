"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  /** Pixels from top before hide-on-scroll-down applies */
  threshold?: number;
  /** Minimum scroll delta (px) to toggle visibility */
  delta?: number;
  disabled?: boolean;
};

export function useHideOnScroll({
  threshold = 96,
  delta = 10,
  disabled = false,
}: Options = {}) {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    if (disabled) {
      setHidden(false);
      return;
    }

    lastY.current = window.scrollY;

    const update = () => {
      const y = window.scrollY;
      const diff = y - lastY.current;

      if (y < threshold) {
        setHidden(false);
      } else if (diff > delta) {
        setHidden(true);
      } else if (diff < -delta) {
        setHidden(false);
      }

      lastY.current = y;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold, delta, disabled]);

  return hidden;
}
