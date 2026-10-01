import { notFound } from "next/navigation";

import { SectionTitle } from "@/components/marketing/home/primitives";
import { CountUp } from "@/components/marketing/count-up";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { getServiceTheme } from "@/components/marketing/services/service-theme";
import { ServiceReveal } from "@/components/marketing/services/service-reveal";
import type {
  Engagement,
  EngagementBlock,
  EngagementMedia,
} from "@/data/engagements";
import { loadEngagements, relatedEngagements } from "@/lib/payload/engagements";

import {
  EngagementCard,
  EngagementMediaBox,
  FUNCTIONAL_STYLE,
  withAlpha,
} from "./engagement-card";
import { EngagementSidebar } from "./engagement-sidebar";

type Tone = { accent: string | null; story: boolean };

const BODY =
  "text-[clamp(1.125rem,calc(1.59*var(--vw)),1.5rem)] leading-[1.25] text-[var(--hll-dark-grey)]";
const MEDIA_KINDS = new Set<EngagementBlock["kind"]>(["media", "mediaGrid"]);

// Offsets inside the 1117px main column (Figma x 385–1502): labels at 636,
// body copy at 886 running 595px, media ending at 1482.
const LABEL_COL = "lg:pl-[22.47%]";
const TEXT_GRID = "grid gap-4 lg:grid-cols-[250fr_595fr_21fr] lg:gap-0";
const MEDIA_INSET = "lg:mr-[1.79%]";

/** "colour of subheading will be PRIMARY COLOR OF THE CLIENT/CASE STUDY". */
function Label({ children, tone }: { children: React.ReactNode; tone: Tone }) {
  return (
    <p
      data-fade-up
      className={`text-[12px] uppercase leading-[1.16] tracking-[0.25em] ${tone.story ? "font-medium" : ""}`}
      style={{ color: tone.accent ?? "var(--hll-dark-grey)" }}
    >
      {children}
    </p>
  );
}

function Paragraphs({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-[30px]">
      {paragraphs.map((p, i) => (
        <p key={i} className={BODY}>
          {p}
        </p>
      ))}
    </div>
  );
}

function TextRow({
  label,
  tone,
  children,
}: {
  label?: string;
  tone: Tone;
  children: React.ReactNode;
}) {
  return (
    <div className={`${LABEL_COL} ${TEXT_GRID}`}>
      <div>{label ? <Label tone={tone}>{label}</Label> : null}</div>
      <div>{children}</div>
    </div>
  );
}

/** Figma "Media Block": image / video, or the quote on the textured colour. */
function QuoteBlock({
  block,
  accent,
}: {
  block: Extract<EngagementBlock, { kind: "quote" }>;
  accent: string;
}) {
  return (
    <div
      data-service-media
      className="relative aspect-[1118/617] overflow-hidden rounded-lg"
    >
      {block.media?.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={block.media.src}
          alt=""
          className="absolute inset-0 size-full object-cover"
        />
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/engagements/quote-texture.webp"
            alt=""
            className="absolute inset-0 size-full object-cover grayscale"
          />
          <div
            className="absolute inset-0 mix-blend-color"
            style={{ background: accent }}
          />
          <div
            className="absolute inset-0 opacity-[0.34] mix-blend-hard-light"
            style={{ background: accent }}
          />
        </>
      )}
      <div className="absolute inset-x-0 top-[32.4%] pl-[22.47%] pr-[22%]">
        <blockquote className="text-[clamp(1.5rem,calc(2.38*var(--vw)),2.25rem)] leading-[1.16] text-[#FAFAFA]">
          {block.quote}
        </blockquote>
        {block.name || block.role ? (
          <p className="mt-[clamp(2rem,calc(9.26*var(--vw)),8.75rem)] text-[clamp(1rem,calc(1.32*var(--vw)),1.25rem)] leading-[1.25] text-black">
            {block.name}
            {block.role ? <span className="block">{block.role}</span> : null}
          </p>
        ) : null}
      </div>
    </div>
  );
}

/** Figma "media grid": each row shares one height, widths follow the images. */
function MediaGrid({ rows }: { rows: EngagementMedia[][] }) {
  return (
    <div className="space-y-2">
      {rows.map((row, r) => (
        <div key={r} className="flex gap-[10px]">
          {row.map((media, i) => {
            const ratio =
              media.width && media.height ? media.width / media.height : 1;
            return (
              <div key={i} className="min-w-0" style={{ flex: `${ratio} 1 0` }}>
                <EngagementMediaBox media={media} fallbackRatio={ratio} />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function Block({
  block,
  tone,
  isHero,
}: {
  block: EngagementBlock;
  tone: Tone;
  isHero: boolean;
}) {
  switch (block.kind) {
    case "media":
      return (
        <div className={isHero ? "" : MEDIA_INSET}>
          <EngagementMediaBox
            media={block.media}
            fallbackRatio={isHero ? 1117 / 617 : 1111 / 617}
          />
        </div>
      );
    case "quote":
      return <QuoteBlock block={block} accent={tone.accent ?? "#444444"} />;
    case "mediaGrid":
      return (
        <div className={MEDIA_INSET}>
          <MediaGrid rows={block.rows} />
        </div>
      );
    case "text":
      return (
        <div data-artifact-trigger={block.showsArtifact ? "" : undefined}>
          <TextRow label={block.label} tone={tone}>
            <Paragraphs paragraphs={block.paragraphs} />
          </TextRow>
        </div>
      );
    case "showcase":
      // "This section can be adapted to whatever the user needs: a demo
      // window, image/video, or text."
      return (
        <TextRow label={block.label} tone={tone}>
          {block.display === "media" && block.media ? (
            <EngagementMediaBox media={block.media} fallbackRatio={16 / 9} />
          ) : block.display === "demo" ? (
            <div
              data-service-media
              className="aspect-[1171/658] overflow-hidden rounded-lg bg-[var(--hll-light-grey)]"
            >
              {block.demoUrl ? (
                <iframe
                  src={block.demoUrl}
                  title={block.label}
                  className="size-full border-0"
                  loading="lazy"
                />
              ) : (
                <span className="grid size-full place-items-center text-[12px] uppercase tracking-[0.25em] text-black">
                  Demo window
                </span>
              )}
            </div>
          ) : (
            <Paragraphs paragraphs={block.paragraphs} />
          )}
        </TextRow>
      );
    case "outcome":
      return (
        <div
          className={`${LABEL_COL} grid gap-4 lg:grid-cols-[336fr_510fr_20fr] lg:gap-0`}
        >
          <div>
            <Label tone={tone}>{block.label}</Label>
          </div>
          <ul>
            {block.items.map((item, i) => (
              <li key={item.stat + item.text}>
                <div data-line className="h-px bg-[var(--hll-mid-grey)]" />
                {/* Figma: the first row sits level with the label (number
                    10px, copy 20px under the line); later rows 25 / 31px. */}
                <div
                  className={`grid grid-cols-[165fr_345fr] ${i < block.items.length - 1 ? "pb-[28px]" : ""} ${i === 0 ? "pt-[10px]" : "pt-[25px]"}`}
                >
                  <CountUp
                    value={item.stat}
                    className="pl-[6px] text-[clamp(2.5rem,calc(4.23*var(--vw)),4rem)] font-light leading-[1.16] text-black"
                  />
                  <p
                    className={`${i === 0 ? "pt-[10px]" : "pt-[6px]"} ${BODY}`}
                  >
                    {item.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
    case "team":
      return (
        <TextRow label={block.label} tone={tone}>
          <dl className="space-y-6">
            {block.rows.map((row) => (
              <div
                key={row.role}
                data-fade-up
                className="grid grid-cols-[375fr_220fr] gap-4"
              >
                <dt
                  className="text-[clamp(1rem,calc(1.32*var(--vw)),1.25rem)] leading-[1.25]"
                  style={{
                    color:
                      tone.story && tone.accent
                        ? tone.accent
                        : "var(--hll-mid-grey)",
                  }}
                >
                  {row.role}
                </dt>
                <dd className="text-[clamp(1rem,calc(1.32*var(--vw)),1.25rem)] leading-[1.25] text-[var(--hll-dark-grey)]">
                  {row.names.map((name) => (
                    <span key={name} className="block">
                      {name}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </TextRow>
      );
    case "learnings":
      return (
        <TextRow label={block.label} tone={tone}>
          <ol className="space-y-[30px]">
            {block.items.map((item, i) => (
              <li key={i} className="relative">
                <span
                  className="hll-label absolute -left-[25px] top-[3px] text-[12px] leading-[1.2] lg:block"
                  style={{
                    ...FUNCTIONAL_STYLE,
                    color: tone.accent ?? "var(--hll-dark-grey)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className={BODY}>{item}</p>
              </li>
            ))}
          </ol>
        </TextRow>
      );
  }
}

/**
 * Gaps from the templates: 64px from the hero, and between copy and media;
 * 8px between media; 154px between sections, which on a Story also get a
 * hairline with 84px under it.
 */
function Spacer({
  prev,
  cur,
  story,
  afterHero,
}: {
  prev: EngagementBlock;
  cur: EngagementBlock;
  story: boolean;
  afterHero: boolean;
}) {
  const media = MEDIA_KINDS.has(cur.kind);
  if (afterHero) return <div className="h-16" />;
  if (media)
    return <div className={MEDIA_KINDS.has(prev.kind) ? "h-2" : "h-16"} />;
  if (story && !MEDIA_KINDS.has(prev.kind)) {
    return (
      <div
        className={`py-[clamp(3rem,calc(6*var(--vw)),5.25rem)] lg:ml-px lg:pb-[84px] lg:pt-[154px] ${MEDIA_INSET}`}
      >
        <div data-line className="h-px bg-[var(--hll-mid-grey)]" />
      </div>
    );
  }
  return <div className="h-[clamp(5rem,calc(10.2*var(--vw)),9.625rem)]" />;
}

/**
 * Figma "Explore related engagements": a 611px band washing up from clear to
 * 70% of the colour. Case study: "gradient is according to the service
 * colour, all case studies in it will be of the same service". Story:
 * "gradient is based on the colours of this project".
 */
function RelatedBand({ items, color }: { items: Engagement[]; color: string }) {
  if (!items.length) return null;
  return (
    <section
      className="px-[10px] pb-[82px] pt-[65px]"
      style={{
        background: `linear-gradient(0deg, ${withAlpha(color, 0)}, ${withAlpha(color, 0.7)})`,
      }}
    >
      <div className="px-[20px]">
        <SectionTitle
          variant="engagement"
          fontSize="clamp(1.75rem, calc(2.38*var(--vw)), 2.25rem)"
          letterSpacing="0"
          lineHeight="1.16"
          ink="#000000"
          fontWeight={400}
        >
          Explore related engagements
        </SectionTitle>
      </div>
      <div className="mt-[64px] grid gap-[11px] sm:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} data-fade-up>
            <EngagementCard
              engagement={item}
              ratio={490 / 308}
              showYear={false}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

/** Figma Desktop › Case Study Template (1068:4964) / Engagement Story Template (1192:8048). */
export async function EngagementDetail({ slug }: { slug: string }) {
  const all = await loadEngagements();
  const engagement = all.find((e) => e.slug === slug);
  if (!engagement) notFound();

  const story = engagement.template === "story";
  const accent = engagement.primaryColor ?? null;
  const tone: Tone = { accent, story };
  const serviceColor = engagement.services[0]
    ? getServiceTheme(engagement.services[0]).accent
    : "#444444";
  const bandColor = story ? (accent ?? serviceColor) : serviceColor;
  const { blocks } = engagement;

  return (
    <MarketingShell markTint={accent ?? undefined}>
      <ServiceReveal>
        <div className="hll-home hll-service-page">
          <div className="lg:grid lg:grid-cols-[385fr_1127fr] lg:items-start">
            <EngagementSidebar engagement={engagement} accent={accent} />
            <div className="px-[clamp(1.25rem,calc(1.98*var(--vw)),1.875rem)] pb-[clamp(5rem,calc(10.2*var(--vw)),9.625rem)] pt-10 lg:pl-0 lg:pr-[10px] lg:pt-16">
              {blocks.map((block, i) => (
                <div key={block.id}>
                  {i > 0 ? (
                    <Spacer
                      prev={blocks[i - 1]}
                      cur={block}
                      story={story}
                      afterHero={i === 1}
                    />
                  ) : null}
                  <Block block={block} tone={tone} isHero={i === 0} />
                </div>
              ))}
            </div>
          </div>
          <RelatedBand
            items={relatedEngagements(engagement, all)}
            color={bandColor}
          />
        </div>
      </ServiceReveal>
    </MarketingShell>
  );
}
