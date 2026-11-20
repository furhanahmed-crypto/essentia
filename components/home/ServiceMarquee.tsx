import Link from "next/link";
import { servicePath } from "@/constants/routes";
import { SERVICES } from "@/constants/services";

// Sage band under the cover: the six disciplines scroll endlessly, each a link to its chapter.
// The second set is a visual copy (hidden from assistive tech and the tab order). Pauses on hover.
export function ServiceMarquee() {
  const set = (copy: boolean) =>
    SERVICES.map((service) => (
      <li key={service.slug} className="flex shrink-0 list-none items-center">
        {copy ? (
          <span className="px-6 font-heading text-[1.3rem] leading-none sm:text-[1.6rem] md:px-8 md:text-[2.1rem]">{service.short}</span>
        ) : (
          <Link
            href={servicePath(service.slug)}
            className="px-6 font-heading text-[1.3rem] leading-none transition-opacity hover:opacity-70 focus-visible:underline sm:text-[1.6rem] md:px-8 md:text-[2.1rem]"
          >
            {service.short}
          </Link>
        )}
        <span aria-hidden className="text-sm opacity-80">✦</span>
      </li>
    ));

  return (
    <nav aria-label="Service disciplines" className="marquee overflow-hidden bg-primary py-5 text-white md:py-6 dark:text-night">
      <ul className="marquee-track m-0 flex w-max p-0">
        {set(false)}
        <li aria-hidden className="marquee-copy contents">
          <ul className="m-0 flex p-0">{set(true)}</ul>
        </li>
      </ul>
    </nav>
  );
}
