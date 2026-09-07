import type { Career, Page, Service, SiteSetting } from "@/payload-types";

import { getPayloadClient } from "./client";

export async function getSiteSettings(): Promise<SiteSetting | null> {
  const payload = await getPayloadClient();
  try {
    return await payload.findGlobal({ slug: "site-settings" });
  } catch {
    return null;
  }
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "pages",
    where: {
      slug: { equals: slug },
      _status: { equals: "published" },
    },
    limit: 1,
    depth: 2,
  });

  return result.docs[0] ?? null;
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "services",
    where: {
      slug: { equals: slug },
      _status: { equals: "published" },
    },
    limit: 1,
    depth: 2,
  });

  return result.docs[0] ?? null;
}

export async function getPublishedCareers(): Promise<Career[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "careers",
    where: {
      status: { equals: "published" },
    },
    sort: "-updatedAt",
    limit: 50,
    depth: 2,
  });

  return result.docs;
}
