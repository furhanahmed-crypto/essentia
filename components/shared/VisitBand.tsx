import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Reveal } from "@/components/motion/Reveal";
import { Cta } from "@/components/shared/editorial/Cta";
import { Icon } from "@/components/shared/Icon";
import { BRAND } from "@/constants/brand";
import home from "@/constants/home/content.json";
import { whatsappLink, whatsappMessageFor } from "@/constants/whatsapp";
import { emphasis } from "@/utils/emphasis";

const DIRECTIONS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Essentia The Salon Lounge, ${BRAND.addressLine}`)}`;

// Closing band on solid night — readable type, no stretched photo background.
export function VisitBand({ pathname }: { pathname: string }) {
  const { visit } = home;
  const details = [
    { term: "Address", value: BRAND.addressLine, href: DIRECTIONS, external: true },
    { term: "Hours", value: BRAND.hoursLine },
    { term: "Call", value: BRAND.phone, href: BRAND.phoneHref },
  ];

  return (
    <section aria-labelledby="visit-title" className="band-night">
      <div className="shell py-20 md:py-24">
        <p className="m-0 font-script text-2xl text-em sm:text-3xl">{visit.signature}</p>
        <Reveal y={24}>
          <h2 id="visit-title" className="mt-5 mb-0 max-w-2xl type-title text-night-ink">
            {emphasis(visit.title)}
          </h2>
        </Reveal>

        <dl className="mt-12 mb-0 grid max-w-3xl border-t border-line sm:grid-cols-3">
          {details.map((detail) => (
            <div key={detail.term} className="border-line py-5 max-sm:border-b sm:px-5 sm:first:pl-0 sm:[&:not(:last-child)]:border-r">
              <dt className="type-label text-night-muted">{detail.term}</dt>
              <dd className="mt-2 mb-0 text-sm text-night-ink md:text-base">
                {detail.href ? (
                  <a
                    href={detail.href}
                    className="link-draw"
                    {...(detail.external ? { target: "_blank", rel: "noopener" } : {})}
                  >
                    {detail.value}
                  </a>
                ) : (
                  detail.value
                )}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-9 flex flex-wrap gap-4">
          <Cta
            href={whatsappLink(whatsappMessageFor(pathname))}
            external
            className="bg-cream text-ink hover:bg-mist dark:bg-night-ink dark:text-night"
            icon={<Icon icon={faWhatsapp} className="text-base" />}
          >
            Plan a visit
          </Cta>
          <Cta href={BRAND.phoneHref} variant="line" className="text-night-ink">
            Call us
          </Cta>
        </div>
      </div>
    </section>
  );
}
