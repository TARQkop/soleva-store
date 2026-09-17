import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="container-page hero-min-h grid grid-cols-1 items-center gap-8 py-12 sm:gap-10 sm:py-16 lg:grid-cols-2 lg:gap-6 lg:py-0">
        <div className="relative z-10 order-2 lg:order-1">
          <div className="flex animate-slide-up items-center gap-3 text-xs tracking-[0.2em] text-cream/60" style={{ animationDelay: '0ms' }}>
            <span className="h-px w-8 bg-rust" />
            <span>SOLEVA — FALL COLLECTION</span>
          </div>
          <h1
            className="mt-5 animate-slide-up font-display text-[length:clamp(2.25rem,12vw,4rem)] leading-[0.95] text-cream sm:text-6xl lg:text-[4.6rem]"
            style={{ animationDelay: '80ms' }}
          >
            Step into
            <br />
            <span className="relative inline-block text-cream">
              your next era.
              <span className="absolute -bottom-2 left-1 h-px w-16 bg-rust sm:w-24" />
            </span>
          </h1>
          <p
            className="mt-6 w-full max-w-sm animate-slide-up text-[15px] text-cream/70 sm:text-base"
            style={{ animationDelay: '160ms' }}
          >
            Footwear with a point of view. Designed for movement, made for the rhythm of everyday life.
          </p>
          <div className="mt-8 flex animate-slide-up flex-wrap gap-3 sm:mt-9" style={{ animationDelay: '240ms' }}>
            <Link
              to="/shop?gender=Men"
              className="touch-target inline-flex items-center justify-center rounded-full bg-cream px-6 py-3.5 text-center text-sm font-medium text-ink transition-all hover:-translate-y-0.5 hover:bg-pine hover:text-cream hover:shadow-lg xs:px-7"
            >
              Shop Men <span className="ml-2">↗</span>
            </Link>
            <Link
              to="/shop?gender=Women"
              className="touch-target inline-flex items-center justify-center rounded-full border border-cream/40 px-6 py-3.5 text-center text-sm font-medium text-cream transition-all hover:-translate-y-0.5 hover:border-cream hover:bg-cream/10 xs:px-7"
            >
              Shop Women <span className="ml-2">↗</span>
            </Link>
          </div>
          <div className="mt-10 flex animate-slide-up flex-wrap gap-x-6 gap-y-4 border-t border-cream/15 pt-5 sm:mt-12 sm:gap-x-7" style={{ animationDelay: '320ms' }}>
            <div>
              <p className="font-display text-xl text-cream">01</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-cream/45">Lightweight</p>
            </div>
            <div>
              <p className="font-display text-xl text-cream">24h</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-cream/45">All-day comfort</p>
            </div>
            <div>
              <p className="font-display text-xl text-cream">FW26</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-cream/45">New season</p>
            </div>
          </div>
        </div>

        <div className="relative order-1 aspect-[4/5] w-full max-w-full rounded-3xl bg-stone lg:order-2 lg:aspect-auto lg:h-[85vh] lg:rounded-l-[3rem] lg:rounded-r-none">
          <img
            src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1400&q=80"
            alt="SOLEVA Aero Runner sneaker on a plain background"
            className="animate-hero-image-in h-full w-full rounded-3xl object-cover lg:rounded-none lg:rounded-l-[3rem]"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/2 animate-hero-shine bg-cream/30 opacity-0" />
          <div className="absolute left-5 top-5 animate-fade-in rounded-full border border-cream/40 bg-ink/35 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-cream backdrop-blur-sm sm:left-7 sm:top-7" style={{ animationDelay: '700ms' }}>
            New season / 01
          </div>
          <div className="absolute -bottom-4 -left-4 hidden animate-fade-in rounded-2xl bg-paper px-5 py-4 shadow-lift sm:block" style={{ animationDelay: '900ms' }}>
            <p className="font-display text-lg text-ink">Aero Runner Low</p>
            <p className="text-xs text-ink-soft">From $128</p>
          </div>
        </div>
      </div>
    </section>
  )
}
