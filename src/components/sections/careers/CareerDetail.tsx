"use client";

import Image from "@/components/ProgressiveImage";
import ActionButton from "@/components/ActionButton";
import Link from "@/components/LocaleLink";
import { Reveal } from "@/components/Reveal";
import { JOBS, OFFER, type Job } from "@/data/careers";
import JobRow from "./JobRow";
import CareerStickyBar from "./CareerStickyBar";
import ApplicationForm from "./ApplicationForm";
import { useRtl, useT } from "@/i18n/LocaleProvider";

// Every "Apply now" glides down to the application form on the page.
const APPLY_HREF = "#apply";
import {
  ArrowLeftIcon,
  BriefcaseIcon,
  CalendarIcon,
  ClockIcon,
  LocationIcon,
  MortarboardIcon,
} from "./icons";

// "22 Oct 2026" → "22 أكتوبر 2026" on /ar.
const AR_MONTHS: Record<string, string> = {
  Jan: "يناير", Feb: "فبراير", Mar: "مارس", Apr: "أبريل", May: "مايو", Jun: "يونيو",
  Jul: "يوليو", Aug: "أغسطس", Sep: "سبتمبر", Oct: "أكتوبر", Nov: "نوفمبر", Dec: "ديسمبر",
};
const localDate = (date: string, rtl: boolean) =>
  rtl ? date.replace(/[A-Z][a-z]{2}/, (m) => AR_MONTHS[m] ?? m) : date;

function CareerHero({ job }: { job: Job }) {
  const t = useT();
  return (
    <section
      data-nav-theme="light"
      className="relative flex min-h-[400px] flex-col items-center justify-center overflow-hidden bg-brand-white px-6 pb-14 pt-28 text-center md:min-h-[520px] md:px-16 md:pt-32"
    >
      <Image
        src="/images/bg-light.jpg"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="pointer-events-none select-none object-cover"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-b from-transparent to-brand-white"
      />

      <Reveal className="relative z-10 flex flex-col items-center gap-7">
        <Link
          href="/careers"
          className="flex items-center gap-2 font-sans text-base font-medium text-brand-black/75 transition-colors duration-300 hover:text-brand-black hover:underline decoration-1 underline-offset-4"
        >
          <ArrowLeftIcon size={20} className="rtl:-scale-x-100" />
          {t("All Careers")}
        </Link>
        <h1 className="max-w-[1014px] font-serif font-light uppercase leading-none tracking-[-0.02em] text-brand-black [font-size:clamp(2.5rem,7vw,5.75rem)]">
          {t(job.title)}
        </h1>
      </Reveal>
    </section>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const t = useT();
  return (
    <Reveal y={16} className="flex flex-col gap-5 border-t border-brand-black/20 pt-5">
      <h2 className="font-serif text-2xl font-medium leading-[1.2] tracking-[-0.01em] md:text-[1.75rem]">
        {t(title)}
      </h2>
      {children}
    </Reveal>
  );
}

function Bullets({ items }: { items: string[] }) {
  const t = useT();
  return (
    <ul className="flex list-disc flex-col gap-2 ps-6 font-sans text-base leading-[1.5] text-brand-black/80">
      {items.map((item) => (
        <li key={item}>{t(item)}</li>
      ))}
    </ul>
  );
}

function CareerBody({ job }: { job: Job }) {
  const t = useT();
  const rtl = useRtl();
  const overview = [
    { Icon: BriefcaseIcon, label: "Department", value: job.department },
    { Icon: LocationIcon, label: "Location", value: job.location },
    { Icon: ClockIcon, label: "Employment type", value: job.type },
    { Icon: MortarboardIcon, label: "Experience", value: job.experience },
    { Icon: CalendarIcon, label: "Posted", value: localDate(job.posted, rtl) },
  ];
  return (
    <section
      data-nav-theme="light"
      className="bg-brand-white px-6 py-16 text-brand-black md:px-16 md:py-20"
    >
      <div className="flex flex-col gap-14 md:flex-row md:items-start md:gap-20">
        {/* Sidebar — sticks beside the description on desktop. On phones,
            once its Apply button scrolls past, the compact bar takes over. */}
        <aside className="flex w-full flex-col gap-5 md:sticky md:top-28 md:w-[313px] md:shrink-0">
          <h2 className="font-serif text-2xl font-medium leading-[1.2] tracking-[-0.01em] md:text-[1.75rem]">
            {t("Job overview")}
          </h2>
          <dl className="flex flex-col gap-3">
            {overview.map(({ Icon, label, value }) => (
              <div
                key={label}
                className="flex items-start gap-3 border-b border-brand-black/20 pb-3 last:border-b-0 last:pb-0"
              >
                <Icon size={24} />
                <div className="flex flex-col gap-0.5 font-sans text-base leading-[1.4]">
                  <dt className="text-brand-black/60">{t(label)}</dt>
                  <dd className="font-medium">{t(value)}</dd>
                </div>
              </div>
            ))}
          </dl>
          <div id="apply-now" className="self-start">
            <ActionButton label={t("Apply now")} href={APPLY_HREF} variant="solid" />
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col gap-12">
          <Section title="About the role">
            <p className="font-sans text-base leading-[1.5] text-brand-black/80">{t(job.about)}</p>
          </Section>
          <Section title="Key responsibilities">
            <Bullets items={job.responsibilities} />
          </Section>
          <Section title="Requirements">
            <Bullets items={job.requirements} />
          </Section>
          <Section title="What we offer">
            <Bullets items={OFFER} />
          </Section>
        </div>
      </div>
    </section>
  );
}

function OtherRoles({ job }: { job: Job }) {
  const t = useT();
  const others = JOBS.filter((j) => j.slug !== job.slug).slice(0, 3);
  return (
    <section
      data-nav-theme="light"
      className="border-t border-brand-black/20 bg-brand-white px-6 pb-20 pt-16 text-brand-black md:px-16 md:pb-[120px] md:pt-20"
    >
      <div className="flex flex-col gap-10">
        <h2 className="font-serif font-light uppercase leading-[1.1] tracking-[-0.02em] [font-size:clamp(2.5rem,5vw,3.875rem)]">
          {t("Other open roles")}
        </h2>
        <div className="flex flex-col border-t border-brand-black [&>a:last-child]:border-b-0">
          {others.map((o) => (
            <JobRow key={o.slug} job={o} />
          ))}
        </div>
        <ActionButton label={t("View all careers")} href="/careers" className="self-start" />
      </div>
    </section>
  );
}

export default function CareerDetail({ job }: { job: Job }) {
  const t = useT();
  return (
    <>
      <CareerHero job={job} />
      <CareerStickyBar
        title={t(job.title)}
        applyHref={APPLY_HREF}
        targetId="apply-now"
      />
      <CareerBody job={job} />
      <ApplicationForm role={job.title} />
      <OtherRoles job={job} />
    </>
  );
}
