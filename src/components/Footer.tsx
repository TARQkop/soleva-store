import { Link } from 'react-router-dom'

const columns = [
  {
    title: 'Shop',
    links: ['Men', 'Women', 'Sneakers', 'New Arrivals', 'Sale'],
  },
  {
    title: 'Company',
    links: ['About Us', 'Sustainability', 'Careers', 'Press'],
  },
  {
    title: 'Customer Service',
    links: ['Contact Us', 'Shipping & Returns', 'Size Guide', 'FAQs'],
  },
  {
    title: 'Legal',
    links: ['Privacy Policy', 'Terms of Service', 'Accessibility'],
  },
]

const socials = [
  { label: 'Instagram', path: 'M9 2h6c2.8 0 5 2.2 5 5v6c0 2.8-2.2 5-5 5H9c-2.8 0-5-2.2-5-5V7c0-2.8 2.2-5 5-5zm0 1.6A3.4 3.4 0 005.6 7v6A3.4 3.4 0 009 16.4h6a3.4 3.4 0 003.4-3.4V7A3.4 3.4 0 0015 3.6H9zm3 2.9a3.5 3.5 0 110 7 3.5 3.5 0 010-7zm0 1.6a1.9 1.9 0 100 3.8 1.9 1.9 0 000-3.8zm4.4-2.7a.9.9 0 110 1.8.9.9 0 010-1.8z' },
  { label: 'TikTok', path: 'M13 2h2.2c.2 1.5 1.1 2.8 2.6 3.3v2.2a5.6 5.6 0 01-2.6-.7v5.7a4.9 4.9 0 11-4.9-4.9c.2 0 .5 0 .7.1v2.3a2.6 2.6 0 102.1 2.6V2z' },
  { label: 'X', path: 'M3 3l6.2 8.1L3.3 17h1.7l5.2-5.6L14.5 17H17l-6.5-8.5L16 3h-1.7l-4.8 5.2L6 3H3z' },
]

export default function Footer() {
  return (
    <footer className="border-t border-line bg-stone/50">
      <div className="container-page py-12 pb-[max(3rem,env(safe-area-inset-bottom))] sm:py-16 sm:pb-[max(4rem,env(safe-area-inset-bottom))]">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-8">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-medium text-ink">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link to="/shop" className="inline-flex min-h-[1.75rem] items-center text-sm text-ink-soft hover:text-ink">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-4">
            <span className="font-display text-xl text-ink">SOLEVA</span>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-ink hover:text-ink sm:h-9 sm:w-9"
                >
                  <svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3" aria-label="Accepted payment methods">
            {['VISA', 'MC', 'AMEX', 'PAY'].map((p) => (
              <span
                key={p}
                className="flex h-7 items-center justify-center rounded-md border border-line bg-paper px-2.5 text-[10px] font-semibold tracking-wide text-ink-soft"
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        <p className="mt-8 text-xs text-ink-soft/70">
          © {new Date().getFullYear()} SOLEVA. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
