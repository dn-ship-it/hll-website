"use client";

import { useEffect, type ReactNode } from "react";

/** The Services design uses a quiet, one-time fade-up for copy and media. */
export function ServiceReveal({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = document.querySelectorAll<HTMLElement>(
      ".hll-service-page p, .hll-service-page [data-service-media]",
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -4% 0px" },
    );

    elements.forEach((element) => {
      element.classList.add("service-fade-in");
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return <>{children}</>;
}
