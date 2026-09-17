"use client";

import { useCallback, useEffect, useState } from "react";
import { SLIDER_AUTO_INTERVAL_MS } from "@/lib/constants/carousel";

export function useAutoAdvance(
  length: number,
  intervalMs: number = SLIDER_AUTO_INTERVAL_MS,
  paused = false
) {
  const [active, setActive] = useState(0);

  const go = useCallback(
    (dir: -1 | 1) => {
      if (length < 1) return;
      setActive((a) => (a + dir + length) % length);
    },
    [length]
  );

  const goTo = useCallback(
    (index: number) => {
      if (length < 1) return;
      setActive(((index % length) + length) % length);
    },
    [length]
  );

  useEffect(() => {
    if (paused || length < 2) return;

    const id = window.setInterval(() => {
      if (document.visibilityState === "hidden") return;
      setActive((a) => (a + 1) % length);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [paused, length, intervalMs]);

  return { active, setActive, go, goTo };
}
