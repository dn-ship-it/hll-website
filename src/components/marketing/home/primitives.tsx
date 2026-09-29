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
  fontSize = "clamp(1.5rem, 3vw, 2rem)",
  className: extraClassName = "mt-2 font-normal tracking-tight text-black",
  ink,
  letterSpacing = "-0.01em",
  lineHeight,
}: {
  children: React.ReactNode;
  variant?: HLLVariant;
  fontSize?: string;
  className?: string;
  /** Final text colour; the reveal paints its letters with this, not `color`. */
  ink?: string;
  letterSpacing?: string;
  lineHeight?: string;
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
