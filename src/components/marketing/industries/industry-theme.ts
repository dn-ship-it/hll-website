/**
 * Each industry page's primary colour, from the Figma "Industries Color
 * Palettes" section ("each industry page has its own primary colour
 * assigned"). It colours the capability numbers, the Named Experts eyebrow,
 * the Client Voice timer and the Related Industries wash. A design token, so
 * it lives here rather than in the CMS.
 */
const INDUSTRY_ACCENTS: Record<string, string> = {
  banking: "#2B7265",
  payments: "#06D58C",
  insurance: "#5EE9F8",
  "retail commerce & brands": "#FB500C",
  "pet tech": "#F8AF7E",
  "travel & hospitality": "#798CF6",
  "public sector – tax & commerce": "#FFDA52",
  "public sector – external affairs": "#FFBA6E",
  "international organization": "#2EB8F6",
  healthcare: "#09C1B6",
  pharmaceuticals: "#086EE8",
  "consulting firms": "#5CB3DE",
  logistics: "#3894F2",
  "real estate": "#6E6BDF",
  manufacturing: "#C27153",
};

export function getIndustryAccent(industry: string, fallback = "#09C1B6") {
  return INDUSTRY_ACCENTS[industry.trim().toLowerCase()] ?? fallback;
}
