import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { SERVICE_LABELS, type Engagement } from "@/data/engagements";

export const FUNCTIONAL_STYLE = { fontFamily: "var(--hll-font-functional)" };

/** Hex colour at an alpha, for the strip gradient. */
export function withAlpha(hex: string, alpha: number) {
  const n = parseInt(hex.replace("#", "").slice(0, 6), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

/** A media slot at the image's own ratio: photo, video or the Figma grey. */
export function EngagementMediaBox({
  media,
  fallbackRatio,
  className = "",
  children,
}: {
  media: Engagement["card"];
  fallbackRatio: number;
  className?: string;
  children?: React.ReactNode;
}) {
  const ratio =
    media.width && media.height ? media.width / media.height : fallbackRatio;
  return (
    <div
      data-service-media
      className={`relative overflow-hidden rounded-lg bg-[#D9D9D9] ${className}`}
      style={{ aspectRatio: String(ratio) }}
    >
      {media.video ? (
        <video
          src={media.video}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 size-full object-cover"
        />
      ) : media.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={media.src}
          alt={media.alt ?? ""}
          className="absolute inset-0 size-full object-cover"
        />
      ) : null}
      {children}
    </div>
  );
}

/**
 * Figma "Component 1": "each case study card has client name, tagging of
 * services provided, and an image". Tags sit 8px in from the bottom left, the
 * arrow tile shows on hover, and the year runs opposite the name.
 */
export function EngagementCard({
  engagement,
  ratio,
  showYear = true,
}: {
  engagement: Engagement;
  /** Fixed card ratio (the related row's 490 × 308) instead of the image's. */
  ratio?: number;
  showYear?: boolean;
}) {
  const card = ratio
    ? { ...engagement.card, width: undefined, height: undefined }
    : engagement.card;
  return (
    <Link href={`/engagement/${engagement.slug}`} className="group block">
      <EngagementMediaBox media={card} fallbackRatio={ratio ?? 1}>
        <span
          aria-hidden
          className="absolute right-2 top-2 grid size-9 place-items-center rounded-[4px] bg-white text-[var(--hll-dark-grey)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <ArrowUpRight className="size-4" strokeWidth={1.4} />
        </span>
        {engagement.services.length ? (
          <span className="absolute bottom-2 left-2 right-2 flex flex-wrap-reverse gap-2">
            {engagement.services.map((service) => (
              <span
                key={service}
                className="inline-flex h-9 items-center rounded-[4px] bg-[var(--hll-bg)] px-[21px] text-[12px] uppercase leading-none tracking-[0.25em] text-[var(--hll-dark-grey)]"
              >
                {SERVICE_LABELS[service]}
              </span>
            ))}
          </span>
        ) : null}
      </EngagementMediaBox>
      <span className="mt-2 flex items-start justify-between gap-4">
        <span className="text-[clamp(1.5rem,calc(2.38*var(--vw)),2.25rem)] leading-[1.16] text-[var(--hll-dark-grey)]">
          {engagement.client}
        </span>
        {showYear ? (
          <span
            className="hll-label shrink-0 text-[10px] uppercase leading-[1.2] text-[var(--hll-dark-grey)] lg:text-[12px]"
            style={FUNCTIONAL_STYLE}
          >
            {engagement.year}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
