"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "cn";
import { servicePath } from "@/constants/routes";
import { indexOf } from "@/utils/emphasis";
import type { MenuRow } from "./MenuIndex";

// Image-led service panels: each discipline is a full-bleed strip; active panel expands on desktop.
export function MenuIndexList({ rows }: { rows: MenuRow[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-3 lg:h-[min(72vh,640px)] lg:flex-row lg:gap-2">
      {rows.map((row, index) => {
        const open = active === index;
        return (
          <Link
            key={row.slug}
            href={servicePath(row.slug)}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            className={cn(
              "group relative block min-h-[11rem] overflow-hidden bg-mist outline-none transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:min-h-[13rem]",
              "lg:h-full lg:min-h-0",
              open ? "lg:flex-[2.4]" : "lg:flex-[0.85]",
            )}
          >
            <Image
              src={row.image}
              alt={row.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className={cn(
                "object-cover transition-transform duration-[1.2s] ease-out",
                open ? "scale-100" : "scale-110 lg:scale-105",
              )}
            />
            <div
              aria-hidden
              className={cn(
                "absolute inset-0 bg-gradient-to-t from-night/80 via-night/25 to-transparent transition-opacity duration-500",
                open ? "opacity-100" : "opacity-80 lg:opacity-70",
              )}
            />
            <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 p-5 sm:p-6">
              <div className="min-w-0">
                <span className="type-label text-night-muted tabular-nums">{indexOf(index + 1)}</span>
                <span
                  className={cn(
                    "mt-2 block font-heading tracking-tight text-night-ink transition-[font-size] duration-500",
                    open ? "text-3xl sm:text-4xl lg:text-[2.75rem]" : "text-2xl sm:text-3xl lg:text-2xl",
                  )}
                >
                  {row.name}
                </span>
                <span
                  className={cn(
                    "mt-2 block max-w-sm text-sm text-night-muted transition-opacity duration-500",
                    open ? "opacity-100" : "opacity-0 lg:h-0 lg:overflow-hidden lg:opacity-0",
                  )}
                >
                  <span className="type-label mr-2 text-em">{row.count} treatments</span>
                  {row.summary}
                </span>
              </div>
              <ArrowUpRight
                aria-hidden
                strokeWidth={1.25}
                className={cn(
                  "size-6 shrink-0 text-night-ink transition-transform duration-500",
                  open ? "translate-x-0 opacity-100" : "translate-y-1 opacity-70 lg:opacity-40",
                )}
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
