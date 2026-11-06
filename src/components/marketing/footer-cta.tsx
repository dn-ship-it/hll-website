"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { usePathname } from "next/navigation";

import { BottomShader, HLLButton, makeBottomShaderLayout } from "@/components/hll";
import {
  TUNED_SETTINGS,
  type ShaderSettings,
} from "@/components/hll/lightfx/shader-definition";

import { BUTTON_MOBILE } from "./button-sizes";
import { variantForPath } from "./page-variant";
import { supportsWebGL2 } from "@/lib/webgl-support";

/**
 * The footer's "Let's start a conversation" band. Figma note: "let's start a
 * conversation above will have a video playing as its background which plays
 * when write to us is hovered on. each page will play a different video."
 * The Figma still shows until a page supplies `videoSrc`, and stays as the
 * video's poster so nothing jumps when playback starts. Hannan's tracker
 * (HOME-018) asks for the motion to show, looping, so a video plays whenever
 * the band is on screen rather than only on hover.
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

  // Hover drifts the still; a video plays on its own (below).
  const play = () => setActive(true);
  const pause = () => setActive(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return undefined;
    // Only while the band is on screen, so it costs nothing elsewhere.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        void video
          .play()
          .then(() => setPlaying(true))
          .catch(() => undefined);
      } else {
        video.pause();
      }
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, [videoSrc]);

  return (
    // Figma Footer Mobile: a 228px band, headline and button centred in it
    // with equal space above and below, so a wrapped headline grows the band
    // evenly. Desktop: 237px, headline left and button right, on the home
    // sections' gutter.
    <div className="relative flex flex-col items-center overflow-hidden bg-[#FFFBD6] px-5 pb-6 pt-[37px] text-center lg:min-h-[237px] lg:flex-row lg:flex-wrap lg:items-center lg:justify-between lg:gap-6 lg:px-[clamp(1.25rem,calc(1.98*var(--vw)),1.875rem)] lg:py-10 lg:text-left">
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

      {/* House of Katha's mobile footer (6 Nov, "text and button alignment
          fixed"): the title on two lines, the button 66px under it near
          the band's foot. */}
      <p className="relative max-w-[240px] text-[30px] font-light lg:max-w-none leading-[34.8px] text-[var(--hll-dark-grey)] lg:text-[clamp(2rem,calc(4.23*var(--vw)),4rem)] lg:leading-[1.16]">
        {headline}
      </p>
      {/* The Figma "Button" component: the LightFX button, which blooms
          into its gradient on hover (see the "Buttons" motion reference). */}
      <span
        className="relative mt-[66px] inline-flex lg:mt-3"
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

/**
 * House of Katha's tuned bottom shader (HLL-UI-Demo, 3 Nov, ServicesScrollDemo
 * and the Home Media page): their tuned look, with the light following the
 * pointer at 90% while scrolling (QA H-14).
 */
const DEMO_SETTINGS: ShaderSettings = {
  ...TUNED_SETTINGS,
  tune: { ...TUNED_SETTINGS.tune, vignetteFollow: 0.9 },
};
/** Their end-of-page look: the same, with the full shatter. */
const DEMO_END_SETTINGS: ShaderSettings = {
  ...TUNED_SETTINGS,
  shatter: { ...TUNED_SETTINGS.shatter, amount: 1 },
};

/** Their heights (% of the screen) and top fades: the fade runs from
 *  fadeStart% to fadeEnd% of the layer, eased by fadeCurve. */
const BLEND_LAYER = { hostHeight: 50, fadeStart: 10, fadeEnd: 80, fadeCurve: 1.5 };
const END_LAYER = { hostHeight: 60, fadeStart: 10, fadeEnd: 70, fadeCurve: 1.25 };
const BLEND_LAYOUT = makeBottomShaderLayout(BLEND_LAYER.hostHeight);
const END_LAYOUT = makeBottomShaderLayout(END_LAYER.hostHeight);

function fadeMask(c: typeof BLEND_LAYER): CSSProperties {
  const span = c.fadeEnd - c.fadeStart || 1e-6;
  const stops: [number, number][] = [[0, 0]];
  for (let i = 0; i <= 8; i++) {
    const t = i / 8;
    stops.push([c.fadeStart + span * t, t ** c.fadeCurve]);
  }
  stops.push([100, 1]);
  const mask = `linear-gradient(to bottom, ${stops.map(([p, a]) => `rgba(0,0,0,${a.toFixed(3)}) ${p}%`).join(", ")})`;
  return { WebkitMaskImage: mask, maskImage: mask };
}
const BLEND_MASK = fadeMask(BLEND_LAYER);
const END_MASK = fadeMask(END_LAYER);

/** The demo's "scrolled to the true end": a few px of slack for fractional
 *  scroll positions. */
const END_THRESHOLD_PX = 4;
/** Animation time per scrolled pixel: a screen's worth of scrolling moves
 *  the effect about as far as 1.5s of its own drift (Hannan, 16 Oct: "not
 *  supposed to be static … it should move on scroll too"). */
const SCROLL_RESPONSE = 0.0035;
/** Start the end-of-page layer this far ahead, so it's running in time. */
const END_LAYER_AHEAD = 1600;

/**
 * QA H-14, built as HLL-UI-Demo's ServicesScrollDemo: the page's shader
 * pinned to the bottom of the screen, blended over the content (hard-light,
 * so what passes through it takes its colours). At the true end of the page
 * it crossfades (0.6s) to a second, unblended layer with a finer shatter. A
 * blend mode can't be transitioned, hence two layers and an opacity fade.
 *
 * The end layer is only created once the end is near, and phones bring the
 * whole thing in near the footer only: they allow few WebGL contexts and pay
 * for every frame. It starts once the page has settled, after first paint.
 */
export function ScreenShader() {
  const pathname = usePathname();
  const able = useShaderAble();
  const [started, setStarted] = useState(false);
  const [atEnd, setAtEnd] = useState(false);
  const [nearEnd, setNearEnd] = useState(false);
  // Built in the first idle moment after load (performance, 24 Oct): creating
  // a layer compiles its five shader passes, a 100ms+ block that used to land
  // mid-scroll as the end of the page came near. Built early, it waits paused.
  const [warm, setWarm] = useState(false);
  const [desktop, setDesktop] = useState(false);
  const [generation, setGeneration] = useState(0);

  useEffect(() => {
    if (!able) return;
    const media = window.matchMedia("(min-width: 1024px)");
    const onMedia = () => setDesktop(media.matches);
    onMedia();
    media.addEventListener("change", onMedia);

    // Checked straight in the scroll event: a cheap read, and React skips
    // the render when the answer hasn't changed.
    const onScroll = () => {
      const doc = document.documentElement;
      const left = doc.scrollHeight - (window.scrollY + window.innerHeight);
      setAtEnd(left <= END_THRESHOLD_PX);
      // Once near, kept: remounting would rebuild the WebGL context.
      if (left <= END_LAYER_AHEAD) setNearEnd(true);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const start = window.setTimeout(() => setStarted(true), 1200);
    // Safari has no requestIdleCallback; a timer stands in.
    const hasIdle = "requestIdleCallback" in window;
    const warmTimer = hasIdle
      ? window.requestIdleCallback(() => setWarm(true), { timeout: 4000 })
      : window.setTimeout(() => setWarm(true), 2500);
    return () => {
      window.clearTimeout(start);
      if (hasIdle) window.cancelIdleCallback(warmTimer);
      else window.clearTimeout(warmTimer);
      media.removeEventListener("change", onMedia);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [able]);

  // Re-check on page change: the new page has a different length.
  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, [pathname]);

  // Phones show the shader near the footer only, but build it early, paused.
  const show = desktop || nearEnd;
  if (!able || !started || (!show && !warm)) return null;

  const variant = variantForPath(pathname);
  const common = {
    variant: variant ?? ("contact" as const),
    // Home has no section palette of its own; the Figma Home footer runs
    // pink and peach rather than Contact's blues (QA G-07).
    // Engagement pages take the Home colours too (House of Katha, 6 Nov:
    // "reuse the Home page's bottom shader colors on the Engagement page").
    colors: variant && variant !== "engagement" ? undefined : HOME_SHADER_COLORS,
    passthrough: true,
    scrollResponse: SCROLL_RESPONSE,
    // A fresh canvas if the browser ever drops one's WebGL context.
    onContextLost: () => setGeneration((n) => n + 1),
    className: "z-30 transition-opacity duration-[600ms] ease-[ease]",
  };
  return (
    <>
      <BottomShader
        key={`blend-${generation}`}
        {...common}
        settings={DEMO_SETTINGS}
        layout={BLEND_LAYOUT}
        overlay
        paused={!show}
        style={{ ...BLEND_MASK, opacity: show && !atEnd ? 1 : 0 }}
      />
      {nearEnd || warm ? (
        <BottomShader
          key={`end-${generation}`}
          {...common}
          settings={DEMO_END_SETTINGS}
          layout={END_LAYOUT}
          paused={!nearEnd}
          style={{ ...END_MASK, opacity: atEnd ? 1 : 0 }}
        />
      ) : null}
    </>
  );
}
