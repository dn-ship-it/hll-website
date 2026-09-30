import { notFound } from "next/navigation";

import { IndustryPage } from "@/components/marketing/industries/industry-page";
import { getIndustryPage } from "@/data/industries";

export default async function IndustryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = getIndustryPage(slug);
  if (!content) notFound();
  return <IndustryPage content={content} />;
}
