// The two Public Sector industries merged into Public Sector & Government
// Services (handoff 29 Oct). Engagements on either old one move to it first,
// or the cast to the new list would fail on them.
import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "engagements" ALTER COLUMN "industry" SET DATA TYPE text;
  UPDATE "engagements" SET "industry" = 'Public Sector & Government Services'
    WHERE "industry" IN ('Public Sector – External Affairs', 'Public Sector – Tax & Commerce');
  DROP TYPE "public"."enum_engagements_industry";
  CREATE TYPE "public"."enum_engagements_industry" AS ENUM('Banking', 'Insurance', 'Other Financial Services', 'Retail Commerce & Brands', 'Travel & Hospitality', 'Pet Tech', 'Healthcare', 'Pharmaceuticals', 'Manufacturing', 'Real Estate', 'Logistics', 'Public Sector & Government Services', 'International Organization', 'Consulting Firms');
  ALTER TABLE "engagements" ALTER COLUMN "industry" SET DATA TYPE "public"."enum_engagements_industry" USING "industry"::"public"."enum_engagements_industry";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Going back can't tell which of the two old pages a merged engagement came
  // from, so they all return to External Affairs.
  await db.execute(sql`
   ALTER TABLE "engagements" ALTER COLUMN "industry" SET DATA TYPE text;
  UPDATE "engagements" SET "industry" = 'Public Sector – External Affairs'
    WHERE "industry" = 'Public Sector & Government Services';
  DROP TYPE "public"."enum_engagements_industry";
  CREATE TYPE "public"."enum_engagements_industry" AS ENUM('Banking', 'Insurance', 'Other Financial Services', 'Retail Commerce & Brands', 'Travel & Hospitality', 'Pet Tech', 'Healthcare', 'Pharmaceuticals', 'Manufacturing', 'Real Estate', 'Logistics', 'Public Sector – External Affairs', 'Public Sector – Tax & Commerce', 'International Organization', 'Consulting Firms');
  ALTER TABLE "engagements" ALTER COLUMN "industry" SET DATA TYPE "public"."enum_engagements_industry" USING "industry"::"public"."enum_engagements_industry";`)
}
