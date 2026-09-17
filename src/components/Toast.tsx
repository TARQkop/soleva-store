import { useToast } from '../context/ToastContext'

const variantStyles = {
  success: 'border-pine/30 text-pine-dark',
  error: 'border-rust/40 text-rust',
  info: 'border-line text-ink',
}

const variantIcon = {
  success: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8.5L6.5 12L13 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  error: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 4.5V9M8 11.5H8.008" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  ),
  info: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 7V11.5M8 4.5H8.008" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  ),
}

export default function ToastStack() {
  const { toasts, dismissToast } = useToast()

  if (toasts.length === 0) return null

  return (
    <div
      className="fixed right-3 top-[4.75rem] z-[90] flex w-[calc(100%-1.5rem)] max-w-sm flex-col gap-2 sm:right-6 sm:top-24 sm:w-[calc(100%-3rem)]"
      role="region"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-start gap-3 rounded-xl border bg-paper/95 px-4 py-3 shadow-lift backdrop-blur animate-toast-in ${
            variantStyles[toast.variant ?? 'info']
          }`}
        >
          <span className="mt-0.5 shrink-0">{variantIcon[toast.variant ?? 'info']}</span>
          <div className="min-w-0 flex-1 text-sm">
            <p className="font-medium text-ink">{toast.title}</p>
            {toast.description && <p className="mt-0.5 text-ink-soft">{toast.description}</p>}
          </div>
          <button
            onClick={() => dismissToast(toast.id)}
            aria-label="Dismiss notification"
            className="-my-1 shrink-0 px-1 py-1 text-ink-soft/60 hover:text-ink"
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  )
}
