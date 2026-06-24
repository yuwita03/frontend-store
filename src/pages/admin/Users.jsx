import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import { useAdminUsers } from '../../hooks/useAdminUser'
import Toast from '../../components/UI/Toats' 
import { useConfirm } from '../../hooks/useConfirmModal'
import ConfirmModal from '../../components/UI/ConfirmModal'

function AdminUsers() {
  const {
    users, loading, page, setPage, totalPages,
    showForm, setShowForm, editUser, setEditUser,
    form, setForm, deleting,
    handleSubmit, handleEdit, handleDelete, toast, 
  } = useAdminUsers()

  const { confirmState, confirm, handleConfirm, handleCancel } = useConfirm()

  // Handler interseptor untuk mencegah form submit HTML bawaan reload page
  const preSubmitCheck = (e) => {
    e.preventDefault() // Menahan submit bawaan form HTML
    
    // Trigger modal konfirmasi
    confirm({
      title: editUser ? 'Save Changes' : 'Add User',
      message: editUser ? 'Are you sure you wanna update this user?' : 'Are you sure you wanna add this user?',
      // Cukup panggil handleSubmit secara bersih tanpa melempar event palsu lagi
      onConfirm: () => handleSubmit() 
    })
  }

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
          <h1 className="font-display text-3xl font-medium text-canvas-night">Users</h1>
          <p className="font-body text-sm text-shade-50 mt-1">Manage your user accounts and permissions</p>
        </div>
        <Button variant="primary" onClick={() => {
          setEditUser(null)
          setForm({ username: '', name: '', email: '', password: '', role: '', avatar: '' })
          setShowForm(true)
        }}>
          <Plus size={16} className="inline mr-2" />
          Add User
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-canvas-light border border-hairline-light rounded-lg p-6 mb-8">
          <h2 className="font-display text-xl text-canvas-night mb-4">
            {editUser ? 'Edit User' : 'Add New User'}
          </h2>
          {/* HUBUNGKAN ON SUBMIT KE INTERSEPTOR KITA */}
          <form onSubmit={preSubmitCheck} className="grid grid-cols-2 gap-4">
            
            {/* 1. Name */}
            <div className="flex flex-col gap-1">
              <label className="font-body text-sm font-medium text-shade-60">Full Name</label>
              <input
                required
                value={form.name || ''}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="John Doe"
                className="font-body text-sm px-4 py-3 rounded-md border border-hairline-light outline-none focus:border-canvas-night"
              />
            </div>

            {/* 2. Username */}
            <div className="flex flex-col gap-1">
              <label className="font-body text-sm font-medium text-shade-60">Username</label>
              <input
                required
                value={form.username || ''}
                onChange={e => setForm({ ...form, username: e.target.value.toLowerCase().replace(/\s+/g, '') })}
                placeholder="johndoe"
                className="font-body text-sm px-4 py-3 rounded-md border border-hairline-light outline-none focus:border-canvas-night"
              />
            </div>

            {/* 3. Email */}
            <div className="flex flex-col gap-1">
              <label className="font-body text-sm font-medium text-shade-60">Email Address</label>
              <input
                required
                type="email"
                value={form.email || ''}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="johndoe@example.com"
                className="font-body text-sm px-4 py-3 rounded-md border border-hairline-light outline-none focus:border-canvas-night"
              />
            </div>

            {/* 4. Role */}
            <div className="flex flex-col gap-1">
              <label className="font-body text-sm font-medium text-shade-60">Role</label>
              <select
                required
                value={form.role || ''}
                onChange={e => setForm({ ...form, role: e.target.value })}
                className="font-body text-sm px-4 py-3 rounded-md border border-hairline-light outline-none focus:border-canvas-night bg-canvas-light"
              >
                <option value="">Select role</option>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            {/* 5. Password */}
            <div className="flex flex-col gap-1 col-span-2">
              <label className="font-body text-sm font-medium text-shade-60">
                {editUser ? 'Password (Leave blank to keep unchanged)' : 'Password'}
              </label>
              <input
                required={!editUser}
                type="password"
                value={form.password || ''}
                onChange={e => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                className="font-body text-sm px-4 py-3 rounded-md border border-hairline-light outline-none focus:border-canvas-night"
              />
            </div>

            {/* 6. Avatar URL */}
            <div className="flex flex-col gap-1 col-span-2">
              <label className="font-body text-sm font-medium text-shade-60">Avatar URL</label>
              <input
                type="url"
                value={form.avatar || ''}
                onChange={e => setForm({ ...form, avatar: e.target.value })}
                // placeholder="https://example.com/avatar.jpg"
                className="font-body text-sm px-4 py-3 rounded-md border border-hairline-light outline-none focus:border-canvas-night"
              />
            </div>

            {/* Action Buttons */}
            <div className="col-span-2 flex gap-3 mt-2">
              {/* UBAH type BERUPAH "submit" AGAR VALIDASI FORM HTML BERJALAN SEMPURNA */}
              <Button type="submit" variant="primary">
                {editUser ? 'Save Changes' : 'Add User'}
              </Button>
              <Button
                type="button"
                variant="outline_light"
                onClick={() => { setShowForm(false); setEditUser(null) }}
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
          <p className="font-body text-shade-50">Loading users...</p>
        </div>
      ) : (
        <div className="bg-canvas-light border border-hairline-light rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-hairline-light">
              <tr>
                <th className="text-left px-6 py-4 font-body text-xs font-medium text-shade-50 uppercase tracking-wider">User</th>
                <th className="text-left px-6 py-4 font-body text-xs font-medium text-shade-50 uppercase tracking-wider">Username</th>
                <th className="text-left px-6 py-4 font-body text-xs font-medium text-shade-50 uppercase tracking-wider">Email</th>
                <th className="text-left px-6 py-4 font-body text-xs font-medium text-shade-50 uppercase tracking-wider">Role</th>
                <th className="text-right px-6 py-4 font-body text-xs font-medium text-shade-50 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline-light">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-canvas-cream transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-shade-30 overflow-hidden shrink-0 flex items-center justify-center">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-white font-medium text-sm">
                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                          </span>
                        )}
                      </div>
                      <p className="font-body text-sm font-medium text-canvas-night">{user.name || '-'}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-body text-sm text-shade-50">@{user.username}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-body text-sm text-shade-50">{user.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={user.role === 'ADMIN' ? 'mint' : 'default'}>
                      {user.role || 'USER'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="p-2 rounded-md hover:bg-canvas-cream transition-colors text-shade-50 hover:text-canvas-night"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => confirm({
                          title: 'Hapus User',
                          message: 'Yakin mau hapus user ini?',
                          onConfirm: () => handleDelete(user.id)
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

export default AdminUsers