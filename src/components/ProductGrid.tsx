import { Product } from '../types'
import ProductCard from './ProductCard'
import { ProductGridSkeleton } from './Skeleton'
import Button from './Button'

interface ProductGridProps {
  products: Product[]
  isLoading?: boolean
  onClearFilters?: () => void
}

export default function ProductGrid({ products, isLoading, onClearFilters }: ProductGridProps) {
  if (isLoading) return <ProductGridSkeleton />

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-line px-5 py-16 text-center sm:py-24">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-ink-soft">
          <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1.3" />
          <path d="M32 32L26 26" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M15 20h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
        <div>
          <p className="font-display text-xl text-ink">No products found</p>
          <p className="mt-1 text-sm text-ink-soft">Try adjusting your filters or search term.</p>
        </div>
        {onClearFilters && (
          <Button variant="outline" size="sm" onClick={onClearFilters}>
            Clear all filters
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-8 xs:gap-x-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
