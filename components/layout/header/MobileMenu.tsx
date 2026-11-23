"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { cn } from "cn";
import { Icon } from "@/components/shared/Icon";
import { BRAND } from "@/constants/brand";
import { NAV_LINKS, SERVICE_NAV } from "@/constants/routes";
import { WA } from "@/constants/whatsapp";
import { isActivePath } from "./NavLinks";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

// Full-screen menu below the header bar (phones and tablets): oversized numbered links, the five
// disciplines, and direct contact. Locks page scroll while open; Escape closes it.
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      id="mobile-menu"
      aria-hidden={!open}
      inert={!open}
      className={cn(
        "fixed inset-x-0 top-[var(--header-h)] bottom-0 z-[45] overflow-y-auto bg-background transition-[opacity,clip-path] duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] lg:hidden",
        open ? "opacity-100 [clip-path:inset(0_0_0_0)]" : "pointer-events-none opacity-0 [clip-path:inset(0_0_100%_0)]",
      )}
    >
      <nav aria-label="Main" className="shell flex min-h-full flex-col gap-12 pt-8 pb-28">
        <ol className="m-0 border-t border-line p-0">
          {NAV_LINKS.map((link, index) => (
            <li key={link.href} className="list-none border-b border-line">
              <Link
                prefetch={false}
                href={link.href}
                onClick={onClose}
                aria-current={isActivePath(pathname, link.href) ? "page" : undefined}
                className="flex items-baseline gap-5 py-5"
              >
                <span className="type-label text-em">{String(index + 1).padStart(2, "0")}</span>
                <span
                  className={cn(
                    "font-heading text-4xl tracking-tight",
                    isActivePath(pathname, link.href) ? "text-accent-deep italic" : "text-ink",
                  )}
                >
                  {link.label}
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <div>
          <p className="m-0 type-label text-ink/55">Disciplines</p>
          <ul className="mt-4 mb-0 grid grid-cols-2 gap-x-6 gap-y-3 p-0">
            {SERVICE_NAV.map((service) => (
              <li key={service.href} className="list-none">
                <Link prefetch={false} href={service.href} onClick={onClose} className="text-sm text-ink">
                  {service.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto grid gap-3 border-t border-line pt-8 text-sm text-ink">
          <a href={BRAND.phoneHref} className="font-heading text-2xl">
            {BRAND.phone}
          </a>
          <a href={BRAND.emailHref} className="text-text">
            {BRAND.email}
          </a>
          <a href={WA.home} target="_blank" rel="noopener" className="mt-2 inline-flex items-center gap-2 type-label text-ink">
            <Icon icon={faWhatsapp} className="text-base text-whatsapp" /> WhatsApp the lounge
          </a>
        </div>
      </nav>
    </div>
  );
}
