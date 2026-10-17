"use client";

import { createElement, useEffect } from "react";

import type { EngagementArt } from "@/data/engagements";

/** Handoff ripple settings → <hll-ripple> attribute names. */
const ATTR: Record<string, string> = {
  bands: "bands",
  speed: "speed",
  flow: "flow",
  shear: "shear",
  wobble: "wobble",
  rippleSpacing: "spacing",
  rot: "rot",
  scale: "scale",
  contrast: "contrast",
  vibrancy: "vibrancy",
  saturation: "saturation",
  motion: "motion",
  soft: "soft",
};

/**
 * One image slot of an engagement, built the way the 17 Oct handoff's
 * EngagementMedia does it: the engagement's own live ripple (hll-ripple.js:
 * one shared WebGL context for every ripple on the page, only visible ones
 * draw, 30 fps), the transparent layer with its mockups and logo, the client
 * name as live text where the slot has one, and on the desktop hero the
 * service lockup, quote and attribution. The poster shows until the first
 * frame, and on its own under reduced motion.
 */
export function EngagementArtSlot({
  art,
  slot,
  alt,
  client,
  live = false,
  className = "",
  children,
}: {
  art: EngagementArt;
  slot: string;
  alt: string;
  /** The client name for the slot's live text. */
  client: string;
  /** Draw the hero's lockup, quote and attribution (desktop hero only). */
  live?: boolean;
  className?: string;
  /** Overlays drawn on top, such as the card's tags and arrow. */
  children?: React.ReactNode;
}) {
  useEffect(() => {
    void import("@/lib/design/hll-ripple.js");
  }, []);

  const s = art.slots[slot];
  if (!s) return null;

  const attrs: Record<string, string> = {
    variant: art.ripple.variant,
    palette: (s.palette ?? art.ripple.palette).join(","),
    origin: art.ripple.origin.join(","),
    seed: String(art.ripple.seed),
    poster: s.poster,
  };
  for (const [key, value] of Object.entries(art.ripple.params)) {
    if (ATTR[key]) attrs[ATTR[key]] = String(value);
  }
  if (typeof s.speed === "number") attrs.speed = String(s.speed);

  const fill = "absolute inset-0 size-full";
  const L = live ? s.live : undefined;

  return (
    <div
      className={`relative overflow-hidden rounded-lg [container-type:inline-size] ${className}`}
      style={{ aspectRatio: `${s.w} / ${s.h}` }}
    >
      {createElement("hll-ripple", { ...attrs, class: fill, style: { position: "absolute" } })}
      {s.scrim ? <div aria-hidden className={fill} style={{ background: s.scrim }} /> : null}
      {s.layer ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={s.layer} alt={alt} className={fill} loading="lazy" decoding="async" draggable={false} />
      ) : null}
      {s.texts?.map((t, i) => (
        <p
          key={i}
          aria-hidden={i > 0}
          className="absolute m-0 leading-[1.15]"
          style={{
            left: `${t.cx}%`,
            top: `${t.cy}%`,
            width: `${t.maxW}%`,
            transform: "translate(-50%, -50%)",
            textAlign: t.align,
            fontSize: `${t.font}cqw`,
            fontWeight: t.weight,
            color: s.ink ?? t.colour,
          }}
        >
          {client}
        </p>
      ))}
      {L && art.lockup ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={art.lockup.src}
          alt={art.lockup.name}
          className="absolute"
          style={{ right: `${L.lockup.right}%`, top: `${L.lockup.top}%`, height: `${L.lockup.height}%` }}
        />
      ) : null}
      {L && art.quote?.text ? (
        <p
          className="absolute m-0"
          style={{
            left: `${L.quote.left}%`,
            top: `${L.quote.top}%`,
            width: `${L.quote.width}%`,
            fontSize: `${L.quote.font}cqw`,
            lineHeight: L.quote.lineHeight,
            fontWeight: L.quote.weight,
            color: "#FAFAFA",
          }}
        >
          &ldquo;{art.quote.text}&rdquo;
        </p>
      ) : null}
      {L && art.quote?.role ? (
        <p
          className="absolute m-0"
          style={{
            left: `${L.attribution.left}%`,
            top: `${L.attribution.top}%`,
            fontSize: `${L.attribution.font}cqw`,
            lineHeight: L.attribution.lineHeight,
            fontWeight: L.attribution.weight,
            color: "#FAFAFA",
          }}
        >
          {art.quote.role}
          {art.quote.organisation ? (
            <>
              <br />
              <span style={{ color: L.attribution.orgColour }}>{art.quote.organisation}</span>
            </>
          ) : null}
        </p>
      ) : null}
      {children}
    </div>
  );
}
