export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl flex flex-col gap-4">
        {title && <h3 className="font-display text-lg font-medium text-canvas-night">{title}</h3>}
        {message && <p className="font-body text-sm text-shade-50">{message}</p>}
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="font-body text-sm px-4 py-2 bg-canvas-night text-white rounded-lg hover:bg-canvas-night/90"
          >
            Confirm
          </button>
          <button
            onClick={onCancel}
            className="font-body text-sm px-4 py-2 border border-hairline-light rounded-lg hover:bg-canvas-cream"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}