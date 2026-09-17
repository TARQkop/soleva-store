interface StarRatingProps {
  rating: number
  size?: number
  showValue?: boolean
  reviewCount?: number
}

export default function StarRating({ rating, size = 14, showValue, reviewCount }: StarRatingProps) {
  return (
    <div className="flex min-w-0 flex-wrap items-center gap-1.5" role="img" aria-label={`Rated ${rating} out of 5 stars`}>
      <div className="flex shrink-0" style={{ gap: 2 }}>
        {Array.from({ length: 5 }).map((_, i) => {
          const fill = Math.min(1, Math.max(0, rating - i))
          return (
            <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
              <svg width={size} height={size} viewBox="0 0 20 20" className="absolute inset-0 text-line">
                <path
                  fill="currentColor"
                  d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6z"
                />
              </svg>
              <span className="absolute inset-0 overflow-hidden text-rust" style={{ width: `${fill * 100}%` }}>
                <svg width={size} height={size} viewBox="0 0 20 20">
                  <path
                    fill="currentColor"
                    d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6z"
                  />
                </svg>
              </span>
            </span>
          )
        })}
      </div>
      {showValue && <span className="text-xs text-ink-soft">{rating.toFixed(1)}</span>}
      {reviewCount !== undefined && (
        <span className="text-xs text-ink-soft">({reviewCount})</span>
      )}
    </div>
  )
}
