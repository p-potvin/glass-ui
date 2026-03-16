import React from 'react'

export type GlassVariant = 'frosted' | 'clear' | 'tinted'

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
    frosted:
      'bg-white/20 backdrop-blur-md border border-white/30 shadow-lg',
    clear:
      'bg-white/10 backdrop-blur-sm border border-white/20 shadow-md',
    tinted:
      'bg-blue-500/20 backdrop-blur-md border border-blue-300/30 shadow-lg',
  }

  return (
    <div className={`rounded-xl p-4 ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  )
}
