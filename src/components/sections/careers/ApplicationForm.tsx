"use client";

import { useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import ActionButton from "@/components/ActionButton";
import { TextField, TextareaField, PhoneField } from "@/components/FormField";

const MAX_CV_BYTES = 20 * 1024 * 1024;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
type Field = "firstName" | "lastName" | "email" | "phone" | "cv" | "message";

/**
 * Apply for this role — where every "Apply now" on a career page lands
 * (#apply). Name, contact details, an optional LinkedIn profile, the CV
 * (PDF, up to 20 MB) and a few words about themselves. No backend yet: a valid submit shows a
 * thank-you state.
 */
export default function ApplicationForm({ role }: { role: string }) {
  const [values, setValues] = useState({ firstName: "", lastName: "", email: "", phone: "", linkedin: "", message: "" });
  const [cv, setCv] = useState<File | null>(null);
  const [country, setCountry] = useState("EG");
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [sent, setSent] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Partial<Record<Field, string>> = {};
    if (!values.firstName.trim()) next.firstName = "Please enter your first name";
    if (!values.lastName.trim()) next.lastName = "Please enter your last name";
    if (!EMAIL_RE.test(values.email)) next.email = "Please enter a valid email";
    if (values.phone.replace(/\D/g, "").length < 8) next.phone = "Please enter a valid phone number";
    if (!cv) next.cv = "Please attach your CV";
    if (!values.message.trim()) next.message = "Please tell us a little about yourself";
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  };

  return (
    <section
      id="apply"
      data-nav-theme="light"
      className="scroll-mt-16 border-t border-brand-black/20 bg-grey-100 px-6 py-16 text-brand-black md:px-16 md:py-24"
    >
      {/* "Apply now" on one line, centred over the narrower form card. */}
      <div className="mx-auto flex w-full max-w-[880px] flex-col gap-8 md:gap-10">
        <Reveal>
          <h2 className="whitespace-nowrap text-center font-serif font-light uppercase leading-none tracking-[-0.02em] [font-size:clamp(2.25rem,4vw,3.75rem)]">
            Apply now
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-[2px] bg-brand-white p-5 md:p-12">
            <AnimatePresence mode="wait" initial={false}>
              {sent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex min-h-[360px] flex-col items-start justify-center gap-6"
                >
                  <span className="flex size-12 items-center justify-center rounded-full bg-brand-black text-brand-white">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                      <path d="M4 10.5l4 4 8-9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <h3 className="font-serif text-4xl font-light uppercase leading-none tracking-[-0.02em]">
                    Thank you, {values.firstName}
                  </h3>
                  <p className="max-w-[460px] font-sans text-base leading-[1.5] text-brand-black/70">
                    Your application for {role} is in. Our talent team reviews every application and will contact
                    you if your profile is a match.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  noValidate
                  onSubmit={submit}
                  exit={{ opacity: 0, y: -12, transition: { duration: 0.3 } }}
                  className="flex flex-col gap-5 md:gap-7"
                >
                  <div className="grid grid-cols-2 gap-x-5 gap-y-4 sm:gap-x-8 sm:gap-y-6">
                    <TextField size="md" label="First name" value={values.firstName} onChange={set("firstName")} status={errors.firstName ? "error" : "idle"} message={errors.firstName} autoComplete="given-name" />
                    <TextField size="md" label="Last name" value={values.lastName} onChange={set("lastName")} status={errors.lastName ? "error" : "idle"} message={errors.lastName} autoComplete="family-name" />
                    <TextField size="md" wrapperClassName="col-span-2 sm:col-span-1" label="Email" type="email" value={values.email} onChange={set("email")} status={errors.email ? "error" : "idle"} message={errors.email} autoComplete="email" />
                    <PhoneField size="md" wrapperClassName="col-span-2 sm:col-span-1" label="Phone" country={country} onCountryChange={setCountry} value={values.phone} onChange={set("phone")} status={errors.phone ? "error" : "idle"} message={errors.phone} autoComplete="tel-national" />
                  </div>
                  <TextField size="md" label="LinkedIn profile (optional)" type="url" value={values.linkedin} onChange={set("linkedin")} />

                  {/* CV upload — a dashed drop-style button that shows the file once chosen. */}
                  <div className="flex flex-col gap-2">
                    <input
                      ref={fileRef}
                      type="file"
                      accept="application/pdf,.pdf"
                      className="sr-only"
                      id="cv-upload"
                      onChange={(e) => {
                        const file = e.target.files?.[0] ?? null;
                        e.target.value = "";
                        if (!file) return;
                        // PDF only, up to 20 MB.
                        const isPdf = file.type === "application/pdf" || /\.pdf$/i.test(file.name);
                        if (!isPdf) {
                          setCv(null);
                          setErrors((er) => ({ ...er, cv: "Please attach your CV as a PDF" }));
                        } else if (file.size > MAX_CV_BYTES) {
                          setCv(null);
                          setErrors((er) => ({ ...er, cv: "Your CV must be 20 MB or smaller" }));
                        } else {
                          setCv(file);
                          setErrors((er) => ({ ...er, cv: undefined }));
                        }
                      }}
                    />
                    <label
                      htmlFor="cv-upload"
                      className={`flex cursor-pointer items-center justify-between gap-4 rounded-[4px] border border-dashed px-5 py-4 font-sans text-base transition-colors duration-300 hover:border-brand-black ${
                        errors.cv ? "border-error" : "border-brand-black/30"
                      }`}
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden className="shrink-0">
                          <path d="M10 13V3m0 0L6 7m4-4 4 4M3.5 13v2.5a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="truncate">{cv ? cv.name : "Attach your CV"}</span>
                      </span>
                      <span className="shrink-0 font-sans text-sm text-brand-black/50">{cv ? "Change" : "PDF, max 20 MB"}</span>
                    </label>
                    {errors.cv && <p className="font-sans text-sm text-error">{errors.cv}</p>}
                  </div>

                  <TextareaField size="md" label="Tell us about yourself" rows={3} className="max-md:!h-[76px]" value={values.message} onChange={set("message")} status={errors.message ? "error" : "idle"} message={errors.message} />

                  <div className="flex flex-col items-stretch gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between sm:pt-2">
                    <ActionButton label="Apply now" type="submit" variant="solid" look="arrow" className="w-full justify-center sm:w-auto" />
                    <p className="max-w-[280px] font-sans text-xs leading-[1.4] text-brand-black/50 sm:text-right">
                      Your details are used only to review your application at Hassan Allam Properties.
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
