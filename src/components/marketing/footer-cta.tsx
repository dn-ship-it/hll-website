"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { usePathname } from "next/navigation";

import { BottomShader, HLLButton, getVariantColors, makeBottomShaderLayout } from "@/components/hll";
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

/*
 * BOTTOM SHADER COLOUR SYSTEM
 *
 * One shader serves every page (ScreenShader below: the same two layers, settings, layouts and masks). Pages differ
 * only in the palette they pass in.
 *
 * 1. Palette per page. variantForPath() gives the page's variant (Engagement, About/Team/Careers, Industries, ...);
 *    getVariantColors() gives its three colours. A page with no variant (Home) uses HOME_SHADER_COLORS.
 * 2. Home's HSB band. Each palette colour is passed through toHomeBand(): hue kept, saturation clamped to Home's
 *    33-46%, brightness set to 96%. Every page then blends the way Home does, and only the hue differs.
 * 3. Why a band. The blend layer is `mix-blend-mode: hard-light` (globals.css, .bottom-shader--overlay), which
 *    screens (lightens) a channel above 0.5 and multiplies (darkens) one below it. In Home's band the lowest channel
 *    is about 0.52, so the layer only lifts and tints. A saturated palette (Engagement's orange, blue ~0.2) darkens
 *    that channel over the white page and leaves a yellow stain; the earlier luminance-only lift missed it.
 * 4. The fade colour. See paletteFadeColour().
 *
 * Text and other content is not treated specially: the layer sits above it and blends with it, which is what lets
 * black text pick up the shader's colour (more strongly under the pointer). Raising text above the layer, or giving it
 * a fixed colour, switches that off and is not used.
 */
const HOME_SHADER_COLORS = ["#F49AB1", "#F483A6", "#F5CAA3"];

/** Home's saturation range and brightness (HSB, 0-1): the reference band every page's colours are brought into. */
const HOME_SATURATION = [0.33, 0.46] as const;
const HOME_BRIGHTNESS = 0.96;

function hexToHsb(hex: string): [number, number, number] {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const max = Math.max(r, g, b);
  const d = max - Math.min(r, g, b);
  let h = 0;
  if (d > 0) {
    if (max === r) h = ((g - b) / d + 6) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
  }
  return [h, max === 0 ? 0 : d / max, max];
}

function hsbToHex(h: number, s: number, v: number) {
  const c = v * s;
  const x = c * (1 - Math.abs((h % 2) - 1));
  const m = v - c;
  const [r, g, b] = [[c, x, 0], [x, c, 0], [0, c, x], [0, x, c], [x, 0, c], [c, 0, x]][Math.floor(h) % 6];
  return `#${[r, g, b].map((n) => Math.round((n + m) * 255).toString(16).padStart(2, "0")).join("")}`;
}

/** The colour's own hue at Home's saturation range and brightness, so every page blends the way Home does and only the
 *  hue changes. Home's own colours already sit inside the range and come out as they were. */
function toHomeBand(hex: string) {
  const [h, s] = hexToHsb(hex);
  return hsbToHex(h, Math.min(Math.max(s, HOME_SATURATION[0]), HOME_SATURATION[1]), HOME_BRIGHTNESS);
}

/** Saturation and brightness (HSB, 0–1) of the colour the blend layer fades out to. */
const FADE_SATURATION = 0.35;
const FADE_BRIGHTNESS = 0.95;

/**
 * The colour the blend layer fades out to: the palette's mean hue at FADE_SATURATION / FADE_BRIGHTNESS, as hex.
 *
 * The vignette used to fade to white (background.color), so as the layer thinned its colour drained away. Over black
 * text hard-light gives max(0, 2S - 1) x alpha per channel; with S near white that is a neutral grey, and dimming it
 * by the falling alpha made it a dark grey (simulated on Home's pink: saturation 66% -> 36% -> 16% -> 4% at 0, 25,
 * 50, 75% faded). Fading to the palette's own hue keeps S saturated while alpha falls, so the result is a dark tint
 * of the page colour (saturation stays near 67%) and never grey. Over the white page hard-light still returns white,
 * so white or empty areas are unaffected. Full-strength areas (alpha 1) are unchanged.
 */
function paletteFadeColour(hexes: string[]) {
  const rgb = hexes.map((h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255));
  const [r, g, b] = [0, 1, 2].map((i) => rgb.reduce((sum, c) => sum + c[i], 0) / rgb.length);
  const mean = `#${[r, g, b].map((n) => Math.round(n * 255).toString(16).padStart(2, "0")).join("")}`;
  return hsbToHex(hexToHsb(mean)[0], FADE_SATURATION, FADE_BRIGHTNESS);
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

  const variant = variantForPath(pathname);
  // One shader for every page; only the hue changes: the page's own variant palette (Engagement, About/Team, ...), or
  // Home's pink and peach where a page has none, each brought into Home's saturation and brightness band.
  const colors = useMemo(
    () => (variant ? getVariantColors(variant) : HOME_SHADER_COLORS).map(toHomeBand),
    [variant],
  );
  // Per-palette settings for the blend layer only: DEMO_SETTINGS plus the fade colour. background.fadeColor is what the
  // vignette fades to; output.color is what the output pass mixes toward where the layer is transparent. Both must be
  // the same palette-hued colour (not white), or the faded edge turns grey over dark content. The end-of-page layer
  // keeps DEMO_END_SETTINGS. Memoised: BottomShader remounts its effect if `settings` changes identity.
  const blendSettings = useMemo<ShaderSettings>(() => {
    const fade = paletteFadeColour(colors);
    return {
      ...DEMO_SETTINGS,
      background: { ...DEMO_SETTINGS.background, fadeColor: fade },
      output: { ...DEMO_SETTINGS.output, color: fade },
    };
  }, [colors]);

  if (!able || !started || (!show && !warm)) return null;

  const common = {
    variant: variant ?? ("contact" as const),
    colors,
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
        settings={blendSettings}
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
