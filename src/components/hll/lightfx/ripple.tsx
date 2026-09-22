"use client";

// ripple.tsx — React wrapper around the "HLL Ripples" p5.js sketch, ported
// from HLL-UI-Demo's Ripple.jsx and CornerRipple.jsx (one component here; the
// two demo folders differ only in ripple origin — see ripple-definition.ts).
//
// p5's original global-mode sketch doesn't fit a component that mounts and
// unmounts, so this uses instance mode, and the shader source comes from
// ripple-shaders.ts rather than a loadShader() network fetch.
//
// p5 touches `window` at import time, so it is loaded dynamically inside the
// effect instead of at module scope, which would break server rendering.
import { useEffect, useRef, type CSSProperties } from "react";

import { cn } from "@/lib/utils";

import {
  MAX_RIPPLES,
  RIPPLE_ORIGINS,
  resolveVariantParams,
  resolveVariantPalette,
  buildPalette,
  TAP_RIPPLE_MODE,
  type RippleOrigin,
  type RippleParams,
  type RippleVariant,
} from "./ripple-definition";
import { RIPPLE_FRAG_SRC, RIPPLE_VERT_SRC } from "./ripple-shaders";

type Palette = [number, number, number][];

/* eslint-disable @typescript-eslint/no-explicit-any */
function sketch(
  p: any,
  getPalette: () => Palette,
  getParams: () => RippleParams,
  getOrigin: () => [number, number],
) {
  let shaderProgram: any;
  let ripplePoints: { x: number; y: number }[] = [];

  function getSpacedRipplePoints(spacing: number) {
    if (ripplePoints.length === 0) return [];

    let cx = 0;
    let cy = 0;
    for (const pt of ripplePoints) {
      cx += pt.x;
      cy += pt.y;
    }
    cx /= ripplePoints.length;
    cy /= ripplePoints.length;

    return ripplePoints.map((pt) => ({
      x: cx + (pt.x - cx) * spacing,
      y: cy + (pt.y - cy) * spacing,
    }));
  }

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.noStroke();
    shaderProgram = p.createShader(RIPPLE_VERT_SRC, RIPPLE_FRAG_SRC);
  };

  p.draw = () => {
    p.background(0);
    p.shader(shaderProgram);

    const params = getParams();
    const spacedPoints = getSpacedRipplePoints(params.rippleSpacing);

    const rippleArray: number[] = [];
    for (let i = 0; i < MAX_RIPPLES; i++) {
      if (i < spacedPoints.length) {
        rippleArray.push(spacedPoints[i].x, spacedPoints[i].y);
      } else {
        rippleArray.push(-10, -10);
      }
    }

    shaderProgram.setUniform("uTapRippleMode", TAP_RIPPLE_MODE);
    shaderProgram.setUniform("uRippleCount", spacedPoints.length);
    shaderProgram.setUniform("uRipplePoints", rippleArray);

    shaderProgram.setUniform("uTime", p.millis() * 0.001);
    shaderProgram.setUniform("uResolution", [p.width, p.height]);

    shaderProgram.setUniform("uBands", params.bands);
    shaderProgram.setUniform("uSpeed", params.speed);
    shaderProgram.setUniform("uFlowStrength", params.flow);
    shaderProgram.setUniform("uShearStrength", params.shear);
    shaderProgram.setUniform("uRippleShape", params.shape);
    shaderProgram.setUniform("uRippleNoise", params.rippleNoise);
    shaderProgram.setUniform("uRippleGap", params.rippleSpacing);

    shaderProgram.setUniform("uOrigin", getOrigin());

    shaderProgram.setUniform("uGradientMotion", params.motion);
    shaderProgram.setUniform("uGradientSoftness", params.soft);
    shaderProgram.setUniform("uGradientScale", params.scale);
    shaderProgram.setUniform("uGradientRotation", params.rot);
    shaderProgram.setUniform("uGradientWobble", params.wobble);

    shaderProgram.setUniform("uSaturation", params.saturation);
    shaderProgram.setUniform("uVibrancy", params.vibrancy);
    shaderProgram.setUniform("uContrast", params.contrast);

    shaderProgram.setUniform("uPalette", getPalette().flat());
    shaderProgram.setUniform("uUseCustomPalette", true);

    p.rect(-p.width / 2, -p.height / 2, p.width, p.height);
  };

  p.mousePressed = () => {
    if (!TAP_RIPPLE_MODE) return;

    ripplePoints.push({
      x: p.mouseX / p.width,
      y: 1.0 - p.mouseY / p.height,
    });

    if (ripplePoints.length > MAX_RIPPLES) ripplePoints.shift();
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export type RippleProps = {
  variant?: RippleVariant;
  /** "center" is the plain ripple; "corner" pins the origin to the top right. */
  origin?: RippleOrigin;
  /** One-off palette override, same role as HLLButton's `gradient`. */
  palette?: string[];
  /**
   * Scopes the backdrop to its nearest positioned ancestor instead of the
   * viewport. The canvas still renders at viewport size — that is what the
   * sketch's own layout math assumes — so the host crops it.
   */
  contained?: boolean;
  className?: string;
  style?: CSSProperties;
};

export function Ripple({
  variant = "hll-application",
  origin = "center",
  palette,
  contained = false,
  className,
  style,
}: RippleProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  // Kept in refs the sketch reads every frame, so changing a variant updates
  // live uniforms rather than tearing down and rebuilding the p5 instance.
  const paletteRef = useRef<Palette>([]);
  paletteRef.current =
    palette && palette.length >= 2 ? buildPalette(palette) : resolveVariantPalette(variant);

  const paramsRef = useRef<RippleParams>(resolveVariantParams(variant));
  paramsRef.current = resolveVariantParams(variant);

  const originRef = useRef<[number, number]>(RIPPLE_ORIGINS[origin]);
  originRef.current = RIPPLE_ORIGINS[origin];

  useEffect(() => {
    // The sketch draws a viewport-sized fragment shader every frame, so left
    // unattended it costs the same parked off screen as it does in view. It is
    // only allowed to run while the host is near the viewport and the tab is
    // foregrounded.
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

    import("p5").then(({ default: p5 }) => {
      const host = hostRef.current;
      if (cancelled || !host) return;

      instance = new p5(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (p: any) =>
          sketch(
            p,
            () => paletteRef.current,
            () => paramsRef.current,
            () => originRef.current,
          ),
        host,
      );
      instance.noLoop();

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) onScreen = entry.isIntersecting;
          sync();
        },
        { rootMargin: "200px" },
      );
      observer.observe(host);
      document.addEventListener("visibilitychange", sync);
    });

    return () => {
      cancelled = true;
      observer?.disconnect();
      document.removeEventListener("visibilitychange", sync);
      instance?.remove();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className={cn("ripple", contained && "ripple--contained", className)}
      style={style}
    />
  );
}

/** The corner-origin preset, HLL-UI-Demo's CornerRipple. */
export function CornerRipple(props: Omit<RippleProps, "origin">) {
  return <Ripple {...props} origin="corner" />;
}
