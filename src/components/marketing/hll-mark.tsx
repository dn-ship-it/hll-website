/**
 * The Hyper Lychee Labs hourglass from the Figma Nav Bar component (25.5 × 51
 * vector, radial grey gradient). With `tint`, the gradient takes the tint's
 * hue and saturation at each stop's own lightness, which is what Figma's
 * COLOR-blend overlay does on the service frames ("logo in the navbar changes
 * colour according to the service or industries").
 */
const STOPS: [offset: number, grey: number, opacity: number][] = [
  [0.03, 0x3b, 1],
  [0.19, 0x45, 1],
  [0.44, 0x4c, 0.96],
  [0.61, 0x64, 0.83],
  [0.76, 0x8c, 0.62],
  [0.9, 0xc4, 0.31],
  [1, 0xff, 0],
];

type Rgb = [number, number, number];
const lum = ([r, g, b]: Rgb) => 0.3 * r + 0.59 * g + 0.11 * b;

/** W3C "color" blend: hue/saturation from `tint`, luminosity `l` (0–1). */
function withLuminosity(tint: Rgb, l: number): Rgb {
  const d = l - lum(tint);
  let c = tint.map((v) => v + d) as Rgb;
  const cl = lum(c);
  const min = Math.min(...c);
  const max = Math.max(...c);
  if (min < 0) c = c.map((v) => cl + ((v - cl) * cl) / (cl - min)) as Rgb;
  if (max > 1) c = c.map((v) => cl + ((v - cl) * (1 - cl)) / (max - cl)) as Rgb;
  return c;
}

const hex = (c: Rgb) => `#${c.map((v) => Math.round(Math.min(1, Math.max(0, v)) * 255).toString(16).padStart(2, "0")).join("")}`;

export function HllMark({ tint, className }: { tint?: string; className?: string }) {
  const tintRgb = tint
    ? ([1, 3, 5].map((i) => parseInt(tint.slice(i, i + 2), 16) / 255) as Rgb)
    : null;
  const id = `hll-mark-${tint?.slice(1) ?? "grey"}`;

  return (
    // "slice": the mobile Nav and Footer crop the mark to a 25 × 34 box
    // (Figma image fill), keeping its middle; the desktop box shows it whole.
    <svg
      viewBox="0 0 25.5054 50.9556"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M13.5273 25.4796C20.21 25.0785 25.5054 19.5366 25.5054 12.7545C25.5054 5.97248 19.7942 0 12.7508 0C5.70752 0 0 5.70752 0 12.7508C0 19.5329 5.29537 25.0785 11.9781 25.4759C5.29537 25.8807 0 31.4227 0 38.2047C0 44.9868 5.70752 50.9556 12.7508 50.9556C19.7942 50.9556 25.5017 45.248 25.5017 38.2047C25.5017 31.4227 20.2063 25.877 13.5236 25.4796H13.5273Z"
        fill={`url(#${id})`}
      />
      <defs>
        <radialGradient
          id={id}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(12.753 25.6692) scale(18.0057 18.0057)"
        >
          {STOPS.map(([offset, grey, opacity]) => {
            const g = grey / 255;
            const color = tintRgb ? hex(withLuminosity(tintRgb, g)) : hex([g, g, g]);
            return <stop key={offset} offset={offset} stopColor={color} stopOpacity={opacity} />;
          })}
        </radialGradient>
      </defs>
    </svg>
  );
}
