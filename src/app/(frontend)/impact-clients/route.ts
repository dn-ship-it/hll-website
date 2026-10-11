import { getMarketingContent } from "@/lib/payload/queries";

export const dynamic = "force-dynamic";

/**
 * The Our Promise graph's client rows from the CMS (Marketing content › Home
 * page › Impact graph), in the shape public/impact/section.html reads. An
 * empty list tells the graph to keep its built-in rows.
 */
export async function GET() {
  try {
    const rows = (await getMarketingContent())?.home?.impactGraph?.clients ?? [];
    return Response.json(
      rows.map((row, i) => ({
        key: `cms-${i}`,
        name: row.name,
        industry: row.industry,
        href: row.href ?? "",
        services: row.services ?? [],
      })),
    );
  } catch {
    return Response.json([]);
  }
}
