import { FormEvent, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import Button from '../components/Button'

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const [placed, setPlaced] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const shipping = subtotal >= 100 ? 0 : 9
  const total = subtotal + shipping

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setPlaced(true)
      clearCart()
    }, 900)
  }

  if (placed) {
    return (
      <div className="container-page flex flex-col items-center justify-center gap-5 py-32 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pine/10 text-pine-dark">
          <svg width="26" height="26" viewBox="0 0 20 20" fill="none">
            <path d="M4 10.5l4 4L16 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="font-display text-3xl text-ink">Order confirmed</h1>
        <p className="max-w-sm text-sm text-ink-soft">
          Thanks for shopping with SOLEVA. A confirmation email is on its way with your order details and tracking info.
        </p>
        <Link to="/shop">
          <Button size="lg">Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  if (items.length === 0) return <Navigate to="/cart" replace />

  return (
    <div className="container-page py-10 sm:py-14">
      <h1 className="font-display text-[length:clamp(1.75rem,7vw,1.875rem)] text-ink sm:text-4xl">Checkout</h1>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <form onSubmit={onSubmit} className="min-w-0 space-y-8 lg:col-span-2">
          <fieldset>
            <legend className="font-display text-xl text-ink">Contact</legend>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input required type="email" placeholder="Email address" className="w-full min-w-0 rounded-xl border border-line bg-transparent px-4 py-3 text-sm focus:border-ink focus:outline-none" />
              <input required type="tel" placeholder="Phone number" className="w-full min-w-0 rounded-xl border border-line bg-transparent px-4 py-3 text-sm focus:border-ink focus:outline-none" />
            </div>
          </fieldset>

          <fieldset>
            <legend className="font-display text-xl text-ink">Shipping Address</legend>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input required placeholder="First name" className="w-full min-w-0 rounded-xl border border-line bg-transparent px-4 py-3 text-sm focus:border-ink focus:outline-none" />
              <input required placeholder="Last name" className="w-full min-w-0 rounded-xl border border-line bg-transparent px-4 py-3 text-sm focus:border-ink focus:outline-none" />
              <input required placeholder="Address" className="w-full min-w-0 rounded-xl border border-line bg-transparent px-4 py-3 text-sm focus:border-ink focus:outline-none sm:col-span-2" />
              <input required placeholder="City" className="w-full min-w-0 rounded-xl border border-line bg-transparent px-4 py-3 text-sm focus:border-ink focus:outline-none" />
              <input required placeholder="Postal code" className="w-full min-w-0 rounded-xl border border-line bg-transparent px-4 py-3 text-sm focus:border-ink focus:outline-none" />
            </div>
          </fieldset>

          <fieldset>
            <legend className="font-display text-xl text-ink">Payment</legend>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input required placeholder="Card number" className="w-full min-w-0 rounded-xl border border-line bg-transparent px-4 py-3 text-sm focus:border-ink focus:outline-none sm:col-span-2" />
              <input required placeholder="MM / YY" className="w-full min-w-0 rounded-xl border border-line bg-transparent px-4 py-3 text-sm focus:border-ink focus:outline-none" />
              <input required placeholder="CVC" className="w-full min-w-0 rounded-xl border border-line bg-transparent px-4 py-3 text-sm focus:border-ink focus:outline-none" />
            </div>
          </fieldset>

          <Button type="submit" size="lg" isLoading={submitting} className="w-full sm:w-auto">
            Place Order — ${total}
          </Button>
        </form>

        <div className="h-fit rounded-2xl border border-line bg-paper p-5 sm:p-6">
          <h2 className="font-display text-xl text-ink">Order Summary</h2>
          <ul className="mt-4 space-y-3">
            {items.map((item) => (
              <li key={`${item.productId}-${item.size}-${item.color}`} className="flex items-center gap-3">
                <img src={item.product.images[0]} alt="" className="h-12 w-12 shrink-0 rounded-lg object-cover" />
                <div className="min-w-0 flex-1 text-sm">
                  <p className="text-ink">{item.product.name}</p>
                  <p className="text-xs text-ink-soft">
                    {item.color} · {item.size} · Qty {item.quantity}
                  </p>
                </div>
                <span className="shrink-0 text-sm text-ink">${item.product.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
            <div className="flex justify-between text-ink-soft">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between text-ink-soft">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
            </div>
            <div className="flex justify-between border-t border-line pt-3 text-base font-medium text-ink">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
