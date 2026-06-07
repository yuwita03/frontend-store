import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-200 px-6 sm:px-8 py-16 mt-auto antialiased border-t border-stone-900">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10">

        {/* Brand & Socials (Diperluas menjadi 4 platform) */}
        <div className="flex flex-col gap-4">
          <h3 className="font-serif text-xl font-bold text-white tracking-tight">MyStore</h3>
          <p className="font-mono text-xs text-stone-400 leading-relaxed uppercase tracking-wider">
            Quality products curated for your daily lifestyle, delivered straight to your door.
          </p>
          
          {/* Jajaran Sosial Media SVG */}
          <div className="flex items-center gap-4 mt-1 text-stone-500">
            {/* Instagram */}
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" title="Instagram">
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            {/* X / Twitter */}
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" title="X (Twitter)">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
            </a>

            {/* TikTok */}
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" title="TikTok">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.525.229a8.175 8.175 0 0 1 4.783 2.502 8.358 8.358 0 0 0-1.785-1.077 4.885 4.885 0 0 0-4.885.501c-.134.093-.263.195-.386.305v11.954a3.527 3.527 0 1 1-3.527-3.527c.433 0 .848.078 1.233.22V6.634a8.318 8.318 0 0 0-3.32-.69 8.355 8.355 0 1 0 8.355 8.355V4.673A8.175 8.175 0 0 1 17.545 8.43v-2.18a5.986 5.986 0 0 0-4.237-4.237c-.26-.076-.525-.137-.793-.184V.229z"></path>
              </svg>
            </a>

            {/* YouTube */}
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" title="YouTube">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
              </svg>
            </a>
          </div>

          <div className="mt-1">
 
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2.5 sm:pl-8">
          <h4 className="font-mono text-xs font-bold text-stone-500 uppercase tracking-widest">Shop</h4>
          <Link to="/catalog" className="font-mono text-xs text-stone-400 hover:text-white transition-colors uppercase tracking-wider w-fit">Catalog</Link>
          <Link to="/cart"    className="font-mono text-xs text-stone-400 hover:text-white transition-colors uppercase tracking-wider w-fit">Cart</Link>
          <Link to="/orders"  className="font-mono text-xs text-stone-400 hover:text-white transition-colors uppercase tracking-wider w-fit">Orders</Link>
        </div>

        {/* Account */}
        <div className="flex flex-col gap-2.5 sm:pl-8">
          <h4 className="font-mono text-xs font-bold text-stone-500 uppercase tracking-widest">Account</h4>
          <Link to="/login"    className="font-mono text-xs text-stone-400 hover:text-white transition-colors uppercase tracking-wider w-fit">Login</Link>
          <Link to="/register" className="font-mono text-xs text-stone-400 hover:text-white transition-colors uppercase tracking-wider w-fit">Register</Link>
        </div>

      </div>

      {/* Bottom Area */}
      <div className="max-w-6xl mx-auto mt-16 pt-6 border-t border-stone-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Copyright */}
        <p className="font-mono text-[10px] text-stone-500 uppercase tracking-widest">
          © {new Date().getFullYear()} MyStore. All rights reserved.
        </p>

        {/* Payment Methods */}
        <div className="flex items-center gap-3 font-mono text-[9px] text-stone-500 tracking-widest uppercase">
          <span>VISA</span>
          <span className="text-stone-800">•</span>
          <span>MASTERCARD</span>
          <span className="text-stone-800">•</span>
          <span>BCA</span>
          <span className="text-stone-800">•</span>
          <span>MANDIRI</span>
        </div>
      </div>

    </footer>
  )
}

export default Footer