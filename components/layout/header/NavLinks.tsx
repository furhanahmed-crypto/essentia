"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "cn";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { NavLink } from "@/constants/routes";

export const isActivePath = (pathname: string, href: string): boolean =>
  pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

const linkClass = (active: boolean) =>
  cn(
    "relative py-2 text-[0.74rem] tracking-[0.18em] uppercase transition-colors duration-300 hover:text-ink",
    "after:absolute after:bottom-0 after:left-1/2 after:size-1 after:-translate-x-1/2 after:rounded-full after:bg-primary after:transition-opacity",
    active ? "text-ink after:opacity-100" : "text-ink/65 after:opacity-0",
  );

// Desktop navigation: small uppercase links with a sage dot under the current page.
// A link with children (Services) opens a square-cornered dropdown on hover.
export function NavLinks({ links, className }: { links: NavLink[]; className?: string }) {
  const pathname = usePathname();
  return (
    <ul className={cn("m-0 flex items-center gap-8 p-0", className)}>
      {links.map(({ label, href, children }) => {
        const active = isActivePath(pathname, href);
        if (!children) {
          return (
            <li key={href} className="list-none">
              <Link prefetch={false} href={href} aria-current={active ? "page" : undefined} className={linkClass(active)}>
                {label}
              </Link>
            </li>
          );
        }
        return (
          <li key={href} className="list-none">
            <DropdownMenu>
              <DropdownMenuTrigger
                openOnHover
                delay={80}
                className={cn(linkClass(active), "group/nav flex cursor-pointer items-center gap-1.5 bg-transparent outline-none")}
              >
                {label}
                <ChevronDown className="size-3 transition-transform duration-300 group-data-popup-open/nav:rotate-180" />
              </DropdownMenuTrigger>
              <DropdownMenuContent sideOffset={18} className="w-64 rounded-none border border-line p-2 shadow-[0_24px_48px_-24px_rgba(52,51,48,0.35)]">
                <DropdownMenuItem
                  render={<Link prefetch={false} href={href} />}
                  className="cursor-pointer rounded-none px-3 py-2.5 type-label text-ink/60 focus:bg-mist focus:text-ink"
                >
                  All services
                </DropdownMenuItem>
                {children.map((child, index) => (
                  <DropdownMenuItem
                    key={child.href}
                    render={<Link prefetch={false} href={child.href} />}
                    className={cn(
                      "flex cursor-pointer items-baseline gap-3 rounded-none px-3 py-2.5 font-heading text-[0.98rem] focus:bg-mist focus:text-ink",
                      pathname === child.href ? "text-accent-deep" : "text-ink",
                    )}
                  >
                    <span className="type-label text-em">{String(index + 1).padStart(2, "0")}</span>
                    {child.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        );
      })}
    </ul>
  );
}
