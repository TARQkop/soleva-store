import { Link } from 'react-router-dom'
import Button from '../components/Button'

export default function NotFound() {
  return (
    <div className="container-page flex flex-col items-center justify-center gap-5 py-24 text-center sm:py-32">
      <p className="font-display text-[length:clamp(3.5rem,18vw,4.5rem)] text-ink">404</p>
      <div>
        <h1 className="font-display text-2xl text-ink">Page not found</h1>
        <p className="mt-2 text-sm text-ink-soft">The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.</p>
      </div>
      <Link to="/">
        <Button size="lg">Back to Home</Button>
      </Link>
    </div>
  )
}
