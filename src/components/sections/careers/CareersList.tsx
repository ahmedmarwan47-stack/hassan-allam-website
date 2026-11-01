"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { DEPARTMENTS, JOBS, type Department } from "@/data/careers";
import JobRow from "./JobRow";
import FilterButton from "@/components/FilterButton";

type FilterValue = "all" | Department;

// Same secondary-button vocabulary as the FAQs filter bar.
export default function CareersList() {
  const [filter, setFilter] = useState<FilterValue>("all");
  const visible = filter === "all" ? JOBS : JOBS.filter((j) => j.department === filter);

  return (
    <section
      data-nav-theme="light"
      className="bg-brand-white px-6 pb-16 pt-16 text-brand-black md:px-16 md:pb-24 md:pt-20"
    >
      <div className="mx-auto flex max-w-[1080px] flex-col gap-10">
        {/* On large screens the pill bar sizes to its content and centres,
            even if it's wider than the list column. */}
        <Reveal className="lg:self-center">
          <div className="flex gap-3 overflow-x-auto pb-1 md:flex-wrap md:justify-center md:gap-4 md:pb-0 lg:w-max lg:flex-nowrap [-ms-overflow-style:none] [scrollbar-width:none]">
            <FilterButton label="All Roles" active={filter === "all"} onClick={() => setFilter("all")} />
            {DEPARTMENTS.map((dep) => (
              <FilterButton
                key={dep}
                label={dep}
                active={filter === dep}
                onClick={() => setFilter(dep)}
              />
            ))}
          </div>
        </Reveal>

        {/* Keyed on the filter so the stagger replays on every switch. */}
        <div key={filter} className="flex flex-col">
          {visible.map((job, i) => (
            <Reveal key={job.slug} delay={i * 0.06} y={16} className="[&:last-child_a]:border-b-0">
              <JobRow job={job} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
