"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ManifestoSlide } from "@/components/home/manifesto/ManifestoSlide";
import home from "@/constants/home/content.json";
import { DESKTOP_MOTION } from "@/constants/motion";
import type { Principle } from "@/types/home/content";
import { pinStart } from "@/utils/headerOffset";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Full sage band. Desktop pins it and plays the four strengths one at a time: the word fills
 * left to right, its photo swings in, then it lifts away for the next. Elsewhere they simply stack.
 */
export function Manifesto() {
  const { manifesto } = home;
  const principles = manifesto.principles as Principle[];
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(DESKTOP_MOTION, () => {
        const section = root.current;
        if (!section) return;
        section.classList.add("is-pinned");
        const slides = gsap.utils.toArray<HTMLElement>(".manifesto-slide");
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: section, start: pinStart, end: `+=${slides.length * 80}%`, pin: true, scrub: 0.8 },
        });
        slides.forEach((slide, index) => {
          const at = index * 1.4;
          if (index > 0) tl.from(slide, { autoAlpha: 0, yPercent: 18, duration: 0.4 }, at - 0.2);
          tl.fromTo(slide.querySelector(".manifesto-fill"), { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.8 }, at)
            .from(slide.querySelector(".manifesto-photo"), { rotate: 14, scale: 0.7, autoAlpha: 0, duration: 0.6 }, at)
            .from(slide.querySelector(".manifesto-copy"), { y: 30, autoAlpha: 0, duration: 0.5 }, at + 0.2);
          if (index < slides.length - 1) tl.to(slide, { autoAlpha: 0, yPercent: -18, duration: 0.4 }, at + 1.1);
        });
        return () => section.classList.remove("is-pinned");
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="manifesto-title"
      className="relative overflow-hidden bg-primary py-20 text-ink md:py-28 lg:flex lg:h-[calc(100svh-var(--header-h))] lg:min-h-[40rem] lg:flex-col lg:py-14"
    >
      <div className="shell flex items-baseline justify-between gap-6">
        <h2 id="manifesto-title" className="m-0 font-heading text-2xl text-ink italic md:text-3xl">
          {manifesto.title}
        </h2>
        <p className="m-0 type-kicker tracking-[0.18em] text-ink/70 uppercase">{manifesto.label}</p>
      </div>

      <div className="shell relative mt-10 lg:mt-0 lg:flex-1">
        {principles.map((principle, index) => (
          <ManifestoSlide key={principle.title} principle={principle} position={index} />
        ))}
      </div>
    </section>
  );
}
