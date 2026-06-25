import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import { useAdminProducts } from '../../hooks/useAdminProduct'
import Toast from '../../components/ui/Toats'
import { useConfirm } from '../../hooks/useConfirmModal'
import ConfirmModal from '../../components/ui/ConfirmModal'
function AdminProducts() {
const {
  products, loading, page,  setPage, totalPages, categories,
  showForm, setShowForm, editProduct, setEditProduct,
  form, setForm, deleting,
  handleSubmit, handleEdit, handleDelete, toast, 
} = useAdminProducts()

const { confirmState, confirm, handleConfirm, handleCancel } = useConfirm()
  return (
    <div className="p-8">
      <Toast toast={toast} />
      <ConfirmModal
          isOpen={!!confirmState}
          title={confirmState?.title}
          message={confirmState?.message}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
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
    <form className="grid grid-cols-2 gap-4">
      
      {/* 1. Name */}
      <div className="flex flex-col gap-1">
        <label className="font-body text-sm font-medium text-shade-60">Name</label>
        <input
          required
          value={form.name}
          onChange={e => {
            const name = e.target.value;
            // UX: Otomatis mengisi slug saat mengetik nama produk
            const generatedSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            setForm({ ...form, name, slug: generatedSlug });
          }}
          placeholder="Product name"
          className="font-body text-sm px-4 py-3 rounded-md border border-hairline-light outline-none focus:border-canvas-night"
        />
      </div>

      {/* 2. Category */}
      <div className="flex flex-col gap-1">
        <label className="font-body text-sm font-medium text-shade-60">Category</label>
        <select
          required
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

      {/* 3. Price */}
      <div className="flex flex-col gap-1">
        <label className="font-body text-sm font-medium text-shade-60">Price (IDR)</label>
        <input
          required
          type="number"
          min="0"
          value={form.price}
          // UX: Pastikan input kosong tidak menghasilkan nilai NaN
          onChange={e => setForm({ ...form, price: e.target.value === '' ? '' : Number(e.target.value) })}
          placeholder="75000"
          className="font-body text-sm px-4 py-3 rounded-md border border-hairline-light outline-none focus:border-canvas-night"
        />
      </div>

      {/* 4. Stock */}
      <div className="flex flex-col gap-1">
        <label className="font-body text-sm font-medium text-shade-60">Stock</label>
        <input
          required
          type="number"
          min="0"
          value={form.stock}
          onChange={e => setForm({ ...form, stock: e.target.value === '' ? '' : Number(e.target.value) })}
          placeholder="100"
          className="font-body text-sm px-4 py-3 rounded-md border border-hairline-light outline-none focus:border-canvas-night"
        />
      </div>

      {/* 5. Slug */}
      <div className="flex flex-col gap-1">
        <label className="font-body text-sm font-medium text-shade-60">Slug</label>
        <input
          required
          value={form.slug}
          onChange={e => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
          placeholder="product-slug"
          className="font-body text-sm px-4 py-3 rounded-md border border-hairline-light outline-none focus:border-canvas-night"
        />
      </div>

{/* 6. Active Status - Toggle Switch Button */}
<div className="flex flex-col gap-1">
  <label className="font-body text-sm font-medium text-shade-60">Status</label>
  <div 
    onClick={() => setForm({ ...form, isActive: !form.isActive })}
    className={`flex items-center justify-between h-[46px] px-4 rounded-md border cursor-pointer select-none transition-all duration-200 ${
      form.isActive 
        ? 'border-canvas-night bg-canvas-night/5' 
        : 'border-hairline-light bg-transparent'
    }`}
  >
    <span className="font-body text-sm font-medium text-shade-60">
      {form.isActive ? 'Active' : 'Inactive'}
    </span>
    
    {/* Visual Switch */}
    <div className={`w-10 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${
      form.isActive ? 'bg-canvas-night' : 'bg-shade-60/30'
    }`}>
      <div className={`bg-canvas-light w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
        form.isActive ? 'translate-x-4' : 'translate-x-0'
      }`} />
    </div>
  </div>
</div>



      {/* 7. Image URL */}
      <div className="flex flex-col gap-1 col-span-2">
        <label className="font-body text-sm font-medium text-shade-60">Image URL</label>
        <input
          type="url"
          value= ""
          onChange={e => setForm({ ...form, image: e.target.value })}
          placeholder="https://..."
          className="font-body text-sm px-4 py-3 rounded-md border border-hairline-light outline-none focus:border-canvas-night"
        />
      </div>

      {/* 8. Description */}
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

      {/* Action Buttons */}
      <div className="col-span-2 flex gap-3 mt-2">
        <Button type="button" variant="primary"
                        onClick={() => confirm({
                          title: editProduct? 'Save Changes': 'Add Product',
                          message: editProduct ? 'Are you sure you wanna update this product?' : 'Are you sure you wanna add this product?',
                          onConfirm: () => handleSubmit({preventDefault: () => {}})
                        })}>
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
                      {/* Edit Button */}
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 rounded-md hover:bg-canvas-cream transition-colors text-shade-50 hover:text-canvas-night"
                      >
                        <Pencil size={14} />
                      </button>
                      {/* Delete Button */}
                      <button
                        onClick={() => confirm({
                          title: 'Hapus Produk',
                          message: 'Yakin mau hapus produk ini?',
                          onConfirm: () => handleDelete(product.id)
                        })}
                        className="p-2 rounded-md hover:bg-red-50 transition-colors text-shade-50 hover:text-red-500"
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