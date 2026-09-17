import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid'
import ProductFilters from '../components/ProductFilters'
import { products } from '../data/products'
import { Category, FilterState, Gender, SortOption } from '../types'

const priceBounds: [number, number] = [
  Math.min(...products.map((p) => p.price)),
  Math.max(...products.map((p) => p.price)),
]

const availableColors = Array.from(new Set(products.flatMap((p) => p.colors.map((c) => c.name))))

const defaultFilters: FilterState = {
  categories: [],
  genders: [],
  sizes: [],
  colors: [],
  minRating: 0,
  priceMin: priceBounds[0],
  priceMax: priceBounds[1],
  onSaleOnly: false,
  newOnly: false,
}

const PAGE_SIZE = 8

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState<FilterState>(defaultFilters)
  const [sort, setSort] = useState<SortOption>('featured')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const category = searchParams.get('category') as Category | null
    const gender = searchParams.get('gender') as Gender | null
    const filterParam = searchParams.get('filter')

    setFilters((prev) => ({
      ...prev,
      categories: category ? [category] : prev.categories,
      genders: gender ? [gender] : prev.genders,
      onSaleOnly: filterParam === 'sale' ? true : prev.onSaleOnly,
      newOnly: filterParam === 'new' ? true : prev.newOnly,
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 450)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [filters, sort])

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (filters.categories.length && !filters.categories.includes(p.category)) return false
      if (filters.genders.length && !filters.genders.includes(p.gender)) return false
      if (filters.sizes.length && !filters.sizes.some((s) => p.sizes.includes(s))) return false
      if (filters.colors.length && !filters.colors.some((c) => p.colors.some((pc) => pc.name === c))) return false
      if (filters.minRating && p.rating < filters.minRating) return false
      if (p.price > filters.priceMax) return false
      if (filters.onSaleOnly && !p.compareAtPrice) return false
      if (filters.newOnly && !p.isNew) return false
      return true
    })

    switch (sort) {
      case 'newest':
        list = [...list].sort((a, b) => Number(b.isNew) - Number(a.isNew))
        break
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price)
        break
      case 'rated':
        list = [...list].sort((a, b) => b.rating - a.rating)
        break
      default:
        list = [...list].sort((a, b) => Number(b.isBestSeller) - Number(a.isBestSeller))
    }
    return list
  }, [filters, sort])

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  const clearFilters = () => {
    setFilters(defaultFilters)
    setSearchParams({})
  }

  const pageTitle = filters.categories.length === 1 ? filters.categories[0] : 'All Shoes'

  return (
    <div className="container-page py-8 sm:py-12">
      <div className="flex flex-col gap-1 border-b border-line pb-6">
        <p className="text-xs tracking-[0.2em] text-ink-soft">SHOP</p>
        <h1 className="font-display text-[length:clamp(1.75rem,7vw,1.875rem)] text-ink sm:text-4xl">{pageTitle}</h1>
        <p className="text-sm text-ink-soft">{filtered.length} products</p>
      </div>

      <div className="mt-8 flex gap-10">
        <ProductFilters
          filters={filters}
          onChange={setFilters}
          availableColors={availableColors}
          priceBounds={priceBounds}
          isOpen={mobileFiltersOpen}
          onClose={() => setMobileFiltersOpen(false)}
        />

        <div className="min-w-0 flex-1">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-x-3 gap-y-3">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="touch-target flex shrink-0 items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm text-ink lg:hidden"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 3.5h12M3.5 7h7M5.5 10.5h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              Filters
            </button>

            <label className="ml-auto flex min-w-0 items-center gap-2 text-sm text-ink-soft">
              <span className="shrink-0">Sort by</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="min-w-0 max-w-[10.5rem] shrink rounded-full border border-line bg-transparent px-3 py-2 text-sm text-ink focus:border-ink focus:outline-none sm:max-w-none"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rated">Best Rated</option>
              </select>
            </label>
          </div>

          <ProductGrid products={visible} isLoading={isLoading} onClearFilters={clearFilters} />

          {!isLoading && hasMore && (
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="touch-target rounded-full border border-ink px-8 py-3 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-cream"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
