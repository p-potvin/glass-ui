## 2025-01-01 - Form Label Associations in Interactive Property Panels
**Learning:** In interactive tool panels (like visual designers), developers often use visual grouping (text next to a slider or input) without providing proper semantic labels. This makes the controls completely invisible to screen readers, which cannot associate the visual context with the interactive element.
**Action:** Always ensure that every interactive input (`<select>`, `<input type="color">`, `<input type="range">`, etc.) has either a semantic `<label htmlFor="...">` referencing its `id`, or a descriptive `aria-label` when visually hidden or icon-only.

## 2026-05-16 - Focus Rings and Keyboard Accessibility on Interactive Panels
**Learning:** When developing interactive styling panels, outline resets (`outline-none`) are often mistakenly applied to interactive elements like `select` dropdowns and color pickers (`<input type="color">`) to match the visual design, completely breaking keyboard focus indicators and making the panel inaccessible to keyboard users.
**Action:** Always replace `outline-none` with `focus:outline-none` combined with `focus-visible` utility classes (e.g., `focus-visible:ring-2`) to ensure mouse users do not see outlines while preserving distinct visual focus rings for keyboard navigation.
