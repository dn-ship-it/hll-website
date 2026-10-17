import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_engagements_services" ADD VALUE 'hll-cloud';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "engagements_services" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum_engagements_services";
  CREATE TYPE "public"."enum_engagements_services" AS ENUM('hll-ai', 'hll-trust', 'hll-foundation', 'hll-ontology', 'hll-people', 'hll-application');
  ALTER TABLE "engagements_services" ALTER COLUMN "value" SET DATA TYPE "public"."enum_engagements_services" USING "value"::"public"."enum_engagements_services";`)
}
