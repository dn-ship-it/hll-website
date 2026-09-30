"use client";

import { useEffect } from "react";

/** Longest title reveal (the 1200ms "slow" sweep) plus a margin. */
const MAX_WAIT_MS = 1600;

/**
 * Client feedback: pages showed their content while the title was still
 * animating in. <main> is rendered with data-intro="pending", which CSS uses to
 * hide everything but the page's <h1>; once the title's reveal animation ends
 * this flips it to "done" and the rest of the page fades in.
 */
export function PageIntro() {
  useEffect(() => {
    const main = document.querySelector<HTMLElement>("main[data-intro]");
    if (!main) return undefined;

    const title = main.querySelector("h1");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      main.dataset.intro = "done";
    };

    if (!title || reduceMotion) {
      finish();
      return undefined;
    }

    // The reveal is a chain of CSS animations inside the heading; the last one
    // to end marks the title as settled. The timeout covers titles that never
    // animate (already visible, or animation disabled).
    let lastEnd = 0;
    const onEnd = () => {
      window.clearTimeout(lastEnd);
      lastEnd = window.setTimeout(finish, 120);
    };
    title.addEventListener("animationend", onEnd);
    const fallback = window.setTimeout(finish, MAX_WAIT_MS);

    return () => {
      title.removeEventListener("animationend", onEnd);
      window.clearTimeout(lastEnd);
      window.clearTimeout(fallback);
    };
  }, []);

  return null;
}
