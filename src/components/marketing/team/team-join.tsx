import type { TeamPageContent } from "@/data/team-page";
import { gradientCss } from "@/components/hll/variants";

export function TeamJoinSection({ data }: { data: TeamPageContent["join"] }) {
  return (
    <section
      className="px-[clamp(1.25rem,4vw,3rem)] py-[clamp(2.5rem,6vw,4rem)]"
      style={{
        background: gradientCss(["#9AB4D3", "#A28DD7", "#AD7ECF"], 135),
      }}
    >
      <div className="mx-auto flex max-w-[90rem] flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h2
            className="font-light text-black"
            style={{ fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)" }}
          >
            {data.title}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-black/70">{data.description}</p>
        </div>
        <a
          href={data.ctaHref}
          className="inline-flex rounded-full border border-black/20 bg-white/70 px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-black/80 backdrop-blur-sm transition hover:bg-white"
        >
          {data.ctaLabel}
        </a>
      </div>
    </section>
  );
}
