"use client";

import { useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { HLLButton } from "@/components/hll";

import { BUTTON_MOBILE } from "./button-sizes";
import { variantForPath } from "./page-variant";

/**
 * The footer's "Let's start a conversation" band. Figma note: "let's start a
 * conversation above will have a video playing as its background which plays
 * when write to us is hovered on. each page will play a different video."
 * The Figma still shows until a page supplies `videoSrc`, and stays as the
 * video's poster so nothing jumps when playback starts.
 */
export function FooterCta({
  headline,
  label,
  href,
  poster,
  videoSrc,
}: {
  headline: string;
  label: string;
  href: string;
  poster: string;
  videoSrc?: string;
}) {
  const pathname = usePathname();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  // `active` drives the still's drift, which stands in for the video until a
  // page supplies one; `playing` fades the video in once it actually plays.
  const [active, setActive] = useState(false);

  const play = () => {
    setActive(true);
    const video = videoRef.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    void video
      .play()
      .then(() => setPlaying(true))
      .catch(() => undefined);
  };
  const pause = () => {
    setActive(false);
    videoRef.current?.pause();
    setPlaying(false);
  };

  return (
    // Figma Footer Mobile: a 228px band, headline and button centred from
    // y 84. Desktop: 237px, headline left and button right.
    <div className="relative flex h-[228px] flex-col items-center overflow-hidden bg-[#FFFBD6] px-5 pt-[84px] text-center lg:h-auto lg:min-h-[237px] lg:flex-row lg:flex-wrap lg:items-center lg:justify-between lg:gap-6 lg:px-[clamp(1.25rem,calc(11.3*var(--vw)),10.7rem)] lg:py-10 lg:text-left">
      {/* Mobile crops the still to its middle (Figma image fill at 155.5%
          of the band's height); desktop covers. */}
      <div
        aria-hidden
        className={`footer-cta-still pointer-events-none absolute inset-0 bg-[length:auto_155.5%] bg-[position:50%_39.6%] lg:bg-cover lg:bg-center ${active && !videoSrc ? "is-active" : ""}`}
        style={{ backgroundImage: `url(${poster})` }}
      />
      {videoSrc ? (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          className={`pointer-events-none absolute inset-0 size-full object-cover transition-opacity duration-500 ${
            playing ? "opacity-100" : "opacity-0"
          }`}
        />
      ) : null}

      <p className="relative text-[30px] font-light leading-[34.8px] text-[var(--hll-dark-grey)] lg:text-[clamp(2rem,calc(4.23*var(--vw)),4rem)] lg:leading-[1.16]">
        {headline}
      </p>
      {/* The Figma "Button" component: the LightFX button, which blooms
          into its gradient on hover (see the "Buttons" motion reference). */}
      <span
        className="relative mt-[13px] inline-flex lg:mt-3"
        onMouseEnter={play}
        onMouseLeave={pause}
        onFocusCapture={play}
        onBlurCapture={pause}
      >
        {/* The button's hover shader takes the page's palette, like the
            footer strip below it; Home keeps Contact's. */}
        {/* Figma: this Button sits at 50% opacity over the desktop band;
            the mobile "Button Mobile" is opaque, 34px tall, 10px label. */}
        <HLLButton
          href={href}
          variant={variantForPath(pathname) ?? "contact"}
          size="md"
          className={`${BUTTON_MOBILE} transition-opacity duration-300 hover:opacity-100 focus-visible:opacity-100 lg:opacity-50`}
        >
          {label}
        </HLLButton>
      </span>
    </div>
  );
}

/**
 * Figma footer Email / LinkedIn: the same Button component as every CTA, so
 * the same LightFX hover, in the page's palette. Footer Mobile scales it to
 * 81%: 29px tall, 17px padding, a 9.73px label.
 */
export function FooterButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <HLLButton
      href={href}
      variant={variantForPath(pathname) ?? "contact"}
      size="md"
      className="[--hll-button-h:29px] [--hll-button-px:17px] [--hll-button-radius:3.24px] [--hll-label-size:9.73px] [--hll-label-tracking:2.43px] lg:[--hll-button-h:37px] lg:[--hll-button-px:21px] lg:[--hll-button-radius:4px] lg:[--hll-label-size:12px] lg:[--hll-label-tracking:3px]"
    >
      {children}
    </HLLButton>
  );
}
