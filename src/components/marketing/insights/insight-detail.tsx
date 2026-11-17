import { notFound } from "next/navigation";

import { RichText } from "@payloadcms/richtext-lexical/react";

import { GradientRevealTextSlow } from "@/components/hll";
import { RevealRoot } from "@/components/hll/reveal/reveal-root";
import { CountUp } from "@/components/marketing/count-up";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { SERVICE_GUTTER } from "@/components/marketing/services/service-chrome";
import {
  formatInsightDate,
  loadInsights,
  relatedInsights,
  type InsightBlock,
  type InsightStat,
} from "@/lib/payload/insights";

import { EngagementMediaBox, FUNCTIONAL_STYLE } from "../engagement/engagement-card";

import { InsightCarousel, InsightTags } from "./insight-card";

const INK = "text-[#1E1E1E]";
const BODY =
  "text-[16px] leading-[1.25] text-[var(--hll-dark-grey)] lg:text-[clamp(1.125rem,calc(1.59*var(--vw)),1.5rem)]";
// Offsets on the 1452px inner width: labels at 30, body copy and quotes from 415 (385px label column), 755px wide.
const TEXT_GRID = "grid gap-4 lg:grid-cols-[385fr_755fr_312fr] lg:gap-0";
const LABEL =
  "text-[24px] leading-[1.16] text-[var(--hll-dark-grey)] lg:text-[clamp(1.5rem,calc(2.38*var(--vw)),2.25rem)]";

function Paragraphs({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-[18px] lg:space-y-[30px]">
      {paragraphs.map((p, i) => (
        <p key={i} className={BODY}>
          {p}
        </p>
      ))}
    </div>
  );
}

function TextRow({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className={TEXT_GRID}>
      <div className={label ? undefined : "hidden lg:block"}>
        {label ? (
          <h2 data-fade-up className={LABEL}>
            {label}
          </h2>
        ) : null}
      </div>
      <div data-fade-up>{children}</div>
    </div>
  );
}

/** The quote's first sentence and the rest, for the highlight. */
function splitQuote(quote: string) {
  const text = quote.trim().replace(/^[“"]|[”"]$/g, "");
  const cut = text.search(/[.!?](\s|$)/);
  return cut >= 0 ? [text.slice(0, cut + 1), text.slice(cut + 1)] : [text, ""];
}

/** Stat rows: the figure, its sentence, hairlines between. */
function Stats({ items, light = false }: { items: InsightStat[]; light?: boolean }) {
  return (
    <ul className="max-w-[590px]">
      {items.map((item, i) => (
        <li key={`${item.stat}-${i}`}>
          {i > 0 ? (
            <div data-line className={`my-6 h-px lg:my-[30px] ${light ? "bg-white/40" : "bg-[var(--hll-mid-grey)]"}`} />
          ) : null}
          <div className="grid grid-cols-[minmax(0,110px)_minmax(0,1fr)] items-start gap-4 lg:grid-cols-[159fr_431fr] lg:gap-0">
            <CountUp
              value={item.stat}
              className={`min-w-0 text-[40px] font-light leading-[1.16] lg:text-[clamp(2.5rem,calc(4.23*var(--vw)),4rem)] ${light ? "text-white" : "text-black"}`}
            />
            <p
              className={`min-w-0 pt-1 text-[16px] leading-[1.25] lg:pt-[6px] lg:text-[clamp(1.125rem,calc(1.59*var(--vw)),1.5rem)] ${light ? "text-white" : "text-[var(--hll-dark-grey)]"}`}
            >
              {item.text}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

/** An open box (quote, demo tool or outcome cards, colour changeable): 1452 × 771, quote centred in white, attribution bottom left. */
function ColourBox({ block }: { block: Extract<InsightBlock, { kind: "box" }> }) {
  return (
    <div
      data-reveal-media
      className="relative flex min-h-[420px] flex-col overflow-hidden rounded-lg px-5 py-8 text-white lg:aspect-[1452/771] lg:min-h-0 lg:px-[36px] lg:py-[44px]"
      style={{ backgroundColor: block.colour }}
    >
      <div className="flex flex-1 items-center justify-center">
        {block.content === "quote" && block.quote ? (
          <blockquote className="max-w-[920px] text-center text-[24px] leading-[1.16] lg:text-[clamp(1.75rem,calc(3.17*var(--vw)),3rem)]">
            {/* One text node, so the word reveal can take it. */}
            {`“${block.quote.trim().replace(/^[“"]|[”"]$/g, "")}”`}
          </blockquote>
        ) : block.content === "demo" ? (
          <div className="aspect-[16/9] w-full max-w-[1100px] overflow-hidden rounded-lg bg-white/90">
            {block.demoUrl ? (
              <iframe src={block.demoUrl} title="Demo" className="size-full border-0" loading="lazy" />
            ) : (
              <span className="grid size-full place-items-center text-[12px] uppercase tracking-[0.25em] text-black">
                Demo window
              </span>
            )}
          </div>
        ) : block.content === "outcomes" && block.items.length ? (
          <ul className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {block.items.map((item, i) => (
              <li key={`${item.stat}-${i}`} className="rounded-lg bg-white/15 p-5 lg:p-[30px]">
                <CountUp
                  value={item.stat}
                  className="block text-[40px] font-light leading-[1.16] lg:text-[clamp(2.5rem,calc(4.23*var(--vw)),4rem)]"
                />
                <p className="mt-3 text-[14px] leading-[1.25] lg:text-[clamp(0.875rem,calc(1.32*var(--vw)),1.25rem)]">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      {block.content === "quote" && (block.name || block.role) ? (
        <p className="mt-8 text-[12px] leading-[1.35] lg:mt-0 lg:text-[clamp(0.875rem,calc(1.06*var(--vw)),1rem)]">
          {block.name ? <span className="block font-medium">{block.name}</span> : null}
          {block.role ? <span className="block opacity-80">{block.role}</span> : null}
        </p>
      ) : null}
    </div>
  );
}

function Block({ block }: { block: InsightBlock }) {
  switch (block.kind) {
    case "text":
      return (
        <TextRow label={block.label}>
          <Paragraphs paragraphs={block.paragraphs} />
        </TextRow>
      );
    case "stats":
      return (
        <TextRow label={block.label}>
          <Stats items={block.items} />
        </TextRow>
      );
    case "media":
      // 8px further in than the page, 1430 ×695.
      return (
        <div data-reveal-media className="-mx-3 lg:mx-2">
          <EngagementMediaBox media={block.media} fallbackRatio={1430 / 695} className="lg:!aspect-[1430/695]" />
        </div>
      );
    case "quote": {
      // 64px, the first sentence in colour, from the body column.
      const [first, rest] = splitQuote(block.quote);
      return (
        <figure className={TEXT_GRID}>
          <div className="hidden lg:block" />
          <div className="lg:col-span-2 lg:max-w-[870px]">
            <blockquote
              data-fade-up
              className="text-[28px] font-light leading-[1.16] text-[var(--hll-dark-grey)] lg:text-[clamp(2rem,calc(4.23*var(--vw)),4rem)]"
            >
              &ldquo;<span style={{ color: block.colour }}>{first}</span>
              {rest}&rdquo;
            </blockquote>
            {block.role || block.name ? (
              <figcaption className="mt-8 text-[12px] leading-[1.35] text-[var(--hll-dark-grey)] lg:mt-[70px] lg:text-[clamp(0.875rem,calc(1.06*var(--vw)),1rem)]">
                {block.role ? <span className="block">{block.role}</span> : null}
                {block.name ? <span className="block">{block.name}</span> : null}
              </figcaption>
            ) : null}
          </div>
        </figure>
      );
    }
    case "box":
      return <ColourBox block={block} />;
  }
}

export async function InsightDetail({ slug }: { slug: string }) {
  const all = await loadInsights();
  const insight = all.find((i) => i.slug === slug);
  if (!insight) notFound();
  const related = relatedInsights(insight, all);
  const date = formatInsightDate(insight.date);

  return (
    <MarketingShell>
      <RevealRoot skip=".hll-display, .hll-label">
        <article className={`hll-home hll-service-page ${SERVICE_GUTTER}`}>
          {/* Headline in Regular (400), byline in Light (300). */}
          <header className="pt-[311px] lg:pt-[clamp(8rem,calc(23.2*var(--vw)),21.9rem)]">
            <h1 className={INK}>
              <GradientRevealTextSlow
                text={insight.title}
                variant="engagement"
                className="block"
                fontWeight={400}
                fontSize="clamp(30px, calc(4.23*var(--vw)), 4rem)"
                letterSpacing="0"
                lineHeight="1.16"
              />
              {insight.byline ? (
                <span className="block text-[30px] font-light leading-[1.16] lg:text-[clamp(30px,calc(4.23*var(--vw)),4rem)]">
                  {insight.byline}
                </span>
              ) : null}
            </h1>
            <InsightTags tags={insight.tags} outlined className="mt-3" />
            {insight.author || date ? (
              <div className="mt-10 flex items-center gap-4 lg:mt-[61px] lg:gap-5 lg:pl-[6px]">
                {insight.author ? (
                  <span
                    className="size-10 shrink-0 rounded-full bg-[#D9D9D9] bg-cover bg-center"
                    style={insight.author.photo ? { backgroundImage: `url(${insight.author.photo})` } : undefined}
                  />
                ) : null}
                <span>
                  {insight.author ? (
                    <span className={`block text-[20px] leading-[1.16] lg:text-[24px] ${INK}`}>{insight.author.name}</span>
                  ) : null}
                  {date ? (
                    <span
                      className="hll-label mt-[6px] block text-[10px] uppercase leading-[1.2] text-black"
                      style={FUNCTIONAL_STYLE}
                    >
                      {date}
                    </span>
                  ) : null}
                </span>
              </div>
            ) : null}
          </header>

          <div data-reveal-media className="-mx-3 mt-8 lg:mx-0 lg:mt-[33px]">
            <EngagementMediaBox
              media={insight.cover}
              fallbackRatio={1452 / 982}
              className="!aspect-[343/260] lg:!aspect-[1452/982]"
            />
          </div>

          {/* A dynamic grid of content blocks after the hero, 154px apart. */}
          <div className="space-y-[84px] pt-[84px] lg:space-y-[clamp(5rem,calc(10.2*var(--vw)),9.625rem)] lg:pt-[clamp(5rem,calc(10.2*var(--vw)),9.625rem)]">
            {insight.intro ? (
              <TextRow>
                <div className="[&_p+p]:mt-[18px] [&_p]:text-[16px] [&_p]:leading-[1.25] [&_p]:text-[var(--hll-dark-grey)] lg:[&_p+p]:mt-[30px] lg:[&_p]:text-[clamp(1.125rem,calc(1.59*var(--vw)),1.5rem)]">
                  <RichText data={insight.intro} />
                </div>
              </TextRow>
            ) : null}
            {insight.blocks.map((block) => (
              <Block key={block.id} block={block} />
            ))}
          </div>
        </article>

        {related.length ? (
          <section className="pt-[84px] lg:pt-[clamp(5rem,calc(10.2*var(--vw)),9.625rem)]">
            <h2
              className={`text-[24px] leading-[1.16] text-black lg:text-[clamp(1.75rem,calc(2.38*var(--vw)),2.25rem)] ${SERVICE_GUTTER}`}
            >
              Related Articles
            </h2>
            <div className="mt-8 lg:mt-[53px]">
              <InsightCarousel items={related} />
            </div>
          </section>
        ) : null}
        <div className="h-[154px] lg:h-[clamp(8rem,calc(16.9*var(--vw)),16rem)]" />
      </RevealRoot>
    </MarketingShell>
  );
}
