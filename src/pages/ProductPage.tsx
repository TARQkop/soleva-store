import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getProductBySlug, relatedProducts } from '../data/products'
import StarRating from '../components/StarRating'
import ReviewCard from '../components/ReviewCard'
import ProductGrid from '../components/ProductGrid'
import Button from '../components/Button'
import Modal from '../components/Modal'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useToast } from '../context/ToastContext'

type Tab = 'description' | 'specs' | 'reviews'

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>()
  const product = slug ? getProductBySlug(slug) : undefined

  const [activeImage, setActiveImage] = useState(0)
  const [color, setColor] = useState(product?.colors[0]?.name ?? '')
  const [size, setSize] = useState<number | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [tab, setTab] = useState<Tab>('description')
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)

  const { addToCart } = useCart()
  const { isSaved, toggle } = useWishlist()
  const { showToast } = useToast()

  useEffect(() => {
    if (product) {
      setColor(product.colors[0].name)
      setActiveImage(0)
      setSize(null)
      setQuantity(1)
      window.scrollTo(0, 0)
    }
  }, [product])

  if (!product) return <Navigate to="/shop" replace />

  const saved = isSaved(product.id)

  const onAddToCart = () => {
    if (!size) {
      showToast({ title: 'Select a size', variant: 'error' })
      return
    }
    addToCart({ productId: product.id, size, color, quantity })
    showToast({ title: 'Added to bag', description: `${product.name} · Size ${size}`, variant: 'success' })
  }

  const onBuyNow = () => {
    if (!size) {
      showToast({ title: 'Select a size', variant: 'error' })
      return
    }
    addToCart({ productId: product.id, size, color, quantity })
    showToast({ title: 'Proceeding to checkout', variant: 'info' })
  }

  return (
    <div className="container-page py-8 sm:py-12">
      <nav className="mb-6 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-ink-soft" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-ink">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-ink">Shop</Link>
        <span>/</span>
        <span className="min-w-0 text-ink">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Gallery */}
        <div className="flex min-w-0 flex-col-reverse gap-4 sm:flex-row">
          <div className="no-scrollbar -mx-1 flex shrink-0 gap-3 overflow-x-auto px-1 pb-1 sm:mx-0 sm:flex-col sm:overflow-visible sm:px-0 sm:pb-0">
            {product.images.map((img, i) => (
              <button
                key={img}
                onClick={() => setActiveImage(i)}
                aria-label={`View image ${i + 1}`}
                aria-pressed={activeImage === i}
                className={`h-14 w-14 shrink-0 overflow-hidden rounded-xl border-2 sm:h-16 sm:w-16 ${
                  activeImage === i ? 'border-ink' : 'border-transparent'
                }`}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <div
            className="relative min-w-0 flex-1 cursor-zoom-in overflow-hidden rounded-3xl bg-stone"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
          >
            <img
              src={product.images[activeImage]}
              alt={product.name}
              className={`aspect-square w-full object-cover transition-transform duration-500 ${
                isZoomed ? 'scale-125' : 'scale-100'
              }`}
            />
          </div>
        </div>

        {/* Details */}
        <div>
          <p className="text-xs tracking-[0.2em] text-ink-soft">{product.brandLine.toUpperCase()}</p>
          <h1 className="mt-3 font-display text-[length:clamp(1.75rem,7vw,1.875rem)] leading-tight text-ink sm:text-4xl">{product.name}</h1>
          <div className="mt-3 flex items-center gap-3">
            <StarRating rating={product.rating} showValue reviewCount={product.reviewCount} />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-2xl text-ink">${product.price}</span>
            {product.compareAtPrice && (
              <span className="text-base text-ink-soft line-through">${product.compareAtPrice}</span>
            )}
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft">{product.shortDescription}</p>

          <div className="mt-7">
            <p className="text-xs font-medium text-ink">Color — {color}</p>
            <div className="mt-2.5 flex flex-wrap gap-2.5">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  aria-label={c.name}
                  aria-pressed={color === c.name}
                  className={`h-10 w-10 shrink-0 rounded-full border-2 transition-transform sm:h-9 sm:w-9 ${
                    color === c.name ? 'border-ink scale-110' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-ink">Size {size ? `— US ${size}` : ''}</p>
              <button
                onClick={() => setSizeGuideOpen(true)}
                className="shrink-0 py-1 text-xs text-ink-soft underline underline-offset-2"
              >
                Size guide
              </button>
            </div>
            <div className="mt-2.5 grid grid-cols-5 gap-2 xs:grid-cols-6 sm:grid-cols-7">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  aria-pressed={size === s}
                  className={`min-h-[2.75rem] rounded-lg border px-1 py-2 text-xs transition-colors lg:min-h-0 ${
                    size === s ? 'border-ink bg-ink text-cream' : 'border-line text-ink-soft hover:border-ink'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <p className="text-xs font-medium text-ink">Quantity</p>
            <div className="flex items-center rounded-full border border-line">
              <button
                aria-label="Decrease quantity"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-11 w-11 items-center justify-center text-lg text-ink-soft hover:text-ink sm:h-8 sm:w-8 sm:text-base"
              >
                −
              </button>
              <span className="w-7 text-center text-sm text-ink">{quantity}</span>
              <button
                aria-label="Increase quantity"
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-11 w-11 items-center justify-center text-lg text-ink-soft hover:text-ink sm:h-8 sm:w-8 sm:text-base"
              >
                +
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button onClick={onAddToCart} size="lg" className="flex-1">
              Add to Cart
            </Button>
            <Button onClick={onBuyNow} variant="secondary" size="lg" className="flex-1">
              Buy Now
            </Button>
            <button
              onClick={() => {
                const added = toggle(product.id)
                showToast({ title: added ? 'Added to wishlist' : 'Removed from wishlist', variant: 'success' })
              }}
              aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
              aria-pressed={saved}
              className="flex h-12 w-full shrink-0 items-center justify-center gap-2 self-center rounded-full border border-line text-ink hover:border-ink sm:w-12"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill={saved ? 'currentColor' : 'none'}>
                <path
                  d="M9 15.5s-6.5-3.9-6.5-8.6a3.9 3.9 0 016.5-2.9 3.9 3.9 0 016.5 2.9c0 4.7-6.5 8.6-6.5 8.6z"
                  stroke="currentColor"
                  strokeWidth="1.3"
                />
              </svg>
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 border-t border-line pt-6 sm:grid-cols-2">
            <div className="flex gap-3">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="mt-0.5 shrink-0 text-ink-soft">
                <path d="M2 5.5h9v7H2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                <path d="M11 8h3l2 2.5V12.5h-5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                <circle cx="5" cy="13.5" r="1.3" stroke="currentColor" strokeWidth="1.1" />
                <circle cx="13" cy="13.5" r="1.3" stroke="currentColor" strokeWidth="1.1" />
              </svg>
              <div>
                <p className="text-xs font-medium text-ink">Free shipping over $100</p>
                <p className="text-xs text-ink-soft">Arrives in 3–5 business days.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="mt-0.5 shrink-0 text-ink-soft">
                <path d="M9 2l6 2.5v4c0 4-2.6 6.7-6 7.5-3.4-.8-6-3.5-6-7.5v-4z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                <path d="M6.3 9l1.8 1.8L11.7 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>
                <p className="text-xs font-medium text-ink">30-day easy returns</p>
                <p className="text-xs text-ink-soft">Unworn items, original packaging.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <div className="no-scrollbar flex gap-6 overflow-x-auto border-b border-line sm:gap-8">
          {(['description', 'specs', 'reviews'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative shrink-0 whitespace-nowrap pb-4 pt-1 text-sm capitalize transition-colors ${
                tab === t ? 'text-ink' : 'text-ink-soft hover:text-ink'
              }`}
            >
              {t === 'reviews' ? `Reviews (${product.reviewCount})` : t}
              {tab === t && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-ink" />}
            </button>
          ))}
        </div>

        <div className="py-8">
          {tab === 'description' && (
            <p className="max-w-2xl text-sm leading-relaxed text-ink-soft">{product.description}</p>
          )}
          {tab === 'specs' && (
            <dl className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              {product.specs.map((s) => (
                <div key={s.label} className="flex justify-between gap-4 border-b border-line pb-3">
                  <dt className="min-w-0 text-sm text-ink-soft">{s.label}</dt>
                  <dd className="min-w-0 text-right text-sm font-medium text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>
          )}
          {tab === 'reviews' && (
            <div>
              <div className="mb-6 flex items-center gap-4">
                <span className="font-display text-4xl text-ink">{product.rating.toFixed(1)}</span>
                <div>
                  <StarRating rating={product.rating} size={16} />
                  <p className="mt-1 text-xs text-ink-soft">Based on {product.reviewCount} reviews</p>
                </div>
              </div>
              {product.reviews.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {product.reviews.map((r) => (
                    <ReviewCard key={r.id} review={r} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-ink-soft">No written reviews yet — be the first to share your thoughts.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Recommended */}
      <div className="mt-12">
        <h2 className="font-display text-2xl text-ink sm:text-3xl">You Might Also Like</h2>
        <div className="mt-8">
          <ProductGrid products={relatedProducts(product)} />
        </div>
      </div>

      <Modal isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} title="Size Guide">
        <div className="-mx-1 overflow-x-auto px-1">
          <table className="w-full min-w-[18rem] text-left text-sm">
          <thead>
            <tr className="border-b border-line text-ink-soft">
              <th className="py-2 font-medium">US</th>
              <th className="py-2 font-medium">UK</th>
              <th className="py-2 font-medium">EU</th>
              <th className="py-2 font-medium">CM</th>
            </tr>
          </thead>
          <tbody>
            {[
              [7, 6, 40, 25],
              [8, 7, 41, 26],
              [9, 8, 42, 27],
              [10, 9, 43, 28],
              [11, 10, 44, 29],
              [12, 11, 45, 30],
            ].map((row) => (
              <tr key={row[0]} className="border-b border-line text-ink">
                {row.map((cell, i) => (
                  <td key={i} className="py-2">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-ink-soft">
          Between sizes? We recommend sizing up for a roomier fit.
        </p>
      </Modal>
    </div>
  )
}
