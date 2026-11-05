"use client";

import { useEffect, useRef } from "react";

/**
 * A named client's card media (5 Nov handoff, DEVELOPER-UPDATE.md): a looping
 * video, its poster until it plays, or a still alone. The video's source is
 * attached and played only while the card is near the screen, and paused when
 * it leaves; with reduced motion or data saver on, only the poster shows and
 * the video never loads. The client's logo is part of the media, so nothing is
 * laid over it.
 */
export function CardMedia({
  video,
  poster,
  className = "",
}: {
  video?: string;
  poster: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !video) return undefined;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || saveData) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!el.src) el.src = video;
          void el.play().catch(() => undefined);
        } else {
          el.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [video]);

  if (!video) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={poster} alt="" aria-hidden className={`size-full object-cover ${className}`} loading="lazy" decoding="async" />;
  }
  return (
    <video
      ref={ref}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
      className={`block size-full object-cover ${className}`}
    />
  );
}
