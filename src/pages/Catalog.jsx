import { useState, useEffect } from 'react'
import api from '../api/api'
import ProductCard from '../components/catalog/ProductCard'
import Input from '../components/UI/Input'
import { Filter, X } from 'lucide-react'

function Catalog() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Fetch categories once on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories')
        setCategories(res.data.data || [])
      } catch (err) {
        console.error(err)
      }
    }
    fetchCategories()
  }, [])

  // Fetch products when search/category/page changes
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const res = await api.get('/products/search', {
          params: {
            search,
            categoryId: selectedCategory,
            price: undefined,
            minPrice: undefined,
            maxPrice: undefined,
            sortBy: undefined,
            page,
            size: 12,
          }
        })
        setProducts(res.data.data || [])
        setTotalPages(res.data.data.paging?.totalPages || 1)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    const delay = setTimeout(fetchProducts, 400)
    return () => clearTimeout(delay)
  }, [search, selectedCategory, page])

  return (
    <div className="bg-white min-h-screen text-stone-800 antialiased">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12">

        {/* Header Section sesuai image_67baea.png */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <span className="font-mono text-xs font-bold text-sky-600 uppercase tracking-widest block">
              Find Your Style
            </span>
            <h1 className="font-serif text-4xl font-bold text-stone-900 mt-1">
              Jelajahi Katalog
            </h1>
            <p className="font-mono text-xs text-stone-500 mt-1">
              [{products.length} products found]
            </p>
          </div>
          
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="md:hidden flex items-center justify-center gap-2 bg-stone-900 text-white font-medium py-2.5 px-4 rounded-lg text-sm w-full"
          >
            <Filter size={16} />
            Filter & Search
          </button>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col md:flex-row gap-12 relative items-start">

          {/* SIDEBAR FILTER */}
          {isFilterOpen && (
            <div 
              className="fixed inset-0 bg-black/20 backdrop-blur-xs z-40 md:hidden" 
              onClick={() => setIsFilterOpen(false)}
            />
          )}

          <aside
            className={`
              fixed top-0 left-0 z-50 h-screen w-[85vw] max-w-xs p-6 bg-white shadow-xl transition-transform duration-300 ease-in-out
              ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}
              md:static md:z-auto md:h-auto md:w-48 md:p-0 md:shadow-none md:translate-x-0 flex flex-col gap-6
            `}
          >
            {/* Mobile Sidebar Header */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 md:hidden">
              <p className="font-serif font-bold text-lg text-stone-900">Filters</p>
              <button onClick={() => setIsFilterOpen(false)} className="p-1.5 hover:bg-stone-100 rounded-md">
                <X size={18} />
              </button>
            </div>

            {/* Search Input Custom Styling wrapper agar bersih seperti di gambar */}
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-xs font-bold text-stone-500 uppercase tracking-wider">
                Search
              </label>
              <div className="[&_input]:w-full [&_input]:bg-white [&_input]:border [&_input]:border-stone-200 [&_input]:rounded-lg [&_input]:px-3 [&_input]:py-2 [&_input]:text-sm [&_input]:text-stone-800 [&_input]:focus:outline-none [&_input]:focus:border-stone-400 [&_input]:transition-colors">
                <Input
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value)
                    setPage(1)
                  }}
                />
              </div>
            </div>

            {/* Categories Navigation */}
            <div className="flex flex-col gap-1">
              <p className="font-mono text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                Category
              </p>

              {/* All Category Button */}
              <button
                onClick={() => {
                  setSelectedCategory('')
                  setPage(1)
                  setIsFilterOpen(false)
                }}
                className={`
                  text-left font-mono text-xs py-2.5 px-4 rounded-lg transition-colors
                  ${selectedCategory === ''
                    ? 'bg-stone-950 text-white font-bold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                  }
                `}
              >
                All Products
              </button>

              {/* Dynamic Category List */}
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id) // Menggunakan cat.id
                    setPage(1)
                    setIsFilterOpen(false)
                  }}
                  className={`
                    text-left font-mono text-xs py-2.5 px-4 rounded-lg transition-colors
                    ${selectedCategory === cat.id // DIUBAH: disamakan menggunakan cat.id agar match!
                      ? 'bg-stone-950 text-white font-bold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                    }
                  `}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </aside>

          {/* MAIN GRID */}
          <div className="flex-1 w-full">
            {loading ? (
              /* Rectangle Skeleton Loading polos abu-abu tanpa border (Gaya Pertama/Asli) */
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex flex-col gap-3">
                    <div className="aspect-square bg-stone-200 rounded-xl animate-pulse" />
                    <div className="h-4 bg-stone-200 rounded animate-pulse w-2/3" />
                    <div className="h-3 bg-stone-200 rounded animate-pulse w-1/3" />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 gap-2 text-center px-4 border border-dashed border-stone-200 rounded-2xl">
                <p className="font-serif font-bold text-xl text-stone-800">No products found</p>
                <p className="font-mono text-xs text-stone-500">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              /* Product Grid */
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between sm:justify-center gap-6 mt-12 border-t border-stone-100 pt-6">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="font-mono text-xs px-4 py-2 bg-white border border-stone-200 rounded-lg disabled:opacity-40 hover:bg-stone-50 transition-colors w-[90px] text-center"
                >
                  Previous
                </button>
                <span className="font-mono text-xs text-stone-600">
                  {page} / {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="font-mono text-xs px-4 py-2 bg-white border border-stone-200 rounded-lg disabled:opacity-40 hover:bg-stone-50 transition-colors w-[90px] text-center"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Catalog