import Link from "next/link";
import { OccasionPanel } from "@/components/home/occasions/OccasionPanel";
import home from "@/constants/home/content.json";
import { OCCASION_RITUALS } from "@/constants/packages";
import type { OccasionSide } from "@/types/home/content";

/**
 * Bride and groom as two independent full-height photographs. On desktop the half you point at
 * widens; on mobile they stack. Tier names come from packages.json — never prices.
 */
export function Occasions() {
  const { occasions } = home;
  const sides = occasions.sides as OccasionSide[];

  return (
    <section aria-labelledby="occasions-title" className="band-night relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex flex-col items-center gap-3 bg-gradient-to-b from-night/75 to-transparent px-[var(--es-gutter)] pt-10 pb-20 text-center lg:pt-12">
        <p className="m-0 type-kicker tracking-[0.18em] text-night-ink/75 uppercase">{occasions.label}</p>
        <h2 id="occasions-title" className="m-0 max-w-xl font-heading text-2xl leading-tight text-night-ink italic md:text-3xl">
          {occasions.title}
        </h2>
        <Link
          href={occasions.cta.href}
          className="link-draw pointer-events-auto mt-1 pb-1 type-kicker tracking-[0.16em] text-night-ink uppercase"
        >
          {occasions.cta.label} →
        </Link>
      </div>

      <div className="flex flex-col lg:h-[calc(100svh-var(--header-h))] lg:min-h-[40rem] lg:flex-row">
        {sides.map((side) => {
          const pkg = OCCASION_RITUALS.find((item) => item.id === side.packageId);
          return pkg ? <OccasionPanel key={side.packageId} side={side} pkg={pkg} /> : null;
        })}
      </div>
    </section>
  );
}
