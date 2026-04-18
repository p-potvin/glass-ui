import React from 'react'

export type GlassVariant =
  | 'liquid'
  | 'vibrant'
  | 'solarized-frosted'
  | 'frosted'
  | 'clear'
  | 'subtle'

export interface GlassPanelProps {
  /** Visual style of the glass effect */
  variant?: GlassVariant
  /** Additional CSS classes */
  className?: string
  /** Panel content */
  children?: React.ReactNode
  /** Optional tint color (hex or any valid CSS color). When provided, this overrides background classes. */
  tint?: string
  /** Tint opacity (0-1). Only used when `tint` is a hex string. Defaults to 0.08. */
  tintOpacity?: number
  /** Optional blur in pixels to apply to the backdrop filter (overrides variant blur). */
  blur?: number
  /** Inline style to merge with the component's generated style. */
  style?: React.CSSProperties
}

/**
 * A panel component with a customizable glassmorphism effect.
 */
export const GlassPanel: React.FC<GlassPanelProps> = ({
  variant = 'frosted',
  className = '',
  children,
  tint,
  tintOpacity,
  blur,
  style,
}) => {
  const variantClasses: Record<GlassVariant, string> = {
    liquid: 'bg-white/10 backdrop-blur-md border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.1)]',
    vibrant: 'bg-gradient-to-br from-[#268bd2]/20 to-[#d33682]/20 backdrop-blur-md border border-white/40 shadow-lg',
    'solarized-frosted': 'bg-[#eee8d5]/40 backdrop-blur-md border border-[#93a1a1]/20 shadow-sm',
    frosted: 'bg-white/40 backdrop-blur-md border border-white/50 shadow-md',
    clear: 'bg-white/10 backdrop-blur-sm border border-white/20 shadow-sm',
    subtle: 'bg-white/5 backdrop-blur-[2px] border border-white/10 shadow-none',
  }

  // helper: convert #rrggbb to rgba(...) with provided alpha
  function hexToRgba(hex: string, alpha: number) {
    if (!hex) return undefined
    const h = hex.replace('#', '')
    let r = 0
    let g = 0
    let b = 0
    if (h.length === 3) {
      r = parseInt(h[0] + h[0], 16)
      g = parseInt(h[1] + h[1], 16)
      b = parseInt(h[2] + h[2], 16)
    } else if (h.length === 6 || h.length === 8) {
      r = parseInt(h.slice(0, 2), 16)
      g = parseInt(h.slice(2, 4), 16)
      b = parseInt(h.slice(4, 6), 16)
    } else {
      return hex
    }
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  const computedStyle: React.CSSProperties = {}
  if (tint) {
    // If tint looks like a hex color, convert and apply opacity; otherwise use as given
    const isHex = /^#([A-Fa-f0-9]{3,8})$/.test(tint)
    const alpha = typeof tintOpacity === 'number' ? tintOpacity : 0.08
    computedStyle.backgroundColor = isHex ? hexToRgba(tint, alpha) : tint
  }

  if (typeof blur === 'number') {
    computedStyle.backdropFilter = `blur(${blur}px)`
    ;(computedStyle as any).WebkitBackdropFilter = `blur(${blur}px)`
  }

  const mergedStyle = { ...(style || {}), ...computedStyle }

  return (
    <div className={`rounded-xl p-4 ${variantClasses[variant]} ${className}`} style={mergedStyle}>
      {children}
    </div>
  )
}
