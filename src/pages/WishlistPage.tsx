import { Link } from 'react-router-dom'
import { products } from '../data/products'
import { useWishlist } from '../context/WishlistContext'
import ProductGrid from '../components/ProductGrid'
import Button from '../components/Button'

export default function WishlistPage() {
  const { ids } = useWishlist()
  const saved = products.filter((p) => ids.has(p.id))

  return (
    <div className="container-page py-10 sm:py-14">
      <h1 className="font-display text-[length:clamp(1.75rem,7vw,1.875rem)] text-ink sm:text-4xl">Wishlist</h1>
      <p className="mt-1 text-sm text-ink-soft">{saved.length} saved items</p>

      <div className="mt-8">
        {saved.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-line px-5 py-16 text-center sm:py-24">
            <p className="font-display text-xl text-ink">Nothing saved yet</p>
            <p className="text-sm text-ink-soft">Tap the heart icon on any product to save it here.</p>
            <Link to="/shop">
              <Button size="sm">Browse Shop</Button>
            </Link>
          </div>
        ) : (
          <ProductGrid products={saved} />
        )}
      </div>
    </div>
  )
}
