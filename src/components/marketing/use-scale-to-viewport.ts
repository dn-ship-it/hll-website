"use client";

import { useEffect, type RefObject } from "react";

import { pageZoom } from "@/lib/page-zoom";

/**
 * Figma (Home and Industry heroes): "window starts at given ratio with video
 * playing and then smoothly scales to viewport width and height to cover the
 * entire screen". Scales the element from its laid-out size at the top of the
 * page to covering the viewport once its centre reaches the viewport's
 * centre, rounding its corners off on the way.
 */
export function useScaleToViewport(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return undefined;
    let frame = 0;
    const update = () => {
      frame = 0;
      let top = 0;
      for (
        let el: HTMLElement | null = node;
        el;
        el = el.offsetParent as HTMLElement | null
      )
        top += el.offsetTop;
      // Layout pixels to screen pixels under the desktop design zoom.
      const z = pageZoom();
      top *= z;
      const rest = { w: node.offsetWidth * z, h: node.offsetHeight * z };
      // 0 at the top of the page, 1 once the window's centre reaches the
      // viewport's centre.
      const end = Math.max(1, top - (window.innerHeight - rest.h) / 2);
      const t = Math.min(1, Math.max(0, window.scrollY / end));
      const eased = t * t * (3 - 2 * t);
      const cover = Math.max(
        window.innerWidth / rest.w,
        window.innerHeight / rest.h,
      );
      node.style.transform = `scale(${1 + (cover - 1) * eased})`;
      node.style.borderRadius = `${8 * (1 - eased)}px`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);
}
