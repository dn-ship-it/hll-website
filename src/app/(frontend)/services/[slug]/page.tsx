import { notFound } from "next/navigation";

import { ServicePage } from "@/components/marketing/services/service-page";
import { getServicePage } from "@/data/services";

// Rendered on first visit, then served from the cache; CMS changes refresh it
// through revalidatePath.
export async function generateStaticParams() {
  return [];
}

export default async function ServiceVerticalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = getServicePage(slug);
  if (!content) notFound();
  return <ServicePage content={content} />;
}
