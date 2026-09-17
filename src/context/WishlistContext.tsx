import { createContext, useContext, useState, ReactNode } from 'react'

interface WishlistContextValue {
  ids: Set<string>
  toggle: (productId: string) => boolean
  isSaved: (productId: string) => boolean
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<Set<string>>(new Set())

  const toggle = (productId: string) => {
    let added = false
    setIds((prev) => {
      const next = new Set(prev)
      if (next.has(productId)) {
        next.delete(productId)
        added = false
      } else {
        next.add(productId)
        added = true
      }
      return next
    })
    return added
  }

  const isSaved = (productId: string) => ids.has(productId)

  return (
    <WishlistContext.Provider value={{ ids, toggle, isSaved }}>{children}</WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
