"use client";

import { useEffect, useRef, useState } from "react";

import { HLLButton } from "@/components/hll";
import { BUTTON_MOBILE } from "@/components/marketing/button-sizes";

/**
 * The JD's Apply button. It sits under the summary (phones: on the text's left
 * edge; desktop: centred, 84px down), and once it has scrolled up out of view
 * a copy stays fixed at the bottom centre of the screen (QA J-01, J-03) until
 * the footer comes in, so Apply is always one tap away while reading.
 */
export function JdApply({ href }: { href: string }) {
  const inlineRef = useRef<HTMLDivElement>(null);
  const [passed, setPassed] = useState(false);
  const [footerIn, setFooterIn] = useState(false);

  useEffect(() => {
    const inline = inlineRef.current;
    if (!inline) return undefined;
    // Passed = the inline button has left the screen through its top edge.
    const inlineObserver = new IntersectionObserver(([entry]) =>
      setPassed(!entry.isIntersecting && entry.boundingClientRect.top < 0),
    );
    inlineObserver.observe(inline);

    const footer = document.querySelector("footer");
    const footerObserver = new IntersectionObserver(([entry]) =>
      setFooterIn(entry.isIntersecting),
    );
    if (footer) footerObserver.observe(footer);

    return () => {
      inlineObserver.disconnect();
      footerObserver.disconnect();
    };
  }, []);

  const pinned = passed && !footerIn;

  return (
    <>
      <div
        ref={inlineRef}
        className="mt-[84px] flex justify-start lg:justify-center"
      >
        <HLLButton href={href} variant="contact" size="md" className={BUTTON_MOBILE}>
          Apply
        </HLLButton>
      </div>

      {/* Hidden copies are `invisible`, so they're out of the tab order too. */}
      <div
        aria-hidden={!pinned || undefined}
        className={`pointer-events-none fixed inset-x-0 bottom-8 z-30 flex justify-center transition-[opacity,transform,visibility] duration-300 ${
          pinned ? "translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0"
        }`}
      >
        <span className="pointer-events-auto">
          <HLLButton
            href={href}
            variant="contact"
            size="md"
            className={BUTTON_MOBILE}
          >
            Apply
          </HLLButton>
        </span>
      </div>
    </>
  );
}
