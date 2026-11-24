"use client";

import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Icon } from "@/components/shared/Icon";
import { BRAND } from "@/constants/brand";
import home from "@/constants/home/content.json";
import { WA } from "@/constants/whatsapp";
import { useMagnetic } from "@/hooks/useMagnetic";

const DIRECTIONS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Essentia The Salon Lounge, ${BRAND.addressLine}`)}`;

/**
 * Home closing band: sage melting into the night footer, "Leave glowing." at full width, and a
 * large round WhatsApp button that leans toward the cursor on desktop.
 */
export function Finale() {
  const { finale, visit } = home;
  const { area, target } = useMagnetic<HTMLElement, HTMLAnchorElement>(0.3);
  const details = [
    { term: "Find us", value: BRAND.addressLine, href: DIRECTIONS },
    { term: "Hours", value: BRAND.hoursLine },
    { term: "Call", value: BRAND.phone, href: BRAND.phoneHref },
  ];

  return (
    <section
      ref={area}
      aria-labelledby="finale-title"
      className="relative overflow-hidden bg-gradient-to-b from-primary via-accent-deep to-night pt-20 pb-16 md:pt-28"
    >
      <div className="shell">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <p className="m-0 font-heading text-2xl text-ink italic md:text-3xl">{finale.kicker}</p>
          <p className="m-0 font-script text-2xl text-ink/80">{visit.signature}</p>
        </div>

        <h2 id="finale-title" className="mt-10 mb-0 type-mega text-night-ink md:mt-14">
          {finale.words.map((word) => (
            <span key={word} className="block last:pl-[12vw]">
              {word}
            </span>
          ))}
        </h2>

        <div className="mt-12 flex flex-col gap-12 md:mt-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-md">
            <p className="m-0 text-sm leading-relaxed text-night-ink/80">{finale.lede}</p>
            <dl className="mt-8 mb-0 grid gap-5 sm:grid-cols-3 sm:gap-8">
              {details.map((detail) => (
                <div key={detail.term}>
                  <dt className="type-kicker tracking-[0.14em] text-night-ink/55 uppercase">{detail.term}</dt>
                  <dd className="mt-1.5 mb-0 text-sm text-night-ink">
                    {detail.href ? (
                      <a href={detail.href} className="link-draw" target={detail.href.startsWith("http") ? "_blank" : undefined} rel="noopener">
                        {detail.value}
                      </a>
                    ) : (
                      detail.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <a
            ref={target}
            href={WA.contact}
            target="_blank"
            rel="noopener"
            className="grid size-40 shrink-0 place-items-center self-end rounded-full bg-night-ink text-night transition-colors duration-500 hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-night-ink md:size-48"
          >
            <span className="flex flex-col items-center gap-2 type-kicker tracking-[0.16em] uppercase">
              <Icon icon={faWhatsapp} className="text-3xl" />
              WhatsApp us
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
