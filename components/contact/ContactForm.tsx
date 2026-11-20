"use client";

import { useId, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "cn";
import content from "@/constants/contact/content.json";
import { SERVICES } from "@/constants/services";
import { whatsappLink } from "@/constants/whatsapp";

const MIN_PHONE_DIGITS = 10;
const MAX_FIELD_LENGTH = 120;
const MAX_MESSAGE_LENGTH = 800;
const SERVICE_OPTIONS = [...SERVICES.map((service) => service.name), "Packages", "General enquiry"];

type Fields = { name: string; phone: string; email: string; service: string; message: string };
type Errors = Partial<Record<"name" | "phone", string>>;

const EMPTY: Fields = { name: "", phone: "", email: "", service: SERVICE_OPTIONS[0], message: "" };

function validate(fields: Fields): Errors {
  const errors: Errors = {};
  if (!fields.name.trim()) errors.name = content.form.nameError;
  if (fields.phone.replace(/\D/g, "").length < MIN_PHONE_DIGITS) errors.phone = content.form.phoneError;
  return errors;
}

function buildMessage(fields: Fields): string {
  return [
    "Hi Essentia, I'd like to enquire.",
    `Name: ${fields.name.trim()}`,
    `Phone: ${fields.phone.trim()}`,
    fields.email.trim() ? `Email: ${fields.email.trim()}` : "",
    `Service: ${fields.service}`,
    fields.message.trim() ? `Message: ${fields.message.trim()}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

const fieldClass =
  "w-full border-0 border-b border-ink/30 bg-transparent px-0 py-3 text-base text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-ink aria-invalid:border-alert-text";
const labelClass = "type-label text-ink/60";

// Enquiry form, minimal underline fields. It stores nothing: on submit it validates name and phone,
// then opens WhatsApp with the note pre-written.
export function ContactForm() {
  const id = useId();
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const { form } = content;

  const update = (key: keyof Fields) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    setFields((current) => ({ ...current, [key]: value }));
    if (key === "name" || key === "phone") setErrors((current) => ({ ...current, [key]: undefined }));
  };

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const found = validate(fields);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    window.open(whatsappLink(buildMessage(fields)), "_blank", "noopener");
  }

  const fid = (key: string) => `${id}-${key}`;

  return (
    <form onSubmit={onSubmit} noValidate aria-labelledby={fid("title")} className="bg-card p-6 sm:p-10">
      <p className="m-0 type-label text-em">{form.label}</p>
      <h2 id={fid("title")} className="mt-3 mb-0 type-heading text-ink">
        {form.title}
      </h2>

      <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
        <div className="grid gap-1">
          <label htmlFor={fid("name")} className={labelClass}>{form.nameLabel}</label>
          <input
            id={fid("name")}
            autoComplete="name"
            maxLength={MAX_FIELD_LENGTH}
            value={fields.name}
            onChange={update("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? fid("name-error") : undefined}
            className={fieldClass}
          />
          {errors.name ? <p id={fid("name-error")} className="m-0 text-xs text-alert-text">{errors.name}</p> : null}
        </div>
        <div className="grid gap-1">
          <label htmlFor={fid("phone")} className={labelClass}>{form.phoneLabel}</label>
          <input
            id={fid("phone")}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={20}
            value={fields.phone}
            onChange={update("phone")}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? fid("phone-error") : undefined}
            className={fieldClass}
          />
          {errors.phone ? <p id={fid("phone-error")} className="m-0 text-xs text-alert-text">{errors.phone}</p> : null}
        </div>
        <div className="grid gap-1 sm:col-span-2">
          <label htmlFor={fid("email")} className={labelClass}>{form.emailLabel}</label>
          <input
            id={fid("email")}
            type="email"
            autoComplete="email"
            maxLength={MAX_FIELD_LENGTH}
            value={fields.email}
            onChange={update("email")}
            className={fieldClass}
          />
        </div>
        <div className="grid gap-1 sm:col-span-2">
          <label htmlFor={fid("service")} className={labelClass}>{form.serviceLabel}</label>
          <select id={fid("service")} value={fields.service} onChange={update("service")} className={cn(fieldClass, "cursor-pointer bg-card")}>
            {SERVICE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-1 sm:col-span-2">
          <label htmlFor={fid("message")} className={labelClass}>{form.messageLabel}</label>
          <textarea
            id={fid("message")}
            rows={4}
            maxLength={MAX_MESSAGE_LENGTH}
            value={fields.message}
            onChange={update("message")}
            className={cn(fieldClass, "resize-none")}
          />
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="m-0 max-w-xs text-xs text-text">{form.privacyNote}</p>
        <button
          type="submit"
          className="group inline-flex h-12 shrink-0 items-center justify-center gap-3 whitespace-nowrap bg-ink px-6 text-[0.82rem] tracking-[0.08em] text-background uppercase transition-colors hover:bg-accent-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary dark:bg-night-ink dark:text-night"
        >
          {form.submitLabel}
          <ArrowUpRight aria-hidden strokeWidth={1.5} className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </form>
  );
}
