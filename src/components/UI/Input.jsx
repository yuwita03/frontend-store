function Input({ label, type = 'text', placeholder = '', value, onChange, error = '', name = '' }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="font-body text-sm font-medium text-shade-60">
          {label}
        </label>
      )}
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          font-body text-sm px-4 py-3 rounded-md border bg-canvas-light
          outline-none transition-colors duration-200
          focus:border-canvas-night
          ${error ? 'border-red-500' : 'border-hairline-light'}
        `}
      />
      {error && (
        <span className="font-body text-xs text-red-500">{error}</span>
      )}
    </div>
  )
}

export default Input