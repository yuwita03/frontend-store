import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, MapPin, Package } from 'lucide-react'
import api from '../api/api'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

function OrderDetail() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [cancelling, setCancelling] = useState(false)
  const [paymentUrl, setPaymentUrl] = useState(null)


  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/orders/${id}`)
        console.log('ORDER RESPONSE:', res.data)
        setOrder(res.data.data || res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchOrder()
  }, [id])

  const handleCancel = async () => {
    if (!confirm('Are you sure you want to cancel this order?')) return
    setCancelling(true)
    try {
      await api.delete(`/orders/${id}/cancel`)
      const res = await api.get(`/orders/${id}`)
      setOrder(res.data.data || res.data)
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to cancel order')
    } finally {
      setCancelling(false)
    }
  }

  const getStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'mint'
      case 'shipped':   return 'aloe'
      case 'pending':   return 'default'
      case 'cancelled': return 'dark'
      default:          return 'default'
    }
  }


const handlePay = async () => {
  try {
    // If we already have a payment URL, just open it
    if (paymentUrl) {
      window.open(paymentUrl, '_blank')
      return
    }

    const res = await api.post(`/payment/${order.id}`)
    const url = res.data.data?.redirectUrl
      || res.data.data?.payment_url
      || res.data.redirectUrl
      || res.data.payment_url

    setPaymentUrl(url)
    if (url) window.open(url, '_blank')
  } catch (err) {
    alert(err.response?.data?.message || 'Failed to create payment')
  }
}

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf9f5] flex items-center justify-center">
        <p className="font-['Hanken_Grotesk'] text-sm text-[#737872] animate-pulse">Loading order...</p>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#faf9f5] flex flex-col items-center justify-center gap-4">
        <Package size={48} className="text-[#c3c8c1]" />
        <p className="font-['Hanken_Grotesk'] text-sm text-[#434843]">Order not found</p>
        <Link to="/orders">
          <Button variant="primary">Back to Orders</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#faf9f5] font-['Hanken_Grotesk']">
      <div className="max-w-[1280px] mx-auto px-6 py-12">

        <Link
          to="/orders"
          className="inline-flex items-center gap-2 text-xs font-['Hanken_Grotesk'] font-semibold tracking-[0.05em] text-[#737872] hover:text-[#334537] uppercase transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          Back to Orders
        </Link>

        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="font-['Hanken_Grotesk'] text-xs font-semibold tracking-[0.05em] text-[#737872] uppercase mb-1">
              Order #{order.id?.slice(0, 8).toUpperCase()}
            </p>
            <h1 className="font-['Libre_Caslon_Text'] text-3xl font-semibold text-[#1b1c1a]">Order Detail</h1>
            <p className="font-['Hanken_Grotesk'] text-sm text-[#737872] mt-1">
              {new Date(order.createdAt).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <Badge variant={getStatusVariant(order.status)}>
            {order.status}
          </Badge>
        </div>

        <div className="flex flex-col gap-6 max-w-3xl">

          <div className="bg-[#ffffff] rounded-[0.5rem] p-6 shadow-[0_4px_15px_rgba(51,69,55,0.06)]">
            <h2 className="font-['Libre_Caslon_Text'] text-lg font-semibold text-[#1b1c1a] mb-4">Items</h2>
            <div className="flex flex-col gap-4">
              {order.items?.map(item => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-['Hanken_Grotesk'] text-sm font-medium text-[#1b1c1a]">
                      {item.product?.name || item.productName}
                    </p>
                    <p className="font-['Hanken_Grotesk'] text-xs text-[#737872] mt-0.5">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-['Hanken_Grotesk'] text-sm text-[#1b1c1a]">
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      minimumFractionDigits: 0,
                    }).format((item.price || item.product?.price || 0) * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-[#e3e2df] flex justify-between">
              <p className="font-['Hanken_Grotesk'] text-sm font-medium text-[#1b1c1a]">Total</p>
              <p className="font-['Hanken_Grotesk'] text-sm font-medium text-[#1b1c1a]">
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  minimumFractionDigits: 0,
                }).format(order.totalPrice || order.items?.reduce((sum,item) =>{
                    return sum + (item.price || item.product?.price || 0) * (item.quantity || 1)
                }, 0))}
              </p>
            </div>
          </div>

          {order.address && (
            <div className="bg-[#ffffff] rounded-[0.5rem] p-6 shadow-[0_4px_15px_rgba(51,69,55,0.06)]">
              <h2 className="font-['Libre_Caslon_Text'] text-lg font-semibold text-[#1b1c1a] mb-4">Shipping Address</h2>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-[#737872] mt-0.5 shrink-0" />
                <div>
                  <p className="font-['Hanken_Grotesk'] text-sm font-medium text-[#1b1c1a]">{order.address.name}</p>
                  <p className="font-['Hanken_Grotesk'] text-sm text-[#737872] mt-1">{order.address.phone}</p>
                  <p className="font-['Hanken_Grotesk'] text-sm text-[#737872]">
                    {order.address.street}, {order.address.city}, {order.address.province} {order.address.postalCode}
                  </p>
                </div>
              </div>
            </div>
          )}

                    {order.status?.toLowerCase() === 'pending' && (
                    <div className="flex flex-col gap-3">
                        <Button variant="aloe" className="w-full" onClick={handlePay}>
                        Pay Now
                        </Button>
                        <button
                        onClick={async () => {
                            const res = await api.get(`/orders/${id}`)
                            setOrder(res.data.data || res.data)
                        }}
                        className="font-['Hanken_Grotesk'] text-sm text-[#737872] hover:text-[#334537] transition-colors text-center"
                        >
                        Already paid? Refresh status
                        </button>
                        <button
                        onClick={handleCancel}
                        disabled={cancelling}
                        className="font-['Hanken_Grotesk'] text-sm text-[#ba1a1a] hover:text-[#93000a] transition-colors disabled:opacity-50 text-center"
                        >
                        {cancelling ? 'Cancelling...' : 'Cancel this order'}
                        </button>
                    </div>
                    )}

                {order.status?.toLowerCase() === 'paid' && (
                <div className="bg-[#c1fbd4] rounded-[0.5rem] p-4 text-center">
                    <p className="font-['Hanken_Grotesk'] text-sm font-medium text-[#1b1c1a]">
                      Payment confirmed. Your order is being processed.
                    </p>
                </div>
                )}

                {order.status?.toLowerCase() === 'cancelled' && (
                <div className="bg-[#efeeea] rounded-[0.5rem] p-4 text-center">
                    <p className="font-['Hanken_Grotesk'] text-sm text-[#434843]">
                      This order has been cancelled.
                    </p>
                </div>
                )}
        </div>
      </div>
    </div>
  )
}

export default OrderDetail