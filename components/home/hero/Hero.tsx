"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { HeroCta } from "@/components/home/hero/HeroCta";
import { HeroWordmark } from "@/components/home/hero/HeroWordmark";
import { Icon } from "@/components/shared/Icon";
import { BRAND } from "@/constants/brand";
import home from "@/constants/home/content.json";
import { ANY_MOTION } from "@/constants/motion";
import { WA } from "@/constants/whatsapp";
import { emphasis } from "@/utils/emphasis";

gsap.registerPlugin(useGSAP);

/** Cinematic opener: a full-bleed salon photograph, the brand name at poster scale, and one round CTA. */
export function Hero() {
  const { hero } = home;
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(ANY_MOTION, () => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.from(".hero-photo", { clipPath: "inset(14% 10% 14% 10%)", scale: 1.18, duration: 1.6, ease: "expo.inOut" })
          .from(".hero-letter", { yPercent: 110, duration: 1.1, stagger: 0.05 }, "-=0.7")
          .from(".hero-copy > *", { y: 30, opacity: 0, duration: 0.9, stagger: 0.08 }, "-=0.8")
          .from(".hero-inset", { y: 60, opacity: 0, rotate: 4, duration: 1 }, "<0.1")
          .from(".hero-meta", { opacity: 0, duration: 0.8 }, "<0.2")
          .from(".hero-cta", { scale: 0, rotate: -90, duration: 0.9, ease: "back.out(1.6)" }, "<");
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="hero-title"
      className="band-night relative isolate flex min-h-[max(34rem,calc(100svh-var(--header-h)-3.5rem))] flex-col overflow-hidden lg:min-h-[max(36rem,calc(100svh-var(--header-h)))]"
    >
      {/* Before / after as the backdrop: two portrait frames side by side on wide screens (each
          half is close to the photo's own shape, so no heavy zoom), stacked on phones. */}
      <div className="hero-photo absolute inset-0 -z-10 grid grid-rows-2 md:grid-cols-2 md:grid-rows-1">
        {[
          { src: hero.before, alt: hero.beforeAlt, tag: "Before" },
          { src: hero.after, alt: hero.afterAlt, tag: "After" },
        ].map((frame) => (
          <figure key={frame.tag} className="relative m-0 overflow-hidden">
            <Image
              src={frame.src}
              alt={frame.alt}
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-[50%_35%]"
            />
            <figcaption className="absolute top-14 left-1/2 -translate-x-1/2 border border-night-ink/40 bg-night/45 px-4 py-1.5 type-kicker tracking-[0.22em] text-night-ink uppercase backdrop-blur-sm md:top-16">
              {frame.tag}
            </figcaption>
          </figure>
        ))}
        <span aria-hidden className="absolute inset-x-0 top-1/2 h-px bg-night-ink/50 md:inset-x-auto md:inset-y-0 md:top-0 md:left-1/2 md:h-auto md:w-px" />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 scrim-night" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-night/60 via-night/15 to-transparent" />

      <div className="hero-meta shell flex items-start justify-between gap-6 pt-6 type-kicker tracking-[0.16em] text-night-ink/80 uppercase">
        <span>{hero.kicker}</span>
        <span className="hidden text-right sm:block">{BRAND.hoursLine}</span>
      </div>

      {/* Passe-partout: cream mat, hairline keyline a few px outside it, caption ruled underneath. */}
      <figure className="hero-inset absolute top-[9%] right-[var(--es-gutter)] m-0 hidden w-[clamp(8rem,min(11vw,21svh),12rem)] md:block">
        <div className="bg-cream p-2 shadow-[0_34px_70px_-30px_rgba(0,0,0,0.85)] outline outline-1 outline-offset-[7px] outline-night-ink/35 dark:bg-night-ink">
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image src={hero.inset} alt={hero.insetAlt} fill sizes="216px" className="object-cover object-[50%_62%]" />
          </div>
        </div>
        <figcaption className="mt-5 flex items-center justify-end gap-3 type-kicker tracking-[0.12em] whitespace-nowrap text-night-ink/80 uppercase">
          <span aria-hidden className="h-px w-6 bg-night-ink/50" />
          {hero.caption}
        </figcaption>
      </figure>

      <div className="shell flex flex-1 flex-col justify-end pb-4 md:pb-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="hero-copy flex max-w-2xl flex-col gap-5">
            <h1 id="hero-title" className="m-0 type-stage text-night-ink [&_em]:text-current">
              {emphasis(hero.title)}
            </h1>
            <p className="m-0 max-w-md text-[0.98rem] leading-relaxed font-light text-night-ink/80">{hero.lede}</p>
            <a
              href={WA.home}
              target="_blank"
              rel="noopener"
              className="link-draw inline-flex w-fit items-center gap-2.5 pb-1 type-kicker tracking-[0.14em] text-night-ink uppercase"
            >
              <Icon icon={faWhatsapp} className="text-base" />
              {hero.secondaryCta.label}
            </a>
          </div>
          <HeroCta href={hero.primaryCta.href} label={hero.primaryCta.label} />
        </div>
      </div>

      <HeroWordmark
        word={BRAND.name}
        className="w-full justify-between px-[var(--es-gutter)] text-night-ink"
      />
    </section>
  );
}
