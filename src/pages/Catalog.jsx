import { useState, useEffect } from 'react'
import api from '../api/api'
import ProductCard from '../components/catalog/ProductCard'
import Input from '../components/ui/Input'
import { Filter, X } from 'lucide-react' // Tambahkan ikon untuk kontrol filter mobile

function Catalog() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isFilterOpen, setIsFilterOpen] = useState(false) // State penutup/pembuka filter di HP

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
            sortBy: undefined, // undefined temporarily until the feature is ready
            page,
            size: 12,
          }
        })
        setProducts(res.data.data || [])
        setTotalPages(res.data.totalPages || 1)
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
    <div className="bg-canvas-cream min-h-screen">
      {/* Padding disesuaikan: px-4 di HP, px-8 di Desktop */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-12">

        {/* Header & Tombol Filter Mobile */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-medium text-canvas-night">
              Catalog
            </h1>
            <p className="font-body text-xs sm:text-sm text-shade-50 mt-1">
              {products.length} products found
            </p>
          </div>
          
          {/* Tombol pemicu laci filter (Hanya muncul di HP) */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="md:hidden flex items-center justify-center gap-2 bg-canvas-night text-canvas-light font-body text-sm py-2.5 px-4 rounded-md w-full transition-colors active:bg-shade-50"
          >
            <Filter size={16} />
            Filter & Search
          </button>
        </div>

        <div className="flex gap-0 md:gap-8 relative">

          {/* SIDEBAR FILTER (Responsive Drawer) */}
          {/* Overlay Gelap Latar Belakang (HP saja) */}
          {isFilterOpen && (
            <div 
              className="fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity" 
              onClick={() => setIsFilterOpen(false)}
            />
          )}

        <aside
          className={`
            fixed top-0 left-0 z-50 h-screen w-[85vw] max-w-sm p-6
            bg-canvas-light shadow-xl transition-transform duration-300 ease-in-out
            overflow-y-auto overscroll-contain touch-pan-y flex flex-col gap-6
            ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}
            
            md:static md:z-auto md:h-auto md:w-56 md:p-0 md:bg-transparent md:shadow-none md:translate-x-0
          `}
        >
          {/* Mobile Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-hairline-light pb-4 bg-canvas-light md:hidden">
            <p className="font-display text-lg font-medium text-canvas-night">
              Filters
            </p>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="p-2 rounded-full hover:bg-shade-30 transition-colors"
              aria-label="Close filters"
            >
              <X size={20} />
            </button>
          </div>

          {/* Search */}
          <Input
            label="Search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
          />

          {/* Categories */}
          <div className="flex flex-col gap-2 pb-8">
            <p className="font-body text-sm font-medium text-canvas-night">
              Category
            </p>

            {/* Tombol Kategori: All */}
            <button
              onClick={() => {
                setSelectedCategory('')
                setPage(1)
                setIsFilterOpen(false)
              }}
              className={`
                text-left font-body text-sm py-2 transition-colors
                ${selectedCategory === ''
                  ? 'text-canvas-night font-medium border-l-2 border-canvas-night pl-3 md:border-l-0 md:pl-0'
                  : 'text-shade-50 hover:text-canvas-night'
                }
              `}
            >
              All
            </button>

            {/* Daftar Kategori Dinamis */}
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id)
                  setPage(1)
                  setIsFilterOpen(false)
                }}
                className={`
                  text-left font-body text-sm py-2 transition-colors
                  ${selectedCategory === cat.id
                    ? 'text-canvas-night font-medium border-l-2 border-canvas-night pl-3 md:border-l-0 md:pl-0'
                    : 'text-shade-50 hover:text-canvas-night'
                  }
                `}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </aside>


          {/* GRID PRODUK UTAMA */}
          <div className="flex-1 w-full">
            {loading ? (
              /* Skeleton Loading: Selalu 2 kolom di HP, 3 kolom di Desktop */
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex flex-col gap-3">
                    <div className="aspect-square bg-shade-30 rounded-lg animate-pulse" />
                    <div className="h-3 bg-shade-30 rounded animate-pulse w-2/3" />
                    <div className="h-3 bg-shade-30 rounded animate-pulse w-1/3" />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 sm:py-24 gap-3 text-center px-4">
                <p className="font-display text-xl sm:text-2xl text-canvas-night">No products found</p>
                <p className="font-body text-xs sm:text-sm text-shade-50">Try adjusting your search or filters</p>
              </div>
            ) : (
              /* Grid Produk Nyata: Konsisten 2 Kolom di Layar Kecil */
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination Responsif */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between sm:justify-center gap-4 mt-8 sm:mt-12">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="font-body text-xs sm:text-sm px-4 py-2.5 rounded-pill border border-hairline-light bg-canvas-light disabled:opacity-40 hover:bg-shade-30 transition-colors w-[100px] text-center"
                >
                  Previous
                </button>
                <span className="font-body text-xs sm:text-sm text-shade-50">
                  {page} / {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="font-body text-xs sm:text-sm px-4 py-2.5 rounded-pill border border-hairline-light bg-canvas-light disabled:opacity-40 hover:bg-shade-30 transition-colors w-[100px] text-center"
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
