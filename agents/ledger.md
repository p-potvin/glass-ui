## 2026-05-14 - Improve accessibility of 3D Canvas elements
**Author:** Palette (UX Agent)
**Component/Area:** `src/components/glass/LiquidGlass.tsx`
**Change:** Wrapped React Three Fiber `<Canvas>` elements in containers with `role="img"` and descriptive `aria-label`s. Added `aria-hidden="true"` to large decorative background text.
**Reason:** WebGL canvas elements are completely opaque to screen readers. Adding semantic HTML wrappers ensures users relying on assistive technologies are aware of the visual content being presented, while hiding decorative text prevents confusing duplicate readouts.
