function Button({ children, variant = 'primary', onClick, type = 'button', className = '' }) {
  const base = 'font-body text-sm font-medium px-6 py-3 rounded-pill transition-colors duration-200 cursor-pointer'

  const variants = {
    primary:       'bg-canvas-night text-canvas-light hover:bg-shade-70',
    outline_dark:  'bg-transparent text-canvas-light border-2 border-canvas-light hover:bg-shade-70',
    outline_light: 'bg-canvas-light text-canvas-night border border-canvas-night hover:bg-shade-30',
    aloe:          'bg-aloe text-canvas-night hover:opacity-90',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button