import { useState, useEffect } from 'react'
import { useToast } from './useToast'
import api from '../api/api'
import { useConfirm } from './useConfirmModal'

export function useAdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [categories, setCategories] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editProduct, setEditProduct] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const {toast, showToast} = useToast()
  const { confirmState, confirm, handleConfirm, handleCancel } = useConfirm()
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

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const res = await api.get('/products', { params: { page, size: 10 } })
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
      setForm({ name: '', description: '', price: '', stock: '', categoryId: '', image: '', slug: '', isActive: true })
      fetchProducts()
      showToast('Update Berhasil!')

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
    setDeleting(id)
    try {
      await api.delete(`/products/${id}`)
      fetchProducts()
      showToast('Delete Berhasil!')
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete product')
    } finally {
      setDeleting(null)
    }
  }

  return {
    products, loading, toast, showToast,confirmState, confirm, handleConfirm, handleCancel, page, setPage, totalPages, categories, fetchProducts,
    showForm, setShowForm, editProduct, setEditProduct,
    form, setForm, deleting,
    handleSubmit, handleEdit, handleDelete,
  }
}