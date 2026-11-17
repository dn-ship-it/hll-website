"use client";

// The team in pills with the HLL ripple moving behind them; the files beside this one are unchanged (see README.md).
import { useEffect, useRef } from "react";

// @ts-expect-error -- plain ES module without types.
import { mountTeamSkyline } from "./team-skyline.js";
import { TEAM } from "./team.js";
import "./team-skyline.css";

export function TeamSkyline({ className }: { className?: string }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const instance = mountTeamSkyline(ref.current, { team: TEAM, imageBase: "/assets/about/team/" });
    return () => instance.destroy();
  }, []);
  return <section ref={ref} aria-label="The HLL team" className={className} />;
}
