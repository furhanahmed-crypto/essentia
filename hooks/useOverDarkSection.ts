"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { headerOffset } from "@/utils/headerOffset";

/** Sections that sit under the sticky header on a dark ground mark themselves with this attribute. */
export const DARK_SECTION_ATTR = "data-header-dark";

/**
 * True while a `[data-header-dark]` section lies beneath the sticky header, so the header can switch
 * to its dark glass treatment. One IntersectionObserver whose root is the header's own strip at the
 * top of the viewport — no scroll listeners. Re-armed per route and on resize.
 */
export function useOverDarkSection(): boolean {
  const pathname = usePathname();
  const [state, setState] = useState<{ path: string; over: boolean }>({ path: "", over: false });

  useEffect(() => {
    const section = document.querySelector(`[${DARK_SECTION_ATTR}]`);
    if (!section) return;
    let observer: IntersectionObserver | undefined;

    const arm = () => {
      observer?.disconnect();
      // The header strip plus a hair: a section starting right at the header's bottom edge counts.
      const strip = Math.round(headerOffset()) + 2;
      observer = new IntersectionObserver(
        ([entry]) => setState({ path: pathname, over: entry.isIntersecting }),
        { rootMargin: `0px 0px -${Math.max(0, window.innerHeight - strip)}px 0px` },
      );
      observer.observe(section);
    };

    arm();
    window.addEventListener("resize", arm);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", arm);
    };
  }, [pathname]);

  // A reading from another route never leaks onto this one.
  return state.path === pathname && state.over;
}
