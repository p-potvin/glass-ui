## 2026-05-03 - Focus Indicators for Accessibility
**Learning:** Using `outline-none` on native form elements like `<select>` and `<input type="color">` without providing a custom `focus-visible` alternative completely removes keyboard focus indicators. This severely degrades accessibility for users navigating via keyboard.
**Action:** Always replace `outline-none` with a visible focus state, such as `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color]` to ensure focus is clearly indicated while avoiding default browser outlines on mouse clicks.
## 2024-05-04 - Code Block Interaction
**Learning:** Users often try to click code snippet blocks to copy them, not just the associated copy button. Making the `<pre>` block interactive provides a better UX. It's important to remember to add `role="button"`, `tabIndex={0}`, and an `onKeyDown` handler (listening for Space/Enter) to maintain accessibility when turning non-interactive elements into interactive ones.
**Action:** When adding copy-to-clipboard functionality to code snippets, always consider making the code block itself an interactive, accessible button.
## 2024-03-24 - Focus States and Code Cleanup
**Learning:** Found that orphaned interactive elements (like the corrupted `copyCss` block) can not only break compilation but also degrade the accessibility experience for keyboard users by creating "phantom" tab stops. Ensuring clean semantic HTML is a prerequisite for reliable keyboard navigation.
**Action:** When adding accessibility features (like `focus-visible` outlines), always perform a quick structural check of the surrounding component tree to ensure there are no orphaned or functionally broken elements creating false accessibility paths.
