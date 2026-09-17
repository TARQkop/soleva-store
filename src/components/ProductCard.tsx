import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Product } from '../types'
import StarRating from './StarRating'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'

const fallbackImage = 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1200&q=80'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { isSaved, toggle } = useWishlist()
  const { addToCart } = useCart()
  const { showToast } = useToast()
  const [hovered, setHovered] = useState(false)
  const saved = isSaved(product.id)
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.onerror = null
    event.currentTarget.src = fallbackImage
  }

  const onWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    const added = toggle(product.id)
    showToast({
      title: added ? 'Added to wishlist' : 'Removed from wishlist',
      variant: 'success',
    })
  }

  const onQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart({
      productId: product.id,
      size: product.sizes[Math.floor(product.sizes.length / 2)],
      color: product.colors[0].name,
      quantity: 1,
    })
    showToast({ title: 'Added to bag', description: product.name, variant: 'success' })
  }

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-stone">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          onError={handleImageError}
          className={`h-full w-full object-cover transition-transform duration-700 ease-out ${
            hovered ? 'scale-105' : 'scale-100'
          }`}
        />
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt=""
            aria-hidden="true"
            loading="lazy"
            onError={handleImageError}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              hovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        <div className="absolute left-2.5 top-2.5 flex flex-col gap-1.5 sm:left-3 sm:top-3">
          {product.isNew && (
            <span className="rounded-full bg-ink px-2.5 py-1 text-[10px] font-medium tracking-wide text-cream">
              New
            </span>
          )}
          {product.compareAtPrice && (
            <span className="rounded-full bg-rust px-2.5 py-1 text-[10px] font-medium tracking-wide text-cream">
              Sale
            </span>
          )}
        </div>

        <button
          onClick={onWishlist}
          aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={saved}
          className="absolute right-2.5 top-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-paper/90 text-ink shadow-soft transition-transform hover:scale-105 sm:right-3 sm:top-3"
        >
          <svg width="16" height="16" viewBox="0 0 18 18" fill={saved ? 'currentColor' : 'none'}>
            <path
              d="M9 15.5s-6.5-3.9-6.5-8.6a3.9 3.9 0 016.5-2.9 3.9 3.9 0 016.5 2.9c0 4.7-6.5 8.6-6.5 8.6z"
              stroke="currentColor"
              strokeWidth="1.3"
            />
          </svg>
        </button>

        <button
          onClick={onQuickAdd}
          className={`quick-add-touch absolute inset-x-2.5 bottom-2.5 rounded-full bg-ink py-2.5 text-xs font-medium tracking-wide text-cream transition-all duration-300 hover:bg-pine sm:inset-x-3 sm:bottom-3 ${
            hovered ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
          }`}
        >
          Quick Add
        </button>
      </div>

      <div className="mt-3 flex min-w-0 flex-col gap-1 sm:mt-3.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="min-w-0 text-sm font-medium text-ink">{product.name}</h3>
        </div>
        <p className="text-xs text-ink-soft">{product.shortDescription}</p>
        <StarRating rating={product.rating} reviewCount={product.reviewCount} size={12} />
        <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-sm text-ink">${product.price}</span>
          {product.compareAtPrice && (
            <span className="text-xs text-ink-soft line-through">${product.compareAtPrice}</span>
          )}
        </div>
      </div>
    </Link>
  )
}
