import { OurPromise } from "@/components/hll/our-promise";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { HomeHero, OurClients, WhatWeDo } from "@/components/marketing/home/hero-and-services";
import { OurImpact } from "@/components/marketing/home/our-impact";
import {
  HomeCta,
  HowWeWork,
  InsideTheLab,
  WhoWeAre,
} from "@/components/marketing/home/sections-bottom";

export default function HomePage() {
  return (
    <MarketingShell>
      <HomeHero />
      <WhatWeDo />
      <OurClients />
      <OurPromise />
      <OurImpact />
      <HowWeWork />
      <WhoWeAre />
      <InsideTheLab />
      <HomeCta />
    </MarketingShell>
  );
}
