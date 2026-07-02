"use client";

import { useState, type FormEvent } from "react";
import { TextField, SelectField, TextareaField, type FieldStatus } from "@/components/FormField";
import { Reveal } from "@/components/Reveal";

const SUBJECTS = [
  "Real Estate",
  "Media & Press",
  "Careers",
  "Partnerships",
  "General Inquiry",
];

const TYPES = [
  "No Preference",
  "Residential",
  "Office Space",
  "Retail",
  "Hospitality & Leisure",
  "Sports & Wellness",
];

interface FormState {
  subject: string;
  type: string;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

const INITIAL_STATE: FormState = {
  subject: SUBJECTS[0],
  type: TYPES[0],
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

function WhatsAppIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M17.472 14.382C17.178 14.233 15.752 13.533 15.482 13.433C15.212 13.333 15.012 13.283 14.812 13.583C14.612 13.883 14.062 14.533 13.892 14.733C13.722 14.933 13.552 14.958 13.258 14.808C12.964 14.658 12.032 14.358 10.932 13.383C10.072 12.618 9.492 11.683 9.322 11.383C9.152 11.083 9.302 10.923 9.452 10.773C9.582 10.643 9.752 10.433 9.902 10.258C10.052 10.083 10.102 9.958 10.202 9.758C10.302 9.558 10.252 9.383 10.177 9.233C10.102 9.083 9.502 7.658 9.252 7.058C9.012 6.478 8.762 6.558 8.582 6.548L8.012 6.533C7.812 6.533 7.492 6.608 7.222 6.908C6.952 7.208 6.202 7.908 6.202 9.333C6.202 10.758 7.252 12.133 7.402 12.333C7.552 12.533 9.492 15.523 12.452 16.758C13.152 17.058 13.702 17.233 14.132 17.368C14.832 17.583 15.472 17.553 15.982 17.478C16.552 17.393 17.722 16.783 17.972 16.108C18.222 15.433 18.222 14.858 18.147 14.733C18.072 14.608 17.872 14.533 17.572 14.383L17.472 14.382ZM12.052 21.788H12.047C10.2438 21.7884 8.47283 21.3059 6.907 20.388L6.547 20.173L2.847 21.143L3.837 17.543L3.597 17.168C2.58912 15.5458 2.05689 13.6834 2.057 11.782C2.06 6.272 6.547 1.788 12.057 1.788C14.722 1.788 17.227 2.828 19.107 4.708C20.987 6.588 22.027 9.093 22.027 11.788C22.023 17.298 17.537 21.788 12.052 21.788ZM20.527 3.288C18.267 1.028 15.257 -0.212 12.052 -0.212C5.462 -0.212 0.072 5.178 0.067 11.778C0.067 13.878 0.617 15.928 1.667 17.738L0 24L6.407 22.368C8.147 23.328 10.082 23.828 12.047 23.828H12.052C18.642 23.828 24.032 18.438 24.037 11.838C24.037 8.608 22.787 5.548 20.527 3.288Z" fill="currentColor" />
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
    setForm((f) => ({ ...f, [field]: e.target.value }));
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
      <Reveal className="flex w-full flex-col gap-4 md:w-[313px] md:shrink-0">
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
          href="tel:+2019172"
          className="flex items-center gap-3 py-2 font-sans text-base font-medium text-brand-black transition-colors duration-200 hover:text-grey-500"
        >
          <CallIcon />
          +20 19 172
        </a>
        <div className="h-px w-full bg-brand-black/10" />
        <a
          href="#"
          className="flex items-center gap-3 py-2 font-sans text-base font-medium text-brand-black transition-colors duration-200 hover:text-grey-500"
        >
          <WhatsAppIcon />
          Hap on WhatsApp
        </a>
        <div className="h-px w-full bg-brand-black/10" />
      </Reveal>

      {/* Form */}
      <Reveal delay={0.1} className="w-full max-w-[919px]">
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
            <div className="flex flex-col gap-10 sm:flex-row sm:gap-10">
              <SelectField
                label="Subject"
                value={form.subject}
                onChange={update("subject")}
              >
                {SUBJECTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </SelectField>
              <SelectField label="Type" value={form.type} onChange={update("type")}>
                {TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </SelectField>
            </div>

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

            <button
              type="submit"
              className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden border border-brand-black px-6 py-5 font-serif text-2xl uppercase tracking-[-0.02em] text-brand-black transition-colors duration-500 hover:text-brand-white md:w-fit md:justify-start"
            >
              {/* Premium sweep — black fill glides up from the bottom edge. */}
              <span
                aria-hidden
                className="absolute inset-0 translate-y-full bg-brand-black transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-y-0"
              />
              <span className="relative z-10">Submit Message</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden className="relative z-10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1">
                <path
                  d="M6 18 18 6M18 6H8M18 6V16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>
        )}
      </Reveal>
    </section>
  );
}
