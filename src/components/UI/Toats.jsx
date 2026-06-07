export default function Toast({ toast }) {
  if (!toast) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className={`px-5 py-3 rounded-xl shadow-lg font-mono text-xs font-bold uppercase tracking-wider whitespace-nowrap border
        ${toast.type === 'error' 
          ? 'bg-rose-50 text-rose-600 border-rose-200' 
          : 'bg-stone-950 text-white border-stone-850'
        }`}
      >
        {toast.message}
      </div>
    </div>
  )
}