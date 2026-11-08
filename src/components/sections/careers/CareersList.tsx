"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { DEPARTMENTS, JOBS } from "@/data/careers";
import { SelectField } from "@/components/FormField";
import JobRow from "./JobRow";
import { useT } from "@/i18n/LocaleProvider";

const ALL = "all";
// Locations come from the listings themselves, so new roles add theirs.
const LOCATIONS = [...new Set(JOBS.map((j) => j.location))];

const LOCATION_OPTIONS = [
  { value: ALL, label: "All" },
  ...LOCATIONS.map((l) => ({ value: l, label: l })),
];
const DEPARTMENT_OPTIONS = [
  { value: ALL, label: "All" },
  ...DEPARTMENTS.map((d) => ({ value: d, label: d })),
];

// Location + Department filters — the site's dropdown field (same as the
// forms), side by side above the list.
export default function CareersList() {
  const t = useT();
  const localize = (opts: { value: string; label: string }[]) => opts.map((o) => ({ ...o, label: t(o.label) }));
  const [location, setLocation] = useState(ALL);
  const [department, setDepartment] = useState(ALL);
  const visible = JOBS.filter(
    (j) => (location === ALL || j.location === location) && (department === ALL || j.department === department),
  );

  return (
    <section
      data-nav-theme="light"
      className="bg-brand-white px-6 pb-16 pt-16 text-brand-black md:px-16 md:pb-24 md:pt-20"
    >
      <div className="mx-auto flex max-w-[1080px] flex-col gap-10">
        <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="grid w-full grid-cols-2 gap-x-5 md:max-w-[620px] md:gap-x-8">
            <SelectField size="md" label={t("Location")} value={location} onValueChange={setLocation} options={localize(LOCATION_OPTIONS)} />
            <SelectField size="md" label={t("Department")} value={department} onValueChange={setDepartment} options={localize(DEPARTMENT_OPTIONS)} />
          </div>
          <p className="shrink-0 font-sans text-sm font-medium uppercase tracking-[0.12em] text-brand-black/50 md:pb-3">
            {visible.length === 1 ? t("1 role") : visible.length === 2 ? t("2 roles") : t("{count} roles", { count: visible.length })}
          </p>
        </Reveal>

        {/* Keyed on the filters so the stagger replays on every change. */}
        <div key={`${location}|${department}`} className="flex flex-col">
          {visible.length === 0 ? (
            <Reveal y={16}>
              <p className="border-t border-brand-black/20 py-10 font-sans text-base text-brand-black/60">
                {t("No open roles match these filters right now — try another location or department.")}
              </p>
            </Reveal>
          ) : (
            visible.map((job, i) => (
              <Reveal key={job.slug} delay={i * 0.06} y={16} className="[&:last-child_a]:border-b-0">
                <JobRow job={job} />
              </Reveal>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
