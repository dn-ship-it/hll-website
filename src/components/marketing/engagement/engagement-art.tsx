"use client";

import { createElement, useEffect, useState } from "react";

import type { EngagementArt, EngagementArtSlot as SlotData } from "@/data/engagements";

import { CardMedia } from "./card-media";

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
  hoverOnly = false,
  still = false,
  cardMedia,
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
  /** Hold the ripple still until the pointer is over it (engagement cards). */
  hoverOnly?: boolean;
  /** Hold the ripple on one frame (the case study hero: "Static ripples that
   *  match the brand's palette", House of Katha, 5 Nov). */
  still?: boolean;
  /** A named client's card video or still (5 Nov handoff), in place of the
   *  ripple and its layer: the logo is already in the media. */
  cardMedia?: { video?: string; poster: string };
  className?: string;
  /** Overlays drawn on top, such as the card's tags and arrow. */
  children?: React.ReactNode;
}) {
  useEffect(() => {
    void import("@/lib/design/hll-ripple.js");
  }, []);
  const [hovered, setHovered] = useState(false);

  // A named client's card media can fill a shape the ripple artwork wasn't
  // cut for (the Engagements grid's own shapes); its size is in the name.
  const size = /_(\d+)x(\d+)/.exec(slot);
  const own = art.slots[slot];
  if (!own && !(cardMedia && size)) return null;
  const s: SlotData = own ?? { w: Number(size![1]), h: Number(size![2]), poster: cardMedia!.poster };

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
  // Cards hold their ripple on one frame and run it only while hovered
  // (5 Nov); it picks up where it stopped.
  if ((hoverOnly && !hovered) || still) attrs.paused = "";

  const fill = "absolute inset-0 size-full";
  const L = live ? s.live : undefined;

  return (
    <div
      className={`relative overflow-hidden rounded-lg [container-type:inline-size] ${className}`}
      style={{ aspectRatio: `${s.w} / ${s.h}` }}
      onPointerEnter={hoverOnly ? () => setHovered(true) : undefined}
      onPointerLeave={hoverOnly ? () => setHovered(false) : undefined}
    >
      {cardMedia ? (
        <div className={fill}>
          <CardMedia video={cardMedia.video} poster={cardMedia.poster} />
        </div>
      ) : (
        <>
          {createElement("hll-ripple", { ...attrs, class: fill, style: { position: "absolute" } })}
          {s.scrim ? <div aria-hidden className={fill} style={{ background: s.scrim }} /> : null}
          {s.layer ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={s.layer} alt={alt} className={fill} loading="lazy" decoding="async" draggable={false} />
          ) : null}
        </>
      )}
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
