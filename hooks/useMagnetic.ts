"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const FINE_POINTER = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

/**
 * Lets an element drift toward the cursor while the pointer is inside `area`, and spring back
 * when it leaves. Only on fine pointers without reduced motion.
 */
export function useMagnetic<A extends HTMLElement, T extends HTMLElement>(strength = 0.25) {
  const area = useRef<A>(null);
  const target = useRef<T>(null);

  useEffect(() => {
    const zone = area.current;
    const element = target.current;
    if (!zone || !element || !window.matchMedia(FINE_POINTER).matches) return;
    const toX = gsap.quickTo(element, "x", { duration: 0.8, ease: "power3.out" });
    const toY = gsap.quickTo(element, "y", { duration: 0.8, ease: "power3.out" });

    const move = (event: PointerEvent) => {
      const box = element.getBoundingClientRect();
      toX((event.clientX - (box.left + box.width / 2)) * strength);
      toY((event.clientY - (box.top + box.height / 2)) * strength);
    };
    const reset = () => {
      toX(0);
      toY(0);
    };
    zone.addEventListener("pointermove", move);
    zone.addEventListener("pointerleave", reset);
    return () => {
      zone.removeEventListener("pointermove", move);
      zone.removeEventListener("pointerleave", reset);
    };
  }, [strength]);

  return { area, target };
}
