import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "industries_page_content_capabilities_items_cards" ADD COLUMN "href" varchar;
  ALTER TABLE "_industries_v_version_page_content_capabilities_items_cards" ADD COLUMN "href" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "industries_page_content_capabilities_items_cards" DROP COLUMN "href";
  ALTER TABLE "_industries_v_version_page_content_capabilities_items_cards" DROP COLUMN "href";`)
}
