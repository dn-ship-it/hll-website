"use client";

import { useRef, useState } from "react";

import { HLLButton } from "@/components/hll";

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  // `active` drives the still's drift, which stands in for the video until a
  // page supplies one; `playing` fades the video in once it actually plays.
  const [active, setActive] = useState(false);

  const play = () => {
    setActive(true);
    const video = videoRef.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    void video.play().then(() => setPlaying(true)).catch(() => undefined);
  };
  const pause = () => {
    setActive(false);
    videoRef.current?.pause();
    setPlaying(false);
  };

  return (
    <div className="relative flex min-h-[237px] flex-wrap items-center justify-between gap-6 overflow-hidden bg-[#FFFBD6] px-[clamp(1.25rem,11.3vw,10.7rem)] py-10">
      <div
        aria-hidden
        className={`footer-cta-still pointer-events-none absolute inset-0 ${active && !videoSrc ? "is-active" : ""}`}
        style={{ background: `url(${poster}) center / cover` }}
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

      <p className="relative text-[clamp(2rem,4.23vw,4rem)] font-light leading-[1.16] text-[var(--hll-dark-grey)]">
        {headline}
      </p>
      {/* The Figma "Button" component: the LightFX button, which blooms
          into its gradient on hover (see the "Buttons" motion reference). */}
      <span
        className="relative mt-3 inline-flex"
        onMouseEnter={play}
        onMouseLeave={pause}
        onFocusCapture={play}
        onBlurCapture={pause}
      >
        <HLLButton href={href} variant="contact" size="md">
          {label}
        </HLLButton>
      </span>
    </div>
  );
}
