import { Link } from 'react-router-dom'

interface CategoryCardProps {
  name: string
  image: string
  category: string
}

export default function CategoryCard({ name, image, category }: CategoryCardProps) {
  return (
    <Link
      to={`/shop?category=${encodeURIComponent(category)}`}
      className="group relative flex aspect-[3/4] w-36 shrink-0 overflow-hidden rounded-2xl bg-stone xs:w-40 sm:w-52"
    >
      <img
        src={image}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/0 to-ink/0" />
      <span className="absolute bottom-3 left-3 right-3 font-display text-base text-cream sm:bottom-4 sm:left-4 sm:text-lg">{name}</span>
    </Link>
  )
}
