import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-canvas-night text-canvas-light px-8 py-12 mt-auto">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div className="flex flex-col gap-3">
          <h3 className="font-display text-lg font-medium">MyStore</h3>
          <p className="font-body text-sm text-shade-40 max-w-xs">
            Quality products delivered to your door.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-3">
          <h4 className="font-body text-sm font-medium text-shade-30">Shop</h4>
          <Link to="/catalog" className="font-body text-sm text-shade-40 hover:text-canvas-light transition-colors">Catalog</Link>
          <Link to="/cart"    className="font-body text-sm text-shade-40 hover:text-canvas-light transition-colors">Cart</Link>
          <Link to="/orders"  className="font-body text-sm text-shade-40 hover:text-canvas-light transition-colors">Orders</Link>
        </div>

        {/* Account */}
        <div className="flex flex-col gap-3">
          <h4 className="font-body text-sm font-medium text-shade-30">Account</h4>
          <Link to="/login"    className="font-body text-sm text-shade-40 hover:text-canvas-light transition-colors">Login</Link>
          <Link to="/register" className="font-body text-sm text-shade-40 hover:text-canvas-light transition-colors">Register</Link>
        </div>

      </div>

      {/* Bottom */}
      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-hairline-dark">
        <p className="font-body text-xs text-shade-50">
          © {new Date().getFullYear()} MyStore. All rights reserved.
        </p>
      </div>

    </footer>
  )
}

export default Footer