import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, MapPin, Package } from 'lucide-react'
import api from '../api/api'
import Badge from '../components/UI/Badge'
import Button from '../components/UI/Button'

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
      <div className="min-h-screen bg-canvas-cream flex items-center justify-center">
        <p className="font-body text-shade-50">Loading order...</p>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-canvas-cream flex flex-col items-center justify-center gap-4">
        <Package size={48} className="text-shade-30" />
        <p className="font-body text-shade-60">Order not found</p>
        <Link to="/orders">
          <Button variant="primary">Back to Orders</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-canvas-cream">
      <div className="max-w-3xl mx-auto px-8 py-12">

        {/* Back */}
        <Link
          to="/orders"
          className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-shade-50 hover:text-canvas-night transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          BACK TO ORDERS
        </Link>

        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="font-body text-xs text-shade-50 font-mono uppercase tracking-wider mb-1">
              Order #{order.id?.slice(0, 8).toUpperCase()}
            </p>
            <h1 className="font-display text-3xl font-medium text-canvas-night">
              Order Detail
            </h1>
            <p className="font-body text-sm text-shade-50 mt-1">
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

        <div className="flex flex-col gap-6">

          {/* Items */}
          <div className="bg-canvas-light border border-hairline-light rounded-lg p-6">
            <h2 className="font-display text-lg text-canvas-night mb-4">Items</h2>
            <div className="flex flex-col gap-4">
              {order.items?.map(item => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-body text-sm font-medium text-canvas-night">
                      {item.product?.name || item.productName}
                    </p>
                    <p className="font-body text-xs text-shade-50 mt-0.5">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-body text-sm text-canvas-night">
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      minimumFractionDigits: 0,
                    }).format((item.price || item.product?.price || 0) * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-4 pt-4 border-t border-hairline-light flex justify-between">
              <p className="font-body text-sm font-medium text-canvas-night">Total</p>
              <p className="font-body text-sm font-medium text-canvas-night">
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

          {/* Shipping Address */}
          {order.address && (
            <div className="bg-canvas-light border border-hairline-light rounded-lg p-6">
              <h2 className="font-display text-lg text-canvas-night mb-4">
                Shipping Address
              </h2>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-shade-50 mt-0.5 shrink-0" />
                <div>
                  <p className="font-body text-sm font-medium text-canvas-night">
                    {order.address.name}
                  </p>
                  <p className="font-body text-sm text-shade-50 mt-1">
                    {order.address.phone}
                  </p>
                  <p className="font-body text-sm text-shade-50">
                    {order.address.street}, {order.address.city}, {order.address.province} {order.address.postalCode}
                  </p>
                </div>
              </div>
            </div>
          )}


          {/* // Add this below the cancel button */}
                {/* Pending - belum bayar */}
                    {/* Pending - belum bayar */}
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
                        className="font-body text-sm text-shade-50 hover:text-canvas-night transition-colors text-center"
                        >
                        Already paid? Refresh status
                        </button>
                        <button
                        onClick={handleCancel}
                        disabled={cancelling}
                        className="font-body text-sm text-red-500 hover:text-red-700 transition-colors disabled:opacity-50 text-center"
                        >
                        {cancelling ? 'Cancelling...' : 'Cancel this order'}
                        </button>
                    </div>
                    )}

                {/* Paid - sudah bayar */}
                {order.status?.toLowerCase() === 'paid' && (
                <div className="bg-aloe rounded-lg p-4 text-center">
                    <p className="font-body text-sm font-medium text-canvas-night">
                    ✓ Payment confirmed. Your order is being processed.
                    </p>
                </div>
                )}

                {/* Cancelled */}
                {order.status?.toLowerCase() === 'cancelled' && (
                <div className="bg-shade-30 rounded-lg p-4 text-center">
                    <p className="font-body text-sm text-shade-60">
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