import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_posts_blocks_insight_box_content" AS ENUM('quote', 'demo', 'outcomes');
  CREATE TYPE "public"."enum__posts_v_blocks_insight_box_content" AS ENUM('quote', 'demo', 'outcomes');
  CREATE TABLE "posts_blocks_insight_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"body" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_insight_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"stat" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "posts_blocks_insight_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_insight_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"video_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_insight_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"name" varchar,
  	"role" varchar,
  	"colour" varchar DEFAULT '#086EE8',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_insight_box_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"stat" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "posts_blocks_insight_box" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"colour" varchar DEFAULT '#086EE8',
  	"content" "enum_posts_blocks_insight_box_content" DEFAULT 'quote',
  	"quote" varchar,
  	"name" varchar,
  	"role" varchar,
  	"demo_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer
  );
  
  CREATE TABLE "_posts_v_blocks_insight_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"body" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_insight_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"stat" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_insight_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_insight_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"video_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_insight_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"name" varchar,
  	"role" varchar,
  	"colour" varchar DEFAULT '#086EE8',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_insight_box_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"stat" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_insight_box" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"colour" varchar DEFAULT '#086EE8',
  	"content" "enum__posts_v_blocks_insight_box_content" DEFAULT 'quote',
  	"quote" varchar,
  	"name" varchar,
  	"role" varchar,
  	"demo_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer
  );
  
  ALTER TABLE "posts" ADD COLUMN "byline" varchar;
  ALTER TABLE "posts" ADD COLUMN "author_name" varchar;
  ALTER TABLE "posts" ADD COLUMN "author_photo_id" integer;
  ALTER TABLE "posts" ADD COLUMN "featured" boolean;
  ALTER TABLE "_posts_v" ADD COLUMN "version_byline" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_author_name" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_author_photo_id" integer;
  ALTER TABLE "_posts_v" ADD COLUMN "version_featured" boolean;
  ALTER TABLE "posts_blocks_insight_text" ADD CONSTRAINT "posts_blocks_insight_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_insight_stats_items" ADD CONSTRAINT "posts_blocks_insight_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_insight_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_insight_stats" ADD CONSTRAINT "posts_blocks_insight_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_insight_media" ADD CONSTRAINT "posts_blocks_insight_media_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_insight_media" ADD CONSTRAINT "posts_blocks_insight_media_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_insight_media" ADD CONSTRAINT "posts_blocks_insight_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_insight_quote" ADD CONSTRAINT "posts_blocks_insight_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_insight_box_items" ADD CONSTRAINT "posts_blocks_insight_box_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_insight_box"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_insight_box" ADD CONSTRAINT "posts_blocks_insight_box_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_texts" ADD CONSTRAINT "posts_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_insight_text" ADD CONSTRAINT "_posts_v_blocks_insight_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_insight_stats_items" ADD CONSTRAINT "_posts_v_blocks_insight_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_insight_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_insight_stats" ADD CONSTRAINT "_posts_v_blocks_insight_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_insight_media" ADD CONSTRAINT "_posts_v_blocks_insight_media_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_insight_media" ADD CONSTRAINT "_posts_v_blocks_insight_media_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_insight_media" ADD CONSTRAINT "_posts_v_blocks_insight_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_insight_quote" ADD CONSTRAINT "_posts_v_blocks_insight_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_insight_box_items" ADD CONSTRAINT "_posts_v_blocks_insight_box_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_insight_box"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_insight_box" ADD CONSTRAINT "_posts_v_blocks_insight_box_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_texts" ADD CONSTRAINT "_posts_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "posts_blocks_insight_text_order_idx" ON "posts_blocks_insight_text" USING btree ("_order");
  CREATE INDEX "posts_blocks_insight_text_parent_id_idx" ON "posts_blocks_insight_text" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_insight_text_path_idx" ON "posts_blocks_insight_text" USING btree ("_path");
  CREATE INDEX "posts_blocks_insight_stats_items_order_idx" ON "posts_blocks_insight_stats_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_insight_stats_items_parent_id_idx" ON "posts_blocks_insight_stats_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_insight_stats_order_idx" ON "posts_blocks_insight_stats" USING btree ("_order");
  CREATE INDEX "posts_blocks_insight_stats_parent_id_idx" ON "posts_blocks_insight_stats" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_insight_stats_path_idx" ON "posts_blocks_insight_stats" USING btree ("_path");
  CREATE INDEX "posts_blocks_insight_media_order_idx" ON "posts_blocks_insight_media" USING btree ("_order");
  CREATE INDEX "posts_blocks_insight_media_parent_id_idx" ON "posts_blocks_insight_media" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_insight_media_path_idx" ON "posts_blocks_insight_media" USING btree ("_path");
  CREATE INDEX "posts_blocks_insight_media_image_idx" ON "posts_blocks_insight_media" USING btree ("image_id");
  CREATE INDEX "posts_blocks_insight_media_video_idx" ON "posts_blocks_insight_media" USING btree ("video_id");
  CREATE INDEX "posts_blocks_insight_quote_order_idx" ON "posts_blocks_insight_quote" USING btree ("_order");
  CREATE INDEX "posts_blocks_insight_quote_parent_id_idx" ON "posts_blocks_insight_quote" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_insight_quote_path_idx" ON "posts_blocks_insight_quote" USING btree ("_path");
  CREATE INDEX "posts_blocks_insight_box_items_order_idx" ON "posts_blocks_insight_box_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_insight_box_items_parent_id_idx" ON "posts_blocks_insight_box_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_insight_box_order_idx" ON "posts_blocks_insight_box" USING btree ("_order");
  CREATE INDEX "posts_blocks_insight_box_parent_id_idx" ON "posts_blocks_insight_box" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_insight_box_path_idx" ON "posts_blocks_insight_box" USING btree ("_path");
  CREATE INDEX "posts_texts_order_parent" ON "posts_texts" USING btree ("order","parent_id");
  CREATE INDEX "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX "posts_rels_posts_id_idx" ON "posts_rels" USING btree ("posts_id");
  CREATE INDEX "_posts_v_blocks_insight_text_order_idx" ON "_posts_v_blocks_insight_text" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_insight_text_parent_id_idx" ON "_posts_v_blocks_insight_text" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_insight_text_path_idx" ON "_posts_v_blocks_insight_text" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_insight_stats_items_order_idx" ON "_posts_v_blocks_insight_stats_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_insight_stats_items_parent_id_idx" ON "_posts_v_blocks_insight_stats_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_insight_stats_order_idx" ON "_posts_v_blocks_insight_stats" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_insight_stats_parent_id_idx" ON "_posts_v_blocks_insight_stats" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_insight_stats_path_idx" ON "_posts_v_blocks_insight_stats" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_insight_media_order_idx" ON "_posts_v_blocks_insight_media" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_insight_media_parent_id_idx" ON "_posts_v_blocks_insight_media" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_insight_media_path_idx" ON "_posts_v_blocks_insight_media" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_insight_media_image_idx" ON "_posts_v_blocks_insight_media" USING btree ("image_id");
  CREATE INDEX "_posts_v_blocks_insight_media_video_idx" ON "_posts_v_blocks_insight_media" USING btree ("video_id");
  CREATE INDEX "_posts_v_blocks_insight_quote_order_idx" ON "_posts_v_blocks_insight_quote" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_insight_quote_parent_id_idx" ON "_posts_v_blocks_insight_quote" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_insight_quote_path_idx" ON "_posts_v_blocks_insight_quote" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_insight_box_items_order_idx" ON "_posts_v_blocks_insight_box_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_insight_box_items_parent_id_idx" ON "_posts_v_blocks_insight_box_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_insight_box_order_idx" ON "_posts_v_blocks_insight_box" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_insight_box_parent_id_idx" ON "_posts_v_blocks_insight_box" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_insight_box_path_idx" ON "_posts_v_blocks_insight_box" USING btree ("_path");
  CREATE INDEX "_posts_v_texts_order_parent" ON "_posts_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "_posts_v_rels_order_idx" ON "_posts_v_rels" USING btree ("order");
  CREATE INDEX "_posts_v_rels_parent_idx" ON "_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX "_posts_v_rels_path_idx" ON "_posts_v_rels" USING btree ("path");
  CREATE INDEX "_posts_v_rels_posts_id_idx" ON "_posts_v_rels" USING btree ("posts_id");
  ALTER TABLE "posts" ADD CONSTRAINT "posts_author_photo_id_media_id_fk" FOREIGN KEY ("author_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_author_photo_id_media_id_fk" FOREIGN KEY ("version_author_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "posts_author_author_photo_idx" ON "posts" USING btree ("author_photo_id");
  CREATE INDEX "_posts_v_version_author_version_author_photo_idx" ON "_posts_v" USING btree ("version_author_photo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts_blocks_insight_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_insight_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_insight_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_insight_media" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_insight_quote" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_insight_box_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_insight_box" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_insight_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_insight_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_insight_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_insight_media" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_insight_quote" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_insight_box_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_insight_box" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "posts_blocks_insight_text" CASCADE;
  DROP TABLE "posts_blocks_insight_stats_items" CASCADE;
  DROP TABLE "posts_blocks_insight_stats" CASCADE;
  DROP TABLE "posts_blocks_insight_media" CASCADE;
  DROP TABLE "posts_blocks_insight_quote" CASCADE;
  DROP TABLE "posts_blocks_insight_box_items" CASCADE;
  DROP TABLE "posts_blocks_insight_box" CASCADE;
  DROP TABLE "posts_texts" CASCADE;
  DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "_posts_v_blocks_insight_text" CASCADE;
  DROP TABLE "_posts_v_blocks_insight_stats_items" CASCADE;
  DROP TABLE "_posts_v_blocks_insight_stats" CASCADE;
  DROP TABLE "_posts_v_blocks_insight_media" CASCADE;
  DROP TABLE "_posts_v_blocks_insight_quote" CASCADE;
  DROP TABLE "_posts_v_blocks_insight_box_items" CASCADE;
  DROP TABLE "_posts_v_blocks_insight_box" CASCADE;
  DROP TABLE "_posts_v_texts" CASCADE;
  DROP TABLE "_posts_v_rels" CASCADE;
  ALTER TABLE "posts" DROP CONSTRAINT "posts_author_photo_id_media_id_fk";
  
  ALTER TABLE "_posts_v" DROP CONSTRAINT "_posts_v_version_author_photo_id_media_id_fk";
  
  DROP INDEX "posts_author_author_photo_idx";
  DROP INDEX "_posts_v_version_author_version_author_photo_idx";
  ALTER TABLE "posts" DROP COLUMN "byline";
  ALTER TABLE "posts" DROP COLUMN "author_name";
  ALTER TABLE "posts" DROP COLUMN "author_photo_id";
  ALTER TABLE "posts" DROP COLUMN "featured";
  ALTER TABLE "_posts_v" DROP COLUMN "version_byline";
  ALTER TABLE "_posts_v" DROP COLUMN "version_author_name";
  ALTER TABLE "_posts_v" DROP COLUMN "version_author_photo_id";
  ALTER TABLE "_posts_v" DROP COLUMN "version_featured";
  DROP TYPE "public"."enum_posts_blocks_insight_box_content";
  DROP TYPE "public"."enum__posts_v_blocks_insight_box_content";`)
}
