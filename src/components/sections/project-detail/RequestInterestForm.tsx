"use client";

import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ParallaxImage from "@/components/ParallaxImage";
import { Reveal } from "@/components/Reveal";
import ActionButton from "@/components/ActionButton";
import { SelectField, TextField, TextareaField } from "@/components/FormField";
import { PREFILL_INTEREST } from "./ProjectActions";

/**
 * Request Interest — where every "Request interest" button on the project
 * page lands (#request-interest). A full-bleed project photo drifts behind
 * (parallax) under a dark wash; the pitch sits on the left and a white form
 * card on the right. No backend yet: a valid submit shows a thank-you state.
 */
const UNIT_TYPES = ["Apartment", "Duplex", "Penthouse", "Townhouse", "Villa"];
const CONTACT_BY = ["Phone", "WhatsApp", "Email"] as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Field = "firstName" | "lastName" | "phone" | "email";

export default function RequestInterestForm({
  projectName,
  image,
}: {
  projectName: string;
  image: string;
}) {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    unit: "",
    contactBy: "Phone" as (typeof CONTACT_BY)[number],
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [sent, setSent] = useState(false);

  // Other buttons (e.g. the brochure) can pre-fill the message.
  useEffect(() => {
    const onPrefill = (e: Event) => {
      const message = (e as CustomEvent<string>).detail;
      setSent(false);
      setValues((v) => ({ ...v, message }));
    };
    window.addEventListener(PREFILL_INTEREST, onPrefill);
    return () => window.removeEventListener(PREFILL_INTEREST, onPrefill);
  }, []);

  const set = (key: keyof typeof values) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Partial<Record<Field, string>> = {};
    if (!values.firstName.trim()) next.firstName = "Please enter your first name";
    if (!values.lastName.trim()) next.lastName = "Please enter your last name";
    if (values.phone.replace(/\D/g, "").length < 8) next.phone = "Please enter a valid phone number";
    if (!EMAIL_RE.test(values.email)) next.email = "Please enter a valid email";
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  };

  return (
    <section
      id="request-interest"
      data-nav-theme="dark"
      className="relative isolate overflow-hidden px-6 py-20 md:px-16 md:py-32"
    >
      <div className="absolute inset-0 -z-10">
        <ParallaxImage src={image} sizes="100vw" quality={85} strength={14} />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-black/75 via-black/45 to-black/25" />

      <div className="flex flex-col gap-12 md:flex-row md:items-center md:justify-between md:gap-16">
        {/* Pitch */}
        <Reveal className="flex flex-col gap-6 text-white md:w-[40%]">
          <p className="font-sans text-sm font-medium uppercase tracking-[0.12em] text-white/70 md:text-base">
            Request Interest
          </p>
          <h2 className="font-serif font-light uppercase leading-[1.02] tracking-[-0.02em] [font-size:clamp(2.25rem,4.4vw,4.75rem)]">
            Find your home at {projectName}
          </h2>
          <p className="max-w-[460px] font-sans text-lg leading-[1.5] text-white/85">
            Tell us what you&rsquo;re looking for and a HAP sales advisor will
            get back to you with availability, payment plans and a private
            viewing.
          </p>
        </Reveal>

        {/* Form card */}
        <Reveal delay={0.1} className="w-full md:w-[52%] md:max-w-[720px]">
          <div className="rounded-[2px] bg-brand-white p-6 text-brand-black shadow-[0_30px_80px_rgba(0,0,0,0.35)] md:p-12">
            <AnimatePresence mode="wait" initial={false}>
              {sent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex min-h-[420px] flex-col items-start justify-center gap-6"
                >
                  <span className="flex size-12 items-center justify-center rounded-full bg-brand-black text-brand-white">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                      <path d="M4 10.5l4 4 8-9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <h3 className="font-serif text-4xl font-light uppercase leading-none tracking-[-0.02em]">
                    Thank you, {values.firstName}
                  </h3>
                  <p className="max-w-[420px] font-sans text-base leading-[1.5] text-brand-black/70">
                    Your request for {projectName} is in. An advisor will reach
                    you by {values.contactBy.toLowerCase()} within one working day.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  noValidate
                  onSubmit={submit}
                  exit={{ opacity: 0, y: -12, transition: { duration: 0.3 } }}
                  className="flex flex-col gap-7"
                >
                  <div className="grid gap-6 sm:grid-cols-2 sm:gap-x-8">
                    <TextField size="md" label="First name" value={values.firstName} onChange={set("firstName")} status={errors.firstName ? "error" : "idle"} message={errors.firstName} autoComplete="given-name" />
                    <TextField size="md" label="Last name" value={values.lastName} onChange={set("lastName")} status={errors.lastName ? "error" : "idle"} message={errors.lastName} autoComplete="family-name" />
                    <TextField size="md" label="Phone" type="tel" value={values.phone} onChange={set("phone")} status={errors.phone ? "error" : "idle"} message={errors.phone} autoComplete="tel" />
                    <TextField size="md" label="Email" type="email" value={values.email} onChange={set("email")} status={errors.email ? "error" : "idle"} message={errors.email} autoComplete="email" />
                  </div>

                  <SelectField size="md" label="Interested in" value={values.unit} onChange={set("unit")}>
                    {UNIT_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </SelectField>

                  <fieldset className="flex flex-col gap-3">
                    <legend className="mb-3 font-sans text-sm text-brand-black/60">Preferred contact</legend>
                    <div className="flex flex-wrap gap-2">
                      {CONTACT_BY.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setValues((v) => ({ ...v, contactBy: c }))}
                          aria-pressed={values.contactBy === c}
                          className={`rounded-full border px-4 py-2 font-sans text-sm font-medium transition-colors duration-300 ${
                            values.contactBy === c
                              ? "border-brand-black bg-brand-black text-brand-white"
                              : "border-brand-black/15 text-brand-black/70 hover:border-brand-black"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <TextareaField size="md" label="Message (optional)" rows={2} value={values.message} onChange={set("message")} />

                  <div className="flex flex-col items-start gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <ActionButton label="Send request" type="submit" variant="solid" look="arrow" />
                    <p className="max-w-[260px] font-sans text-xs leading-[1.4] text-brand-black/50">
                      By sending, you agree to be contacted by Hassan Allam Properties about this project.
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
