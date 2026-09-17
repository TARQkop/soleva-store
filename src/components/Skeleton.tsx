export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="skeleton aspect-[4/5] w-full rounded-2xl" />
      <div className="skeleton h-3.5 w-2/3 rounded-full" />
      <div className="skeleton h-3 w-1/3 rounded-full" />
      <div className="skeleton h-3.5 w-1/4 rounded-full" />
    </div>
  )
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-8 xs:gap-x-4 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}
