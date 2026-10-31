"use client";

import {
  useId,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";

/**
 * Form fields with a floating label: the label rests inside the field like a
 * placeholder; on focus (or once filled) it shrinks and glides up above the
 * text, and a black underline draws in from the left. Errors turn the line
 * and message red, a confirmed value turns them green.
 *
 * `size="lg"` (default) is the Contact page scale; `size="md"` suits
 * compact forms such as the project interest card.
 */
export type FieldStatus = "idle" | "error" | "success";
type Size = "lg" | "md";

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

// Resting label sits exactly on the text line; floated it lifts to the top.
const SIZES: Record<Size, { text: string; pad: string; rest: string; float: string }> = {
  lg: {
    text: "text-2xl leading-[1.3]",
    pad: "py-3",
    rest: "translate-y-[36px]",
    float: "translate-y-0 scale-[0.6]",
  },
  md: {
    text: "text-lg leading-[1.3]",
    pad: "py-2",
    rest: "translate-y-[32px]",
    float: "translate-y-0 scale-[0.78]",
  },
};

function lineColor(status: FieldStatus) {
  if (status === "error") return "bg-error";
  if (status === "success") return "bg-field-success";
  return "bg-brand-black";
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
  size?: Size;
}

/** Shell shared by every field: floating label, animated underline, message. */
function Shell({
  id,
  label,
  floated,
  focused,
  status,
  message,
  size,
  wrapperClassName,
  children,
}: {
  id: string;
  label: string;
  floated: boolean;
  focused: boolean;
  status: FieldStatus;
  message?: string;
  size: Size;
  wrapperClassName?: string;
  children: ReactNode;
}) {
  const s = SIZES[size];
  const lineOn = focused || status !== "idle";
  return (
    <div className={`flex w-full flex-col gap-2 ${wrapperClassName ?? ""}`}>
      <div className="relative pt-6">
        <label
          htmlFor={id}
          className={`pointer-events-none absolute left-0 top-0 origin-top-left font-sans transition-[transform,color] duration-500 ${EASE} ${s.text} ${
            floated
              ? `${s.float} ${status === "error" ? "text-error" : "text-brand-black/55"}`
              : `${s.rest} text-grey-500`
          }`}
        >
          {label}
        </label>
        {children}
        {/* Resting hairline + the focus line that draws in from the left. */}
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-brand-black/15" />
        <span
          aria-hidden
          className={`absolute inset-x-0 bottom-0 h-[1.5px] origin-left transition-transform duration-500 ${EASE} ${lineColor(status)} ${
            lineOn ? "scale-x-100" : "scale-x-0"
          }`}
        />
      </div>
      {message && <p className={`font-sans text-sm ${messageClass(status)}`}>{message}</p>}
    </div>
  );
}

const inputBase = "w-full bg-transparent font-sans text-brand-black focus:outline-none";

export function TextField({
  label,
  status = "idle",
  message,
  wrapperClassName,
  className,
  value,
  size = "lg",
  onFocus,
  onBlur,
  ...props
}: SharedProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "size"> & {
    className?: string;
  }) {
  const id = useId();
  const [focused, setFocused] = useState(false);
  const filled = String(value ?? "").length > 0;
  const s = SIZES[size];
  return (
    <Shell id={id} label={label} floated={focused || filled} focused={focused} status={status} message={message} size={size} wrapperClassName={wrapperClassName}>
      <input
        {...props}
        id={id}
        value={value}
        aria-invalid={status === "error"}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        // Placeholders only show once the label has moved out of the way.
        className={`${inputBase} ${s.text} ${s.pad} placeholder:text-grey-500 placeholder:opacity-0 placeholder:transition-opacity focus:placeholder:opacity-100 ${className ?? ""}`}
      />
    </Shell>
  );
}

export function SelectField({
  label,
  status = "idle",
  message,
  wrapperClassName,
  className,
  value,
  size = "lg",
  children,
  onFocus,
  onBlur,
  ...props
}: SharedProps &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, "className" | "size"> & {
    className?: string;
  }) {
  const id = useId();
  const [focused, setFocused] = useState(false);
  const filled = String(value ?? "").length > 0;
  const s = SIZES[size];
  return (
    <Shell id={id} label={label} floated={focused || filled} focused={focused} status={status} message={message} size={size} wrapperClassName={wrapperClassName}>
      <select
        {...props}
        id={id}
        value={value}
        aria-invalid={status === "error"}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        className={`${inputBase} ${s.text} ${s.pad} cursor-pointer appearance-none pr-8 ${filled ? "" : "text-transparent"} ${className ?? ""}`}
      >
        {/* Empty choice so the label can rest inside until something is picked. */}
        <option value="" disabled hidden />
        {children}
      </select>
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        className={`pointer-events-none absolute bottom-3 right-0 text-brand-black transition-transform duration-500 ${EASE} ${focused ? "rotate-180" : ""}`}
      >
        <path d="M5 8.5 12 15.5 19 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Shell>
  );
}

export function TextareaField({
  label,
  status = "idle",
  message,
  wrapperClassName,
  className,
  value,
  size = "lg",
  rows = 4,
  onFocus,
  onBlur,
  ...props
}: SharedProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> & {
    className?: string;
  }) {
  const id = useId();
  const [focused, setFocused] = useState(false);
  const filled = String(value ?? "").length > 0;
  const s = SIZES[size];
  return (
    <Shell id={id} label={label} floated={focused || filled} focused={focused} status={status} message={message} size={size} wrapperClassName={wrapperClassName}>
      <textarea
        {...props}
        id={id}
        rows={rows}
        value={value}
        aria-invalid={status === "error"}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        className={`${inputBase} ${s.text} ${s.pad} block resize-none placeholder:text-grey-500 placeholder:opacity-0 placeholder:transition-opacity focus:placeholder:opacity-100 ${className ?? ""}`}
      />
    </Shell>
  );
}
