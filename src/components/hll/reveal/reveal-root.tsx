"use client";

import { useRef, type ReactNode } from "react";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore -- plain JS module copied from HLL-UI-Demo
import { useCardReveal, useImageReveal, useTextReveal } from "./hooks.js";

/**
 * House of Katha's reveal animations (HLL-UI-Demo, 5 Nov) on everything under
 * this wrapper:
 * - paragraphs and subtext fade in word by word from a blur as they come on
 *   screen (headings keep the slow gradient reveal, so `skip` lists them);
 * - images, videos and background images grow from their top edge and
 *   sharpen from a blur as they scroll in.
 * Opt an element out with data-no-text-scroll / data-no-image-reveal; tune a
 * section's images with data-image-reveal="fit|scrub" and data-image-rate.
 * Sticky and fixed elements are always left alone, and nothing animates with
 * reduced motion on.
 */
export function RevealRoot({
  children,
  skip,
  card,
  card2,
  className,
}: {
  children: ReactNode;
  /** CSS selector of text to leave alone (headings, eyebrows, …). */
  skip?: string;
  /** Cards whose text and photo reveal together, as on HoK's Team cards. */
  card?: { card: string; text?: string; image?: string };
  /** A second set of cards (Home: the Impact tiles, image only). */
  card2?: { card: string; text?: string; image?: string };
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useImageReveal(ref);
  useTextReveal(ref, skip ? { skip } : {});
  useCardReveal(ref, card ?? {});
  useCardReveal(ref, card2 ?? {});
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
