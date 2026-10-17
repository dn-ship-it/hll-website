import { INDUSTRY_ALIASES, INDUSTRY_PAGES } from "./industries";

/** An industry in the menus: linked when it has a page, plain text when not. */
export type IndustryMenuItem = { label: string; href: string | null };
export type IndustryMenuGroup = { title: string; items: IndustryMenuItem[] };

/** The industry's page, when one exists (e.g. Healthcare → /industries/healthcare). */
export const industryHref = (label: string) => {
  const slug = label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const id = INDUSTRY_ALIASES[slug] ?? slug;
  return INDUSTRY_PAGES[id] ? `/industries/${id}` : null;
};

const group = (title: string, labels: string[]): IndustryMenuGroup => ({
  title,
  items: labels.map((label) => ({ label, href: industryHref(label) })),
});

/**
 * Figma Industries Menu and Footer: six groups, in two rows of three (menu)
 * or two columns of three (footer). The CMS replaces it under Marketing
 * content › Industries menu; the nav, mobile menu, footer and the industry
 * page switcher all read the same list.
 */
export const DEFAULT_INDUSTRY_MENU: IndustryMenuGroup[] = [
  group("Financial Services", ["Banking", "Insurance", "Other Financial Services"]),
  group("Commerce & Consumer", ["Retail Commerce & Brands", "Travel & Hospitality", "Pet Tech"]),
  group("Health & Life Sciences", ["Healthcare", "Pharmaceuticals"]),
  group("Built Environment & Industry", ["Manufacturing", "Real Estate", "Logistics"]),
  group("Government & Public Institutions", [
    "Public Sector – External Affairs",
    "Public Sector – Tax & Commerce",
    "International Organization",
  ]),
  group("Professional Services", ["Consulting Firms"]),
];
