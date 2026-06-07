import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import Button from './ui/Button';
import useAuthStore from '../store/authStore';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuthStore();

  const isDark = location.pathname === '/';


  // Mengelompokkan class dinamis agar JSX tetap bersih
  const navBaseClass = `w-full px-8 py-4 flex items-center justify-between transition-colors duration-200 ${
    isDark 
      ? 'bg-canvas-night text-canvas-light' 
      : 'bg-canvas-light text-canvas-night border-b border-hairline-light'
  }`;

  const mobileMenuClass = `absolute top-16 left-0 w-full z-50 px-8 py-6 flex flex-col gap-4 ${
    isDark 
      ? 'bg-canvas-night' 
      : 'bg-canvas-light border-b border-hairline-light'
  }`;

  return (
    <nav className={navBaseClass}>
      {/* Logo */}
      <Link to="/" className="font-display text-xl font-medium tracking-tight">
        MyStore
      </Link>

      {/* Desktop Navigation */}
{/* Desktop Links */}
    <div className="hidden md:flex items-center gap-8">
      <Link to="/" className="font-body text-sm text-shade-50 hover:text-canvas-light transition-colors">
        Home
      </Link>
      <Link to="/catalog" className="font-body text-sm text-shade-50 hover:text-canvas-light transition-colors">
        Catalog
      </Link>
      <Link to="/orders" className="font-body text-sm text-shade-50 hover:text-canvas-light transition-colors">
        Orders
      </Link>
    </div>
      {/* Desktop Actions */}
      <div className="hidden md:flex items-center gap-4">
        <Link to="/cart" className="p-1 hover:opacity-80 transition-opacity">
          <ShoppingCart size={20} className={isDark ? 'text-canvas-light' : 'text-canvas-night'} />
        </Link>
        
        {isAuthenticated ? (
          <Button variant={isDark ? 'outline_dark' : 'outline_light'} onClick={logout}>
            Logout
          </Button>
        ) : (
          <Link to="/login">
            <Button variant={isDark ? 'outline_dark' : 'outline_light'}>
              Login
            </Button>
          </Link>
        )}
      </div>

      {/* Humberger Menu */}
      <button 
        className="md:hidden p-1 focus:outline-none" 
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Hamburger Menu Links */}
{/* Hamburger Menu Links */}
{menuOpen && (
  <div className={`${mobileMenuClass} flex flex-col items-center justify-center text-center gap-4 p-6`}>
    {/* Navigasi Utama Seluler */}
    <div className="flex flex-col items-center gap-4 w-full">
      <Link 
        to="/" 
        onClick={() => setMenuOpen(false)} 
        className="font-body text-base text-shade-50 hover:text-canvas-light transition-colors py-2 w-full block text-center"
      >
        Home
      </Link>
      <Link 
        to="/catalog" 
        onClick={() => setMenuOpen(false)} 
        className="font-body text-base text-shade-50 hover:text-canvas-light transition-colors py-2 w-full block text-center"
      >
        Catalog
      </Link>
    </div>

    {/* Tombol Keranjang */}
    <Link to="/cart" onClick={() => setMenuOpen(false)} className="w-full mt-2">
      <Button variant={isDark ? 'outline_dark' : 'outline_light'} className="w-full mx-auto">
        Cart
      </Button>
    </Link>
    
    {/* Tombol Otentikasi */}
    {isAuthenticated ? (
      <Button 
        variant={isDark ? 'outline_dark' : 'outline_light'} 
        onClick={() => { logout(); setMenuOpen(false); }} 
        className="w-full mx-auto"
      >
        Logout
      </Button>
    ) : (
      <Link to="/login" onClick={() => setMenuOpen(false)} className="w-full">
        <Button variant={isDark ? 'outline_dark' : 'outline_light'} className="w-full mx-auto">
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