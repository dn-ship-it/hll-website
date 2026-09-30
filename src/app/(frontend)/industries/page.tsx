import { IndustryPage } from "@/components/marketing/industries/industry-page";
import { healthcareIndustry } from "@/data/industries/healthcare";

export default function IndustriesPage() {
  return <IndustryPage content={healthcareIndustry} />;
}
