# HLL Cornerstone - Quick Reference Guide

## Essential Links

- **Component Docs**: https://hok-sdf-lensblur-lyart.vercel.app/docs.html
- **Studio**: https://hok-sdf-lensblur-lyart.vercel.app/studio.html
- **Lens Blur**: https://hok-sdf-lensblur-lyart.vercel.app/index.html

---

## Quick Color Reference

### Backgrounds
```css
Primary:   #0c0c0c
Secondary: #0f0f0f
Tertiary:  #090909
Elevated:  #111 @ 80%
Card:      white @ 2%
```

### Text Opacity Levels
```css
Primary:     100% (white)
Secondary:   90%
Body:        65%
Muted:       55%
Disabled:    45%
Subtle:      40%
Ghost:       35%
```

### Border Opacity
```css
Primary:  8%
Hover:    16%
Active:   25%
Subtle:   10%
```

---

## Component Quick Start

### HLLButton
```tsx
<HLLButton 
  variant="services"  // or any gradient variant
  size="md"          // sm | md | lg
  href="/path"       // optional, makes it a Link
  active={false}     // highlight state
  animated={true}    // hover effects
>
  Button Text
</HLLButton>
```

### GradientRevealText
```tsx
<GradientRevealText
  text="Your Headline"
  variant="hll-ai"
  className="max-w-4xl"
/>
```

### Shader Background
```tsx
<section className="relative">
  <BottomShader variant="hll-ai" intensity={70} />
  {/* content */}
</section>
```

---

## Gradient Variants

### Navigation (5 variants)
- `services` - Red-orange
- `industries` - Blue-purple
- `engagement` - Orange
- `about` - Purple-lavender
- `contact` - Blue

### Services (6 variants)
- `hll-ai` - Blue-purple
- `hll-trust` - Green-teal
- `hll-foundation` - Orange-pink
- `hll-ontology` - Purple-orange
- `hll-people` - Orange-cream
- `hll-application` - Red-blue

---

## Typography Classes

### Headings
```css
Hero:    (GradientRevealText component)
H2:      text-3xl md:text-4xl font-semibold text-white
H3:      text-xl font-medium text-white
```

### Body
```css
Large:   text-lg md:text-xl leading-8 text-white/65
Normal:  text-sm leading-7 text-white/55
```

### Labels
```css
Eyebrow: text-xs uppercase tracking-[0.24em] text-white/45
Caption: text-xs uppercase tracking-[0.18em] text-white/40
```

---

## Layout Classes

### Container
```css
mx-auto max-w-7xl px-6 lg:px-10
```

### Section Spacing
```css
Hero:     px-6 pb-24 pt-16 lg:px-10 lg:pb-32 lg:pt-24
Standard: px-6 py-20 lg:px-10
Footer:   px-6 py-16 lg:px-10
```

### Grids
```css
2-col: grid gap-4 md:grid-cols-2
3-col: grid gap-4 md:grid-cols-2 xl:grid-cols-3
```

---

## Common Patterns

### Card
```tsx
<div className="rounded-3xl border border-white/8 bg-white/[0.02] p-6 
                transition hover:border-white/16 hover:bg-white/[0.04]">
  {/* content */}
</div>
```

### Section Header
```tsx
<div>
  <p className="text-xs uppercase tracking-[0.18em] text-white/40">
    Section Label
  </p>
  <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">
    Section Heading
  </h2>
</div>
```

### Button Group
```tsx
<div className="flex flex-wrap gap-3">
  <HLLButton variant="services" size="lg">Primary</HLLButton>
  <HLLButton variant="contact" size="lg">Secondary</HLLButton>
</div>
```

---

## Responsive Breakpoints

```
sm:  640px  (2-col grids)
md:  768px  (larger text, 2-col layout)
lg:  1024px (desktop nav, 3-col, larger padding)
xl:  1280px (3-col service grid)
```

---

## File Paths

### Components
```
src/components/hll/
  - hll-button.tsx
  - gradient-reveal-text.tsx
  - shader.tsx
  - variants.ts

src/components/marketing/
  - marketing-shell.tsx
  - site-header.tsx
  - site-footer.tsx
  - home-sections.tsx
```

### Pages
```
src/app/(frontend)/
  - page.tsx (home)
  - globals.css
  - layout.tsx
```

---

## Key Dependencies

```json
{
  "dependencies": {
    "next": "^15.x",
    "react": "^19.x",
    "tailwindcss": "^4.x",
    "class-variance-authority": "latest",
    "geist": "latest" // fonts
  }
}
```

---

## Common Tasks

### Add New Section
1. Create section component in `home-sections.tsx`
2. Import and add to `page.tsx`
3. Use MarketingShell wrapper
4. Apply consistent spacing classes

### Add New Service Variant
1. Add to `SERVICE_VARIANTS` array in `variants.ts`
2. Add gradient colors to `VARIANT_GRADIENTS` object
3. Variant automatically available in all components

### Customize Button
```tsx
<HLLButton
  variant="services"
  gradient={["#custom1", "#custom2"]}  // override
  direction={90}                        // gradient angle
  glow={2.5}                           // glow intensity
/>
```

---

## Accessibility Checklist

- [ ] All interactive elements have focus states
- [ ] Color contrast meets WCAG AA (minimum 55% text opacity)
- [ ] Keyboard navigation works
- [ ] Animations respect prefers-reduced-motion
- [ ] Semantic HTML (proper headings, landmarks)
- [ ] ARIA labels where needed

---

## Performance Tips

1. Use static generation (getStaticProps) where possible
2. Keep animations to transform and opacity only
3. Lazy load below-fold content
4. Optimize images with Next.js Image component
5. Limit backdrop-blur usage (header only)

---

## Troubleshooting

**Button gradients not showing?**
- Check variant name matches `VARIANT_GRADIENTS` keys
- Verify gradient colors are valid hex codes

**Animations not working?**
- Check `animated={true}` prop
- Verify prefers-reduced-motion not set
- Check CSS classes are applied

**Layout issues?**
- Verify max-w-7xl container is present
- Check responsive padding classes (px-6 lg:px-10)
- Test at different breakpoints

**Text contrast poor?**
- Use minimum 55% opacity for body text
- Use 90-100% for headings
- Test with accessibility tools

---

## Support Resources

- **Full Spec**: See `HLL_CORNERSTONE_UI_SPEC.md`
- **Visual Guide**: See `HLL_VISUAL_SUMMARY.md`
- **Component Demos**: Visit docs.html URL
- **Code Examples**: Check home-sections.tsx

---

Last Updated: September 7, 2026
