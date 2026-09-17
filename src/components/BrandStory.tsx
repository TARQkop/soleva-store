export default function BrandStory() {
  return (
    <section className="container-page py-20 sm:py-28">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 aspect-[4/5] overflow-hidden rounded-3xl lg:order-1">
          <img
            src="https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=1200&q=80"
            alt="Person lacing up SOLEVA sneakers outdoors"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="order-1 lg:order-2">
          <p className="text-xs tracking-[0.2em] text-ink-soft">OUR STORY</p>
          <h2 className="mt-4 max-w-md font-display text-[length:clamp(2rem,9vw,2.25rem)] leading-[1.05] text-ink sm:text-5xl">
            Built to move with you.
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-soft">
            SOLEVA started with a simple question: why should performance and
            style live in separate shoes? Every pair we make starts on the
            testing track and ends on the street — engineered for real days,
            not just photoshoots. We work with small manufacturing partners
            who share our standard for material quality and fair labor
            practices.
          </p>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft">
            A decade in, we're still run by the same three friends who
            hand-built the first prototypes in a garage — now designing for
            people in more than forty countries.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-x-4 gap-y-6 border-t border-line pt-6 sm:gap-6">
            <div>
              <p className="font-display text-2xl text-ink">10+</p>
              <p className="text-xs text-ink-soft">Years in craft</p>
            </div>
            <div>
              <p className="font-display text-2xl text-ink">40</p>
              <p className="text-xs text-ink-soft">Countries shipped</p>
            </div>
            <div>
              <p className="font-display text-2xl text-ink">120k</p>
              <p className="text-xs text-ink-soft">Happy runners</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
