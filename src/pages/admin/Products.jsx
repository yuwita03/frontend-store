import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import api from '../../api/api'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'

function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [showForm, setShowForm] = useState(false)
  const [editProduct, setEditProduct] = useState(null)
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    categoryId: '',
    image: '',
    slug: '',
  })
  const [deleting, setDeleting] = useState(null)
  
const fetchProducts = async () => {
  setLoading(true)

  try {
    const res = await api.get('/products', {
      params: { page, size: 10 }
    })

    // console.log('PRODUCTS RESPONSE:', res.data) // debugging

    setProducts(res.data.data.data || [])
    setTotalPages(res.data.data.paging?.totalPage || 1)

  } catch (err) {
    console.error(err)
  } finally {
    setLoading(false)
  }
}

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories')
      setCategories(res.data.data || [])
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [page])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      }
      if (editProduct) {
        await api.patch(`/products/${editProduct.id}`, payload)
      } else {
        await api.post('/products', payload)
      }
      setShowForm(false)
      setEditProduct(null)
      setForm({ name: '', description: '', price: '', stock: '', categoryId: '', image: '',slug: '' })
      fetchProducts()
      } catch (err) {
        const errData = err.response?.data
        // Zod validation error biasanya ada di errors array
        if (errData?.errors) {
          alert(JSON.stringify(errData.errors, null, 2))
        } else {
          alert(errData?.message || 'Failed to save product')
        }
      }
  }

  const handleEdit = (product) => {
    setEditProduct(product)
    setForm({
      name: product.name,
      description: product.description || '',
      price: product.price,
      stock: product.stock,
      categoryId: product.categoryId,
      image: product.image || '',
      slug: product.slug,
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return
    setDeleting(id)
    try {
      await api.delete(`/products/${id}`)
      fetchProducts()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete product')
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="p-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-medium text-canvas-night">Products</h1>
          <p className="font-body text-sm text-shade-50 mt-1">Manage your product catalog</p>
        </div>
        <Button variant="primary" onClick={() => {
          setEditProduct(null)
          setForm({ name: '', description: '', price: '', stock: '', categoryId: '', image: '', slug: '' })
          setShowForm(true)
        }}>
          <Plus size={16} className="inline mr-2" />
          Add Product
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-canvas-light border border-hairline-light rounded-lg p-6 mb-8">
          <h2 className="font-display text-xl text-canvas-night mb-4">
            {editProduct ? 'Edit Product' : 'Add New Product'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-body text-sm font-medium text-shade-60">Name</label>
              <input
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Product name"
                className="font-body text-sm px-4 py-3 rounded-md border border-hairline-light outline-none focus:border-canvas-night"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-body text-sm font-medium text-shade-60">Category</label>
              <select
                value={form.categoryId}
                onChange={e => setForm({ ...form, categoryId: e.target.value })}
                className="font-body text-sm px-4 py-3 rounded-md border border-hairline-light outline-none focus:border-canvas-night bg-canvas-light"
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-body text-sm font-medium text-shade-60">Price (IDR)</label>
              <input
                type="number"
                value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })}
                placeholder="75000"
                className="font-body text-sm px-4 py-3 rounded-md border border-hairline-light outline-none focus:border-canvas-night"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-body text-sm font-medium text-shade-60">Stock</label>
              <input
                type="number"
                value={form.stock}
                onChange={e => setForm({ ...form, stock: e.target.value })}
                placeholder="100"
                className="font-body text-sm px-4 py-3 rounded-md border border-hairline-light outline-none focus:border-canvas-night"
              />
            </div>
            <div className="flex flex-col gap-1 col-span-2">
              <label className="font-body text-sm font-medium text-shade-60">Image URL</label>
              <input
                value={form.image}
                onChange={e => setForm({ ...form, image: e.target.value })}
                placeholder="https://..."
                className="font-body text-sm px-4 py-3 rounded-md border border-hairline-light outline-none focus:border-canvas-night"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-body text-sm font-medium text-shade-60">Slug</label>
              <input
                value={form.slug}
                onChange={e => setForm({ ...form, slug: e.target.value })}
                placeholder="product-slug"
                className="font-body text-sm px-4 py-3 rounded-md border border-hairline-light outline-none focus:border-canvas-night"
              />
            </div>
            <div className="flex flex-col gap-1 col-span-2">
              <label className="font-body text-sm font-medium text-shade-60">Description</label>
              <textarea
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                placeholder="Product description..."
                rows={3}
                className="font-body text-sm px-4 py-3 rounded-md border border-hairline-light outline-none focus:border-canvas-night resize-none"
              />
            </div>
            <div className="col-span-2 flex gap-3">
              <Button type="submit" variant="primary">
                {editProduct ? 'Save Changes' : 'Add Product'}
              </Button>
              <Button
                type="button"
                variant="outline_light"
                onClick={() => { setShowForm(false); setEditProduct(null) }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <p className="font-body text-shade-50">Loading products...</p>
        </div>
      ) : (
        <div className="bg-canvas-light border border-hairline-light rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-hairline-light">
              <tr>
                <th className="text-left px-6 py-4 font-body text-xs font-medium text-shade-50 uppercase tracking-wider">Product</th>
                <th className="text-left px-6 py-4 font-body text-xs font-medium text-shade-50 uppercase tracking-wider">Category</th>
                <th className="text-left px-6 py-4 font-body text-xs font-medium text-shade-50 uppercase tracking-wider">Price</th>
                <th className="text-left px-6 py-4 font-body text-xs font-medium text-shade-50 uppercase tracking-wider">Stock</th>
                <th className="text-left px-6 py-4 font-body text-xs font-medium text-shade-50 uppercase tracking-wider">Status</th>
                <th className="text-right px-6 py-4 font-body text-xs font-medium text-shade-50 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline-light">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-canvas-cream transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-shade-30 overflow-hidden shrink-0">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-shade-30" />
                        )}
                      </div>
                      <p className="font-body text-sm font-medium text-canvas-night">{product.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-body text-sm text-shade-50">{product.category?.name || '-'}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-body text-sm text-canvas-night">
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0,
                      }).format(product.price)}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-body text-sm text-canvas-night">{product.stock}</p>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={product.isActive ? 'mint' : 'default'}>
                      {product.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 rounded-md hover:bg-canvas-cream transition-colors text-shade-50 hover:text-canvas-night"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        disabled={deleting === product.id}
                        className="p-2 rounded-md hover:bg-red-50 transition-colors text-shade-50 hover:text-red-500 disabled:opacity-30"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 p-4 border-t border-hairline-light">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="font-body text-sm px-4 py-2 rounded-pill border border-hairline-light disabled:opacity-40 hover:bg-shade-30 transition-colors"
              >
                Previous
              </button>
              <span className="font-body text-sm text-shade-50">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="font-body text-sm px-4 py-2 rounded-pill border border-hairline-light disabled:opacity-40 hover:bg-shade-30 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AdminProducts