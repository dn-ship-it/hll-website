import Image from "next/image";
import Link from "next/link";

import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

import {
  BottomShader,
  GradientRevealText,
  HLLButton,
  Shader,
  type HLLVariant,
} from "@/components/hll";
import type { Page } from "@/payload-types";
import { resolveMediaUrl } from "@/lib/payload/media";

type LayoutBlock = NonNullable<Page["layout"]>[number];

function asVariant(value?: string | null): HLLVariant {
  const allowed: HLLVariant[] = [
    "services",
    "industries",
    "engagement",
    "about",
    "contact",
    "hll-ai",
    "hll-trust",
    "hll-foundation",
    "hll-ontology",
    "hll-people",
    "hll-application",
  ];
  return allowed.includes(value as HLLVariant) ? (value as HLLVariant) : "services";
}

function HeroBlock({ block }: { block: Extract<LayoutBlock, { blockType: "hero" }> }) {
  const bgUrl = resolveMediaUrl(block.backgroundImage);
  const variant = asVariant(block.variant);

  return (
    <section className="relative overflow-hidden border-b border-white/10 py-24 md:py-32">
      {bgUrl ? (
        <Image
          src={bgUrl}
          alt=""
          fill
          className="object-cover opacity-30"
          unoptimized
          priority
        />
      ) : (
        <BottomShader variant={variant} contained passthrough overlay />
      )}
      <div className="relative mx-auto max-w-5xl px-6">
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/50">
          {block.variant?.replace(/-/g, " ")}
        </p>
        <GradientRevealText
          as="h1"
          text={block.heading}
          variant={variant}
          speed={block.revealSpeed === "normal" ? "normal" : "slow"}
          ink="#f5f5f5"
        />
        {block.subheading ? (
          <p className="mt-6 max-w-2xl text-lg text-white/70">{block.subheading}</p>
        ) : null}
      </div>
    </section>
  );
}

function RichTextBlock({
  block,
}: {
  block: Extract<LayoutBlock, { blockType: "richText" }>;
}) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <div className="prose prose-invert max-w-none prose-headings:font-semibold prose-p:text-white/75">
        <RichText data={block.content as SerializedEditorState} />
      </div>
    </section>
  );
}

function ImageBlockBlock({
  block,
}: {
  block: Extract<LayoutBlock, { blockType: "imageBlock" }>;
}) {
  const src = resolveMediaUrl(block.image);
  if (!src) return null;

  return (
    <figure
      className={`mx-auto px-6 py-10 ${block.fullWidth ? "max-w-none" : "max-w-5xl"}`}
    >
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-white/10">
        <Image src={src} alt={block.caption ?? ""} fill className="object-cover" unoptimized />
      </div>
      {block.caption ? (
        <figcaption className="mt-3 text-center text-sm text-white/50">{block.caption}</figcaption>
      ) : null}
    </figure>
  );
}

function ShaderSectionBlock({
  block,
}: {
  block: Extract<LayoutBlock, { blockType: "shaderSection" }>;
}) {
  const variant = asVariant(block.variant);
  const placement = block.placement === "bottom" ? "bottom" : "full";
  // The block's 0-100 intensity has no counterpart in the real engine, whose
  // look is fixed by its preset, so it drives the host's opacity instead.
  const opacity = Math.max(0, Math.min(100, block.intensity ?? 100)) / 100;

  if (placement === "bottom") {
    return (
      <div className="relative h-48 overflow-hidden border-y border-white/10">
        <BottomShader variant={variant} contained passthrough style={{ opacity }} />
      </div>
    );
  }

  return (
    <div className="relative h-[50vh] overflow-hidden border-y border-white/10">
      <Shader variant={variant} contained passthrough style={{ opacity }} />
    </div>
  );
}

function LottieBlock({
  block,
}: {
  block: Extract<LayoutBlock, { blockType: "lottieAnimation" }>;
}) {
  const src = resolveMediaUrl(block.animationFile);

  return (
    <section className="mx-auto max-w-3xl px-6 py-12 text-center">
      {block.label ? (
        <p className="mb-4 text-sm uppercase tracking-widest text-white/50">{block.label}</p>
      ) : null}
      <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-12">
        <p className="text-white/70">Lottie animation</p>
        {src ? <p className="mt-2 text-xs text-white/40">{src}</p> : null}
      </div>
    </section>
  );
}

function VideoBlock({ block }: { block: Extract<LayoutBlock, { blockType: "video" }> }) {
  const src = resolveMediaUrl(block.videoFile);
  const poster = resolveMediaUrl(block.poster);
  if (!src) return null;

  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <video
        className="w-full rounded-2xl border border-white/10"
        controls={!block.autoplay}
        autoPlay={Boolean(block.autoplay)}
        muted={Boolean(block.muted)}
        playsInline
        poster={poster ?? undefined}
      >
        <source src={src} />
      </video>
    </section>
  );
}

function HtmlEmbedBlock({
  block,
}: {
  block: Extract<LayoutBlock, { blockType: "htmlEmbed" }>;
}) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <div
        className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6 text-sm text-amber-100/80"
        dangerouslySetInnerHTML={{ __html: block.html }}
      />
    </section>
  );
}

function CtaBlock({ block }: { block: Extract<LayoutBlock, { blockType: "cta" }> }) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16 text-center">
      <HLLButton href={block.href} variant={asVariant(block.variant)} size="lg">
        {block.label}
      </HLLButton>
    </section>
  );
}

function ContentGridBlock({
  block,
}: {
  block: Extract<LayoutBlock, { blockType: "contentGrid" }>;
}) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      {block.heading ? (
        <h2 className="mb-10 text-3xl font-semibold text-white">{block.heading}</h2>
      ) : null}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {block.items?.map((item, index) => {
          const imageUrl = resolveMediaUrl(item.image);
          const inner = (
            <article className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/20">
              {imageUrl ? (
                <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-xl">
                  <Image src={imageUrl} alt="" fill className="object-cover" unoptimized />
                </div>
              ) : null}
              <h3 className="text-lg font-medium text-white">{item.title}</h3>
              {item.description ? (
                <p className="mt-2 text-sm text-white/60">{item.description}</p>
              ) : null}
            </article>
          );

          return item.href ? (
            <Link key={item.id ?? index} href={item.href}>
              {inner}
            </Link>
          ) : (
            <div key={item.id ?? index}>{inner}</div>
          );
        })}
      </div>
    </section>
  );
}

function Block({ block }: { block: LayoutBlock }) {
  switch (block.blockType) {
    case "hero":
      return <HeroBlock block={block} />;
    case "richText":
      return <RichTextBlock block={block} />;
    case "imageBlock":
      return <ImageBlockBlock block={block} />;
    case "shaderSection":
      return <ShaderSectionBlock block={block} />;
    case "lottieAnimation":
      return <LottieBlock block={block} />;
    case "video":
      return <VideoBlock block={block} />;
    case "htmlEmbed":
      return <HtmlEmbedBlock block={block} />;
    case "cta":
      return <CtaBlock block={block} />;
    case "contentGrid":
      return <ContentGridBlock block={block} />;
    default:
      return null;
  }
}

export function BlockRenderer({ blocks }: { blocks: Page["layout"] }) {
  if (!blocks?.length) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center text-white/50">
        This page has no blocks yet. Add content in Payload admin.
      </div>
    );
  }

  return (
    <>
      {blocks.map((block, index) => (
        <Block key={block.id ?? index} block={block} />
      ))}
    </>
  );
}
