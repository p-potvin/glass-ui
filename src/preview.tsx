import React from 'react'
import ReactDOM from 'react-dom/client'
import { GlassPanel, GlassVariant } from './components/GlassPanel'
import './index.css'

import { LiquidGlassEffect } from './components/glass/LiquidGlass'

const variants: GlassVariant[] = [
  'liquid',
  'vibrant',
  'solarized-frosted',
  'frosted',
  'clear',
  'subtle',
]

/** Distinct background per variant so the glass differences are actually visible */
const variantBackgrounds: Record<GlassVariant, string> = {
  liquid:
    'bg-gradient-to-br from-[#073642] via-[#002b36] to-[#586e75]',
  vibrant:
    'bg-gradient-to-br from-[#268bd2] via-[#6c71c4] to-[#d33682]',
  'solarized-frosted':
    'bg-gradient-to-br from-[#eee8d5] via-[#fdf6e3] to-[#93a1a1]',
  frosted:
    'bg-gradient-to-br from-[#586e75] via-[#839496] to-[#93a1a1]',
  clear:
    'bg-gradient-to-br from-[#002b36] via-[#073642] to-[#2aa198]',
  subtle:
    'bg-gradient-to-br from-[#073642] via-[#002b36] to-[#073642]',
}

const variantTextColor: Record<GlassVariant, string> = {
  liquid: 'text-[#fdf6e3]',
  vibrant: 'text-white',
  'solarized-frosted': 'text-[#586e75]',
  frosted: 'text-white',
  clear: 'text-[#93a1a1]',
  subtle: 'text-[#839496]',
}

const variantDescriptions: Record<GlassVariant, string> = {
  liquid: 'Deep transparent layer with soft glow — use over dark imagery.',
  vibrant: 'Colour-shifted gradient blur — bold accent for hero sections.',
  'solarized-frosted': 'Warm frosted pane tuned for the Solarized Light palette.',
  frosted: 'Classic heavy blur — works on mid-tone or photographic backgrounds.',
  clear: 'Barely-there tint with light blur — keeps content highly readable.',
  subtle: 'Almost invisible 2 px blur — useful for layered depth without obstruction.',
}

function Preview() {
  return (
    <main className="min-h-screen px-6 py-12 text-[#657b83]">
      <header className="mx-auto max-w-5xl text-center">
        <img
          src="https://raw.githubusercontent.com/p-potvin/vaultwares-docs/main/logo/vaultwares-logo.svg"
          alt="VaultWares"
          className="mx-auto mb-4 h-12"
        />
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-[#586e75]">
          vault-flows
        </h1>
        <p className="mt-2 text-sm font-medium text-[#268bd2]">
          AI Workflow GUI & Local Runtime Bridge · Part of the{' '}
          <a href="https://vaultwares.com" className="underline hover:opacity-80">VaultWares Ecosystem</a>
        </p>
        <p className="mt-4 text-lg text-[#93a1a1]">
          Explore every glass style side-by-side. Each card uses a background
          chosen to highlight the unique effect of that variant.
        </p>
      </header>

      <section className="mx-auto mt-12 flex max-w-5xl flex-col gap-12">
        {/* ── WebGL Liquid Glass ────────────────────────────── */}
        <div>
          <h2 className="text-2xl font-semibold text-[#586e75]">Liquid Glass (WebGL)</h2>
          <p className="mt-1 text-sm text-[#93a1a1]">
            Real-time refractive glass rendered with React Three Fiber. Hover to
            see the slab warp the backdrop orbs through chromatic aberration.
          </p>
          <div className="mt-4">
            <LiquidGlassEffect />
          </div>
        </div>

        {/* ── CSS Variant Grid ──────────────────────────────── */}
        <div>
          <h2 className="text-2xl font-semibold text-[#586e75]">CSS Variants</h2>
          <p className="mt-1 text-sm text-[#93a1a1]">
            Pure CSS glassmorphism via <code className="rounded bg-[#eee8d5] px-1 py-0.5">GlassPanel</code>.
            Each card sits on a tailored backdrop so you can see the actual difference.
          </p>

          <div className="mt-4 grid gap-6 lg:grid-cols-3">
            {variants.map((variant) => (
              <div
                key={variant}
                className={`rounded-2xl p-3 ${variantBackgrounds[variant]}`}
              >
                <GlassPanel variant={variant} className="h-52 p-5">
                  <div className="flex h-full flex-col justify-between">
                    <div>
                      <h3 className={`text-lg font-semibold ${variantTextColor[variant]}`}>
                        {variant}
                      </h3>
                      <p className={`mt-2 text-sm ${variantTextColor[variant]} opacity-80`}>
                        {variantDescriptions[variant]}
                      </p>
                    </div>
                    <p className={`text-xs ${variantTextColor[variant]} opacity-50`}>
                      variant=&quot;{variant}&quot;
                    </p>
                  </div>
                </GlassPanel>
              </div>
            ))}
          </div>
        </div>

        {/* ── Interactive Designer ──────────────────────────── */}
        <GlassExample />

        {/* ── Scroll Demo ──────────────────────────────────── */}
        <ScrollDemo />

        <footer className="mx-auto max-w-5xl rounded-2xl bg-[#eee8d5] p-6 text-sm text-[#657b83]">
          <p>
            Preview source:{' '}
            <code className="rounded bg-[#fdf6e3] px-1 py-0.5">index.html</code> +{' '}
            <code className="rounded bg-[#fdf6e3] px-1 py-0.5">src/preview.tsx</code>.
            See <code className="rounded bg-[#fdf6e3] px-1 py-0.5">README.md</code> for build &amp; deploy instructions.
          </p>
        </footer>
      </section>
    </main>
  )
}

function GlassExample() {
  const [variant, setVariant] = React.useState<GlassVariant>('frosted')
  const [tintColor, setTintColor] = React.useState<string>('#7c3aed')
  const [tintOpacity, setTintOpacity] = React.useState<number>(0.08)
  const [blurPx, setBlurPx] = React.useState<number>(8)
  const [radius, setRadius] = React.useState<number>(16)
  const [shadow, setShadow] = React.useState<boolean>(true)
  const [copied, setCopied] = React.useState(false)

  function hexToRgba(hex: string, alpha = 1) {
    const h = hex.replace('#', '')
    if (h.length === 3) {
      const r = parseInt(h[0] + h[0], 16)
      const g = parseInt(h[1] + h[1], 16)
      const b = parseInt(h[2] + h[2], 16)
      return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }
    if (h.length >= 6) {
      const r = parseInt(h.slice(0, 2), 16)
      const g = parseInt(h.slice(2, 4), 16)
      const b = parseInt(h.slice(4, 6), 16)
      return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }
    return hex
  }

  const cssString = `background-color: ${hexToRgba(tintColor, tintOpacity)};\nbackdrop-filter: blur(${blurPx}px);\nborder-radius: ${radius}px;\nbox-shadow: ${shadow ? '0 12px 40px rgba(2,6,23,0.6)' : 'none'};`

  async function copyCss() {
    if (!navigator?.clipboard) return
    try {
      await navigator.clipboard.writeText(cssString)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch (e) {
      /* ignore */
    }
  }
  return (
    <section>
      <div>
        <h2 className="text-2xl font-semibold text-[#586e75]">Interactive example</h2>
        <p className="mt-2 max-w-md text-sm text-[#93a1a1]">Live designer controls: tint, blur, radius, and shadow.</p>
      </div>

      <div className="mt-6">
        <GlassPanel
          variant={variant}
          tint={tintColor}
          tintOpacity={tintOpacity}
          blur={blurPx}
          style={{ borderRadius: `${radius}px`, boxShadow: shadow ? '0 12px 40px rgba(0,0,0,0.1)' : 'none' }}
          className="h-64 p-4 border border-[#93a1a1]/20 bg-white/20"
        >
          <div className="flex h-full gap-4">
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <p className="text-lg font-semibold text-[#586e75]">Live designer</p>
                <p className="mt-2 text-sm text-[#657b83]">Adjust settings and copy the resulting CSS.</p>
              </div>

              <div className="text-xs text-[#93a1a1]">Previewed with `GlassPanel` props applied.</div>
            </div>

            <div className="w-64 flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <select
                  value={variant}
                  onChange={(e) => setVariant(e.target.value as GlassVariant)}
                  data-no-drag
                  className="rounded-lg border border-[#93a1a1]/20 bg-[#eee8d5] px-2 py-1 text-[#657b83] text-sm outline-none w-32"
                >
                  {variants.map((v) => (
                    <option key={v} value={v} className="bg-[#eee8d5] text-[#657b83]">
                      {v}
                    </option>
                  ))}
                </select>

                <input
                  type="color"
                  value={tintColor}
                  onChange={(e) => setTintColor(e.target.value)}
                  data-no-drag
                  className="w-9 h-9 rounded-md border border-[#93a1a1]/20 p-0"
                />
              </div>

              <div className="flex items-center gap-2">
                <div className="text-xs text-[#586e75]">Opacity</div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={Math.round(tintOpacity * 100)}
                  onChange={(e) => setTintOpacity(Number(e.target.value) / 100)}
                  data-no-drag
                  className="h-2 w-28 accent-[#268bd2]"
                />
                <div className="text-xs text-[#657b83]">{Math.round(tintOpacity * 100)}%</div>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-xs text-[#586e75]">Blur</div>
                <input
                  type="range"
                  min={0}
                  max={40}
                  value={blurPx}
                  onChange={(e) => setBlurPx(Number(e.target.value))}
                  data-no-drag
                  className="h-2 w-28 accent-[#268bd2]"
                />
                <div className="text-xs text-[#657b83]">{blurPx}px</div>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-xs text-[#586e75]">Radius</div>
                <input
                  type="range"
                  min={0}
                  max={48}
                  value={radius}
                  onChange={(e) => setRadius(Number(e.target.value))}
                  data-no-drag
                  className="h-2 w-28 accent-[#268bd2]"
                />
                <div className="text-xs text-[#657b83]">{radius}px</div>
              </div>

              <div className="flex items-center justify-between gap-2">
                <label className="flex items-center gap-2 text-sm text-[#586e75]">
                  Shadow
                  <input
                    type="checkbox"
                    checked={shadow}
                    onChange={(e) => setShadow(e.target.checked)}
                    data-no-drag
                    className="h-4 w-4 accent-[#268bd2]"
                  />
                </label>

                <button
                  onClick={copyCss}
                  data-no-drag
                  className="rounded-md bg-[#268bd2] px-3 py-1 text-sm font-medium text-white"
                >
                  {copied ? 'Copied' : 'Copy CSS'}
                </button>
              </div>

              <pre className="mt-1 overflow-auto rounded-md bg-[#fdf6e3] border border-[#93a1a1]/20 px-3 py-2 text-xs text-[#586e75] h-24">{cssString}</pre>
            </div>
          </div>
        </GlassPanel>
      </div>
    </section>
  )
}

function ScrollDemo() {
  const blocks = [
    {
      title: 'Dark backdrop',
      description:
        'Deep solarized tones show how the glass blur softens strong contrast while keeping text legible.',
      bg: 'bg-gradient-to-br from-[#002b36] via-[#073642] to-[#586e75]',
      textClass: 'text-[#93a1a1]',
    },
    {
      title: 'Warm accent backdrop',
      description:
        'Orange and magenta hues bleed through the glass tint, demonstrating colour interaction.',
      bg: 'bg-gradient-to-br from-[#cb4b16]/40 via-[#d33682]/30 to-[#6c71c4]/30',
      textClass: 'text-[#586e75]',
    },
    {
      title: 'Cool accent backdrop',
      description:
        'Cyan and green tones paired with a light base let the glass effect stay airy.',
      bg: 'bg-gradient-to-br from-[#268bd2]/20 via-[#2aa198]/20 to-[#859900]/20',
      textClass: 'text-[#586e75]',
    },
  ]

  const [variant, setVariant] = React.useState<GlassVariant>('frosted')
  const [stickyTint, setStickyTint] = React.useState<string>('#ffffff')
  const [stickyTintOpacity, setStickyTintOpacity] = React.useState<number>(0.06)
  const [stickyBlurPx, setStickyBlurPx] = React.useState<number>(6)

  return (
    <section>
      <h2 className="text-2xl font-semibold text-[#586e75]">Scroll overlay demo</h2>
      <p className="mt-1 text-sm text-[#93a1a1]">
        The sticky glass panel stays fixed while the coloured blocks scroll
        beneath it — watch the blur adapt to each backdrop.
      </p>

      <div className="mt-4 rounded-2xl border border-[#93a1a1]/20 bg-[#eee8d5]">
        <div className="relative h-[600px] overflow-auto">
          <GlassPanel
            variant={variant}
            tint={stickyTint}
            tintOpacity={stickyTintOpacity}
            blur={stickyBlurPx}
            className="sticky top-4 mx-4 mt-4 z-10 p-4 shadow-xl"
          >
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="min-w-[180px]">
                <h3 className="text-lg font-semibold text-[#586e75]">Sticky glass overlay</h3>
                <p className="text-sm text-[#657b83]">
                  Scroll down to see the effect over each coloured backdrop.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <label className="text-xs text-[#586e75] w-12">Variant</label>
                  <select
                    value={variant}
                    onChange={(e) => setVariant(e.target.value as GlassVariant)}
                    className="rounded-lg border border-[#93a1a1]/20 bg-[#eee8d5] px-2 py-1 text-[#657b83] outline-none text-sm w-36"
                  >
                    {variants.map((v) => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-[#586e75] w-12">Tint</label>
                  <input type="color" value={stickyTint} onChange={(e) => setStickyTint(e.target.value)} className="w-8 h-8 rounded-md border border-[#93a1a1]/20 p-0" />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-[#586e75] w-12">Opacity</label>
                  <input type="range" min={0} max={100} value={Math.round(stickyTintOpacity * 100)} onChange={(e) => setStickyTintOpacity(Number(e.target.value) / 100)} className="h-2 w-24 accent-[#268bd2]" />
                  <span className="text-xs text-[#657b83] w-8">{Math.round(stickyTintOpacity * 100)}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-[#586e75] w-12">Blur</label>
                  <input type="range" min={0} max={40} value={stickyBlurPx} onChange={(e) => setStickyBlurPx(Number(e.target.value))} className="h-2 w-24 accent-[#268bd2]" />
                  <span className="text-xs text-[#657b83] w-8">{stickyBlurPx}px</span>
                </div>
              </div>
            </div>
          </GlassPanel>

          <div className="space-y-6 px-4 pb-8 pt-6">
            {blocks.map((block, i) => (
              <div
                key={i}
                className={`rounded-2xl p-8 ${block.bg} ${block.textClass} min-h-[280px] flex flex-col justify-center`}
              >
                <h4 className="text-2xl font-semibold">{block.title}</h4>
                <p className="mt-3 text-base opacity-85">{block.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const root = document.getElementById('root')
if (root) {
  ReactDOM.createRoot(root).render(<Preview />)
}
