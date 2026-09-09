"use client";

// menu-trigger-overlay.tsx — the jewel-refraction Shader mounted over other
// page content as a background animation. No `mix-blend-mode`, just plain
// alpha compositing with `background.transparent: true` (see the runtime's
// `transparentBg`), so the content behind it shows through wherever the effect
// chain itself doesn't paint instead of an opaque plate hiding it.
//
// The demo version hardcodes a placeholder Services.png backdrop. Here the
// backdrop is whatever the caller renders as `children`, with `imageSrc` kept
// as an option for the image-backdrop case.
import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

import type { HLLVariant } from "../variants";

import { TRANSPARENT_SETTINGS } from "./shader-definition";
import { Shader } from "./shader";

export type MenuTriggerOverlayProps = {
  variant?: HLLVariant;
  colors?: string[];
  /** Optional image backdrop, rendered in flow so it scrolls under the fixed canvas. */
  imageSrc?: string;
  imageAlt?: string;
  children?: ReactNode;
  /**
   * "over" composites the jewel on top of the content, matching the demo.
   * "under" keeps the content above it, for use as a plain background.
   */
  layer?: "over" | "under";
  /** Scope the canvas to this component's box instead of the whole viewport. */
  contained?: boolean;
  /** Set false only if the canvas itself needs to receive pointer events. */
  passthrough?: boolean;
  className?: string;
  style?: CSSProperties;
};

export function MenuTriggerOverlay({
  variant = "services",
  colors,
  imageSrc,
  imageAlt = "",
  children,
  layer = "over",
  contained = false,
  passthrough = true,
  className,
  style,
}: MenuTriggerOverlayProps) {
  return (
    <div
      className={cn(
        "menu-trigger-overlay",
        layer === "under" && "menu-trigger-overlay--under",
        className,
      )}
    >
      {imageSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageSrc} alt={imageAlt} className="menu-trigger-overlay__image" />
      ) : null}

      {children ? <div className="menu-trigger-overlay__content">{children}</div> : null}

      <Shader
        variant={variant}
        colors={colors}
        settings={TRANSPARENT_SETTINGS}
        contained={contained}
        passthrough={passthrough}
        pauseOnDoubleClick={!passthrough}
        style={{ background: "transparent", ...style }}
      />
    </div>
  );
}
