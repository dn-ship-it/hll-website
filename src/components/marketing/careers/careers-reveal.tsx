"use client";

import { useEffect, type ReactNode } from "react";

export function CareersReveal({ children }: { children: ReactNode }) {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(
      ".hll-careers-page p, .hll-careers-page .careers-motion-media",
    );

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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
      element.classList.add("careers-fade-in");
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return <>{children}</>;
}
