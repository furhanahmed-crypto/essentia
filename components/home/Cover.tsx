import Image from "next/image";
import Link from "next/link";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { HeroMotion } from "@/components/motion/FadeIn";
import { Cta } from "@/components/shared/editorial/Cta";
import { Icon } from "@/components/shared/Icon";
import home from "@/constants/home/content.json";
import { servicePath } from "@/constants/routes";
import { SERVICES } from "@/constants/services";
import { WA } from "@/constants/whatsapp";
import { emphasis, indexOf } from "@/utils/emphasis";

// Home cover: split editorial composition. Headline column on ivory; a tall arched photograph
// (the lounge's mirror motif) with an inset image overlapping into the text column; the six
// disciplines run along the bottom edge as an index.
export function Cover() {
  const { cover } = home;
  return (
    <section aria-labelledby="cover-title" className="relative overflow-hidden bg-background">
      <div className="shell grid gap-12 pt-10 pb-14 md:pt-14 lg:grid-cols-12 lg:gap-8 lg:pt-16 lg:pb-20">
        <div className="relative z-10 flex flex-col justify-between gap-10 lg:col-span-6 lg:py-8">
          <HeroMotion>
            <p className="m-0 type-label flex items-center gap-3 text-ink/70">
              <span aria-hidden className="h-px w-10 bg-primary" />
              {cover.label}
            </p>
          </HeroMotion>
          <div>
            <HeroMotion delay={0.12}>
              <h1 id="cover-title" className="m-0 type-display text-ink">
                {emphasis(cover.title)}
              </h1>
            </HeroMotion>
            <HeroMotion delay={0.28}>
              <p className="mt-8 mb-0 max-w-md type-lede text-text">{cover.lede}</p>
            </HeroMotion>
            <HeroMotion delay={0.4} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              <Cta href={cover.primaryCta.href}>{cover.primaryCta.label}</Cta>
              <Cta href={WA.home} variant="line" external icon={<Icon icon={faWhatsapp} className="text-base" />}>
                {cover.secondaryCta.label}
              </Cta>
            </HeroMotion>
          </div>
        </div>

        <div className="relative lg:col-span-6 lg:pl-8">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[560px] sm:aspect-[3/4]">
            <div className="mask-in arch absolute inset-0 bg-mist" style={{ animationDelay: "0.15s" }}>
              <div className="absolute inset-0">
                <Image
                  src={cover.image}
                  alt={cover.imageAlt}
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 1024px) 92vw, 560px"
                  className="object-cover object-[50%_72%]"
                />
              </div>
            </div>
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-3 arch border border-primary/45 sm:-inset-4"
            />
            <div
              className="mask-in absolute -bottom-8 -left-4 aspect-[3/4] w-[34%] border-[6px] border-background sm:-left-10 lg:-left-24"
              style={{ animationDelay: "0.7s" }}
            >
              <div className="absolute inset-0">
                <Image src={cover.inset} alt={cover.insetAlt} fill sizes="200px" className="object-cover" />
              </div>
            </div>
          </div>
          <p className="mt-14 mb-0 text-right type-label text-ink/55 lg:absolute lg:top-0 lg:-right-3 lg:mt-0 lg:rotate-180 lg:[writing-mode:vertical-rl]">
            {cover.caption}
          </p>
        </div>
      </div>

      <nav aria-label="Service disciplines" className="border-t border-line">
        <ul className="shell m-0 grid grid-cols-2 p-0 sm:grid-cols-3 lg:grid-cols-6">
          {SERVICES.map((service, index) => (
            <li
              key={service.slug}
              className="list-none border-line max-lg:border-b max-sm:odd:border-r sm:max-lg:[&:not(:nth-child(3n))]:border-r lg:border-r lg:last:border-r-0"
            >
              <Link
                href={servicePath(service.slug)}
                className="group flex h-full items-baseline gap-3 px-1 py-5 text-sm text-ink transition-colors hover:text-accent-deep sm:px-4 lg:first:pl-0"
              >
                <span className="type-label text-em">{indexOf(index + 1)}</span>
                <span className="link-draw">{service.short}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
