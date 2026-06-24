import { useState, useEffect } from 'react'
import { useToast } from './useToast'
import api from '../api/api'
import { useConfirm } from './useConfirmModal'

export function useAdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [showForm, setShowForm] = useState(false)
  const [editUser, setEditUser] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const { toast, showToast } = useToast()
  const { confirmState, confirm, handleConfirm, handleCancel } = useConfirm()
  
  // Sesuai dengan properti UpdateUserRequest
  const [form, setForm] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    role: '',
    avatar: '',
  })

  // GET /api/users/admin/users
const fetchUsers = async () => {
  setLoading(true)
  try {
    const res = await api.get('/users/admin/users', { params: { page, size: 10 } })
    
    // 1. Ambil langsung dari res.data.data (sesuai bungkus NestJS)
    setUsers(res.data.data || []) 
    
    // 2. Ambil paging dari res.data.paging
    setTotalPages(res.data.paging?.totalPage || 1) 
    
  } catch (err) {
    console.error('Gagal mengambil data user:', err)
  } finally {
    setLoading(false)
  }
}

  useEffect(() => {
    fetchUsers()
  }, [page])

const handleSubmit = async () => {
  const payload = { ...form }

  if (!payload.password) {
    delete payload.password
  }

  try {
    if (editUser) {
      const currentLoggedInUserId = localStorage.getItem('userId')
      const isEditingSelf = editUser.id === currentLoggedInUserId
      const isChangingPassword = !!form.password

      await api.patch(`/users/admin/${editUser.id}`, payload)
      showToast('User berhasil diperbarui!')

      if (isEditingSelf && isChangingPassword) {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        return
      }
    } else {
      await api.post('/users', payload)
      showToast('User berhasil ditambahkan!')
    }

    setShowForm(false)
    setEditUser(null)
    fetchUsers()
  } catch (err) {
    showToast('Gagal menyimpan user.')
    console.error(err)
  }
}

  const handleEdit = (user) => {
    setEditUser(user)
    setForm({
      username: user.username || '',
      name: user.name || '',
      email: user.email || '',
      password: '', // Kosongkan demi keamanan, diisi hanya jika ingin ganti password
      role: user.role || '',
      avatar: user.avatar || '',
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    setDeleting(id)
    try {
      // Catatan: Menggunakan asumsi endpoint DELETE /api/users/admin/{id} 
      // untuk menyelaraskan dengan fitur hapus di UI Admin sebelumnya.
      await api.delete(`/users/${id}`)
      fetchUsers()
      showToast('User berhasil dihapus!')
    } catch (err) {
      showToast('User gagal di hapus')
    } finally {
      setDeleting(null)
    }
  }

  return {
    users, loading, toast, showToast, confirmState, confirm, handleConfirm, handleCancel, page, setPage, totalPages, fetchUsers,
    showForm, setShowForm, editUser, setEditUser,
    form, setForm, deleting,
    handleSubmit, handleEdit, handleDelete,
  }
}