import Image from "next/image";
import Link from "next/link";
import { HeroMotion } from "@/components/motion/FadeIn";
import { JsonLd } from "@/components/shared/JsonLd";
import { emphasis, plain } from "@/utils/emphasis";
import { breadcrumbData, type Crumb } from "@/utils/structuredData";

interface PageHeroProps {
  /** Headline; `*word*` renders in italic sage. */
  title: string;
  /** Small label above the title, e.g. "Chapter 03" or "The menu". */
  label: string;
  /** Breadcrumb name when the title is a phrase rather than the page name. */
  crumb?: string;
  lede?: string;
  path: string;
  parent?: Crumb;
  image?: { src: string; alt: string; position?: string };
  children?: React.ReactNode;
}

// Inner-page opener: breadcrumb, label, an oversized title with the lede set against its baseline,
// then an optional cinematic photo strip that wipes open on load. Adds BreadcrumbList data.
export function PageHero({ title, label, crumb, lede, path, parent, image, children }: PageHeroProps) {
  const name = crumb ?? plain(title);
  return (
    <section className="bg-background">
      <JsonLd data={breadcrumbData([...(parent ? [parent] : []), { name, path }])} />
      <div className="shell pt-10 pb-14 md:pt-14 md:pb-20">
        <HeroMotion>
          <nav aria-label="Breadcrumb" className="type-label text-ink/55">
            <ol className="m-0 flex flex-wrap items-center gap-2 p-0">
              <li className="list-none">
                <Link href="/" className="link-draw hover:text-ink">
                  Home
                </Link>
              </li>
              {parent ? (
                <li className="flex list-none items-center gap-2">
                  <span aria-hidden>/</span>
                  <Link href={parent.path} className="link-draw hover:text-ink">
                    {parent.name}
                  </Link>
                </li>
              ) : null}
              <li className="flex list-none items-center gap-2" aria-current="page">
                <span aria-hidden>/</span>
                <span className="text-ink">{name}</span>
              </li>
            </ol>
          </nav>
        </HeroMotion>

        <div className="mt-16 grid gap-10 border-b border-line pb-12 md:mt-24 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <HeroMotion delay={0.08}>
              <p className="m-0 type-label flex items-center gap-3 text-ink/70">
                <span aria-hidden className="h-px w-10 bg-primary" />
                {label}
              </p>
            </HeroMotion>
            <HeroMotion delay={0.16}>
              <h1 className="mt-6 mb-0 type-display text-ink">{emphasis(title)}</h1>
            </HeroMotion>
          </div>
          {lede ? (
            <HeroMotion delay={0.28} className="lg:col-span-4">
              <p className="m-0 max-w-md type-lede text-text">{lede}</p>
            </HeroMotion>
          ) : null}
        </div>
        {children}
      </div>

      {image ? (
        <div className="shell pb-6">
          <div className="mask-in relative aspect-[16/10] w-full bg-mist sm:aspect-[21/9]" style={{ animationDelay: "0.3s" }}>
            <div className="absolute inset-0">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 1320px) 92vw, 1320px"
                className="object-cover"
                style={{ objectPosition: image.position ?? "50% 50%" }}
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
