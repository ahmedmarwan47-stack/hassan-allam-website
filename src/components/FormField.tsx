"use client";

import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

export type FieldStatus = "idle" | "error" | "success";

function borderClass(status: FieldStatus, filled: boolean) {
  if (status === "error") return "border-error";
  if (status === "success") return "border-field-success";
  if (filled) return "border-brand-black";
  return "border-brand-black/10 hover:border-brand-black/20";
}

function messageClass(status: FieldStatus) {
  if (status === "error") return "text-error";
  if (status === "success") return "text-field-success";
  return "text-brand-black";
}

interface SharedProps {
  label: string;
  status?: FieldStatus;
  message?: string;
  wrapperClassName?: string;
}

export function TextField({
  label,
  status = "idle",
  message,
  wrapperClassName,
  className,
  value,
  ...props
}: SharedProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "className"> & {
    className?: string;
  }) {
  const filled = String(value ?? "").length > 0;
  return (
    <label className={`flex w-full flex-col items-start gap-4 ${wrapperClassName ?? ""}`}>
      <span className="font-sans text-base text-brand-black">{label}</span>
      <div
        className={`w-full border-b py-3 transition-colors duration-200 ${borderClass(status, filled)}`}
      >
        <input
          {...props}
          value={value}
          className={`w-full bg-transparent font-sans text-2xl leading-[1.3] text-brand-black placeholder:text-grey-500 focus:outline-none ${className ?? ""}`}
        />
      </div>
      {message && (
        <p className={`font-sans text-base ${messageClass(status)}`}>{message}</p>
      )}
    </label>
  );
}

export function SelectField({
  label,
  status = "idle",
  message,
  wrapperClassName,
  className,
  value,
  children,
  ...props
}: SharedProps &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, "className"> & {
    className?: string;
  }) {
  const filled = String(value ?? "").length > 0;
  return (
    <label className={`flex w-full flex-col items-start gap-4 ${wrapperClassName ?? ""}`}>
      <span className="font-sans text-base text-brand-black">{label}</span>
      <div
        className={`relative flex w-full items-center border-b py-3 transition-colors duration-200 ${borderClass(status, filled)}`}
      >
        <select
          {...props}
          value={value}
          className={`w-full cursor-pointer appearance-none bg-transparent font-sans text-2xl leading-[1.3] text-brand-black focus:outline-none ${className ?? ""}`}
        >
          {children}
        </select>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
          className="pointer-events-none absolute right-0 shrink-0 text-brand-black"
        >
          <path
            d="M5 8.5 12 15.5 19 8.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {message && (
        <p className={`font-sans text-base ${messageClass(status)}`}>{message}</p>
      )}
    </label>
  );
}

export function TextareaField({
  label,
  status = "idle",
  message,
  wrapperClassName,
  className,
  value,
  ...props
}: SharedProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> & {
    className?: string;
  }) {
  const filled = String(value ?? "").length > 0;
  return (
    <label className={`flex h-[186px] w-full flex-col items-start gap-4 ${wrapperClassName ?? ""}`}>
      <span className="font-sans text-base text-brand-black">{label}</span>
      <div
        className={`w-full flex-1 border-b py-3 transition-colors duration-200 ${borderClass(status, filled)}`}
      >
        <textarea
          {...props}
          value={value}
          className={`size-full resize-none bg-transparent font-sans text-2xl leading-[1.3] text-brand-black placeholder:text-grey-500 focus:outline-none ${className ?? ""}`}
        />
      </div>
      {message && (
        <p className={`font-sans text-base ${messageClass(status)}`}>{message}</p>
      )}
    </label>
  );
}
