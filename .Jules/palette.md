## 2026-05-03 - Focus Indicators for Accessibility
**Learning:** Using `outline-none` on native form elements like `<select>` and `<input type="color">` without providing a custom `focus-visible` alternative completely removes keyboard focus indicators. This severely degrades accessibility for users navigating via keyboard.
**Action:** Always replace `outline-none` with a visible focus state, such as `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color]` to ensure focus is clearly indicated while avoiding default browser outlines on mouse clicks.
## 2024-05-04 - Code Block Interaction
**Learning:** Users often try to click code snippet blocks to copy them, not just the associated copy button. Making the `<pre>` block interactive provides a better UX. It's important to remember to add `role="button"`, `tabIndex={0}`, and an `onKeyDown` handler (listening for Space/Enter) to maintain accessibility when turning non-interactive elements into interactive ones.
**Action:** When adding copy-to-clipboard functionality to code snippets, always consider making the code block itself an interactive, accessible button.

## 2026-05-16 - ARIA labels overriding text
**Learning:** When adding `aria-label` to a button, the screen reader will read the `aria-label` and completely ignore any text nodes inside the button. This can be an anti-pattern if the button already has visible text, as the screen reader user will not hear the visible text (or the descriptive text in a child span).
**Action:** Use `aria-label` primarily for icon-only buttons. For buttons with visible text, ensure the text itself is descriptive, or use `aria-describedby` if extra context is needed without overriding the main text.
