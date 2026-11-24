"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "cn";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type CountUpProps = {
  /** Final integer to reach (e.g. 5 or 7). */
  to: number;
  /** Zero-pad the digits (e.g. 2 → "05"). */
  pad?: number;
  /** Text after the number (e.g. " days"). */
  suffix?: string;
  duration?: number;
  className?: string;
};

function renderValue(n: number, pad = 0, suffix = "") {
  return `${String(Math.round(n)).padStart(pad, "0")}${suffix}`;
}

/** Counts from 0 → `to` over ~3s when the value scrolls into view. */
export function CountUp({ to, pad = 0, suffix = "", duration = 3, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        el.textContent = renderValue(to, pad, suffix);
        return;
      }
      const state = { value: 0 };
      el.textContent = renderValue(0, pad, suffix);
      gsap.to(state, {
        value: to,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          once: true,
        },
        onUpdate: () => {
          el.textContent = renderValue(state.value, pad, suffix);
        },
      });
    },
    { scope: ref, dependencies: [to, pad, suffix, duration] },
  );

  return (
    <span ref={ref} className={cn(className)}>
      {renderValue(0, pad, suffix)}
    </span>
  );
}
