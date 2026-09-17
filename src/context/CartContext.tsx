import { createContext, useContext, useMemo, useReducer, ReactNode } from 'react'
import { CartLine, Product } from '../types'
import { products } from '../data/products'

interface CartItem extends CartLine {
  product: Product
}

interface CartState {
  lines: CartLine[]
}

type CartAction =
  | { type: 'ADD'; line: CartLine }
  | { type: 'REMOVE'; productId: string; size: number; color: string }
  | { type: 'SET_QTY'; productId: string; size: number; color: string; quantity: number }
  | { type: 'CLEAR' }

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const existing = state.lines.find(
        (l) =>
          l.productId === action.line.productId &&
          l.size === action.line.size &&
          l.color === action.line.color
      )
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            l === existing ? { ...l, quantity: l.quantity + action.line.quantity } : l
          ),
        }
      }
      return { lines: [...state.lines, action.line] }
    }
    case 'REMOVE':
      return {
        lines: state.lines.filter(
          (l) =>
            !(l.productId === action.productId && l.size === action.size && l.color === action.color)
        ),
      }
    case 'SET_QTY':
      return {
        lines: state.lines.map((l) =>
          l.productId === action.productId && l.size === action.size && l.color === action.color
            ? { ...l, quantity: Math.max(1, action.quantity) }
            : l
        ),
      }
    case 'CLEAR':
      return { lines: [] }
    default:
      return state
  }
}

interface CartContextValue {
  items: CartItem[]
  count: number
  subtotal: number
  isDrawerOpen: boolean
  openDrawer: () => void
  closeDrawer: () => void
  addToCart: (line: CartLine) => void
  removeFromCart: (productId: string, size: number, color: string) => void
  setQuantity: (productId: string, size: number, color: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [] })
  const [isDrawerOpen, setDrawerOpen] = useReducer((_: boolean, v: boolean) => v, false)

  const items: CartItem[] = useMemo(
    () =>
      state.lines
        .map((line) => {
          const product = products.find((p) => p.id === line.productId)
          return product ? { ...line, product } : null
        })
        .filter((x): x is CartItem => Boolean(x)),
    [state.lines]
  )

  const count = items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = items.reduce((sum, i) => sum + i.quantity * i.product.price, 0)

  const value: CartContextValue = {
    items,
    count,
    subtotal,
    isDrawerOpen,
    openDrawer: () => setDrawerOpen(true),
    closeDrawer: () => setDrawerOpen(false),
    addToCart: (line) => {
      dispatch({ type: 'ADD', line })
      setDrawerOpen(true)
    },
    removeFromCart: (productId, size, color) => dispatch({ type: 'REMOVE', productId, size, color }),
    setQuantity: (productId, size, color, quantity) =>
      dispatch({ type: 'SET_QTY', productId, size, color, quantity }),
    clearCart: () => dispatch({ type: 'CLEAR' }),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
