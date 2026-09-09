"use client";

// bottom-shader.tsx — the same jewel-refraction WebGL2 effect as Shader
// (shader-runtime.ts, reused as-is, not forked), anchored to the bottom of
// the viewport instead of covering it. Ported from HLL-UI-Demo's
// BottomShader.jsx: purely a positioning variant of the one real engine.
import { useEffect, useRef, type CSSProperties } from "react";

import { cn } from "@/lib/utils";

import type { HLLVariant } from "../variants";

import { DEFAULT_LAYOUT, type BottomShaderLayout } from "./bottom-shader-definition";
import {
  BLUE_NOISE_SIZE,
  MULTIPLIER,
  TRANSPARENT_SETTINGS,
  type ShaderSettings,
} from "./shader-definition";
import { createShaderFX } from "./shader-runtime";
import { bottomShaderVariants, resolveVariantColors } from "./shader-variants";

function layoutStyle(layout: BottomShaderLayout) {
  return {
    "--bottom-shader-height": layout.HOST_HEIGHT,
    "--bottom-shader-canvas-height": layout.CANVAS_HEIGHT,
    "--bottom-shader-fade-hold-end": `${layout.FADE_HOLD_END}%`,
    "--bottom-shader-fade-solid-start": `${layout.FADE_SOLID_START}%`,
    "--bottom-shader-fade-color": layout.FADE_COLOR,
  } as CSSProperties;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export type BottomShaderProps = {
  variant?: HLLVariant;
  colors?: string[];
  /**
   * The demo requires this explicitly. It defaults to TRANSPARENT_SETTINGS
   * here so a plain <BottomShader variant="..."/> composites over the page
   * rather than painting an opaque plate over the bottom of it.
   * Must be a stable reference — a new object each render remounts the effect.
   */
  settings?: ShaderSettings;
  /**
   * Together with `endShatter`, the "scrolled to the bottom" transition:
   * shatter eases toward `endShatter` while the output pass eases from
   * see-through to a fully opaque cap. Omit `endShatter` to skip it entirely.
   */
  atEnd?: boolean;
  endShatter?: { scale: number; amount: number };
  /** Applies mix-blend-mode: hard-light to the host so it reads the page behind it. */
  overlay?: boolean;
  /** Anchors the strip to its nearest positioned ancestor instead of the viewport. */
  contained?: boolean;
  /** Background usage: never swallow clicks and hovers meant for the content. */
  passthrough?: boolean;
  layout?: BottomShaderLayout;
  pauseOnDoubleClick?: boolean;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
};

export function BottomShader({
  variant = "services",
  colors,
  settings = TRANSPARENT_SETTINGS,
  atEnd = false,
  endShatter,
  overlay = false,
  contained = false,
  passthrough = false,
  layout = DEFAULT_LAYOUT,
  pauseOnDoubleClick = false,
  disabled = false,
  className,
  style,
}: BottomShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resolvedColors = resolveVariantColors(variant, colors);

  // Read by the transition loop every frame instead of closing over the prop,
  // so flipping the flag never tears down the WebGL context.
  const atEndRef = useRef(atEnd);
  atEndRef.current = atEnd;

  useEffect(() => {
    if (disabled) return undefined;
    // Cloned per mount so neither the transition loop below nor the runtime's
    // live reads mutate the caller's settings object.
    const liveSettings: ShaderSettings = JSON.parse(JSON.stringify(settings));
    const fx = createShaderFX(canvasRef.current, {
      colors: resolvedColors,
      settings: liveSettings,
      multiplier: MULTIPLIER,
      blueNoiseSize: BLUE_NOISE_SIZE,
      pauseOnDoubleClick,
      pointerMaxY: layout.POINTER_MAX_Y,
    });

    let raf: number | null = null;
    if (endShatter) {
      const baseShatter = {
        scale: liveSettings.shatter.scale,
        amount: liveSettings.shatter.amount,
      };
      let progress = 0;

      const tick = () => {
        const target = atEndRef.current ? 1 : 0;
        progress = lerp(progress, target, 0.08);
        if (Math.abs(progress - target) < 0.001) progress = target;

        liveSettings.shatter.scale = lerp(baseShatter.scale, endShatter.scale, progress);
        liveSettings.shatter.amount = lerp(baseShatter.amount, endShatter.amount, progress);
        liveSettings.output.capAmount = progress;

        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }

    return () => {
      if (raf != null) cancelAnimationFrame(raf);
      fx.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant, colors?.join(","), pauseOnDoubleClick, disabled, settings, endShatter, layout]);

  const isOverlay = overlay || Boolean(endShatter);

  return (
    <div
      className={cn(
        bottomShaderVariants({
          variant,
          disabled: disabled || undefined,
          contained: contained || undefined,
          passthrough: passthrough || undefined,
        }),
        isOverlay && "bottom-shader--overlay",
        className,
      )}
      style={{ ...layoutStyle(layout), ...style }}
    >
      <canvas ref={canvasRef} className="bottom-shader__canvas" />
    </div>
  );
}
