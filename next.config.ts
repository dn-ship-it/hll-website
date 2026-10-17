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
    return services.map(([from, to]) => ({
      source: `/services/${from}`,
      destination: `/services/${to}`,
      permanent: true,
    }));
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
