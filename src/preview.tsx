import React from 'react'
import ReactDOM from 'react-dom/client'
import { GlassPanel, GlassVariant } from './components/GlassPanel'

const variants: GlassVariant[] = [
  'frosted',
  'clear',
  'tinted',
  'ultra-clear',
  'subtle',
  'soft-tint',
]

function Preview() {
  return (
    <main className="min-h-screen px-6 py-12">
      <header className="mx-auto max-w-5xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          glass-ui preview
        </h1>
        <p className="mt-4 text-lg text-white/70">
          A quick preview of the supported glass variants. Change the selection to see how the glass
          effect updates.
        </p>
      </header>

      <section className="mx-auto mt-12 flex max-w-5xl flex-col gap-8">
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
                  <h2 className="text-xl font-semibold text-white">{variant}</h2>
                  <p className="mt-2 text-sm text-white/80">
                    Example of the <span className="font-medium">{variant}</span> glass style.
                  </p>
                </div>

                <p className="text-xs text-white/60">
                  Imported from <code className="rounded bg-white/10 px-1 py-0.5">GlassPanel</code>
                </p>
              </div>
            </GlassPanel>
          ))}
        </div>

        <footer className="mx-auto max-w-5xl rounded-2xl bg-white/10 p-6 text-sm text-white/70">
          <p>
            This preview page is stored in <code className="rounded bg-white/10 px-1 py-0.5">index.html</code> and
            <code className="rounded bg-white/10 px-1 py-0.5">src/preview.tsx</code>.
          </p>
          <p className="mt-2">
            To deploy this preview site, read the instructions in <code className="rounded bg-white/10 px-1 py-0.5">README.md</code>.
          </p>
        </footer>
      </section>
      <DraggableGlass />
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
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-white">Interactive example</h2>
          <p className="mt-2 max-w-md text-sm text-white/70">
            Live designer controls: tint, blur, radius, and shadow.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 rounded-xl bg-white/6 p-3">
          <label className="flex items-center gap-2 text-sm text-white/80">
            Variant
            <select
              value={variant}
              onChange={(e) => setVariant(e.target.value as GlassVariant)}
              className="rounded-lg border border-white/12 bg-white/8 px-2 py-1 text-white text-sm outline-none"
            >
              {variants.map((v) => (
                <option key={v} value={v} className="bg-slate-900 text-black">
                  {v}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-2 text-sm text-white/80">
            Tint
            <input
              type="color"
              value={tintColor}
              onChange={(e) => setTintColor(e.target.value)}
              data-no-drag
              className="w-9 h-9 rounded-md border border-white/12 p-0"
            />
          </label>

          <label className="flex items-center gap-2 text-sm text-white/80">
            Opacity
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(tintOpacity * 100)}
              onChange={(e) => setTintOpacity(Number(e.target.value) / 100)}
              data-no-drag
              className="h-2 w-28 accent-indigo-400"
            />
          </label>
        </div>
      </div>

      <div className="mt-6">
        <GlassPanel
          variant={variant}
          tint={tintColor}
          tintOpacity={tintOpacity}
          blur={blurPx}
          style={{ borderRadius: `${radius}px`, boxShadow: shadow ? '0 12px 40px rgba(2,6,23,0.6)' : 'none' }}
          className="h-64"
        >
          <div className="flex h-full flex-col justify-between">
            <div>
              <p className="text-lg font-semibold text-white">Live designer</p>
              <p className="mt-2 text-sm text-white/70">Adjust settings and copy the resulting CSS.</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-xs text-white/80">Blur</div>
                <input
                  type="range"
                  min={0}
                  max={40}
                  value={blurPx}
                  onChange={(e) => setBlurPx(Number(e.target.value))}
                  data-no-drag
                  className="h-2 w-40 accent-indigo-400"
                />
                <div className="text-xs text-white/60">{blurPx}px</div>
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm text-white/80">
                  Radius
                  <input
                    type="range"
                    min={0}
                    max={48}
                    value={radius}
                    onChange={(e) => setRadius(Number(e.target.value))}
                    data-no-drag
                    className="h-2 w-28 accent-indigo-400"
                  />
                </label>

                <label className="flex items-center gap-2 text-sm text-white/80">
                  Shadow
                  <input
                    type="checkbox"
                    checked={shadow}
                    onChange={(e) => setShadow(e.target.checked)}
                    data-no-drag
                    className="h-4 w-4 accent-indigo-400"
                  />
                </label>
              </div>
            </div>
          </div>
        </GlassPanel>

        <div className="mt-3 flex items-start gap-3">
          <pre className="flex-1 overflow-auto rounded-md bg-black/30 px-3 py-2 text-xs text-white/80">{cssString}</pre>
          <button
            onClick={copyCss}
            data-no-drag
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white"
          >
            {copied ? 'Copied' : 'Copy CSS'}
          </button>
        </div>
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
      bg: 'bg-gradient-to-br from-slate-950 via-indigo-950 to-rose-950',
      textClass: 'text-white',
    },
    {
      title: 'Dark text on light background',
      description:
        'Light, soft backgrounds look great with a subtle glass tint and provide a clean aesthetic.',
      bg: 'bg-gradient-to-br from-white/10 via-white/5 to-white/10',
      textClass: 'text-slate-900',
    },
    {
      title: 'Colorful contrast',
      description:
        'Brighter colors show how blur and transparency blend with saturated hues.',
      bg: 'bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-600',
      textClass: 'text-white',
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
        <h2 className="text-2xl font-semibold text-white">Scrolling background demo</h2>
        <p className="text-sm text-white/70">
          Scroll inside the section to see the glass panel overlay different backgrounds and text contrast.
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-white/20 bg-white/5">
        <div className="relative h-[820px] overflow-auto">
          <div className="flex items-center justify-between gap-3 sticky top-4 z-10 px-6 pt-4">
            <h3 className="text-lg font-semibold text-white">Sticky glass overlay</h3>
              <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2">
                <label htmlFor="scrollVariant" className="text-sm font-medium text-white/80">
                  Variant
                </label>
                <select
                  id="scrollVariant"
                  value={variant}
                  onChange={(e) => setVariant(e.target.value as GlassVariant)}
                  className="rounded-lg border border-white/20 bg-white/10 px-2 py-1 text-white outline-none text-sm"
                >
                  {variants.map((v) => (
                    <option key={v} value={v} className="bg-slate-900">
                      {v}
                    </option>
                  ))}
                </select>

                <label className="flex items-center gap-2 text-sm text-white/80">
                  Tint
                  <input
                    type="color"
                    value={stickyTint}
                    onChange={(e) => setStickyTint(e.target.value)}
                    data-no-drag
                    className="w-8 h-8 rounded-md border border-white/12 p-0"
                  />
                </label>

                <label className="flex items-center gap-2 text-sm text-white/80">
                  Opacity
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={Math.round(stickyTintOpacity * 100)}
                    onChange={(e) => setStickyTintOpacity(Number(e.target.value) / 100)}
                    data-no-drag
                    className="h-2 w-24 accent-indigo-400"
                  />
                </label>

                <label className="flex items-center gap-2 text-sm text-white/80">
                  Blur
                  <input
                    type="range"
                    min={0}
                    max={40}
                    value={stickyBlurPx}
                    onChange={(e) => setStickyBlurPx(Number(e.target.value))}
                    data-no-drag
                    className="h-2 w-24 accent-indigo-400"
                  />
                </label>
              </div>
          </div>

          <GlassPanel
            variant={variant}
            tint={stickyTint}
            tintOpacity={stickyTintOpacity}
            blur={stickyBlurPx}
            className="sticky top-20 mx-6 mb-6 p-6 shadow-xl"
          >
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">Sticky glass overlay</h3>
              <p className="text-sm text-white/70">
                The glass panel stays fixed while the background content scrolls beneath it.
              </p>
              <p className="text-xs text-white/60">
                This helps you see how the glass effect behaves with different contrasts and colors.
              </p>
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

function DraggableGlass() {
  const [variant, setVariant] = React.useState<GlassVariant>('frosted')
  const [pos, setPos] = React.useState({ x: 32, y: 160 })
  const dragging = React.useRef(false)
  const offset = React.useRef({ x: 0, y: 0 })
  const [tintColor, setTintColor] = React.useState<string>('#ffffff')
  const [tintOpacity, setTintOpacity] = React.useState<number>(0.06)
  const [blurPx, setBlurPx] = React.useState<number>(6)
  const [radiusPx, setRadiusPx] = React.useState<number>(12)
  const [shadow, setShadow] = React.useState<boolean>(true)

  React.useEffect(() => {
    function onMove(e: MouseEvent) {
      if (!dragging.current) return
      const clientX = e.clientX
      const clientY = e.clientY
      setPos(() => {
        const left = Math.max(8, clientX - offset.current.x)
        const top = Math.max(8, clientY - offset.current.y)
        const vw = window.innerWidth
        const vh = window.innerHeight
        const clampedX = Math.min(left, vw - 220)
        const clampedY = Math.min(top, vh - 80)
        return { x: clampedX, y: clampedY }
      })
    }

    function onTouchMove(e: TouchEvent) {
      if (!dragging.current) return
      // prevent scrolling while dragging
      if (e.cancelable) e.preventDefault()
      const t = (e.touches && e.touches[0]) || (e.changedTouches && e.changedTouches[0])
      if (!t) return
      const clientX = t.clientX
      const clientY = t.clientY
      setPos(() => {
        const left = Math.max(8, clientX - offset.current.x)
        const top = Math.max(8, clientY - offset.current.y)
        const vw = window.innerWidth
        const vh = window.innerHeight
        const clampedX = Math.min(left, vw - 220)
        const clampedY = Math.min(top, vh - 80)
        return { x: clampedX, y: clampedY }
      })
    }
    function onUp() {
      dragging.current = false
      document.body.style.userSelect = ''
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    // touch support (passive: false so we can preventDefault during move)
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchmove', onTouchMove as EventListener)
      window.removeEventListener('touchend', onUp)
    }
  }, [])

  function startDrag(e: React.MouseEvent) {
    dragging.current = true
    offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y }
    document.body.style.userSelect = 'none'
  }

  function startDragTouch(e: React.TouchEvent) {
    // prevent page from scrolling while initiating drag
    e.preventDefault()
    dragging.current = true
    const t = e.touches && e.touches[0]
    if (!t) return
    offset.current = { x: t.clientX - pos.x, y: t.clientY - pos.y }
    document.body.style.userSelect = 'none'
  }

  function reset() {
    setPos({ x: 32, y: 160 })
  }

  function isInteractiveTarget(target: EventTarget | null) {
    if (!(target instanceof HTMLElement)) return false
    // interactive elements: inputs, selects, textareas, buttons, links, labels
    const interactive = target.closest('input,select,textarea,button,a,label,[data-no-drag]')
    return !!interactive
  }

  function startDragIfAllowed(e: React.MouseEvent | React.TouchEvent) {
    const target = (e as any).target as EventTarget
    if (isInteractiveTarget(target)) return
    // handle mouse or touch start
    if ('touches' in e) startDragTouch(e as React.TouchEvent)
    else startDrag(e as React.MouseEvent)
  }

  return (
    <div
      style={{ left: pos.x, top: pos.y }}
      className="fixed z-50 w-72 cursor-grab"
      onMouseDown={startDragIfAllowed}
      onTouchStart={startDragIfAllowed}
    >
      <GlassPanel
        variant={variant}
        tint={tintColor}
        tintOpacity={tintOpacity}
        blur={blurPx}
        style={{ borderRadius: `${radiusPx}px`, boxShadow: shadow ? '0 10px 30px rgba(2,6,23,0.6)' : 'none' }}
        className="p-0"
      >
        <div className="p-3">
          <div className="flex items-center justify-between">
            <div className="text-sm text-white">
              <strong className="block text-xs">Drag this panel</strong>
              <span className="block text-xs text-white/70">Tap and drag anywhere (controls are interactive)</span>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={variant}
                onChange={(e) => setVariant(e.target.value as GlassVariant)}
                data-no-drag
                className="rounded bg-white/10 px-2 py-1 text-sm text-white"
              >
                {variants.map((v) => (
                  <option key={v} value={v} className="bg-slate-900 text-black">
                    {v}
                  </option>
                ))}
              </select>
              <button
                onClick={reset}
                data-no-drag
                className="ml-2 rounded bg-white/10 px-2 py-1 text-xs text-white/80"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-white/80">
              Tint
              <input
                type="color"
                value={tintColor}
                onChange={(e) => setTintColor(e.target.value)}
                data-no-drag
                className="w-8 h-8 rounded-md border border-white/12 p-0"
              />
            </label>

            <label className="flex items-center gap-2 text-sm text-white/80">
              Opacity
              <input
                type="range"
                min={0}
                max={100}
                value={Math.round(tintOpacity * 100)}
                onChange={(e) => setTintOpacity(Number(e.target.value) / 100)}
                data-no-drag
                className="h-2 w-24 accent-indigo-400"
              />
            </label>

            <label className="flex items-center gap-2 text-sm text-white/80">
              Blur
              <input
                type="range"
                min={0}
                max={40}
                value={blurPx}
                onChange={(e) => setBlurPx(Number(e.target.value))}
                data-no-drag
                className="h-2 w-24 accent-indigo-400"
              />
            </label>

            <label className="flex items-center gap-2 text-sm text-white/80">
              Radius
              <input
                type="range"
                min={0}
                max={48}
                value={radiusPx}
                onChange={(e) => setRadiusPx(Number(e.target.value))}
                data-no-drag
                className="h-2 w-24 accent-indigo-400"
              />
            </label>

            <label className="flex items-center gap-2 text-sm text-white/80">
              Shadow
              <input
                type="checkbox"
                checked={shadow}
                onChange={(e) => setShadow(e.target.checked)}
                data-no-drag
                className="h-4 w-4 accent-indigo-400"
              />
            </label>
          </div>

          <div className="mt-3">
            <div className="text-sm text-white">
              <strong className="block">Movable Glass</strong>
              <span className="block text-xs text-white/70">Drag this panel anywhere on the page.</span>
            </div>
          </div>
        </div>
      </GlassPanel>
    </div>
  )
}

const root = document.getElementById('root')
if (root) {
  ReactDOM.createRoot(root).render(<Preview />)
}
