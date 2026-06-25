export default function Toast({ toast }) {
  if (!toast) return null

  return (
    // UX: Mengubah posisi ke tengah layar (center-center) dan menambahkan animasi scale agar muncul secara elegan
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50 animate-in fade-in zoom-in-95 duration-200">
      <div className={`px-6 py-4 rounded-2xl shadow-xl font-body text-sm font-semibold border flex items-center gap-3 max-w-sm pointer-events-auto
        ${toast.type === 'error' 
          ? 'bg-rose-50 text-rose-700 border-rose-100' 
          : 'bg-canvas-light text-canvas-night border-hairline-light' 
          /* UX: Mengganti warna hitam kaku dengan warna background clean/putih premium (canvas-light) sesuai tema web Anda */
        }`}
      >
        {/* Ikon Indikator Status (Opsional tapi sangat menunjang UX) */}
        {toast.type === 'error' ? (
          <svg className="w-5 h-5 text-rose-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}

        <span className="leading-relaxed">{toast.message}</span>
      </div>
    </div>
  )
}
