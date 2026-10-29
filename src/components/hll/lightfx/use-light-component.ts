"use client";

import { useEffect, type RefObject } from "react";

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
 *
 * `onHover` mounts it only while the host is hovered or marked
 * data-held="true", and releases it shortly after: the five Nav Bar buttons
 * are always on screen, and holding a context each pushed a busy page (a
 * capability page, 16 contexts) past the limit.
 */
export function useLightComponent(
  ref: RefObject<HTMLElement | null>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buildDefinition: () => any,
  deps: unknown[],
  { onHover = false }: { onHover?: boolean } = {},
) {
  useEffect(() => {
    const host = ref.current;
    if (!host) return undefined;
    // These are hover effects. Touch screens can't hover, and phones allow
    // only a few WebGL contexts per page: past that the browser drops canvases
    // (a sad-face placeholder) and some mobile GPUs paint the oversized canvas
    // solid white over nearby text. So without a real mouse the button stays
    // plain CSS (see .hll-outline-button in globals.css).
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return undefined;

    if (onHover) return mountOnHover(host, buildDefinition);

    let fx: { dispose: () => void } | null = null;
    let onScreen = false;
    let cancelled = false;

    // The runtime carries all of `three`, so it is fetched on first approach
    // rather than shipped with the page that merely renders a button.
    const mount = () => {
      if (fx) return;
      import("./lightfx-runtime").then(({ LightComponent }) => {
        // Resolves a tick later, by which point the host may have scrolled
        // back out or the effect been torn down.
        if (cancelled || !onScreen || fx) return;
        fx = new LightComponent(host, buildDefinition());
      });
    };

    const unmount = () => {
      fx?.dispose();
      fx = null;
    };

    // A margin either side so the effect is already running by the time it is
    // actually on screen, rather than initializing in front of the user.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) onScreen = entry.isIntersecting;
        if (onScreen) mount();
        else unmount();
      },
      { rootMargin: "200px" },
    );
    observer.observe(host);

    return () => {
      cancelled = true;
      observer.disconnect();
      unmount();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mountOnHover(host: HTMLElement, buildDefinition: () => any) {
  let fx: { dispose: () => void; hovering: boolean } | null = null;
  let cancelled = false;
  let releaseTimer = 0;
  const wanted = () => host.matches(":hover") || host.dataset.held === "true";

  const mount = () => {
    window.clearTimeout(releaseTimer);
    if (fx) return;
    import("./lightfx-runtime").then(({ LightComponent }) => {
      if (cancelled || fx || !wanted()) return;
      fx = new LightComponent(host, buildDefinition());
      // The pointer is already over it, so its own pointerenter won't come.
      fx.hovering = host.matches(":hover");
    });
  };
  // Long enough for the glow to fade out before the canvas goes.
  const release = () => {
    window.clearTimeout(releaseTimer);
    releaseTimer = window.setTimeout(() => {
      if (wanted()) return;
      fx?.dispose();
      fx = null;
    }, 800);
  };
  const onHeld = () => (host.dataset.held === "true" ? mount() : release());

  host.addEventListener("pointerenter", mount);
  host.addEventListener("pointerleave", release);
  const held = new MutationObserver(onHeld);
  held.observe(host, { attributes: true, attributeFilter: ["data-held"] });

  return () => {
    cancelled = true;
    window.clearTimeout(releaseTimer);
    host.removeEventListener("pointerenter", mount);
    host.removeEventListener("pointerleave", release);
    held.disconnect();
    fx?.dispose();
  };
}
