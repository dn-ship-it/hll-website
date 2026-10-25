"use client";

import { useEffect } from "react";

/** How far (in screen heights) a section's top may be from the top of the
 *  screen, in the direction of travel, for the page to glide to it. The client
 *  review (21 Oct): "when a user is about 40–50% into a section, snap it into
 *  view so it fills the screen". */
const REACH = 0.5;
/** Phones: sections are taller than the screen and a flick travels far, so
 *  the page only glides when a section's top is close. */
const REACH_PHONE = 0.3;
/** Without a `scrollend` event (older Safari), scrolling counts as finished
 *  after this long without a scroll event. */
const IDLE_MS = 140;
const DESKTOP = "(min-width: 1024px)";

/**
 * Section snapping, one approach across the site (QA G-04, client review 21
 * Oct). When scrolling stops and the top of a section is within half a screen
 * of the top in the direction you were going, the page glides it up to sit
 * just under the Nav Bar. Snap targets are the page's top-level sections;
 * a section opts out with `data-snap="off"`. Tall, scroll-driven sections
 * (the Capabilities wheel, Our Values) keep working: in their middle no top
 * is near, so nothing snaps. Reduced motion jumps instead of gliding.
 * Phones snap too (G-04 mobile), but never while a finger is on the screen:
 * only once it's lifted and the flick has run out.
 */
export function SectionSnap() {
  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const hasScrollEnd = "onscrollend" in window;
    let lastY = window.scrollY;
    let lastScrollAt = 0;
    let direction = 0;
    let idle = 0;
    // Our own glide fires scroll events too; ignore them until it settles.
    let gliding = false;
    let glideTimer = 0;
    // Wheel, keys, touch and the scrollbar are the user; anything else
    // (anchors, our glide) isn't followed by a snap of its own.
    let userScrolled = false;
    const markUser = () => {
      userScrolled = true;
    };
    // A finger on the screen: hold any snap until it lifts.
    let touching = false;
    let touchStartY = 0;
    const onTouchStart = () => {
      touching = true;
      touchStartY = window.scrollY;
    };
    const onTouchEnd = () => {
      touching = false;
      // A sideways swipe (a carousel) or a tap didn't move the page.
      if (Math.abs(window.scrollY - touchStartY) < 2) {
        userScrolled = false;
        return;
      }
      // The browser may have called the scroll finished while the finger was
      // still down, so don't count on another scroll end: snap once the page
      // has been still for a moment, waiting out any momentum.
      const settle = () => {
        if (performance.now() - lastScrollAt < IDLE_MS - 20) {
          idle = globalThis.setTimeout(settle, IDLE_MS) as unknown as number;
        } else {
          snap();
        }
      };
      globalThis.clearTimeout(idle);
      idle = globalThis.setTimeout(settle, IDLE_MS) as unknown as number;
    };
    // Scrolling keys only, not typing in a form field.
    const SCROLL_KEYS = new Set(["ArrowDown", "ArrowUp", "PageDown", "PageUp", " ", "Home", "End"]);
    const onKey = (event: KeyboardEvent) => {
      const field = (event.target as HTMLElement | null)?.closest("input, textarea, select, [contenteditable]");
      if (SCROLL_KEYS.has(event.key) && !field) markUser();
    };
    // A press on the scrollbar lands on <html>; a click on a link or button
    // (which may scroll the page itself) doesn't count.
    const onPointer = (event: PointerEvent) => {
      if (event.target === document.documentElement) markUser();
    };

    const navHeight = () =>
      parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 0;

    const targets = () =>
      [...document.querySelectorAll<HTMLElement>("main section")].filter(
        (section) =>
          !section.parentElement?.closest("section") &&
          section.dataset.snap !== "off" &&
          section.offsetHeight > 0,
      );

    const snap = () => {
      if (touching || gliding || !userScrolled || direction === 0) return;
      userScrolled = false;
      const top = navHeight();
      const reach = window.innerHeight * (desktop.matches ? REACH : REACH_PHONE);
      let best: { el: HTMLElement; offset: number } | null = null;
      for (const el of targets()) {
        // Where the section's top sits against the line under the Nav Bar.
        const offset = el.getBoundingClientRect().top - top;
        if (Math.abs(offset) < 2) return; // Already lined up.
        const ahead = direction > 0 ? offset > 0 && offset <= reach : offset < 0 && -offset <= reach;
        if (ahead && (!best || Math.abs(offset) < Math.abs(best.offset))) best = { el, offset };
      }
      if (!best) return;
      // Never past the end of the page: the last section may be shorter than
      // the screen.
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = Math.min(max, Math.max(0, window.scrollY + best.offset));
      if (Math.abs(y - window.scrollY) < 2) return;
      gliding = true;
      window.clearTimeout(glideTimer);
      glideTimer = window.setTimeout(() => {
        gliding = false;
        lastY = window.scrollY;
      }, 900);
      window.scrollTo({ top: y, behavior: reduce.matches ? "auto" : "smooth" });
    };

    const onScroll = () => {
      const y = window.scrollY;
      lastScrollAt = performance.now();
      if (y !== lastY) direction = y > lastY ? 1 : -1;
      lastY = y;
      if (!hasScrollEnd) {
        globalThis.clearTimeout(idle);
        idle = globalThis.setTimeout(snap, IDLE_MS) as unknown as number;
      }
    };
    const onScrollEnd = () => {
      if (gliding) return;
      snap();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scrollend", onScrollEnd);
    window.addEventListener("wheel", markUser, { passive: true });
    window.addEventListener("touchmove", markUser, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.clearTimeout(idle);
      window.clearTimeout(glideTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", onScrollEnd);
      window.removeEventListener("wheel", markUser);
      window.removeEventListener("touchmove", markUser);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, []);

  return null;
}
