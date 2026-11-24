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
      <div className="hero-photo absolute inset-0 -z-10">
        <Image
          src={hero.image}
          alt={hero.imageAlt}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-[55%_40%]"
        />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 scrim-night" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-night/75 via-night/25 to-transparent" />

      <div className="hero-meta shell flex items-start justify-between gap-6 pt-6 type-kicker tracking-[0.16em] text-night-ink/80 uppercase">
        <span>{hero.kicker}</span>
        <span className="hidden text-right sm:block">{BRAND.hoursLine}</span>
      </div>

      <figure className="hero-inset absolute top-[16%] right-[var(--es-gutter)] m-0 hidden w-[clamp(8rem,12vw,12.5rem)] md:block">
        <div className="relative aspect-[3/4] overflow-hidden shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)]">
          <Image src={hero.inset} alt={hero.insetAlt} fill sizes="200px" className="object-cover object-[50%_30%]" />
        </div>
        <figcaption className="mt-3 type-kicker text-night-ink/70">{hero.caption}</figcaption>
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
        className="-mb-[0.12em] w-full justify-between px-[var(--es-gutter)] text-night-ink"
      />
    </section>
  );
}
