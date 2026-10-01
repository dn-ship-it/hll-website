import {
  GradientRevealTextNormal,
  HLLOutlineButton,
  type HLLVariant,
} from "@/components/hll";

/** Light grey content placeholder — swap for CMS media when finalized. */
export function MediaPlaceholder({
  className = "",
  label,
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-[#e3e3e3] ${className}`}
      data-service-media
      aria-hidden={!label}
      aria-label={label}
    >
      {label ? (
        <span className="absolute left-3 top-3 text-[10px] uppercase tracking-widest text-black/25">
          {label}
        </span>
      ) : null}
    </div>
  );
}

export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-black/45">
      {children}
    </p>
  );
}

/**
 * Section headings run the demo's 600ms sweep reveal, held until the heading
 * scrolls into view. `children` stays a ReactNode for call-site convenience,
 * but the reveal needs the plain string it animates, so anything richer falls
 * back to a static heading.
 */
export function SectionTitle({
  children,
  variant = "hll-ai",
  fontSize = "clamp(1.5rem, calc(3*var(--vw)), 2rem)",
  className: extraClassName = "mt-2 font-normal tracking-tight text-black",
  ink,
  letterSpacing = "-0.01em",
  lineHeight,
  fontWeight,
}: {
  children: React.ReactNode;
  variant?: HLLVariant;
  fontSize?: string;
  className?: string;
  /** Final text colour; the reveal paints its letters with this, not `color`. */
  ink?: string;
  letterSpacing?: string;
  lineHeight?: string;
  fontWeight?: number;
}) {
  const className = `text-[length:var(--section-title-size)] ${extraClassName}`;

  if (typeof children !== "string") {
    return (
      <h2 className={className} style={{ ["--section-title-size" as string]: fontSize }}>
        {children}
      </h2>
    );
  }

  return (
    <GradientRevealTextNormal
      as="h2"
      text={children}
      variant={variant}
      playOnView
      className={extraClassName}
      fontSize={fontSize}
      letterSpacing={letterSpacing}
      lineHeight={lineHeight}
      fontWeight={fontWeight}
      ink={ink}
    />
  );
}

/**
 * The site's CTA affordance is the demo's outline button: same uppercase,
 * letter-spaced label in a hairline pill that blooms into the variant's
 * gradient border under the cursor.
 */
export function OutlinePillButton({
  href,
  variant = "hll-ai",
  children,
}: {
  href?: string;
  variant?: HLLVariant;
  children: React.ReactNode;
}) {
  return (
    <HLLOutlineButton href={href} variant={variant}>
      {children}
    </HLLOutlineButton>
  );
}

/** Page gutter from the Figma home frame: 30px at 1512px. */
export const HOME_GUTTER = "px-[clamp(1.25rem,calc(1.98*var(--vw)),1.875rem)]";

/**
 * Figma home section heading: Functional eyebrow, then a 64px light title 12px
 * below. Mobile frames set it at 10px and 30px, 6px apart.
 */
export function HomeHeading({
  eyebrow,
  title,
  tone = "light",
  eyebrowColor,
  eyebrowMedium = false,
}: {
  eyebrow: string;
  title: string;
  /** "dark" sits on an image or colour band. */
  tone?: "light" | "dark";
  eyebrowColor?: string;
  /** Industry pages set their coloured eyebrows at weight 500. */
  eyebrowMedium?: boolean;
}) {
  const ink = tone === "dark" ? "#FAFAFA" : "#1A1A1A";
  return (
    <div>
      <p
        className={`hll-label text-[10px] uppercase leading-[1.2] lg:text-[12px] ${eyebrowMedium ? "font-medium" : ""}`}
        style={{ color: eyebrowColor ?? ink, fontFamily: "var(--hll-font-functional)" }}
      >
        {/* "Industry  Healthcare": Figma sets two-part eyebrows 14px apart. */}
        {eyebrow.split(/:\s*|\s{2,}/).map((part, i) => (
          <span key={part} className={i > 0 ? "ml-[14px]" : undefined}>
            {part}
          </span>
        ))}
      </p>
      <SectionTitle
        fontSize="clamp(30px, calc(4.23*var(--vw)), 4rem)"
        letterSpacing="0"
        lineHeight="1.16"
        ink={ink}
        className="hll-display mt-[6px] font-light lg:mt-[12px]"
      >
        {title}
      </SectionTitle>
    </div>
  );
}
