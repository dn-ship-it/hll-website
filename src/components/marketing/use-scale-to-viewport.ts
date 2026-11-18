"use client";

import { useEffect, type RefObject } from "react";

import { pageZoom } from "@/lib/page-zoom";

/**
 * Scales the element from its laid-out size at the top of the page to covering the viewport once its centre
 * reaches the viewport's centre, rounding its corners off on the way. A `follower` (the element right under it)
 * moves down as it grows, keeping its gap to the window's bottom edge.
 */
export function useScaleToViewport(
  ref: RefObject<HTMLElement | null>,
  { desktopOnly = false, follower }: { desktopOnly?: boolean; follower?: RefObject<HTMLElement | null> } = {},
) {
  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return undefined;
    // The Home mobile frame keeps its window at rest, "See our work" below it.
    const mobile = window.matchMedia("(width < 64rem)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const next = follower?.current ?? null;
      if (desktopOnly && mobile.matches) {
        node.style.transform = "";
        node.style.borderRadius = "";
        node.style.marginBottom = "";
        if (next) {
          next.style.transform = "";
          next.style.marginBottom = "";
        }
        return;
      }
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
      // The window grows from its centre, so at full size it reaches this far past its own bottom;
      // leave room for that so it doesn't cover what follows. Fixed, not eased, so the page doesn't shift on scroll.
      const reach = ((cover - 1) * node.offsetHeight) / 2;
      if (next) {
        // The follower rides down with the growing edge and holds the room after itself instead (a margin
        // on the window would collapse into the follower's own top margin and close the gap).
        next.style.transform = `translateY(${reach * eased}px)`;
        next.style.marginBottom = `${reach}px`;
      } else {
        node.style.marginBottom = `${reach}px`;
      }
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
  }, [ref, desktopOnly, follower]);
}
