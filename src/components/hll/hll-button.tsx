"use client";

import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import {
  type ButtonHTMLAttributes,
  type CSSProperties,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

import {
  getVariantColors,
  gradientCss,
  type HLLVariant,
} from "./variants";

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/10 bg-[#111]/80 font-medium tracking-wide text-white/90 transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-7 text-base",
      },
      active: {
        true: "border-white/25 text-white shadow-[0_0_24px_rgba(255,255,255,0.08)]",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      active: false,
    },
  },
);

type HLLButtonProps = {
  href?: string;
  variant?: HLLVariant;
  gradient?: string[];
  direction?: number;
  glow?: number;
  animated?: boolean;
  isLoading?: boolean;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
} & VariantProps<typeof buttonVariants> &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className" | "style">;

export function HLLButton({
  href,
  variant = "services",
  gradient,
  direction = 135,
  glow = 1.75,
  animated = true,
  isLoading = false,
  size = "md",
  active = false,
  children,
  className,
  style,
  disabled,
  type = "button",
  ...props
}: HLLButtonProps) {
  const colors = getVariantColors(variant, gradient);
  const isDisabled = Boolean(disabled || isLoading);

  const sharedStyle = {
    ...style,
    ["--hll-gradient" as string]: gradientCss(colors, direction),
    ["--hll-glow" as string]: `${glow}rem`,
  };

  const classes = cn(buttonVariants({ size, active }), className);

  const inner = (
    <>
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300",
          animated && "group-hover:opacity-100",
          active && "opacity-80",
        )}
        style={{
          background: gradientCss(colors, direction),
          filter: `blur(calc(var(--hll-glow) * 0.35))`,
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-[1px] rounded-full bg-[#101010]/95"
      />
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 rounded-full opacity-70",
          animated && "group-hover:opacity-100",
        )}
        style={{
          background: gradientCss(colors, direction),
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />
      <span className="relative z-10 inline-flex items-center gap-2">
        {isLoading ? (
          <span className="size-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        ) : null}
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        style={sharedStyle}
        aria-disabled={isDisabled || undefined}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      style={sharedStyle}
      disabled={isDisabled}
      {...props}
    >
      {inner}
    </button>
  );
}
