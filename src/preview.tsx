import React from 'react'
import ReactDOM from 'react-dom/client'
import { GlassPanel, GlassVariant } from './components/GlassPanel'

const variants: GlassVariant[] = ['frosted', 'clear', 'tinted']

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
    </main>
  )
}

function GlassExample() {
  const [variant, setVariant] = React.useState<GlassVariant>('frosted')

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-white">Interactive example</h2>
          <p className="mt-2 max-w-md text-sm text-white/70">
            Select a variant to see how the glass effect updates in real time.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3">
          <label htmlFor="variant" className="text-sm font-medium text-white/80">
            Variant
          </label>

          <select
            id="variant"
            value={variant}
            onChange={(event) => setVariant(event.target.value as GlassVariant)}
            className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-white outline-none transition focus:border-white/40"
          >
            {variants.map((v) => (
              <option key={v} value={v} className="bg-slate-900">
                {v}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6">
        <GlassPanel variant={variant} className="h-64">
          <div className="flex h-full flex-col justify-between">
            <div>
              <p className="text-lg font-semibold text-white">{variant}</p>
              <p className="mt-2 text-sm text-white/70">
                The glass panel will render using the selected variant.
              </p>
            </div>

            <p className="text-xs text-white/60">
              Update the dropdown to preview the style.
            </p>
          </div>
        </GlassPanel>
      </div>
    </section>
  )
}

const root = document.getElementById('root')
if (root) {
  ReactDOM.createRoot(root).render(<Preview />)
}
