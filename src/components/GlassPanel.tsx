import React from 'react'

export type GlassVariant =
  | 'frosted'
  | 'clear'
  | 'tinted'
  | 'ultra-clear'
  | 'subtle'
  | 'soft-tint'

export interface GlassPanelProps {
  /** Visual style of the glass effect */
  variant?: GlassVariant
  /** Additional CSS classes */
  className?: string
  /** Panel content */
  children?: React.ReactNode
}

/**
 * A panel component with a customizable glassmorphism effect.
 */
export const GlassPanel: React.FC<GlassPanelProps> = ({
  variant = 'frosted',
  className = '',
  children,
}) => {
  const variantClasses: Record<GlassVariant, string> = {
    // slightly stronger frosted look (but moderate opacity)
    frosted: 'bg-white/18 backdrop-blur-sm border border-white/20 shadow-lg',
    // very clear, almost transparent with minimal blur
    'ultra-clear': 'bg-white/5 backdrop-blur-sm border border-white/10 shadow-sm',
    // subtle glass: low opacity, minimal blur, almost invisible
    subtle: 'bg-white/6 backdrop-blur-[1px] border border-white/8 shadow-none',
    // soft tint variant with low opacity
    'soft-tint': 'bg-pink-400/8 backdrop-blur-sm border border-pink-200/20 shadow-sm',
    clear: 'bg-white/8 backdrop-blur-sm border border-white/12 shadow-sm',
    tinted: 'bg-blue-500/12 backdrop-blur-sm border border-blue-300/20 shadow-md',
  }

  return (
    <div className={`rounded-xl p-4 ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  )
}
