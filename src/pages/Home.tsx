import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import CategoryCard from '../components/CategoryCard'
import ProductGrid from '../components/ProductGrid'
import BrandStory from '../components/BrandStory'
import BestSeller from '../components/BestSeller'
import ReviewCard from '../components/ReviewCard'
import Newsletter from '../components/Newsletter'
import { products, bestSeller } from '../data/products'
import { Review } from '../types'

const categories = [
  { name: 'Sneakers', category: 'Sneakers', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80' },
  { name: 'Running', category: 'Running', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80' },
  { name: 'Casual', category: 'Casual', image: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=600&q=80' },
  { name: 'Basketball', category: 'Basketball', image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=600&q=80' },
  { name: 'Boots', category: 'Boots', image: 'https://images.unsplash.com/photo-1520256862855-398228c41684?auto=format&fit=crop&w=600&q=80' },
  { name: 'All Shoes', category: '', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80' },
]

const testimonials: Review[] = [
  {
    id: 't1',
    author: 'Nadia F.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80',
    rating: 5,
    date: '2026-08-01',
    title: 'Exactly what I needed for marathon training',
    body: 'The cushioning held up mile after mile and the fit felt custom by week two.',
    verified: true,
  },
  {
    id: 't2',
    author: 'Marcus L.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80',
    rating: 5,
    date: '2026-07-22',
    title: 'Style and comfort, finally',
    body: 'I wear these to the office and on weekend walks. Genuinely versatile.',
    verified: true,
  },
  {
    id: 't3',
    author: 'Sana V.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
    rating: 4,
    date: '2026-07-14',
    title: 'Shipping was fast, quality is there',
    body: 'Arrived in three days and the box itself felt premium. Shoes fit true to size.',
    verified: true,
  },
]

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(t)
  }, [])

  const trending = products.slice(0, 8)
  const newArrivals = products.slice(0, 6)

  return (
    <div>
      <Hero />

      <section className="container-page py-16 sm:py-20">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-[length:clamp(1.75rem,7vw,1.875rem)] text-ink sm:text-4xl">Shop by Category</h2>
        </div>
        <div className="category-marquee mt-8 overflow-hidden">
          <div className="category-marquee-track flex w-max gap-4 sm:gap-5">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex gap-4 sm:gap-5" aria-hidden={copy === 1}>
                {categories.map((c) => (
                  <CategoryCard key={`${copy}-${c.name}`} name={c.name} image={c.image} category={c.category} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-8 sm:py-12">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs tracking-[0.2em] text-ink-soft">RIGHT NOW</p>
            <h2 className="mt-2 font-display text-[length:clamp(1.75rem,7vw,1.875rem)] text-ink sm:text-4xl">Trending Products</h2>
          </div>
          <Link to="/shop" className="hidden text-sm text-ink-soft underline underline-offset-4 hover:text-ink sm:block">
            View All
          </Link>
        </div>
        <div className="mt-8">
          <ProductGrid products={trending} isLoading={isLoading} />
        </div>
      </section>

      <section className="bg-stone/40 py-16 sm:py-20">
        <div className="container-page">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs tracking-[0.2em] text-ink-soft">JUST DROPPED</p>
              <h2 className="mt-2 font-display text-[length:clamp(1.75rem,7vw,1.875rem)] text-ink sm:text-4xl">New Arrivals</h2>
            </div>
          </div>
          <div className="new-arrivals-marquee mt-8 overflow-hidden">
            <div className="new-arrivals-marquee-track flex w-max gap-5">
              {[0, 1].map((copy) => (
                <div key={copy} className="flex gap-5" aria-hidden={copy === 1}>
                  {newArrivals.map((p) => (
                    <div key={`${copy}-${p.id}`} className="w-44 shrink-0 xs:w-52 sm:w-64">
                      <Link to={`/product/${p.slug}`} className="group block">
                        <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-paper">
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                        <p className="mt-3 text-sm font-medium text-ink">{p.name}</p>
                        <p className="text-sm text-ink-soft">${p.price}</p>
                      </Link>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link to="/shop?filter=new">
              <button className="touch-target rounded-full border border-ink px-7 py-3 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-cream">
                View All
              </button>
            </Link>
          </div>
        </div>
      </section>

      <BrandStory />

      <BestSeller product={bestSeller} />

      <section className="container-page py-16 sm:py-28">
        <div className="text-center">
          <p className="text-xs tracking-[0.2em] text-ink-soft">TESTIMONIALS</p>
          <h2 className="mt-3 font-display text-[length:clamp(1.75rem,7vw,1.875rem)] text-ink sm:text-4xl">What our customers say</h2>
        </div>
        <div className="review-marquee mt-10 overflow-hidden">
          <div className="review-marquee-track flex w-max gap-5">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex gap-5" aria-hidden={copy === 1}>
                {testimonials.map((r) => (
                  <div key={`${copy}-${r.id}`} className="w-[min(84vw,360px)] sm:w-[360px]">
                    <ReviewCard review={r} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  )
}
