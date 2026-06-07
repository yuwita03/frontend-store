import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

function Home() {
  return (
    <div className="bg-canvas-night min-h-screen">

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-8 pt-32 pb-24 flex flex-col items-start gap-8">
        <div className="flex flex-col gap-4 max-w-2xl">
          <span className="font-body text-xs text-aloe tracking-widest uppercase">
            New Collection 2024
          </span>
          <h1 className="font-display text-6xl font-light text-canvas-light leading-tight">
            Style that speaks for itself
          </h1>
          <p className="font-body text-base text-shade-40 max-w-md">
            Discover our curated collection of premium clothing and accessories designed for everyday life.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/catalog">
            <Button variant="aloe">Shop Now</Button>
          </Link>
          <Link to="/catalog">
            <Button variant="outline_dark">View Catalog</Button>
          </Link>
        </div>
      </section>

      {/* Feature Strip */}
      <section className="border-t border-hairline-dark">
        <div className="max-w-6xl mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="flex flex-col gap-2">
            <h3 className="font-display text-lg text-canvas-light">Free Shipping</h3>
            <p className="font-body text-sm text-shade-40">
              On all orders over $50. Fast and reliable delivery.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-display text-lg text-canvas-light">Easy Returns</h3>
            <p className="font-body text-sm text-shade-40">
              30-day return policy, no questions asked.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-display text-lg text-canvas-light">Premium Quality</h3>
            <p className="font-body text-sm text-shade-40">
              Carefully selected materials built to last.
            </p>
          </div>

        </div>
      </section>

    </div>
  )
}

export default Home