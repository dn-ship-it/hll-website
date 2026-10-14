"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { usePathname } from "next/navigation";

import { BottomShader, HLLButton } from "@/components/hll";

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
    // Figma Footer Mobile: a 228px band, headline and button centred in it
    // with equal space above and below, so a wrapped headline grows the band
    // evenly. Desktop: 237px, headline left and button right, on the home
    // sections' gutter.
    <div className="relative flex flex-col items-center overflow-hidden bg-[#FFFBD6] px-5 py-[73px] text-center lg:min-h-[237px] lg:flex-row lg:flex-wrap lg:items-center lg:justify-between lg:gap-6 lg:px-[clamp(1.25rem,calc(1.98*var(--vw)),1.875rem)] lg:py-10 lg:text-left">
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
      className="hll-button--glass [--hll-button-h:29px] [--hll-button-px:17px] [--hll-button-radius:3.24px] [--hll-label-size:9.73px] [--hll-label-tracking:2.43px] lg:[--hll-button-h:37px] lg:[--hll-button-px:21px] lg:[--hll-button-radius:4px] lg:[--hll-label-size:12px] lg:[--hll-label-tracking:3px]"
    >
      {children}
    </HLLButton>
  );
}

/** Figma Home footer strip: pink, a deeper pink and peach (sampled). */
const HOME_SHADER_COLORS = ["#F49AB1", "#F483A6", "#F5CAA3"];

function supportsWebGL2() {
  try {
    const gl = document.createElement("canvas").getContext("webgl2");
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
    return Boolean(gl);
  } catch {
    return false;
  }
}

/** Whether the live shader can run here: WebGL2 and motion allowed. */
function useShaderAble() {
  const [able, setAble] = useState<boolean | null>(null);
  useEffect(() => {
    setAble(
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
        supportsWebGL2(),
    );
  }, []);
  return able;
}

/**
 * The footer's shader strip. QA H-14: the live shader is now ScreenShader,
 * pinned to the bottom of the screen on every page, so it already sits
 * behind this strip when the footer is reached. The Figma still stays only
 * where that can't run: reduced motion or no WebGL2.
 */
export function FooterShaderStrip({
  className,
  stillClassName = "",
  stillStyle,
}: {
  className: string;
  stillClassName?: string;
  stillStyle: CSSProperties;
}) {
  const able = useShaderAble();
  return (
    <div aria-hidden className={`pointer-events-none absolute ${className}`}>
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${stillClassName}`}
        style={{ ...stillStyle, opacity: able === false ? 1 : 0 }}
      />
    </div>
  );
}

/** How close to the end of the page counts as "at the footer". */
const END_ZONE = 320;

/**
 * QA H-14, as in the HLL UI Demo: the page's shader pinned to the bottom of
 * the screen while you scroll. It sits faintly over the content (hard-light,
 * so whatever passes through it picks up its colours and clears again as it
 * moves up the screen) and comes up to full strength at the footer.
 *
 * Desktop runs it the whole way down. Phones only bring it in near the
 * footer, as before: they allow few WebGL contexts and pay for every frame.
 * It's started once the page has settled, so it never competes with the
 * first paint.
 */
export function ScreenShader() {
  const pathname = usePathname();
  const able = useShaderAble();
  const [started, setStarted] = useState(false);
  const [atEnd, setAtEnd] = useState(false);
  const [desktop, setDesktop] = useState(false);
  const [generation, setGeneration] = useState(0);

  useEffect(() => {
    if (!able) return;
    const media = window.matchMedia("(min-width: 1024px)");
    const onMedia = () => setDesktop(media.matches);
    onMedia();
    media.addEventListener("change", onMedia);

    // Checked straight in the scroll event: it's a cheap read, and React
    // skips the render when the answer hasn't changed.
    const onScroll = () => {
      const doc = document.documentElement;
      setAtEnd(window.scrollY + window.innerHeight >= doc.scrollHeight - END_ZONE);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const start = window.setTimeout(() => setStarted(true), 1200);
    return () => {
      window.clearTimeout(start);
      media.removeEventListener("change", onMedia);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [able]);

  // Re-check on page change: the new page has a different length.
  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, [pathname]);

  const [reachedEnd, setReachedEnd] = useState(false);
  useEffect(() => {
    if (atEnd) setReachedEnd(true);
  }, [atEnd]);

  // Over the content it tints (hard-light); at the footer it shows in full
  // colour, as the footer strip did. A blend mode can't be animated, so it
  // dips out, swaps, and comes back.
  const [mode, setMode] = useState<"tint" | "full">("tint");
  const [dipped, setDipped] = useState(false);
  useEffect(() => {
    const want = atEnd ? "full" : "tint";
    // Back where it was before the swap landed (a quick scroll back and
    // forth at the edge): just come back in, or it would stay faded out.
    if (want === mode) {
      setDipped(false);
      return;
    }
    setDipped(true);
    const swap = window.setTimeout(() => {
      setMode(want);
      setDipped(false);
    }, 250);
    return () => window.clearTimeout(swap);
  }, [atEnd, mode]);

  // Phones create it the first time the footer comes near, then keep it:
  // remounting would leak a WebGL context each time.
  if (!able || !started || (!desktop && !reachedEnd)) return null;

  const variant = variantForPath(pathname);
  return (
    <BottomShader
      // A fresh canvas if the browser ever drops this one's WebGL context.
      key={generation}
      onContextLost={() => setGeneration((n) => n + 1)}
      variant={variant ?? "contact"}
      // Home has no section palette of its own; the Figma Home footer runs
      // pink and peach rather than Contact's blues (QA G-07).
      colors={variant ? undefined : HOME_SHADER_COLORS}
      overlay={mode === "tint"}
      passthrough
      className="z-30 transition-opacity duration-[250ms] ease-in-out"
      style={{ opacity: dipped ? 0 : mode === "full" ? 1 : desktop ? 0.45 : 0 }}
    />
  );
}
