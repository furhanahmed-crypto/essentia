"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SETTLE_MS = 200;
const HEIGHT_TOLERANCE_PX = 2;

/**
 * Keeps pinned / scrubbed sections honest. ScrollTrigger measures start and end points once; if
 * anything above a pin changes height afterwards (late images or fonts, a section swapped by hot
 * reload, an accordion), those points go stale and the page appears to swallow a screen of scroll.
 * This watches the document height and re-measures once it settles. The height left by the
 * refresh itself is remembered, so pin spacers never trigger a loop.
 */
export function ScrollTriggerSync() {
  useEffect(() => {
    let settledHeight = document.documentElement.scrollHeight;
    let timer: number | undefined;

    const refresh = () => {
      ScrollTrigger.refresh();
      settledHeight = document.documentElement.scrollHeight;
    };

    const observer = new ResizeObserver(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        const height = document.documentElement.scrollHeight;
        if (Math.abs(height - settledHeight) > HEIGHT_TOLERANCE_PX) refresh();
      }, SETTLE_MS);
    });
    observer.observe(document.body);

    const onLoad = () => refresh();
    if (document.readyState !== "complete") window.addEventListener("load", onLoad, { once: true });
    document.fonts?.ready.then(refresh).catch(() => undefined);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return null;
}
