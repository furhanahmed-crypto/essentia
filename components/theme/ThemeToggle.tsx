"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "cn";
import { Button } from "@/components/ui/button";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function isInside(rect: DOMRect, x: number, y: number): boolean {
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

// Ported from DayFlow: the new theme grows as a circle from this button (`theme-reveal` in globals.css).
export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const transitionRef = useRef<ViewTransition | null>(null);
  const [animating, setAnimating] = useState(false);

  // Applies the class now as well as through next-themes, so the view transition captures the new theme.
  const applyTheme = (dark: boolean) => {
    document.documentElement.classList.toggle("dark", dark);
    setTheme(dark ? "dark" : "light");
  };

  const switchTheme = (dark: boolean) => {
    const button = buttonRef.current;
    if (!button || !document.startViewTransition || window.matchMedia(REDUCED_MOTION).matches) {
      applyTheme(dark);
      return;
    }
    const { left, top, width, height } = button.getBoundingClientRect();
    const root = document.documentElement;
    root.style.setProperty("--theme-x", `${left + width / 2}px`);
    root.style.setProperty("--theme-y", `${top + height / 2}px`);
    // A click mid-animation finishes the running switch at once and starts the next one.
    transitionRef.current?.skipTransition();
    const transition = document.startViewTransition(() => flushSync(() => applyTheme(dark)));
    transitionRef.current = transition;
    setAnimating(true);
    void transition.finished.finally(() => {
      if (transitionRef.current !== transition) return;
      transitionRef.current = null;
      setAnimating(false);
    });
  };

  const toggle = () => switchTheme(!document.documentElement.classList.contains("dark"));

  // While a view transition runs, the browser sends every click to <html>, not to the page. Catch
  // clicks that land on the toggle's spot so it stays usable for the next switch.
  useEffect(() => {
    if (!animating) return;
    const onPointerDown = (event: PointerEvent) => {
      const button = buttonRef.current;
      if (!button || !isInside(button.getBoundingClientRect(), event.clientX, event.clientY)) return;
      event.preventDefault();
      toggle();
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    return () => document.removeEventListener("pointerdown", onPointerDown, true);
  });

  return (
    <Button
      ref={buttonRef}
      type="button"
      variant="ghost"
      size="icon-sm"
      className={cn(className)}
      aria-label="Switch between light and dark theme"
      onClick={toggle}
    >
      <Moon aria-hidden className="size-4 dark:hidden" />
      <Sun aria-hidden className="hidden size-4 dark:block" />
    </Button>
  );
}
