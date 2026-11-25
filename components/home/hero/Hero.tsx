"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { cn } from "cn";
import { HeroBackdrop } from "@/components/home/hero/HeroBackdrop";
import { HeroCta } from "@/components/home/hero/HeroCta";
import { HeroEdit } from "@/components/home/hero/HeroEdit";
import { HeroFinale } from "@/components/home/hero/HeroFinale";
import { HeroFrame } from "@/components/home/hero/HeroFrame";
import { HeroSky } from "@/components/home/hero/HeroSky";
import { bindSkySpeed } from "@/components/home/hero/heroSkySpeed";
import { buildSwap, placeInstantly, type SwapTargets } from "@/components/home/hero/heroSwap";
import { HeroWordmark } from "@/components/home/hero/HeroWordmark";
import {
  bringToFront,
  initialOrder,
  slotOf,
} from "@/components/home/hero/heroSlots";
import {
  buildHeroScroll,
  buildHeroTail,
  SCROLL_LOCK_PROGRESS,
} from "@/components/home/hero/heroTimeline";
import { Icon } from "@/components/shared/Icon";
import { BRAND } from "@/constants/brand";
import home from "@/constants/home/content.json";
import { ANY_MOTION } from "@/constants/motion";
import { WA } from "@/constants/whatsapp";
import type { HeroFrameItem } from "@/types/home/content";
import { emphasis } from "@/utils/emphasis";
import { pinStart } from "@/utils/headerOffset";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** How far the nearest star depth rises over the whole section, as a share of the viewport. */
const SKY_PARALLAX = 0.16;

/**
 * Scroll-driven opener, three stacked layers inside one tall section:
 *  · `.hero-word-layer` — sticky for the whole section; holds ESSENTIA, the bloom and the line
 *  · `.hero-track`      — holds the sticky stage (prints, copy, set); the scrubbed timeline runs
 *                         over this track
 *  · `.hero-tail`       — extra runway after the stage has scrolled away, during which the
 *                         assembled word stays centred; the section's end then carries it off
 * The page scrolls natively throughout (Lenis untouched, no pinning or scroll locking).
 */
export function Hero() {
  const { hero } = home;
  const frames = hero.frames as HeroFrameItem[];
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const tail = useRef<HTMLDivElement>(null);
  const [order, setOrder] = useState(() => initialOrder(frames.length));
  // The order the prints are heading to, read synchronously so rapid clicks chain correctly.
  const orderRef = useRef(order);
  const swap = useRef<gsap.core.Timeline | null>(null);
  const front = order[Math.floor(order.length / 2)];

  useEffect(() => () => void swap.current?.kill(), []);

  /**
   * Bring a print forward. Never locked: each click kills the running swap and starts a new one
   * from wherever the prints are right now, so choosing one print and then another straight away
   * just bends the motion towards the latest choice (see `heroSwap`).
   */
  const select = useCallback((frame: number) => {
    const section = root.current;
    if (!section || section.classList.contains("is-playing")) return;
    const from = orderRef.current;
    if (slotOf(from, frame) === 0) return;

    const to = bringToFront(from, frame);
    const targets: SwapTargets = {
      slots: Array.from(section.querySelectorAll<HTMLElement>(".hero-slot")),
      figures: Array.from(section.querySelectorAll<HTMLElement>(".hero-frame")),
    };
    orderRef.current = to;
    setOrder(to);
    swap.current?.kill();
    swap.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? (placeInstantly(targets, to), null)
      : buildSwap(targets, from, to, frame);
  }, []);

  // One-off load-in. Its own context, so re-stacking never replays it.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(ANY_MOTION, () => {
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .from(".hero-frame-intro", {
            y: 70,
            autoAlpha: 0,
            scale: 0.94,
            duration: 1.5,
            stagger: { each: 0.1, from: "center" },
          })
          .from(
            ".hero-bg-arch-in",
            { autoAlpha: 0, scale: 0.94, duration: 2, ease: "power3.out" },
            0,
          )
          .from(
            ".hero-intro",
            { y: 24, autoAlpha: 0, duration: 1.1, stagger: 0.06 },
            0.3,
          );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  // Scroll sequence over the track. Exits are choreographed by slot, so the timeline is rebuilt
  // when the order changes — only ever at the top of the hero, where every scroll transform is
  // still at rest, so the rebuild is invisible.
  useGSAP(
    () => {
      const section = root.current;
      const runway = track.current;
      if (!section || !runway) return;
      const mm = gsap.matchMedia();
      mm.add(ANY_MOTION, () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: runway,
            start: pinStart,
            end: "bottom bottom",
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) =>
              section.classList.toggle(
                "is-playing",
                self.progress > SCROLL_LOCK_PROGRESS,
              ),
          },
        });
        buildHeroScroll(tl, section);

        // While the assembled word holds the centre, the collage keeps drifting at its own depths.
        if (tail.current) {
          buildHeroTail(
            gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: tail.current, start: "top bottom", end: "bottom bottom", scrub: 0.8 } }),
            section,
          );
        }
        return () => section.classList.remove("is-playing");
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [order], revertOnUpdate: true },
  );

  // The sky: each star depth parallaxes by its own factor across the whole section, the star flow
  // speeds up with scroll velocity, and every sky animation pauses while the hero is off-screen
  // (`is-sky-live`).
  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const mm = gsap.matchMedia();
      mm.add(ANY_MOTION, () => {
        ScrollTrigger.create({ trigger: section, start: "top bottom", end: "bottom top", toggleClass: "is-sky-live" });
        const unbindSpeed = bindSkySpeed(section);
        gsap.to(".hero-sky-depth", {
          y: (_index: number, depth: HTMLElement) => -window.innerHeight * SKY_PARALLAX * Number(depth.dataset.parallax ?? 0),
          ease: "none",
          scrollTrigger: { trigger: section, start: pinStart, end: "bottom top", scrub: 0.8, invalidateOnRefresh: true },
        });
        return unbindSpeed;
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="hero-title"
      data-header-dark=""
      className={cn(
        "hero-scroll band-night relative",
        "[--stage-h:max(24rem,calc(100svh-var(--header-h)-3.5rem))] lg:[--stage-h:max(28rem,calc(100svh-var(--header-h)))]",
        "[--fan-y:46%] [--spread:0.55] [--frame-w:min(52vw,27svh,22rem)]",
        "md:[--fan-y:42%] md:[--spread:0.85] md:[--frame-w:min(30vw,26svh,22rem)]",
        "lg:[--fan-y:45%] lg:[--spread:1] lg:[--frame-w:min(17vw,28svh,19rem)]",
      )}
    >
      {/* The night sky: section-wide and sticky like the word layer, behind the stage. */}
      <div className="pointer-events-none absolute inset-0">
        <div className="sticky top-[var(--header-h)] h-[var(--stage-h)] overflow-hidden">
          <HeroSky />
        </div>
      </div>

      {/* Spans the whole section; its sticky child holds the word centred until the section's own
          bottom edge arrives and carries it off. Above the stage, never in the way of clicks. */}
      <div className="pointer-events-none absolute inset-0 z-[70]">
        <div className="hero-word-layer sticky top-[var(--header-h)] h-[var(--stage-h)] overflow-hidden">
          <div
            aria-hidden
            className="hero-glow absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_55%,color-mix(in_srgb,var(--color-primary)_34%,transparent),transparent_70%)] opacity-0"
          />
          <HeroFinale
            frames={frames}
            kicker={hero.finale.kicker}
            primary={hero.finale.primary}
            secondary={hero.finale.secondary}
            facts={hero.finale.facts}
            cue={hero.finale.cue}
          />
          {/* Rest position: directly beneath the fan of prints. */}
          <div className="hero-word absolute inset-x-0 top-[calc(var(--fan-y)+var(--frame-w)*0.86+2.25rem)] flex justify-center">
            <HeroWordmark word={BRAND.name} className="text-night-ink" />
          </div>
          <p className="hero-tagline absolute inset-x-0 top-1/2 m-0 px-[var(--es-gutter)] text-center type-kicker text-[0.62rem] tracking-[0.2em] whitespace-nowrap text-night-ink/80 uppercase sm:text-[0.78rem] md:tracking-[0.32em]">
            {hero.tagline}
          </p>
        </div>
      </div>

      <div
        ref={track}
        className="hero-track relative motion-safe:h-[280svh] lg:motion-safe:h-[360svh]"
      >
        <div className="hero-stage sticky top-[var(--header-h)] isolate h-[var(--stage-h)] overflow-hidden">
          <HeroBackdrop />

          <div className="hero-meta">
            <div className="hero-intro shell flex items-start justify-between gap-6 pt-6 type-kicker tracking-[0.16em] text-night-ink/75 uppercase">
              <span>{hero.kicker}</span>
              <span className="hidden text-right sm:block">
                {BRAND.hoursLine}
              </span>
            </div>
          </div>

          {/* Studio registration marks around the fan (wide screens). */}
          <div
            aria-hidden
            className="hero-marks pointer-events-none absolute top-[var(--fan-y)] left-1/2 hidden h-[calc(var(--frame-w)*2)] w-[calc(var(--frame-w)*3.9)] -translate-x-1/2 -translate-y-1/2 lg:block"
          >
            {[
              "top-0 left-0",
              "top-0 right-0",
              "bottom-0 left-0",
              "bottom-0 right-0",
            ].map((corner) => (
              <span
                key={corner}
                className={`hero-mark absolute ${corner} size-3`}
              />
            ))}
          </div>

          {/* The five prints, fanned around the centre of the stage. */}
          <div className="absolute inset-x-0 top-[var(--fan-y)] h-0">
            {frames.map((frame, index) => (
              <HeroFrame
                key={frame.src}
                frame={frame}
                slot={slotOf(order, index)}
                restSlot={slotOf(initialOrder(frames.length), index)}
                priority={index === front}
                onSelect={() => select(index)}
              />
            ))}
          </div>

          <HeroEdit
            frames={frames}
            active={front}
            kicker={hero.edit.kicker}
            volume={hero.edit.volume}
            hint={hero.edit.hint}
            coordinates={hero.edit.coordinates}
            seal={hero.edit.seal}
            onSelect={select}
          />

          {/* Copy: headline bottom-left, lede and actions bottom-right on wide screens; on phones the
              headline sits up top and the actions along the bottom, around the prints. */}
          <div className="hero-copy">
            <div className="hero-intro absolute top-[5.25rem] left-[var(--es-gutter)] z-[60] max-w-[15rem] sm:top-14 md:top-auto md:bottom-8 md:max-w-[19rem] lg:bottom-10">
              <h1
                id="hero-title"
                className="m-0 font-heading text-[clamp(1.8rem,1rem+2vw,3.2rem)] leading-[1.02] tracking-[-0.03em] text-night-ink [&_em]:text-current"
              >
                {emphasis(hero.title)}
              </h1>
            </div>

            <div className="hero-intro absolute right-[var(--es-gutter)] bottom-5 left-[var(--es-gutter)] z-[60] flex items-end justify-between gap-6 md:left-auto md:bottom-8 md:max-w-[22rem] md:flex-col md:items-end lg:bottom-10 lg:max-w-[16rem]">
              <p className="m-0 hidden text-right text-[0.92rem] leading-relaxed font-light text-night-ink/75 lg:block">
                {hero.lede}
              </p>
              <div className="flex w-full items-end justify-between gap-6 md:w-auto md:items-center">
                <a
                  href={WA.home}
                  target="_blank"
                  rel="noopener"
                  className="link-draw inline-flex items-center gap-2.5 pb-1 type-kicker tracking-[0.14em] whitespace-nowrap text-night-ink uppercase"
                >
                  <Icon icon={faWhatsapp} className="text-base" />
                  {hero.secondaryCta.label}
                </a>
                <HeroCta
                  href={hero.primaryCta.href}
                  label={hero.primaryCta.label}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Runway after the stage leaves: the assembled word holds the centre while this scrolls by. */}
      <div
        ref={tail}
        aria-hidden
        className="hero-tail hidden motion-safe:block motion-safe:h-[90svh]"
      />
    </section>
  );
}
