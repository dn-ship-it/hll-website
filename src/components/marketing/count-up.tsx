"use client";

import { useEffect, useRef, useState } from "react";

const DURATION_MS = 1400;

/**
 * Figma glossary "number counter": the number counts from 0 to its target
 * when it comes on screen. Anything around the number ("30+", "65%") stays
 * as written, and the target's decimals are kept.
 */
export function CountUp({
  value,
  className,
  start = true,
}: {
  value: string;
  className?: string;
  start?: boolean;
}) {
  const match = value.match(/^(\D*)(\d+(?:[.,]\d+)?)(.*)$/);
  const target = match ? Number(match[2].replace(",", ".")) : 0;
  const decimals = match?.[2].split(/[.,]/)[1]?.length ?? 0;
  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState<number | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!match || !node || !start) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return undefined;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const began = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - began) / DURATION_MS);
          setCurrent(target * (1 - Math.pow(1 - t, 3)));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    setCurrent(0);
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, start]);

  if (!match) return <span className={className}>{value}</span>;
  const shown = current === null ? match[2] : current.toFixed(decimals);
  return (
    <span ref={ref} className={className} aria-label={value}>
      <span aria-hidden>
        {match[1]}
        {shown}
        {match[3]}
      </span>
    </span>
  );
}
