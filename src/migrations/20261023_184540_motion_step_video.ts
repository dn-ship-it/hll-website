import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "marketing_content_home_how_we_work_steps" ADD COLUMN "video_id" integer;
  ALTER TABLE "marketing_content_home_how_we_work_steps" ADD CONSTRAINT "marketing_content_home_how_we_work_steps_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "marketing_content_home_how_we_work_steps_video_idx" ON "marketing_content_home_how_we_work_steps" USING btree ("video_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "marketing_content_home_how_we_work_steps" DROP CONSTRAINT "marketing_content_home_how_we_work_steps_video_id_media_id_fk";
  
  DROP INDEX "marketing_content_home_how_we_work_steps_video_idx";
  ALTER TABLE "marketing_content_home_how_we_work_steps" DROP COLUMN "video_id";`)
}
