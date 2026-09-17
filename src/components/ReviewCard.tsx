import { Review } from '../types'
import StarRating from './StarRating'

export default function ReviewCard({ review }: { review: Review }) {
  const initials = review.author
    .split(' ')
    .map((n) => n[0])
    .join('')

  return (
    <div className="flex h-full min-w-0 flex-col rounded-2xl border border-line bg-paper p-5 sm:p-6">
      <div className="flex min-w-0 items-center gap-3">
        <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-pine/10 text-xs font-medium text-pine-dark">
          {review.avatar ? (
            <img src={review.avatar} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="flex h-full w-full items-center justify-center">{initials}</span>
          )}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-ink">{review.author}</p>
          {review.verified && <p className="text-[11px] text-ink-soft">Verified buyer</p>}
        </div>
      </div>
      <div className="mt-4">
        <StarRating rating={review.rating} size={13} />
      </div>
      <p className="mt-3 text-sm font-medium text-ink">{review.title}</p>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{review.body}</p>
      <p className="mt-4 text-[11px] text-ink-soft/70">
        {new Date(review.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
      </p>
    </div>
  )
}
