import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_blocks_hero_variant" ADD VALUE 'hll-cloud';
  ALTER TYPE "public"."enum_pages_blocks_shader_section_variant" ADD VALUE 'hll-cloud';
  ALTER TYPE "public"."enum_pages_blocks_cta_variant" ADD VALUE 'hll-cloud';
  ALTER TYPE "public"."enum__pages_v_blocks_hero_variant" ADD VALUE 'hll-cloud';
  ALTER TYPE "public"."enum__pages_v_blocks_shader_section_variant" ADD VALUE 'hll-cloud';
  ALTER TYPE "public"."enum__pages_v_blocks_cta_variant" ADD VALUE 'hll-cloud';
  ALTER TYPE "public"."enum_services_blocks_hero_variant" ADD VALUE 'hll-cloud';
  ALTER TYPE "public"."enum_services_blocks_shader_section_variant" ADD VALUE 'hll-cloud';
  ALTER TYPE "public"."enum_services_blocks_cta_variant" ADD VALUE 'hll-cloud';
  ALTER TYPE "public"."enum_services_variant" ADD VALUE 'hll-cloud';
  ALTER TYPE "public"."enum__services_v_blocks_hero_variant" ADD VALUE 'hll-cloud';
  ALTER TYPE "public"."enum__services_v_blocks_shader_section_variant" ADD VALUE 'hll-cloud';
  ALTER TYPE "public"."enum__services_v_blocks_cta_variant" ADD VALUE 'hll-cloud';
  ALTER TYPE "public"."enum__services_v_version_variant" ADD VALUE 'hll-cloud';
  ALTER TYPE "public"."enum_site_settings_header_nav_variant" ADD VALUE 'hll-cloud';
  ALTER TABLE "services" ALTER COLUMN "demo_window_selector_label" SET DEFAULT 'Data & Analytics';
  ALTER TABLE "_services_v" ALTER COLUMN "version_demo_window_selector_label" SET DEFAULT 'Data & Analytics';
  ALTER TABLE "subsvc" ADD COLUMN "description" varchar;
  ALTER TABLE "services_page_content_engagement_cards" ADD COLUMN "href" varchar;
  ALTER TABLE "_subsvc_v" ADD COLUMN "description" varchar;
  ALTER TABLE "_services_v_version_page_content_engagement_cards" ADD COLUMN "href" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero" ALTER COLUMN "variant" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "variant" SET DEFAULT 'services'::text;
  DROP TYPE "public"."enum_pages_blocks_hero_variant";
  CREATE TYPE "public"."enum_pages_blocks_hero_variant" AS ENUM('services', 'industries', 'engagement', 'about', 'contact', 'hll-ai', 'hll-trust', 'hll-foundation', 'hll-ontology', 'hll-people', 'hll-application');
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "variant" SET DEFAULT 'services'::"public"."enum_pages_blocks_hero_variant";
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "variant" SET DATA TYPE "public"."enum_pages_blocks_hero_variant" USING "variant"::"public"."enum_pages_blocks_hero_variant";
  ALTER TABLE "pages_blocks_shader_section" ALTER COLUMN "variant" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_shader_section_variant";
  CREATE TYPE "public"."enum_pages_blocks_shader_section_variant" AS ENUM('services', 'industries', 'engagement', 'about', 'contact', 'hll-ai', 'hll-trust', 'hll-foundation', 'hll-ontology', 'hll-people', 'hll-application');
  ALTER TABLE "pages_blocks_shader_section" ALTER COLUMN "variant" SET DATA TYPE "public"."enum_pages_blocks_shader_section_variant" USING "variant"::"public"."enum_pages_blocks_shader_section_variant";
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "variant" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "variant" SET DEFAULT 'services'::text;
  DROP TYPE "public"."enum_pages_blocks_cta_variant";
  CREATE TYPE "public"."enum_pages_blocks_cta_variant" AS ENUM('services', 'industries', 'engagement', 'about', 'contact', 'hll-ai', 'hll-trust', 'hll-foundation', 'hll-ontology', 'hll-people', 'hll-application');
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "variant" SET DEFAULT 'services'::"public"."enum_pages_blocks_cta_variant";
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "variant" SET DATA TYPE "public"."enum_pages_blocks_cta_variant" USING "variant"::"public"."enum_pages_blocks_cta_variant";
  ALTER TABLE "_pages_v_blocks_hero" ALTER COLUMN "variant" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_hero" ALTER COLUMN "variant" SET DEFAULT 'services'::text;
  DROP TYPE "public"."enum__pages_v_blocks_hero_variant";
  CREATE TYPE "public"."enum__pages_v_blocks_hero_variant" AS ENUM('services', 'industries', 'engagement', 'about', 'contact', 'hll-ai', 'hll-trust', 'hll-foundation', 'hll-ontology', 'hll-people', 'hll-application');
  ALTER TABLE "_pages_v_blocks_hero" ALTER COLUMN "variant" SET DEFAULT 'services'::"public"."enum__pages_v_blocks_hero_variant";
  ALTER TABLE "_pages_v_blocks_hero" ALTER COLUMN "variant" SET DATA TYPE "public"."enum__pages_v_blocks_hero_variant" USING "variant"::"public"."enum__pages_v_blocks_hero_variant";
  ALTER TABLE "_pages_v_blocks_shader_section" ALTER COLUMN "variant" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_blocks_shader_section_variant";
  CREATE TYPE "public"."enum__pages_v_blocks_shader_section_variant" AS ENUM('services', 'industries', 'engagement', 'about', 'contact', 'hll-ai', 'hll-trust', 'hll-foundation', 'hll-ontology', 'hll-people', 'hll-application');
  ALTER TABLE "_pages_v_blocks_shader_section" ALTER COLUMN "variant" SET DATA TYPE "public"."enum__pages_v_blocks_shader_section_variant" USING "variant"::"public"."enum__pages_v_blocks_shader_section_variant";
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "variant" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "variant" SET DEFAULT 'services'::text;
  DROP TYPE "public"."enum__pages_v_blocks_cta_variant";
  CREATE TYPE "public"."enum__pages_v_blocks_cta_variant" AS ENUM('services', 'industries', 'engagement', 'about', 'contact', 'hll-ai', 'hll-trust', 'hll-foundation', 'hll-ontology', 'hll-people', 'hll-application');
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "variant" SET DEFAULT 'services'::"public"."enum__pages_v_blocks_cta_variant";
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "variant" SET DATA TYPE "public"."enum__pages_v_blocks_cta_variant" USING "variant"::"public"."enum__pages_v_blocks_cta_variant";
  ALTER TABLE "services_blocks_hero" ALTER COLUMN "variant" SET DATA TYPE text;
  ALTER TABLE "services_blocks_hero" ALTER COLUMN "variant" SET DEFAULT 'services'::text;
  DROP TYPE "public"."enum_services_blocks_hero_variant";
  CREATE TYPE "public"."enum_services_blocks_hero_variant" AS ENUM('services', 'industries', 'engagement', 'about', 'contact', 'hll-ai', 'hll-trust', 'hll-foundation', 'hll-ontology', 'hll-people', 'hll-application');
  ALTER TABLE "services_blocks_hero" ALTER COLUMN "variant" SET DEFAULT 'services'::"public"."enum_services_blocks_hero_variant";
  ALTER TABLE "services_blocks_hero" ALTER COLUMN "variant" SET DATA TYPE "public"."enum_services_blocks_hero_variant" USING "variant"::"public"."enum_services_blocks_hero_variant";
  ALTER TABLE "services_blocks_shader_section" ALTER COLUMN "variant" SET DATA TYPE text;
  DROP TYPE "public"."enum_services_blocks_shader_section_variant";
  CREATE TYPE "public"."enum_services_blocks_shader_section_variant" AS ENUM('services', 'industries', 'engagement', 'about', 'contact', 'hll-ai', 'hll-trust', 'hll-foundation', 'hll-ontology', 'hll-people', 'hll-application');
  ALTER TABLE "services_blocks_shader_section" ALTER COLUMN "variant" SET DATA TYPE "public"."enum_services_blocks_shader_section_variant" USING "variant"::"public"."enum_services_blocks_shader_section_variant";
  ALTER TABLE "services_blocks_cta" ALTER COLUMN "variant" SET DATA TYPE text;
  ALTER TABLE "services_blocks_cta" ALTER COLUMN "variant" SET DEFAULT 'services'::text;
  DROP TYPE "public"."enum_services_blocks_cta_variant";
  CREATE TYPE "public"."enum_services_blocks_cta_variant" AS ENUM('services', 'industries', 'engagement', 'about', 'contact', 'hll-ai', 'hll-trust', 'hll-foundation', 'hll-ontology', 'hll-people', 'hll-application');
  ALTER TABLE "services_blocks_cta" ALTER COLUMN "variant" SET DEFAULT 'services'::"public"."enum_services_blocks_cta_variant";
  ALTER TABLE "services_blocks_cta" ALTER COLUMN "variant" SET DATA TYPE "public"."enum_services_blocks_cta_variant" USING "variant"::"public"."enum_services_blocks_cta_variant";
  ALTER TABLE "services" ALTER COLUMN "variant" SET DATA TYPE text;
  DROP TYPE "public"."enum_services_variant";
  CREATE TYPE "public"."enum_services_variant" AS ENUM('services', 'industries', 'engagement', 'about', 'contact', 'hll-ai', 'hll-trust', 'hll-foundation', 'hll-ontology', 'hll-people', 'hll-application');
  ALTER TABLE "services" ALTER COLUMN "variant" SET DATA TYPE "public"."enum_services_variant" USING "variant"::"public"."enum_services_variant";
  ALTER TABLE "_services_v_blocks_hero" ALTER COLUMN "variant" SET DATA TYPE text;
  ALTER TABLE "_services_v_blocks_hero" ALTER COLUMN "variant" SET DEFAULT 'services'::text;
  DROP TYPE "public"."enum__services_v_blocks_hero_variant";
  CREATE TYPE "public"."enum__services_v_blocks_hero_variant" AS ENUM('services', 'industries', 'engagement', 'about', 'contact', 'hll-ai', 'hll-trust', 'hll-foundation', 'hll-ontology', 'hll-people', 'hll-application');
  ALTER TABLE "_services_v_blocks_hero" ALTER COLUMN "variant" SET DEFAULT 'services'::"public"."enum__services_v_blocks_hero_variant";
  ALTER TABLE "_services_v_blocks_hero" ALTER COLUMN "variant" SET DATA TYPE "public"."enum__services_v_blocks_hero_variant" USING "variant"::"public"."enum__services_v_blocks_hero_variant";
  ALTER TABLE "_services_v_blocks_shader_section" ALTER COLUMN "variant" SET DATA TYPE text;
  DROP TYPE "public"."enum__services_v_blocks_shader_section_variant";
  CREATE TYPE "public"."enum__services_v_blocks_shader_section_variant" AS ENUM('services', 'industries', 'engagement', 'about', 'contact', 'hll-ai', 'hll-trust', 'hll-foundation', 'hll-ontology', 'hll-people', 'hll-application');
  ALTER TABLE "_services_v_blocks_shader_section" ALTER COLUMN "variant" SET DATA TYPE "public"."enum__services_v_blocks_shader_section_variant" USING "variant"::"public"."enum__services_v_blocks_shader_section_variant";
  ALTER TABLE "_services_v_blocks_cta" ALTER COLUMN "variant" SET DATA TYPE text;
  ALTER TABLE "_services_v_blocks_cta" ALTER COLUMN "variant" SET DEFAULT 'services'::text;
  DROP TYPE "public"."enum__services_v_blocks_cta_variant";
  CREATE TYPE "public"."enum__services_v_blocks_cta_variant" AS ENUM('services', 'industries', 'engagement', 'about', 'contact', 'hll-ai', 'hll-trust', 'hll-foundation', 'hll-ontology', 'hll-people', 'hll-application');
  ALTER TABLE "_services_v_blocks_cta" ALTER COLUMN "variant" SET DEFAULT 'services'::"public"."enum__services_v_blocks_cta_variant";
  ALTER TABLE "_services_v_blocks_cta" ALTER COLUMN "variant" SET DATA TYPE "public"."enum__services_v_blocks_cta_variant" USING "variant"::"public"."enum__services_v_blocks_cta_variant";
  ALTER TABLE "_services_v" ALTER COLUMN "version_variant" SET DATA TYPE text;
  DROP TYPE "public"."enum__services_v_version_variant";
  CREATE TYPE "public"."enum__services_v_version_variant" AS ENUM('services', 'industries', 'engagement', 'about', 'contact', 'hll-ai', 'hll-trust', 'hll-foundation', 'hll-ontology', 'hll-people', 'hll-application');
  ALTER TABLE "_services_v" ALTER COLUMN "version_variant" SET DATA TYPE "public"."enum__services_v_version_variant" USING "version_variant"::"public"."enum__services_v_version_variant";
  ALTER TABLE "site_settings_header_nav" ALTER COLUMN "variant" SET DATA TYPE text;
  ALTER TABLE "site_settings_header_nav" ALTER COLUMN "variant" SET DEFAULT 'services'::text;
  DROP TYPE "public"."enum_site_settings_header_nav_variant";
  CREATE TYPE "public"."enum_site_settings_header_nav_variant" AS ENUM('services', 'industries', 'engagement', 'about', 'contact', 'hll-ai', 'hll-trust', 'hll-foundation', 'hll-ontology', 'hll-people', 'hll-application');
  ALTER TABLE "site_settings_header_nav" ALTER COLUMN "variant" SET DEFAULT 'services'::"public"."enum_site_settings_header_nav_variant";
  ALTER TABLE "site_settings_header_nav" ALTER COLUMN "variant" SET DATA TYPE "public"."enum_site_settings_header_nav_variant" USING "variant"::"public"."enum_site_settings_header_nav_variant";
  ALTER TABLE "services" ALTER COLUMN "demo_window_selector_label" SET DEFAULT 'HLL Foundation';
  ALTER TABLE "_services_v" ALTER COLUMN "version_demo_window_selector_label" SET DEFAULT 'HLL Foundation';
  ALTER TABLE "subsvc" DROP COLUMN "description";
  ALTER TABLE "services_page_content_engagement_cards" DROP COLUMN "href";
  ALTER TABLE "_subsvc_v" DROP COLUMN "description";
  ALTER TABLE "_services_v_version_page_content_engagement_cards" DROP COLUMN "href";`)
}
