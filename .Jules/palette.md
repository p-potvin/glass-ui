## 2026-05-03 - Focus Indicators for Accessibility
**Learning:** Using `outline-none` on native form elements like `<select>` and `<input type="color">` without providing a custom `focus-visible` alternative completely removes keyboard focus indicators. This severely degrades accessibility for users navigating via keyboard.
**Action:** Always replace `outline-none` with a visible focus state, such as `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color]` to ensure focus is clearly indicated while avoiding default browser outlines on mouse clicks.
## 2024-05-04 - Code Block Interaction
**Learning:** Users often try to click code snippet blocks to copy them, not just the associated copy button. Making the `<pre>` block interactive provides a better UX. It's important to remember to add `role="button"`, `tabIndex={0}`, and an `onKeyDown` handler (listening for Space/Enter) to maintain accessibility when turning non-interactive elements into interactive ones.
**Action:** When adding copy-to-clipboard functionality to code snippets, always consider making the code block itself an interactive, accessible button.
## 2026-05-15 - Consistent Image Alt Text
**Learning:** Repetitive header logos or icons in sub-components must carry the same detailed, context-rich `alt` text as the primary navigation. Simply leaving `alt="Logo"` causes screen readers to announce disjointed or generic terms when a user switches views.
**Action:** Always verify that generic `alt` attributes like "Logo" or "Icon" are replaced with specific descriptors like "VaultWares Logo" to ensure a cohesive and descriptive screen reader experience across all views.
