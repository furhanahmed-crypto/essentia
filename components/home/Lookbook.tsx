import Image from "next/image";
import Link from "next/link";
import { cn } from "cn";
import { Reveal } from "@/components/motion/Reveal";
import { LookbookRail } from "@/components/home/LookbookRail";
import { Band } from "@/components/shared/editorial/Band";
import { Label } from "@/components/shared/editorial/Label";
import home from "@/constants/home/content.json";
import { servicePath } from "@/constants/routes";
import { findService } from "@/constants/services";
import { emphasis, indexOf } from "@/utils/emphasis";

type LookbookItem = {
  image: string;
  video?: string;
  alt: string;
  caption: string;
  service: string;
  ratio: string;
};

// Contained portrait/reel frames only — no oversized featured stills (IG assets are too small).
export function Lookbook() {
  const { lookbook } = home;
  const items = lookbook.items as LookbookItem[];

  return (
    <Band tone="mist" contained={false} ariaLabelledby="lookbook-title">
      <div className="shell mb-10 grid gap-6 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <Label index={3}>{lookbook.label}</Label>
          <Reveal y={24}>
            <h2 id="lookbook-title" className="mt-6 mb-0 type-title text-ink">
              {emphasis(lookbook.title)}
            </h2>
          </Reveal>
        </div>
        <p className="m-0 max-w-xs text-text md:col-span-4 md:col-start-9 md:justify-self-end">{lookbook.lede}</p>
      </div>

      <LookbookRail label="Lookbook from Essentia Instagram">
        {items.map((item, index) => {
          const service = findService(item.service);
          const key = item.video ?? item.image;
          return (
            <figure key={key} className="m-0 shrink-0">
              <Link
                href={servicePath(item.service)}
                className={cn(
                  "group relative block h-[clamp(260px,42vh,400px)] overflow-hidden bg-background",
                  "aspect-[3/4]",
                )}
              >
                {item.video ? (
                  <video
                    src={item.video}
                    poster={item.image}
                    muted
                    loop
                    playsInline
                    autoPlay
                    preload="metadata"
                    aria-label={item.alt}
                    className="absolute inset-0 size-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                ) : (
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 70vw, 320px"
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                )}
              </Link>
              <figcaption className="mt-4 flex items-baseline justify-between gap-6">
                <span className="font-heading text-lg text-ink italic">{item.caption}</span>
                <span className="type-label text-ink/55">
                  {indexOf(index + 1)} · {service?.short}
                </span>
              </figcaption>
            </figure>
          );
        })}
      </LookbookRail>
    </Band>
  );
}
