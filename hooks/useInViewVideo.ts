"use client";

import { useEffect, useRef } from "react";

/** Plays a muted reel only while it is on screen; never autoplays for reduced-motion visitors. */
export function useInViewVideo<T extends HTMLVideoElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return ref;
}
