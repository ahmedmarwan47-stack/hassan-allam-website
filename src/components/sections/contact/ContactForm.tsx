"use client";

import { useState, type FormEvent } from "react";
import { TextField, SelectField, TextareaField, PhoneField, type FieldStatus } from "@/components/FormField";
import { AnimatePresence, motion } from "framer-motion";
import ActionButton from "@/components/ActionButton";
import { MAP_PROJECTS } from "@/data/mapProjects";
import { useRtl, useT } from "@/i18n/LocaleProvider";

// Each subject decides what the form asks next (see `Followups` below).
const SUBJECTS = ["Projects", "Resale", "Partnerships", "General Inquiry"] as const;
type Subject = (typeof SUBJECTS)[number] | "";

const PROJECTS = MAP_PROJECTS.map((p) => p.name);

const INDUSTRIES = [
  "Construction & Engineering",
  "Architecture & Design",
  "Hospitality",
  "Retail & F&B",
  "Finance & Investment",
  "Technology",
  "Other",
];

interface FormState {
  subject: Subject;
  project: string;
  industry: string;
  company: string;
  firstName: string;
  lastName: string;
  country: string;
  phone: string;
  email: string;
  message: string;
}

const INITIAL_STATE: FormState = {
  subject: "",
  project: "",
  industry: "",
  company: "",
  firstName: "",
  lastName: "",
  country: "EG",
  phone: "",
  email: "",
  message: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function EmailIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M2 6C2 4.89543 2.89543 4 4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 6L12 13L22 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
      <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function CallIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 4H9L11 9L8.5 10.5C9.57096 12.6715 11.3285 14.429 13.5 15.5L15 13L20 15V19C20 19.5304 19.7893 20.0391 19.4142 20.4142C19.0391 20.7893 18.5304 21 18 21C14.0993 20.763 10.4202 19.1065 7.65683 16.3432C4.8935 13.5798 3.23705 9.90074 3 6C3 5.46957 3.21071 4.96086 3.58579 4.58579C3.96086 4.21071 4.46957 4 5 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ContactForm() {
  const t = useT();
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [emailTouched, setEmailTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const setField = (field: keyof FormState, value: string) => {
    setForm((f) =>
      field === "subject"
        ? // A new subject starts its follow-up fields fresh.
          { ...f, subject: value as Subject, project: "", industry: "", company: "" }
        : { ...f, [field]: value },
    );
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };
  const update = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setField(field, e.target.value);
  const choose = (field: keyof FormState) => (value: string) => setField(field, value);
  const toOptions = (list: readonly string[]) => list.map((v) => ({ value: v, label: t(v) }));

  const emailStatus: FieldStatus =
    errors.email
      ? "error"
      : emailTouched && form.email && EMAIL_RE.test(form.email)
        ? "success"
        : "idle";

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.subject) nextErrors.subject = t("Choose what your message is about");
    if ((form.subject === "Projects" || form.subject === "Resale") && !form.project)
      nextErrors.project = t("Choose a project");
    if (form.subject === "Partnerships") {
      if (!form.industry) nextErrors.industry = t("Choose your industry");
      if (!form.company.trim()) nextErrors.company = t("Company name is required");
    }
    if (!form.firstName.trim()) nextErrors.firstName = t("First name is required");
    if (!form.lastName.trim()) nextErrors.lastName = t("Last name is required");
    if (form.phone.replace(/\D/g, "").length < 8) nextErrors.phone = t("Enter a valid phone number");
    if (!form.email.trim()) nextErrors.email = t("Email is required");
    else if (!EMAIL_RE.test(form.email)) nextErrors.email = t("Enter a valid email address");
    if (!form.message.trim()) nextErrors.message = t("Tell us a bit about your inquiry");

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
    }
  }

  return (
    <section
      data-nav-theme="light"
      className="flex flex-col gap-16 bg-brand-white px-6 py-16 text-brand-black md:flex-row md:gap-20 md:px-16 md:py-20"
    >
      {/* Contact info — labelled hotline, email and office address. */}
      <div className="flex w-full flex-col md:w-[313px] md:shrink-0">
        {[
          { label: "Hotline", value: "19172", href: "tel:19172", icon: <CallIcon />, big: true },
          { label: "Email", value: "info@hap.com.eg", href: "mailto:info@hap.com.eg", icon: <EmailIcon /> },
          { label: "Head office", value: "67 - Southern Road 90 - New Cairo", icon: <LocationIcon /> },
        ].map(({ label, value, href, icon, big }) => {
          const body = (
            <>
              <span className="font-sans text-xs font-medium uppercase tracking-[0.12em] text-brand-black/50">{t(label)}</span>
              <span className={`flex items-center gap-3 font-sans font-medium text-brand-black ${big ? "text-2xl md:text-[1.75rem]" : "text-base"}`}>
                {icon}
                <bdi>{t(value)}</bdi>
              </span>
            </>
          );
          return href ? (
            <a
              key={label}
              href={href}
              className="group flex flex-col gap-2 border-b border-brand-black/10 py-4 first:border-t [&>span:last-child]:decoration-1 [&>span:last-child]:underline-offset-4 hover:[&>span:last-child]:underline"
            >
              {body}
            </a>
          ) : (
            <div key={label} className="flex flex-col gap-2 border-b border-brand-black/10 py-4">
              {body}
            </div>
          );
        })}
      </div>

      {/* Form */}
      <div className="w-full max-w-[919px]">
        {submitted ? (
          <div className="flex flex-col items-start gap-4 py-10">
            <p className="font-serif text-4xl font-light leading-[1.1] tracking-[-0.02em] text-field-success md:text-5xl">
              {t("Message sent")}
            </p>
            <p className="max-w-[500px] font-sans text-lg leading-[1.4] text-brand-black">
              {t("Thank you, {name}. A member of our team will be in touch shortly.", { name: form.firstName })}
            </p>
            <button
              type="button"
              onClick={() => {
                setForm(INITIAL_STATE);
                setErrors({});
                setEmailTouched(false);
                setSubmitted(false);
              }}
              className="mt-4 font-sans text-base font-medium text-brand-black underline decoration-1 underline-offset-4 transition-[text-decoration-thickness] duration-200 hover:decoration-2"
            >
              {t("Send another message")}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-10">
            {/* Subject, then whatever that subject needs — fields slide in
                and out as the choice changes. */}
            <div className="flex flex-col gap-10 sm:flex-row sm:gap-10">
              <SelectField
                label={t("Subject")}
                value={form.subject}
                onValueChange={choose("subject")}
                status={errors.subject ? "error" : "idle"}
                message={errors.subject}
                options={toOptions(SUBJECTS)}
              />
              <AnimatePresence mode="popLayout" initial={false}>
                {(form.subject === "Projects" || form.subject === "Resale") && (
                  <Followup key="project">
                    <SelectField
                      label={form.subject === "Resale" ? t("Select project to resell") : t("Select project")}
                      value={form.project}
                      onValueChange={choose("project")}
                      status={errors.project ? "error" : "idle"}
                      message={errors.project}
                      options={toOptions(PROJECTS)}
                    />
                  </Followup>
                )}
                {form.subject === "Partnerships" && (
                  <Followup key="industry">
                    <SelectField
                      label={t("Industry")}
                      value={form.industry}
                      onValueChange={choose("industry")}
                      status={errors.industry ? "error" : "idle"}
                      message={errors.industry}
                      options={toOptions(INDUSTRIES)}
                    />
                  </Followup>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence initial={false}>
              {form.subject === "Partnerships" && (
                <motion.div
                  key="company"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="-mb-10 overflow-hidden"
                >
                  <div className="pb-10">
                    <TextField
                      label={t("Company Name")}
                      value={form.company}
                      onChange={update("company")}
                      status={errors.company ? "error" : "idle"}
                      message={errors.company}
                      autoComplete="organization"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col gap-10 sm:flex-row sm:gap-10">
              <TextField
                label={t("First Name")}
                placeholder={t("John")}
                value={form.firstName}
                onChange={update("firstName")}
                status={errors.firstName ? "error" : "idle"}
                message={errors.firstName}
              />
              <TextField
                label={t("Last Name")}
                placeholder={t("Doe")}
                value={form.lastName}
                onChange={update("lastName")}
                status={errors.lastName ? "error" : "idle"}
                message={errors.lastName}
              />
            </div>

            <PhoneField
              label={t("Phone")}
              placeholder="10 1234 5678"
              country={form.country}
              onCountryChange={choose("country")}
              value={form.phone}
              onChange={update("phone")}
              status={errors.phone ? "error" : "idle"}
              message={errors.phone}
              autoComplete="tel-national"
            />

            <TextField
              label={t("Email")}
              type="email"
              placeholder="example@email.com"
              value={form.email}
              onChange={update("email")}
              onBlur={() => setEmailTouched(true)}
              status={emailStatus}
              message={errors.email}
            />

            <TextareaField
              label={t("Message")}
              placeholder={t("My message is")}
              rows={4}
              value={form.message}
              onChange={update("message")}
              status={errors.message ? "error" : "idle"}
              message={errors.message}
            />

            <ActionButton label={t("Send message")} type="submit" variant="solid" look="arrow" className="self-start" />
          </form>
        )}
      </div>
    </section>
  );
}

/** A follow-up field that slides in beside the subject. */
function Followup({ children }: { children: React.ReactNode }) {
  // Slides in from the reading-end side.
  const dx = useRtl() ? -24 : 24;
  return (
    <motion.div
      layout
      className="w-full"
      initial={{ opacity: 0, x: dx }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: dx }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
