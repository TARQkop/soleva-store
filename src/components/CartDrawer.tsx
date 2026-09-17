import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import Button from './Button'

export default function CartDrawer() {
  const { items, count, subtotal, isDrawerOpen, closeDrawer, removeFromCart, setQuantity } = useCart()
  const [promo, setPromo] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isDrawerOpen])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && closeDrawer()
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [closeDrawer])

  if (!isDrawerOpen) return null

  const shipping = subtotal === 0 || subtotal >= 100 ? 0 : 9
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0
  const total = Math.max(0, subtotal - discount + shipping)

  const applyPromo = () => {
    if (promo.trim().toUpperCase() === 'SOLEVA10') {
      setPromoApplied(true)
    } else {
      setPromoApplied(false)
    }
  }

  return createPortal(
    <div className="fixed inset-0 z-[85]">
      <div className="absolute inset-0 bg-ink/50 animate-fade-in" onClick={closeDrawer} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-paper pt-[env(safe-area-inset-top)] shadow-lift animate-slide-in-right"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-line px-5 py-4 sm:px-6 sm:py-5">
          <h2 className="font-display text-xl text-ink">Your Bag ({count})</h2>
          <button
            onClick={closeDrawer}
            aria-label="Close cart"
            className="touch-target -mr-2 flex h-10 w-10 items-center justify-center rounded-full hover:bg-stone"
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <svg width="44" height="44" viewBox="0 0 18 18" fill="none" className="text-ink-soft">
              <path d="M4.5 6.5h9l-.7 8.4a1 1 0 01-1 .9H6.2a1 1 0 01-1-.9L4.5 6.5z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
              <path d="M6.5 6V4.8a2.5 2.5 0 015 0V6" stroke="currentColor" strokeWidth="1.1" />
            </svg>
            <div>
              <p className="font-display text-lg text-ink">Your bag is empty</p>
              <p className="mt-1 text-sm text-ink-soft">Looks like you haven&rsquo;t added anything yet.</p>
            </div>
            <Button onClick={closeDrawer} size="sm">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto overscroll-contain thin-scroll px-5 py-4 sm:px-6">
              {items.map((item) => (
                <li key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-4 border-b border-line py-4 first:pt-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="h-24 w-20 shrink-0 rounded-xl object-cover"
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <Link to={`/product/${item.product.slug}`} onClick={closeDrawer} className="text-sm font-medium text-ink hover:underline">
                          {item.product.name}
                        </Link>
                        <p className="mt-0.5 text-xs text-ink-soft">
                          {item.color} · Size {item.size}
                        </p>
                      </div>
                      <span className="shrink-0 text-sm text-ink">${item.product.price * item.quantity}</span>
                    </div>
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-x-2 gap-y-2 pt-2">
                      <div className="flex items-center rounded-full border border-line">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() => setQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                          className="flex h-10 w-10 items-center justify-center text-base text-ink-soft hover:text-ink sm:h-7 sm:w-7 sm:text-sm"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-xs text-ink">{item.quantity}</span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() => setQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                          className="flex h-10 w-10 items-center justify-center text-base text-ink-soft hover:text-ink sm:h-7 sm:w-7 sm:text-sm"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.productId, item.size, item.color)}
                        className="shrink-0 py-1.5 text-xs text-ink-soft underline underline-offset-2 hover:text-rust"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="shrink-0 border-t border-line px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6 sm:pt-5 sm:pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              <div className="flex flex-wrap gap-2">
                <input
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  placeholder="Promo code (try SOLEVA10)"
                  className="w-full min-w-0 flex-1 rounded-full border border-line bg-transparent px-4 py-2.5 text-xs text-ink placeholder:text-ink-soft/60 focus:border-ink focus:outline-none"
                />
                <Button variant="outline" size="sm" onClick={applyPromo}>
                  Apply
                </Button>
              </div>
              {promoApplied && <p className="mt-2 text-xs text-pine-dark">SOLEVA10 applied — 10% off</p>}

              <div className="mt-4 space-y-1.5 text-sm">
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
                <div className="flex justify-between border-t border-line pt-2 text-base font-medium text-ink">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>

              <Link to="/checkout" onClick={closeDrawer}>
                <Button className="mt-5 w-full" size="lg">
                  Checkout
                </Button>
              </Link>
              <Link to="/cart" onClick={closeDrawer} className="mt-3 block text-center text-xs text-ink-soft underline underline-offset-2">
                View full cart
              </Link>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  )
}
