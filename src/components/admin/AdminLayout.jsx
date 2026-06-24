import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { Package, ShoppingBag, LogOut, Users } from 'lucide-react' // Menggunakan Users (jamak)
import useAuthStore from '../../store/authStore'

function AdminLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const logout = useAuthStore((state) => state.logout)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const links = [
    { label: 'Products', path: '/admin/products', icon: Package },
    { label: 'Orders',   path: '/admin/orders',   icon: ShoppingBag },
    { label: 'Users',    path: '/admin/users',    icon: Users }, // PERBAIKAN: Path diubah ke /admin/users & icon menggunakan Users
  ]

  return (
    <div className="min-h-screen flex bg-canvas-cream">

      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-canvas-night flex flex-col fixed h-full">

        {/* Logo */}
        <div className="px-6 py-8 border-b border-hairline-dark">
          <Link to="/" className="font-display text-lg text-canvas-light">
            MyStore
          </Link>
          <p className="font-body text-xs text-shade-50 mt-1">Admin Panel</p>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
          {links.map(({ label, path, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg
                font-body text-sm transition-colors
                ${location.pathname === path
                  ? 'bg-shade-70 text-canvas-light'
                  : 'text-shade-40 hover:text-canvas-light hover:bg-shade-70'}
              `}
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-4 py-6 border-t border-hairline-dark">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body text-sm text-shade-40 hover:text-red-400 hover:bg-shade-70 transition-colors w-full"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-56 overflow-auto">
        <Outlet />
      </main>

    </div>
  )
}

export default AdminLayout