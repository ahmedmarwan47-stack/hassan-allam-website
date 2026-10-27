import Link from "next/link";
import type { Job } from "@/data/careers";
import { ArrowUpRightIcon, BriefcaseIcon, ClockIcon, LocationIcon } from "./icons";

/**
 * One listing row — Figma "Job row" (17135:1343). The arrow box fills black
 * on hover (the component's Hover variant). The last row in a list drops its
 * bottom border, per the client's audit of the careers pages.
 */
export default function JobRow({ job }: { job: Job }) {
  return (
    <Link
      href={`/careers/${job.slug}`}
      className="group flex items-center justify-between gap-6 border-b border-brand-black py-6 last:border-b-0 md:py-7"
    >
      <div className="flex min-w-0 flex-col gap-3">
        <h3 className="font-serif text-xl font-medium leading-[1.2] tracking-[-0.01em] text-brand-black md:text-[1.75rem]">
          {job.title}
        </h3>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 font-sans text-sm leading-[1.5] text-brand-black/80 md:text-base">
          <li className="flex items-center gap-2">
            <BriefcaseIcon size={18} />
            {job.department}
          </li>
          <li className="flex items-center gap-2">
            <LocationIcon size={18} />
            {job.location}
          </li>
          <li className="flex items-center gap-2">
            <ClockIcon size={18} />
            {job.type}
          </li>
        </ul>
      </div>
      <span className="flex size-[42px] shrink-0 items-center justify-center border border-brand-black text-brand-black transition-[background-color,color] duration-300 ease-out group-hover:bg-brand-black group-hover:text-brand-white">
        <ArrowUpRightIcon size={20} />
      </span>
    </Link>
  );
}
