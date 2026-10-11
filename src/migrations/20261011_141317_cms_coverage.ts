import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_marketing_content_home_what_we_do_items_variant" AS ENUM('hll-application', 'hll-people', 'hll-trust', 'hll-ai', 'hll-foundation', 'hll-ontology');
  CREATE TYPE "public"."enum_marketing_content_home_impact_graph_clients_services" AS ENUM('data-engineering', 'analytics', 'ai', 'ontology', 'trust', 'cloud', 'applications', 'experience-design', 'people');
  CREATE TYPE "public"."enum_marketing_content_home_impact_graph_clients_industry" AS ENUM('banking', 'insurance', 'payments', 'pharma', 'healthcare', 'public', 'consulting', 'consumer');
  CREATE TYPE "public"."enum_marketing_content_all_capabilities_items_tile" AS ENUM('hll-application', 'hll-people', 'hll-trust', 'hll-ai', 'hll-foundation', 'hll-ontology', 'hll-cloud');
  CREATE TABLE "marketing_content_home_what_we_do_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"variant" "enum_marketing_content_home_what_we_do_items_variant" NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "marketing_content_home_impact_graph_clients_services" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_marketing_content_home_impact_graph_clients_services",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "marketing_content_home_impact_graph_clients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"industry" "enum_marketing_content_home_impact_graph_clients_industry" NOT NULL,
  	"href" varchar
  );
  
  CREATE TABLE "marketing_content_home_impact_cards_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "marketing_content_home_impact_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"image_id" integer,
  	"href" varchar
  );
  
  CREATE TABLE "marketing_content_home_impact_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "marketing_content_home_how_we_work_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "marketing_content_home_who_we_are_people" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"photo_id" integer
  );
  
  CREATE TABLE "marketing_content_about_hero_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "marketing_content_about_reach_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "marketing_content_about_reach_pins" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"x" numeric NOT NULL,
  	"y" numeric NOT NULL,
  	"title" varchar,
  	"location" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "marketing_content_careers_about_hll_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "marketing_content_all_capabilities_items_sub_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "marketing_content_all_capabilities_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"href" varchar,
  	"description" varchar,
  	"tile" "enum_marketing_content_all_capabilities_items_tile" NOT NULL
  );
  
  CREATE TABLE "marketing_content_industry_menu_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar
  );
  
  CREATE TABLE "marketing_content_industry_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  ALTER TABLE "marketing_content_about_values_items" ADD COLUMN "image_id" integer;
  ALTER TABLE "marketing_content_about_values_items" ADD COLUMN "video_id" integer;
  ALTER TABLE "marketing_content" ADD COLUMN "home_what_we_do_eyebrow" varchar;
  ALTER TABLE "marketing_content" ADD COLUMN "home_what_we_do_title" varchar;
  ALTER TABLE "marketing_content" ADD COLUMN "home_promise_eyebrow" varchar;
  ALTER TABLE "marketing_content" ADD COLUMN "home_promise_line1" varchar;
  ALTER TABLE "marketing_content" ADD COLUMN "home_promise_line2" varchar;
  ALTER TABLE "marketing_content" ADD COLUMN "home_clients_eyebrow" varchar;
  ALTER TABLE "marketing_content" ADD COLUMN "home_clients_title" varchar;
  ALTER TABLE "marketing_content" ADD COLUMN "home_impact_eyebrow" varchar;
  ALTER TABLE "marketing_content" ADD COLUMN "home_impact_title" varchar;
  ALTER TABLE "marketing_content" ADD COLUMN "home_impact_cta_label" varchar;
  ALTER TABLE "marketing_content" ADD COLUMN "home_impact_cta_href" varchar;
  ALTER TABLE "marketing_content" ADD COLUMN "home_how_we_work_eyebrow" varchar;
  ALTER TABLE "marketing_content" ADD COLUMN "home_how_we_work_title" varchar;
  ALTER TABLE "marketing_content" ADD COLUMN "home_who_we_are_eyebrow" varchar;
  ALTER TABLE "marketing_content" ADD COLUMN "home_who_we_are_title" varchar;
  ALTER TABLE "marketing_content" ADD COLUMN "home_who_we_are_cta_label" varchar;
  ALTER TABLE "marketing_content" ADD COLUMN "home_who_we_are_cta_href" varchar;
  ALTER TABLE "marketing_content" ADD COLUMN "home_lab_eyebrow" varchar;
  ALTER TABLE "marketing_content" ADD COLUMN "home_lab_title" varchar;
  ALTER TABLE "marketing_content" ADD COLUMN "home_lab_background_id" integer;
  ALTER TABLE "marketing_content" ADD COLUMN "home_lab_demo_image_id" integer;
  ALTER TABLE "marketing_content" ADD COLUMN "home_lab_demo_video_id" integer;
  ALTER TABLE "marketing_content" ADD COLUMN "about_leader_eyebrow" varchar;
  ALTER TABLE "marketing_content" ADD COLUMN "about_leader_title" varchar;
  ALTER TABLE "marketing_content" ADD COLUMN "about_leader_quote" varchar;
  ALTER TABLE "marketing_content" ADD COLUMN "about_leader_name" varchar;
  ALTER TABLE "marketing_content" ADD COLUMN "about_leader_role" varchar;
  ALTER TABLE "marketing_content" ADD COLUMN "about_leader_portrait_id" integer;
  ALTER TABLE "marketing_content" ADD COLUMN "about_reach_eyebrow" varchar;
  ALTER TABLE "marketing_content" ADD COLUMN "about_reach_title" varchar;
  ALTER TABLE "marketing_content" ADD COLUMN "about_reach_map_id" integer;
  ALTER TABLE "marketing_content" ADD COLUMN "about_careers_eyebrow" varchar;
  ALTER TABLE "marketing_content" ADD COLUMN "about_careers_title" varchar;
  ALTER TABLE "marketing_content" ADD COLUMN "about_careers_image_id" integer;
  ALTER TABLE "marketing_content" ADD COLUMN "about_careers_label" varchar;
  ALTER TABLE "marketing_content" ADD COLUMN "about_careers_cta_label" varchar;
  ALTER TABLE "marketing_content" ADD COLUMN "about_careers_cta_href" varchar;
  ALTER TABLE "marketing_content" ADD COLUMN "careers_no_roles_message" varchar;
  ALTER TABLE "marketing_content" ADD COLUMN "careers_about_hll_image_id" integer;
  ALTER TABLE "marketing_content" ADD COLUMN "cta_still_id" integer;
  ALTER TABLE "marketing_content" ADD COLUMN "cta_video_id" integer;
  ALTER TABLE "marketing_content" ADD COLUMN "all_capabilities_start_index" numeric;
  ALTER TABLE "marketing_content_home_what_we_do_items" ADD CONSTRAINT "marketing_content_home_what_we_do_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "marketing_content_home_what_we_do_items" ADD CONSTRAINT "marketing_content_home_what_we_do_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_content_home_impact_graph_clients_services" ADD CONSTRAINT "marketing_content_home_impact_graph_clients_services_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."marketing_content_home_impact_graph_clients"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_content_home_impact_graph_clients" ADD CONSTRAINT "marketing_content_home_impact_graph_clients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_content_home_impact_cards_tags" ADD CONSTRAINT "marketing_content_home_impact_cards_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_content_home_impact_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_content_home_impact_cards" ADD CONSTRAINT "marketing_content_home_impact_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "marketing_content_home_impact_cards" ADD CONSTRAINT "marketing_content_home_impact_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_content_home_impact_stats" ADD CONSTRAINT "marketing_content_home_impact_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_content_home_how_we_work_steps" ADD CONSTRAINT "marketing_content_home_how_we_work_steps_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "marketing_content_home_how_we_work_steps" ADD CONSTRAINT "marketing_content_home_how_we_work_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_content_home_who_we_are_people" ADD CONSTRAINT "marketing_content_home_who_we_are_people_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "marketing_content_home_who_we_are_people" ADD CONSTRAINT "marketing_content_home_who_we_are_people_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_content_about_hero_images" ADD CONSTRAINT "marketing_content_about_hero_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "marketing_content_about_hero_images" ADD CONSTRAINT "marketing_content_about_hero_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_content_about_reach_stats" ADD CONSTRAINT "marketing_content_about_reach_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_content_about_reach_pins" ADD CONSTRAINT "marketing_content_about_reach_pins_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_content_careers_about_hll_paragraphs" ADD CONSTRAINT "marketing_content_careers_about_hll_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_content_all_capabilities_items_sub_services" ADD CONSTRAINT "marketing_content_all_capabilities_items_sub_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_content_all_capabilities_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_content_all_capabilities_items" ADD CONSTRAINT "marketing_content_all_capabilities_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_content_industry_menu_items" ADD CONSTRAINT "marketing_content_industry_menu_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_content_industry_menu"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_content_industry_menu" ADD CONSTRAINT "marketing_content_industry_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_content"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "marketing_content_home_what_we_do_items_order_idx" ON "marketing_content_home_what_we_do_items" USING btree ("_order");
  CREATE INDEX "marketing_content_home_what_we_do_items_parent_id_idx" ON "marketing_content_home_what_we_do_items" USING btree ("_parent_id");
  CREATE INDEX "marketing_content_home_what_we_do_items_image_idx" ON "marketing_content_home_what_we_do_items" USING btree ("image_id");
  CREATE INDEX "marketing_content_home_impact_graph_clients_services_order_idx" ON "marketing_content_home_impact_graph_clients_services" USING btree ("order");
  CREATE INDEX "marketing_content_home_impact_graph_clients_services_parent_idx" ON "marketing_content_home_impact_graph_clients_services" USING btree ("parent_id");
  CREATE INDEX "marketing_content_home_impact_graph_clients_order_idx" ON "marketing_content_home_impact_graph_clients" USING btree ("_order");
  CREATE INDEX "marketing_content_home_impact_graph_clients_parent_id_idx" ON "marketing_content_home_impact_graph_clients" USING btree ("_parent_id");
  CREATE INDEX "marketing_content_home_impact_cards_tags_order_idx" ON "marketing_content_home_impact_cards_tags" USING btree ("_order");
  CREATE INDEX "marketing_content_home_impact_cards_tags_parent_id_idx" ON "marketing_content_home_impact_cards_tags" USING btree ("_parent_id");
  CREATE INDEX "marketing_content_home_impact_cards_order_idx" ON "marketing_content_home_impact_cards" USING btree ("_order");
  CREATE INDEX "marketing_content_home_impact_cards_parent_id_idx" ON "marketing_content_home_impact_cards" USING btree ("_parent_id");
  CREATE INDEX "marketing_content_home_impact_cards_image_idx" ON "marketing_content_home_impact_cards" USING btree ("image_id");
  CREATE INDEX "marketing_content_home_impact_stats_order_idx" ON "marketing_content_home_impact_stats" USING btree ("_order");
  CREATE INDEX "marketing_content_home_impact_stats_parent_id_idx" ON "marketing_content_home_impact_stats" USING btree ("_parent_id");
  CREATE INDEX "marketing_content_home_how_we_work_steps_order_idx" ON "marketing_content_home_how_we_work_steps" USING btree ("_order");
  CREATE INDEX "marketing_content_home_how_we_work_steps_parent_id_idx" ON "marketing_content_home_how_we_work_steps" USING btree ("_parent_id");
  CREATE INDEX "marketing_content_home_how_we_work_steps_image_idx" ON "marketing_content_home_how_we_work_steps" USING btree ("image_id");
  CREATE INDEX "marketing_content_home_who_we_are_people_order_idx" ON "marketing_content_home_who_we_are_people" USING btree ("_order");
  CREATE INDEX "marketing_content_home_who_we_are_people_parent_id_idx" ON "marketing_content_home_who_we_are_people" USING btree ("_parent_id");
  CREATE INDEX "marketing_content_home_who_we_are_people_photo_idx" ON "marketing_content_home_who_we_are_people" USING btree ("photo_id");
  CREATE INDEX "marketing_content_about_hero_images_order_idx" ON "marketing_content_about_hero_images" USING btree ("_order");
  CREATE INDEX "marketing_content_about_hero_images_parent_id_idx" ON "marketing_content_about_hero_images" USING btree ("_parent_id");
  CREATE INDEX "marketing_content_about_hero_images_image_idx" ON "marketing_content_about_hero_images" USING btree ("image_id");
  CREATE INDEX "marketing_content_about_reach_stats_order_idx" ON "marketing_content_about_reach_stats" USING btree ("_order");
  CREATE INDEX "marketing_content_about_reach_stats_parent_id_idx" ON "marketing_content_about_reach_stats" USING btree ("_parent_id");
  CREATE INDEX "marketing_content_about_reach_pins_order_idx" ON "marketing_content_about_reach_pins" USING btree ("_order");
  CREATE INDEX "marketing_content_about_reach_pins_parent_id_idx" ON "marketing_content_about_reach_pins" USING btree ("_parent_id");
  CREATE INDEX "marketing_content_careers_about_hll_paragraphs_order_idx" ON "marketing_content_careers_about_hll_paragraphs" USING btree ("_order");
  CREATE INDEX "marketing_content_careers_about_hll_paragraphs_parent_id_idx" ON "marketing_content_careers_about_hll_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "marketing_content_all_capabilities_items_sub_services_order_idx" ON "marketing_content_all_capabilities_items_sub_services" USING btree ("_order");
  CREATE INDEX "marketing_content_all_capabilities_items_sub_services_parent_id_idx" ON "marketing_content_all_capabilities_items_sub_services" USING btree ("_parent_id");
  CREATE INDEX "marketing_content_all_capabilities_items_order_idx" ON "marketing_content_all_capabilities_items" USING btree ("_order");
  CREATE INDEX "marketing_content_all_capabilities_items_parent_id_idx" ON "marketing_content_all_capabilities_items" USING btree ("_parent_id");
  CREATE INDEX "marketing_content_industry_menu_items_order_idx" ON "marketing_content_industry_menu_items" USING btree ("_order");
  CREATE INDEX "marketing_content_industry_menu_items_parent_id_idx" ON "marketing_content_industry_menu_items" USING btree ("_parent_id");
  CREATE INDEX "marketing_content_industry_menu_order_idx" ON "marketing_content_industry_menu" USING btree ("_order");
  CREATE INDEX "marketing_content_industry_menu_parent_id_idx" ON "marketing_content_industry_menu" USING btree ("_parent_id");
  ALTER TABLE "marketing_content_about_values_items" ADD CONSTRAINT "marketing_content_about_values_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "marketing_content_about_values_items" ADD CONSTRAINT "marketing_content_about_values_items_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "marketing_content" ADD CONSTRAINT "marketing_content_home_lab_background_id_media_id_fk" FOREIGN KEY ("home_lab_background_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "marketing_content" ADD CONSTRAINT "marketing_content_home_lab_demo_image_id_media_id_fk" FOREIGN KEY ("home_lab_demo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "marketing_content" ADD CONSTRAINT "marketing_content_home_lab_demo_video_id_media_id_fk" FOREIGN KEY ("home_lab_demo_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "marketing_content" ADD CONSTRAINT "marketing_content_about_leader_portrait_id_media_id_fk" FOREIGN KEY ("about_leader_portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "marketing_content" ADD CONSTRAINT "marketing_content_about_reach_map_id_media_id_fk" FOREIGN KEY ("about_reach_map_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "marketing_content" ADD CONSTRAINT "marketing_content_about_careers_image_id_media_id_fk" FOREIGN KEY ("about_careers_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "marketing_content" ADD CONSTRAINT "marketing_content_careers_about_hll_image_id_media_id_fk" FOREIGN KEY ("careers_about_hll_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "marketing_content" ADD CONSTRAINT "marketing_content_cta_still_id_media_id_fk" FOREIGN KEY ("cta_still_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "marketing_content" ADD CONSTRAINT "marketing_content_cta_video_id_media_id_fk" FOREIGN KEY ("cta_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "marketing_content_about_values_items_image_idx" ON "marketing_content_about_values_items" USING btree ("image_id");
  CREATE INDEX "marketing_content_about_values_items_video_idx" ON "marketing_content_about_values_items" USING btree ("video_id");
  CREATE INDEX "marketing_content_home_lab_home_lab_background_idx" ON "marketing_content" USING btree ("home_lab_background_id");
  CREATE INDEX "marketing_content_home_lab_home_lab_demo_image_idx" ON "marketing_content" USING btree ("home_lab_demo_image_id");
  CREATE INDEX "marketing_content_home_lab_home_lab_demo_video_idx" ON "marketing_content" USING btree ("home_lab_demo_video_id");
  CREATE INDEX "marketing_content_about_leader_about_leader_portrait_idx" ON "marketing_content" USING btree ("about_leader_portrait_id");
  CREATE INDEX "marketing_content_about_reach_about_reach_map_idx" ON "marketing_content" USING btree ("about_reach_map_id");
  CREATE INDEX "marketing_content_about_careers_about_careers_image_idx" ON "marketing_content" USING btree ("about_careers_image_id");
  CREATE INDEX "marketing_content_careers_about_hll_careers_about_hll_im_idx" ON "marketing_content" USING btree ("careers_about_hll_image_id");
  CREATE INDEX "marketing_content_cta_cta_still_idx" ON "marketing_content" USING btree ("cta_still_id");
  CREATE INDEX "marketing_content_cta_cta_video_idx" ON "marketing_content" USING btree ("cta_video_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "marketing_content_home_what_we_do_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "marketing_content_home_impact_graph_clients_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "marketing_content_home_impact_graph_clients" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "marketing_content_home_impact_cards_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "marketing_content_home_impact_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "marketing_content_home_impact_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "marketing_content_home_how_we_work_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "marketing_content_home_who_we_are_people" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "marketing_content_about_hero_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "marketing_content_about_reach_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "marketing_content_about_reach_pins" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "marketing_content_careers_about_hll_paragraphs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "marketing_content_all_capabilities_items_sub_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "marketing_content_all_capabilities_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "marketing_content_industry_menu_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "marketing_content_industry_menu" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "marketing_content_home_what_we_do_items" CASCADE;
  DROP TABLE "marketing_content_home_impact_graph_clients_services" CASCADE;
  DROP TABLE "marketing_content_home_impact_graph_clients" CASCADE;
  DROP TABLE "marketing_content_home_impact_cards_tags" CASCADE;
  DROP TABLE "marketing_content_home_impact_cards" CASCADE;
  DROP TABLE "marketing_content_home_impact_stats" CASCADE;
  DROP TABLE "marketing_content_home_how_we_work_steps" CASCADE;
  DROP TABLE "marketing_content_home_who_we_are_people" CASCADE;
  DROP TABLE "marketing_content_about_hero_images" CASCADE;
  DROP TABLE "marketing_content_about_reach_stats" CASCADE;
  DROP TABLE "marketing_content_about_reach_pins" CASCADE;
  DROP TABLE "marketing_content_careers_about_hll_paragraphs" CASCADE;
  DROP TABLE "marketing_content_all_capabilities_items_sub_services" CASCADE;
  DROP TABLE "marketing_content_all_capabilities_items" CASCADE;
  DROP TABLE "marketing_content_industry_menu_items" CASCADE;
  DROP TABLE "marketing_content_industry_menu" CASCADE;
  ALTER TABLE "marketing_content_about_values_items" DROP CONSTRAINT "marketing_content_about_values_items_image_id_media_id_fk";
  
  ALTER TABLE "marketing_content_about_values_items" DROP CONSTRAINT "marketing_content_about_values_items_video_id_media_id_fk";
  
  ALTER TABLE "marketing_content" DROP CONSTRAINT "marketing_content_home_lab_background_id_media_id_fk";
  
  ALTER TABLE "marketing_content" DROP CONSTRAINT "marketing_content_home_lab_demo_image_id_media_id_fk";
  
  ALTER TABLE "marketing_content" DROP CONSTRAINT "marketing_content_home_lab_demo_video_id_media_id_fk";
  
  ALTER TABLE "marketing_content" DROP CONSTRAINT "marketing_content_about_leader_portrait_id_media_id_fk";
  
  ALTER TABLE "marketing_content" DROP CONSTRAINT "marketing_content_about_reach_map_id_media_id_fk";
  
  ALTER TABLE "marketing_content" DROP CONSTRAINT "marketing_content_about_careers_image_id_media_id_fk";
  
  ALTER TABLE "marketing_content" DROP CONSTRAINT "marketing_content_careers_about_hll_image_id_media_id_fk";
  
  ALTER TABLE "marketing_content" DROP CONSTRAINT "marketing_content_cta_still_id_media_id_fk";
  
  ALTER TABLE "marketing_content" DROP CONSTRAINT "marketing_content_cta_video_id_media_id_fk";
  
  DROP INDEX "marketing_content_about_values_items_image_idx";
  DROP INDEX "marketing_content_about_values_items_video_idx";
  DROP INDEX "marketing_content_home_lab_home_lab_background_idx";
  DROP INDEX "marketing_content_home_lab_home_lab_demo_image_idx";
  DROP INDEX "marketing_content_home_lab_home_lab_demo_video_idx";
  DROP INDEX "marketing_content_about_leader_about_leader_portrait_idx";
  DROP INDEX "marketing_content_about_reach_about_reach_map_idx";
  DROP INDEX "marketing_content_about_careers_about_careers_image_idx";
  DROP INDEX "marketing_content_careers_about_hll_careers_about_hll_im_idx";
  DROP INDEX "marketing_content_cta_cta_still_idx";
  DROP INDEX "marketing_content_cta_cta_video_idx";
  ALTER TABLE "marketing_content_about_values_items" DROP COLUMN "image_id";
  ALTER TABLE "marketing_content_about_values_items" DROP COLUMN "video_id";
  ALTER TABLE "marketing_content" DROP COLUMN "home_what_we_do_eyebrow";
  ALTER TABLE "marketing_content" DROP COLUMN "home_what_we_do_title";
  ALTER TABLE "marketing_content" DROP COLUMN "home_promise_eyebrow";
  ALTER TABLE "marketing_content" DROP COLUMN "home_promise_line1";
  ALTER TABLE "marketing_content" DROP COLUMN "home_promise_line2";
  ALTER TABLE "marketing_content" DROP COLUMN "home_clients_eyebrow";
  ALTER TABLE "marketing_content" DROP COLUMN "home_clients_title";
  ALTER TABLE "marketing_content" DROP COLUMN "home_impact_eyebrow";
  ALTER TABLE "marketing_content" DROP COLUMN "home_impact_title";
  ALTER TABLE "marketing_content" DROP COLUMN "home_impact_cta_label";
  ALTER TABLE "marketing_content" DROP COLUMN "home_impact_cta_href";
  ALTER TABLE "marketing_content" DROP COLUMN "home_how_we_work_eyebrow";
  ALTER TABLE "marketing_content" DROP COLUMN "home_how_we_work_title";
  ALTER TABLE "marketing_content" DROP COLUMN "home_who_we_are_eyebrow";
  ALTER TABLE "marketing_content" DROP COLUMN "home_who_we_are_title";
  ALTER TABLE "marketing_content" DROP COLUMN "home_who_we_are_cta_label";
  ALTER TABLE "marketing_content" DROP COLUMN "home_who_we_are_cta_href";
  ALTER TABLE "marketing_content" DROP COLUMN "home_lab_eyebrow";
  ALTER TABLE "marketing_content" DROP COLUMN "home_lab_title";
  ALTER TABLE "marketing_content" DROP COLUMN "home_lab_background_id";
  ALTER TABLE "marketing_content" DROP COLUMN "home_lab_demo_image_id";
  ALTER TABLE "marketing_content" DROP COLUMN "home_lab_demo_video_id";
  ALTER TABLE "marketing_content" DROP COLUMN "about_leader_eyebrow";
  ALTER TABLE "marketing_content" DROP COLUMN "about_leader_title";
  ALTER TABLE "marketing_content" DROP COLUMN "about_leader_quote";
  ALTER TABLE "marketing_content" DROP COLUMN "about_leader_name";
  ALTER TABLE "marketing_content" DROP COLUMN "about_leader_role";
  ALTER TABLE "marketing_content" DROP COLUMN "about_leader_portrait_id";
  ALTER TABLE "marketing_content" DROP COLUMN "about_reach_eyebrow";
  ALTER TABLE "marketing_content" DROP COLUMN "about_reach_title";
  ALTER TABLE "marketing_content" DROP COLUMN "about_reach_map_id";
  ALTER TABLE "marketing_content" DROP COLUMN "about_careers_eyebrow";
  ALTER TABLE "marketing_content" DROP COLUMN "about_careers_title";
  ALTER TABLE "marketing_content" DROP COLUMN "about_careers_image_id";
  ALTER TABLE "marketing_content" DROP COLUMN "about_careers_label";
  ALTER TABLE "marketing_content" DROP COLUMN "about_careers_cta_label";
  ALTER TABLE "marketing_content" DROP COLUMN "about_careers_cta_href";
  ALTER TABLE "marketing_content" DROP COLUMN "careers_no_roles_message";
  ALTER TABLE "marketing_content" DROP COLUMN "careers_about_hll_image_id";
  ALTER TABLE "marketing_content" DROP COLUMN "cta_still_id";
  ALTER TABLE "marketing_content" DROP COLUMN "cta_video_id";
  ALTER TABLE "marketing_content" DROP COLUMN "all_capabilities_start_index";
  DROP TYPE "public"."enum_marketing_content_home_what_we_do_items_variant";
  DROP TYPE "public"."enum_marketing_content_home_impact_graph_clients_services";
  DROP TYPE "public"."enum_marketing_content_home_impact_graph_clients_industry";
  DROP TYPE "public"."enum_marketing_content_all_capabilities_items_tile";`)
}
