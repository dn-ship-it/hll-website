import path from "path";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Careers } from "./collections/Careers";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { Posts } from "./collections/Posts";
import { Services } from "./collections/Services";
import { Tenders } from "./collections/Tenders";
import { Users } from "./collections/Users";
import { SiteSettings } from "./globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const usePostgres = Boolean(process.env.DATABASE_URI?.startsWith("postgres"));

const s3Enabled = Boolean(process.env.S3_BUCKET);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: "— HLL CMS",
    },
  },
  collections: [Users, Media, Pages, Services, Tenders, Posts, Careers],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: usePostgres
    ? postgresAdapter({
        pool: {
          connectionString: process.env.DATABASE_URI,
        },
      })
    : sqliteAdapter({
        client: {
          url: process.env.DATABASE_URI || "file:./payload.db",
        },
      }),
  sharp,
  localization: {
    locales: [
      { label: "English", code: "en" },
      { label: "Hindi", code: "hi" },
    ],
    defaultLocale: "en",
    fallback: true,
  },
  plugins: [
    ...(s3Enabled
      ? [
          s3Storage({
            collections: {
              media: true,
            },
            bucket: process.env.S3_BUCKET || "",
            config: {
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
              },
              region: process.env.S3_REGION || "ap-south-1",
              ...(process.env.S3_ENDPOINT
                ? { endpoint: process.env.S3_ENDPOINT, forcePathStyle: true }
                : {}),
            },
          }),
        ]
      : []),
  ],
  onInit: async (payload) => {
    const pages = await payload.find({
      collection: "pages",
      limit: 1,
      overrideAccess: true,
    });

    if (pages.totalDocs === 0) {
      await payload.create({
        collection: "pages",
        overrideAccess: true,
        data: {
          title: "Home",
          slug: "home",
          _status: "published",
          layout: [
            {
              blockType: "hero",
              heading: "HLL × Cornerstone India",
              subheading:
                "Digital experience platform for healthcare logistics, trust, and innovation.",
              variant: "services",
              revealSpeed: "slow",
            },
            {
              blockType: "shaderSection",
              variant: "hll-ai",
              intensity: 80,
              placement: "bottom",
            },
            {
              blockType: "contentGrid",
              heading: "Explore HLL",
              items: [
                {
                  title: "Services",
                  description: "Core capabilities and delivery models.",
                  href: "/services",
                },
                {
                  title: "About",
                  description: "Mission, leadership, and governance.",
                  href: "/about",
                },
                {
                  title: "Contact",
                  description: "Reach the Cornerstone India team.",
                  href: "/contact",
                },
              ],
            },
            {
              blockType: "cta",
              label: "Open CMS admin",
              href: "/admin",
              variant: "contact",
            },
          ],
        },
      });
    }

    try {
      const settings = await payload.findGlobal({
        slug: "site-settings",
        overrideAccess: true,
      });

      if (!settings?.headerNav?.length) {
        await payload.updateGlobal({
          slug: "site-settings",
          overrideAccess: true,
          data: {
            siteName: "HLL Cornerstone",
            headerNav: [
              { label: "Services", href: "/services", variant: "services" },
              { label: "About", href: "/about", variant: "about" },
              { label: "Contact", href: "/contact", variant: "contact" },
            ],
            footerLinks: [
              { label: "Tenders", href: "/tenders" },
              { label: "Careers", href: "/careers" },
              { label: "News", href: "/news" },
            ],
          },
        });
      }
    } catch {
      // Global may not exist yet on first migration
    }

    try {
      const foundation = await payload.find({
        collection: "services",
        where: { slug: { equals: "hll-foundation" } },
        limit: 1,
        overrideAccess: true,
      });

      if (foundation.totalDocs === 0) {
        const demoPath = path.resolve(
          dirname,
          "../public/demos/hll-foundation-data-engineering.html",
        );
        const demoHtml = readFileSync(demoPath, "utf8");

        await payload.create({
          collection: "services",
          overrideAccess: true,
          data: {
            title: "HLL Foundation",
            slug: "hll-foundation",
            variant: "hll-foundation",
            summary: "Data your business can finally trust.",
            _status: "published",
            demoWindow: {
              selectorLabel: "HLL Foundation",
              demos: [
                {
                  tabKey: "data-engineering",
                  title: "Data Engineering",
                  contentType: "inline",
                  html: demoHtml,
                },
              ],
            },
          },
        });
      }
    } catch {
      // Service seed is optional on first boot
    }
  },
});
