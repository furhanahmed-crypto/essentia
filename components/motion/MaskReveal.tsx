"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "cn";
import { watch } from "@/components/motion/Appear";
import { revealViewport } from "@/constants/motion";

interface MaskRevealProps {
  className?: string;
  /** Seconds before the wipe starts once the frame is on screen. */
  delay?: number;
  children: ReactNode;
}

// Photograph entrance: the frame wipes open from the bottom while the image settles from a slight
// zoom (.mask-reveal in globals.css). Shares Appear's IntersectionObserver; reduced motion shows it at once.
export function MaskReveal({ className, delay = 0, children }: MaskRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    return watch(element, revealViewport.margin, () => setShown(true));
  }, []);

  return (
    <div
      ref={ref}
      data-shown={shown}
      className={cn("mask-reveal relative overflow-hidden", className)}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="absolute inset-0" style={{ transitionDelay: `${delay}s` }}>
        {children}
      </div>
    </div>
  );
}
