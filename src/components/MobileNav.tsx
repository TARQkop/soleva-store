import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  links: { label: string; to: string }[]
}

export default function MobileNav({ isOpen, onClose, links }: MobileNavProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-[80] lg:hidden">
      <div className="absolute inset-0 bg-ink/50 animate-fade-in" onClick={onClose} aria-hidden="true" />
      <div className="relative z-10 flex h-full w-[82%] min-w-[16rem] max-w-xs flex-col overflow-y-auto thin-scroll bg-paper p-6 pt-[max(1.5rem,env(safe-area-inset-top))] shadow-lift animate-slide-in-left">
        <div className="flex shrink-0 items-center justify-between">
          <span className="font-display text-xl">SOLEVA</span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="touch-target -mr-2 flex h-10 w-10 items-center justify-center rounded-full hover:bg-stone"
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <nav className="mt-8 flex flex-col gap-1 pb-[max(1rem,env(safe-area-inset-bottom))] sm:mt-10" aria-label="Mobile primary">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={onClose}
              className="group flex min-h-[3.25rem] items-center justify-between gap-3 border-b border-line py-4 font-display text-[length:clamp(1.35rem,6vw,1.5rem)] text-ink transition-colors duration-300 hover:border-rust hover:text-pine"
            >
              {link.label}
              <span className="translate-x-0 text-lg text-rust opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" aria-hidden="true">
                ↗
              </span>
            </Link>
          ))}
          <Link to="/wishlist" onClick={onClose} className="flex min-h-[2.75rem] items-center py-3 text-sm text-ink-soft">
            Wishlist
          </Link>
          <Link to="/cart" onClick={onClose} className="flex min-h-[2.75rem] items-center py-3 text-sm text-ink-soft">
            View Cart
          </Link>
        </nav>
      </div>
    </div>,
    document.body
  )
}
