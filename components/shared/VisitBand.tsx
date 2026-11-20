import Image from "next/image";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Appear } from "@/components/motion/Appear";
import { MaskReveal } from "@/components/motion/MaskReveal";
import { Cta } from "@/components/shared/editorial/Cta";
import { Icon } from "@/components/shared/Icon";
import { BRAND } from "@/constants/brand";
import home from "@/constants/home/content.json";
import { ROUTES } from "@/constants/routes";
import { whatsappLink, whatsappMessageFor } from "@/constants/whatsapp";
import { emphasis } from "@/utils/emphasis";

const DIRECTIONS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Essentia The Salon Lounge, ${BRAND.addressLine}`)}`;

// Closing band on every page: the one handwritten signature, a large invitation, the practical
// details in three ruled columns, and the two ways to reach the lounge.
export function VisitBand({ pathname }: { pathname: string }) {
  const { visit } = home;
  const details = [
    { term: "Address", value: BRAND.addressLine, href: DIRECTIONS, external: true },
    { term: "Hours", value: BRAND.hoursLine },
    { term: "Call", value: BRAND.phone, href: BRAND.phoneHref },
  ];

  return (
    <section aria-labelledby="visit-title" className="relative overflow-hidden bg-mist">
      <div className="shell grid gap-12 py-24 md:py-28 lg:grid-cols-12 lg:items-end lg:gap-10">
        <div className="lg:col-span-8">
          <p className="m-0 font-script text-3xl text-accent-deep sm:text-4xl">{visit.signature}</p>
          <Appear y={24}>
            <h2 id="visit-title" className="mt-6 mb-0 type-display text-ink">
              {emphasis(visit.title)}
            </h2>
          </Appear>
          <dl className="mt-14 mb-0 grid border-t border-ink/25 sm:grid-cols-3">
            {details.map((detail) => (
              <div key={detail.term} className="border-ink/25 py-6 max-sm:border-b sm:px-6 sm:first:pl-0 sm:[&:not(:last-child)]:border-r">
                <dt className="type-label text-ink/60">{detail.term}</dt>
                <dd className="mt-2 mb-0 text-ink">
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
          <div className="mt-10 flex flex-wrap gap-4">
            <Cta href={ROUTES.contact}>Plan a visit</Cta>
            <Cta
              href={whatsappLink(whatsappMessageFor(pathname))}
              variant="outline"
              external
              icon={<Icon icon={faWhatsapp} className="text-base" />}
            >
              WhatsApp
            </Cta>
          </div>
        </div>
        <div className="hidden lg:col-span-4 lg:block">
          <MaskReveal className="arch aspect-[3/4] w-full">
            <Image src={visit.image} alt={visit.imageAlt} fill sizes="400px" className="object-cover" />
          </MaskReveal>
        </div>
      </div>
    </section>
  );
}
