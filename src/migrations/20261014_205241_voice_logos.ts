import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "services_page_content_expert_voice_page_content_expert_v_idx";
  DROP INDEX "_services_v_version_page_content_expert_voice_more_quote_idx";
  DROP INDEX "_services_v_version_page_content_expert_voice_version_pa_idx";
  DROP INDEX "industries_page_content_client_voice_page_content_client_idx";
  DROP INDEX "_industries_v_version_page_content_client_voice_version__idx";
  ALTER TABLE "services_page_content_expert_voice_more_quotes" ADD COLUMN "company_logo_id" integer;
  ALTER TABLE "services" ADD COLUMN "page_content_expert_voice_company_logo_id" integer;
  ALTER TABLE "_services_v_version_page_content_expert_voice_more_quotes" ADD COLUMN "company_logo_id" integer;
  ALTER TABLE "_services_v" ADD COLUMN "version_page_content_expert_voice_company_logo_id" integer;
  ALTER TABLE "industries_page_content_client_voice_more_quotes" ADD COLUMN "company_logo_id" integer;
  ALTER TABLE "industries_page_content_client_voice_more_quotes" ADD COLUMN "portrait_id" integer;
  ALTER TABLE "industries" ADD COLUMN "page_content_client_voice_company_logo_id" integer;
  ALTER TABLE "industries" ADD COLUMN "page_content_client_voice_portrait_id" integer;
  ALTER TABLE "_industries_v_version_page_content_client_voice_more_quotes" ADD COLUMN "company_logo_id" integer;
  ALTER TABLE "_industries_v_version_page_content_client_voice_more_quotes" ADD COLUMN "portrait_id" integer;
  ALTER TABLE "_industries_v" ADD COLUMN "version_page_content_client_voice_company_logo_id" integer;
  ALTER TABLE "_industries_v" ADD COLUMN "version_page_content_client_voice_portrait_id" integer;
  ALTER TABLE "services_page_content_expert_voice_more_quotes" ADD CONSTRAINT "services_page_content_expert_voice_more_quotes_company_logo_id_media_id_fk" FOREIGN KEY ("company_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_page_content_expert_voice_company_logo_id_media_id_fk" FOREIGN KEY ("page_content_expert_voice_company_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_version_page_content_expert_voice_more_quotes" ADD CONSTRAINT "_services_v_version_page_content_expert_voice_more_quotes_company_logo_id_media_id_fk" FOREIGN KEY ("company_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_page_content_expert_voice_company_logo_id_media_id_fk" FOREIGN KEY ("version_page_content_expert_voice_company_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "industries_page_content_client_voice_more_quotes" ADD CONSTRAINT "industries_page_content_client_voice_more_quotes_company_logo_id_media_id_fk" FOREIGN KEY ("company_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "industries_page_content_client_voice_more_quotes" ADD CONSTRAINT "industries_page_content_client_voice_more_quotes_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "industries" ADD CONSTRAINT "industries_page_content_client_voice_company_logo_id_media_id_fk" FOREIGN KEY ("page_content_client_voice_company_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "industries" ADD CONSTRAINT "industries_page_content_client_voice_portrait_id_media_id_fk" FOREIGN KEY ("page_content_client_voice_portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_industries_v_version_page_content_client_voice_more_quotes" ADD CONSTRAINT "_industries_v_version_page_content_client_voice_more_quotes_company_logo_id_media_id_fk" FOREIGN KEY ("company_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_industries_v_version_page_content_client_voice_more_quotes" ADD CONSTRAINT "_industries_v_version_page_content_client_voice_more_quotes_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_industries_v" ADD CONSTRAINT "_industries_v_version_page_content_client_voice_company_logo_id_media_id_fk" FOREIGN KEY ("version_page_content_client_voice_company_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_industries_v" ADD CONSTRAINT "_industries_v_version_page_content_client_voice_portrait_id_media_id_fk" FOREIGN KEY ("version_page_content_client_voice_portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "services_page_content_expert_voice_more_quotes_company_l_idx" ON "services_page_content_expert_voice_more_quotes" USING btree ("company_logo_id");
  CREATE INDEX "services_page_content_expert_voice_page_content_expert_1_idx" ON "services" USING btree ("page_content_expert_voice_portrait_id");
  CREATE INDEX "_services_v_version_page_content_expert_voice_more_quo_1_idx" ON "_services_v_version_page_content_expert_voice_more_quotes" USING btree ("portrait_id");
  CREATE INDEX "_services_v_version_page_content_expert_voice_version__1_idx" ON "_services_v" USING btree ("version_page_content_expert_voice_portrait_id");
  CREATE INDEX "industries_page_content_client_voice_more_quotes_company_idx" ON "industries_page_content_client_voice_more_quotes" USING btree ("company_logo_id");
  CREATE INDEX "industries_page_content_client_voice_more_quotes_portrai_idx" ON "industries_page_content_client_voice_more_quotes" USING btree ("portrait_id");
  CREATE INDEX "industries_page_content_client_voice_page_content_clie_1_idx" ON "industries" USING btree ("page_content_client_voice_portrait_id");
  CREATE INDEX "industries_page_content_client_voice_page_content_clie_2_idx" ON "industries" USING btree ("page_content_client_voice_gallery_image_id");
  CREATE INDEX "_industries_v_version_page_content_client_voice_more_quo_idx" ON "_industries_v_version_page_content_client_voice_more_quotes" USING btree ("company_logo_id");
  CREATE INDEX "_industries_v_version_page_content_client_voice_more_q_1_idx" ON "_industries_v_version_page_content_client_voice_more_quotes" USING btree ("portrait_id");
  CREATE INDEX "_industries_v_version_page_content_client_voice_versio_1_idx" ON "_industries_v" USING btree ("version_page_content_client_voice_portrait_id");
  CREATE INDEX "_industries_v_version_page_content_client_voice_versio_2_idx" ON "_industries_v" USING btree ("version_page_content_client_voice_gallery_image_id");
  CREATE INDEX "services_page_content_expert_voice_page_content_expert_v_idx" ON "services" USING btree ("page_content_expert_voice_company_logo_id");
  CREATE INDEX "_services_v_version_page_content_expert_voice_more_quote_idx" ON "_services_v_version_page_content_expert_voice_more_quotes" USING btree ("company_logo_id");
  CREATE INDEX "_services_v_version_page_content_expert_voice_version_pa_idx" ON "_services_v" USING btree ("version_page_content_expert_voice_company_logo_id");
  CREATE INDEX "industries_page_content_client_voice_page_content_client_idx" ON "industries" USING btree ("page_content_client_voice_company_logo_id");
  CREATE INDEX "_industries_v_version_page_content_client_voice_version__idx" ON "_industries_v" USING btree ("version_page_content_client_voice_company_logo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services_page_content_expert_voice_more_quotes" DROP CONSTRAINT "services_page_content_expert_voice_more_quotes_company_logo_id_media_id_fk";
  
  ALTER TABLE "services" DROP CONSTRAINT "services_page_content_expert_voice_company_logo_id_media_id_fk";
  
  ALTER TABLE "_services_v_version_page_content_expert_voice_more_quotes" DROP CONSTRAINT "_services_v_version_page_content_expert_voice_more_quotes_company_logo_id_media_id_fk";
  
  ALTER TABLE "_services_v" DROP CONSTRAINT "_services_v_version_page_content_expert_voice_company_logo_id_media_id_fk";
  
  ALTER TABLE "industries_page_content_client_voice_more_quotes" DROP CONSTRAINT "industries_page_content_client_voice_more_quotes_company_logo_id_media_id_fk";
  
  ALTER TABLE "industries_page_content_client_voice_more_quotes" DROP CONSTRAINT "industries_page_content_client_voice_more_quotes_portrait_id_media_id_fk";
  
  ALTER TABLE "industries" DROP CONSTRAINT "industries_page_content_client_voice_company_logo_id_media_id_fk";
  
  ALTER TABLE "industries" DROP CONSTRAINT "industries_page_content_client_voice_portrait_id_media_id_fk";
  
  ALTER TABLE "_industries_v_version_page_content_client_voice_more_quotes" DROP CONSTRAINT "_industries_v_version_page_content_client_voice_more_quotes_company_logo_id_media_id_fk";
  
  ALTER TABLE "_industries_v_version_page_content_client_voice_more_quotes" DROP CONSTRAINT "_industries_v_version_page_content_client_voice_more_quotes_portrait_id_media_id_fk";
  
  ALTER TABLE "_industries_v" DROP CONSTRAINT "_industries_v_version_page_content_client_voice_company_logo_id_media_id_fk";
  
  ALTER TABLE "_industries_v" DROP CONSTRAINT "_industries_v_version_page_content_client_voice_portrait_id_media_id_fk";
  
  DROP INDEX "services_page_content_expert_voice_more_quotes_company_l_idx";
  DROP INDEX "services_page_content_expert_voice_page_content_expert_1_idx";
  DROP INDEX "_services_v_version_page_content_expert_voice_more_quo_1_idx";
  DROP INDEX "_services_v_version_page_content_expert_voice_version__1_idx";
  DROP INDEX "industries_page_content_client_voice_more_quotes_company_idx";
  DROP INDEX "industries_page_content_client_voice_more_quotes_portrai_idx";
  DROP INDEX "industries_page_content_client_voice_page_content_clie_1_idx";
  DROP INDEX "industries_page_content_client_voice_page_content_clie_2_idx";
  DROP INDEX "_industries_v_version_page_content_client_voice_more_quo_idx";
  DROP INDEX "_industries_v_version_page_content_client_voice_more_q_1_idx";
  DROP INDEX "_industries_v_version_page_content_client_voice_versio_1_idx";
  DROP INDEX "_industries_v_version_page_content_client_voice_versio_2_idx";
  DROP INDEX "services_page_content_expert_voice_page_content_expert_v_idx";
  DROP INDEX "_services_v_version_page_content_expert_voice_more_quote_idx";
  DROP INDEX "_services_v_version_page_content_expert_voice_version_pa_idx";
  DROP INDEX "industries_page_content_client_voice_page_content_client_idx";
  DROP INDEX "_industries_v_version_page_content_client_voice_version__idx";
  CREATE INDEX "services_page_content_expert_voice_page_content_expert_v_idx" ON "services" USING btree ("page_content_expert_voice_portrait_id");
  CREATE INDEX "_services_v_version_page_content_expert_voice_more_quote_idx" ON "_services_v_version_page_content_expert_voice_more_quotes" USING btree ("portrait_id");
  CREATE INDEX "_services_v_version_page_content_expert_voice_version_pa_idx" ON "_services_v" USING btree ("version_page_content_expert_voice_portrait_id");
  CREATE INDEX "industries_page_content_client_voice_page_content_client_idx" ON "industries" USING btree ("page_content_client_voice_gallery_image_id");
  CREATE INDEX "_industries_v_version_page_content_client_voice_version__idx" ON "_industries_v" USING btree ("version_page_content_client_voice_gallery_image_id");
  ALTER TABLE "services_page_content_expert_voice_more_quotes" DROP COLUMN "company_logo_id";
  ALTER TABLE "services" DROP COLUMN "page_content_expert_voice_company_logo_id";
  ALTER TABLE "_services_v_version_page_content_expert_voice_more_quotes" DROP COLUMN "company_logo_id";
  ALTER TABLE "_services_v" DROP COLUMN "version_page_content_expert_voice_company_logo_id";
  ALTER TABLE "industries_page_content_client_voice_more_quotes" DROP COLUMN "company_logo_id";
  ALTER TABLE "industries_page_content_client_voice_more_quotes" DROP COLUMN "portrait_id";
  ALTER TABLE "industries" DROP COLUMN "page_content_client_voice_company_logo_id";
  ALTER TABLE "industries" DROP COLUMN "page_content_client_voice_portrait_id";
  ALTER TABLE "_industries_v_version_page_content_client_voice_more_quotes" DROP COLUMN "company_logo_id";
  ALTER TABLE "_industries_v_version_page_content_client_voice_more_quotes" DROP COLUMN "portrait_id";
  ALTER TABLE "_industries_v" DROP COLUMN "version_page_content_client_voice_company_logo_id";
  ALTER TABLE "_industries_v" DROP COLUMN "version_page_content_client_voice_portrait_id";`)
}
