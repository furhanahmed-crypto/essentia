"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { cn } from "cn";
import { useScrolled } from "@/hooks/useScrolled";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { BRAND } from "@/constants/brand";
import { NAV_LEFT, ROUTES } from "@/constants/routes";
import { MobileMenu } from "./header/MobileMenu";
import { NavLinks } from "./header/NavLinks";

const emptySubscribe = () => () => undefined;

// Editorial masthead: links on the left, the logo centred, contact on the right. It stays a single
// ivory surface and only gains a hairline and tighter height once the page scrolls.
// Below lg the links move into a full-screen menu opened by a text button.
export function SiteHeader() {
  const scrolled = useScrolled(24);
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const { resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const dark = mounted && resolvedTheme === "dark";

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b bg-background/92 backdrop-blur-md transition-[border-color,box-shadow] duration-500",
          scrolled || open ? "border-line" : "border-transparent",
        )}
      >
        <div
          className={cn(
            "shell grid grid-cols-[auto_1fr] items-center lg:grid-cols-[1fr_auto_1fr] transition-[height] duration-500",
            scrolled ? "h-[68px] lg:h-[72px]" : "h-[68px] lg:h-[84px]",
          )}
        >
          <nav aria-label="Main" className="hidden lg:block">
            <NavLinks links={NAV_LEFT} />
          </nav>

          <Link prefetch={false} href={ROUTES.home} onClick={close} aria-label={`${BRAND.name} — home`} className="justify-self-start lg:justify-self-center">
            <Image
              src={dark ? BRAND.logoLight : BRAND.logo}
              alt={BRAND.name}
              width={1512}
              height={300}
              sizes="180px"
              priority
              className={cn("w-auto transition-[height] duration-500", scrolled ? "h-8 lg:h-9" : "h-9 lg:h-11")}
            />
          </Link>

          <div className="flex items-center justify-end gap-2 lg:gap-6">
            <NavLinks links={[{ label: "Contact", href: ROUTES.contact }]} className="hidden lg:flex" />
            <ThemeToggle />
            <Link
              prefetch={false}
              href={ROUTES.contact}
              className="hidden h-10 items-center bg-ink px-5 text-[0.72rem] tracking-[0.18em] text-background uppercase transition-colors hover:bg-accent-deep lg:inline-flex dark:bg-night-ink dark:text-night"
            >
              Enquire
            </Link>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((value) => !value)}
              className="flex h-10 items-center gap-2.5 pl-2 type-label text-ink lg:hidden"
            >
              <span aria-hidden className="relative block h-2.5 w-5">
                <span className={cn("absolute left-0 h-px w-full bg-ink transition-transform duration-300", open ? "top-1 rotate-45" : "top-0")} />
                <span className={cn("absolute left-0 h-px w-full bg-ink transition-transform duration-300", open ? "top-1 -rotate-45" : "top-2.5")} />
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
