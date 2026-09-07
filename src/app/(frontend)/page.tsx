import { MarketingShell } from "@/components/marketing/marketing-shell";
import {
  HomeCtaBand,
  HomeHero,
  MissionStrip,
  ProofStrip,
  ServiceVerticals,
} from "@/components/marketing/home-sections";

export default function HomePage() {
  return (
    <MarketingShell shaderVariant="services">
      <HomeHero />
      <ServiceVerticals />
      <MissionStrip />
      <ProofStrip />
      <HomeCtaBand />
    </MarketingShell>
  );
}
