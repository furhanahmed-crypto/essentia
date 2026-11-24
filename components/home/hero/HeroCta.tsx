import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/** Round "Explore" seal pinned to the hero's lower right; grows and turns on hover. */
export function HeroCta({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="hero-cta group grid size-28 shrink-0 place-items-center rounded-full bg-primary text-white transition-[scale,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-110 hover:bg-accent-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-night-ink sm:size-36 dark:text-night"
    >
      <span className="flex flex-col items-center gap-1 type-kicker uppercase tracking-[0.18em]">
        <ArrowUpRight
          aria-hidden
          strokeWidth={1.25}
          className="size-6 transition-transform duration-500 group-hover:rotate-45 sm:size-7"
        />
        {label}
      </span>
    </Link>
  );
}
