"use client";

// Hannan's Careers image block (28 Oct, "Career page bottom image.zip"): the
// team in pills with the HLL ripple moving behind them. The files beside this
// one are the handoff's, unchanged (see README.md); this is its React wrapper.
import { useEffect, useRef } from "react";

// @ts-expect-error — the handoff's vanilla ES module has no types.
import { mountTeamSkyline } from "./team-skyline.js";
import { TEAM } from "./team.js";
import "./team-skyline.css";

export function TeamSkyline({ className }: { className?: string }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const instance = mountTeamSkyline(ref.current, { team: TEAM, imageBase: "/assets/about/team/" });
    return () => instance.destroy();
  }, []);
  return <section ref={ref} aria-label="The HLL team" data-snap="off" className={className} />;
}
