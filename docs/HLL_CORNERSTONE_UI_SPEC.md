# HLL Cornerstone Marketing Site - UI Specification

## Overview
This document provides a comprehensive UI specification for the HLL (HLL Lifecare) × Cornerstone India marketing website, based on analysis of the HLL component library and existing codebase.

---

## 1. Design System Foundation

### 1.1 Color Palette

#### Background Colors
- **Primary Background**: `#0c0c0c` (Very dark, near black)
- **Secondary Background**: `#0f0f0f` (Slightly lighter dark)
- **Tertiary Background**: `#090909` (Footer dark)
- **Elevated Surface**: `#111` with 80% opacity (`#111/80`)
- **Card Surface**: White with 2% opacity (`white/[0.02]`)

#### Text Colors
- **Primary Text**: `white` (Full white for headings and important content)
- **Secondary Text**: `white/90` (90% opacity for body text)
- **Tertiary Text**: `white/65` (65% opacity for descriptions)
- **Muted Text**: `white/55` (55% opacity for captions)
- **Disabled Text**: `white/45` (45% opacity for labels)
- **Subtle Text**: `white/40` (40% opacity for micro-copy)
- **Very Subtle Text**: `white/35` (35% opacity for footer sections)

#### Border Colors
- **Primary Border**: `white/8` (8% opacity - main borders)
- **Hover Border**: `white/16` (16% opacity - hover state)
- **Active Border**: `white/25` (25% opacity - active state)
- **Subtle Border**: `white/10` (10% opacity - component borders)

#### Gradient Variants

**Navigation Variants:**
- **services**: `#F7A567 → #E05A35 → #EB3B3E` (Red-orange gradient)
- **industries**: `#0352B2 → #037A9F → #6460D5` (Blue-purple gradient)
- **engagement**: `#F9B535 → #FF9126 → #FF6302` (Orange gradient)
- **about**: `#9AB4D3 → #A28DD7 → #AD7ECF` (Purple-lavender gradient)
- **contact**: `#ABBFFF → #2BB4EB → #076EB8` (Blue gradient)

**Service Variants:**
- **hll-ai**: `#3773FF → #BCA6D6` (Blue-purple)
- **hll-trust**: `#129562 → #7CBAAA` (Green-teal)
- **hll-foundation**: `#FF5A1E → #CC8B93` (Orange-pink)
- **hll-ontology**: `#7455FF → #FFB26A` (Purple-orange)
- **hll-people**: `#FF9042 → #FFEEC7` (Orange-cream)
- **hll-application**: `#FF1F1F → #72AAFF` (Red-blue)

### 1.2 Typography

#### Font Families
- **Sans Serif**: `var(--font-geist-sans)` (Primary font)
- **Monospace**: `var(--font-geist-mono)` (Code and technical content)
- **Heading**: Same as sans-serif

#### Font Sizes & Line Heights

**Hero Text:**
- Large display text (Gradient Reveal Text component)
- Maximum width: `max-w-4xl`

**Section Headings:**
- H2: `text-3xl` or `text-4xl` (responsive)
- Font weight: `font-semibold`
- Color: `text-white`

**Body Text:**
- Base: `text-sm` with `leading-7`
- Large: `text-lg` or `text-xl` (responsive)
- Color: `text-white/65` or `text-white/55`

**Micro Text:**
- Small: `text-xs`
- Extra small: `text-[11px]`
- Tracking: `tracking-[0.18em]` to `tracking-[0.24em]`
- Transform: `uppercase`

**Button Text:**
- Small: `text-xs`
- Medium: `text-sm`
- Large: `text-base`
- Font weight: `font-medium`
- Tracking: `tracking-wide`

### 1.3 Spacing System

#### Container Widths
- **Max Width**: `max-w-7xl` (1280px)
- **Content Padding**: `px-6 lg:px-10` (Responsive horizontal padding)

#### Section Spacing
- **Hero Section**: `pt-16 pb-24 lg:pt-24 lg:pb-32`
- **Standard Section**: `py-20` or `py-16`
- **Footer**: `py-16`

#### Component Spacing
- **Margin Top**: `mt-2`, `mt-3`, `mt-6`, `mt-8`, `mt-10`
- **Gap (Flex/Grid)**: `gap-2`, `gap-3`, `gap-4`, `gap-6`, `gap-8`, `gap-10`
- **Padding**: `p-3`, `p-6`, `px-4 py-2`, `px-6 py-5`, `px-6 py-8`

#### Border Radius
- **Full**: `rounded-full` (Pills and buttons)
- **XL**: `rounded-3xl` (Cards and containers)
- **Base**: `rounded-2xl` (Modals and menus)

### 1.4 Effects & Animations

#### Backdrop Effects
- **Header**: `backdrop-blur-xl` with `bg-[#0c0c0c]/80`

#### Transitions
- **Standard**: `transition duration-300`
- **Hover Opacity**: `opacity-0` → `opacity-100` (300ms)

#### Shadows
- **Active Button**: `shadow-[0_0_24px_rgba(255,255,255,0.08)]`
- **Modal/Menu**: `shadow-2xl`

#### Custom Animations
- **Gradient Reveal**: Clip-path animation (1200ms slow / 600ms normal)
- **Shader Drift**: Scale and translate animation for background effects

---

## 2. Header Navigation

### 2.1 Structure

**Layout:**
```
[Logo + Brand Name] ...................... [Nav Items]
```

**Container:**
- Sticky positioning: `sticky top-0 z-50`
- Border: `border-b border-white/8`
- Background: `bg-[#0c0c0c]/80 backdrop-blur-xl`
- Padding: `px-6 py-5 lg:px-10`
- Max width: `max-w-7xl`
- Display: `flex items-center justify-between gap-6`

### 2.2 Logo Section

**Logo Badge:**
- Size: `size-9` (36px × 36px)
- Shape: `rounded-full`
- Background: Gradient from `hll-ai` variant (`#3773FF → #BCA6D6`)
- Text: "HLL"
- Font: `text-xs font-bold text-white`

**Brand Name:**
- Primary: "Cornerstone"
  - Font: `text-sm font-semibold tracking-wide text-white`
- Secondary: "INDIA"
  - Font: `text-[11px] uppercase tracking-[0.18em] text-white/45`

**Interactive State:**
- Grouped with `group` class for hover effects

### 2.3 Navigation Items

**Desktop Navigation (lg:flex):**
- Hidden on mobile
- Display: `flex items-center gap-2`

**Navigation Items:**
1. Services (`/services`)
2. Industries (`/industries`)
3. Engagement (`/engagement`)
4. About (`/about`)
5. Contact (`/contact`)

**Button Styling:**
- Component: `HLLButton`
- Size: `sm`
- Variant: Matches section name
- Active state: `active={activeVariant === item.variant}`

### 2.4 Mobile Menu

**Trigger:**
- Display: `lg:hidden`
- Element: `<details>` with `<summary>`
- Style: `rounded-full border border-white/10 px-4 py-2 text-sm text-white/80`
- Text: "Menu"

**Dropdown:**
- Position: `absolute right-0 mt-3`
- Width: `w-56`
- Style: `rounded-2xl border border-white/10 bg-[#111]/95 p-3 shadow-2xl`
- Layout: `flex flex-col gap-2`
- Items: Full-width buttons (`w-full`)

---

## 3. Home Page Layout

### 3.1 Page Structure

```
<MarketingShell shaderVariant="services">
  <HomeHero />
  <ServiceVerticals />
  <ProofStrip />
</MarketingShell>
```

### 3.2 Hero Section (HomeHero)

**Container:**
- Section: `relative overflow-hidden`
- Padding: `px-6 pb-24 pt-16 lg:px-10 lg:pb-32 lg:pt-24`
- Background: `BottomShader` component with `variant="hll-ai"` and `intensity={70}`

**Content Layout:**
- Container: `relative mx-auto max-w-7xl`

**Elements:**

1. **Eyebrow Label**
   - Text: "HLL Lifecare × Cornerstone India"
   - Style: `mb-6 text-xs uppercase tracking-[0.24em] text-white/45`

2. **Main Headline (Gradient Reveal Text)**
   - Text: "Intelligence and Imagination"
   - Component: `GradientRevealText`
   - Variant: `hll-ai`
   - Max Width: `max-w-4xl`
   - Animation: Gradient sweep on load

3. **Description**
   - Text: "A next-generation digital experience for healthcare logistics, trust infrastructure, and AI-led public health innovation."
   - Style: `mt-8 max-w-2xl text-lg leading-8 text-white/65 md:text-xl`

4. **Call-to-Action Buttons**
   - Container: `mt-10 flex flex-wrap gap-3`
   - Primary: "Explore services" (href: `/services`, variant: `services`, size: `lg`)
   - Secondary: "Talk to us" (href: `/contact`, variant: `contact`, size: `lg`)

### 3.3 Service Verticals Section

**Container:**
- Border: `border-y border-white/8`
- Background: `bg-[#0f0f0f]/70`
- Padding: `px-6 py-20 lg:px-10`

**Section Header:**
- Layout: `flex flex-col gap-3 md:flex-row md:items-end md:justify-between`
- Margin: `mb-10`

**Left Column:**
- Label: "Capabilities"
  - Style: `text-xs uppercase tracking-[0.18em] text-white/40`
- Heading: "Six service verticals"
  - Style: `mt-2 text-3xl font-semibold text-white md:text-4xl`

**Right Column:**
- Description: "Each vertical maps to the LightFX shader preset system — swap in the full WebGL kit from HLL-UI-Demo when available."
  - Style: `max-w-xl text-sm leading-7 text-white/55`

**Service Cards Grid:**
- Layout: `grid gap-4 md:grid-cols-2 xl:grid-cols-3`

**Card Structure (for each service):**
- Container: `rounded-3xl border border-white/8 bg-white/[0.02] p-6`
- Hover: `hover:border-white/16 hover:bg-white/[0.04]`
- Transition: `transition`

**Card Elements:**
1. **Gradient Indicator**
   - Size: `h-1.5 w-16`
   - Shape: `rounded-full`
   - Margin: `mb-5`
   - Background: Linear gradient (90deg) of variant colors

2. **Title**
   - Style: `text-xl font-medium capitalize text-white`
   - Text: Service name (formatted from variant)

3. **Description**
   - Style: `mt-3 text-sm leading-7 text-white/55`
   - Text: "Strategy, delivery, and platform experiences for [service name]."

4. **View Button**
   - Container: `mt-6 inline-flex`
   - Component: `HLLButton`
   - Text: "View vertical"
   - Variant: Matches service
   - Size: `sm`
   - Link: `/services/[variant]`

**Service List:**
1. HLL AI
2. HLL Trust
3. HLL Foundation
4. HLL Ontology
5. HLL People
6. HLL Application

### 3.4 Proof Strip Section

**Container:**
- Padding: `px-6 py-16 lg:px-10`

**Grid:**
- Layout: `mx-auto grid max-w-7xl gap-6 md:grid-cols-3`

**Stat Cards:**
- Style: `rounded-3xl border border-white/8 bg-white/[0.02] px-6 py-8`

**Card Structure:**
1. **Label**
   - Style: `text-xs uppercase tracking-[0.18em] text-white/40`
2. **Value**
   - Style: `mt-3 text-2xl font-semibold text-white`

**Stats:**
1. Public health reach: "Pan-India"
2. Digital platforms: "CMS + APIs"
3. Experience system: "LightFX"

---

## 4. Footer

### 4.1 Structure

**Container:**
- Border: `border-t border-white/8`
- Background: `bg-[#090909]`

**Main Footer:**
- Layout: `mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.2fr_1fr] lg:px-10`

### 4.2 Left Column - Brand Section

**Title:**
- Text: "HLL × Cornerstone India"
- Style: `text-lg font-semibold text-white`

**Description:**
- Text: "Healthcare logistics, trust infrastructure, and digital innovation for public health systems across India."
- Style: `mt-3 max-w-md text-sm leading-7 text-white/55`

### 4.3 Right Column - Links Grid

**Layout:**
- Grid: `grid gap-8 sm:grid-cols-2`

**Column 1: Explore Links**
- Section Label: "EXPLORE"
  - Style: `text-xs uppercase tracking-[0.18em] text-white/35`
- Links Container: `mt-4 flex flex-col gap-2`

**Links:**
- Tenders
- Careers
- News
- Estimate
- CMS

**Link Style:**
- `text-sm text-white/60 transition hover:text-white`

**Column 2: Service Buttons**
- Section Label: "SERVICES"
  - Style: `text-xs uppercase tracking-[0.18em] text-white/35`
- Container: `mt-4 flex flex-wrap gap-2`
- Buttons: `HLLButton` components (size: `sm`)

**Services:**
- AI (hll-ai)
- Trust (hll-trust)
- Foundation (hll-foundation)
- Ontology (hll-ontology)
- People (hll-people)
- Application (hll-application)

### 4.4 Copyright Bar

**Container:**
- Border: `border-t border-white/8`
- Padding: `px-6 py-6 lg:px-10`
- Alignment: `text-center`
- Style: `text-xs text-white/35`

**Text:**
- "© [Year] HLL Lifecare · Cornerstone India experience"

---

## 5. Component Library - HLLButton

### 5.1 Component API

**Props:**
- `variant`: One of the predefined gradient variants (default: `"services"`)
- `size`: `"sm" | "md" | "lg"` (default: `"md"`)
- `active`: `boolean` (default: `false`)
- `href`: Optional string for Link behavior
- `gradient`: Optional custom colors array (overrides variant)
- `direction`: Gradient angle in degrees (default: `135`)
- `glow`: Glow intensity (default: `1.75`)
- `animated`: Enable hover animations (default: `true`)
- `isLoading`: Show loading spinner
- `disabled`: Disable button
- `children`: Button label/content

### 5.2 Size Variants

- **sm**: `h-9 px-4 text-xs`
- **md**: `h-11 px-5 text-sm`
- **lg**: `h-12 px-7 text-base`

### 5.3 Visual Structure

**Base Styles:**
- Shape: `rounded-full`
- Border: `border border-white/10`
- Background: `bg-[#111]/80`
- Text: `font-medium tracking-wide text-white/90`
- Focus: `focus-visible:ring-2 focus-visible:ring-white/30`

**Active State:**
- Border: `border-white/25`
- Text: `text-white`
- Shadow: `shadow-[0_0_24px_rgba(255,255,255,0.08)]`

**Layers (from back to front):**

1. **Glow Layer (Background)**
   - Position: `absolute inset-0`
   - Opacity: `0` default, `100` on hover
   - Background: Gradient with blur filter
   - Blur: `calc(var(--hll-glow) * 0.35)`

2. **Solid Background**
   - Position: `absolute inset-[1px]`
   - Shape: `rounded-full`
   - Color: `bg-[#101010]/95`

3. **Gradient Border**
   - Position: `absolute inset-0`
   - Shape: `rounded-full`
   - Opacity: `70` default, `100` on hover
   - Implementation: Gradient with mask for border effect

4. **Content**
   - Position: `relative z-10`
   - Layout: `inline-flex items-center gap-2`

### 5.4 Hover Behavior

**Animated (default):**
- Glow layer fades in (300ms transition)
- Border gradient brightens
- Smooth opacity transitions

**Static (animated=false):**
- No hover effects
- Used for disabled or readonly states

---

## 6. Component Library - GradientRevealText

### 6.1 Component Purpose

Creates an animated text reveal effect with a gradient sweep animation, used for hero headlines and section titles.

### 6.2 Animation Types

- **Slow**: 1200ms duration (multi-band "leak" sweep effect)
- **Normal**: 600ms duration (white + color ink "sweep")

### 6.3 Usage

**Props:**
- `text`: String content to animate
- `variant`: Gradient variant to use
- `className`: Additional styling

**Example:**
```tsx
<GradientRevealText
  text="Intelligence and Imagination"
  variant="hll-ai"
  className="max-w-4xl"
/>
```

### 6.4 Animation Details

- Clip-path animation from `inset(0 100% 0 0)` to `inset(0 0 0 0)`
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)`
- Respects prefers-reduced-motion

---

## 7. Component Library - Shader

### 7.1 Purpose

Creates ambient background shader effects using WebGL-style gradients for visual depth.

### 7.2 Variants

- **Shader**: Full-screen background effect
- **BottomShader**: Positioned at bottom of section

### 7.3 Props

- `variant`: Gradient variant to use
- `intensity`: Strength of effect (0-100)

### 7.4 Usage

**Full Background:**
```tsx
<MarketingShell shaderVariant="services">
  {/* content */}
</MarketingShell>
```

**Section Background:**
```tsx
<section className="relative">
  <BottomShader variant="hll-ai" intensity={70} />
  {/* content */}
</section>
```

---

## 8. Responsive Behavior

### 8.1 Breakpoints

Following Tailwind CSS defaults:
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px

### 8.2 Navigation

**Desktop (lg+):**
- Full horizontal navigation
- Logo and nav items in header
- No mobile menu button

**Mobile (<lg):**
- Logo only in header
- Hamburger menu (details/summary)
- Dropdown navigation

### 8.3 Grid Layouts

**Service Cards:**
- Mobile: 1 column
- md: 2 columns
- xl: 3 columns

**Footer Links:**
- Mobile: 1 column
- sm: 2 columns

**Proof Stats:**
- Mobile: 1 column
- md: 3 columns

### 8.4 Typography

**Hero Description:**
- Mobile: `text-lg`
- md: `text-xl`

**Section Headings:**
- Mobile: `text-3xl`
- md: `text-4xl`

### 8.5 Spacing

**Container Padding:**
- Mobile: `px-6`
- lg: `px-10`

**Hero Spacing:**
- Mobile: `pt-16 pb-24`
- lg: `pt-24 pb-32`

---

## 9. Accessibility

### 9.1 Color Contrast

All text maintains WCAG AA contrast ratios:
- White text on dark backgrounds
- Minimum opacity: 35% for decorative text
- Body text: 55-65% opacity minimum

### 9.2 Focus States

- Visible focus rings: `focus-visible:ring-2 focus-visible:ring-white/30`
- Outline on all interactive elements: `outline-ring/50`

### 9.3 Keyboard Navigation

- All navigation items are keyboard accessible
- Details/summary for mobile menu supports keyboard
- Tab order follows visual layout

### 9.4 Motion Preferences

```css
@media (prefers-reduced-motion: reduce) {
  .shader-layer,
  .gtr-text .gtr-sweep.is-running {
    animation: none !important;
  }
}
```

### 9.5 ARIA

- Loading states use spinner with appropriate labels
- Disabled states use `aria-disabled`
- Decorative elements marked with `aria-hidden`

---

## 10. Implementation Notes

### 10.1 Technology Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS v4
- **UI Components**: Custom components with class-variance-authority
- **Animations**: CSS animations + WebGL shaders (planned)

### 10.2 Font Loading

- Geist Sans (primary)
- Geist Mono (code/technical)
- Loaded via Next.js font optimization

### 10.3 Performance

- Sticky header with backdrop blur
- Background shaders at 55-70% intensity
- Lazy loading for below-the-fold content
- Optimized animations with CSS transforms

### 10.4 Dark Mode

The site uses a dark theme exclusively:
- Base background: `#0c0c0c`
- No light mode variant currently

---

## 11. Development Checklist

### Phase 1: Foundation
- [ ] Set up color system in Tailwind config
- [ ] Configure typography scale
- [ ] Set up spacing/sizing tokens
- [ ] Configure border radius system

### Phase 2: Components
- [ ] Implement HLLButton component
- [ ] Implement GradientRevealText component
- [ ] Implement Shader components
- [ ] Build MarketingShell wrapper

### Phase 3: Layout
- [ ] Build SiteHeader component
- [ ] Build SiteFooter component
- [ ] Create responsive navigation
- [ ] Implement mobile menu

### Phase 4: Pages
- [ ] Build home page sections (Hero, Service Verticals, Proof Strip)
- [ ] Test responsive behavior
- [ ] Verify animations
- [ ] Check accessibility

### Phase 5: Polish
- [ ] Fine-tune animation timings
- [ ] Optimize performance
- [ ] Cross-browser testing
- [ ] Mobile device testing

---

## 12. Design Tokens Reference

### Colors (CSS Variables)

```css
:root {
  /* Backgrounds */
  --bg-primary: #0c0c0c;
  --bg-secondary: #0f0f0f;
  --bg-tertiary: #090909;
  --bg-elevated: rgba(17, 17, 17, 0.8);
  --bg-card: rgba(255, 255, 255, 0.02);
  
  /* Text */
  --text-primary: rgb(255, 255, 255);
  --text-secondary: rgba(255, 255, 255, 0.9);
  --text-body: rgba(255, 255, 255, 0.65);
  --text-muted: rgba(255, 255, 255, 0.55);
  --text-disabled: rgba(255, 255, 255, 0.45);
  --text-subtle: rgba(255, 255, 255, 0.40);
  --text-ghost: rgba(255, 255, 255, 0.35);
  
  /* Borders */
  --border-primary: rgba(255, 255, 255, 0.08);
  --border-hover: rgba(255, 255, 255, 0.16);
  --border-active: rgba(255, 255, 255, 0.25);
  --border-subtle: rgba(255, 255, 255, 0.10);
}
```

### Spacing Scale

```
0.5 = 2px
1 = 4px
2 = 8px
3 = 12px
4 = 16px
5 = 20px
6 = 24px
8 = 32px
10 = 40px
16 = 64px
20 = 80px
24 = 96px
32 = 128px
```

---

## Summary

This specification provides a complete blueprint for implementing the HLL Cornerstone marketing site. The design system emphasizes:

1. **Dark, premium aesthetic** with subtle transparency and borders
2. **Vibrant gradient accents** for interactive elements and visual interest
3. **Clear information hierarchy** with well-defined typography scale
4. **Smooth animations** with gradient reveals and hover effects
5. **Responsive design** that works seamlessly across all devices
6. **Accessibility first** with proper contrast, focus states, and motion preferences

The component library (HLLButton, GradientRevealText, Shader) provides reusable building blocks that maintain consistency throughout the site while supporting the unique service-based color system with 11 distinct gradient variants.
