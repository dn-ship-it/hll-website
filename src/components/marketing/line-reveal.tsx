"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Figma glossary: "Horizontal lines in the website are to be animated to
 * appear gracefully from left to right when in screen." Every [data-line] on
 * the page draws in once, including lines added later (an opened accordion,
 * a filtered list).
 */
export function LineReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      // A line starts at scaleX(0), so it has no area to measure a ratio
      // of: fire as soon as it touches the (slightly inset) viewport.
      { threshold: 0, rootMargin: "0px 0px -4% 0px" },
    );
    // Tracked per run, not by class: a re-run (React re-mounting effects in
    // development, a route change) must observe the same lines again.
    const seen = new WeakSet<Element>();
    const watch = (root: ParentNode) => {
      root
        .querySelectorAll<HTMLElement>("[data-line]:not(.is-visible)")
        .forEach((line) => {
          if (seen.has(line)) return;
          seen.add(line);
          line.classList.add("line-draw-in");
          observer.observe(line);
        });
    };
    watch(document);
    const mutations = new MutationObserver(() => watch(document));
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, [pathname]);

  return null;
}
