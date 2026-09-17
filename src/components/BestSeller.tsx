import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Product } from '../types'
import StarRating from './StarRating'
import Button from './Button'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'

interface BestSellerProps {
  product: Product
}

export default function BestSeller({ product }: BestSellerProps) {
  const [color, setColor] = useState(product.colors[0].name)
  const [size, setSize] = useState<number | null>(null)
  const { addToCart } = useCart()
  const { showToast } = useToast()

  const activeImage = product.colors.find((c) => c.name === color)?.image ?? product.images[0]

  const onAdd = () => {
    if (!size) {
      showToast({ title: 'Select a size', description: 'Pick a size before adding to bag.', variant: 'error' })
      return
    }
    addToCart({ productId: product.id, size, color, quantity: 1 })
    showToast({ title: 'Added to bag', description: product.name, variant: 'success' })
  }

  return (
    <section className="bg-stone/50 py-20 sm:py-28">
      <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="aspect-square overflow-hidden rounded-3xl bg-paper">
          <img src={activeImage} alt={product.name} className="h-full w-full object-cover transition-all duration-500" />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-xs tracking-[0.2em] text-ink-soft">BEST SELLER</p>
          <Link to={`/product/${product.slug}`}>
            <h2 className="mt-4 font-display text-[length:clamp(2rem,9vw,2.25rem)] leading-tight text-ink sm:text-5xl">{product.name}</h2>
          </Link>
          <div className="mt-3">
            <StarRating rating={product.rating} showValue reviewCount={product.reviewCount} />
          </div>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-soft">{product.description}</p>
          <p className="mt-5 text-2xl text-ink">${product.price}</p>

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
              <p className="text-xs font-medium text-ink">Size</p>
              <button className="shrink-0 py-1 text-xs text-ink-soft underline underline-offset-2">Size guide</button>
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

          <div className="mt-8 flex flex-col gap-3 xs:flex-row">
            <Button onClick={onAdd} size="lg" className="w-full xs:w-auto xs:flex-1 sm:flex-none">
              Add to Cart
            </Button>
            <Link to={`/product/${product.slug}`} className="block">
              <Button variant="outline" size="lg" className="w-full xs:w-auto">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
