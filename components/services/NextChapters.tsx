import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Appear } from "@/components/motion/Appear";
import { Band } from "@/components/shared/editorial/Band";
import { Label } from "@/components/shared/editorial/Label";
import { servicePath } from "@/constants/routes";
import { SERVICES } from "@/constants/services";
import type { ServiceCategory } from "@/types/services";
import { emphasis, indexOf } from "@/utils/emphasis";

interface NextChaptersProps {
  items: ServiceCategory[];
  label: string;
  title: string;
}

// Related services as the "next chapters" of the menu: three ruled columns, each with a small
// arched photograph, the chapter number and name, and an arrow.
export function NextChapters({ items, label, title }: NextChaptersProps) {
  if (items.length === 0) return null;
  return (
    <Band tone="ivory" ariaLabelledby="next-title">
      <Label index={3}>{label}</Label>
      <h2 id="next-title" className="mt-6 mb-0 type-title text-ink">
        {emphasis(title)}
      </h2>
      <ul className="mt-14 mb-0 grid border-t border-line p-0 md:grid-cols-3">
        {items.map((service, index) => {
          const chapter = SERVICES.findIndex((entry) => entry.slug === service.slug) + 1;
          return (
            <Appear
              as="li"
              key={service.slug}
              delay={index * 0.08}
              className="list-none border-line max-md:border-b md:first:*:pl-0 md:[&:not(:last-child)]:border-r"
            >
              <Link href={servicePath(service.slug)} className="group flex items-end justify-between gap-6 py-8 md:px-8">
                <span>
                  <span className="type-label text-em">Chapter {indexOf(chapter)}</span>
                  <span className="mt-3 block type-heading text-ink transition-colors group-hover:text-accent-deep">{service.name}</span>
                  <ArrowRight
                    aria-hidden
                    strokeWidth={1.25}
                    className="mt-6 size-5 text-ink/60 transition-transform duration-300 group-hover:translate-x-1.5"
                  />
                </span>
                <span className="arch relative block aspect-[3/4] w-24 shrink-0 bg-mist">
                  <Image src={service.image} alt="" fill sizes="96px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </span>
              </Link>
            </Appear>
          );
        })}
      </ul>
    </Band>
  );
}
