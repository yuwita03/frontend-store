import { useState, useEffect } from 'react'
import api from '../api/api'
import ProductCard from '../components/catalog/ProductCard'
import { SlidersHorizontal, X } from 'lucide-react'

function Catalog() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories')
        setCategories(res.data.data || [])
      } catch (err) { console.error(err) }
    }
    fetchCategories()
  }, [])

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const res = await api.get('/products/search', {
          params: { search, categoryId: selectedCategory, page, size: 16 }
        })
        const body = res.data
        setProducts(body.data || [])
        setTotalPages(body.paging?.totalPage || 1)
      } catch (err) { console.error(err) }
      finally { setLoading(false) }
    }

    const delay = setTimeout(fetchProducts, 400)
    return () => clearTimeout(delay)
  }, [search, selectedCategory, page])

  return (
    <div className="bg-[#faf9f5] min-h-screen text-[#1b1c1a] font-['Hanken_Grotesk'] overflow-x-hidden">
      
      {/* --- HEADER --- */}
      <header className="border-b border-[#e3e2df] bg-[#faf9f5] sticky top-0 z-30">
        <div className="max-w-[1280px] mx-auto px-6 py-8 flex justify-between items-end">
          <div>
            <span className="text-[#334537] font-['Hanken_Grotesk'] text-[11px] font-semibold uppercase tracking-[0.05em]">Curated Heritage</span>
            <h1 className="font-['Libre_Caslon_Text'] text-5xl font-bold text-[#1b1c1a] mt-2">Katalog Koleksi</h1>
          </div>
          
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-3 px-8 py-3 border border-[#334537] text-[#334537] rounded-[0.25rem] hover:bg-[#334537] hover:text-[#ffffff] transition-all duration-300"
          >
            <SlidersHorizontal size={18} />
            <span className="font-['Hanken_Grotesk'] font-semibold text-xs uppercase tracking-[0.05em]">Filter & Cari</span>
          </button>
        </div>
      </header>

      {/* --- MAIN CATALOG --- */}
      <main className="max-w-[1280px] mx-auto px-6 py-12">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-[4/5] bg-[#efeeea] animate-pulse rounded-[0.5rem]" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-['Libre_Caslon_Text'] text-2xl text-[#737872]">Belum ada item yang ditemukan...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map(product => <ProductCard key={product.slug} product={product} />)}
          </div>
        )}
      </main>

      {/* --- PAGINATION --- */}
      {!loading && products.length > 0 && totalPages > 1 && (
        <div className="max-w-[1280px] mx-auto px-6 pb-16 flex items-center justify-between">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="font-['Hanken_Grotesk'] text-xs font-semibold tracking-[0.05em] uppercase px-5 py-2.5 rounded-[0.25rem] border border-[#c3c8c1] text-[#434843] hover:border-[#334537] hover:text-[#334537] transition-colors disabled:opacity-30 disabled:pointer-events-none"
          >
            Sebelumnya
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`w-9 h-9 rounded-[0.25rem] text-sm font-['Hanken_Grotesk'] font-semibold transition-colors ${
                  page === num
                    ? 'bg-[#334537] text-[#ffffff]'
                    : 'text-[#434843] hover:bg-[#efeeea]'
                }`}
              >
                {num}
              </button>
            ))}
          </div>

          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="font-['Hanken_Grotesk'] text-xs font-semibold tracking-[0.05em] uppercase px-5 py-2.5 rounded-[0.25rem] border border-[#c3c8c1] text-[#434843] hover:border-[#334537] hover:text-[#334537] transition-colors disabled:opacity-30 disabled:pointer-events-none"
          >
            Selanjutnya
          </button>
        </div>
      )}

      {/* --- SLIDE-OUT FILTER PANEL --- */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-500 ${isFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsFilterOpen(false)}
      />

      <aside className={`fixed top-0 right-0 h-full w-full max-w-[400px] bg-[#faf9f5] shadow-2xl z-50 p-10 transform transition-transform duration-500 ease-out border-l border-[#e3e2df] ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center mb-12">
          <h2 className="font-['Libre_Caslon_Text'] text-3xl font-semibold text-[#1b1c1a]">Filter Koleksi</h2>
          <button onClick={() => setIsFilterOpen(false)} className="p-2 hover:bg-[#efeeea] rounded-[0.25rem] transition-colors text-[#434843]">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-12">
          {/* Search */}
          <div>
            <label className="block font-['Hanken_Grotesk'] text-[10px] font-semibold uppercase tracking-[0.05em] text-[#5e3819] mb-4">Kata Kunci</label>
            <div className="border-b border-[#c3c8c1] focus-within:border-[#334537] transition-colors">
              <input 
                className="w-full bg-transparent py-3 text-lg font-['Hanken_Grotesk'] text-[#1b1c1a] placeholder:text-[#c3c8c1] outline-none" 
                placeholder="Cari sesuatu..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block font-['Hanken_Grotesk'] text-[10px] font-semibold uppercase tracking-[0.05em] text-[#5e3819] mb-6">Kategori</label>
            <div className="flex flex-col gap-1">
              <button 
                onClick={() => { setSelectedCategory(''); setPage(1); setIsFilterOpen(false) }} 
                className={`text-left text-base py-3 px-4 rounded-[0.25rem] transition-all font-['Hanken_Grotesk'] ${selectedCategory === '' ? 'bg-[#334537] text-[#ffffff] font-semibold' : 'text-[#434843] hover:bg-[#efeeea]'}`}
              >
                Semua Produk
              </button>
              {categories.map(cat => (
                <button 
                  key={cat.id} 
                  onClick={() => { setSelectedCategory(cat.id); setPage(1); setIsFilterOpen(false) }} 
                  className={`text-left text-base py-3 px-4 rounded-[0.25rem] transition-all font-['Hanken_Grotesk'] ${selectedCategory === cat.id ? 'bg-[#334537] text-[#ffffff] font-semibold' : 'text-[#434843] hover:bg-[#efeeea]'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default Catalog