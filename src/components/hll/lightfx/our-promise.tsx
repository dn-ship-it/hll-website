"use client";

// our-promise.tsx — React wrapper around the "Our Promise" p5.js sketch,
// ported from HLL-UI-Demo's OurPromise.jsx.
//
// A scroll-driven piece: a ripple canvas backdrop whose bands, speed and
// palette all ease from a colourful inward swirl to a settled blue-green as
// you scroll, with hero text fading out and an image revealing in over the
// same progress.
//
// The demo pins everything with `position: fixed` against `window.scrollY`,
// which only works when the component owns the whole page. That would take
// over the viewport for the entire document if it were dropped into the
// middle of one, so the default here is `mode="section"`: the same animation,
// pinned with `position: sticky` inside its own tall section and driven by
// that section's own scroll progress. `mode="fixed"` is the demo's original
// behavior, for when this is the page.
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

import { cn } from "@/lib/utils";

import {
  BANDS_AT_BOTTOM,
  BANDS_AT_TOP,
  BANDS_EASING,
  BASE_PARAMS,
  COLOR_LOOK,
  COLOR_PALETTE,
  GRAY_LOOK,
  GRAY_PALETTE,
  IMAGE_FADE_END,
  IMAGE_FADE_START,
  IMAGE_SCALE_START,
  LOCKED_ORIGIN,
  MAX_RIPPLES,
  SCROLL_SPACER_VH,
  SCROLL_TRIGGER_PX,
  SPEED_AT_BOTTOM,
  SPEED_AT_TOP,
  TAP_RIPPLE_MODE,
  TEXT_FADE_END,
  TEXT_SCALE_END,
  type Look,
  type Rgb,
} from "./our-promise-definition";
import { OUR_PROMISE_FRAG_SRC } from "./our-promise-shaders";
import { RIPPLE_VERT_SRC } from "./ripple-shaders";

const EMPTY_RIPPLE_ARRAY = new Array(MAX_RIPPLES * 2).fill(-10);

function lerpPaletteInto(out: number[], a: Rgb[], b: Rgb[], t: number) {
  for (let i = 0; i < a.length; i++) {
    out[i * 3 + 0] = a[i][0] + (b[i][0] - a[i][0]) * t;
    out[i * 3 + 1] = a[i][1] + (b[i][1] - a[i][1]) * t;
    out[i * 3 + 2] = a[i][2] + (b[i][2] - a[i][2]) * t;
  }
}

function lerpLookInto(out: Look, a: Look, b: Look, t: number) {
  out.saturation = a.saturation + (b.saturation - a.saturation) * t;
  out.vibrancy = a.vibrancy + (b.vibrancy - a.vibrancy) * t;
  out.contrast = a.contrast + (b.contrast - a.contrast) * t;
}

function smoothStep(t: number) {
  const c = Math.min(1, Math.max(0, t));
  return c * c * (3 - 2 * c);
}

type SketchRefs = {
  scrollY: { current: number };
  /** Called once per frame. Reading the section's position inside the draw
      loop keeps the layout read on the frame clock; measuring it from a scroll
      listener instead forced a synchronous reflow on every scroll event. */
  readScroll: () => void;
  heroText: { current: HTMLDivElement | null };
  imageStage: { current: HTMLDivElement | null };
};

/* eslint-disable @typescript-eslint/no-explicit-any */
function sketch(p: any, refs: SketchRefs, scrollTriggerPx: number) {
  let shaderProgram: any;

  let smoothPaletteMix = 0;
  const currentPaletteFlat = COLOR_PALETTE.flat();
  const currentLook: Look = { ...COLOR_LOOK };

  let smoothBands = BANDS_AT_TOP;
  let smoothSpeed = SPEED_AT_TOP;

  let smoothTextOpacity = 1;
  let smoothTextScale = 1;
  let smoothImageOpacity = 0;
  let smoothImageScale = IMAGE_SCALE_START;

  p.setup = () => {
    // Capped for the same reason as the ripple: p5 would otherwise render this
    // full-viewport shader at the phone's full pixel ratio.
    p.pixelDensity(Math.min(p.displayDensity(), 2));
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.noStroke();
    shaderProgram = p.createShader(RIPPLE_VERT_SRC, OUR_PROMISE_FRAG_SRC);
  };

  p.draw = () => {
    refs.readScroll();

    p.background(0);
    p.shader(shaderProgram);

    const scrollProgress = Math.min(1, Math.max(0, refs.scrollY.current / scrollTriggerPx));

    const targetBands = BANDS_AT_TOP + (BANDS_AT_BOTTOM - BANDS_AT_TOP) * scrollProgress;
    smoothBands += (targetBands - smoothBands) * BANDS_EASING;

    const targetSpeed = SPEED_AT_TOP + (SPEED_AT_BOTTOM - SPEED_AT_TOP) * scrollProgress;
    smoothSpeed += (targetSpeed - smoothSpeed) * BANDS_EASING;

    smoothPaletteMix += (scrollProgress - smoothPaletteMix) * BANDS_EASING;
    lerpPaletteInto(currentPaletteFlat, COLOR_PALETTE, GRAY_PALETTE, smoothPaletteMix);
    lerpLookInto(currentLook, COLOR_LOOK, GRAY_LOOK, smoothPaletteMix);

    // Hero text scales down and fades out together, fully gone by TEXT_FADE_END.
    const textProgress = smoothStep(scrollProgress / TEXT_FADE_END);
    smoothTextOpacity += (1 - textProgress - smoothTextOpacity) * 0.5;
    smoothTextScale += (1 + (TEXT_SCALE_END - 1) * textProgress - smoothTextScale) * 0.5;
    if (refs.heroText.current) {
      refs.heroText.current.style.opacity = String(smoothTextOpacity);
      refs.heroText.current.style.transform = `translate(-50%, -50%) scale(${smoothTextScale})`;
    }

    // Image scales up and fades in from IMAGE_FADE_START, overlapping the tail
    // of the text fade instead of hard-cutting.
    const imageProgress = smoothStep(
      (scrollProgress - IMAGE_FADE_START) / (IMAGE_FADE_END - IMAGE_FADE_START),
    );
    smoothImageOpacity += (imageProgress - smoothImageOpacity) * 0.5;
    smoothImageScale +=
      (IMAGE_SCALE_START + (1 - IMAGE_SCALE_START) * imageProgress - smoothImageScale) * 0.5;
    if (refs.imageStage.current) {
      refs.imageStage.current.style.opacity = String(smoothImageOpacity);
      refs.imageStage.current.style.transform = `translate(-50%, -50%) scale(${smoothImageScale})`;
      if (refs.imageStage.current.querySelector("iframe")) {
        refs.imageStage.current.style.pointerEvents = smoothImageOpacity > 0.65 ? "auto" : "none";
      }
    }

    shaderProgram.setUniform("uTapRippleMode", TAP_RIPPLE_MODE);
    shaderProgram.setUniform("uRippleCount", 0);
    shaderProgram.setUniform("uRipplePoints", EMPTY_RIPPLE_ARRAY);

    shaderProgram.setUniform("uTime", p.millis() * 0.001);
    shaderProgram.setUniform("uResolution", [p.width, p.height]);

    shaderProgram.setUniform("uBands", smoothBands);
    shaderProgram.setUniform("uSpeed", smoothSpeed);
    shaderProgram.setUniform("uFlowStrength", BASE_PARAMS.flow);
    shaderProgram.setUniform("uShearStrength", BASE_PARAMS.shear);
    shaderProgram.setUniform("uRippleShape", BASE_PARAMS.shape);
    shaderProgram.setUniform("uRippleNoise", BASE_PARAMS.rippleNoise);
    shaderProgram.setUniform("uRippleGap", BASE_PARAMS.rippleGap);

    shaderProgram.setUniform("uOrigin", LOCKED_ORIGIN);

    shaderProgram.setUniform("uGradientMotion", BASE_PARAMS.motion);
    shaderProgram.setUniform("uGradientSoftness", BASE_PARAMS.softness);
    shaderProgram.setUniform("uGradientScale", BASE_PARAMS.scale);
    shaderProgram.setUniform("uGradientRotation", BASE_PARAMS.rotation);
    shaderProgram.setUniform("uGradientWobble", BASE_PARAMS.wobble);

    shaderProgram.setUniform("uSaturation", currentLook.saturation);
    shaderProgram.setUniform("uVibrancy", currentLook.vibrancy);
    shaderProgram.setUniform("uContrast", currentLook.contrast);

    shaderProgram.setUniform("uPalette", currentPaletteFlat);
    shaderProgram.setUniform("uUseCustomPalette", true);

    p.rect(-p.width / 2, -p.height / 2, p.width, p.height);
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export type OurPromiseProps = {
  eyebrow?: string;
  headline?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  /** Reveals the homepage's interactive Impact graph in place of the image. */
  impactGraph?: boolean;
  /**
   * "section" pins the effect inside its own tall section; "fixed" is the
   * demo's original whole-page behavior.
   */
  mode?: "section" | "fixed";
  scrollTriggerPx?: number;
  scrollSpacerVh?: number;
  className?: string;
  style?: CSSProperties;
};

export function OurPromise({
  eyebrow = "OUR PROMISE",
  headline = (
    <>
      Intelligence you can audit<span className="our-promise-question-mark">.</span>
      <br />
      Every model we ship carries its evidence with it.
    </>
  ),
  imageSrc,
  imageAlt = "",
  impactGraph = false,
  mode = "section",
  scrollTriggerPx = SCROLL_TRIGGER_PX,
  scrollSpacerVh = SCROLL_SPACER_VH,
  className,
  style,
}: OurPromiseProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const imageStageRef = useRef<HTMLDivElement>(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    // In section mode the driver is how far this section's own top has passed
    // the top of the viewport, so the animation runs while it is on screen
    // rather than tracking absolute page scroll.
    const readScroll = () => {
      if (mode === "fixed") {
        scrollYRef.current = window.scrollY;
        return;
      }
      const top = rootRef.current?.getBoundingClientRect().top ?? 0;
      scrollYRef.current = Math.max(0, -top);
    };
    readScroll();

    const refs: SketchRefs = {
      scrollY: scrollYRef,
      readScroll,
      heroText: heroTextRef,
      imageStage: imageStageRef,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let instance: any = null;
    let cancelled = false;
    let onScreen = false;
    let observer: IntersectionObserver | null = null;

    const sync = () => {
      if (!instance) return;
      if (onScreen && !document.hidden) instance.loop();
      else instance.noLoop();
    };

    // p5 touches `window` at import time, so it is loaded here rather than at
    // module scope, which would break server rendering.
    import("p5").then(({ default: p5 }) => {
      const host = canvasHostRef.current;
      const root = rootRef.current;
      if (cancelled || !host || !root) return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      instance = new p5((p: any) => sketch(p, refs, scrollTriggerPx), host);
      instance.noLoop();

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) onScreen = entry.isIntersecting;
          sync();
        },
        { rootMargin: "200px" },
      );
      observer.observe(root);
      document.addEventListener("visibilitychange", sync);
    });

    return () => {
      cancelled = true;
      observer?.disconnect();
      document.removeEventListener("visibilitychange", sync);
      instance?.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, scrollTriggerPx]);

  const isSection = mode === "section";

  return (
    <div
      ref={rootRef}
      className={cn("our-promise", isSection && "our-promise--section", className)}
      style={{ ...(isSection ? { height: `${scrollSpacerVh}vh` } : null), ...style }}
      aria-label="Our promise"
    >
      <div className="our-promise-stage">
        <div ref={canvasHostRef} className="our-promise-canvas-host" />

        <div ref={heroTextRef} className="our-promise-hero-text">
          <div className="our-promise-eyebrow">{eyebrow}</div>
          <p className="our-promise-headline">{headline}</p>
        </div>

        {imageSrc || impactGraph ? (
          <div
            ref={imageStageRef}
            className={cn("our-promise-image-stage", impactGraph && "our-promise-image-stage--impact")}
          >
            {impactGraph ? (
              <iframe
                className="our-promise-impact-frame"
                src="/impact/section.html"
                title="Interactive Impact knowledge graph"
                loading="lazy"
              />
            ) : null}
            {/* Plain <img>: the sketch drives this element's own opacity and
                transform every frame, and it is decorative. */}
            {!impactGraph && imageSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="our-promise-image" src={imageSrc} alt={imageAlt} />
            ) : null}
          </div>
        ) : null}
      </div>

      {!isSection ? (
        <div className="our-promise-scroll-spacer" style={{ height: `${scrollSpacerVh}vh` }} />
      ) : null}
    </div>
  );
}
