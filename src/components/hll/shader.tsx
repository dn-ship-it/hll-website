"use client";

import { cn } from "@/lib/utils";

import { getVariantColors, gradientCss, type HLLVariant } from "./variants";

type ShaderProps = {
  variant?: HLLVariant;
  colors?: string[];
  intensity?: number;
  className?: string;
  style?: React.CSSProperties;
  placement?: "full" | "bottom";
};

export function Shader({
  variant = "services",
  colors,
  intensity = 100,
  className,
  style,
  placement = "full",
}: ShaderProps) {
  const palette = getVariantColors(variant, colors);
  const opacity = Math.max(0, Math.min(100, intensity)) / 100;

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none overflow-hidden",
        placement === "full" && "fixed inset-0 -z-10",
        placement === "bottom" && "absolute inset-x-0 bottom-0 h-[45vh] -z-10",
        className,
      )}
      style={style}
    >
      <div
        className="shader-layer absolute inset-0 animate-[shader-drift_18s_ease-in-out_infinite]"
        style={{
          background: gradientCss(palette, 125),
          opacity,
          filter: "blur(80px) saturate(140%)",
          transform: "scale(1.15)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            placement === "bottom"
              ? "linear-gradient(to top, rgba(12,12,12,0.2), #0c0c0c 75%)"
              : "radial-gradient(circle at 50% 20%, transparent 0%, #0c0c0c 70%)",
        }}
      />
    </div>
  );
}

export function BottomShader(props: Omit<ShaderProps, "placement">) {
  return <Shader {...props} placement="bottom" />;
}
