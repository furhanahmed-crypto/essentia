"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "cn";
import { servicePath } from "@/constants/routes";
import { indexOf } from "@/utils/emphasis";

export interface MenuRow {
  slug: string;
  name: string;
  summary: string;
  image: string;
  imageAlt: string;
  count: number;
}

// The rows and the preview frame. On desktop the frame sits to the right of the list and
// crossfades to whichever row is hovered or focused; on mobile each row carries its own thumbnail.
export function MenuIndexList({ rows }: { rows: MenuRow[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,15rem)] xl:grid-cols-[minmax(0,1fr)_minmax(0,18rem)]">
      <ol className="m-0 border-t border-line p-0">
        {rows.map((row, index) => (
          <li key={row.slug} className="list-none border-b border-line">
            <Link
              href={servicePath(row.slug)}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              className="group grid grid-cols-[2.25rem_minmax(0,1fr)_auto] items-center gap-x-4 py-6 outline-none md:grid-cols-[3rem_minmax(0,1fr)_auto] md:py-7"
            >
              <span className="self-start pt-2 type-label text-em tabular-nums">{indexOf(index + 1)}</span>
              <span className="min-w-0">
                <span
                  className={cn(
                    "block font-heading text-[1.7rem] leading-tight tracking-tight transition-colors duration-300 sm:text-4xl xl:text-[2.75rem]",
                    active === index ? "md:text-ink" : "md:text-ink/45",
                    "text-ink group-hover:text-ink group-focus-visible:text-accent-deep",
                  )}
                >
                  {row.name}
                </span>
                <span className="mt-2 block max-w-lg text-sm text-text">
                  <span className="type-label mr-3 text-ink/55">{row.count} treatments</span>
                  <span className="max-md:hidden">{row.summary}</span>
                </span>
              </span>
              <span className="flex items-center gap-4">
                <span className="arch relative block h-16 w-12 md:hidden">
                  <Image src={row.image} alt="" fill sizes="48px" className="object-cover" />
                </span>
                <ArrowRight
                  aria-hidden
                  strokeWidth={1.25}
                  className="size-6 text-ink/50 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-ink max-md:hidden"
                />
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <div aria-hidden className="relative hidden md:block">
        <div className="sticky top-32 aspect-[3/4] w-full overflow-hidden bg-mist">
          {rows.map((row, index) => (
            <Image
              key={row.slug}
              src={row.image}
              alt=""
              fill
              sizes="(max-width: 1280px) 240px, 288px"
              className={cn(
                "object-cover transition-[opacity,transform] duration-700 ease-out",
                active === index ? "scale-100 opacity-100" : "scale-105 opacity-0",
              )}
            />
          ))}
          <p className="absolute bottom-0 left-0 m-0 bg-card px-4 py-2 type-label text-ink">
            {indexOf(active + 1)} / {indexOf(rows.length)}
          </p>
        </div>
      </div>
    </div>
  );
}
