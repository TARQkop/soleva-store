import { Product, Review } from '../types'

const img = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

const reviewPool: Omit<Review, 'id'>[] = [
  {
    author: 'Maren K.',
    rating: 5,
    date: '2026-07-02',
    title: 'Better than expected',
    body: 'The fit is true to size and the cushioning holds up after long days on my feet. Worth the price.',
    verified: true,
  },
  {
    author: 'Josiah T.',
    rating: 4,
    date: '2026-06-19',
    title: 'Great everyday shoe',
    body: 'Comfortable out of the box, no break-in period needed. Only wish there were more color options.',
    verified: true,
  },
  {
    author: 'Priya N.',
    rating: 5,
    date: '2026-05-28',
    title: 'These are my third pair',
    body: 'I keep coming back to SOLEVA. Consistent quality and the sizing has never let me down.',
    verified: true,
  },
  {
    author: 'Elliot R.',
    rating: 3,
    date: '2026-05-11',
    title: 'Good, but runs slightly narrow',
    body: "Solid construction and style, but I'd size up half a size if you have wider feet.",
    verified: false,
  },
  {
    author: 'Camille D.',
    rating: 5,
    date: '2026-04-30',
    title: 'Compliments every time I wear them',
    body: 'The colorway is even nicer in person. Lightweight and breathable for all-day wear.',
    verified: true,
  },
  {
    author: 'Theo B.',
    rating: 4,
    date: '2026-04-08',
    title: 'Reliable pair for training',
    body: 'Good grip and support during workouts. Sole is holding up well after two months of regular use.',
    verified: true,
  },
]

function makeReviews(seed: number, count: number): Review[] {
  const list: Review[] = []
  for (let i = 0; i < count; i++) {
    const base = reviewPool[(seed + i) % reviewPool.length]
    list.push({ ...base, id: `r-${seed}-${i}` })
  }
  return list
}

const sizesStandard = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12, 13]

export const products: Product[] = [
  {
    id: 'p1',
    slug: 'aero-runner-low',
    name: 'Aero Runner Low',
    brandLine: 'SOLEVA Running',
    shortDescription: 'Featherweight mesh runner with responsive foam.',
    description:
      'Built for daily mileage, the Aero Runner Low pairs an engineered mesh upper with a responsive dual-density foam midsole. A carbon-infused shank plate adds a subtle propulsive feel without weighing you down.',
    price: 128,
    compareAtPrice: 155,
    category: 'Running',
    gender: 'Unisex',
    isNew: true,
    rating: 4.6,
    reviewCount: 214,
    sizes: sizesStandard,
    colors: [
      { name: 'Pine Green', hex: '#2C4A34', image: img('photo-1542291026-7eec264c27ff') },
      { name: 'Chalk White', hex: '#F2EFE6', image: img('photo-1595950653106-6c9ebd614d3a') },
      { name: 'Charcoal', hex: '#33312B', image: img('photo-1460353581641-37baddab0fa2') },
    ],
    images: [
      img('photo-1542291026-7eec264c27ff', 1200),
      img('photo-1595950653106-6c9ebd614d3a', 1200),
      img('photo-1460353581641-37baddab0fa2', 1200),
      img('photo-1549298916-b41d501d3772', 1200),
    ],
    specs: [
      { label: 'Upper', value: 'Engineered mesh with fused overlays' },
      { label: 'Midsole', value: 'Dual-density responsive foam' },
      { label: 'Outsole', value: 'Carbon rubber, multi-directional traction' },
      { label: 'Weight', value: '238g (US M9)' },
      { label: 'Drop', value: '8mm heel-to-toe' },
    ],
    reviews: makeReviews(1, 3),
  },
  {
    id: 'p2',
    slug: 'court-classic-mid',
    name: 'Court Classic Mid',
    brandLine: 'SOLEVA Basketball',
    shortDescription: 'High-grip basketball silhouette with ankle support.',
    description:
      'The Court Classic Mid brings padded ankle support and a herringbone traction pattern for quick cuts on hardwood. A supportive TPU cage locks the midfoot for confident lateral movement.',
    price: 149,
    category: 'Basketball',
    gender: 'Men',
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 342,
    sizes: sizesStandard,
    colors: [
      { name: 'Black/White', hex: '#1C1B17', image: img('photo-1491553895911-0055eca6402d') },
      { name: 'Rust', hex: '#B65C3A', image: img('photo-1465453869711-7e174808ace9') },
    ],
    images: [
      img('photo-1491553895911-0055eca6402d', 1200),
      img('photo-1465453869711-7e174808ace9', 1200),
      img('photo-1525966222134-fcfa99b8ae77', 1200),
      img('photo-1608231387042-66d1773070a5', 1200),
    ],
    specs: [
      { label: 'Upper', value: 'Synthetic leather with TPU cage' },
      { label: 'Midsole', value: 'Compression-molded EVA' },
      { label: 'Outsole', value: 'Herringbone traction rubber' },
      { label: 'Weight', value: '340g (US M9)' },
      { label: 'Collar', value: 'Padded mid-top support' },
    ],
    reviews: makeReviews(2, 4),
  },
  {
    id: 'p3',
    slug: 'street-form-sneaker',
    name: 'Street Form Sneaker',
    brandLine: 'SOLEVA Sneakers',
    shortDescription: 'Minimalist leather sneaker for everyday wear.',
    description:
      'A clean silhouette built from full-grain leather with a cupsole construction for durability. Street Form pairs effortlessly with denim or tailoring alike.',
    price: 118,
    compareAtPrice: 140,
    category: 'Sneakers',
    gender: 'Unisex',
    isNew: true,
    rating: 4.5,
    reviewCount: 176,
    sizes: sizesStandard,
    colors: [
      { name: 'Cream', hex: '#F2EFE6', image: img('photo-1560769629-975ec94e6a86') },
      { name: 'Black', hex: '#1C1B17', image: img('photo-1556906781-9a412961c28c') },
    ],
    images: [
      img('photo-1560769629-975ec94e6a86', 1200),
      img('photo-1556906781-9a412961c28c', 1200),
      img('photo-1543508282-6319a3e2621f', 1200),
      img('photo-1595341888016-a392ef81b7de', 1200),
    ],
    specs: [
      { label: 'Upper', value: 'Full-grain leather' },
      { label: 'Midsole', value: 'Cupsole EVA construction' },
      { label: 'Outsole', value: 'Vulcanized rubber' },
      { label: 'Weight', value: '310g (US M9)' },
      { label: 'Lining', value: 'Breathable textile' },
    ],
    reviews: makeReviews(3, 3),
  },
  {
    id: 'p4',
    slug: 'trail-guard-boot',
    name: 'Trail Guard Boot',
    brandLine: 'SOLEVA Boots',
    shortDescription: 'Waterproof boot built for rough terrain.',
    description:
      'Trail Guard combines a waterproof membrane with a protective rubber toe cap and lugged outsole for confident grip on wet or uneven ground.',
    price: 189,
    category: 'Boots',
    gender: 'Men',
    rating: 4.7,
    reviewCount: 98,
    sizes: sizesStandard,
    colors: [
      { name: 'Espresso', hex: '#4A3427', image: img('photo-1520256862855-398228c41684') },
      { name: 'Charcoal', hex: '#33312B', image: img('photo-1606107557195-0e29a4b5b4aa') },
    ],
    images: [
      img('photo-1520256862855-398228c41684', 1200),
      img('photo-1606107557195-0e29a4b5b4aa', 1200),
      img('photo-1587563871167-1ee9c731aefb', 1200),
      img('photo-1554062614-6da4fa67725f', 1200),
    ],
    specs: [
      { label: 'Upper', value: 'Waterproof nubuck leather' },
      { label: 'Membrane', value: 'Sealed waterproof liner' },
      { label: 'Outsole', value: 'Lugged rubber, oil-resistant' },
      { label: 'Weight', value: '480g (US M9)' },
      { label: 'Shaft height', value: '5.5 inches' },
    ],
    reviews: makeReviews(4, 3),
  },
  {
    id: 'p5',
    slug: 'glide-knit-runner',
    name: 'Glide Knit Runner',
    brandLine: 'SOLEVA Running',
    shortDescription: 'Sock-fit knit runner for long distances.',
    description:
      'A seamless knit upper wraps the foot for a sock-like fit, while a full-length foam midsole absorbs impact mile after mile.',
    price: 135,
    category: 'Running',
    gender: 'Women',
    rating: 4.4,
    reviewCount: 156,
    sizes: sizesStandard,
    colors: [
      { name: 'Blush', hex: '#C9A69A', image: img('photo-1571019613454-1cb2f99b2d8b') },
      { name: 'Ink', hex: '#1C1B17', image: img('photo-1542291026-7eec264c27ff') },
    ],
    images: [
      img('photo-1571019613454-1cb2f99b2d8b', 1200),
      img('photo-1542291026-7eec264c27ff', 1200),
      img('photo-1595950653106-6c9ebd614d3a', 1200),
    ],
    specs: [
      { label: 'Upper', value: 'Seamless engineered knit' },
      { label: 'Midsole', value: 'Full-length responsive foam' },
      { label: 'Outsole', value: 'Blown rubber, flex grooves' },
      { label: 'Weight', value: '212g (US W8)' },
      { label: 'Drop', value: '6mm heel-to-toe' },
    ],
    reviews: makeReviews(5, 3),
  },
  {
    id: 'p6',
    slug: 'daily-slip-casual',
    name: 'Daily Slip Casual',
    brandLine: 'SOLEVA Casual',
    shortDescription: 'Slip-on canvas shoe for warm-weather ease.',
    description:
      'A relaxed canvas slip-on with an elastic gusset for easy on-off and a memory foam footbed for all-day comfort.',
    price: 79,
    compareAtPrice: 95,
    category: 'Casual',
    gender: 'Unisex',
    rating: 4.3,
    reviewCount: 121,
    sizes: sizesStandard,
    colors: [
      { name: 'Natural', hex: '#DCD5C4', image: img('photo-1595341888016-a392ef81b7de') },
      { name: 'Navy', hex: '#2B3548', image: img('photo-1560769629-975ec94e6a86') },
    ],
    images: [
      img('photo-1595341888016-a392ef81b7de', 1200),
      img('photo-1560769629-975ec94e6a86', 1200),
      img('photo-1543508282-6319a3e2621f', 1200),
    ],
    specs: [
      { label: 'Upper', value: 'Organic cotton canvas' },
      { label: 'Insole', value: 'Memory foam footbed' },
      { label: 'Outsole', value: 'Natural rubber' },
      { label: 'Weight', value: '260g (US M9)' },
      { label: 'Closure', value: 'Elastic gusset, slip-on' },
    ],
    reviews: makeReviews(0, 3),
  },
  {
    id: 'p7',
    slug: 'high-arc-basketball',
    name: 'High Arc Basketball',
    brandLine: 'SOLEVA Basketball',
    shortDescription: 'High-top with reactive cushioning for explosive play.',
    description:
      'High Arc is built for players who need support above the ankle without sacrificing responsiveness. A full-length air chamber returns energy on every step.',
    price: 165,
    category: 'Basketball',
    gender: 'Men',
    isNew: true,
    rating: 4.6,
    reviewCount: 88,
    sizes: sizesStandard,
    colors: [
      { name: 'Team Black', hex: '#1C1B17', image: img('photo-1491553895911-0055eca6402d') },
      { name: 'Electric', hex: '#2C4A34', image: img('photo-1491553895911-0055eca6402d') },
    ],
    images: [
      img('photo-1491553895911-0055eca6402d', 1200),
      img('photo-1491553895911-0055eca6402d', 1200),
      img('photo-1465453869711-7e174808ace9', 1200),
    ],
    specs: [
      { label: 'Upper', value: 'Ripstop textile with TPU overlays' },
      { label: 'Midsole', value: 'Full-length air cushioning' },
      { label: 'Outsole', value: 'Herringbone traction, wide base' },
      { label: 'Weight', value: '380g (US M9)' },
      { label: 'Collar', value: 'High-top ankle support' },
    ],
    reviews: makeReviews(6, 3),
  },
  {
    id: 'p8',
    slug: 'weekend-low-sneaker',
    name: 'Weekend Low Sneaker',
    brandLine: 'SOLEVA Sneakers',
    shortDescription: 'Retro-inspired low-top with suede accents.',
    description:
      'Weekend Low blends a canvas base with suede overlays for a retro court-inspired look, finished with a gum rubber outsole.',
    price: 109,
    category: 'Sneakers',
    gender: 'Women',
    rating: 4.5,
    reviewCount: 203,
    sizes: sizesStandard,
    colors: [
      { name: 'Sand', hex: '#DCD5C4', image: img('photo-1543508282-6319a3e2621f') },
      { name: 'Forest', hex: '#2C4A34', image: img('photo-1556906781-9a412961c28c') },
    ],
    images: [
      img('photo-1543508282-6319a3e2621f', 1200),
      img('photo-1556906781-9a412961c28c', 1200),
      img('photo-1560769629-975ec94e6a86', 1200),
    ],
    specs: [
      { label: 'Upper', value: 'Canvas with suede overlays' },
      { label: 'Midsole', value: 'Molded EVA' },
      { label: 'Outsole', value: 'Gum rubber' },
      { label: 'Weight', value: '270g (US W8)' },
      { label: 'Lining', value: 'Soft textile' },
    ],
    reviews: makeReviews(1, 4),
  },
  {
    id: 'p9',
    slug: 'summit-hiker-boot',
    name: 'Summit Hiker Boot',
    brandLine: 'SOLEVA Boots',
    shortDescription: 'Lightweight hiking boot with rugged grip.',
    description:
      'Summit Hiker cuts weight without cutting protection — a breathable ripstop upper, protective toe rand, and an aggressive multi-terrain outsole.',
    price: 172,
    compareAtPrice: 199,
    category: 'Boots',
    gender: 'Women',
    rating: 4.7,
    reviewCount: 64,
    sizes: sizesStandard,
    colors: [
      { name: 'Moss', hex: '#3F6249', image: img('photo-1606107557195-0e29a4b5b4aa') },
      { name: 'Stone', hex: '#DCD5C4', image: img('photo-1587563871167-1ee9c731aefb') },
    ],
    images: [
      img('photo-1606107557195-0e29a4b5b4aa', 1200),
      img('photo-1587563871167-1ee9c731aefb', 1200),
      img('photo-1520256862855-398228c41684', 1200),
    ],
    specs: [
      { label: 'Upper', value: 'Ripstop textile, protective toe rand' },
      { label: 'Midsole', value: 'Dual-density EVA' },
      { label: 'Outsole', value: 'Multi-terrain lugged rubber' },
      { label: 'Weight', value: '390g (US W8)' },
      { label: 'Shaft height', value: '5 inches' },
    ],
    reviews: makeReviews(3, 3),
  },
  {
    id: 'p10',
    slug: 'pulse-trainer',
    name: 'Pulse Trainer',
    brandLine: 'SOLEVA Running',
    shortDescription: 'Cross-training shoe with a stable, wide base.',
    description:
      'Pulse Trainer is built for the gym floor: a flat, stable base for lifting, breathable mesh for cardio, and reinforced lateral support for agility drills.',
    price: 132,
    category: 'Running',
    gender: 'Men',
    rating: 4.5,
    reviewCount: 142,
    sizes: sizesStandard,
    colors: [
      { name: 'Graphite', hex: '#33312B', image: img('photo-1460353581641-37baddab0fa2') },
      { name: 'Rust', hex: '#B65C3A', image: img('photo-1549298916-b41d501d3772') },
    ],
    images: [
      img('photo-1460353581641-37baddab0fa2', 1200),
      img('photo-1549298916-b41d501d3772', 1200),
      img('photo-1542291026-7eec264c27ff', 1200),
    ],
    specs: [
      { label: 'Upper', value: 'Breathable mesh, reinforced sides' },
      { label: 'Midsole', value: 'Flat, stable EVA base' },
      { label: 'Outsole', value: 'Wide-footprint rubber' },
      { label: 'Weight', value: '298g (US M9)' },
      { label: 'Drop', value: '4mm heel-to-toe' },
    ],
    reviews: makeReviews(2, 3),
  },
  {
    id: 'p11',
    slug: 'metro-lifestyle-sneaker',
    name: 'Metro Lifestyle Sneaker',
    brandLine: 'SOLEVA Sneakers',
    shortDescription: 'Chunky sole sneaker with modern proportions.',
    description:
      'Metro pairs an oversized cupsole with a mixed-material upper for a statement silhouette that still feels light underfoot.',
    price: 145,
    category: 'Sneakers',
    gender: 'Unisex',
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 289,
    sizes: sizesStandard,
    colors: [
      { name: 'Off-White', hex: '#F2EFE6', image: img('photo-1595950653106-6c9ebd614d3a') },
      { name: 'Black', hex: '#1C1B17', image: img('photo-1595341888016-a392ef81b7de') },
      { name: 'Rust', hex: '#B65C3A', image: img('photo-1465453869711-7e174808ace9') },
    ],
    images: [
      img('photo-1595950653106-6c9ebd614d3a', 1200),
      img('photo-1595341888016-a392ef81b7de', 1200),
      img('photo-1465453869711-7e174808ace9', 1200),
      img('photo-1525966222134-fcfa99b8ae77', 1200),
    ],
    specs: [
      { label: 'Upper', value: 'Mixed leather and mesh' },
      { label: 'Midsole', value: 'Oversized dual-density cupsole' },
      { label: 'Outsole', value: 'Textured rubber' },
      { label: 'Weight', value: '330g (US M9)' },
      { label: 'Lining', value: 'Cushioned textile' },
    ],
    reviews: makeReviews(4, 5),
  },
  {
    id: 'p12',
    slug: 'featherlite-racer',
    name: 'Featherlite Racer',
    brandLine: 'SOLEVA Running',
    shortDescription: 'Race-day runner built for speed.',
    description:
      'Featherlite Racer strips away excess weight for tempo runs and race day, with a propulsive plate and a minimal, snug-fitting upper.',
    price: 158,
    category: 'Running',
    gender: 'Unisex',
    isNew: true,
    rating: 4.6,
    reviewCount: 47,
    sizes: sizesStandard,
    colors: [
      { name: 'Volt', hex: '#2C4A34', image: img('photo-1571019613454-1cb2f99b2d8b') },
      { name: 'White', hex: '#F2EFE6', image: img('photo-1542291026-7eec264c27ff') },
    ],
    images: [
      img('photo-1571019613454-1cb2f99b2d8b', 1200),
      img('photo-1542291026-7eec264c27ff', 1200),
      img('photo-1595950653106-6c9ebd614d3a', 1200),
    ],
    specs: [
      { label: 'Upper', value: 'Minimal engineered mesh' },
      { label: 'Midsole', value: 'Nitrogen-infused foam with plate' },
      { label: 'Outsole', value: 'High-abrasion rubber, forefoot only' },
      { label: 'Weight', value: '196g (US M9)' },
      { label: 'Drop', value: '5mm heel-to-toe' },
    ],
    reviews: makeReviews(5, 2),
  },
]

export const bestSeller = products.find((p) => p.isBestSeller && p.id === 'p11')!

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function relatedProducts(product: Product, count = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .concat(products.filter((p) => p.id !== product.id && p.category !== product.category))
    .slice(0, count)
}
