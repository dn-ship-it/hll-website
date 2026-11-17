"use client";

import { useRef, type ReactNode } from "react";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore -- plain JS module copied from HLL-UI-Demo
import { useCardReveal, useImageReveal, useTextReveal, useTriggeredCards } from "./hooks.js";

/**
 * Reveal animations: paragraphs fade in word by word, images and videos grow from their top edge and sharpen.
 * Opt out with data-no-text-scroll / data-no-image-reveal; tune images with data-image-reveal="fit|scrub" and data-image-rate.
 */
/** Cards marked data-trigger-card play their [data-trigger-media] in once as they enter the screen, instead of following the scroll. */
const TRIGGERED_CARDS = { card: "[data-trigger-card]", image: "[data-trigger-media]" };

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
  /** Cards whose text and photo reveal together (Team cards). */
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
  useTriggeredCards(ref, TRIGGERED_CARDS);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
