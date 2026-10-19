import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services_page_content_outcomes_cards" ADD COLUMN "href" varchar;
  ALTER TABLE "_services_v_version_page_content_outcomes_cards" ADD COLUMN "href" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services_page_content_outcomes_cards" DROP COLUMN "href";
  ALTER TABLE "_services_v_version_page_content_outcomes_cards" DROP COLUMN "href";`)
}
