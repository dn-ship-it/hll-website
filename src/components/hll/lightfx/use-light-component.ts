"use client";

import { useEffect, type RefObject } from "react";

import { LightComponent } from "./lightfx-runtime";

/**
 * Mounts a LightFX effect on `ref` only while it is near the viewport.
 *
 * Every LightComponent builds its own THREE.WebGLRenderer, so it holds a real
 * WebGL context and runs its own rAF loop for as long as it exists. That is
 * fine in HLL-UI-Demo, which shows a handful at a time, but a marketing page
 * can easily carry a dozen buttons, chips and shaders at once — enough to run
 * into the browser's per-page context limit, where the oldest contexts start
 * getting dropped, and enough to burn CPU animating things nobody is looking
 * at. Gating on an IntersectionObserver keeps only the on-screen ones alive.
 *
 * `deps` should carry everything that changes the definition, so a variant
 * change rebuilds the effect the same way a remount would.
 */
export function useLightComponent(
  ref: RefObject<HTMLElement | null>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buildDefinition: () => any,
  deps: unknown[],
) {
  useEffect(() => {
    const host = ref.current;
    if (!host) return undefined;

    let fx: { dispose: () => void } | null = null;

    const mount = () => {
      if (fx) return;
      fx = new LightComponent(host, buildDefinition());
    };

    const unmount = () => {
      fx?.dispose();
      fx = null;
    };

    // A margin either side so the effect is already running by the time it is
    // actually on screen, rather than initializing in front of the user.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) mount();
          else unmount();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(host);

    return () => {
      observer.disconnect();
      unmount();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
