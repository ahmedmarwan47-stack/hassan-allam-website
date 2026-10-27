import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { JOBS, OFFER, type Job } from "@/data/careers";
import JobRow from "./JobRow";
import {
  ArrowLeftIcon,
  ArrowUpRightIcon,
  BriefcaseIcon,
  CalendarIcon,
  ClockIcon,
  LocationIcon,
  MortarboardIcon,
} from "./icons";

function CareerHero({ job }: { job: Job }) {
  const meta = [
    { Icon: BriefcaseIcon, value: job.department },
    { Icon: LocationIcon, value: job.location },
    { Icon: ClockIcon, value: job.type },
    { Icon: CalendarIcon, value: `Posted ${job.posted}` },
  ];
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
          className="flex items-center gap-2 font-sans text-base font-medium text-brand-black transition-opacity duration-300 hover:opacity-60"
        >
          <ArrowLeftIcon size={20} />
          All Careers
        </Link>
        <h1 className="max-w-[1014px] font-serif font-light leading-none tracking-[-0.02em] text-brand-black [font-size:clamp(2.5rem,7vw,5.75rem)]">
          {job.title}
        </h1>
        <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3 font-sans text-base leading-[1.1] text-brand-black md:text-xl">
          {meta.map(({ Icon, value }) => (
            <li key={value} className="flex items-center gap-2">
              <Icon size={20} />
              {value}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal y={16} className="flex flex-col gap-5 border-t border-brand-black/20 pt-5">
      <h2 className="font-serif text-2xl font-medium leading-[1.2] tracking-[-0.01em] md:text-[1.75rem]">
        {title}
      </h2>
      {children}
    </Reveal>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="flex list-disc flex-col gap-2 pl-6 font-sans text-base leading-[1.5] text-brand-black/80">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function CareerBody({ job }: { job: Job }) {
  const overview = [
    { Icon: BriefcaseIcon, label: "Department", value: job.department },
    { Icon: LocationIcon, label: "Location", value: job.location },
    { Icon: ClockIcon, label: "Employment type", value: job.type },
    { Icon: MortarboardIcon, label: "Experience", value: job.experience },
    { Icon: CalendarIcon, label: "Posted", value: job.posted },
  ];
  return (
    <section
      data-nav-theme="light"
      className="bg-brand-white px-6 py-16 text-brand-black md:px-16 md:py-20"
    >
      <div className="mx-auto flex max-w-[1312px] flex-col gap-14 md:flex-row md:items-start md:gap-20">
        {/* Sidebar — sticks beside the description on desktop. */}
        <aside className="flex w-full flex-col gap-5 md:sticky md:top-28 md:w-[313px] md:shrink-0">
          <h2 className="font-serif text-2xl font-medium leading-[1.2] tracking-[-0.01em] md:text-[1.75rem]">
            Job overview
          </h2>
          <dl className="flex flex-col gap-3">
            {overview.map(({ Icon, label, value }) => (
              <div
                key={label}
                className="flex items-start gap-3 border-b border-brand-black/20 pb-3 last:border-b-0 last:pb-0"
              >
                <Icon size={24} />
                <div className="flex flex-col gap-0.5 font-sans text-base leading-[1.4]">
                  <dt className="text-brand-black/60">{label}</dt>
                  <dd className="font-medium">{value}</dd>
                </div>
              </div>
            ))}
          </dl>
          {/* Applications go through the contact form until a careers
              inbox / ATS is confirmed. */}
          <Link
            href="/contact"
            className="group relative flex h-[66px] items-center justify-center gap-2.5 overflow-hidden border border-brand-black bg-brand-black px-6 font-serif text-[1.625rem] uppercase leading-none tracking-[-0.02em] text-brand-white transition-colors duration-500 hover:text-brand-black"
          >
            <span
              aria-hidden
              className="absolute inset-0 translate-y-full bg-brand-white transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-y-0"
            />
            <span className="relative z-10">Apply now</span>
            <ArrowUpRightIcon size={24} className="relative z-10" />
          </Link>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col gap-12">
          <Reveal>
            <p className="max-w-[780px] font-serif font-light leading-[1.2] tracking-[-0.02em] [font-size:clamp(1.75rem,3.2vw,2.625rem)]">
              {job.lead}
            </p>
          </Reveal>
          <Section title="About the role">
            <p className="font-sans text-base leading-[1.5] text-brand-black/80">{job.about}</p>
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
  const others = JOBS.filter((j) => j.slug !== job.slug).slice(0, 3);
  return (
    <section
      data-nav-theme="light"
      className="border-t border-brand-black/20 bg-brand-white px-6 pb-20 pt-16 text-brand-black md:px-16 md:pb-[120px] md:pt-20"
    >
      <div className="mx-auto flex max-w-[1312px] flex-col gap-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="font-serif font-light leading-[1.1] tracking-[-0.02em] [font-size:clamp(2.5rem,5vw,3.875rem)]">
            Other open roles
          </h2>
          <Link
            href="/careers"
            className="flex items-center gap-2 pb-2 font-sans text-base font-medium transition-opacity duration-300 hover:opacity-60"
          >
            View all careers
            <ArrowUpRightIcon size={20} />
          </Link>
        </div>
        <div className="flex flex-col border-t border-brand-black">
          {others.map((o) => (
            <JobRow key={o.slug} job={o} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function CareerDetail({ job }: { job: Job }) {
  return (
    <>
      <CareerHero job={job} />
      <CareerBody job={job} />
      <OtherRoles job={job} />
    </>
  );
}
