import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Package, ChevronRight } from 'lucide-react'
import api from '../api/api'
import Button from '../components/ui/Button'

const statusStyles = {
  delivered: 'bg-[#d3e8d5] text-[#0e1f13]',
  shipped:   'bg-[#c1fbd4] text-[#1b1c1a]',
  paid:      'bg-[#c1fbd4] text-[#1b1c1a]',
  pending:   'bg-[#efeeea] text-[#434843]',
  cancelled: 'bg-[#e3e2df] text-[#434843]',
}

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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf9f5] flex items-center justify-center p-4">
        <p className="font-['Hanken_Grotesk'] text-sm text-[#737872] animate-pulse">Loading orders...</p>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-[#faf9f5] flex flex-col items-center justify-center gap-6 p-6 font-['Hanken_Grotesk']">
        <Package size={40} className="text-[#c3c8c1]" />
        <div className="text-center max-w-xs">
          <h2 className="font-['Libre_Caslon_Text'] text-2xl font-semibold text-[#1b1c1a]">No orders yet</h2>
          <p className="text-sm text-[#737872] mt-1">
            Your order history will appear here
          </p>
        </div>
        <Link to="/catalog">
          <Button variant="primary" className="!bg-[#334537] !text-[#ffffff] !rounded-[0.25rem] !font-semibold !tracking-[0.05em] !text-xs !uppercase !shadow-[0_4px_15px_rgba(51,69,55,0.06)] hover:!bg-[#4a5d4e]">
            Start Shopping
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#faf9f5] font-['Hanken_Grotesk']">
      <div className="max-w-[1280px] mx-auto px-6 py-12">

        <div className="mb-8">
          <h1 className="font-['Libre_Caslon_Text'] text-[32px] font-semibold leading-10 text-[#1b1c1a]">
            Your Orders
          </h1>
          <p className="text-sm text-[#737872] mt-1">
            {orders.length} order{orders.length > 1 ? 's' : ''} total
          </p>

          <div className="flex my-6 items-center gap-2 overflow-x-auto pb-2 scrollbar-none flex-nowrap sm:flex-wrap">
            {['all', 'pending', 'paid', 'shipped', 'delivered', 'cancelled'].map(status => (
              <button
                key={status}
                onClick={() => { setFilter(status); setPage(1) }}
                className={`text-xs font-semibold tracking-[0.05em] px-4 py-1.5 rounded-[0.25rem] border transition-colors capitalize whitespace-nowrap uppercase ${
                  filter === status
                    ? 'bg-[#334537] text-[#ffffff] border-[#334537]'
                    : 'bg-[#ffffff] text-[#737872] border-[#c3c8c1] hover:border-[#334537] hover:text-[#334537]'
                }`}
              >
                {status === 'all' ? 'All' : status}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 max-w-3xl">
          {paginatedOrders.length === 0 ? (
            <div className="text-center py-12 bg-[#ffffff] rounded-[0.5rem] shadow-[0_4px_15px_rgba(51,69,55,0.06)]">
              <p className="text-sm text-[#737872]">No {filter} orders found.</p>
            </div>
          ) : (
            paginatedOrders.map(order => (
              <Link key={order.id} to={`/orders/${order.id}`}>
                <div className="bg-[#ffffff] rounded-[0.5rem] p-4 hover:shadow-[0_6px_20px_rgba(51,69,55,0.12)] hover:-translate-y-0.5 transition-all duration-300 shadow-[0_4px_15px_rgba(51,69,55,0.06)]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex justify-between items-start sm:block">
                      <div>
                        <p className="text-[10px] sm:text-xs font-semibold tracking-[0.05em] text-[#737872] uppercase">
                          #{order.id?.slice(0, 8).toUpperCase()}
                        </p>
                        <p className="text-base sm:text-sm font-medium text-[#1b1c1a] mt-0.5">
                          {new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                            minimumFractionDigits: 0,
                          }).format(order.totalPrice || 0)}
                        </p>
                        <p className="text-xs text-[#737872] mt-0.5">
                          {new Date(order.createdAt).toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                      </div>

                      <div className="sm:hidden">
                        <span className={`inline-block text-[10px] font-semibold tracking-[0.05em] px-3 py-1 rounded-[0.25rem] uppercase ${statusStyles[order.status?.toLowerCase()] || 'bg-[#efeeea] text-[#434843]'}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-3">
                      <span className={`inline-block text-[10px] font-semibold tracking-[0.05em] px-3 py-1 rounded-[0.25rem] uppercase ${statusStyles[order.status?.toLowerCase()] || 'bg-[#efeeea] text-[#434843]'}`}>
                        {order.status}
                      </span>
                      <ChevronRight size={16} className="text-[#737872]" />
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-between sm:justify-center gap-4 mt-6">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="text-xs sm:text-sm font-semibold tracking-[0.05em] uppercase px-5 py-2.5 rounded-[0.25rem] border border-[#c3c8c1] text-[#434843] hover:border-[#334537] hover:text-[#334537] transition-colors bg-[#ffffff] disabled:opacity-30 disabled:pointer-events-none"
              >
                Previous
              </button>
              <span className="text-xs sm:text-sm text-[#737872] font-medium">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="text-xs sm:text-sm font-semibold tracking-[0.05em] uppercase px-5 py-2.5 rounded-[0.25rem] border border-[#c3c8c1] text-[#434843] hover:border-[#334537] hover:text-[#334537] transition-colors bg-[#ffffff] disabled:opacity-30 disabled:pointer-events-none"
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