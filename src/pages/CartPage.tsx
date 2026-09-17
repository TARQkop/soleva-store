import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import Button from '../components/Button'

export default function CartPage() {
  const { items, subtotal, removeFromCart, setQuantity } = useCart()
  const [promo, setPromo] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)

  const shipping = items.length === 0 || subtotal >= 100 ? 0 : 9
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0
  const total = Math.max(0, subtotal - discount + shipping)

  if (items.length === 0) {
    return (
      <div className="container-page flex flex-col items-center justify-center gap-5 py-32 text-center">
        <svg width="52" height="52" viewBox="0 0 18 18" fill="none" className="text-ink-soft">
          <path d="M4.5 6.5h9l-.7 8.4a1 1 0 01-1 .9H6.2a1 1 0 01-1-.9L4.5 6.5z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
          <path d="M6.5 6V4.8a2.5 2.5 0 015 0V6" stroke="currentColor" strokeWidth="1" />
        </svg>
        <div>
          <h1 className="font-display text-2xl text-ink">Your bag is empty</h1>
          <p className="mt-2 text-sm text-ink-soft">Explore the collection and find your next favorite pair.</p>
        </div>
        <Link to="/shop">
          <Button size="lg">Start Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container-page py-10 sm:py-14">
      <h1 className="font-display text-[length:clamp(1.75rem,7vw,1.875rem)] text-ink sm:text-4xl">Your Bag</h1>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <ul className="min-w-0 lg:col-span-2">
          {items.map((item) => (
            <li key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-4 border-b border-line py-6 first:pt-0 sm:gap-5">
              <img src={item.product.images[0]} alt={item.product.name} className="h-28 w-24 shrink-0 rounded-2xl object-cover sm:h-32 sm:w-28" />
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Link to={`/product/${item.product.slug}`} className="font-display text-base text-ink hover:underline sm:text-lg">
                      {item.product.name}
                    </Link>
                    <p className="mt-1 text-sm text-ink-soft">
                      {item.color} · Size {item.size}
                    </p>
                  </div>
                  <span className="shrink-0 text-base text-ink">${item.product.price * item.quantity}</span>
                </div>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-2 pt-4">
                  <div className="flex items-center rounded-full border border-line">
                    <button
                      aria-label="Decrease quantity"
                      onClick={() => setQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                      className="flex h-11 w-11 items-center justify-center text-lg text-ink-soft hover:text-ink sm:h-8 sm:w-8 sm:text-base"
                    >
                      −
                    </button>
                    <span className="w-7 text-center text-sm text-ink">{item.quantity}</span>
                    <button
                      aria-label="Increase quantity"
                      onClick={() => setQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                      className="flex h-11 w-11 items-center justify-center text-lg text-ink-soft hover:text-ink sm:h-8 sm:w-8 sm:text-base"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.productId, item.size, item.color)}
                    className="shrink-0 py-2 text-sm text-ink-soft underline underline-offset-2 hover:text-rust"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="h-fit rounded-2xl border border-line bg-paper p-5 sm:p-6">
          <h2 className="font-display text-xl text-ink">Order Summary</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            <input
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              placeholder="Promo code (try SOLEVA10)"
              className="w-full min-w-0 flex-1 rounded-full border border-line bg-transparent px-4 py-2.5 text-xs text-ink placeholder:text-ink-soft/60 focus:border-ink focus:outline-none"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPromoApplied(promo.trim().toUpperCase() === 'SOLEVA10')}
            >
              Apply
            </Button>
          </div>
          {promoApplied && <p className="mt-2 text-xs text-pine-dark">SOLEVA10 applied — 10% off</p>}

          <div className="mt-5 space-y-2 text-sm">
            <div className="flex justify-between text-ink-soft">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>
            {promoApplied && (
              <div className="flex justify-between text-pine-dark">
                <span>Discount</span>
                <span>−${discount}</span>
              </div>
            )}
            <div className="flex justify-between text-ink-soft">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
            </div>
            <div className="flex justify-between border-t border-line pt-3 text-base font-medium text-ink">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>

          <Link to="/checkout">
            <Button className="mt-6 w-full" size="lg">
              Checkout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
