import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { GlassPanel } from './components/GlassPanel'
import {
  RefractiveSphereEffect,
  TexturedGlassCubeEffect,
  LiquidGlassEffect
} from './components/glass/LiquidGlass'
import './index.css'

function Menu({ onViewChange }: { onViewChange: (view: string) => void }) {
  return (
    <div className="flex flex-col gap-6 p-8 bg-surface shadow-md rounded-xl max-w-2xl w-full mx-auto mt-12 border border-surface-alt">
      <div className="flex items-center gap-4 border-b border-surface-alt pb-6">
        <img src="vaultwares-logo.svg" alt="VaultWares Logo" className="h-10" />
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text">AI Workflow GUI</h1>
          <p className="text-sm text-text-muted mt-1">Local Runtime Bridge</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => onViewChange('liquid')}
          aria-label="View Liquid Glass Demo"
          className="flex flex-col items-start p-6 bg-primary hover:bg-surface-alt hover:shadow-sm transition-all rounded-lg border border-surface-alt group cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
        >
          <span className="font-semibold text-lg text-text group-hover:text-accent transition-colors">Liquid Glass</span>
          <span className="text-sm text-text-muted mt-2">Interactive 3D WebGL refraction examples</span>
        </button>
        <button
          onClick={() => onViewChange('css')}
          aria-label="View CSS Glass Panels Demo"
          className="flex flex-col items-start p-6 bg-primary hover:bg-surface-alt hover:shadow-sm transition-all rounded-lg border border-surface-alt group cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
        >
          <span className="font-semibold text-lg text-text group-hover:text-accent transition-colors">CSS Glass Panels</span>
          <span className="text-sm text-text-muted mt-2">Standard UI glassmorphism variants</span>
        </button>
      </div>
    </div>
  )
}

function LiquidGlassDemo({ onViewChange }: { onViewChange: (view: string) => void }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 flex items-center justify-between bg-surface shadow-sm sticky top-0 z-10 border-b border-surface-alt">
        <div className="flex items-center gap-3">
          <img src="vaultwares-logo.svg" alt="Logo" className="h-6" />
          <h1 className="font-semibold text-lg text-text">Liquid Glass</h1>
        </div>
        <button
          onClick={() => onViewChange('menu')}
          aria-label="Back to main menu"
          className="px-4 py-2 text-sm font-medium text-surface bg-accent hover:bg-accent-muted transition-colors rounded-md shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          Back to Menu
        </button>
      </header>

      <main className="flex-1 p-8 grid grid-cols-1 gap-12 max-w-7xl mx-auto w-full">
        <section className="flex flex-col gap-4">
          <div className="mb-2">
            <h2 className="text-xl font-semibold text-text">Refractive Bubble</h2>
            <p className="text-text-muted text-sm mt-1">A spherical geometry with high IOR acting like a dense water droplet.</p>
          </div>
          <RefractiveSphereEffect />
        </section>

        <section className="flex flex-col gap-4">
          <div className="mb-2">
            <h2 className="text-xl font-semibold text-text">Frosted Knot</h2>
            <p className="text-text-muted text-sm mt-1">A complex torus knot geometry with increased roughness mimicking frosted colored glass.</p>
          </div>
          <TexturedGlassCubeEffect />
        </section>

        <section className="flex flex-col gap-4">
          <div className="mb-2">
            <h2 className="text-xl font-semibold text-text">iOS 26 Liquid</h2>
            <p className="text-text-muted text-sm mt-1">Real-time refractive glass rendered with React Three Fiber.</p>
          </div>
          <LiquidGlassEffect />
        </section>
      </main>
    </div>
  )
}

function CssVariantsDemo({ onViewChange }: { onViewChange: (view: string) => void }) {
  const [copied, setCopied] = useState(false)
  const cssString = `/* Frosted Glass */
background-color: rgba(253, 252, 247, 0.86);
backdrop-filter: blur(16px);
-webkit-backdrop-filter: blur(16px);
border: 1px solid rgba(0, 43, 54, 0.14);`

  const copyCss = () => {
    navigator.clipboard.writeText(cssString).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-primary">
      <header className="p-4 flex items-center justify-between bg-surface shadow-sm sticky top-0 z-10 border-b border-surface-alt">
        <div className="flex items-center gap-3">
          <img src="vaultwares-logo.svg" alt="Logo" className="h-6" />
          <h1 className="font-semibold text-lg text-text">CSS Glass Panels</h1>
        </div>
        <button
          onClick={() => onViewChange('menu')}
          aria-label="Back to main menu"
          className="px-4 py-2 text-sm font-medium text-surface bg-accent hover:bg-accent-muted transition-colors rounded-md shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          Back to Menu
        </button>
      </header>

      <main className="flex-1 p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto w-full items-start">
        <GlassPanel variant="clear" className="p-6">
          <h3 className="text-xl font-semibold text-text mb-2">Clear Glass</h3>
          <p className="text-text-muted text-sm">Minimal blur and high transparency. Best for subtle overlays.</p>
        </GlassPanel>

        <GlassPanel variant="frosted" className="p-6 flex flex-col justify-between h-full">
          <div>
            <h3 className="text-xl font-semibold text-text mb-2">Frosted Glass</h3>
            <p className="text-text-muted text-sm mb-4">High blur with slightly lower transparency. Good for dialogs.</p>
          </div>

          <div className="mt-4 pt-4 border-t border-surface-alt">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">CSS Variables</span>
              <button
                onClick={copyCss}
                data-no-drag
                aria-live="polite"
                aria-label="Copy CSS code for frosted glass"
                className="rounded-md bg-accent px-3 py-1 text-sm font-medium text-surface hover:bg-accent-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface transition-colors cursor-pointer"
              >
                {copied ? 'Copied' : 'Copy CSS'}
              </button>
            </div>

            <pre
              className="mt-1 overflow-auto rounded-md bg-surface-alt border border-surface-alt px-3 py-2 text-xs text-text h-24 cursor-pointer hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface transition-colors"
              onClick={copyCss}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  copyCss();
                }
              }}
              tabIndex={0}
              role="button"
              aria-label="Click to copy CSS code"
              title="Click to copy CSS"
            >
              {cssString}
            </pre>
          </div>
        </GlassPanel>

        <GlassPanel variant="subtle" className="p-6">
          <h3 className="text-xl font-semibold text-text mb-2">Subtle Glass</h3>
          <p className="text-text-muted text-sm">Very low opacity and blur. Good for large background panels.</p>
        </GlassPanel>

        <GlassPanel variant="tinted" className="p-6">
          <h3 className="text-xl font-semibold text-text mb-2">Tinted Glass</h3>
          <p className="text-text-muted text-sm">Uses the brand accent color with low opacity for a colored glass look.</p>
        </GlassPanel>

        <GlassPanel variant="dark" className="p-6">
          <h3 className="text-xl font-semibold text-text mb-2">Dark Glass</h3>
          <p className="text-text-muted text-sm">Dark base with high blur. Good for contrast on light backgrounds.</p>
        </GlassPanel>

        <GlassPanel variant="vibrant" className="p-6">
          <h3 className="text-xl font-semibold text-text mb-2">Vibrant Glass</h3>
          <p className="text-text-muted text-sm">Gradient background with high blur for a modern look.</p>
        </GlassPanel>
      </main>
    </div>
  )
}

function App() {
  const [currentView, setCurrentView] = useState('menu')

  return (
    <div className="min-h-screen bg-primary text-text font-sans selection:bg-accent selection:text-surface">
      {currentView === 'menu' && <Menu onViewChange={setCurrentView} />}
      {currentView === 'liquid' && <LiquidGlassDemo onViewChange={setCurrentView} />}
      {currentView === 'css' && <CssVariantsDemo onViewChange={setCurrentView} />}
    </div>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
