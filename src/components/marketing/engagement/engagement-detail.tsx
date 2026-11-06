import { notFound } from "next/navigation";

import { SectionTitle } from "@/components/marketing/home/primitives";
import { CountUp } from "@/components/marketing/count-up";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { ServiceReveal } from "@/components/marketing/services/service-reveal";
import { serviceHref } from "@/components/hll/variants";
import { getServicePageByVariant } from "@/data/services";
import type {
  Engagement,
  EngagementBlock,
  EngagementMedia,
} from "@/data/engagements";
import { loadEngagements, relatedEngagements } from "@/lib/payload/engagements";
import { mapServiceToPage } from "@/lib/payload/marketing-mappers";
import { getServiceBySlug } from "@/lib/payload/queries";

import { EngagementArtSlot } from "./engagement-art";
import {
  EngagementCard,
  EngagementMediaBox,
  FUNCTIONAL_STYLE,
} from "./engagement-card";
import { EngagementSidebar, type SidebarService } from "./engagement-sidebar";

/** `text`: the client colour for text, or null where it's too light to read on white. */
type Tone = {
  accent: string | null;
  text: string | null;
  story: boolean;
  /** The quote's first sentence: the brand colour, or the artwork's theme
   *  colour when the brand colour is a grey (Lesielle's #202020). */
  highlight: string | null;
};

const BODY =
  "text-[14px] leading-[1.25] text-[var(--hll-dark-grey)] lg:text-[clamp(1.125rem,calc(1.59*var(--vw)),1.5rem)]";
const MEDIA_KINDS = new Set<EngagementBlock["kind"]>(["media", "mediaGrid"]);

// Offsets inside the 1117px main column (Figma x 385–1502): labels at 636,
// body copy at 886 running 595px, media ending at 1482. Mobile: text in the
// 20px gutter, media out to 8px from the edges.
const LABEL_COL = "lg:pl-[22.47%]";
const TEXT_GRID = "grid gap-4 lg:grid-cols-[250fr_595fr_21fr] lg:gap-0";
const MEDIA_INSET = "-mx-3 lg:mx-0 lg:mr-[1.79%]";

/** "colour of subheading will be PRIMARY COLOR OF THE CLIENT/CASE STUDY". */
function Label({ children, tone }: { children: React.ReactNode; tone: Tone }) {
  return (
    <p
      data-fade-up
      className={`text-[10px] uppercase leading-[1.16] tracking-[0.25em] lg:text-[12px] ${tone.story ? "font-medium" : ""}`}
      style={{ color: tone.text ?? "var(--hll-dark-grey)" }}
    >
      {children}
    </p>
  );
}

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
      {/* An empty label keeps its desktop column but takes no row on mobile. */}
      <div className={label ? undefined : "hidden lg:block"}>
        {label ? <Label tone={tone}>{label}</Label> : null}
      </div>
      <div>{children}</div>
    </div>
  );
}

/**
 * House of Katha's case study redesign (5 Nov): "Quote comes as its own
 * section within the page. The first sentence is highlighted in the main
 * brand colour." The attribution sits to the left of the quote.
 */
function QuoteSection({
  block,
  tone,
}: {
  block: Extract<EngagementBlock, { kind: "quote" }>;
  tone: Tone;
}) {
  const text = block.quote.trim().replace(/^[“"]|[”"]$/g, "");
  const cut = text.search(/[.!?](\s|$)/);
  const first = cut >= 0 ? text.slice(0, cut + 1) : text;
  const rest = cut >= 0 ? text.slice(cut + 1) : "";
  return (
    <figure className="grid grid-cols-[minmax(0,90px)_minmax(0,1fr)] gap-x-3 lg:grid-cols-[331fr_766fr_20fr] lg:gap-x-0">
      <figcaption className="pt-[3px] text-[12px] leading-[1.25] text-[var(--hll-dark-grey)] lg:pt-[6px] lg:text-[clamp(0.875rem,calc(0.99*var(--vw)),1rem)]">
        {block.role ? <span className="block">{block.role}</span> : null}
        {block.name ? <span className="block">{block.name}</span> : null}
      </figcaption>
      <blockquote className="text-[20px] leading-[1.16] text-[var(--hll-dark-grey)] lg:text-[clamp(1.5rem,calc(2.38*var(--vw)),2.25rem)]">
        &ldquo;<span style={{ color: tone.highlight ?? undefined }}>{first}</span>
        {rest}&rdquo;
      </blockquote>
    </figure>
  );
}

/** Figma "media grid": each row shares one height, widths follow the images.
 *  Mobile stacks every image full width, 10px apart. */
function MediaGrid({ rows }: { rows: EngagementMedia[][] }) {
  return (
    <div className="space-y-[10px] lg:space-y-2">
      {rows.map((row, r) => (
        <div key={r} className="flex flex-col gap-[10px] lg:flex-row">
          {row.map((media, i) => {
            const ratio =
              media.width && media.height ? media.width / media.height : 1;
            return (
              <div
                key={i}
                className="min-w-0 lg:[flex:var(--grow)_1_0]"
                style={{ ["--grow" as string]: ratio }}
              >
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
  art,
  client = "",
  mobile = false,
}: {
  block: EngagementBlock;
  tone: Tone;
  isHero: boolean;
  /** The handoff's live artwork, when the engagement has it. */
  art?: Engagement["art"];
  client?: string;
  /** The phone hero (in the sidebar). */
  mobile?: boolean;
}) {
  switch (block.kind) {
    case "media":
      if (isHero && art) {
        const slot = mobile ? "hero-mobile" : "hero-desktop";
        if (art.slots[slot]) {
          return <EngagementArtSlot art={art} slot={slot} alt={client} client={client} live={!mobile} />;
        }
      }
      return (
        <div className={isHero ? "" : MEDIA_INSET}>
          <EngagementMediaBox
            media={block.media}
            fallbackRatio={isHero ? 1117 / 617 : 1111 / 617}
          />
        </div>
      );
    case "quote":
      return <QuoteSection block={block} tone={tone} />;
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
          {block.display === "media" && art?.slots["feature-wide_1492x843"] ? (
            <EngagementArtSlot art={art} slot="feature-wide_1492x843" alt={client} client={client} />
          ) : block.display === "media" && block.media ? (
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
          className={`${LABEL_COL} grid gap-6 lg:grid-cols-[336fr_510fr_20fr] lg:gap-0`}
        >
          <div>
            <Label tone={tone}>{block.label}</Label>
          </div>
          {/* House of Katha's redesign (5 Nov): a stat that is a figure
              (30+, 65%, $5M) shows large beside its sentence; one in words
              ("Two paths", "Stabilised") drops the figure and keeps the
              sentence ("Up to 4" leads it). The two can mix in one block.
              Mobile: hairlines out to 8px from the edges. */}
          <ul className="-mx-3 lg:mx-0">
            {block.items.map((item, i) => {
              const figure = isFigure(item.stat);
              const sentence = figure
                ? item.text
                : /\d/.test(item.stat)
                  ? `${item.stat} ${item.text.charAt(0).toLowerCase()}${item.text.slice(1)}`
                  : item.text;
              return (
                <li key={item.stat + item.text}>
                  <div data-line className="h-px bg-[var(--hll-mid-grey)]" />
                  <div
                    className={`grid grid-cols-1 px-3 pt-[10px] lg:px-0 ${figure ? "lg:grid-cols-[165fr_345fr]" : "lg:pl-[13px] lg:pr-[17%]"} ${i < block.items.length - 1 ? "pb-4 lg:pb-[28px]" : ""} ${i === 0 ? "lg:pt-[10px]" : "lg:pt-[25px]"}`}
                  >
                    {figure ? (
                      <CountUp
                        value={item.stat}
                        className="min-w-0 pl-px text-[64px] font-light leading-[1.16] text-black lg:pl-[6px] lg:text-[clamp(2.5rem,calc(4.23*var(--vw)),4rem)]"
                      />
                    ) : null}
                    <p className={`min-w-0 ${figure ? "pt-[10px]" : ""} ${figure && i > 0 ? "lg:pt-[6px]" : ""} ${BODY}`}>
                      {sentence}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      );
    case "team":
      return (
        <TextRow label={block.label} tone={tone}>
          {/* Mobile: each role above its names, 12px between rows. */}
          <dl className="space-y-3 lg:space-y-6">
            {block.rows.map((row) => (
              <div
                key={row.role}
                data-fade-up
                className="grid grid-cols-1 lg:grid-cols-[375fr_220fr] lg:gap-4"
              >
                <dt
                  className="text-[14px] leading-[1.25] lg:text-[clamp(1rem,calc(1.32*var(--vw)),1.25rem)]"
                  style={{
                    color:
                      tone.story && tone.text
                        ? tone.text
                        : "var(--hll-mid-grey)",
                  }}
                >
                  {row.role}
                </dt>
                <dd className="text-[14px] leading-[1.25] text-[var(--hll-dark-grey)] lg:text-[clamp(1rem,calc(1.32*var(--vw)),1.25rem)]">
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
          <ol className="space-y-[18px] lg:space-y-[30px]">
            {block.items.map((item, i) => (
              <li key={i} className="relative">
                {/* Desktop hangs the number in the gutter; mobile has no
                    gutter, so it sits above its line. */}
                <span
                  className="hll-label mb-[6px] block text-[10px] leading-[1.2] lg:absolute lg:-left-[25px] lg:top-[3px] lg:mb-0 lg:text-[12px]"
                  style={{
                    ...FUNCTIONAL_STYLE,
                    color: tone.text ?? "var(--hll-dark-grey)",
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
  // Mobile shows the hero in the sidebar, so the first block here starts the
  // column; sections and media then sit 84px apart, media 10px apart.
  if (afterHero) return <div className="lg:h-16" />;
  if (media)
    return (
      <div className={MEDIA_KINDS.has(prev.kind) ? "h-[10px] lg:h-2" : "h-[84px] lg:h-16"} />
    );
  if (story && !MEDIA_KINDS.has(prev.kind)) {
    return (
      <div
        className={`py-[54px] lg:ml-px lg:pb-[84px] lg:pt-[154px] ${MEDIA_INSET}`}
      >
        <div data-line className="h-px bg-[var(--hll-mid-grey)]" />
      </div>
    );
  }
  return <div className="h-[84px] lg:h-[clamp(5rem,calc(10.2*var(--vw)),9.625rem)]" />;
}

/**
 * Figma "Explore related engagements": a 611px band, clear at the top and
 * 70% of the colour at the bottom (the Figma rectangle is rotated 180°, which
 * flips its fill; QA client review 21 Oct: it was upside down). Case study: "gradient is according to the service
 * colour, all case studies in it will be of the same service". Story:
 * "gradient is based on the colours of this project".
 */
function RelatedBand({ items }: { items: Engagement[] }) {
  if (!items.length) return null;
  // House of Katha's redesign (5 Nov): on the page's own background.
  return (
    <section data-related-band className="pb-12 pt-10 lg:px-[10px] lg:pb-[82px] lg:pt-[65px]">
      <div className="px-5 [--related-title:24px] lg:px-[20px] lg:[--related-title:clamp(1.75rem,calc(2.38*var(--vw)),2.25rem)]">
        <SectionTitle
          variant="engagement"
          fontSize="var(--related-title)"
          letterSpacing="0"
          lineHeight="1.16"
          ink="#000000"
          fontWeight={400}
        >
          Explore related engagements
        </SectionTitle>
      </div>
      {/* Mobile: the cards swipe, 289px wide, from the 20px gutter. Desktop:
          inset as the title, so both share a left and right edge. */}
      <div className="mt-8 flex snap-x snap-mandatory scroll-pl-5 gap-[10px] overflow-x-auto px-5 [scrollbar-width:none] lg:mt-[64px] lg:grid lg:grid-cols-3 lg:gap-[11px] lg:overflow-visible lg:px-[20px] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => (
          <div key={item.id} data-fade-up className="w-[289px] shrink-0 snap-start lg:w-auto">
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

/**
 * The client colour for text on the page's white, or null when it's too light
 * to read there (QA client review 21 Oct: Parrot Finance's neon labels): WCAG
 * contrast against #FAFAFA under 2.5. Keeps strong colours like KTM orange.
 */
function readableOnWhite(hex: string | null) {
  if (!hex || !/^#[0-9a-f]{6}$/i.test(hex)) return null;
  const channel = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  const n = parseInt(hex.slice(1), 16);
  const l = 0.2126 * channel((n >> 16) & 255) + 0.7152 * channel((n >> 8) & 255) + 0.0722 * channel(n & 255);
  const white = 0.955; // #FAFAFA
  return (white + 0.05) / (l + 0.05) >= 2.5 ? hex : null;
}

/** The most saturated #rrggbb in a palette (the artwork's theme colour). */
function themeColour(palette: readonly string[] | undefined) {
  const chroma = (hex: string) => {
    const n = parseInt(hex.slice(1), 16);
    const rgb = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    return Math.max(...rgb) - Math.min(...rgb);
  };
  const hexes = (palette ?? []).filter((c) => /^#[0-9a-f]{6}$/i.test(c));
  return hexes.length ? hexes.reduce((a, b) => (chroma(b) > chroma(a) ? b : a)) : null;
}

/** A stat that is a figure (30+, 65%, $5M, 4x, 3.2s) rather than words. */
function isFigure(stat: string) {
  return /^[~<>≈$€£₹]?\s*\d[\d.,]*\s*(%|\+|x|×|k|m|b|bn|s|ms|d|h|hrs?|days?|weeks?|months?|years?)?\+?$/i.test(stat.trim());
}

/** Relative brightness of a #rrggbb colour, 0 (black) to 1 (white). */
function luminance(hex: string) {
  const n = parseInt(hex.replace("#", "").slice(0, 6), 16);
  return (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
}

/**
 * The case study hero, House of Katha's revised design (Figma 127:8943,
 * 6 Nov): "Hero image with logo – hero image can be mockup, or a brand image.
 * Static ripples that match the brand's palette." The handoff's feature-wide
 * artwork (the mockups on the still ripple) with the client's white logo top
 * left; a client without a logo gets its name there instead.
 */
function HeroArt({
  engagement,
  heroBlock,
  tone,
}: {
  engagement: Engagement;
  heroBlock: EngagementBlock | null;
  tone: Tone;
}) {
  const art = engagement.art;
  const slot = "feature-wide_1492x843";
  if (art?.slots[slot]) {
    return (
      <EngagementArtSlot art={art} slot={slot} alt={engagement.client} client={engagement.client} still noText>
        {art.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={art.logo}
            alt={engagement.client}
            className="absolute left-[3.2%] top-[5.5%] h-[7%] w-auto max-w-[40%] object-contain object-left"
          />
        ) : (
          <p className="absolute left-[3.2%] top-[5.5%] m-0 max-w-[60%] text-[4.5cqw] font-medium leading-[1.15] text-white lg:text-[2.4cqw]">
            {engagement.client}
          </p>
        )}
      </EngagementArtSlot>
    );
  }
  return heroBlock ? (
    <Block block={heroBlock} tone={tone} isHero art={art} client={engagement.client} mobile />
  ) : null;
}

/**
 * The page's blocks under the hero, with the quote moved to follow the
 * opening run of text sections ("Quote comes as its own section within the
 * page", House of Katha, 5 Nov). The first image block becomes the hero.
 */
function arrange(blocks: EngagementBlock[]) {
  const heroBlock = blocks[0]?.kind === "media" ? blocks[0] : null;
  const body = heroBlock ? blocks.slice(1) : blocks;
  const quotes = body.filter((b) => b.kind === "quote");
  const rest: EngagementBlock[] = body.filter((b) => b.kind !== "quote");
  const isText = (b: EngagementBlock) => b.kind === "text" || b.kind === "showcase";
  let at = Math.max(0, rest.findIndex(isText));
  while (at < rest.length && isText(rest[at])) at++;
  rest.splice(at, 0, ...quotes);
  return { heroBlock, body: rest };
}

/** Figma Desktop › Case Study Template (1068:4964) / Engagement Story Template (1192:8048). */
export async function EngagementDetail({ slug }: { slug: string }) {
  const all = await loadEngagements();
  const engagement = all.find((e) => e.slug === slug);
  if (!engagement) notFound();

  const story = engagement.template === "story";
  // Ma'am's review 22 Oct: an engagement without a brand colour takes its
  // artwork's theme colour (the strongest in its ripple palette), not grey.
  const accent = engagement.primaryColor ?? themeColour(engagement.art?.ripple.palette) ?? null;
  const greyish = (hex: string | null) => {
    if (!hex || !/^#[0-9a-f]{6}$/i.test(hex)) return true;
    const n = parseInt(hex.slice(1), 16);
    const rgb = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    return Math.max(...rgb) - Math.min(...rgb) < 40;
  };
  const text = readableOnWhite(accent);
  // "The first sentence is highlighted in the main brand colour": the brand
  // colour, or where that's a grey (Lesielle's #202020) the artwork's main
  // colour, the first of its palette (Lesielle's red).
  const highlight =
    text && !greyish(text) ? text : readableOnWhite(engagement.art?.ripple.palette?.[0] ?? null) ?? text;
  const tone: Tone = { accent, text, story, highlight };
  const { heroBlock, body } = arrange(engagement.blocks);
  // "Service is listed in its own tab and leads you to the service page",
  // with the capability page's own headline under its name.
  const services: SidebarService[] = await Promise.all(
    engagement.services.map(async (variant) => {
      const page = getServicePageByVariant(variant);
      let tagline = page?.hero.headline ?? "";
      if (page) {
        try {
          tagline = mapServiceToPage(await getServiceBySlug(page.slug), page).hero.headline || tagline;
        } catch {
          // the static headline stays
        }
      }
      return { variant, href: serviceHref(variant), tagline };
    }),
  );
  const hero = <HeroArt engagement={engagement} heroBlock={heroBlock} tone={tone} />;

  return (
    // The header mark takes the client colour, unless that's too light to
    // see on the white Nav Bar (pale brand colours from the handoff).
    <MarketingShell markTint={accent && luminance(accent) < 0.7 ? accent : undefined}>
      <ServiceReveal>
        <div className="hll-home hll-service-page">
          {/* House of Katha's revised design (6 Nov): the sticky sidebar and
              the hero side by side at the top, the page's sections under
              the hero. */}
          <div className="lg:mt-[clamp(1.5rem,calc(2.65*var(--vw)),2.5rem)] lg:grid lg:grid-cols-[385fr_1127fr] lg:items-start">
            <EngagementSidebar
              engagement={engagement}
              services={services}
              palette={engagement.art?.ripple.palette}
              mobileHero={hero}
            />
            <div
              className={`px-[clamp(1.25rem,calc(1.98*var(--vw)),1.875rem)] pb-[154px] lg:pb-[clamp(5rem,calc(10.2*var(--vw)),9.625rem)] lg:pl-0 lg:pr-[10px] lg:pt-0 ${story ? "pt-[139px]" : "pt-[154px]"}`}
            >
              <div className="mb-[clamp(4rem,calc(8.6*var(--vw)),8.125rem)] hidden lg:block">{hero}</div>
              {body.map((block, i) => (
                <div key={block.id}>
                  {i > 0 ? (
                    <Spacer prev={body[i - 1]} cur={block} story={story} afterHero={false} />
                  ) : null}
                  <Block block={block} tone={tone} isHero={false} art={engagement.art} client={engagement.client} />
                </div>
              ))}
            </div>
          </div>
          <RelatedBand items={relatedEngagements(engagement, all)} />
        </div>
      </ServiceReveal>
    </MarketingShell>
  );
}
