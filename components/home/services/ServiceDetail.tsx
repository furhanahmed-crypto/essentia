import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { servicePath } from "@/constants/routes";
import { signatureTreatments, treatmentCount } from "@/constants/services";
import type { ServiceCategory } from "@/types/services";

/** Name, summary, three signature treatments and the way through to the service page. Re-keyed per service so it animates in. */
export function ServiceDetail({ service }: { service: ServiceCategory }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="overflow-hidden">
        <h3 className="m-0 type-stage text-night-ink animate-in slide-in-from-bottom-full duration-700 ease-out">
          {service.name}
        </h3>
      </div>
      <p className="m-0 max-w-md text-sm leading-relaxed text-night-ink/80 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 ease-out">
        {service.summary}
      </p>
      <ul className="m-0 flex flex-wrap gap-2 p-0 animate-in fade-in-0 duration-1000">
        {signatureTreatments(service, 3).map((treatment) => (
          <li key={treatment} className="list-none rounded-full border border-night-ink/25 px-3.5 py-1.5 text-xs text-night-ink/85">
            {treatment}
          </li>
        ))}
        <li className="list-none px-1 py-1.5 text-xs text-night-ink/60">+ {treatmentCount(service) - 3} more</li>
      </ul>
      <Link
        href={servicePath(service.slug)}
        className="group mt-1 inline-flex w-fit items-center gap-3 rounded-full bg-night-ink py-3 pr-4 pl-6 type-kicker tracking-[0.12em] text-night uppercase transition-colors hover:bg-primary hover:text-white"
      >
        View {service.name}
        <span className="grid size-7 place-items-center rounded-full bg-night text-night-ink transition-transform group-hover:translate-x-1">
          <ArrowRight aria-hidden className="size-3.5" strokeWidth={1.5} />
        </span>
      </Link>
    </div>
  );
}
