import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Cta } from "@/components/shared/editorial/Cta";
import { Icon } from "@/components/shared/Icon";
import { Label } from "@/components/shared/editorial/Label";
import { BRAND } from "@/constants/brand";
import content from "@/constants/contact/content.json";
import { WA } from "@/constants/whatsapp";

const DIRECTIONS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Essentia The Salon Lounge, ${BRAND.addressLine}`)}`;

// The practical details set as type: the phone number at headline size, then email, address and
// hours in ruled rows, with the two direct actions underneath.
export function ContactDetails() {
  const { details } = content;
  const rows = [
    { label: details.emailLabel, value: BRAND.email, href: BRAND.emailHref },
    { label: details.addressLabel, value: BRAND.addressLine, href: DIRECTIONS, external: true, action: details.directions },
    { label: details.hoursLabel, value: BRAND.hoursLine },
  ];

  return (
    <div>
      <Label index={1} as="h2">
        {details.label}
      </Label>
      <p className="mt-10 mb-0 type-label text-ink/60">{details.callLabel}</p>
      <a href={BRAND.phoneHref} className="mt-3 block type-title text-ink transition-colors hover:text-accent-deep">
        {BRAND.phone}
      </a>
      <dl className="mt-12 mb-0 border-t border-line">
        {rows.map((row) => (
          <div key={row.label} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[9rem_minmax(0,1fr)]">
            <dt className="type-label text-ink/60">{row.label}</dt>
            <dd className="m-0 text-ink">
              {row.href && !row.action ? (
                <a href={row.href} className="link-draw break-words" {...(row.external ? { target: "_blank", rel: "noopener" } : {})}>
                  {row.value}
                </a>
              ) : (
                row.value
              )}
              {row.action ? (
                <a href={row.href} target="_blank" rel="noopener" className="mt-1 block type-label text-accent-deep">
                  {row.action} ↗
                </a>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
      <div className="mt-10 flex flex-wrap gap-4">
        <Cta href={WA.contact} variant="sage" external icon={<Icon icon={faWhatsapp} className="text-base" />}>
          WhatsApp
        </Cta>
        <Cta href={BRAND.socials.instagram} variant="outline" external>
          {details.instagram}
        </Cta>
      </div>
    </div>
  );
}
