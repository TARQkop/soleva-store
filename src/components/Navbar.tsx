import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import solevaLogo from '../../assets/soleva_logo_transparent.png'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import MobileNav from './MobileNav'
import SearchOverlay from './SearchOverlay'

const links = [
  { label: 'Men', to: '/shop?gender=Men' },
  { label: 'Women', to: '/shop?gender=Women' },
  { label: 'Sneakers', to: '/shop?category=Sneakers' },
  { label: 'New Arrivals', to: '/shop?filter=new' },
  { label: 'Sale', to: '/shop?filter=sale' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { count, openDrawer } = useCart()
  const { ids } = useWishlist()

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-cream/90 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-2 sm:h-20">
        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <button
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className="touch-target -ml-2 flex h-11 w-11 items-center justify-center rounded-full hover:bg-stone"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M2.5 5.5H17.5M2.5 10H17.5M2.5 14.5H17.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <Link to="/" className="flex shrink-0 items-center gap-1 font-display text-xl tracking-tight text-ink xs:text-2xl sm:text-[26px]">
          <img src={solevaLogo} alt="" className="h-12 w-12 object-contain opacity-70 [filter:brightness(0)] sm:h-7 sm:w-8" />
          SOLEVA
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                `group relative rounded-full px-3 py-2 text-sm text-ink-soft transition-all duration-300 hover:bg-stone/70 hover:text-pine ${isActive ? 'text-ink' : ''}`
              }
            >
              <span>{link.label}</span>
              <span className="absolute bottom-1 left-3 right-3 h-0.5 origin-left scale-x-0 rounded-full bg-rust transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-0.5 sm:gap-2">
          <button
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
            className="touch-target flex h-11 w-11 items-center justify-center rounded-full hover:bg-stone"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.4" />
              <path d="M16 16L12.3 12.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
          <Link
            to="/wishlist"
            aria-label={`Wishlist, ${ids.size} items`}
            className="touch-target relative hidden h-11 w-11 items-center justify-center rounded-full hover:bg-stone sm:flex"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M9 15.5s-6.5-3.9-6.5-8.6a3.9 3.9 0 016.5-2.9 3.9 3.9 0 016.5 2.9c0 4.7-6.5 8.6-6.5 8.6z"
                stroke="currentColor"
                strokeWidth="1.3"
              />
            </svg>
            {ids.size > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-pine text-[10px] text-cream">
                {ids.size}
              </span>
            )}
          </Link>
          <button
            aria-label={`Shopping bag, ${count} items`}
            onClick={openDrawer}
            className="touch-target relative flex h-11 w-11 items-center justify-center rounded-full hover:bg-stone"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4.5 6.5h9l-.7 8.4a1 1 0 01-1 .9H6.2a1 1 0 01-1-.9L4.5 6.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
              <path d="M6.5 6V4.8a2.5 2.5 0 015 0V6" stroke="currentColor" strokeWidth="1.3" />
            </svg>
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-rust text-[10px] text-cream">
                {count}
              </span>
            )}
          </button>
          <button
            aria-label="Account"
            className="touch-target -mr-1 hidden h-11 w-11 items-center justify-center rounded-full hover:bg-stone sm:flex"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="6" r="3" stroke="currentColor" strokeWidth="1.3" />
              <path d="M3 15c.9-2.8 3.3-4.3 6-4.3s5.1 1.5 6 4.3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} links={links} />
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  )
}
