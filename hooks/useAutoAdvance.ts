"use client";

import { useEffect, useState } from "react";

/**
 * Calls `advance` every `ms` while not paused. Pauses for reduced-motion visitors, and stays
 * paused for good once the visitor picks an item themselves.
 */
export function useAutoAdvance(advance: () => void, ms: number, deps: unknown) {
  const [hovered, setHovered] = useState(false);
  const [stopped, setStopped] = useState(false);

  useEffect(() => {
    if (hovered || stopped || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(advance, ms);
    return () => window.clearTimeout(timer);
  }, [advance, ms, hovered, stopped, deps]);

  return {
    stop: () => setStopped(true),
    pauseProps: {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      onFocus: () => setHovered(true),
      onBlur: () => setHovered(false),
    },
  };
}
