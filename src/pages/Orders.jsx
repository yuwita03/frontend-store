import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Package, ChevronRight } from 'lucide-react'
import api from '../api/api'
import Badge from '../components/UI/Badge'
import Button from '../components/UI/Button'

function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState('all')
  const size = 5

  const filteredOrders = filter === 'all'
    ? orders
    : orders.filter(o => o.status?.toLowerCase() === filter)

  const totalPages = Math.ceil(filteredOrders.length / size)
  const paginatedOrders = filteredOrders.slice((page - 1) * size, page * size)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('/orders')
        setOrders(res.data.data || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  const getStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'mint'
      case 'shipped':   return 'aloe'
      case 'pending':   return 'default'
      case 'cancelled': return 'dark'
      case 'paid':      return 'aloe'
      default:          return 'default'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-canvas-cream flex items-center justify-center p-4">
        <p className="font-body text-sm text-shade-50">Loading orders...</p>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-canvas-cream flex flex-col items-center justify-center gap-6 p-6">
        <Package size={40} className="text-shade-30" />
        <div className="text-center max-w-xs">
          <h2 className="font-display text-xl sm:text-2xl text-canvas-night">No orders yet</h2>
          <p className="font-body text-xs sm:text-sm text-shade-50 mt-1">
            Your order history will appear here
          </p>
        </div>
        <Link to="/catalog" className="w-full sm:w-auto">
          <Button variant="primary" className="w-full sm:w-auto">Start Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-canvas-cream">
      {/* Pengurangan padding di mobile agar muat lebih banyak konten */}
      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-6 sm:py-12">

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="font-display text-2xl sm:text-4xl font-medium text-canvas-night">
            Your Orders
          </h1>
          <p className="font-body text-xs sm:text-sm text-shade-50 mt-1">
            {orders.length} order{orders.length > 1 ? 's' : ''} total
          </p>
          
          {/* Filters - Menggunakan scroll horizontal halus di HP agar tidak patah ke bawah */}
          <div className="flex my-6 sm:my-8 items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 flex-nowrap sm:flex-wrap">
            {['all', 'pending', 'paid', 'shipped', 'delivered', 'cancelled'].map(status => (
              <button
                key={status}
                onClick={() => { setFilter(status); setPage(1) }}
                className={`
                  font-body text-xs px-3 py-1.5 rounded-pill border transition-colors capitalize whitespace-nowrap
                  ${filter === status
                    ? 'bg-canvas-night text-canvas-light border-canvas-night'
                    : 'bg-canvas-light text-shade-50 border-hairline-light hover:border-shade-40'}
                `}
              >
                {status === 'all' ? 'All' : status}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        <div className="flex flex-col gap-3 sm:gap-4">
          {paginatedOrders.length === 0 ? (
            <div className="text-center py-12 bg-canvas-light border border-hairline-light rounded-lg">
              <p className="font-body text-sm text-shade-50">No {filter} orders found.</p>
            </div>
          ) : (
            paginatedOrders.map(order => (
              <Link key={order.id} to={`/orders/${order.id}`}>
                {/* Layout responsif: Menumpuk vertikal di HP, sejajar horizontal di Desktop */}
                <div className="bg-canvas-light border border-hairline-light rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex justify-between items-start sm:block">
                      <div>
                        <p className="font-body text-[10px] sm:text-xs text-shade-50 font-mono uppercase tracking-wider">
                          #{order.id?.slice(0, 8).toUpperCase()}
                        </p>
                        <p className="font-body text-base sm:text-sm font-medium text-canvas-night mt-0.5">
                          {new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                            minimumFractionDigits: 0,
                          }).format(order.totalPrice || 0)}
                        </p>
                        <p className="font-body text-xs text-shade-50 mt-0.5">
                          {new Date(order.createdAt).toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                      
                      {/* Badge duplikat khusus tampilan HP agar sejajar nama order */}
                      <div className="sm:hidden">
                        <Badge variant={getStatusVariant(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Badge & Panah untuk tampilan Desktop */}
                    <div className="hidden sm:flex items-center gap-3">
                      <Badge variant={getStatusVariant(order.status)}>
                        {order.status}
                      </Badge>
                      <ChevronRight size={16} className="text-shade-40" />
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}

          {/* Pagination - Ukuran tombol diperlebar agar mudah ditekan di HP */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between sm:justify-center gap-4 mt-6">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="font-body text-xs sm:text-sm px-4 py-2.5 rounded-pill border border-hairline-light disabled:opacity-40 hover:bg-shade-30 transition-colors bg-canvas-light w-[100px] text-center"
              >
                Previous
              </button>
              <span className="font-body text-xs sm:text-sm text-shade-50">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="font-body text-xs sm:text-sm px-4 py-2.5 rounded-pill border border-hairline-light disabled:opacity-40 hover:bg-shade-30 transition-colors bg-canvas-light w-[100px] text-center"
              >
                Next
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default Orders
