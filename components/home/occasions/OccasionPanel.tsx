import Image from "next/image";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Icon } from "@/components/shared/Icon";
import { whatsappLink } from "@/constants/whatsapp";
import type { OccasionSide } from "@/types/home/content";
import type { SalonPackage } from "@/types/services";

interface OccasionPanelProps {
  side: OccasionSide;
  pkg: SalonPackage;
}

/** One half of the split: a full-height portrait, the word at poster scale, its tiers and a WhatsApp enquiry. */
export function OccasionPanel({ side, pkg }: OccasionPanelProps) {
  return (
    <article
      aria-label={pkg.name}
      className="tone-photo group/panel relative isolate flex h-[88svh] min-h-[34rem] flex-col justify-end overflow-hidden text-night-ink lg:h-full lg:min-h-0 lg:flex-1 lg:transition-[flex-grow] lg:duration-700 lg:ease-[cubic-bezier(0.77,0,0.175,1)] lg:hover:grow-[1.9] lg:focus-within:grow-[1.9]"
    >
      <Image
        src={side.image}
        alt={side.imageAlt}
        fill
        sizes="(max-width: 1024px) 100vw, 65vw"
        className="-z-10 object-cover object-[50%_22%] transition-transform duration-[1.6s] ease-out group-hover/panel:scale-105"
      />
      <div aria-hidden className="absolute inset-0 -z-10 scrim-night" />

      <div className="flex flex-col gap-6 p-[var(--es-gutter)] pb-10 lg:p-12">
        <p className="m-0 type-kicker tracking-[0.18em] text-night-ink/75 uppercase">{pkg.name}</p>
        <h3 className="m-0 font-heading text-[clamp(4.5rem,2rem+8vw,10rem)] leading-[0.85] tracking-[-0.04em] text-night-ink">
          {side.word}
        </h3>
        <p className="m-0 max-w-sm text-sm leading-relaxed text-night-ink/80">{pkg.summary}</p>
        <ul className="m-0 flex flex-wrap gap-2 p-0">
          {pkg.tiers?.map((tier) => (
            <li key={tier.name} className="list-none rounded-full border border-night-ink/35 px-4 py-1.5 text-xs tracking-wide">
              {tier.name}
            </li>
          ))}
        </ul>
        <a
          href={whatsappLink(side.message)}
          target="_blank"
          rel="noopener"
          className="inline-flex w-fit items-center gap-3 rounded-full bg-night-ink py-3 pr-6 pl-5 type-kicker tracking-[0.12em] text-night uppercase transition-colors hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-night-ink"
        >
          <Icon icon={faWhatsapp} className="text-base" />
          Enquire for the {side.word.toLowerCase()}
        </a>
      </div>
    </article>
  );
}
