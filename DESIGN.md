---
name: Curated Heritage
colors:
  surface: '#faf9f5'
  surface-dim: '#dbdad6'
  surface-bright: '#faf9f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f4f0'
  surface-container: '#efeeea'
  surface-container-high: '#e9e8e4'
  surface-container-highest: '#e3e2df'
  on-surface: '#1b1c1a'
  on-surface-variant: '#434843'
  inverse-surface: '#2f312e'
  inverse-on-surface: '#f2f1ed'
  outline: '#737872'
  outline-variant: '#c3c8c1'
  surface-tint: '#506354'
  primary: '#334537'
  on-primary: '#ffffff'
  primary-container: '#4a5d4e'
  on-primary-container: '#c0d5c2'
  inverse-primary: '#b7ccb9'
  secondary: '#904d00'
  on-secondary: '#ffffff'
  secondary-container: '#fe932c'
  on-secondary-container: '#663500'
  tertiary: '#5e3819'
  on-tertiary: '#ffffff'
  tertiary-container: '#794f2e'
  on-tertiary-container: '#fec39a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d3e8d5'
  primary-fixed-dim: '#b7ccb9'
  on-primary-fixed: '#0e1f13'
  on-primary-fixed-variant: '#394b3d'
  secondary-fixed: '#ffdcc3'
  secondary-fixed-dim: '#ffb77d'
  on-secondary-fixed: '#2f1500'
  on-secondary-fixed-variant: '#6e3900'
  tertiary-fixed: '#ffdcc5'
  tertiary-fixed-dim: '#f4bb92'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#653d1e'
  background: '#faf9f5'
  on-background: '#1b1c1a'
  surface-variant: '#e3e2df'
typography:
  display-lg:
    fontFamily: Libre Caslon Text
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Libre Caslon Text
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 42px
  headline-md:
    fontFamily: Libre Caslon Text
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-sm:
    fontFamily: Libre Caslon Text
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

The design system is built for a curated thrift experience, bridging the gap between "pre-loved" charm and modern e-commerce reliability. The personality is nostalgic yet sophisticated, evoking the feeling of discovering a high-quality vintage piece in a well-organized boutique.

The style is **Modern-Organic**. It utilizes a clean, minimalist layout framework to provide the "airy" feel of a high-end gallery, while using warm textures, earthy tones, and retro-inspired typography to ground the experience in the tactile world of second-hand goods. The goal is to make "thrifting" feel like "investing" in pieces with history.

## Colors

The palette is rooted in a "New Earth" aesthetic, prioritizing comfort and legibility through low-strain backgrounds and high-intent accents.

- **Primary (Sage Forest):** A muted, deep green used for headers, key iconography, and brand-heavy elements. It represents sustainability and growth.
- **Secondary (Burnt Ochre):** A vibrant, high-contrast accent used exclusively for calls to action, price highlights, and "New Arrival" badges.
- **Tertiary (Warm Bark):** A soft brown for subtle borders, secondary text, and category filters.
- **Neutral (Parchment):** An off-white, slightly warm background that replaces pure white (#FFFFFF) to reduce digital glare and provide a vintage paper feel.
- **Surface:** Use a slightly darker tint of the neutral (#F5F2EA) for card backgrounds to create soft separation.

## Typography

This design system uses a high-contrast typographic pair to balance heritage and utility.

- **Headlines:** *Libre Caslon Text* provides a sturdy, editorial feel reminiscent of vintage fashion magazines. It should be used for product names, section headers, and promotional banners.
- **Body & UI:** *Hanken Grotesk* offers a sharp, modern counterpoint. Its high legibility ensures that product descriptions, sizing charts, and checkout flows are effortless to navigate.
- **Labels:** Use uppercase *Hanken Grotesk* with slight letter spacing for categories (e.g., "70S DENIM", "OUTERWEAR") to create a structured, curated look.

## Layout & Spacing

The layout philosophy follows a **Fixed-Fluid Hybrid** model. Content is contained within a 1280px max-width container on desktop, centered with generous outer margins to emphasize the "boutique" feel.

- **The Grid:** A 12-column grid on desktop, 6-column on tablet, and 2-column on mobile. 
- **Vertical Rhythm:** Use the `lg` (48px) and `xl` (80px) units for section spacing to maintain an "airy" and unhurried browsing experience. 
- **Product Grids:** Use a 24px gutter to ensure product photography has room to breathe, preventing a "cluttered" bargain-bin aesthetic.
- **Mobile:** Margins should never drop below 20px to ensure touch targets and text don't feel cramped against the screen edge.

## Elevation & Depth

To maintain a clean, modern look, elevation is handled through **Ambient Shadows** and **Tonal Layering** rather than heavy borders.

- **Surfaces:** Most "cards" sit on the Neutral background with no border, using a very soft, diffused shadow (Blur: 15px, Y: 4px, Opacity: 6% of the Primary color) to lift them slightly.
- **Interactive States:** On hover, elements should increase their shadow spread slightly and shift -2px on the Y-axis to simulate a physical lift.
- **Dividers:** Use 1px solid lines in a low-opacity version of the Tertiary color (15% opacity) only when necessary to separate distinct content blocks. Prefer whitespace over lines.

## Shapes

The shape language is **Soft and Structural**. 

- **Standard Elements:** Buttons, input fields, and tags use the base `0.25rem` (4px) radius. This provides a hint of softness without losing the professional, "curated" edge.
- **Container Elements:** Product cards and image containers use `rounded-lg` (8px) to frame photography warmly.
- **Iconography:** Use line icons with slightly rounded caps and joins to match the stroke weight of the body text.

## Components

- **Buttons:** 
  - *Primary:* Filled with Secondary (Ochre), white text, `label-md` typography. 
  - *Secondary:* Ghost style with Primary (Sage) border and text.
- **Product Cards:** Images should have a subtle 1:1 or 4:5 aspect ratio. The background of the image container should be a light tint of the neutral color to ensure consistent framing for varied photo backgrounds.
- **Chips/Badges:** Use small, pill-shaped tags for "Vintage," "Eco-friendly," or "Size" indicators. Use low-saturation background colors from the primary/tertiary palette.
- **Input Fields:** Minimalist design with only a bottom border or a very light 1px surrounding border. On focus, the border transitions to the Primary color.
- **Lists:** Clean, wide rows with high vertical padding (16px+). Use the Tertiary color for secondary metadata (e.g., "Shipped from Berlin").
- **Cart/drawer:** Use a slide-in panel with a backdrop blur to maintain context while keeping the user focused on the checkout task.