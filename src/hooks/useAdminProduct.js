// tambah di useAdminProducts.js

export function useAdminProducts() {
  // ... state fetching yang sudah ada ...
  
  const [showForm, setShowForm] = useState(false)
  const [editProduct, setEditProduct] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    categoryId: '',
    image: '',
    slug: '',
    isActive: true,
  })

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
      setForm({ name: '', description: '', price: '', stock: '', categoryId: '', image: '', slug: '', isActive: true })
      fetchProducts()
    } catch (err) {
      const errData = err.response?.data
      alert(errData?.errors?.message || errData?.errors || errData?.message || 'Failed to save product')
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
      isActive: product.isActive,
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

  return {
    // fetching
    products, loading, page, setPage, totalPages, categories, fetchProducts,
    // form & crud
    showForm, setShowForm, editProduct, setEditProduct,
    form, setForm, deleting,
    handleSubmit, handleEdit, handleDelete,
  }
}