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

function Preview() {
  return (
    <main className="min-h-screen px-6 py-12 text-[#657b83]">
      <header className="mx-auto max-w-5xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-[#586e75]">
          glass-ui preview
        </h1>
        <p className="mt-4 text-lg text-[#93a1a1]">
          A quick preview of the supported glass variants. Change the selection to see how the glass
          effect updates.
        </p>
      </header>

      <section className="mx-auto mt-12 flex max-w-5xl flex-col gap-8">
        <LiquidGlassEffect />

        <GlassExample />

        <ScrollDemo />

        <div className="grid gap-6 lg:grid-cols-3">
          {variants.map((variant) => (
            <GlassPanel
              key={variant}
              variant={variant}
              className="h-56 p-6"
            >
              <div className="flex h-full flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-[#586e75]">{variant}</h2>
                  <p className="mt-2 text-sm text-[#657b83]">
                    Example of the <span className="font-medium">{variant}</span> glass style.
                  </p>
                </div>

                <p className="text-xs text-[#93a1a1]">
                  Imported from <code className="rounded bg-[#eee8d5] px-1 py-0.5">GlassPanel</code>
                </p>
              </div>
            </GlassPanel>
          ))}
        </div>

        <footer className="mx-auto max-w-5xl rounded-2xl bg-[#eee8d5] p-6 text-sm text-[#657b83]">
          <p>
            This preview page is stored in <code className="rounded bg-[#fdf6e3] px-1 py-0.5">index.html</code> and
            <code className="rounded bg-[#fdf6e3] px-1 py-0.5">src/preview.tsx</code>.
          </p>
          <p className="mt-2">
            To deploy this preview site, read the instructions in <code className="rounded bg-[#fdf6e3] px-1 py-0.5">README.md</code>.
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
  const baseBlocks = [
    {
      title: 'Light text on dark background',
      description:
        'Dark backgrounds make the glass feel more like frosted glass. Use this when you need strong contrast.',
      bg: 'bg-gradient-to-br from-[#eee8d5] via-[#fdf6e3] to-[#eee8d5]',
      textClass: 'text-[#657b83]',
    },
    {
      title: 'Dark text on light background',
      description:
        'Light, soft backgrounds look great with a subtle glass tint and provide a clean aesthetic.',
      bg: 'bg-gradient-to-br from-[#268bd2]/10 via-[#2aa198]/10 to-[#859900]/10',
      textClass: 'text-[#586e75]',
    },
    {
      title: 'Colorful contrast',
      description:
        'Brighter colors show how blur and transparency blend with saturated hues.',
      bg: 'bg-gradient-to-br from-[#cb4b16]/20 via-[#d33682]/20 to-[#6c71c4]/20',
      textClass: 'text-[#657b83]',
    },
  ]

  // repeat blocks to create a longer scrollable area
  const longBlocks = Array.from({ length: 6 }).flatMap((_, i) =>
    baseBlocks.map((b, j) => ({ ...b, id: `${i}-${j}` }))
  )

  const [variant, setVariant] = React.useState<GlassVariant>('frosted')
  const [stickyTint, setStickyTint] = React.useState<string>('#ffffff')
  const [stickyTintOpacity, setStickyTintOpacity] = React.useState<number>(0.06)
  const [stickyBlurPx, setStickyBlurPx] = React.useState<number>(6)

  return (
    <section>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold text-[#586e75]">Scrolling background demo</h2>
        <p className="text-sm text-[#93a1a1]">
          Scroll inside the section to see the glass panel overlay different backgrounds and text contrast.
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-[#93a1a1]/20 bg-[#eee8d5]">
        <div className="relative h-[820px] overflow-auto">
          <div className="flex items-center justify-between gap-3 sticky top-4 z-10 px-6 pt-4">
            <h3 className="text-lg font-semibold text-[#586e75]">Sticky glass overlay</h3>
          </div>

          <GlassPanel
            variant={variant}
            tint={stickyTint}
            tintOpacity={stickyTintOpacity}
            blur={stickyBlurPx}
            className="sticky top-20 mx-6 mb-6 p-4 shadow-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-[#586e75]">Sticky glass overlay</h3>
                <p className="text-sm text-[#657b83]">
                  The glass panel stays fixed while the background content scrolls beneath it.
                </p>
                <p className="text-xs text-[#93a1a1]">
                  This helps you see how the glass effect behaves with different contrasts and colors.
                </p>
              </div>

              <div className="w-64 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <label className="text-sm text-[#586e75]">Variant</label>
                  <select
                    value={variant}
                    onChange={(e) => setVariant(e.target.value as GlassVariant)}
                    data-no-drag
                    className="rounded-lg border border-[#93a1a1]/20 bg-[#eee8d5] px-2 py-1 text-[#657b83] outline-none text-sm w-32"
                  >
                    {variants.map((v) => (
                      <option key={v} value={v} className="bg-[#eee8d5] text-[#657b83]">
                        {v}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-sm text-[#586e75]">Tint</label>
                  <input
                    type="color"
                    value={stickyTint}
                    onChange={(e) => setStickyTint(e.target.value)}
                    data-no-drag
                    className="w-8 h-8 rounded-md border border-white/12 p-0"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-sm text-[#586e75]">Opacity</label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={Math.round(stickyTintOpacity * 100)}
                    onChange={(e) => setStickyTintOpacity(Number(e.target.value) / 100)}
                    data-no-drag
                    className="h-2 w-28 accent-[#268bd2]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-sm text-[#586e75]">Blur</label>
                  <input
                    type="range"
                    min={0}
                    max={40}
                    value={stickyBlurPx}
                    onChange={(e) => setStickyBlurPx(Number(e.target.value))}
                    data-no-drag
                    className="h-2 w-28 accent-[#268bd2]"
                  />
                </div>
              </div>
            </div>
          </GlassPanel>

          <div className="space-y-6 px-6 pb-12 pt-44">
            {longBlocks.map((block) => (
              <div
                key={block.id}
                className={`rounded-2xl p-8 shadow-inner ${block.bg} ${block.textClass} min-h-[320px]`}
              >
                <h4 className="text-2xl font-semibold text-current">{block.title}</h4>
                <p className="mt-3 text-base text-current/85">{block.description}</p>
                <p className="mt-6 text-sm text-current/70">
                  Scroll further to see the glass effect adapt to new backgrounds.
                </p>
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
