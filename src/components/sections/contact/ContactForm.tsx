"use client";

import { useState, type FormEvent } from "react";
import { TextField, SelectField, TextareaField, type FieldStatus } from "@/components/FormField";
import { AnimatePresence, motion } from "framer-motion";
import ActionButton from "@/components/ActionButton";
import { MAP_PROJECTS } from "@/data/mapProjects";

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

function CallIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 4H9L11 9L8.5 10.5C9.57096 12.6715 11.3285 14.429 13.5 15.5L15 13L20 15V19C20 19.5304 19.7893 20.0391 19.4142 20.4142C19.0391 20.7893 18.5304 21 18 21C14.0993 20.763 10.4202 19.1065 7.65683 16.3432C4.8935 13.5798 3.23705 9.90074 3 6C3 5.46957 3.21071 4.96086 3.58579 4.58579C3.96086 4.21071 4.46957 4 5 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [emailTouched, setEmailTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setForm((f) =>
      field === "subject"
        ? // A new subject starts its follow-up fields fresh.
          { ...f, subject: e.target.value as Subject, project: "", industry: "", company: "" }
        : { ...f, [field]: e.target.value },
    );
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const emailStatus: FieldStatus =
    errors.email
      ? "error"
      : emailTouched && form.email && EMAIL_RE.test(form.email)
        ? "success"
        : "idle";

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.subject) nextErrors.subject = "Choose what your message is about";
    if ((form.subject === "Projects" || form.subject === "Resale") && !form.project)
      nextErrors.project = "Choose a project";
    if (form.subject === "Partnerships") {
      if (!form.industry) nextErrors.industry = "Choose your industry";
      if (!form.company.trim()) nextErrors.company = "Company name is required";
    }
    if (!form.firstName.trim()) nextErrors.firstName = "First name is required";
    if (!form.lastName.trim()) nextErrors.lastName = "Last name is required";
    if (!form.email.trim()) nextErrors.email = "Email is required";
    else if (!EMAIL_RE.test(form.email)) nextErrors.email = "Enter a valid email address";
    if (!form.message.trim()) nextErrors.message = "Tell us a bit about your inquiry";

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
      {/* Contact info */}
      <div className="flex w-full flex-col gap-4 md:w-[313px] md:shrink-0">
        <div className="h-px w-full bg-brand-black/10" />
        <a
          href="mailto:info@hap.com.eg"
          className="flex items-center gap-3 py-2 font-sans text-base font-medium text-brand-black transition-colors duration-200 hover:text-grey-500"
        >
          <EmailIcon />
          info@hap.com.eg
        </a>
        <div className="h-px w-full bg-brand-black/10" />
        <a
          href="tel:19172"
          className="flex items-center gap-3 py-2 font-sans text-base font-medium text-brand-black transition-colors duration-200 hover:text-grey-500"
        >
          <CallIcon />
          19172
        </a>
        <div className="h-px w-full bg-brand-black/10" />
      </div>

      {/* Form */}
      <div className="w-full max-w-[919px]">
        {submitted ? (
          <div className="flex flex-col items-start gap-4 py-10">
            <p className="font-serif text-4xl font-light leading-[1.1] tracking-[-0.02em] text-field-success md:text-5xl">
              Message sent
            </p>
            <p className="max-w-[500px] font-sans text-lg leading-[1.4] text-brand-black">
              Thank you, {form.firstName}. A member of our team will be in
              touch shortly.
            </p>
            <button
              type="button"
              onClick={() => {
                setForm(INITIAL_STATE);
                setErrors({});
                setEmailTouched(false);
                setSubmitted(false);
              }}
              className="mt-4 font-sans text-base font-medium text-brand-black underline underline-offset-4 transition-opacity duration-200 hover:opacity-60"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-10">
            {/* Subject, then whatever that subject needs — fields slide in
                and out as the choice changes. */}
            <div className="flex flex-col gap-10 sm:flex-row sm:gap-10">
              <SelectField
                label="Subject"
                value={form.subject}
                onChange={update("subject")}
                status={errors.subject ? "error" : "idle"}
                message={errors.subject}
              >
                {SUBJECTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </SelectField>
              <AnimatePresence mode="popLayout" initial={false}>
                {(form.subject === "Projects" || form.subject === "Resale") && (
                  <Followup key="project">
                    <SelectField
                      label={form.subject === "Resale" ? "Select project to resell" : "Select project"}
                      value={form.project}
                      onChange={update("project")}
                      status={errors.project ? "error" : "idle"}
                      message={errors.project}
                    >
                      {PROJECTS.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </SelectField>
                  </Followup>
                )}
                {form.subject === "Partnerships" && (
                  <Followup key="industry">
                    <SelectField
                      label="Industry"
                      value={form.industry}
                      onChange={update("industry")}
                      status={errors.industry ? "error" : "idle"}
                      message={errors.industry}
                    >
                      {INDUSTRIES.map((i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      ))}
                    </SelectField>
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
                      label="Company Name"
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
                label="First Name"
                placeholder="John"
                value={form.firstName}
                onChange={update("firstName")}
                status={errors.firstName ? "error" : "idle"}
                message={errors.firstName}
              />
              <TextField
                label="Last Name"
                placeholder="Doe"
                value={form.lastName}
                onChange={update("lastName")}
                status={errors.lastName ? "error" : "idle"}
                message={errors.lastName}
              />
            </div>

            <TextField
              label="Email"
              type="email"
              placeholder="example@email.com"
              value={form.email}
              onChange={update("email")}
              onBlur={() => setEmailTouched(true)}
              status={emailStatus}
              message={errors.email}
            />

            <TextareaField
              label="Message"
              placeholder="My message is"
              rows={4}
              value={form.message}
              onChange={update("message")}
              status={errors.message ? "error" : "idle"}
              message={errors.message}
            />

            <ActionButton label="Send message" type="submit" variant="solid" look="arrow" className="self-start" />
          </form>
        )}
      </div>
    </section>
  );
}

/** A follow-up field that slides in beside the subject. */
function Followup({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      layout
      className="w-full"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
