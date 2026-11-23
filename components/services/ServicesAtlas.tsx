import Image from "next/image";
import Link from "next/link";
import { cn } from "cn";
import { Appear } from "@/components/motion/Appear";
import { MaskReveal } from "@/components/motion/MaskReveal";
import { servicePath } from "@/constants/routes";
import { SERVICES, signatureTreatments, treatmentCount } from "@/constants/services";
import { indexOf } from "@/utils/emphasis";

// Placement of each chapter on the 12-column grid: spans, offsets and frame shapes alternate so
// the page reads like a magazine spread rather than a card grid.
const LAYOUT = [
  { cell: "lg:col-span-7", frame: "aspect-[4/3]" },
  { cell: "lg:col-span-4 lg:col-start-9 lg:mt-48", frame: "aspect-[3/4] arch" },
  { cell: "lg:col-span-5 lg:col-start-1", frame: "aspect-[3/4]" },
  { cell: "lg:col-span-6 lg:col-start-7 lg:mt-28", frame: "aspect-[4/3]" },
  { cell: "lg:col-span-5 lg:col-start-2", frame: "aspect-[4/5] arch" },
  { cell: "lg:col-span-5 lg:col-start-8 lg:mt-40", frame: "aspect-[4/3]" },
] as const;

// Services index: the five families as editorial "chapters" on an asymmetric grid.
export function ServicesAtlas() {
  return (
    <section aria-label="Service families" className="bg-background pt-10 pb-24 md:pb-32">
      <ol className="shell m-0 grid gap-x-8 gap-y-20 p-0 md:grid-cols-2 lg:grid-cols-12 lg:gap-y-28">
        {SERVICES.map((service, index) => {
          const layout = LAYOUT[index % LAYOUT.length];
          return (
            <li key={service.slug} className={cn("list-none", layout.cell)}>
              <Link href={servicePath(service.slug)} className="group block">
                <MaskReveal className={cn("w-full bg-mist", layout.frame)}>
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(max-width: 768px) 92vw, (max-width: 1024px) 46vw, 700px"
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                  />
                </MaskReveal>
                <Appear y={20} className="mt-7 grid grid-cols-[3rem_minmax(0,1fr)] gap-y-3">
                  <span className="pt-3 type-label text-em">{indexOf(index + 1)}</span>
                  <h2 className="m-0 type-title text-ink transition-colors group-hover:text-accent-deep">{service.name}</h2>
                  <span className="col-start-2 type-label text-ink/55">{treatmentCount(service)} treatments</span>
                  <p className="col-start-2 m-0 max-w-md text-text">{service.summary}</p>
                  <p className="col-start-2 m-0 max-w-md font-heading text-sm text-ink/70 italic">
                    {signatureTreatments(service).join(" · ")}
                  </p>
                  <span className="col-start-2 mt-2 inline-flex items-center gap-3 type-label text-ink">
                    <span className="link-draw">Open the chapter</span>
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </Appear>
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
