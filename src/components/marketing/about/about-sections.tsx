import { ArrowUpRight, Plus } from "lucide-react";
import Link from "next/link";

import { HLLButton } from "@/components/hll";
import { BUTTON_MOBILE } from "@/components/marketing/button-sizes";
import { CountUp } from "@/components/marketing/count-up";
import { HomeHeading } from "@/components/marketing/home/primitives";
import { SERVICE_GUTTER } from "@/components/marketing/services/service-chrome";
import type { AboutPageData } from "@/data/about";

import { ReachMapEmbed } from "./reach-map-embed";

/** Figma "HLL": 198 × 264 portrait from 35% across, quote beside it.
 *  Mobile: a hairline, then a 245 × 253 portrait at x 79 with the quote
 *  indented under it (as the service Expert Voice). */
export function AboutLeaderSection({ data }: { data: AboutPageData["leader"] }) {
  return (
    <section className={`pt-[84px] lg:pt-[221px] ${SERVICE_GUTTER}`}>
      <div data-line className="-mx-3 mb-[84px] h-px bg-[var(--hll-mid-grey)] lg:hidden" />
      <HomeHeading eyebrow={data.eyebrow} title={data.title} />
      <div className="mt-[47px] grid gap-3 lg:ml-[34.5%] lg:mt-[-26px] lg:grid-cols-[198fr_721fr] lg:gap-[33px]">
        <div
          className="ml-[59px] aspect-[245/253] w-[245px] rounded-[6px] bg-[#D9D9D9] lg:ml-0 lg:aspect-[198/264] lg:w-[198px] lg:rounded-[4px]"
          style={data.portrait ? { background: `#D9D9D9 url(${data.portrait}) center / cover` } : undefined}
        />
        <blockquote className="ml-[55px] flex max-w-[311px] flex-col justify-between gap-6 lg:ml-0 lg:max-w-none lg:gap-8">
          <p className="text-[24px] leading-[27.8px] text-[var(--hll-dark-grey)] lg:text-[clamp(1.5rem,calc(2.38*var(--vw)),2.25rem)] lg:leading-[1.16]">
            &ldquo;{data.quote}&rdquo;
          </p>
          <footer className="text-[14px] leading-[1.25] text-black lg:text-[clamp(1rem,calc(1.32*var(--vw)),1.25rem)]">
            <cite className="block not-italic">{data.name}</cite>
            <span className="block">{data.role}</span>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}

/**
 * Our Reach: the design team's interactive map (offices, partners and the
 * work done in each place, see ReachMapEmbed), then the heading and numbers,
 * as in their approved About page.
 */
export function AboutReachSection({ data }: { data: AboutPageData["reach"] }) {
  return (
    // How we work ends with its own 154px; Figma puts the map 223px below
    // (mobile: 84px).
    <section className="-mt-[70px] lg:mt-0 lg:pt-[69px]">
      <div className="px-2 lg:px-[10px]">
        <ReachMapEmbed />
      </div>

      <div className="mt-8 flex flex-wrap items-start justify-between gap-3 px-4 lg:mt-[26px] lg:gap-8 lg:px-[10px] lg:pb-[29px]">
        <HomeHeading eyebrow={data.eyebrow} title={data.title} />
        {/* Figma About: a number with its label under it (96 / 30px on
            phones). Three stats since the 25 Oct canvas (4 Offices, 12+
            Countries, 150+ People deployed): from 640px they sit side by
            side (64 / 22px on tablets), so the map keeps its size. */}
        <div className="w-full space-y-3 sm:flex sm:gap-10 sm:space-y-0 lg:mr-[19px] lg:mt-[26px] lg:flex lg:w-auto lg:gap-[clamp(2rem,calc(4.2*var(--vw)),4.5rem)] lg:space-y-0">
          {data.stats.map((line) => {
            const [number, ...label] = line.split(" ");
            return (
              <div key={line} className="font-light text-black">
                <CountUp
                  value={number}
                  className="block text-[96px] leading-[128px] sm:text-[64px] sm:leading-[1.2] lg:text-[clamp(3rem,min(calc(5.3*var(--vw)),calc(9*var(--svh))),5rem)] lg:leading-[1.25]"
                />
                <p className="-mt-[18px] text-[30px] leading-[34.8px] sm:mt-0 sm:text-[22px] sm:leading-[1.16] lg:mt-0 lg:text-[clamp(1.125rem,calc(1.59*var(--vw)),1.5rem)] lg:leading-[1.16]">
                  {label.join(" ")}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * The Reach map with its project pins: on About, and on Contact as "the same
 * interactive map as the About page" (QA CT-02). The box fills its parent's
 * height on desktop where the parent gives it one (About fits it to a
 * screen), otherwise it keeps the map's shape.
 */
export function ReachMap({
  map,
  pins,
}: {
  map: string;
  pins: AboutPageData["reach"]["pins"];
}) {
  const data = { map, pins };
  // Mobile: a 386 × 551 crop of the same map, over the Americas (Figma image
  // fill x 2–26%, y 15–93%); the pins follow the crop.
  return (
    <div className="relative mx-[6px] aspect-[386/551] overflow-hidden rounded-lg bg-[#E6E6E6] lg:mx-0 lg:aspect-[1492/540] lg:h-full lg:max-h-[calc((100*var(--vw)-20px)*636/1492)] lg:max-w-full lg:[container-type:inline-size]">
      <div
        aria-hidden
        className="absolute inset-0 bg-[length:414.3%_127.6%] bg-[position:2.71%_69.1%] bg-no-repeat lg:hidden"
        style={{ backgroundImage: `url(${data.map})` }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={data.map} alt="" className="absolute inset-0 hidden size-full object-cover lg:block" />
      {data.pins.map((pin) => (
        <div
          key={pin.id}
          // Desktop: the map image covers the box from its centre, so a pin
          // sits at its share of the image's height (the box's width ×
          // 636/1492) less the half that is trimmed off the top.
          className="group absolute left-[calc((var(--pin-x)_-_0.0206)/0.2413*100%)] top-[calc((var(--pin-y)_-_0.1493)/0.784*100%)] lg:left-[calc(var(--pin-x)*100%)] lg:top-[calc(var(--pin-y)*100cqw*636/1492_-_(100cqw*636/1492_-_100%)/2)]"
          style={{ ["--pin-x" as string]: pin.x, ["--pin-y" as string]: pin.y }}
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
  className = "pt-[154px] lg:pt-[214px]",
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
        className="-mx-3 mt-8 aspect-[386/194] w-[calc(100%+24px)] max-w-none rounded-[6px] object-cover lg:mx-0 lg:ml-[24.5%] lg:mt-[84px] lg:aspect-[1096/551] lg:w-[75.5%] lg:rounded-none"
      />

      {/* Mobile: the numbers at x 51, the points at x 75, 18px apart. */}
      <div className="mt-8 grid gap-[37px] lg:ml-[41.7%] lg:mt-[67px] lg:grid-cols-[226fr_24fr_595fr] lg:gap-0">
        <p className="text-[10px] uppercase leading-[1.15] tracking-[0.25em] text-[var(--hll-dark-grey)] lg:text-[12px]">{data.label}</p>
        <ol className="space-y-[18px] lg:col-span-2 lg:grid lg:grid-cols-subgrid lg:space-y-[30px]">
          {data.points.map((point, i) => (
            <li key={point.id} className="flex gap-[9px] pl-[31px] lg:contents">
              <span className="hll-label block w-[15px] shrink-0 pt-[2px] text-[12px] leading-[1.2] text-black lg:pt-[3px]" style={{ fontFamily: "var(--hll-font-functional)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-[14px] leading-[1.25] text-[var(--hll-dark-grey)] lg:text-[clamp(1.125rem,calc(1.59*var(--vw)),1.5rem)]">
                <span className="text-black">{point.title}.</span> {point.body}
              </p>
            </li>
          ))}
        </ol>
      </div>

      {/* Phones set it on the section's left edge, in line with the heading. */}
      <div className="mt-[54px] lg:ml-[58.95%] lg:mt-[84px]">
        <HLLButton href={data.ctaHref} variant="about" size="md" className={BUTTON_MOBILE}>
          {data.ctaLabel}
        </HLLButton>
      </div>
    </section>
  );
}
