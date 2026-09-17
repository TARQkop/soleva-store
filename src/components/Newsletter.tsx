import { FormEvent, useState } from 'react'
import Button from './Button'
import { useToast } from '../context/ToastContext'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { showToast } = useToast()

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email.includes('@')) {
      showToast({ title: 'Enter a valid email', variant: 'error' })
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setEmail('')
      showToast({ title: 'You\u2019re subscribed', description: 'Check your inbox for your code.', variant: 'success' })
    }, 900)
  }

  return (
    <section className="bg-ink py-20 sm:py-24">
      <div className="container-page flex flex-col items-center text-center">
        <h2 className="max-w-lg font-display text-[length:clamp(2rem,9vw,2.25rem)] leading-tight text-cream sm:text-5xl">
          Get 10% off your first step.
        </h2>
        <p className="mt-4 max-w-sm text-sm text-cream/60">
          Sign up for early access to new drops, restocks, and member-only pricing.
        </p>
        <form onSubmit={onSubmit} className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full min-w-0 flex-1 rounded-full border border-cream/25 bg-transparent px-5 py-3.5 text-sm text-cream placeholder:text-cream/40 focus:border-cream focus:outline-none"
          />
          <Button type="submit" variant="secondary" size="lg" isLoading={submitting} className="w-full shrink-0 sm:w-auto">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  )
}
