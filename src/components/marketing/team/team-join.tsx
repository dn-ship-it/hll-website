import Link from "next/link";
import type { TeamPageContent } from "@/data/team-page";

const REASONS = [
  "Work on platforms and products used by leading enterprises.",
  "Build across the stack with mentorship and ownership.",
  "Collaborate through open communication and visible progress.",
  "Join a global team with local accountability.",
];

export function TeamJoinSection({ data }: { data: TeamPageContent["join"] }) {
  return (
    <section className="hll-team-section border-t border-[#d9d9d9] px-[30px] pb-[8rem] pt-[5rem]">
      <p className="hll-team-label text-[12px] uppercase text-[#1a1a1a]">About</p>
      <h2 className="hll-team-display mt-[14px] text-[clamp(2rem,4.25vw,4rem)] leading-none text-[#1a1a1a]">
        Careers
      </h2>

      <div className="mt-[84px] grid grid-cols-1 md:grid-cols-12">
        <div
          aria-hidden="true"
          className="aspect-[1.99/1] w-full rounded-lg bg-[#d9d9d9] md:col-span-9 md:col-start-4"
        />
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-12">
        <p className="hll-team-display text-[12px] uppercase tracking-[3px] md:col-span-4 md:col-start-6">
          Why work at HLL?
        </p>
        <div className="md:col-span-5 md:col-start-8">
          <ol className="space-y-5">
            {REASONS.map((reason, index) => (
              <li key={reason} className="grid grid-cols-[2.5rem_1fr] gap-3">
                <span className="hll-team-label text-[12px]">{String(index + 1).padStart(2, "0")}</span>
                <p className="hll-team-display text-[16px] leading-[1.25] text-[#1a1a1a]">{reason}</p>
              </li>
            ))}
          </ol>
          <Link
            href={data.ctaHref}
            className="hll-team-label mt-8 inline-flex items-center justify-center rounded-[4px] bg-[#e6e6e6] px-[21px] py-[11px] text-[12px] uppercase tracking-[3px] text-[#1a1a1a] transition-colors hover:bg-[#d9d9d9] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#949494]"
          >
            View all careers
          </Link>
        </div>
      </div>
    </section>
  );
}
