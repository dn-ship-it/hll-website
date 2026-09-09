"use client";

// shader.tsx — React wrapper around the "BlockGL — jewel refraction" WebGL2
// effect. A `variant` prop selects one of the design system's menu-item or
// per-service gradients (see shader-variants.ts); the vignette/sine/shatter/
// bokeh/output shape all comes from shader-definition.ts and is shared by
// every variant unchanged. `colors` is an explicit one-off override, the same
// role as HLLButton's `gradient` prop.
import { useEffect, useRef, type CSSProperties, type HTMLAttributes } from "react";

import type { HLLVariant } from "../variants";

import {
  BASE_SETTINGS,
  BLUE_NOISE_SIZE,
  MULTIPLIER,
  type ShaderSettings,
} from "./shader-definition";
import { createShaderFX } from "./shader-runtime";
import { resolveVariantColors, shaderVariants } from "./shader-variants";

export type ShaderProps = {
  variant?: HLLVariant;
  colors?: string[];
  /**
   * Defaults to the opaque, full-bleed BASE_SETTINGS. Pass TRANSPARENT_SETTINGS
   * for a usage that needs whatever is behind the canvas to show through.
   * Must be a stable reference — a new object each render remounts the effect.
   */
  settings?: ShaderSettings;
  pauseOnDoubleClick?: boolean;
  disabled?: boolean;
  /** Let clicks and hovers reach the page content underneath the canvas. */
  passthrough?: boolean;
  /** Scope the canvas to its nearest positioned ancestor instead of the viewport. */
  contained?: boolean;
  className?: string;
  style?: CSSProperties;
} & Omit<HTMLAttributes<HTMLDivElement>, "className" | "style" | "color">;

export function Shader({
  variant = "services",
  colors,
  settings = BASE_SETTINGS,
  pauseOnDoubleClick = true,
  disabled = false,
  passthrough = false,
  contained = false,
  className,
  style,
  ...rest
}: ShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resolvedColors = resolveVariantColors(variant, colors);

  // Like HLLButton's `disabled`: an inert, dimmed state. The effect is idle
  // work (a rAF loop plus a pointermove listener) even when nothing changes
  // visually, so `disabled` skips creating it entirely rather than mounting it
  // just to sit there.
  useEffect(() => {
    if (disabled) return undefined;
    // Cloned once per mount so the runtime's live mutation of the settings it
    // is handed never reaches a caller's object or the shared BASE_SETTINGS.
    const liveSettings: ShaderSettings = JSON.parse(JSON.stringify(settings));
    const fx = createShaderFX(canvasRef.current, {
      colors: resolvedColors,
      settings: liveSettings,
      multiplier: MULTIPLIER,
      blueNoiseSize: BLUE_NOISE_SIZE,
      pauseOnDoubleClick,
    });
    return () => fx.dispose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant, colors?.join(","), pauseOnDoubleClick, disabled, settings]);

  return (
    <div
      className={shaderVariants({
        variant,
        disabled: disabled || undefined,
        passthrough: passthrough || undefined,
        contained: contained || undefined,
        className,
      })}
      style={style}
      {...rest}
    >
      <canvas ref={canvasRef} className="shader__canvas" />
    </div>
  );
}
