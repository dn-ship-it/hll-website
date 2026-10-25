import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "marketing_content_contact_locations_items" ADD COLUMN "phone" varchar;
  ALTER TABLE "marketing_content_contact_locations_items" ADD COLUMN "email" varchar;
  ALTER TABLE "marketing_content" ADD COLUMN "contact_details_text" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "marketing_content_contact_locations_items" DROP COLUMN "phone";
  ALTER TABLE "marketing_content_contact_locations_items" DROP COLUMN "email";
  ALTER TABLE "marketing_content" DROP COLUMN "contact_details_text";`)
}
