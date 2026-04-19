# glass-ui

A Glass Rendering engine for all your Web Apps (React.js/Tailwind). Supports multiple glass styles and is easily customizable.

## Components

### `GlassPanel`

A flexible panel with customizable glassmorphism effects.

**Variants:** `liquid` | `vibrant` | `solarized-frosted` | `frosted` | `clear` | `subtle`

```tsx
import { GlassPanel } from 'glass-ui'

<GlassPanel variant="frosted" tint="#7c3aed" tintOpacity={0.12} blur={10}>
  Your content here
</GlassPanel>
```

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `variant` | `GlassVariant` | `'frosted'` | Visual style preset |
| `className` | `string` | `''` | Additional Tailwind classes |
| `tint` | `string` | — | Hex or CSS color override for the background |
| `tintOpacity` | `number` | `0.08` | Opacity applied when `tint` is a hex value |
| `blur` | `number` | — | Backdrop blur in px (overrides variant default) |
| `style` | `CSSProperties` | — | Inline styles merged last |

---

### `LiquidGlassEffect`

A 3-D liquid glass panel powered by **React Three Fiber** and **@react-three/drei**. Renders a transmissive, refractive rounded slab floating above coloured backdrop orbs — inspired by the iOS 26 liquid-glass aesthetic.

> **Peer dependencies:** `@react-three/fiber`, `@react-three/drei`, `three` must be installed in the consuming project.

```bash
npm install @react-three/fiber @react-three/drei three
```

```tsx
import { LiquidGlassEffect } from 'glass-ui'

<LiquidGlassEffect />
```

The component is self-contained (no props required) and fills the width of its parent with a fixed `h-96` height. It sets up its own `Canvas`, lighting, environment map, and animated geometry internally.

**Key material properties (`MeshTransmissionMaterial`):**

| Property | Value | Effect |
| -------- | ----- | ------ |
| `transmission` | `1` | Fully transmissive (glass-like) |
| `ior` | `1.4` | Index of refraction (similar to glass) |
| `chromaticAberration` | `0.05` | Subtle rainbow fringing at edges |
| `distortion` | `0.2` | Warps background seen through the slab |
| `roughness` | `0.05` | Near-perfect specular highlight |
| `temporalDistortion` | `0.1` | Animates the distortion over time |

---

## 📦 Preview the glass effects

A small preview app is included to explore the supported glass variants.

```bash
npm install
npm run dev
```

Then open <http://localhost:5173> in your browser.

## 🚀 Deploy the preview to GitHub Pages

This repo includes a simple static preview site built into the `docs/` folder.

1. Build the preview site:

   ```bash
   npm run build:preview
   ```

2. Commit and push the generated `docs/` folder:

   ```bash
   git add docs
   git commit -m "Deploy preview site"
   git push
   ```

3. In the GitHub repo settings, enable Pages and select the `main` branch + `/docs` folder as the source.

> ✅ Tip: If you want to deploy to a project page (e.g. `https://<user>.github.io/<repo>/`), the site is already built with relative URLs (`base = './'`), so it should work without extra configuration.
