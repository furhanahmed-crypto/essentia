"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { cn } from "cn";
import { useOverDarkSection } from "@/hooks/useOverDarkSection";
import { useScrolled } from "@/hooks/useScrolled";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { BRAND } from "@/constants/brand";
import { NAV_LEFT, ROUTES } from "@/constants/routes";
import { WA } from "@/constants/whatsapp";
import { MobileMenu } from "./header/MobileMenu";
import { NavLinks } from "./header/NavLinks";

const emptySubscribe = () => () => undefined;

// Masthead. Ivory by default; while a dark section (the home hero) sits beneath it, it turns to dark
// glass — night tint, blur, ivory type, inverted Enquire — so it reads as part of that stage rather
// than a light bar laid over it. Tightens slightly on scroll.
export function SiteHeader() {
  const scrolled = useScrolled(24);
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const { resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const dark = mounted && resolvedTheme === "dark";
  const overDark = useOverDarkSection() && !open;

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b backdrop-blur-md transition-[background-color,border-color] duration-500",
          overDark
            ? "border-night-ink/10 bg-night/95 backdrop-blur-xl"
            : cn("bg-background/92", scrolled || open ? "border-line" : "border-transparent"),
        )}
      >
        <div
          className={cn(
            "shell grid grid-cols-[auto_1fr] items-center lg:grid-cols-[1fr_auto_1fr] transition-[height] duration-500",
            scrolled ? "h-[68px] lg:h-[72px]" : "h-[68px] lg:h-[84px]",
          )}
        >
          <nav aria-label="Main" className="hidden lg:block">
            <NavLinks links={NAV_LEFT} inverse={overDark} />
          </nav>

          <Link
            prefetch={false}
            href={ROUTES.home}
            onClick={close}
            aria-label={`${BRAND.name} — home`}
            className="justify-self-start lg:justify-self-center"
          >
            <Image
              src={dark || overDark ? BRAND.logoLight : BRAND.logo}
              alt={BRAND.name}
              width={1512}
              height={300}
              sizes="180px"
              priority
              className={cn("w-auto transition-[height] duration-500", scrolled ? "h-8 lg:h-9" : "h-9 lg:h-11")}
            />
          </Link>

          <div className="flex items-center justify-end gap-2 lg:gap-6">
            <NavLinks links={[{ label: "Contact", href: ROUTES.contact }]} className="hidden lg:flex" inverse={overDark} />
            <ThemeToggle className={overDark ? "text-night-ink hover:bg-night-ink/10 hover:text-night-ink" : undefined} />
            <a
              href={WA.home}
              target="_blank"
              rel="noopener"
              className={cn(
                "hidden h-10 items-center px-5 text-[0.72rem] tracking-[0.18em] uppercase transition-colors duration-500 lg:inline-flex",
                overDark
                  ? "bg-night-ink text-night hover:bg-primary hover:text-white"
                  : "bg-ink text-background hover:bg-accent-deep dark:bg-night-ink dark:text-night",
              )}
            >
              Enquire
            </a>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((value) => !value)}
              className={cn("flex h-10 items-center gap-2.5 pl-2 type-label lg:hidden", overDark ? "text-night-ink" : "text-ink")}
            >
              <span aria-hidden className="relative block h-2.5 w-5">
                <span className={cn("absolute left-0 h-px w-full bg-current transition-transform duration-300", open ? "top-1 rotate-45" : "top-0")} />
                <span className={cn("absolute left-0 h-px w-full bg-current transition-transform duration-300", open ? "top-1 -rotate-45" : "top-2.5")} />
              </span>
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={close} />
    </>
  );
}
