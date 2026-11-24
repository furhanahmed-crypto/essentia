"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { StoryPhotos } from "@/components/home/story/StoryPhotos";
import home from "@/constants/home/content.json";
import { DESKTOP_MOTION } from "@/constants/motion";
import { pinStart } from "@/utils/headerOffset";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const DEPTH = [-38, -64, -24] as const;

/**
 * Pinned on desktop: the three lines of the brand statement light up one after another while the
 * photographs drift past at different depths, then the facts land. Static stack everywhere else.
 */
export function Story() {
  const { story } = home;
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(DESKTOP_MOTION, () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root.current, start: pinStart, end: "+=140%", pin: true, scrub: 0.8 },
        });
        tl.fromTo(".story-line", { opacity: 0.12 }, { opacity: 1, stagger: 0.6, duration: 0.6 }, 0);
        gsap.utils.toArray<HTMLElement>(".story-photo").forEach((photo, index) => {
          tl.fromTo(photo, { yPercent: 70, opacity: 0 }, { yPercent: DEPTH[index], opacity: 1, duration: 2 }, index * 0.35);
        });
        tl.from(".story-facts > *", { y: 40, opacity: 0, stagger: 0.15, duration: 0.5 }, 1.6);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="story-title"
      className="relative overflow-hidden bg-background py-24 lg:flex lg:h-[calc(100svh-var(--header-h))] lg:min-h-[38rem] lg:items-center lg:py-0"
    >
      <div className="shell relative z-10 text-center">
        <p className="m-0 type-kicker tracking-[0.18em] text-accent-deep uppercase">{story.label}</p>
        <h2 id="story-title" className="mx-auto mt-6 mb-0 max-w-5xl type-poster text-ink">
          {story.frames.map((frame) => (
            <span key={frame.line} className="story-line block">
              {frame.line}
            </span>
          ))}
        </h2>
        <Link
          href={story.cta.href}
          className="link-draw mt-10 inline-block pb-1 type-kicker tracking-[0.16em] text-ink uppercase"
        >
          {story.cta.label} →
        </Link>
      </div>

      <StoryPhotos frames={story.frames} />

      <dl className="story-facts shell relative z-10 mt-16 mb-0 grid gap-8 sm:grid-cols-3 lg:absolute lg:bottom-10 lg:left-[var(--es-gutter)] lg:mx-0 lg:mt-0 lg:w-[27rem] lg:gap-6">
        {story.facts.map((fact) => (
          <div key={fact.label} className="text-center lg:text-left">
            <dt className="font-heading text-4xl tracking-tight text-ink lg:text-3xl">{fact.value}</dt>
            <dd className="mt-2 mb-0 text-xs leading-snug text-muted-foreground">{fact.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
