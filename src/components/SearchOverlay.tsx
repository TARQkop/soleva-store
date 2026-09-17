import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { products } from '../data/products'

interface SearchOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setTimeout(() => inputRef.current?.focus(), 50)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return products
      .filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
      .slice(0, 6)
  }, [query])

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-[80]">
      <div className="absolute inset-0 bg-ink/50 backdrop-blur-[2px] animate-fade-in" onClick={onClose} />
      <div className="search-panel-h relative z-10 mx-auto mt-0 flex w-full max-w-2xl flex-col animate-slide-up bg-paper p-5 pt-[max(1.25rem,env(safe-area-inset-top))] shadow-lift sm:mt-24 sm:rounded-2xl sm:p-8 sm:pt-8">
        <div className="flex shrink-0 items-center gap-3 border-b border-line pb-4">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0 text-ink-soft">
            <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.4" />
            <path d="M16 16L12.3 12.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sneakers, running, boots…"
            className="w-full min-w-0 bg-transparent font-display text-lg text-ink placeholder:text-ink-soft/50 focus:outline-none sm:text-xl"
          />
          <button onClick={onClose} aria-label="Close search" className="shrink-0 px-2 py-2 text-xs text-ink-soft hover:text-ink">
            Esc
          </button>
        </div>

        <div className="mt-4 min-h-0 flex-1 overflow-y-auto overscroll-contain thin-scroll pb-[env(safe-area-inset-bottom)]">
          {query && results.length === 0 && (
            <p className="py-8 text-center text-sm text-ink-soft">
              No results for &ldquo;{query}&rdquo;. Try a different search.
            </p>
          )}
          <ul className="divide-y divide-line">
            {results.map((p) => (
              <li key={p.id}>
                <Link
                  to={`/product/${p.slug}`}
                  onClick={onClose}
                  className="-mx-2 flex items-center gap-3 rounded-lg px-2 py-3 hover:bg-stone/60 sm:gap-4"
                >
                  <img src={p.images[0]} alt="" className="h-12 w-12 shrink-0 rounded-lg object-cover sm:h-14 sm:w-14" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-ink">{p.name}</p>
                    <p className="text-xs text-ink-soft">{p.category}</p>
                  </div>
                  <span className="shrink-0 text-sm text-ink">${p.price}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>,
    document.body
  )
}
