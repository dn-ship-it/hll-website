import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const tagVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider",
  {
    variants: {
      variant: {
        warm: "border-orange-200/80 bg-orange-50 text-orange-900/80",
        cool: "border-sky-200/80 bg-sky-50 text-sky-900/80",
        neutral: "border-black/10 bg-white/80 text-black/70",
      },
    },
    defaultVariants: { variant: "warm" },
  },
);

type TagProps = {
  children: React.ReactNode;
  className?: string;
} & VariantProps<typeof tagVariants>;

export function Tag({ children, variant, className }: TagProps) {
  return <span className={cn(tagVariants({ variant }), className)}>{children}</span>;
}

export function HLLServiceTag({ label }: { label: string }) {
  const warm = label.includes("MOMENTUM") || label.includes("MOTION");
  return <Tag variant={warm ? "warm" : "cool"}>{label}</Tag>;
}
