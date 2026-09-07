import type { Media, Service } from "@/payload-types";
import type { ServiceDemoConfig, ServiceDemoItem } from "@/types/service-demo";

import { resolveMediaUrl } from "./media";

type DemoEntry = NonNullable<NonNullable<Service["demoWindow"]>["demos"]>[number];

function resolveDemoItem(entry: DemoEntry): ServiceDemoItem | null {
  if (!entry?.tabKey) return null;

  const html = entry.html?.trim() ? entry.html.trim() : null;
  const htmlUrl =
    !html && entry.htmlFile
      ? resolveMediaUrl(entry.htmlFile as Media | number | null | undefined)
      : entry.contentType === "file"
        ? resolveMediaUrl(entry.htmlFile as Media | number | null | undefined)
        : null;

  if (!html && !htmlUrl) return null;

  return {
    tabKey: entry.tabKey,
    title: entry.title,
    html,
    htmlUrl,
  };
}

export function resolveServiceDemoConfig(service: Service | null): ServiceDemoConfig | null {
  const demoWindow = service?.demoWindow;
  if (!demoWindow) return null;

  const items =
    demoWindow.demos
      ?.map((entry) => resolveDemoItem(entry))
      .filter((item): item is ServiceDemoItem => item !== null) ?? [];

  const fallbackHtml = demoWindow.fallbackHtml?.trim() || null;
  const fallbackUrl = resolveMediaUrl(
    demoWindow.fallbackFile as Media | number | null | undefined,
  );

  if (items.length === 0 && !fallbackHtml && !fallbackUrl) {
    return null;
  }

  return {
    selectorLabel: demoWindow.selectorLabel || service?.title || "HLL Foundation",
    items,
    fallbackHtml,
    fallbackUrl,
  };
}

export const defaultFoundationDemo: ServiceDemoConfig = {
  selectorLabel: "HLL Foundation",
  items: [
    {
      tabKey: "data-engineering",
      title: "Data Engineering",
      htmlUrl: "/demos/hll-foundation-data-engineering.html",
    },
  ],
  fallbackHtml: null,
  fallbackUrl: "/demos/hll-foundation-data-engineering.html",
};

export function normalizeServiceDemoConfig(
  config: Partial<ServiceDemoConfig> | null | undefined,
): ServiceDemoConfig {
  if (!config) return defaultFoundationDemo;

  const items = Array.isArray(config.items) ? config.items : defaultFoundationDemo.items;

  return {
    selectorLabel: config.selectorLabel || defaultFoundationDemo.selectorLabel,
    items,
    fallbackHtml: config.fallbackHtml ?? defaultFoundationDemo.fallbackHtml,
    fallbackUrl: config.fallbackUrl ?? defaultFoundationDemo.fallbackUrl,
  };
}
