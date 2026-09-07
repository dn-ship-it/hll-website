import { MarketingShell } from "@/components/marketing/marketing-shell";
import {
  HomeHero,
  ProofStrip,
  ServiceVerticals,
} from "@/components/marketing/home-sections";

export default function HomePage() {
  return (
    <MarketingShell shaderVariant="services">
      <HomeHero />
      <ServiceVerticals />
      <ProofStrip />
    </MarketingShell>
  );
}
