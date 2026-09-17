export type Gender = 'Men' | 'Women' | 'Unisex'

export type Category =
  | 'Sneakers'
  | 'Running'
  | 'Casual'
  | 'Basketball'
  | 'Boots'

export interface ColorOption {
  name: string
  hex: string
  image: string
}

export interface Review {
  id: string
  author: string
  avatar?: string
  rating: number
  date: string
  title: string
  body: string
  verified: boolean
}

export interface Product {
  id: string
  slug: string
  name: string
  brandLine: string
  shortDescription: string
  description: string
  price: number
  compareAtPrice?: number
  category: Category
  gender: Gender
  isNew?: boolean
  isBestSeller?: boolean
  rating: number
  reviewCount: number
  sizes: number[]
  colors: ColorOption[]
  images: string[]
  specs: { label: string; value: string }[]
  reviews: Review[]
}

export interface CartLine {
  productId: string
  size: number
  color: string
  quantity: number
}

export type SortOption =
  | 'featured'
  | 'newest'
  | 'price-asc'
  | 'price-desc'
  | 'rated'

export interface FilterState {
  categories: Category[]
  genders: Gender[]
  sizes: number[]
  colors: string[]
  minRating: number
  priceMin: number
  priceMax: number
  onSaleOnly: boolean
  newOnly: boolean
}
