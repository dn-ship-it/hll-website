import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'hi');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_media_media_type" AS ENUM('image', 'video', 'lottie', 'pdf', 'html', 'other');
  CREATE TYPE "public"."enum_pages_blocks_hero_variant" AS ENUM('services', 'industries', 'engagement', 'about', 'contact', 'hll-ai', 'hll-trust', 'hll-foundation', 'hll-ontology', 'hll-people', 'hll-application');
  CREATE TYPE "public"."enum_pages_blocks_hero_reveal_speed" AS ENUM('slow', 'normal');
  CREATE TYPE "public"."enum_pages_blocks_shader_section_variant" AS ENUM('services', 'industries', 'engagement', 'about', 'contact', 'hll-ai', 'hll-trust', 'hll-foundation', 'hll-ontology', 'hll-people', 'hll-application');
  CREATE TYPE "public"."enum_pages_blocks_shader_section_placement" AS ENUM('full', 'bottom');
  CREATE TYPE "public"."enum_pages_blocks_cta_variant" AS ENUM('services', 'industries', 'engagement', 'about', 'contact', 'hll-ai', 'hll-trust', 'hll-foundation', 'hll-ontology', 'hll-people', 'hll-application');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_variant" AS ENUM('services', 'industries', 'engagement', 'about', 'contact', 'hll-ai', 'hll-trust', 'hll-foundation', 'hll-ontology', 'hll-people', 'hll-application');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_reveal_speed" AS ENUM('slow', 'normal');
  CREATE TYPE "public"."enum__pages_v_blocks_shader_section_variant" AS ENUM('services', 'industries', 'engagement', 'about', 'contact', 'hll-ai', 'hll-trust', 'hll-foundation', 'hll-ontology', 'hll-people', 'hll-application');
  CREATE TYPE "public"."enum__pages_v_blocks_shader_section_placement" AS ENUM('full', 'bottom');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_variant" AS ENUM('services', 'industries', 'engagement', 'about', 'contact', 'hll-ai', 'hll-trust', 'hll-foundation', 'hll-ontology', 'hll-people', 'hll-application');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('en', 'hi');
  CREATE TYPE "public"."enum_services_demo_window_demos_content_type" AS ENUM('inline', 'file');
  CREATE TYPE "public"."enum_services_page_content_engagement_cards_variant" AS ENUM('navy', 'orange', 'image');
  CREATE TYPE "public"."enum_services_blocks_hero_variant" AS ENUM('services', 'industries', 'engagement', 'about', 'contact', 'hll-ai', 'hll-trust', 'hll-foundation', 'hll-ontology', 'hll-people', 'hll-application');
  CREATE TYPE "public"."enum_services_blocks_hero_reveal_speed" AS ENUM('slow', 'normal');
  CREATE TYPE "public"."enum_services_blocks_shader_section_variant" AS ENUM('services', 'industries', 'engagement', 'about', 'contact', 'hll-ai', 'hll-trust', 'hll-foundation', 'hll-ontology', 'hll-people', 'hll-application');
  CREATE TYPE "public"."enum_services_blocks_shader_section_placement" AS ENUM('full', 'bottom');
  CREATE TYPE "public"."enum_services_blocks_cta_variant" AS ENUM('services', 'industries', 'engagement', 'about', 'contact', 'hll-ai', 'hll-trust', 'hll-foundation', 'hll-ontology', 'hll-people', 'hll-application');
  CREATE TYPE "public"."enum_services_variant" AS ENUM('services', 'industries', 'engagement', 'about', 'contact', 'hll-ai', 'hll-trust', 'hll-foundation', 'hll-ontology', 'hll-people', 'hll-application');
  CREATE TYPE "public"."enum_services_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__services_v_version_demo_window_demos_content_type" AS ENUM('inline', 'file');
  CREATE TYPE "public"."enum__services_v_version_page_content_engagement_cards_variant" AS ENUM('navy', 'orange', 'image');
  CREATE TYPE "public"."enum__services_v_blocks_hero_variant" AS ENUM('services', 'industries', 'engagement', 'about', 'contact', 'hll-ai', 'hll-trust', 'hll-foundation', 'hll-ontology', 'hll-people', 'hll-application');
  CREATE TYPE "public"."enum__services_v_blocks_hero_reveal_speed" AS ENUM('slow', 'normal');
  CREATE TYPE "public"."enum__services_v_blocks_shader_section_variant" AS ENUM('services', 'industries', 'engagement', 'about', 'contact', 'hll-ai', 'hll-trust', 'hll-foundation', 'hll-ontology', 'hll-people', 'hll-application');
  CREATE TYPE "public"."enum__services_v_blocks_shader_section_placement" AS ENUM('full', 'bottom');
  CREATE TYPE "public"."enum__services_v_blocks_cta_variant" AS ENUM('services', 'industries', 'engagement', 'about', 'contact', 'hll-ai', 'hll-trust', 'hll-foundation', 'hll-ontology', 'hll-people', 'hll-application');
  CREATE TYPE "public"."enum__services_v_version_variant" AS ENUM('services', 'industries', 'engagement', 'about', 'contact', 'hll-ai', 'hll-trust', 'hll-foundation', 'hll-ontology', 'hll-people', 'hll-application');
  CREATE TYPE "public"."enum__services_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__services_v_published_locale" AS ENUM('en', 'hi');
  CREATE TYPE "public"."enum_industries_cap_card_variant" AS ENUM('navy', 'orange', 'image');
  CREATE TYPE "public"."enum_industries_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__industries_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__industries_v_published_locale" AS ENUM('en', 'hi');
  CREATE TYPE "public"."enum_tenders_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_published_locale" AS ENUM('en', 'hi');
  CREATE TYPE "public"."enum_careers_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_team_members_department" AS ENUM('leadership', 'engineering', 'design', 'operations');
  CREATE TYPE "public"."enum_engagements_services" AS ENUM('hll-ai', 'hll-trust', 'hll-foundation', 'hll-ontology', 'hll-people', 'hll-application');
  CREATE TYPE "public"."enum_engagements_blocks_engagement_showcase_display" AS ENUM('text', 'media', 'demo');
  CREATE TYPE "public"."enum_engagements_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_engagements_engagement_type" AS ENUM('insight', 'client-work', 'case-study');
  CREATE TYPE "public"."enum_engagements_template" AS ENUM('case-study', 'story');
  CREATE TYPE "public"."enum_engagements_industry" AS ENUM('Banking', 'Insurance', 'Other Financial Services', 'Retail Commerce & Brands', 'Travel & Hospitality', 'Pet Tech', 'Healthcare', 'Pharmaceuticals', 'Manufacturing', 'Real Estate', 'Logistics', 'Public Sector – External Affairs', 'Public Sector – Tax & Commerce', 'International Organization', 'Consulting Firms');
  CREATE TYPE "public"."enum_site_settings_header_nav_variant" AS ENUM('services', 'industries', 'engagement', 'about', 'contact', 'hll-ai', 'hll-trust', 'hll-foundation', 'hll-ontology', 'hll-people', 'hll-application');
  CREATE TYPE "public"."enum_site_settings_social_links_platform" AS ENUM('twitter', 'facebook', 'instagram', 'linkedin', 'youtube');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" "enum_users_role" DEFAULT 'editor',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"media_type" "enum_media_media_type" DEFAULT 'image' NOT NULL,
  	"caption" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"variant" "enum_pages_blocks_hero_variant" DEFAULT 'services',
  	"reveal_speed" "enum_pages_blocks_hero_reveal_speed" DEFAULT 'slow',
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_image_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"full_width" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_shader_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_shader_section_variant",
  	"intensity" numeric DEFAULT 100,
  	"placement" "enum_pages_blocks_shader_section_placement" DEFAULT 'full',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_lottie_animation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"animation_file_id" integer,
  	"label" varchar,
  	"loop" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"video_file_id" integer,
  	"poster_id" integer,
  	"autoplay" boolean DEFAULT false,
  	"muted" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_html_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"html" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"variant" "enum_pages_blocks_cta_variant" DEFAULT 'services',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_content_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_content_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"variant" "enum__pages_v_blocks_hero_variant" DEFAULT 'services',
  	"reveal_speed" "enum__pages_v_blocks_hero_reveal_speed" DEFAULT 'slow',
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"full_width" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_shader_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_shader_section_variant",
  	"intensity" numeric DEFAULT 100,
  	"placement" "enum__pages_v_blocks_shader_section_placement" DEFAULT 'full',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_lottie_animation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"animation_file_id" integer,
  	"label" varchar,
  	"loop" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"video_file_id" integer,
  	"poster_id" integer,
  	"autoplay" boolean DEFAULT false,
  	"muted" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_html_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"html" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"variant" "enum__pages_v_blocks_cta_variant" DEFAULT 'services',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__pages_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "services_demo_window_demos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tab_key" varchar,
  	"title" varchar,
  	"content_type" "enum_services_demo_window_demos_content_type" DEFAULT 'inline',
  	"html" varchar,
  	"html_file_id" integer
  );
  
  CREATE TABLE "services_page_content_breadcrumb" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "services_page_content_hero_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "subsvc" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "services_page_content_capabilities_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"index" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "services_page_content_capabilities_tools_cloud" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon_id" integer
  );
  
  CREATE TABLE "services_page_content_capabilities_tools_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon_id" integer
  );
  
  CREATE TABLE "services_page_content_outcomes_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"stat" varchar,
  	"description" varchar,
  	"has_media" boolean DEFAULT false,
  	"image_id" integer
  );
  
  CREATE TABLE "services_page_content_engagement_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"client" varchar,
  	"tag" varchar,
  	"description" varchar,
  	"variant" "enum_services_page_content_engagement_cards_variant" DEFAULT 'navy',
  	"image_id" integer
  );
  
  CREATE TABLE "services_page_content_related_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "services_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"variant" "enum_services_blocks_hero_variant" DEFAULT 'services',
  	"reveal_speed" "enum_services_blocks_hero_reveal_speed" DEFAULT 'slow',
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_image_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"full_width" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_shader_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_services_blocks_shader_section_variant",
  	"intensity" numeric DEFAULT 100,
  	"placement" "enum_services_blocks_shader_section_placement" DEFAULT 'full',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_lottie_animation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"animation_file_id" integer,
  	"label" varchar,
  	"loop" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"video_file_id" integer,
  	"poster_id" integer,
  	"autoplay" boolean DEFAULT false,
  	"muted" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_html_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"html" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"variant" "enum_services_blocks_cta_variant" DEFAULT 'services',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_content_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "services_blocks_content_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"variant" "enum_services_variant",
  	"summary" varchar,
  	"featured_image_id" integer,
  	"demo_window_selector_label" varchar DEFAULT 'HLL Foundation',
  	"demo_window_fallback_html" varchar,
  	"demo_window_fallback_file_id" integer,
  	"page_content_brand" varchar,
  	"page_content_hero_headline" varchar,
  	"page_content_hero_image_id" integer,
  	"page_content_capabilities_eyebrow" varchar,
  	"page_content_capabilities_title" varchar,
  	"page_content_outcomes_title" varchar,
  	"page_content_engagement_title" varchar,
  	"page_content_engagement_intro" varchar,
  	"page_content_expert_voice_quote" varchar,
  	"page_content_expert_voice_name" varchar,
  	"page_content_expert_voice_role" varchar,
  	"page_content_expert_voice_company" varchar,
  	"page_content_expert_voice_portrait_id" integer,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_services_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_services_v_version_demo_window_demos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tab_key" varchar,
  	"title" varchar,
  	"content_type" "enum__services_v_version_demo_window_demos_content_type" DEFAULT 'inline',
  	"html" varchar,
  	"html_file_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_version_page_content_breadcrumb" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_version_page_content_hero_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "_subsvc_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_version_page_content_capabilities_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"index" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "_services_v_version_page_content_capabilities_tools_cloud" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_version_page_content_capabilities_tools_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_version_page_content_outcomes_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"stat" varchar,
  	"description" varchar,
  	"has_media" boolean DEFAULT false,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_version_page_content_engagement_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"title" varchar,
  	"client" varchar,
  	"tag" varchar,
  	"description" varchar,
  	"variant" "enum__services_v_version_page_content_engagement_cards_variant" DEFAULT 'navy',
  	"image_id" integer
  );
  
  CREATE TABLE "_services_v_version_page_content_related_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"variant" "enum__services_v_blocks_hero_variant" DEFAULT 'services',
  	"reveal_speed" "enum__services_v_blocks_hero_reveal_speed" DEFAULT 'slow',
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_image_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"full_width" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_shader_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__services_v_blocks_shader_section_variant",
  	"intensity" numeric DEFAULT 100,
  	"placement" "enum__services_v_blocks_shader_section_placement" DEFAULT 'full',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_lottie_animation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"animation_file_id" integer,
  	"label" varchar,
  	"loop" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"video_file_id" integer,
  	"poster_id" integer,
  	"autoplay" boolean DEFAULT false,
  	"muted" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_html_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"html" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"variant" "enum__services_v_blocks_cta_variant" DEFAULT 'services',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_content_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_content_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_variant" "enum__services_v_version_variant",
  	"version_summary" varchar,
  	"version_featured_image_id" integer,
  	"version_demo_window_selector_label" varchar DEFAULT 'HLL Foundation',
  	"version_demo_window_fallback_html" varchar,
  	"version_demo_window_fallback_file_id" integer,
  	"version_page_content_brand" varchar,
  	"version_page_content_hero_headline" varchar,
  	"version_page_content_hero_image_id" integer,
  	"version_page_content_capabilities_eyebrow" varchar,
  	"version_page_content_capabilities_title" varchar,
  	"version_page_content_outcomes_title" varchar,
  	"version_page_content_engagement_title" varchar,
  	"version_page_content_engagement_intro" varchar,
  	"version_page_content_expert_voice_quote" varchar,
  	"version_page_content_expert_voice_name" varchar,
  	"version_page_content_expert_voice_role" varchar,
  	"version_page_content_expert_voice_company" varchar,
  	"version_page_content_expert_voice_portrait_id" integer,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__services_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__services_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "industries_page_content_breadcrumb" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "industries_page_content_hero_filters" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "industries_page_content_capabilities_sidebar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "industries_page_content_capabilities_items_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"client" varchar,
  	"tag" varchar,
  	"description" varchar,
  	"variant" "enum_industries_cap_card_variant",
  	"image_id" integer
  );
  
  CREATE TABLE "industries_page_content_capabilities_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"index" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "industries_page_content_experts_people" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"bio" varchar,
  	"photo_id" integer
  );
  
  CREATE TABLE "industries_page_content_related_industries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "industries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"page_content_category" varchar,
  	"page_content_accent_color" varchar DEFAULT '#0D9488',
  	"page_content_hero_title" varchar,
  	"page_content_hero_headline" varchar,
  	"page_content_hero_overlay_label" varchar,
  	"page_content_hero_image_id" integer,
  	"page_content_capabilities_eyebrow" varchar,
  	"page_content_capabilities_title" varchar,
  	"page_content_client_voice_eyebrow" varchar,
  	"page_content_client_voice_quote" varchar,
  	"page_content_client_voice_name" varchar,
  	"page_content_client_voice_role" varchar,
  	"page_content_client_voice_company" varchar,
  	"page_content_client_voice_slide_count" numeric DEFAULT 3,
  	"page_content_client_voice_gallery_image_id" integer,
  	"page_content_experts_eyebrow" varchar,
  	"page_content_experts_title" varchar,
  	"page_content_lab_eyebrow" varchar,
  	"page_content_lab_title" varchar,
  	"page_content_lab_selector_label" varchar,
  	"page_content_lab_demo_url" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_industries_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_industries_v_version_page_content_breadcrumb" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_industries_v_version_page_content_hero_filters" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "_industries_v_version_page_content_capabilities_sidebar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_industries_v_version_page_content_capabilities_items_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"title" varchar,
  	"client" varchar,
  	"tag" varchar,
  	"description" varchar,
  	"variant" "enum_industries_cap_card_variant",
  	"image_id" integer
  );
  
  CREATE TABLE "_industries_v_version_page_content_capabilities_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"index" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "_industries_v_version_page_content_experts_people" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"bio" varchar,
  	"photo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_industries_v_version_page_content_related_industries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_industries_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_page_content_category" varchar,
  	"version_page_content_accent_color" varchar DEFAULT '#0D9488',
  	"version_page_content_hero_title" varchar,
  	"version_page_content_hero_headline" varchar,
  	"version_page_content_hero_overlay_label" varchar,
  	"version_page_content_hero_image_id" integer,
  	"version_page_content_capabilities_eyebrow" varchar,
  	"version_page_content_capabilities_title" varchar,
  	"version_page_content_client_voice_eyebrow" varchar,
  	"version_page_content_client_voice_quote" varchar,
  	"version_page_content_client_voice_name" varchar,
  	"version_page_content_client_voice_role" varchar,
  	"version_page_content_client_voice_company" varchar,
  	"version_page_content_client_voice_slide_count" numeric DEFAULT 3,
  	"version_page_content_client_voice_gallery_image_id" integer,
  	"version_page_content_experts_eyebrow" varchar,
  	"version_page_content_experts_title" varchar,
  	"version_page_content_lab_eyebrow" varchar,
  	"version_page_content_lab_title" varchar,
  	"version_page_content_lab_selector_label" varchar,
  	"version_page_content_lab_demo_url" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__industries_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__industries_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "tenders_documents" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"file_id" integer NOT NULL
  );
  
  CREATE TABLE "tenders_corrigenda" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"published_at" timestamp(3) with time zone,
  	"file_id" integer
  );
  
  CREATE TABLE "tenders" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"reference_no" varchar NOT NULL,
  	"category" varchar,
  	"summary" varchar,
  	"expiry_date" timestamp(3) with time zone NOT NULL,
  	"archived" boolean DEFAULT false,
  	"status" "enum_tenders_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"excerpt" varchar,
  	"cover_image_id" integer,
  	"published_at" timestamp(3) with time zone,
  	"body" jsonb,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_excerpt" varchar,
  	"version_cover_image_id" integer,
  	"version_published_at" timestamp(3) with time zone,
  	"version_body" jsonb,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__posts_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "careers_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL
  );
  
  CREATE TABLE "careers_documents" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"file_id" integer NOT NULL
  );
  
  CREATE TABLE "careers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"summary" jsonb,
  	"expiry_date" timestamp(3) with time zone,
  	"external_apply_url" varchar,
  	"status" "enum_careers_status" DEFAULT 'draft',
  	"service" varchar,
  	"employment_type" varchar,
  	"location" varchar,
  	"seniority" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "team_members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"bio" varchar,
  	"department" "enum_team_members_department" DEFAULT 'leadership' NOT NULL,
  	"featured" boolean DEFAULT false,
  	"sort_order" numeric DEFAULT 0,
  	"photo_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "engagements_services" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_engagements_services",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "engagements_stat_chart" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" numeric NOT NULL
  );
  
  CREATE TABLE "engagements_blocks_engagement_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"video_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "engagements_blocks_engagement_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "engagements_blocks_engagement_media_grid_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "engagements_blocks_engagement_media_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "engagements_blocks_engagement_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"body" varchar NOT NULL,
  	"shows_artifact" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "engagements_blocks_engagement_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'What we built',
  	"display" "enum_engagements_blocks_engagement_showcase_display" DEFAULT 'text',
  	"body" varchar,
  	"image_id" integer,
  	"demo_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "engagements_blocks_engagement_outcome_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"stat" varchar NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "engagements_blocks_engagement_outcome" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'Outcome',
  	"block_name" varchar
  );
  
  CREATE TABLE "engagements_blocks_engagement_team_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"role" varchar NOT NULL,
  	"names" varchar NOT NULL
  );
  
  CREATE TABLE "engagements_blocks_engagement_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'Team',
  	"block_name" varchar
  );
  
  CREATE TABLE "engagements_blocks_engagement_learnings_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "engagements_blocks_engagement_learnings" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'Our learnings',
  	"block_name" varchar
  );
  
  CREATE TABLE "engagements" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"client" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"status" "enum_engagements_status" DEFAULT 'draft',
  	"year" numeric NOT NULL,
  	"engagement_type" "enum_engagements_engagement_type" DEFAULT 'case-study' NOT NULL,
  	"template" "enum_engagements_template" DEFAULT 'case-study' NOT NULL,
  	"industry" "enum_engagements_industry",
  	"period" varchar,
  	"location" varchar,
  	"primary_color" varchar,
  	"card_image_id" integer,
  	"featured" boolean,
  	"sort_order" numeric DEFAULT 0,
  	"stat_label" varchar,
  	"stat_value" varchar,
  	"stat_unit" varchar,
  	"stat_body" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "engagements_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"engagements_id" integer
  );
  
  CREATE TABLE "enquiries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"message" varchar NOT NULL,
  	"source" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"pages_id" integer,
  	"services_id" integer,
  	"industries_id" integer,
  	"tenders_id" integer,
  	"posts_id" integer,
  	"careers_id" integer,
  	"team_members_id" integer,
  	"engagements_id" integer,
  	"enquiries_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_header_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"variant" "enum_site_settings_header_nav_variant" DEFAULT 'services'
  );
  
  CREATE TABLE "site_settings_footer_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_site_settings_social_links_platform",
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar DEFAULT 'HLL Cornerstone',
  	"default_seo_title" varchar,
  	"default_seo_description" varchar,
  	"default_seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "marketing_content_home_client_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"logo_id" integer
  );
  
  CREATE TABLE "marketing_content_about_story_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "marketing_content_about_values_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "marketing_content_about_clients_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"logo_id" integer
  );
  
  CREATE TABLE "marketing_content_contact_locations_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"city" varchar NOT NULL,
  	"label" varchar,
  	"company" varchar,
  	"address" varchar,
  	"tax_label" varchar,
  	"tax_id" varchar
  );
  
  CREATE TABLE "marketing_content_careers_culture_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar
  );
  
  CREATE TABLE "marketing_content_footer_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "marketing_content_footer_industries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "marketing_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"home_hero_heading" varchar,
  	"home_hero_image_id" integer,
  	"home_hero_video_id" integer,
  	"home_hero_cta_label" varchar,
  	"home_hero_cta_href" varchar,
  	"about_accent_color" varchar DEFAULT '#9AB4D3',
  	"about_hero_eyebrow" varchar,
  	"about_hero_headline" varchar,
  	"about_hero_description" varchar,
  	"about_hero_image_id" integer,
  	"about_hero_cta_label" varchar,
  	"about_hero_cta_href" varchar,
  	"about_story_eyebrow" varchar,
  	"about_story_title" varchar,
  	"about_story_image_id" integer,
  	"about_values_eyebrow" varchar,
  	"about_values_title" varchar,
  	"about_promise_eyebrow" varchar,
  	"about_promise_line1" varchar,
  	"about_promise_line2" varchar,
  	"about_clients_eyebrow" varchar,
  	"about_clients_title" varchar,
  	"contact_accent_color" varchar DEFAULT '#076EB8',
  	"contact_hero_eyebrow" varchar,
  	"contact_hero_headline" varchar,
  	"contact_hero_description" varchar,
  	"contact_details_eyebrow" varchar,
  	"contact_details_title" varchar,
  	"contact_details_email" varchar,
  	"contact_details_linkedin" varchar,
  	"contact_details_linkedin_label" varchar,
  	"contact_details_office_image_id" integer,
  	"contact_details_schedule_url" varchar,
  	"contact_locations_eyebrow" varchar,
  	"contact_locations_title" varchar,
  	"careers_accent_color" varchar DEFAULT '#FF9126',
  	"careers_hero_eyebrow" varchar,
  	"careers_hero_headline" varchar,
  	"careers_hero_description" varchar,
  	"careers_hero_image_id" integer,
  	"careers_culture_eyebrow" varchar,
  	"careers_culture_title" varchar,
  	"careers_culture_description" varchar,
  	"careers_culture_image_id" integer,
  	"team_accent_color" varchar DEFAULT '#9AB4D3',
  	"team_hero_eyebrow" varchar,
  	"team_hero_headline" varchar,
  	"team_hero_description" varchar,
  	"team_grid_eyebrow" varchar,
  	"team_grid_title" varchar,
  	"team_join_title" varchar,
  	"team_join_description" varchar,
  	"team_join_cta_label" varchar,
  	"team_join_cta_href" varchar,
  	"cta_headline" varchar,
  	"cta_button_label" varchar,
  	"cta_button_href" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_block" ADD CONSTRAINT "pages_blocks_image_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_block" ADD CONSTRAINT "pages_blocks_image_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_shader_section" ADD CONSTRAINT "pages_blocks_shader_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lottie_animation" ADD CONSTRAINT "pages_blocks_lottie_animation_animation_file_id_media_id_fk" FOREIGN KEY ("animation_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_lottie_animation" ADD CONSTRAINT "pages_blocks_lottie_animation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_video" ADD CONSTRAINT "pages_blocks_video_video_file_id_media_id_fk" FOREIGN KEY ("video_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_video" ADD CONSTRAINT "pages_blocks_video_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_video" ADD CONSTRAINT "pages_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_html_embed" ADD CONSTRAINT "pages_blocks_html_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_grid_items" ADD CONSTRAINT "pages_blocks_content_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_grid_items" ADD CONSTRAINT "pages_blocks_content_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_grid" ADD CONSTRAINT "pages_blocks_content_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text" ADD CONSTRAINT "_pages_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_block" ADD CONSTRAINT "_pages_v_blocks_image_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_block" ADD CONSTRAINT "_pages_v_blocks_image_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_shader_section" ADD CONSTRAINT "_pages_v_blocks_shader_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lottie_animation" ADD CONSTRAINT "_pages_v_blocks_lottie_animation_animation_file_id_media_id_fk" FOREIGN KEY ("animation_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lottie_animation" ADD CONSTRAINT "_pages_v_blocks_lottie_animation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video" ADD CONSTRAINT "_pages_v_blocks_video_video_file_id_media_id_fk" FOREIGN KEY ("video_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video" ADD CONSTRAINT "_pages_v_blocks_video_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video" ADD CONSTRAINT "_pages_v_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_html_embed" ADD CONSTRAINT "_pages_v_blocks_html_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_grid_items" ADD CONSTRAINT "_pages_v_blocks_content_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_grid_items" ADD CONSTRAINT "_pages_v_blocks_content_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_grid" ADD CONSTRAINT "_pages_v_blocks_content_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_demo_window_demos" ADD CONSTRAINT "services_demo_window_demos_html_file_id_media_id_fk" FOREIGN KEY ("html_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_demo_window_demos" ADD CONSTRAINT "services_demo_window_demos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_content_breadcrumb" ADD CONSTRAINT "services_page_content_breadcrumb_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_content_hero_tabs" ADD CONSTRAINT "services_page_content_hero_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "subsvc" ADD CONSTRAINT "subsvc_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page_content_capabilities_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_content_capabilities_items" ADD CONSTRAINT "services_page_content_capabilities_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_content_capabilities_tools_cloud" ADD CONSTRAINT "services_page_content_capabilities_tools_cloud_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_page_content_capabilities_tools_cloud" ADD CONSTRAINT "services_page_content_capabilities_tools_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_content_capabilities_tools_data" ADD CONSTRAINT "services_page_content_capabilities_tools_data_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_page_content_capabilities_tools_data" ADD CONSTRAINT "services_page_content_capabilities_tools_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_content_outcomes_cards" ADD CONSTRAINT "services_page_content_outcomes_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_page_content_outcomes_cards" ADD CONSTRAINT "services_page_content_outcomes_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_content_engagement_cards" ADD CONSTRAINT "services_page_content_engagement_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_page_content_engagement_cards" ADD CONSTRAINT "services_page_content_engagement_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_content_related_services" ADD CONSTRAINT "services_page_content_related_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hero" ADD CONSTRAINT "services_blocks_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_hero" ADD CONSTRAINT "services_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_rich_text" ADD CONSTRAINT "services_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_image_block" ADD CONSTRAINT "services_blocks_image_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_image_block" ADD CONSTRAINT "services_blocks_image_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_shader_section" ADD CONSTRAINT "services_blocks_shader_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_lottie_animation" ADD CONSTRAINT "services_blocks_lottie_animation_animation_file_id_media_id_fk" FOREIGN KEY ("animation_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_lottie_animation" ADD CONSTRAINT "services_blocks_lottie_animation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_video" ADD CONSTRAINT "services_blocks_video_video_file_id_media_id_fk" FOREIGN KEY ("video_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_video" ADD CONSTRAINT "services_blocks_video_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_video" ADD CONSTRAINT "services_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_html_embed" ADD CONSTRAINT "services_blocks_html_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_cta" ADD CONSTRAINT "services_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_content_grid_items" ADD CONSTRAINT "services_blocks_content_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_content_grid_items" ADD CONSTRAINT "services_blocks_content_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_content_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_content_grid" ADD CONSTRAINT "services_blocks_content_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_demo_window_fallback_file_id_media_id_fk" FOREIGN KEY ("demo_window_fallback_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_page_content_hero_image_id_media_id_fk" FOREIGN KEY ("page_content_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_page_content_expert_voice_portrait_id_media_id_fk" FOREIGN KEY ("page_content_expert_voice_portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_version_demo_window_demos" ADD CONSTRAINT "_services_v_version_demo_window_demos_html_file_id_media_id_fk" FOREIGN KEY ("html_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_version_demo_window_demos" ADD CONSTRAINT "_services_v_version_demo_window_demos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_page_content_breadcrumb" ADD CONSTRAINT "_services_v_version_page_content_breadcrumb_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_page_content_hero_tabs" ADD CONSTRAINT "_services_v_version_page_content_hero_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_subsvc_v" ADD CONSTRAINT "_subsvc_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_version_page_content_capabilities_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_page_content_capabilities_items" ADD CONSTRAINT "_services_v_version_page_content_capabilities_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_page_content_capabilities_tools_cloud" ADD CONSTRAINT "_services_v_version_page_content_capabilities_tools_cloud_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_version_page_content_capabilities_tools_cloud" ADD CONSTRAINT "_services_v_version_page_content_capabilities_tools_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_page_content_capabilities_tools_data" ADD CONSTRAINT "_services_v_version_page_content_capabilities_tools_data_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_version_page_content_capabilities_tools_data" ADD CONSTRAINT "_services_v_version_page_content_capabilities_tools_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_page_content_outcomes_cards" ADD CONSTRAINT "_services_v_version_page_content_outcomes_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_version_page_content_outcomes_cards" ADD CONSTRAINT "_services_v_version_page_content_outcomes_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_page_content_engagement_cards" ADD CONSTRAINT "_services_v_version_page_content_engagement_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_version_page_content_engagement_cards" ADD CONSTRAINT "_services_v_version_page_content_engagement_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_page_content_related_services" ADD CONSTRAINT "_services_v_version_page_content_related_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero" ADD CONSTRAINT "_services_v_blocks_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero" ADD CONSTRAINT "_services_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_rich_text" ADD CONSTRAINT "_services_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_image_block" ADD CONSTRAINT "_services_v_blocks_image_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_image_block" ADD CONSTRAINT "_services_v_blocks_image_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_shader_section" ADD CONSTRAINT "_services_v_blocks_shader_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_lottie_animation" ADD CONSTRAINT "_services_v_blocks_lottie_animation_animation_file_id_media_id_fk" FOREIGN KEY ("animation_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_lottie_animation" ADD CONSTRAINT "_services_v_blocks_lottie_animation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_video" ADD CONSTRAINT "_services_v_blocks_video_video_file_id_media_id_fk" FOREIGN KEY ("video_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_video" ADD CONSTRAINT "_services_v_blocks_video_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_video" ADD CONSTRAINT "_services_v_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_html_embed" ADD CONSTRAINT "_services_v_blocks_html_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_cta" ADD CONSTRAINT "_services_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_content_grid_items" ADD CONSTRAINT "_services_v_blocks_content_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_content_grid_items" ADD CONSTRAINT "_services_v_blocks_content_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_content_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_content_grid" ADD CONSTRAINT "_services_v_blocks_content_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_parent_id_services_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_demo_window_fallback_file_id_media_id_fk" FOREIGN KEY ("version_demo_window_fallback_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_page_content_hero_image_id_media_id_fk" FOREIGN KEY ("version_page_content_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_page_content_expert_voice_portrait_id_media_id_fk" FOREIGN KEY ("version_page_content_expert_voice_portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "industries_page_content_breadcrumb" ADD CONSTRAINT "industries_page_content_breadcrumb_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "industries_page_content_hero_filters" ADD CONSTRAINT "industries_page_content_hero_filters_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "industries_page_content_capabilities_sidebar" ADD CONSTRAINT "industries_page_content_capabilities_sidebar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "industries_page_content_capabilities_items_cards" ADD CONSTRAINT "industries_page_content_capabilities_items_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "industries_page_content_capabilities_items_cards" ADD CONSTRAINT "industries_page_content_capabilities_items_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."industries_page_content_capabilities_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "industries_page_content_capabilities_items" ADD CONSTRAINT "industries_page_content_capabilities_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "industries_page_content_experts_people" ADD CONSTRAINT "industries_page_content_experts_people_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "industries_page_content_experts_people" ADD CONSTRAINT "industries_page_content_experts_people_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "industries_page_content_related_industries" ADD CONSTRAINT "industries_page_content_related_industries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "industries" ADD CONSTRAINT "industries_page_content_hero_image_id_media_id_fk" FOREIGN KEY ("page_content_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "industries" ADD CONSTRAINT "industries_page_content_client_voice_gallery_image_id_media_id_fk" FOREIGN KEY ("page_content_client_voice_gallery_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "industries" ADD CONSTRAINT "industries_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_industries_v_version_page_content_breadcrumb" ADD CONSTRAINT "_industries_v_version_page_content_breadcrumb_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_industries_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_industries_v_version_page_content_hero_filters" ADD CONSTRAINT "_industries_v_version_page_content_hero_filters_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_industries_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_industries_v_version_page_content_capabilities_sidebar" ADD CONSTRAINT "_industries_v_version_page_content_capabilities_sidebar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_industries_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_industries_v_version_page_content_capabilities_items_cards" ADD CONSTRAINT "_industries_v_version_page_content_capabilities_items_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_industries_v_version_page_content_capabilities_items_cards" ADD CONSTRAINT "_industries_v_version_page_content_capabilities_items_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_industries_v_version_page_content_capabilities_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_industries_v_version_page_content_capabilities_items" ADD CONSTRAINT "_industries_v_version_page_content_capabilities_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_industries_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_industries_v_version_page_content_experts_people" ADD CONSTRAINT "_industries_v_version_page_content_experts_people_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_industries_v_version_page_content_experts_people" ADD CONSTRAINT "_industries_v_version_page_content_experts_people_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_industries_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_industries_v_version_page_content_related_industries" ADD CONSTRAINT "_industries_v_version_page_content_related_industries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_industries_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_industries_v" ADD CONSTRAINT "_industries_v_parent_id_industries_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."industries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_industries_v" ADD CONSTRAINT "_industries_v_version_page_content_hero_image_id_media_id_fk" FOREIGN KEY ("version_page_content_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_industries_v" ADD CONSTRAINT "_industries_v_version_page_content_client_voice_gallery_image_id_media_id_fk" FOREIGN KEY ("version_page_content_client_voice_gallery_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_industries_v" ADD CONSTRAINT "_industries_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tenders_documents" ADD CONSTRAINT "tenders_documents_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tenders_documents" ADD CONSTRAINT "tenders_documents_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tenders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tenders_corrigenda" ADD CONSTRAINT "tenders_corrigenda_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tenders_corrigenda" ADD CONSTRAINT "tenders_corrigenda_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tenders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "careers_sections" ADD CONSTRAINT "careers_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."careers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "careers_documents" ADD CONSTRAINT "careers_documents_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "careers_documents" ADD CONSTRAINT "careers_documents_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."careers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_members" ADD CONSTRAINT "team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "engagements_services" ADD CONSTRAINT "engagements_services_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."engagements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "engagements_stat_chart" ADD CONSTRAINT "engagements_stat_chart_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."engagements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "engagements_blocks_engagement_media" ADD CONSTRAINT "engagements_blocks_engagement_media_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "engagements_blocks_engagement_media" ADD CONSTRAINT "engagements_blocks_engagement_media_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "engagements_blocks_engagement_media" ADD CONSTRAINT "engagements_blocks_engagement_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."engagements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "engagements_blocks_engagement_quote" ADD CONSTRAINT "engagements_blocks_engagement_quote_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "engagements_blocks_engagement_quote" ADD CONSTRAINT "engagements_blocks_engagement_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."engagements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "engagements_blocks_engagement_media_grid_rows" ADD CONSTRAINT "engagements_blocks_engagement_media_grid_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."engagements_blocks_engagement_media_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "engagements_blocks_engagement_media_grid" ADD CONSTRAINT "engagements_blocks_engagement_media_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."engagements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "engagements_blocks_engagement_text" ADD CONSTRAINT "engagements_blocks_engagement_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."engagements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "engagements_blocks_engagement_showcase" ADD CONSTRAINT "engagements_blocks_engagement_showcase_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "engagements_blocks_engagement_showcase" ADD CONSTRAINT "engagements_blocks_engagement_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."engagements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "engagements_blocks_engagement_outcome_items" ADD CONSTRAINT "engagements_blocks_engagement_outcome_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."engagements_blocks_engagement_outcome"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "engagements_blocks_engagement_outcome" ADD CONSTRAINT "engagements_blocks_engagement_outcome_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."engagements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "engagements_blocks_engagement_team_rows" ADD CONSTRAINT "engagements_blocks_engagement_team_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."engagements_blocks_engagement_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "engagements_blocks_engagement_team" ADD CONSTRAINT "engagements_blocks_engagement_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."engagements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "engagements_blocks_engagement_learnings_items" ADD CONSTRAINT "engagements_blocks_engagement_learnings_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."engagements_blocks_engagement_learnings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "engagements_blocks_engagement_learnings" ADD CONSTRAINT "engagements_blocks_engagement_learnings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."engagements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "engagements" ADD CONSTRAINT "engagements_card_image_id_media_id_fk" FOREIGN KEY ("card_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "engagements_rels" ADD CONSTRAINT "engagements_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."engagements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "engagements_rels" ADD CONSTRAINT "engagements_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "engagements_rels" ADD CONSTRAINT "engagements_rels_engagements_fk" FOREIGN KEY ("engagements_id") REFERENCES "public"."engagements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_industries_fk" FOREIGN KEY ("industries_id") REFERENCES "public"."industries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tenders_fk" FOREIGN KEY ("tenders_id") REFERENCES "public"."tenders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_careers_fk" FOREIGN KEY ("careers_id") REFERENCES "public"."careers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_engagements_fk" FOREIGN KEY ("engagements_id") REFERENCES "public"."engagements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_enquiries_fk" FOREIGN KEY ("enquiries_id") REFERENCES "public"."enquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_header_nav" ADD CONSTRAINT "site_settings_header_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_links" ADD CONSTRAINT "site_settings_footer_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social_links" ADD CONSTRAINT "site_settings_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_seo_og_image_id_media_id_fk" FOREIGN KEY ("default_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "marketing_content_home_client_logos" ADD CONSTRAINT "marketing_content_home_client_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "marketing_content_home_client_logos" ADD CONSTRAINT "marketing_content_home_client_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_content_about_story_paragraphs" ADD CONSTRAINT "marketing_content_about_story_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_content_about_values_items" ADD CONSTRAINT "marketing_content_about_values_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_content_about_clients_logos" ADD CONSTRAINT "marketing_content_about_clients_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "marketing_content_about_clients_logos" ADD CONSTRAINT "marketing_content_about_clients_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_content_contact_locations_items" ADD CONSTRAINT "marketing_content_contact_locations_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_content_careers_culture_highlights" ADD CONSTRAINT "marketing_content_careers_culture_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_content_footer_services" ADD CONSTRAINT "marketing_content_footer_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_content_footer_industries" ADD CONSTRAINT "marketing_content_footer_industries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_content" ADD CONSTRAINT "marketing_content_home_hero_image_id_media_id_fk" FOREIGN KEY ("home_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "marketing_content" ADD CONSTRAINT "marketing_content_home_hero_video_id_media_id_fk" FOREIGN KEY ("home_hero_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "marketing_content" ADD CONSTRAINT "marketing_content_about_hero_image_id_media_id_fk" FOREIGN KEY ("about_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "marketing_content" ADD CONSTRAINT "marketing_content_about_story_image_id_media_id_fk" FOREIGN KEY ("about_story_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "marketing_content" ADD CONSTRAINT "marketing_content_contact_details_office_image_id_media_id_fk" FOREIGN KEY ("contact_details_office_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "marketing_content" ADD CONSTRAINT "marketing_content_careers_hero_image_id_media_id_fk" FOREIGN KEY ("careers_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "marketing_content" ADD CONSTRAINT "marketing_content_careers_culture_image_id_media_id_fk" FOREIGN KEY ("careers_culture_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_background_image_idx" ON "pages_blocks_hero" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_path_idx" ON "pages_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_block_order_idx" ON "pages_blocks_image_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_block_parent_id_idx" ON "pages_blocks_image_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_block_path_idx" ON "pages_blocks_image_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_block_image_idx" ON "pages_blocks_image_block" USING btree ("image_id");
  CREATE INDEX "pages_blocks_shader_section_order_idx" ON "pages_blocks_shader_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_shader_section_parent_id_idx" ON "pages_blocks_shader_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_shader_section_path_idx" ON "pages_blocks_shader_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_lottie_animation_order_idx" ON "pages_blocks_lottie_animation" USING btree ("_order");
  CREATE INDEX "pages_blocks_lottie_animation_parent_id_idx" ON "pages_blocks_lottie_animation" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_lottie_animation_path_idx" ON "pages_blocks_lottie_animation" USING btree ("_path");
  CREATE INDEX "pages_blocks_lottie_animation_animation_file_idx" ON "pages_blocks_lottie_animation" USING btree ("animation_file_id");
  CREATE INDEX "pages_blocks_video_order_idx" ON "pages_blocks_video" USING btree ("_order");
  CREATE INDEX "pages_blocks_video_parent_id_idx" ON "pages_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_video_path_idx" ON "pages_blocks_video" USING btree ("_path");
  CREATE INDEX "pages_blocks_video_video_file_idx" ON "pages_blocks_video" USING btree ("video_file_id");
  CREATE INDEX "pages_blocks_video_poster_idx" ON "pages_blocks_video" USING btree ("poster_id");
  CREATE INDEX "pages_blocks_html_embed_order_idx" ON "pages_blocks_html_embed" USING btree ("_order");
  CREATE INDEX "pages_blocks_html_embed_parent_id_idx" ON "pages_blocks_html_embed" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_html_embed_path_idx" ON "pages_blocks_html_embed" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_content_grid_items_order_idx" ON "pages_blocks_content_grid_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_grid_items_parent_id_idx" ON "pages_blocks_content_grid_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_grid_items_image_idx" ON "pages_blocks_content_grid_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_content_grid_order_idx" ON "pages_blocks_content_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_grid_parent_id_idx" ON "pages_blocks_content_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_grid_path_idx" ON "pages_blocks_content_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_seo_seo_og_image_idx" ON "pages" USING btree ("seo_og_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_background_image_idx" ON "_pages_v_blocks_hero" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_rich_text_order_idx" ON "_pages_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_text_parent_id_idx" ON "_pages_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_path_idx" ON "_pages_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_image_block_order_idx" ON "_pages_v_blocks_image_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_block_parent_id_idx" ON "_pages_v_blocks_image_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_block_path_idx" ON "_pages_v_blocks_image_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_image_block_image_idx" ON "_pages_v_blocks_image_block" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_shader_section_order_idx" ON "_pages_v_blocks_shader_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_shader_section_parent_id_idx" ON "_pages_v_blocks_shader_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_shader_section_path_idx" ON "_pages_v_blocks_shader_section" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_lottie_animation_order_idx" ON "_pages_v_blocks_lottie_animation" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lottie_animation_parent_id_idx" ON "_pages_v_blocks_lottie_animation" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_lottie_animation_path_idx" ON "_pages_v_blocks_lottie_animation" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_lottie_animation_animation_file_idx" ON "_pages_v_blocks_lottie_animation" USING btree ("animation_file_id");
  CREATE INDEX "_pages_v_blocks_video_order_idx" ON "_pages_v_blocks_video" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_video_parent_id_idx" ON "_pages_v_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_video_path_idx" ON "_pages_v_blocks_video" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_video_video_file_idx" ON "_pages_v_blocks_video" USING btree ("video_file_id");
  CREATE INDEX "_pages_v_blocks_video_poster_idx" ON "_pages_v_blocks_video" USING btree ("poster_id");
  CREATE INDEX "_pages_v_blocks_html_embed_order_idx" ON "_pages_v_blocks_html_embed" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_html_embed_parent_id_idx" ON "_pages_v_blocks_html_embed" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_html_embed_path_idx" ON "_pages_v_blocks_html_embed" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_order_idx" ON "_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_parent_id_idx" ON "_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_path_idx" ON "_pages_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_content_grid_items_order_idx" ON "_pages_v_blocks_content_grid_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_grid_items_parent_id_idx" ON "_pages_v_blocks_content_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_grid_items_image_idx" ON "_pages_v_blocks_content_grid_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_content_grid_order_idx" ON "_pages_v_blocks_content_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_grid_parent_id_idx" ON "_pages_v_blocks_content_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_grid_path_idx" ON "_pages_v_blocks_content_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_seo_version_seo_og_image_idx" ON "_pages_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "services_demo_window_demos_order_idx" ON "services_demo_window_demos" USING btree ("_order");
  CREATE INDEX "services_demo_window_demos_parent_id_idx" ON "services_demo_window_demos" USING btree ("_parent_id");
  CREATE INDEX "services_demo_window_demos_html_file_idx" ON "services_demo_window_demos" USING btree ("html_file_id");
  CREATE INDEX "services_page_content_breadcrumb_order_idx" ON "services_page_content_breadcrumb" USING btree ("_order");
  CREATE INDEX "services_page_content_breadcrumb_parent_id_idx" ON "services_page_content_breadcrumb" USING btree ("_parent_id");
  CREATE INDEX "services_page_content_hero_tabs_order_idx" ON "services_page_content_hero_tabs" USING btree ("_order");
  CREATE INDEX "services_page_content_hero_tabs_parent_id_idx" ON "services_page_content_hero_tabs" USING btree ("_parent_id");
  CREATE INDEX "subsvc_order_idx" ON "subsvc" USING btree ("_order");
  CREATE INDEX "subsvc_parent_id_idx" ON "subsvc" USING btree ("_parent_id");
  CREATE INDEX "services_page_content_capabilities_items_order_idx" ON "services_page_content_capabilities_items" USING btree ("_order");
  CREATE INDEX "services_page_content_capabilities_items_parent_id_idx" ON "services_page_content_capabilities_items" USING btree ("_parent_id");
  CREATE INDEX "services_page_content_capabilities_tools_cloud_order_idx" ON "services_page_content_capabilities_tools_cloud" USING btree ("_order");
  CREATE INDEX "services_page_content_capabilities_tools_cloud_parent_id_idx" ON "services_page_content_capabilities_tools_cloud" USING btree ("_parent_id");
  CREATE INDEX "services_page_content_capabilities_tools_cloud_icon_idx" ON "services_page_content_capabilities_tools_cloud" USING btree ("icon_id");
  CREATE INDEX "services_page_content_capabilities_tools_data_order_idx" ON "services_page_content_capabilities_tools_data" USING btree ("_order");
  CREATE INDEX "services_page_content_capabilities_tools_data_parent_id_idx" ON "services_page_content_capabilities_tools_data" USING btree ("_parent_id");
  CREATE INDEX "services_page_content_capabilities_tools_data_icon_idx" ON "services_page_content_capabilities_tools_data" USING btree ("icon_id");
  CREATE INDEX "services_page_content_outcomes_cards_order_idx" ON "services_page_content_outcomes_cards" USING btree ("_order");
  CREATE INDEX "services_page_content_outcomes_cards_parent_id_idx" ON "services_page_content_outcomes_cards" USING btree ("_parent_id");
  CREATE INDEX "services_page_content_outcomes_cards_image_idx" ON "services_page_content_outcomes_cards" USING btree ("image_id");
  CREATE INDEX "services_page_content_engagement_cards_order_idx" ON "services_page_content_engagement_cards" USING btree ("_order");
  CREATE INDEX "services_page_content_engagement_cards_parent_id_idx" ON "services_page_content_engagement_cards" USING btree ("_parent_id");
  CREATE INDEX "services_page_content_engagement_cards_image_idx" ON "services_page_content_engagement_cards" USING btree ("image_id");
  CREATE INDEX "services_page_content_related_services_order_idx" ON "services_page_content_related_services" USING btree ("_order");
  CREATE INDEX "services_page_content_related_services_parent_id_idx" ON "services_page_content_related_services" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_hero_order_idx" ON "services_blocks_hero" USING btree ("_order");
  CREATE INDEX "services_blocks_hero_parent_id_idx" ON "services_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_hero_path_idx" ON "services_blocks_hero" USING btree ("_path");
  CREATE INDEX "services_blocks_hero_background_image_idx" ON "services_blocks_hero" USING btree ("background_image_id");
  CREATE INDEX "services_blocks_rich_text_order_idx" ON "services_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "services_blocks_rich_text_parent_id_idx" ON "services_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_rich_text_path_idx" ON "services_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "services_blocks_image_block_order_idx" ON "services_blocks_image_block" USING btree ("_order");
  CREATE INDEX "services_blocks_image_block_parent_id_idx" ON "services_blocks_image_block" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_image_block_path_idx" ON "services_blocks_image_block" USING btree ("_path");
  CREATE INDEX "services_blocks_image_block_image_idx" ON "services_blocks_image_block" USING btree ("image_id");
  CREATE INDEX "services_blocks_shader_section_order_idx" ON "services_blocks_shader_section" USING btree ("_order");
  CREATE INDEX "services_blocks_shader_section_parent_id_idx" ON "services_blocks_shader_section" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_shader_section_path_idx" ON "services_blocks_shader_section" USING btree ("_path");
  CREATE INDEX "services_blocks_lottie_animation_order_idx" ON "services_blocks_lottie_animation" USING btree ("_order");
  CREATE INDEX "services_blocks_lottie_animation_parent_id_idx" ON "services_blocks_lottie_animation" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_lottie_animation_path_idx" ON "services_blocks_lottie_animation" USING btree ("_path");
  CREATE INDEX "services_blocks_lottie_animation_animation_file_idx" ON "services_blocks_lottie_animation" USING btree ("animation_file_id");
  CREATE INDEX "services_blocks_video_order_idx" ON "services_blocks_video" USING btree ("_order");
  CREATE INDEX "services_blocks_video_parent_id_idx" ON "services_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_video_path_idx" ON "services_blocks_video" USING btree ("_path");
  CREATE INDEX "services_blocks_video_video_file_idx" ON "services_blocks_video" USING btree ("video_file_id");
  CREATE INDEX "services_blocks_video_poster_idx" ON "services_blocks_video" USING btree ("poster_id");
  CREATE INDEX "services_blocks_html_embed_order_idx" ON "services_blocks_html_embed" USING btree ("_order");
  CREATE INDEX "services_blocks_html_embed_parent_id_idx" ON "services_blocks_html_embed" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_html_embed_path_idx" ON "services_blocks_html_embed" USING btree ("_path");
  CREATE INDEX "services_blocks_cta_order_idx" ON "services_blocks_cta" USING btree ("_order");
  CREATE INDEX "services_blocks_cta_parent_id_idx" ON "services_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_cta_path_idx" ON "services_blocks_cta" USING btree ("_path");
  CREATE INDEX "services_blocks_content_grid_items_order_idx" ON "services_blocks_content_grid_items" USING btree ("_order");
  CREATE INDEX "services_blocks_content_grid_items_parent_id_idx" ON "services_blocks_content_grid_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_content_grid_items_image_idx" ON "services_blocks_content_grid_items" USING btree ("image_id");
  CREATE INDEX "services_blocks_content_grid_order_idx" ON "services_blocks_content_grid" USING btree ("_order");
  CREATE INDEX "services_blocks_content_grid_parent_id_idx" ON "services_blocks_content_grid" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_content_grid_path_idx" ON "services_blocks_content_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_featured_image_idx" ON "services" USING btree ("featured_image_id");
  CREATE INDEX "services_demo_window_demo_window_fallback_file_idx" ON "services" USING btree ("demo_window_fallback_file_id");
  CREATE INDEX "services_page_content_hero_page_content_hero_image_idx" ON "services" USING btree ("page_content_hero_image_id");
  CREATE INDEX "services_page_content_expert_voice_page_content_expert_v_idx" ON "services" USING btree ("page_content_expert_voice_portrait_id");
  CREATE INDEX "services_seo_seo_og_image_idx" ON "services" USING btree ("seo_og_image_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "services__status_idx" ON "services" USING btree ("_status");
  CREATE INDEX "_services_v_version_demo_window_demos_order_idx" ON "_services_v_version_demo_window_demos" USING btree ("_order");
  CREATE INDEX "_services_v_version_demo_window_demos_parent_id_idx" ON "_services_v_version_demo_window_demos" USING btree ("_parent_id");
  CREATE INDEX "_services_v_version_demo_window_demos_html_file_idx" ON "_services_v_version_demo_window_demos" USING btree ("html_file_id");
  CREATE INDEX "_services_v_version_page_content_breadcrumb_order_idx" ON "_services_v_version_page_content_breadcrumb" USING btree ("_order");
  CREATE INDEX "_services_v_version_page_content_breadcrumb_parent_id_idx" ON "_services_v_version_page_content_breadcrumb" USING btree ("_parent_id");
  CREATE INDEX "_services_v_version_page_content_hero_tabs_order_idx" ON "_services_v_version_page_content_hero_tabs" USING btree ("_order");
  CREATE INDEX "_services_v_version_page_content_hero_tabs_parent_id_idx" ON "_services_v_version_page_content_hero_tabs" USING btree ("_parent_id");
  CREATE INDEX "_subsvc_v_order_idx" ON "_subsvc_v" USING btree ("_order");
  CREATE INDEX "_subsvc_v_parent_id_idx" ON "_subsvc_v" USING btree ("_parent_id");
  CREATE INDEX "_services_v_version_page_content_capabilities_items_order_idx" ON "_services_v_version_page_content_capabilities_items" USING btree ("_order");
  CREATE INDEX "_services_v_version_page_content_capabilities_items_parent_id_idx" ON "_services_v_version_page_content_capabilities_items" USING btree ("_parent_id");
  CREATE INDEX "_services_v_version_page_content_capabilities_tools_cloud_order_idx" ON "_services_v_version_page_content_capabilities_tools_cloud" USING btree ("_order");
  CREATE INDEX "_services_v_version_page_content_capabilities_tools_cloud_parent_id_idx" ON "_services_v_version_page_content_capabilities_tools_cloud" USING btree ("_parent_id");
  CREATE INDEX "_services_v_version_page_content_capabilities_tools_clou_idx" ON "_services_v_version_page_content_capabilities_tools_cloud" USING btree ("icon_id");
  CREATE INDEX "_services_v_version_page_content_capabilities_tools_data_order_idx" ON "_services_v_version_page_content_capabilities_tools_data" USING btree ("_order");
  CREATE INDEX "_services_v_version_page_content_capabilities_tools_data_parent_id_idx" ON "_services_v_version_page_content_capabilities_tools_data" USING btree ("_parent_id");
  CREATE INDEX "_services_v_version_page_content_capabilities_tools_data_idx" ON "_services_v_version_page_content_capabilities_tools_data" USING btree ("icon_id");
  CREATE INDEX "_services_v_version_page_content_outcomes_cards_order_idx" ON "_services_v_version_page_content_outcomes_cards" USING btree ("_order");
  CREATE INDEX "_services_v_version_page_content_outcomes_cards_parent_id_idx" ON "_services_v_version_page_content_outcomes_cards" USING btree ("_parent_id");
  CREATE INDEX "_services_v_version_page_content_outcomes_cards_image_idx" ON "_services_v_version_page_content_outcomes_cards" USING btree ("image_id");
  CREATE INDEX "_services_v_version_page_content_engagement_cards_order_idx" ON "_services_v_version_page_content_engagement_cards" USING btree ("_order");
  CREATE INDEX "_services_v_version_page_content_engagement_cards_parent_id_idx" ON "_services_v_version_page_content_engagement_cards" USING btree ("_parent_id");
  CREATE INDEX "_services_v_version_page_content_engagement_cards_image_idx" ON "_services_v_version_page_content_engagement_cards" USING btree ("image_id");
  CREATE INDEX "_services_v_version_page_content_related_services_order_idx" ON "_services_v_version_page_content_related_services" USING btree ("_order");
  CREATE INDEX "_services_v_version_page_content_related_services_parent_id_idx" ON "_services_v_version_page_content_related_services" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_hero_order_idx" ON "_services_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_hero_parent_id_idx" ON "_services_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_hero_path_idx" ON "_services_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_hero_background_image_idx" ON "_services_v_blocks_hero" USING btree ("background_image_id");
  CREATE INDEX "_services_v_blocks_rich_text_order_idx" ON "_services_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_rich_text_parent_id_idx" ON "_services_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_rich_text_path_idx" ON "_services_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_image_block_order_idx" ON "_services_v_blocks_image_block" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_image_block_parent_id_idx" ON "_services_v_blocks_image_block" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_image_block_path_idx" ON "_services_v_blocks_image_block" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_image_block_image_idx" ON "_services_v_blocks_image_block" USING btree ("image_id");
  CREATE INDEX "_services_v_blocks_shader_section_order_idx" ON "_services_v_blocks_shader_section" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_shader_section_parent_id_idx" ON "_services_v_blocks_shader_section" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_shader_section_path_idx" ON "_services_v_blocks_shader_section" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_lottie_animation_order_idx" ON "_services_v_blocks_lottie_animation" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_lottie_animation_parent_id_idx" ON "_services_v_blocks_lottie_animation" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_lottie_animation_path_idx" ON "_services_v_blocks_lottie_animation" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_lottie_animation_animation_file_idx" ON "_services_v_blocks_lottie_animation" USING btree ("animation_file_id");
  CREATE INDEX "_services_v_blocks_video_order_idx" ON "_services_v_blocks_video" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_video_parent_id_idx" ON "_services_v_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_video_path_idx" ON "_services_v_blocks_video" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_video_video_file_idx" ON "_services_v_blocks_video" USING btree ("video_file_id");
  CREATE INDEX "_services_v_blocks_video_poster_idx" ON "_services_v_blocks_video" USING btree ("poster_id");
  CREATE INDEX "_services_v_blocks_html_embed_order_idx" ON "_services_v_blocks_html_embed" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_html_embed_parent_id_idx" ON "_services_v_blocks_html_embed" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_html_embed_path_idx" ON "_services_v_blocks_html_embed" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_cta_order_idx" ON "_services_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_cta_parent_id_idx" ON "_services_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_cta_path_idx" ON "_services_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_content_grid_items_order_idx" ON "_services_v_blocks_content_grid_items" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_content_grid_items_parent_id_idx" ON "_services_v_blocks_content_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_content_grid_items_image_idx" ON "_services_v_blocks_content_grid_items" USING btree ("image_id");
  CREATE INDEX "_services_v_blocks_content_grid_order_idx" ON "_services_v_blocks_content_grid" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_content_grid_parent_id_idx" ON "_services_v_blocks_content_grid" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_content_grid_path_idx" ON "_services_v_blocks_content_grid" USING btree ("_path");
  CREATE INDEX "_services_v_parent_idx" ON "_services_v" USING btree ("parent_id");
  CREATE INDEX "_services_v_version_version_slug_idx" ON "_services_v" USING btree ("version_slug");
  CREATE INDEX "_services_v_version_version_featured_image_idx" ON "_services_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_services_v_version_demo_window_version_demo_window_fall_idx" ON "_services_v" USING btree ("version_demo_window_fallback_file_id");
  CREATE INDEX "_services_v_version_page_content_hero_version_page_conte_idx" ON "_services_v" USING btree ("version_page_content_hero_image_id");
  CREATE INDEX "_services_v_version_page_content_expert_voice_version_pa_idx" ON "_services_v" USING btree ("version_page_content_expert_voice_portrait_id");
  CREATE INDEX "_services_v_version_seo_version_seo_og_image_idx" ON "_services_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_services_v_version_version_updated_at_idx" ON "_services_v" USING btree ("version_updated_at");
  CREATE INDEX "_services_v_version_version_created_at_idx" ON "_services_v" USING btree ("version_created_at");
  CREATE INDEX "_services_v_version_version__status_idx" ON "_services_v" USING btree ("version__status");
  CREATE INDEX "_services_v_created_at_idx" ON "_services_v" USING btree ("created_at");
  CREATE INDEX "_services_v_updated_at_idx" ON "_services_v" USING btree ("updated_at");
  CREATE INDEX "_services_v_snapshot_idx" ON "_services_v" USING btree ("snapshot");
  CREATE INDEX "_services_v_published_locale_idx" ON "_services_v" USING btree ("published_locale");
  CREATE INDEX "_services_v_latest_idx" ON "_services_v" USING btree ("latest");
  CREATE INDEX "industries_page_content_breadcrumb_order_idx" ON "industries_page_content_breadcrumb" USING btree ("_order");
  CREATE INDEX "industries_page_content_breadcrumb_parent_id_idx" ON "industries_page_content_breadcrumb" USING btree ("_parent_id");
  CREATE INDEX "industries_page_content_hero_filters_order_idx" ON "industries_page_content_hero_filters" USING btree ("_order");
  CREATE INDEX "industries_page_content_hero_filters_parent_id_idx" ON "industries_page_content_hero_filters" USING btree ("_parent_id");
  CREATE INDEX "industries_page_content_capabilities_sidebar_order_idx" ON "industries_page_content_capabilities_sidebar" USING btree ("_order");
  CREATE INDEX "industries_page_content_capabilities_sidebar_parent_id_idx" ON "industries_page_content_capabilities_sidebar" USING btree ("_parent_id");
  CREATE INDEX "industries_page_content_capabilities_items_cards_order_idx" ON "industries_page_content_capabilities_items_cards" USING btree ("_order");
  CREATE INDEX "industries_page_content_capabilities_items_cards_parent_id_idx" ON "industries_page_content_capabilities_items_cards" USING btree ("_parent_id");
  CREATE INDEX "industries_page_content_capabilities_items_cards_image_idx" ON "industries_page_content_capabilities_items_cards" USING btree ("image_id");
  CREATE INDEX "industries_page_content_capabilities_items_order_idx" ON "industries_page_content_capabilities_items" USING btree ("_order");
  CREATE INDEX "industries_page_content_capabilities_items_parent_id_idx" ON "industries_page_content_capabilities_items" USING btree ("_parent_id");
  CREATE INDEX "industries_page_content_experts_people_order_idx" ON "industries_page_content_experts_people" USING btree ("_order");
  CREATE INDEX "industries_page_content_experts_people_parent_id_idx" ON "industries_page_content_experts_people" USING btree ("_parent_id");
  CREATE INDEX "industries_page_content_experts_people_photo_idx" ON "industries_page_content_experts_people" USING btree ("photo_id");
  CREATE INDEX "industries_page_content_related_industries_order_idx" ON "industries_page_content_related_industries" USING btree ("_order");
  CREATE INDEX "industries_page_content_related_industries_parent_id_idx" ON "industries_page_content_related_industries" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "industries_slug_idx" ON "industries" USING btree ("slug");
  CREATE INDEX "industries_page_content_hero_page_content_hero_image_idx" ON "industries" USING btree ("page_content_hero_image_id");
  CREATE INDEX "industries_page_content_client_voice_page_content_client_idx" ON "industries" USING btree ("page_content_client_voice_gallery_image_id");
  CREATE INDEX "industries_seo_seo_og_image_idx" ON "industries" USING btree ("seo_og_image_id");
  CREATE INDEX "industries_updated_at_idx" ON "industries" USING btree ("updated_at");
  CREATE INDEX "industries_created_at_idx" ON "industries" USING btree ("created_at");
  CREATE INDEX "industries__status_idx" ON "industries" USING btree ("_status");
  CREATE INDEX "_industries_v_version_page_content_breadcrumb_order_idx" ON "_industries_v_version_page_content_breadcrumb" USING btree ("_order");
  CREATE INDEX "_industries_v_version_page_content_breadcrumb_parent_id_idx" ON "_industries_v_version_page_content_breadcrumb" USING btree ("_parent_id");
  CREATE INDEX "_industries_v_version_page_content_hero_filters_order_idx" ON "_industries_v_version_page_content_hero_filters" USING btree ("_order");
  CREATE INDEX "_industries_v_version_page_content_hero_filters_parent_id_idx" ON "_industries_v_version_page_content_hero_filters" USING btree ("_parent_id");
  CREATE INDEX "_industries_v_version_page_content_capabilities_sidebar_order_idx" ON "_industries_v_version_page_content_capabilities_sidebar" USING btree ("_order");
  CREATE INDEX "_industries_v_version_page_content_capabilities_sidebar_parent_id_idx" ON "_industries_v_version_page_content_capabilities_sidebar" USING btree ("_parent_id");
  CREATE INDEX "_industries_v_version_page_content_capabilities_items_cards_order_idx" ON "_industries_v_version_page_content_capabilities_items_cards" USING btree ("_order");
  CREATE INDEX "_industries_v_version_page_content_capabilities_items_cards_parent_id_idx" ON "_industries_v_version_page_content_capabilities_items_cards" USING btree ("_parent_id");
  CREATE INDEX "_industries_v_version_page_content_capabilities_items_ca_idx" ON "_industries_v_version_page_content_capabilities_items_cards" USING btree ("image_id");
  CREATE INDEX "_industries_v_version_page_content_capabilities_items_order_idx" ON "_industries_v_version_page_content_capabilities_items" USING btree ("_order");
  CREATE INDEX "_industries_v_version_page_content_capabilities_items_parent_id_idx" ON "_industries_v_version_page_content_capabilities_items" USING btree ("_parent_id");
  CREATE INDEX "_industries_v_version_page_content_experts_people_order_idx" ON "_industries_v_version_page_content_experts_people" USING btree ("_order");
  CREATE INDEX "_industries_v_version_page_content_experts_people_parent_id_idx" ON "_industries_v_version_page_content_experts_people" USING btree ("_parent_id");
  CREATE INDEX "_industries_v_version_page_content_experts_people_photo_idx" ON "_industries_v_version_page_content_experts_people" USING btree ("photo_id");
  CREATE INDEX "_industries_v_version_page_content_related_industries_order_idx" ON "_industries_v_version_page_content_related_industries" USING btree ("_order");
  CREATE INDEX "_industries_v_version_page_content_related_industries_parent_id_idx" ON "_industries_v_version_page_content_related_industries" USING btree ("_parent_id");
  CREATE INDEX "_industries_v_parent_idx" ON "_industries_v" USING btree ("parent_id");
  CREATE INDEX "_industries_v_version_version_slug_idx" ON "_industries_v" USING btree ("version_slug");
  CREATE INDEX "_industries_v_version_page_content_hero_version_page_con_idx" ON "_industries_v" USING btree ("version_page_content_hero_image_id");
  CREATE INDEX "_industries_v_version_page_content_client_voice_version__idx" ON "_industries_v" USING btree ("version_page_content_client_voice_gallery_image_id");
  CREATE INDEX "_industries_v_version_seo_version_seo_og_image_idx" ON "_industries_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_industries_v_version_version_updated_at_idx" ON "_industries_v" USING btree ("version_updated_at");
  CREATE INDEX "_industries_v_version_version_created_at_idx" ON "_industries_v" USING btree ("version_created_at");
  CREATE INDEX "_industries_v_version_version__status_idx" ON "_industries_v" USING btree ("version__status");
  CREATE INDEX "_industries_v_created_at_idx" ON "_industries_v" USING btree ("created_at");
  CREATE INDEX "_industries_v_updated_at_idx" ON "_industries_v" USING btree ("updated_at");
  CREATE INDEX "_industries_v_snapshot_idx" ON "_industries_v" USING btree ("snapshot");
  CREATE INDEX "_industries_v_published_locale_idx" ON "_industries_v" USING btree ("published_locale");
  CREATE INDEX "_industries_v_latest_idx" ON "_industries_v" USING btree ("latest");
  CREATE INDEX "tenders_documents_order_idx" ON "tenders_documents" USING btree ("_order");
  CREATE INDEX "tenders_documents_parent_id_idx" ON "tenders_documents" USING btree ("_parent_id");
  CREATE INDEX "tenders_documents_file_idx" ON "tenders_documents" USING btree ("file_id");
  CREATE INDEX "tenders_corrigenda_order_idx" ON "tenders_corrigenda" USING btree ("_order");
  CREATE INDEX "tenders_corrigenda_parent_id_idx" ON "tenders_corrigenda" USING btree ("_parent_id");
  CREATE INDEX "tenders_corrigenda_file_idx" ON "tenders_corrigenda" USING btree ("file_id");
  CREATE UNIQUE INDEX "tenders_reference_no_idx" ON "tenders" USING btree ("reference_no");
  CREATE INDEX "tenders_updated_at_idx" ON "tenders" USING btree ("updated_at");
  CREATE INDEX "tenders_created_at_idx" ON "tenders" USING btree ("created_at");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_cover_image_idx" ON "posts" USING btree ("cover_image_id");
  CREATE INDEX "posts_seo_seo_og_image_idx" ON "posts" USING btree ("seo_og_image_id");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_cover_image_idx" ON "_posts_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_posts_v_version_seo_version_seo_og_image_idx" ON "_posts_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_snapshot_idx" ON "_posts_v" USING btree ("snapshot");
  CREATE INDEX "_posts_v_published_locale_idx" ON "_posts_v" USING btree ("published_locale");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "careers_sections_order_idx" ON "careers_sections" USING btree ("_order");
  CREATE INDEX "careers_sections_parent_id_idx" ON "careers_sections" USING btree ("_parent_id");
  CREATE INDEX "careers_documents_order_idx" ON "careers_documents" USING btree ("_order");
  CREATE INDEX "careers_documents_parent_id_idx" ON "careers_documents" USING btree ("_parent_id");
  CREATE INDEX "careers_documents_file_idx" ON "careers_documents" USING btree ("file_id");
  CREATE UNIQUE INDEX "careers_slug_idx" ON "careers" USING btree ("slug");
  CREATE INDEX "careers_updated_at_idx" ON "careers" USING btree ("updated_at");
  CREATE INDEX "careers_created_at_idx" ON "careers" USING btree ("created_at");
  CREATE UNIQUE INDEX "team_members_slug_idx" ON "team_members" USING btree ("slug");
  CREATE INDEX "team_members_photo_idx" ON "team_members" USING btree ("photo_id");
  CREATE INDEX "team_members_updated_at_idx" ON "team_members" USING btree ("updated_at");
  CREATE INDEX "team_members_created_at_idx" ON "team_members" USING btree ("created_at");
  CREATE INDEX "engagements_services_order_idx" ON "engagements_services" USING btree ("order");
  CREATE INDEX "engagements_services_parent_idx" ON "engagements_services" USING btree ("parent_id");
  CREATE INDEX "engagements_stat_chart_order_idx" ON "engagements_stat_chart" USING btree ("_order");
  CREATE INDEX "engagements_stat_chart_parent_id_idx" ON "engagements_stat_chart" USING btree ("_parent_id");
  CREATE INDEX "engagements_blocks_engagement_media_order_idx" ON "engagements_blocks_engagement_media" USING btree ("_order");
  CREATE INDEX "engagements_blocks_engagement_media_parent_id_idx" ON "engagements_blocks_engagement_media" USING btree ("_parent_id");
  CREATE INDEX "engagements_blocks_engagement_media_path_idx" ON "engagements_blocks_engagement_media" USING btree ("_path");
  CREATE INDEX "engagements_blocks_engagement_media_image_idx" ON "engagements_blocks_engagement_media" USING btree ("image_id");
  CREATE INDEX "engagements_blocks_engagement_media_video_idx" ON "engagements_blocks_engagement_media" USING btree ("video_id");
  CREATE INDEX "engagements_blocks_engagement_quote_order_idx" ON "engagements_blocks_engagement_quote" USING btree ("_order");
  CREATE INDEX "engagements_blocks_engagement_quote_parent_id_idx" ON "engagements_blocks_engagement_quote" USING btree ("_parent_id");
  CREATE INDEX "engagements_blocks_engagement_quote_path_idx" ON "engagements_blocks_engagement_quote" USING btree ("_path");
  CREATE INDEX "engagements_blocks_engagement_quote_image_idx" ON "engagements_blocks_engagement_quote" USING btree ("image_id");
  CREATE INDEX "engagements_blocks_engagement_media_grid_rows_order_idx" ON "engagements_blocks_engagement_media_grid_rows" USING btree ("_order");
  CREATE INDEX "engagements_blocks_engagement_media_grid_rows_parent_id_idx" ON "engagements_blocks_engagement_media_grid_rows" USING btree ("_parent_id");
  CREATE INDEX "engagements_blocks_engagement_media_grid_order_idx" ON "engagements_blocks_engagement_media_grid" USING btree ("_order");
  CREATE INDEX "engagements_blocks_engagement_media_grid_parent_id_idx" ON "engagements_blocks_engagement_media_grid" USING btree ("_parent_id");
  CREATE INDEX "engagements_blocks_engagement_media_grid_path_idx" ON "engagements_blocks_engagement_media_grid" USING btree ("_path");
  CREATE INDEX "engagements_blocks_engagement_text_order_idx" ON "engagements_blocks_engagement_text" USING btree ("_order");
  CREATE INDEX "engagements_blocks_engagement_text_parent_id_idx" ON "engagements_blocks_engagement_text" USING btree ("_parent_id");
  CREATE INDEX "engagements_blocks_engagement_text_path_idx" ON "engagements_blocks_engagement_text" USING btree ("_path");
  CREATE INDEX "engagements_blocks_engagement_showcase_order_idx" ON "engagements_blocks_engagement_showcase" USING btree ("_order");
  CREATE INDEX "engagements_blocks_engagement_showcase_parent_id_idx" ON "engagements_blocks_engagement_showcase" USING btree ("_parent_id");
  CREATE INDEX "engagements_blocks_engagement_showcase_path_idx" ON "engagements_blocks_engagement_showcase" USING btree ("_path");
  CREATE INDEX "engagements_blocks_engagement_showcase_image_idx" ON "engagements_blocks_engagement_showcase" USING btree ("image_id");
  CREATE INDEX "engagements_blocks_engagement_outcome_items_order_idx" ON "engagements_blocks_engagement_outcome_items" USING btree ("_order");
  CREATE INDEX "engagements_blocks_engagement_outcome_items_parent_id_idx" ON "engagements_blocks_engagement_outcome_items" USING btree ("_parent_id");
  CREATE INDEX "engagements_blocks_engagement_outcome_order_idx" ON "engagements_blocks_engagement_outcome" USING btree ("_order");
  CREATE INDEX "engagements_blocks_engagement_outcome_parent_id_idx" ON "engagements_blocks_engagement_outcome" USING btree ("_parent_id");
  CREATE INDEX "engagements_blocks_engagement_outcome_path_idx" ON "engagements_blocks_engagement_outcome" USING btree ("_path");
  CREATE INDEX "engagements_blocks_engagement_team_rows_order_idx" ON "engagements_blocks_engagement_team_rows" USING btree ("_order");
  CREATE INDEX "engagements_blocks_engagement_team_rows_parent_id_idx" ON "engagements_blocks_engagement_team_rows" USING btree ("_parent_id");
  CREATE INDEX "engagements_blocks_engagement_team_order_idx" ON "engagements_blocks_engagement_team" USING btree ("_order");
  CREATE INDEX "engagements_blocks_engagement_team_parent_id_idx" ON "engagements_blocks_engagement_team" USING btree ("_parent_id");
  CREATE INDEX "engagements_blocks_engagement_team_path_idx" ON "engagements_blocks_engagement_team" USING btree ("_path");
  CREATE INDEX "engagements_blocks_engagement_learnings_items_order_idx" ON "engagements_blocks_engagement_learnings_items" USING btree ("_order");
  CREATE INDEX "engagements_blocks_engagement_learnings_items_parent_id_idx" ON "engagements_blocks_engagement_learnings_items" USING btree ("_parent_id");
  CREATE INDEX "engagements_blocks_engagement_learnings_order_idx" ON "engagements_blocks_engagement_learnings" USING btree ("_order");
  CREATE INDEX "engagements_blocks_engagement_learnings_parent_id_idx" ON "engagements_blocks_engagement_learnings" USING btree ("_parent_id");
  CREATE INDEX "engagements_blocks_engagement_learnings_path_idx" ON "engagements_blocks_engagement_learnings" USING btree ("_path");
  CREATE UNIQUE INDEX "engagements_slug_idx" ON "engagements" USING btree ("slug");
  CREATE INDEX "engagements_card_image_idx" ON "engagements" USING btree ("card_image_id");
  CREATE INDEX "engagements_updated_at_idx" ON "engagements" USING btree ("updated_at");
  CREATE INDEX "engagements_created_at_idx" ON "engagements" USING btree ("created_at");
  CREATE INDEX "engagements_rels_order_idx" ON "engagements_rels" USING btree ("order");
  CREATE INDEX "engagements_rels_parent_idx" ON "engagements_rels" USING btree ("parent_id");
  CREATE INDEX "engagements_rels_path_idx" ON "engagements_rels" USING btree ("path");
  CREATE INDEX "engagements_rels_media_id_idx" ON "engagements_rels" USING btree ("media_id");
  CREATE INDEX "engagements_rels_engagements_id_idx" ON "engagements_rels" USING btree ("engagements_id");
  CREATE INDEX "enquiries_updated_at_idx" ON "enquiries" USING btree ("updated_at");
  CREATE INDEX "enquiries_created_at_idx" ON "enquiries" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_industries_id_idx" ON "payload_locked_documents_rels" USING btree ("industries_id");
  CREATE INDEX "payload_locked_documents_rels_tenders_id_idx" ON "payload_locked_documents_rels" USING btree ("tenders_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_careers_id_idx" ON "payload_locked_documents_rels" USING btree ("careers_id");
  CREATE INDEX "payload_locked_documents_rels_team_members_id_idx" ON "payload_locked_documents_rels" USING btree ("team_members_id");
  CREATE INDEX "payload_locked_documents_rels_engagements_id_idx" ON "payload_locked_documents_rels" USING btree ("engagements_id");
  CREATE INDEX "payload_locked_documents_rels_enquiries_id_idx" ON "payload_locked_documents_rels" USING btree ("enquiries_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_header_nav_order_idx" ON "site_settings_header_nav" USING btree ("_order");
  CREATE INDEX "site_settings_header_nav_parent_id_idx" ON "site_settings_header_nav" USING btree ("_parent_id");
  CREATE INDEX "site_settings_footer_links_order_idx" ON "site_settings_footer_links" USING btree ("_order");
  CREATE INDEX "site_settings_footer_links_parent_id_idx" ON "site_settings_footer_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_social_links_order_idx" ON "site_settings_social_links" USING btree ("_order");
  CREATE INDEX "site_settings_social_links_parent_id_idx" ON "site_settings_social_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_default_seo_default_seo_og_image_idx" ON "site_settings" USING btree ("default_seo_og_image_id");
  CREATE INDEX "marketing_content_home_client_logos_order_idx" ON "marketing_content_home_client_logos" USING btree ("_order");
  CREATE INDEX "marketing_content_home_client_logos_parent_id_idx" ON "marketing_content_home_client_logos" USING btree ("_parent_id");
  CREATE INDEX "marketing_content_home_client_logos_logo_idx" ON "marketing_content_home_client_logos" USING btree ("logo_id");
  CREATE INDEX "marketing_content_about_story_paragraphs_order_idx" ON "marketing_content_about_story_paragraphs" USING btree ("_order");
  CREATE INDEX "marketing_content_about_story_paragraphs_parent_id_idx" ON "marketing_content_about_story_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "marketing_content_about_values_items_order_idx" ON "marketing_content_about_values_items" USING btree ("_order");
  CREATE INDEX "marketing_content_about_values_items_parent_id_idx" ON "marketing_content_about_values_items" USING btree ("_parent_id");
  CREATE INDEX "marketing_content_about_clients_logos_order_idx" ON "marketing_content_about_clients_logos" USING btree ("_order");
  CREATE INDEX "marketing_content_about_clients_logos_parent_id_idx" ON "marketing_content_about_clients_logos" USING btree ("_parent_id");
  CREATE INDEX "marketing_content_about_clients_logos_logo_idx" ON "marketing_content_about_clients_logos" USING btree ("logo_id");
  CREATE INDEX "marketing_content_contact_locations_items_order_idx" ON "marketing_content_contact_locations_items" USING btree ("_order");
  CREATE INDEX "marketing_content_contact_locations_items_parent_id_idx" ON "marketing_content_contact_locations_items" USING btree ("_parent_id");
  CREATE INDEX "marketing_content_careers_culture_highlights_order_idx" ON "marketing_content_careers_culture_highlights" USING btree ("_order");
  CREATE INDEX "marketing_content_careers_culture_highlights_parent_id_idx" ON "marketing_content_careers_culture_highlights" USING btree ("_parent_id");
  CREATE INDEX "marketing_content_footer_services_order_idx" ON "marketing_content_footer_services" USING btree ("_order");
  CREATE INDEX "marketing_content_footer_services_parent_id_idx" ON "marketing_content_footer_services" USING btree ("_parent_id");
  CREATE INDEX "marketing_content_footer_industries_order_idx" ON "marketing_content_footer_industries" USING btree ("_order");
  CREATE INDEX "marketing_content_footer_industries_parent_id_idx" ON "marketing_content_footer_industries" USING btree ("_parent_id");
  CREATE INDEX "marketing_content_home_home_hero_image_idx" ON "marketing_content" USING btree ("home_hero_image_id");
  CREATE INDEX "marketing_content_home_home_hero_video_idx" ON "marketing_content" USING btree ("home_hero_video_id");
  CREATE INDEX "marketing_content_about_hero_about_hero_image_idx" ON "marketing_content" USING btree ("about_hero_image_id");
  CREATE INDEX "marketing_content_about_story_about_story_image_idx" ON "marketing_content" USING btree ("about_story_image_id");
  CREATE INDEX "marketing_content_contact_details_contact_details_office_idx" ON "marketing_content" USING btree ("contact_details_office_image_id");
  CREATE INDEX "marketing_content_careers_hero_careers_hero_image_idx" ON "marketing_content" USING btree ("careers_hero_image_id");
  CREATE INDEX "marketing_content_careers_culture_careers_culture_image_idx" ON "marketing_content" USING btree ("careers_culture_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_rich_text" CASCADE;
  DROP TABLE "pages_blocks_image_block" CASCADE;
  DROP TABLE "pages_blocks_shader_section" CASCADE;
  DROP TABLE "pages_blocks_lottie_animation" CASCADE;
  DROP TABLE "pages_blocks_video" CASCADE;
  DROP TABLE "pages_blocks_html_embed" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages_blocks_content_grid_items" CASCADE;
  DROP TABLE "pages_blocks_content_grid" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text" CASCADE;
  DROP TABLE "_pages_v_blocks_image_block" CASCADE;
  DROP TABLE "_pages_v_blocks_shader_section" CASCADE;
  DROP TABLE "_pages_v_blocks_lottie_animation" CASCADE;
  DROP TABLE "_pages_v_blocks_video" CASCADE;
  DROP TABLE "_pages_v_blocks_html_embed" CASCADE;
  DROP TABLE "_pages_v_blocks_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_content_grid_items" CASCADE;
  DROP TABLE "_pages_v_blocks_content_grid" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "services_demo_window_demos" CASCADE;
  DROP TABLE "services_page_content_breadcrumb" CASCADE;
  DROP TABLE "services_page_content_hero_tabs" CASCADE;
  DROP TABLE "subsvc" CASCADE;
  DROP TABLE "services_page_content_capabilities_items" CASCADE;
  DROP TABLE "services_page_content_capabilities_tools_cloud" CASCADE;
  DROP TABLE "services_page_content_capabilities_tools_data" CASCADE;
  DROP TABLE "services_page_content_outcomes_cards" CASCADE;
  DROP TABLE "services_page_content_engagement_cards" CASCADE;
  DROP TABLE "services_page_content_related_services" CASCADE;
  DROP TABLE "services_blocks_hero" CASCADE;
  DROP TABLE "services_blocks_rich_text" CASCADE;
  DROP TABLE "services_blocks_image_block" CASCADE;
  DROP TABLE "services_blocks_shader_section" CASCADE;
  DROP TABLE "services_blocks_lottie_animation" CASCADE;
  DROP TABLE "services_blocks_video" CASCADE;
  DROP TABLE "services_blocks_html_embed" CASCADE;
  DROP TABLE "services_blocks_cta" CASCADE;
  DROP TABLE "services_blocks_content_grid_items" CASCADE;
  DROP TABLE "services_blocks_content_grid" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "_services_v_version_demo_window_demos" CASCADE;
  DROP TABLE "_services_v_version_page_content_breadcrumb" CASCADE;
  DROP TABLE "_services_v_version_page_content_hero_tabs" CASCADE;
  DROP TABLE "_subsvc_v" CASCADE;
  DROP TABLE "_services_v_version_page_content_capabilities_items" CASCADE;
  DROP TABLE "_services_v_version_page_content_capabilities_tools_cloud" CASCADE;
  DROP TABLE "_services_v_version_page_content_capabilities_tools_data" CASCADE;
  DROP TABLE "_services_v_version_page_content_outcomes_cards" CASCADE;
  DROP TABLE "_services_v_version_page_content_engagement_cards" CASCADE;
  DROP TABLE "_services_v_version_page_content_related_services" CASCADE;
  DROP TABLE "_services_v_blocks_hero" CASCADE;
  DROP TABLE "_services_v_blocks_rich_text" CASCADE;
  DROP TABLE "_services_v_blocks_image_block" CASCADE;
  DROP TABLE "_services_v_blocks_shader_section" CASCADE;
  DROP TABLE "_services_v_blocks_lottie_animation" CASCADE;
  DROP TABLE "_services_v_blocks_video" CASCADE;
  DROP TABLE "_services_v_blocks_html_embed" CASCADE;
  DROP TABLE "_services_v_blocks_cta" CASCADE;
  DROP TABLE "_services_v_blocks_content_grid_items" CASCADE;
  DROP TABLE "_services_v_blocks_content_grid" CASCADE;
  DROP TABLE "_services_v" CASCADE;
  DROP TABLE "industries_page_content_breadcrumb" CASCADE;
  DROP TABLE "industries_page_content_hero_filters" CASCADE;
  DROP TABLE "industries_page_content_capabilities_sidebar" CASCADE;
  DROP TABLE "industries_page_content_capabilities_items_cards" CASCADE;
  DROP TABLE "industries_page_content_capabilities_items" CASCADE;
  DROP TABLE "industries_page_content_experts_people" CASCADE;
  DROP TABLE "industries_page_content_related_industries" CASCADE;
  DROP TABLE "industries" CASCADE;
  DROP TABLE "_industries_v_version_page_content_breadcrumb" CASCADE;
  DROP TABLE "_industries_v_version_page_content_hero_filters" CASCADE;
  DROP TABLE "_industries_v_version_page_content_capabilities_sidebar" CASCADE;
  DROP TABLE "_industries_v_version_page_content_capabilities_items_cards" CASCADE;
  DROP TABLE "_industries_v_version_page_content_capabilities_items" CASCADE;
  DROP TABLE "_industries_v_version_page_content_experts_people" CASCADE;
  DROP TABLE "_industries_v_version_page_content_related_industries" CASCADE;
  DROP TABLE "_industries_v" CASCADE;
  DROP TABLE "tenders_documents" CASCADE;
  DROP TABLE "tenders_corrigenda" CASCADE;
  DROP TABLE "tenders" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "careers_sections" CASCADE;
  DROP TABLE "careers_documents" CASCADE;
  DROP TABLE "careers" CASCADE;
  DROP TABLE "team_members" CASCADE;
  DROP TABLE "engagements_services" CASCADE;
  DROP TABLE "engagements_stat_chart" CASCADE;
  DROP TABLE "engagements_blocks_engagement_media" CASCADE;
  DROP TABLE "engagements_blocks_engagement_quote" CASCADE;
  DROP TABLE "engagements_blocks_engagement_media_grid_rows" CASCADE;
  DROP TABLE "engagements_blocks_engagement_media_grid" CASCADE;
  DROP TABLE "engagements_blocks_engagement_text" CASCADE;
  DROP TABLE "engagements_blocks_engagement_showcase" CASCADE;
  DROP TABLE "engagements_blocks_engagement_outcome_items" CASCADE;
  DROP TABLE "engagements_blocks_engagement_outcome" CASCADE;
  DROP TABLE "engagements_blocks_engagement_team_rows" CASCADE;
  DROP TABLE "engagements_blocks_engagement_team" CASCADE;
  DROP TABLE "engagements_blocks_engagement_learnings_items" CASCADE;
  DROP TABLE "engagements_blocks_engagement_learnings" CASCADE;
  DROP TABLE "engagements" CASCADE;
  DROP TABLE "engagements_rels" CASCADE;
  DROP TABLE "enquiries" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings_header_nav" CASCADE;
  DROP TABLE "site_settings_footer_links" CASCADE;
  DROP TABLE "site_settings_social_links" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "marketing_content_home_client_logos" CASCADE;
  DROP TABLE "marketing_content_about_story_paragraphs" CASCADE;
  DROP TABLE "marketing_content_about_values_items" CASCADE;
  DROP TABLE "marketing_content_about_clients_logos" CASCADE;
  DROP TABLE "marketing_content_contact_locations_items" CASCADE;
  DROP TABLE "marketing_content_careers_culture_highlights" CASCADE;
  DROP TABLE "marketing_content_footer_services" CASCADE;
  DROP TABLE "marketing_content_footer_industries" CASCADE;
  DROP TABLE "marketing_content" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_media_media_type";
  DROP TYPE "public"."enum_pages_blocks_hero_variant";
  DROP TYPE "public"."enum_pages_blocks_hero_reveal_speed";
  DROP TYPE "public"."enum_pages_blocks_shader_section_variant";
  DROP TYPE "public"."enum_pages_blocks_shader_section_placement";
  DROP TYPE "public"."enum_pages_blocks_cta_variant";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_hero_variant";
  DROP TYPE "public"."enum__pages_v_blocks_hero_reveal_speed";
  DROP TYPE "public"."enum__pages_v_blocks_shader_section_variant";
  DROP TYPE "public"."enum__pages_v_blocks_shader_section_placement";
  DROP TYPE "public"."enum__pages_v_blocks_cta_variant";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum__pages_v_published_locale";
  DROP TYPE "public"."enum_services_demo_window_demos_content_type";
  DROP TYPE "public"."enum_services_page_content_engagement_cards_variant";
  DROP TYPE "public"."enum_services_blocks_hero_variant";
  DROP TYPE "public"."enum_services_blocks_hero_reveal_speed";
  DROP TYPE "public"."enum_services_blocks_shader_section_variant";
  DROP TYPE "public"."enum_services_blocks_shader_section_placement";
  DROP TYPE "public"."enum_services_blocks_cta_variant";
  DROP TYPE "public"."enum_services_variant";
  DROP TYPE "public"."enum_services_status";
  DROP TYPE "public"."enum__services_v_version_demo_window_demos_content_type";
  DROP TYPE "public"."enum__services_v_version_page_content_engagement_cards_variant";
  DROP TYPE "public"."enum__services_v_blocks_hero_variant";
  DROP TYPE "public"."enum__services_v_blocks_hero_reveal_speed";
  DROP TYPE "public"."enum__services_v_blocks_shader_section_variant";
  DROP TYPE "public"."enum__services_v_blocks_shader_section_placement";
  DROP TYPE "public"."enum__services_v_blocks_cta_variant";
  DROP TYPE "public"."enum__services_v_version_variant";
  DROP TYPE "public"."enum__services_v_version_status";
  DROP TYPE "public"."enum__services_v_published_locale";
  DROP TYPE "public"."enum_industries_cap_card_variant";
  DROP TYPE "public"."enum_industries_status";
  DROP TYPE "public"."enum__industries_v_version_status";
  DROP TYPE "public"."enum__industries_v_published_locale";
  DROP TYPE "public"."enum_tenders_status";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum__posts_v_published_locale";
  DROP TYPE "public"."enum_careers_status";
  DROP TYPE "public"."enum_team_members_department";
  DROP TYPE "public"."enum_engagements_services";
  DROP TYPE "public"."enum_engagements_blocks_engagement_showcase_display";
  DROP TYPE "public"."enum_engagements_status";
  DROP TYPE "public"."enum_engagements_engagement_type";
  DROP TYPE "public"."enum_engagements_template";
  DROP TYPE "public"."enum_engagements_industry";
  DROP TYPE "public"."enum_site_settings_header_nav_variant";
  DROP TYPE "public"."enum_site_settings_social_links_platform";`)
}
