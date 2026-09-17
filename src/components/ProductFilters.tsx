import { useEffect, useState } from 'react'
import { Category, FilterState, Gender } from '../types'
import Button from './Button'

interface ProductFiltersProps {
  filters: FilterState
  onChange: (filters: FilterState) => void
  availableColors: string[]
  priceBounds: [number, number]
  isOpen: boolean
  onClose: () => void
}

const categories: Category[] = ['Sneakers', 'Running', 'Casual', 'Basketball', 'Boots']
const genders: Gender[] = ['Men', 'Women', 'Unisex']
const sizeList = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12, 13]

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="border-b border-line py-5">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex min-h-[2.75rem] w-full items-center justify-between gap-3 text-left text-sm font-medium text-ink lg:min-h-0"
        aria-expanded={open}
      >
        {title}
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        >
          <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  )
}

export default function ProductFilters({
  filters,
  onChange,
  availableColors,
  priceBounds,
  isOpen,
  onClose,
}: ProductFiltersProps) {
  // Lock background scrolling while the mobile filter drawer is open,
  // otherwise the page scrolls underneath the panel on touch devices.
  useEffect(() => {
    if (!isOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  const toggleArrayValue = <T,>(arr: T[], value: T): T[] =>
    arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]

  const content = (
    <div>
      <Section title="Category">
        <div className="flex flex-col gap-2.5">
          {categories.map((c) => (
            <label key={c} className="flex min-h-[2.25rem] cursor-pointer items-center gap-2.5 text-sm text-ink-soft lg:min-h-0">
              <input
                type="checkbox"
                checked={filters.categories.includes(c)}
                onChange={() => onChange({ ...filters, categories: toggleArrayValue(filters.categories, c) })}
                className="h-[18px] w-[18px] shrink-0 rounded border-line accent-pine lg:h-4 lg:w-4"
              />
              {c}
            </label>
          ))}
        </div>
      </Section>

      <Section title="Gender">
        <div className="flex flex-col gap-2.5">
          {genders.map((g) => (
            <label key={g} className="flex min-h-[2.25rem] cursor-pointer items-center gap-2.5 text-sm text-ink-soft lg:min-h-0">
              <input
                type="checkbox"
                checked={filters.genders.includes(g)}
                onChange={() => onChange({ ...filters, genders: toggleArrayValue(filters.genders, g) })}
                className="h-[18px] w-[18px] shrink-0 rounded border-line accent-pine lg:h-4 lg:w-4"
              />
              {g}
            </label>
          ))}
        </div>
      </Section>

      <Section title="Price">
        <div className="flex flex-col gap-3">
          <input
            type="range"
            min={priceBounds[0]}
            max={priceBounds[1]}
            value={filters.priceMax}
            onChange={(e) => onChange({ ...filters, priceMax: Number(e.target.value) })}
            className="h-6 w-full cursor-pointer accent-pine lg:h-auto"
          />
          <div className="flex justify-between text-xs text-ink-soft">
            <span>${priceBounds[0]}</span>
            <span>Up to ${filters.priceMax}</span>
          </div>
        </div>
      </Section>

      <Section title="Size">
        <div className="grid grid-cols-4 gap-2 xs:grid-cols-5 lg:grid-cols-4">
          {sizeList.map((s) => (
            <button
              key={s}
              onClick={() => onChange({ ...filters, sizes: toggleArrayValue(filters.sizes, s) })}
              aria-pressed={filters.sizes.includes(s)}
              className={`min-h-[2.5rem] rounded-lg border px-1 py-2 text-xs transition-colors lg:min-h-0 ${
                filters.sizes.includes(s)
                  ? 'border-ink bg-ink text-cream'
                  : 'border-line text-ink-soft hover:border-ink'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Color">
        <div className="flex flex-wrap gap-2">
          {availableColors.map((c) => (
            <button
              key={c}
              onClick={() => onChange({ ...filters, colors: toggleArrayValue(filters.colors, c) })}
              aria-pressed={filters.colors.includes(c)}
              className={`min-h-[2.25rem] rounded-full border px-3 py-1.5 text-xs transition-colors lg:min-h-0 ${
                filters.colors.includes(c)
                  ? 'border-ink bg-ink text-cream'
                  : 'border-line text-ink-soft hover:border-ink'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Rating">
        <div className="flex flex-col gap-2.5">
          {[4, 3].map((r) => (
            <label key={r} className="flex min-h-[2.25rem] cursor-pointer items-center gap-2.5 text-sm text-ink-soft lg:min-h-0">
              <input
                type="radio"
                name="rating"
                checked={filters.minRating === r}
                onChange={() => onChange({ ...filters, minRating: r })}
                className="h-[18px] w-[18px] shrink-0 accent-pine lg:h-4 lg:w-4"
              />
              {r}+ stars
            </label>
          ))}
          <label className="flex min-h-[2.25rem] cursor-pointer items-center gap-2.5 text-sm text-ink-soft lg:min-h-0">
            <input
              type="radio"
              name="rating"
              checked={filters.minRating === 0}
              onChange={() => onChange({ ...filters, minRating: 0 })}
              className="h-[18px] w-[18px] shrink-0 accent-pine lg:h-4 lg:w-4"
            />
            Any rating
          </label>
        </div>
      </Section>

      <div className="pt-5">
        <Button
          variant="ghost"
          size="sm"
          className="w-full"
          onClick={() =>
            onChange({
              categories: [],
              genders: [],
              sizes: [],
              colors: [],
              minRating: 0,
              priceMin: priceBounds[0],
              priceMax: priceBounds[1],
              onSaleOnly: false,
              newOnly: false,
            })
          }
        >
          Reset filters
        </Button>
      </div>
    </div>
  )

  return (
    <>
      <aside className="hidden w-64 shrink-0 lg:block">{content}</aside>

      {isOpen && (
        <div className="fixed inset-0 z-[75] lg:hidden">
          <div className="absolute inset-0 bg-ink/50" onClick={onClose} />
          <div className="absolute inset-y-0 left-0 flex w-[88%] min-w-[17rem] max-w-sm flex-col overflow-y-auto thin-scroll bg-paper p-5 pt-[max(1.25rem,env(safe-area-inset-top))] shadow-lift animate-slide-in-left sm:p-6 sm:pt-[max(1.5rem,env(safe-area-inset-top))]">
            <div className="sticky top-0 z-10 -mx-5 flex shrink-0 items-center justify-between bg-paper px-5 pb-4 sm:-mx-6 sm:px-6">
              <span className="font-display text-xl">Filters</span>
              <button onClick={onClose} aria-label="Close filters" className="touch-target -mr-2 flex h-10 w-10 items-center justify-center rounded-full hover:bg-stone">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            {content}
            <div className="sticky bottom-0 -mx-5 mt-auto bg-paper px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:-mx-6 sm:px-6">
              <Button className="w-full" onClick={onClose}>
                Show results
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
