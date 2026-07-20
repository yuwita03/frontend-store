import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import Button from './ui/Button';
import useAuthStore from '../store/authStore';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuthStore();

  const isHome = location.pathname === '/';

  return (
    <nav className={`w-full px-6 lg:px-8 py-4 flex items-center justify-between transition-colors duration-200 font-['Hanken_Grotesk'] ${
      isHome
        ? 'bg-[#faf9f5]'
        : 'bg-[#ffffff] border-b border-[#e3e2df]'
    }`}>
      <Link to="/" className="font-['Libre_Caslon_Text'] text-xl font-bold text-[#334537] tracking-tight">
        MyStore
      </Link>

      <div className="hidden md:flex items-center gap-8">
        <Link
          to="/"
          className={`text-sm font-semibold tracking-[0.05em] uppercase transition-colors ${
            isHome ? 'text-[#5e3819] hover:text-[#334537]' : 'text-[#737872] hover:text-[#334537]'
          }`}
        >
          Home
        </Link>
        <Link
          to="/catalog"
          className={`text-sm font-semibold tracking-[0.05em] uppercase transition-colors ${
            isHome ? 'text-[#5e3819] hover:text-[#334537]' : 'text-[#737872] hover:text-[#334537]'
          }`}
        >
          Catalog
        </Link>
        <Link
          to="/orders"
          className={`text-sm font-semibold tracking-[0.05em] uppercase transition-colors ${
            isHome ? 'text-[#5e3819] hover:text-[#334537]' : 'text-[#737872] hover:text-[#334537]'
          }`}
        >
          Orders
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-4">
        <Link to="/cart" className="p-1 hover:opacity-70 transition-opacity text-[#334537]">
          <ShoppingCart size={20} />
        </Link>

        {isAuthenticated ? (
          <Button variant="outline_light" className="!border-[#334537] !text-[#334537] hover:!bg-[#334537] hover:!text-[#ffffff] !rounded-[0.25rem] !font-semibold !tracking-[0.05em] !text-xs !uppercase" onClick={logout}>
            Logout
          </Button>
        ) : (
          <Link to="/login">
            <Button variant="outline_light" className="!border-[#334537] !text-[#334537] hover:!bg-[#334537] hover:!text-[#ffffff] !rounded-[0.25rem] !font-semibold !tracking-[0.05em] !text-xs !uppercase">
              Login
            </Button>
          </Link>
        )}
      </div>

      <button
        className="md:hidden p-1 focus:outline-none text-[#334537]"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {menuOpen && (
        <div className={`absolute top-16 left-0 w-full z-50 px-6 py-8 flex flex-col gap-4 shadow-[0_4px_15px_rgba(51,69,55,0.06)] ${
          isHome ? 'bg-[#faf9f5]' : 'bg-[#ffffff] border-b border-[#e3e2df]'
        }`}>
          <div className="flex flex-col items-center gap-4 w-full">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="font-['Hanken_Grotesk'] text-sm font-semibold tracking-[0.05em] uppercase py-2 w-full block text-center text-[#5e3819] hover:text-[#334537] transition-colors"
            >
              Home
            </Link>
            <Link
              to="/catalog"
              onClick={() => setMenuOpen(false)}
              className="font-['Hanken_Grotesk'] text-sm font-semibold tracking-[0.05em] uppercase py-2 w-full block text-center text-[#5e3819] hover:text-[#334537] transition-colors"
            >
              Catalog
            </Link>
            <Link
              to="/orders"
              onClick={() => setMenuOpen(false)}
              className="font-['Hanken_Grotesk'] text-sm font-semibold tracking-[0.05em] uppercase py-2 w-full block text-center text-[#5e3819] hover:text-[#334537] transition-colors"
            >
              Orders
            </Link>
          </div>

          <Link to="/cart" onClick={() => setMenuOpen(false)} className="w-full">
            <Button variant="outline_light" className="!w-full !border-[#334537] !text-[#334537] hover:!bg-[#334537] hover:!text-[#ffffff] !rounded-[0.25rem] !font-semibold !tracking-[0.05em] !text-xs !uppercase">
              Cart
            </Button>
          </Link>

          {isAuthenticated ? (
            <Button
              variant="outline_light"
              onClick={() => { logout(); setMenuOpen(false); }}
              className="!w-full !border-[#334537] !text-[#334537] hover:!bg-[#334537] hover:!text-[#ffffff] !rounded-[0.25rem] !font-semibold !tracking-[0.05em] !text-xs !uppercase"
            >
              Logout
            </Button>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)} className="w-full">
              <Button variant="outline_light" className="!w-full !border-[#334537] !text-[#334537] hover:!bg-[#334537] hover:!text-[#ffffff] !rounded-[0.25rem] !font-semibold !tracking-[0.05em] !text-xs !uppercase">
                Login
              </Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;