## 2026-05-03 - Focus Indicators for Accessibility
**Learning:** Using `outline-none` on native form elements like `<select>` and `<input type="color">` without providing a custom `focus-visible` alternative completely removes keyboard focus indicators. This severely degrades accessibility for users navigating via keyboard.
**Action:** Always replace `outline-none` with a visible focus state, such as `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color]` to ensure focus is clearly indicated while avoiding default browser outlines on mouse clicks.
## 2024-05-04 - Code Block Interaction
**Learning:** Users often try to click code snippet blocks to copy them, not just the associated copy button. Making the `<pre>` block interactive provides a better UX. It's important to remember to add `role="button"`, `tabIndex={0}`, and an `onKeyDown` handler (listening for Space/Enter) to maintain accessibility when turning non-interactive elements into interactive ones.
**Action:** When adding copy-to-clipboard functionality to code snippets, always consider making the code block itself an interactive, accessible button.
## 2026-05-16 - Add Focus Visible Indicators
**Learning:** Some elements in the UI are interactive buttons but do not have explicit focus-visible styles. Keyboard navigation relies heavily on clear visible indicators.
**Action:** Used standard Tailwind focus classes (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface`) to explicitly indicate focus when navigating interactive elements via keyboard.
