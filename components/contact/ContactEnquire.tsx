import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Cta } from "@/components/shared/editorial/Cta";
import { Icon } from "@/components/shared/Icon";
import content from "@/constants/contact/content.json";
import { WA } from "@/constants/whatsapp";

// Contact page invite: WhatsApp only — no form fields, nothing stored on the site.
export function ContactEnquire() {
  const { enquire } = content;
  return (
    <aside className="bg-card p-6 sm:p-10" aria-labelledby="contact-enquire-title">
      <p className="m-0 type-label text-em">{enquire.label}</p>
      <h2 id="contact-enquire-title" className="mt-3 mb-0 type-heading text-ink">
        {enquire.title}
      </h2>
      <p className="mt-6 mb-0 max-w-md text-text">{enquire.lede}</p>
      <div className="mt-10">
        <Cta href={WA.contact} variant="sage" external icon={<Icon icon={faWhatsapp} className="text-base" />}>
          {enquire.cta}
        </Cta>
      </div>
      <p className="mt-6 mb-0 max-w-sm text-xs text-text">{enquire.note}</p>
    </aside>
  );
}
