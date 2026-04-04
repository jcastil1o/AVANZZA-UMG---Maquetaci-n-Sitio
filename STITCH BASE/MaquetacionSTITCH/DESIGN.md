# Design System Strategy: The Scholarly Editorial

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Curator"**

This design system rejects the "SaaS-template" aesthetic in favor of a high-end editorial experience. We are not building a generic dashboard; we are crafting a digital library and research Avanzza. The "Digital Curator" philosophy balances the weight of academic authority with the fluid lightness of a modern "day-view" aesthetic.

To break the standard grid, we lean into **Intentional Asymmetry**. Large-scale typography is often offset, and content containers utilize varying "tonal weights" rather than rigid borders. The goal is to make the learner feel they are engaging with a premium, bespoke publication where information has been curated, not just displayed.

---

## 2. Colors & Surface Philosophy
The palette is rooted in the depth of Oxford Blue (`#192338`), providing a foundation of intellectual rigor, contrasted by the airy lightness of Lavender Web (`#D9E1F1`).

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or containment. 
Boundaries must be defined through:
- **Background Shifts:** Placing a `surface-container-low` section against a `surface` background.
- **Tonal Transitions:** Using subtle shifts in the blue spectrum to imply a change in context.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of fine paper. We achieve depth through the **Surface Tier Scale**:
- **Base Layer:** `surface` (#f9f9ff) – The primary canvas.
- **Sectioning:** `surface-container-low` (#f1f3ff) – Large content blocks.
- **Focus Elements:** `surface-container-highest` (#d8e2ff) – Active modules or featured resources.

### The "Glass & Gradient" Rule
To elevate the "scholarly" vibe, use **Glassmorphism** for floating navigational elements or modal overlays. Apply `surface-container-lowest` at 80% opacity with a `20px` backdrop blur. 
**Signature Texture:** Use a subtle linear gradient (135° from `primary` to `primary-container`) for hero sections or high-impact CTA backgrounds to provide a "soul" that flat colors lack.

---

## 3. Typography: The Manrope Scale
We use **Manrope** exclusively. Its geometric yet humanist qualities bridge the gap between technical precision and readability.

*   **Display (lg/md):** Used for chapter headings or major milestones. Tighten letter-spacing by `-0.02em` to create an "Editorial Headline" feel.
*   **Headline (sm/md):** Reserved for section titles. Use `primary` color to maintain authority.
*   **Title (lg/md):** Used for card titles and navigation headers.
*   **Body (lg/md):** The workhorse for course content. Ensure line-height is generous (1.6x) to prevent cognitive fatigue during long-form reading.
*   **Label (sm/md):** Used for metadata (e.g., "15 min read," "Verified"). Use `secondary` color for these to lower visual noise.

---

## 4. Elevation & Depth
In this design system, shadows are a last resort. We rely on **Tonal Layering**.

*   **The Layering Principle:** To lift a card, place a `surface-container-lowest` (#ffffff) card on a `surface-container-low` (#f1f3ff) background. This creates a "soft lift" that feels architectural rather than digital.
*   **Ambient Shadows:** If a floating element (like a FAB or Popover) requires a shadow, use a "Deep Sea Shadow": `0px 12px 32px rgba(17, 27, 48, 0.06)`. The tint of `on-surface` ensures the shadow feels like a natural obstruction of light.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline-variant` token at **15% opacity**. This creates a whisper of a line that guides the eye without cluttering the interface.

---

## 5. Components

### Buttons
*   **Primary:** Filled with `primary-container` (#192338) and `on-primary` text. Apply `ROUND_EIGHT` (0.5rem) corners.
*   **Secondary:** Ghost-style with no background. Uses `primary` text. Interaction is signaled via a subtle `surface-container-high` background hover.
*   **Tertiary:** `secondary` text with an underline that appears only on hover, mimicking academic citations.

### Cards & Lists
*   **Rule:** Forbid the use of divider lines. 
*   **Implementation:** Use `Spacing Scale 8` (2rem) of vertical white space to separate list items. For cards, use the "Surface Tier Scale" mentioned in section 2. A card should be a distinct background color, never a bordered box.

### Input Fields
*   **Style:** Minimalist. No bottom line, no full border. Use a `surface-container-highest` background with a `ROUND_EIGHT` corner.
*   **Focus State:** The background transitions to `surface-container-lowest` with a subtle `primary` "Ghost Border" (20% opacity).

### Scholarly Context Components
*   **The Annotation Tooltip:** A semi-transparent `surface-variant` box with backdrop blur for defining academic terms without leaving the page.
*   **The Progress Quilt:** A non-linear progress tracker using `tertiary-fixed` blocks to show course completion through color density rather than a progress bar.

---

## 6. Do’s and Don’ts

### Do:
*   **Embrace Negative Space:** Allow headlines to "breathe" with at least `Spacing Scale 12` (3rem) of top margin.
*   **Use Intentional Asymmetry:** Align text to the left but allow imagery or secondary callouts to float in the right-hand gutters.
*   **Use Tonal Priority:** Use `on-surface-variant` for secondary text to create a clear hierarchy against the `on-surface` primary content.

### Don’t:
*   **Don't use 100% Black:** Always use `primary` (#030d21) or `on-surface` (#111b30) for text to maintain the "Oxford Blue" tonal depth.
*   **Don't use Standard Dividers:** Never use a `<hr>` or a 1px border to separate content. Use space or background shifts.
*   **Don't use High-Saturation Accents:** Avoid using the accent color (#31487A) for large surfaces. It is a "highlighter"—use it sparingly for active states, links, or progress indicators.