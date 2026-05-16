## 2026-05-08 - Keyboard Navigation in Glassmorphism UIs
**Learning:** Adding `focus-visible` styles with offset rings (`focus-visible:ring-offset-2`) is critical for visibility against varied colored glass backgrounds. The default browser focus ring often gets lost in the blur or gradient of the glassmorphism elements.
**Action:** Always include a `focus-visible:ring-offset-surface` or `focus-visible:ring-offset-primary` matching the underlying background color when styling interactive elements placed on top of glass panels.
