"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Cta } from "@/components/shared/editorial/Cta";
import { Icon } from "@/components/shared/Icon";
import { BRAND } from "@/constants/brand";
import home from "@/constants/home/content.json";
import { servicePath } from "@/constants/routes";
import { SERVICES } from "@/constants/services";
import { WA } from "@/constants/whatsapp";
import { emphasis } from "@/utils/emphasis";

gsap.registerPlugin(useGSAP);

// Turbo Shop–style cover: light ground, copy left, framed photography right — no full-bleed bg.
export function Cover() {
  const { cover } = home;
  const root = useRef<HTMLElement>(null);
  const highlights = SERVICES.slice(0, 3);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".cover-copy > *", { y: 28, opacity: 0, duration: 0.85, stagger: 0.1 }, 0)
        .from(".cover-visual", { x: 36, opacity: 0, duration: 1 }, 0.2)
        .from(".cover-inset", { y: 24, opacity: 0, duration: 0.8 }, 0.55)
        .from(".cover-links a", { y: 12, opacity: 0, duration: 0.55, stagger: 0.08 }, 0.65);
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="cover-title"
      className="relative overflow-hidden border-b border-line bg-background"
    >
      <div className="shell grid items-center gap-12 py-14 md:py-16 lg:min-h-[calc(100svh-var(--header-h))] lg:grid-cols-12 lg:gap-10 lg:py-10">
        <div className="cover-copy flex flex-col gap-6 lg:col-span-6 lg:gap-7">
          <p className="m-0 type-label flex items-center gap-3 text-ink/65">
            <span aria-hidden className="h-px w-10 bg-primary" />
            {cover.label}
          </p>
          <p className="m-0 font-heading text-3xl tracking-tight text-ink sm:text-4xl">{BRAND.name}</p>
          <h1 id="cover-title" className="m-0 max-w-xl type-cover text-ink">
            {emphasis(cover.title)}
          </h1>
          <p className="m-0 max-w-md type-lede text-text">{cover.lede}</p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <Cta href={cover.primaryCta.href}>{cover.primaryCta.label}</Cta>
            <Cta href={WA.home} variant="line" external icon={<Icon icon={faWhatsapp} className="text-base" />}>
              {cover.secondaryCta.label}
            </Cta>
          </div>
        </div>

        <div className="cover-visual relative lg:col-span-6">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[520px] overflow-hidden bg-mist lg:ml-auto lg:max-w-none">
            <Image
              src={cover.image}
              alt={cover.imageAlt}
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 1024px) 90vw, 520px"
              className="object-cover object-[50%_30%]"
            />
          </div>
          <div className="cover-inset absolute -bottom-5 left-0 aspect-[3/4] w-[38%] max-w-[180px] overflow-hidden border-[6px] border-background bg-mist shadow-[0_18px_40px_-24px_rgba(52,51,48,0.45)] sm:left-4 lg:-left-6">
            <Image src={cover.inset} alt={cover.insetAlt} fill sizes="180px" className="object-cover" />
          </div>
          <p className="mt-8 mb-0 text-right type-label text-ink/50 lg:absolute lg:top-0 lg:-right-1 lg:mt-0 lg:rotate-180 lg:[writing-mode:vertical-rl]">
            {cover.caption}
          </p>
        </div>
      </div>

      <div className="cover-links shell border-t border-line">
        <ul className="m-0 grid gap-0 p-0 sm:grid-cols-3">
          {highlights.map((service) => (
            <li key={service.slug} className="list-none border-line max-sm:border-b sm:border-r sm:last:border-r-0">
              <Link
                href={servicePath(service.slug)}
                className="group flex items-center justify-between gap-4 px-1 py-5 type-label text-ink transition-colors hover:text-accent-deep sm:px-6 sm:first:pl-0"
              >
                <span>{service.name}</span>
                <span aria-hidden className="text-em transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
