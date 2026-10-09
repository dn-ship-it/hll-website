import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "services_page_content_expert_voice_more_quotes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"name" varchar,
  	"role" varchar,
  	"company" varchar,
  	"portrait_id" integer
  );
  
  CREATE TABLE "_services_v_version_page_content_expert_voice_more_quotes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"name" varchar,
  	"role" varchar,
  	"company" varchar,
  	"portrait_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "industries_page_content_client_voice_more_quotes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"name" varchar,
  	"role" varchar,
  	"company" varchar
  );
  
  CREATE TABLE "_industries_v_version_page_content_client_voice_more_quotes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"name" varchar,
  	"role" varchar,
  	"company" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "marketing_content_careers_team_voices" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar NOT NULL,
  	"name" varchar,
  	"role" varchar
  );
  
  ALTER TABLE "services_page_content_expert_voice_more_quotes" ADD CONSTRAINT "services_page_content_expert_voice_more_quotes_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_page_content_expert_voice_more_quotes" ADD CONSTRAINT "services_page_content_expert_voice_more_quotes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_page_content_expert_voice_more_quotes" ADD CONSTRAINT "_services_v_version_page_content_expert_voice_more_quotes_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_version_page_content_expert_voice_more_quotes" ADD CONSTRAINT "_services_v_version_page_content_expert_voice_more_quotes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "industries_page_content_client_voice_more_quotes" ADD CONSTRAINT "industries_page_content_client_voice_more_quotes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_industries_v_version_page_content_client_voice_more_quotes" ADD CONSTRAINT "_industries_v_version_page_content_client_voice_more_quotes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_industries_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_content_careers_team_voices" ADD CONSTRAINT "marketing_content_careers_team_voices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_content"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "services_page_content_expert_voice_more_quotes_order_idx" ON "services_page_content_expert_voice_more_quotes" USING btree ("_order");
  CREATE INDEX "services_page_content_expert_voice_more_quotes_parent_id_idx" ON "services_page_content_expert_voice_more_quotes" USING btree ("_parent_id");
  CREATE INDEX "services_page_content_expert_voice_more_quotes_portrait_idx" ON "services_page_content_expert_voice_more_quotes" USING btree ("portrait_id");
  CREATE INDEX "_services_v_version_page_content_expert_voice_more_quotes_order_idx" ON "_services_v_version_page_content_expert_voice_more_quotes" USING btree ("_order");
  CREATE INDEX "_services_v_version_page_content_expert_voice_more_quotes_parent_id_idx" ON "_services_v_version_page_content_expert_voice_more_quotes" USING btree ("_parent_id");
  CREATE INDEX "_services_v_version_page_content_expert_voice_more_quote_idx" ON "_services_v_version_page_content_expert_voice_more_quotes" USING btree ("portrait_id");
  CREATE INDEX "industries_page_content_client_voice_more_quotes_order_idx" ON "industries_page_content_client_voice_more_quotes" USING btree ("_order");
  CREATE INDEX "industries_page_content_client_voice_more_quotes_parent_id_idx" ON "industries_page_content_client_voice_more_quotes" USING btree ("_parent_id");
  CREATE INDEX "_industries_v_version_page_content_client_voice_more_quotes_order_idx" ON "_industries_v_version_page_content_client_voice_more_quotes" USING btree ("_order");
  CREATE INDEX "_industries_v_version_page_content_client_voice_more_quotes_parent_id_idx" ON "_industries_v_version_page_content_client_voice_more_quotes" USING btree ("_parent_id");
  CREATE INDEX "marketing_content_careers_team_voices_order_idx" ON "marketing_content_careers_team_voices" USING btree ("_order");
  CREATE INDEX "marketing_content_careers_team_voices_parent_id_idx" ON "marketing_content_careers_team_voices" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "services_page_content_expert_voice_more_quotes" CASCADE;
  DROP TABLE "_services_v_version_page_content_expert_voice_more_quotes" CASCADE;
  DROP TABLE "industries_page_content_client_voice_more_quotes" CASCADE;
  DROP TABLE "_industries_v_version_page_content_client_voice_more_quotes" CASCADE;
  DROP TABLE "marketing_content_careers_team_voices" CASCADE;`)
}
