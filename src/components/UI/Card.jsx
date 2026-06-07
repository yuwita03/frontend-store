function Card({ children, variant = 'default', className = '', onClick }) {
  const variants = {
    default:  'bg-canvas-light border border-hairline-light',
    elevated: 'bg-canvas-light shadow-md',
    dark:     'bg-surface-dark border border-hairline-dark',
    aloe:     'bg-aloe border border-aloe',
  }

  return (
    <div
      onClick={onClick}
      className={`
        rounded-lg p-6 transition-all duration-200
        ${variants[variant]}
        ${onClick ? 'cursor-pointer hover:shadow-lg' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

export default Card