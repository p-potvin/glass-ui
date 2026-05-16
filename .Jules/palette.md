## 2026-05-03 - Focus Indicators for Accessibility
**Learning:** Using `outline-none` on native form elements like `<select>` and `<input type="color">` without providing a custom `focus-visible` alternative completely removes keyboard focus indicators. This severely degrades accessibility for users navigating via keyboard.
**Action:** Always replace `outline-none` with a visible focus state, such as `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color]` to ensure focus is clearly indicated while avoiding default browser outlines on mouse clicks.
## 2024-05-04 - Code Block Interaction
**Learning:** Users often try to click code snippet blocks to copy them, not just the associated copy button. Making the `<pre>` block interactive provides a better UX. It's important to remember to add `role="button"`, `tabIndex={0}`, and an `onKeyDown` handler (listening for Space/Enter) to maintain accessibility when turning non-interactive elements into interactive ones.
**Action:** When adding copy-to-clipboard functionality to code snippets, always consider making the code block itself an interactive, accessible button.
## 2026-05-14 - WebGL Canvas Accessibility
**Learning:** React Three Fiber `<Canvas>` elements are inherently invisible to screen readers, meaning any interactive or visual information conveyed through 3D scenes is inaccessible. Furthermore, placing large decorative text behind these canvases can lead to confusing screen reader readouts if not properly hidden.
**Action:** Always wrap 3D `<Canvas>` components in a container with `role="img"` and a descriptive `aria-label`. Additionally, apply `aria-hidden="true"` to any purely decorative text or elements that serve as a backdrop to the 3D scene.
