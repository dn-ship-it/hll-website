import { ArrowUpRight, Plus } from "lucide-react";
import Link from "next/link";

import { HLLButton } from "@/components/hll";
import { CountUp } from "@/components/marketing/count-up";
import { HomeHeading } from "@/components/marketing/home/primitives";
import { SERVICE_GUTTER } from "@/components/marketing/services/service-chrome";
import type { AboutPageData } from "@/data/about";

/** Figma "HLL": 198 × 264 portrait from 35% across, quote beside it. */
export function AboutLeaderSection({ data }: { data: AboutPageData["leader"] }) {
  return (
    <section className={`pt-[221px] ${SERVICE_GUTTER}`}>
      <HomeHeading eyebrow={data.eyebrow} title={data.title} />
      <div className="mt-[-26px] grid gap-8 lg:ml-[34.5%] lg:grid-cols-[198fr_721fr] lg:gap-[33px]">
        <div
          className="aspect-[198/264] w-[198px] rounded-[4px] bg-[#D9D9D9]"
          style={data.portrait ? { background: `#D9D9D9 url(${data.portrait}) center / cover` } : undefined}
        />
        <blockquote className="flex flex-col justify-between gap-8">
          <p className="text-[clamp(1.5rem,2.38vw,2.25rem)] leading-[1.16] text-[var(--hll-dark-grey)]">
            &ldquo;{data.quote}&rdquo;
          </p>
          <footer className="text-[clamp(1rem,1.32vw,1.25rem)] leading-[1.25] text-black">
            <cite className="block not-italic">{data.name}</cite>
            <span className="block">{data.role}</span>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}

/**
 * Figma "Interactive Map": "The map shows where projects are located.
 * Clicking a project opens its case study. 2 projects are always shown with
 * the redirect-link state. Other projects start as a + icon and expand to the
 * redirect-link state on hover."
 */
export function AboutReachSection({ data }: { data: AboutPageData["reach"] }) {
  return (
    // How we work ends with its own 154px; Figma puts the map 223px below.
    <section className="pt-[69px]">
      <div className="relative mx-[10px] aspect-[1492/636] overflow-hidden rounded-lg bg-[#E6E6E6]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={data.map} alt="" className="absolute inset-0 size-full object-cover" />
        {data.pins.map((pin) => (
          <div
            key={pin.id}
            className="group absolute"
            style={{ left: `${pin.x * 100}%`, top: `${pin.y * 100}%` }}
          >
            {pin.title ? (
              <PinCard pin={pin} />
            ) : (
              <span className="grid size-[30px] place-items-center rounded-[4px] bg-white text-[var(--hll-dark-grey)]">
                <Plus className="size-[15px]" strokeWidth={1.2} aria-hidden />
                <span className="sr-only">Project</span>
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-[26px] flex flex-wrap items-start justify-between gap-8 px-[10px] pb-[29px]">
        <HomeHeading eyebrow={data.eyebrow} title={data.title} />
        <p className="text-[clamp(3rem,6.35vw,6rem)] font-light leading-[1.33] text-black lg:mr-[19px] lg:mt-[26px] lg:w-[592px]">
          {data.stats.map((line) => (
            <span key={line} className="block">
              {/* Figma: "Number counter". */}
              <CountUp value={line} />
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}

function PinCard({ pin }: { pin: AboutPageData["reach"]["pins"][number] }) {
  return (
    <Link href={pin.href ?? "/engagement"} className="relative block -translate-y-full">
      <span className="flex h-11 items-center gap-[6px] rounded-[4px] bg-[#E6E6E6] py-[7px] pl-[10px] pr-[8px]">
        <span>
          <span className="block whitespace-nowrap text-[12px] leading-[1.25] text-black">{pin.title}</span>
          <span className="hll-label block text-[8px] uppercase leading-[1.2] text-black" style={{ fontFamily: "var(--hll-font-functional)" }}>
            {pin.location}
          </span>
        </span>
        <span className="grid size-[30px] place-items-center rounded-[4px] bg-white">
          <ArrowUpRight className="size-[13px]" strokeWidth={1.4} aria-hidden />
        </span>
      </span>
      {/* The pointer under the card, 8px in from its left edge. */}
      <span aria-hidden className="absolute left-2 top-full h-[11px] w-[17px] bg-[#E6E6E6] [clip-path:polygon(0_0,100%_0,0_100%)]" />
    </Link>
  );
}

/** Figma "Careers": 1096 × 551 image, "why work at HLL?" with numbered points. */
export function AboutCareersSection({
  data,
  className = "pt-[214px]",
}: {
  data: AboutPageData["careers"];
  className?: string;
}) {
  return (
    <section className={`pb-[84px] ${className} ${SERVICE_GUTTER}`}>
      <HomeHeading eyebrow={data.eyebrow} title={data.title} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={data.image}
        alt=""
        className="mt-[84px] aspect-[1096/551] w-full object-cover lg:ml-[24.5%] lg:w-[75.5%]"
      />

      <div className="mt-[67px] grid gap-6 lg:ml-[41.7%] lg:grid-cols-[226fr_24fr_595fr] lg:gap-0">
        <p className="text-[12px] uppercase leading-[1.15] tracking-[0.25em] text-[var(--hll-dark-grey)]">{data.label}</p>
        <ol className="space-y-[30px] lg:col-span-2 lg:grid lg:grid-cols-subgrid">
          {data.points.map((point, i) => (
            <li key={point.id} className="contents">
              <span className="hll-label hidden pt-[3px] text-[12px] leading-[1.2] text-black lg:block" style={{ fontFamily: "var(--hll-font-functional)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-[clamp(1.125rem,1.59vw,1.5rem)] leading-[1.25] text-[var(--hll-dark-grey)]">
                <span className="text-black">{point.title}.</span> {point.body}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-[84px] lg:ml-[58.95%]">
        <HLLButton href={data.ctaHref} variant="about" size="md">
          {data.ctaLabel}
        </HLLButton>
      </div>
    </section>
  );
}
