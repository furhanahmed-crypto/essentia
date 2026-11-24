"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const REDUCED = "(prefers-reduced-motion: reduce)";
const FINE_POINTER = "(hover: hover) and (pointer: fine)";

function LenisGsapBridge() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();
    return () => {
      gsap.ticker.remove(tick);
      lenis.off("scroll", ScrollTrigger.update);
    };
  }, [lenis]);

  return null;
}

/**
 * Desktop / fine-pointer: Lenis smooth wheel scroll, RAF driven by GSAP ticker for ScrollTrigger sync.
 * Touch / coarse pointer: native scrolling (feels better on iOS/Android). Reduced motion: no Lenis.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<"off" | "smooth">("off");

  useEffect(() => {
    const reduced = window.matchMedia(REDUCED);
    const fine = window.matchMedia(FINE_POINTER);
    const sync = () => {
      setMode(reduced.matches || !fine.matches ? "off" : "smooth");
    };
    sync();
    reduced.addEventListener("change", sync);
    fine.addEventListener("change", sync);
    return () => {
      reduced.removeEventListener("change", sync);
      fine.removeEventListener("change", sync);
    };
  }, []);

  if (mode === "off") return children;

  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        lerp: 0.09,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 1,
        touchMultiplier: 1,
        anchors: true,
      }}
    >
      <LenisGsapBridge />
      {children}
    </ReactLenis>
  );
}
