function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-shade-30 text-shade-60',
    mint:    'bg-aloe text-canvas-night',
    dark:    'bg-surface-dark text-canvas-light',
    aloe:    'bg-pistachio text-canvas-night',
  }

  return (
    <span className={`
      inline-flex items-center px-3 py-1
      rounded-pill font-body text-xs font-medium
      ${variants[variant]}
      ${className}
    `}>
      {children}
    </span>
  )
}

export default Badge