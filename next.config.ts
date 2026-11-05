import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    localPatterns: [
      {
        pathname: "/api/media/file/**",
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      ".cjs": [".cts", ".cjs"],
      ".js": [".ts", ".tsx", ".js", ".jsx"],
      ".mjs": [".mts", ".mjs"],
    };
    return webpackConfig;
  },
  turbopack: {
    root: path.resolve(dirname),
  },
  // 17 Oct content handoff: services are named and addressed without "HLL"
  // (Foundation became Data & Analytics). Old links keep working.
  async redirects() {
    const services: [string, string][] = [
      ["hll-foundation", "data-analytics"],
      ["hll-application", "applications"],
      ["hll-ai", "ai"],
      ["hll-trust", "trust-governance"],
      ["hll-people", "people-policy"],
      ["hll-ontology", "ontology"],
      ["hll-cloud", "cloud"],
    ];
    // 29 Oct handoff: the two Public Sector industry pages became one.
    const industries: [string, string][] = [
      ["public-sector-external-affairs", "public-sector-government-services"],
      ["public-sector-tax-commerce", "public-sector-government-services"],
    ];
    return [
      ...services.map(([from, to]) => ({
        source: `/services/${from}`,
        destination: `/services/${to}`,
        permanent: true,
      })),
      ...industries.map(([from, to]) => ({
        source: `/industries/${from}`,
        destination: `/industries/${to}`,
        permanent: true,
      })),
      // 5 Nov handoff: Voxxy Media is not to be published (Hannan, 4 Nov).
      { source: "/engagement/voxxy-media", destination: "/engagement", permanent: true },
    ];
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
