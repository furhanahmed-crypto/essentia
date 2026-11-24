import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/** Round "Explore" seal on the hero's lower right: cream face, sage type; turns sage on hover. */
export function HeroCta({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="hero-cta group grid size-28 shrink-0 place-items-center rounded-full bg-cream text-accent-deep shadow-[0_24px_50px_-24px_rgba(0,0,0,0.7)] transition-[scale,background-color,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-110 hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-night-ink sm:size-36 dark:bg-night-ink dark:text-accent-deep dark:hover:bg-primary dark:hover:text-night"
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
