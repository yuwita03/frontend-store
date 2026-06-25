import { useState, useEffect } from 'react'
import api from '../../api/api'
import Badge from '../../components/ui/Badge'
import { data } from 'react-router-dom'

function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [updating, setUpdating] = useState(null)

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const res = await api.get('/orders/admin', {
        params: { page, size: 10 }
      })
      setOrders(res.data.data || [])
      setTotalPages(res.data.paging?.totalPage || 1)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [page])

  const handleStatusUpdate = async (orderId, status) => {
    setUpdating(orderId)
    try {
      await api.patch(`/orders/admin/${orderId}/status`, { status })
      fetchOrders()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status')
    } finally {
      setUpdating(null)
    }
  }

  const getStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid':      return 'aloe'
      case 'shipped':   return 'aloe'
      case 'delivered': return 'mint'
      case 'pending':   return 'default'
      case 'cancelled': return 'dark'
      default:          return 'default'
    }
  }

  const getNextStatus = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid':    return 'SHIPPED'
      case 'shipped': return 'DELIVERED'
      default:        return null
    }
  }

  return (
    <div className="p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-medium text-canvas-night">Orders</h1>
        <p className="font-body text-sm text-shade-50 mt-1">Manage and update order status</p>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <p className="font-body text-shade-50">Loading orders...</p>
        </div>
      ) : (
        <div className="bg-canvas-light border border-hairline-light rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-hairline-light">
              <tr>
                <th className="text-left px-6 py-4 font-body text-xs font-medium text-shade-50 uppercase tracking-wider">Order</th>
                <th className="text-left px-6 py-4 font-body text-xs font-medium text-shade-50 uppercase tracking-wider">Customer</th>
                <th className="text-left px-6 py-4 font-body text-xs font-medium text-shade-50 uppercase tracking-wider">Total</th>
                <th className="text-left px-6 py-4 font-body text-xs font-medium text-shade-50 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-4 font-body text-xs font-medium text-shade-50 uppercase tracking-wider">Date</th>
                <th className="text-right px-6 py-4 font-body text-xs font-medium text-shade-50 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline-light">
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-canvas-cream transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-body text-xs font-mono text-shade-50 uppercase">
                      #{order.id?.slice(0, 8).toUpperCase()}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-body text-sm text-canvas-night">{order.user?.name || order.user?.username}</p>
                    <p className="font-body text-xs text-shade-50">{order.user?.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-body text-sm text-canvas-night">
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0,
                      }).format(order.totalPrice || 0)}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={getStatusVariant(order.status)}>
                      {order.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-body text-xs text-shade-50">
                      {new Date(order.createdAt).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {getNextStatus(order.status) && (
                      <button
                        onClick={() => handleStatusUpdate(order.id, getNextStatus(order.status))}
                        disabled={updating === order.id}
                        className="font-body text-xs px-3 py-1.5 rounded-pill bg-canvas-night text-canvas-light hover:bg-shade-70 transition-colors disabled:opacity-40"
                      >
                        {updating === order.id ? 'Updating...' : `Mark as ${getNextStatus(order.status)}`}
                      </button>
                    )}
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

export default AdminOrders