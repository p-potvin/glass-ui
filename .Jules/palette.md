## 2026-05-03 - Focus Indicators for Accessibility
**Learning:** Using `outline-none` on native form elements like `<select>` and `<input type="color">` without providing a custom `focus-visible` alternative completely removes keyboard focus indicators. This severely degrades accessibility for users navigating via keyboard.
**Action:** Always replace `outline-none` with a visible focus state, such as `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color]` to ensure focus is clearly indicated while avoiding default browser outlines on mouse clicks.
