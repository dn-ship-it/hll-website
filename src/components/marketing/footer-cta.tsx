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

/** The footer's "Let's start a conversation" band: a per-page video plays while it is on screen, over a still that doubles as the poster. */
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
    // Mobile: 228px band, content centred. Desktop: 237px, headline left, button right.
    <div className="relative flex flex-col items-center overflow-hidden bg-[#FFFBD6] px-5 pb-6 pt-[37px] text-center lg:min-h-[237px] lg:flex-row lg:flex-wrap lg:items-center lg:justify-between lg:gap-6 lg:px-[clamp(1.25rem,calc(1.98*var(--vw)),1.875rem)] lg:py-10 lg:text-left">
      {/* Mobile crops the still to its middle; desktop covers. */}
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

      
      <p className="relative max-w-[240px] text-[30px] font-light lg:max-w-none leading-[34.8px] text-[var(--hll-dark-grey)] lg:text-[clamp(2rem,calc(4.23*var(--vw)),4rem)] lg:leading-[1.16]">
        {headline}
      </p>
      
      <span
        className="relative mt-[66px] inline-flex lg:mt-3"
        onMouseEnter={play}
        onMouseLeave={pause}
        onFocusCapture={play}
        onBlurCapture={pause}
      >
        {/* The button's hover shader takes the page's palette; Home keeps Contact's. */}
        {/* Desktop: 50% opacity until hovered; mobile: opaque. */}
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

/** Footer Email / LinkedIn button, in the page's palette; scaled to 81% on mobile. */
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

const HOME_SHADER_COLORS = ["#F49AB1", "#F483A6", "#F5CAA3"];
/** Sections whose bottom shader takes the Home colours instead of their own. */
const HOME_COLOUR_VARIANTS = new Set<string>(["engagement", "services"]);


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
 * The footer's shader strip. The live ScreenShader already sits behind it,
 * so the still shows only with reduced motion or no WebGL2.
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

/** Tuned bottom shader: the light follows the pointer at 90% while scrolling. */
const DEMO_SETTINGS: ShaderSettings = {
  ...TUNED_SETTINGS,
  tune: { ...TUNED_SETTINGS.tune, vignetteFollow: 0.9 },
};
const DEMO_END_SETTINGS: ShaderSettings = {
  ...TUNED_SETTINGS,
  shatter: { ...TUNED_SETTINGS.shatter, amount: 1 },
};

/** Layer heights (% of the screen) and top fades: from fadeStart% to fadeEnd%, eased by fadeCurve. */
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

/** A few px of slack for fractional scroll positions when detecting the true end. */
const END_THRESHOLD_PX = 4;
/** Animation time per scrolled pixel: a screen of scrolling moves the effect about as far as 1.5s of its own drift. */
const SCROLL_RESPONSE = 0.0035;
/** Start the end-of-page layer this far ahead, so it's running in time. */
const END_LAYER_AHEAD = 1600;

/**
 * Page shader pinned to the bottom of the screen, hard-light blended over the content; crossfades (0.6s) to an
 * unblended, finer-shatter layer at the true end (a blend mode can't be transitioned). Created near the end only, and
 * phones show it near the footer only: few WebGL contexts, and every frame costs.
 */
export function ScreenShader() {
  const pathname = usePathname();
  const able = useShaderAble();
  const [started, setStarted] = useState(false);
  const [atEnd, setAtEnd] = useState(false);
  const [nearEnd, setNearEnd] = useState(false);
  // Built in the first idle moment after load: compiling its five shader passes
  // blocks for 100ms+, which would otherwise land mid-scroll near the end.
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
    // Home has no palette of its own, so Home, Engagement and Capabilities use
    // the Home footer's pink and peach.
    colors: variant && !HOME_COLOUR_VARIANTS.has(variant) ? undefined : HOME_SHADER_COLORS,
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
