"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "cn";
import { JourneyStep } from "@/components/home/journey/JourneyStep";
import home from "@/constants/home/content.json";
import { DESKTOP_MOTION } from "@/constants/motion";
import type { JourneyStep as Step } from "@/types/home/content";
import { pinStart } from "@/utils/headerOffset";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const LIFT = ["lg:self-center", "lg:self-start", "lg:self-end", "lg:self-center"] as const;

/**
 * Pale sage band. Desktop pins it and turns vertical scroll into a sideways walk through the four
 * movements, with a line that fills as you go. Mobile reads as a vertical timeline.
 */
export function Journey() {
  const { journey } = home;
  const steps = journey.steps as Step[];
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(DESKTOP_MOTION, () => {
        const section = root.current;
        const rail = track.current;
        if (!section || !rail) return;
        section.classList.add("is-pinned");
        const distance = () => rail.scrollWidth - window.innerWidth + 96;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: section, start: pinStart, end: () => `+=${distance()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true },
        });
        tl.to(rail, { x: () => -distance() }, 0).fromTo(".journey-progress", { scaleX: 0 }, { scaleX: 1 }, 0);
        return () => section.classList.remove("is-pinned");
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="journey-title"
      className="relative overflow-hidden bg-mist py-20 md:py-28 lg:flex lg:h-[calc(100svh-var(--header-h))] lg:min-h-[40rem] lg:flex-col lg:py-12"
    >
      <div className="shell flex items-end justify-between gap-6">
        <h2 id="journey-title" className="m-0 type-poster text-ink">
          {journey.title}
        </h2>
        <p className="m-0 max-w-[12rem] text-right type-kicker tracking-[0.14em] text-ink/60 uppercase">{journey.label}</p>
      </div>

      <div className="no-scrollbar mt-14 lg:mt-0 lg:flex lg:flex-1 lg:items-center lg:overflow-x-auto in-[.is-pinned]:overflow-visible">
        <div
          ref={track}
          className="shell relative flex flex-col gap-14 border-l border-ink/20 pl-8 lg:mx-0 lg:h-[78%] lg:w-max lg:flex-row lg:gap-28 lg:border-0 lg:pr-24 lg:pl-[var(--es-gutter)]"
        >
          {steps.map((step, index) => (
            <div key={step.title} className={cn("relative lg:w-[30rem] lg:shrink-0", LIFT[index])}>
              <span aria-hidden className="absolute top-3 -left-[2.3rem] size-3 rounded-full bg-accent-deep lg:hidden" />
              <JourneyStep step={step} position={index} />
            </div>
          ))}
        </div>
      </div>

      <div aria-hidden className="shell mt-6 hidden h-px bg-ink/15 lg:block">
        <div className="journey-progress h-full origin-left bg-ink" />
      </div>
    </section>
  );
}
