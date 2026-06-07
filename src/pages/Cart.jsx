import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react'
import api from '../api/api'
import Button from '../components/ui/Button'

function Cart() {
  const navigate = useNavigate()
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(null)

  const fetchCart = async () => {
    try {
      const res = await api.get('/cart')
      console.log('CART RESPONSE:', res.data)
      setCart(res.data.data?.items || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  const updateQuantity = async (itemId, quantity) => {
    if (quantity < 1) return
    setUpdating(itemId)
    try {
      await api.patch(`/cart/${itemId}`, { quantity })
      await fetchCart()
    } catch (err) {
      console.error(err)
    } finally {
      setUpdating(null)
    }
  }

  const removeItem = async (itemId) => {
    setUpdating(itemId)
    try {
      await api.delete(`/cart/${itemId}`)
      await fetchCart()
    } catch (err) {
      console.error(err)
    } finally {
      setUpdating(null)
    }
  }

  const clearCart = async () => {
    try {
      await api.delete('/cart')
      setCart([])
    } catch (err) {
      console.error(err)
    }
  }

  const total = cart.reduce((sum, item) => {
    return sum + (item.product?.price || 0) * item.quantity
  }, 0)

  const formattedTotal = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(total)

  if (loading) {
    return (
      <div className="min-h-screen bg-canvas-cream flex items-center justify-center">
        <p className="font-body text-shade-50">Loading cart...</p>
      </div>
    )
  }

  // Empty state
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-canvas-cream flex flex-col items-center justify-center gap-6">
        <ShoppingBag size={48} className="text-shade-30" />
        <div className="text-center">
          <h2 className="font-display text-2xl text-canvas-night">Your cart is empty</h2>
          <p className="font-body text-sm text-shade-50 mt-2">
            Looks like you haven't added anything yet
          </p>
        </div>
        <Link to="/catalog">
          <Button variant="primary">Browse Catalog</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-canvas-cream">
      <div className="max-w-5xl mx-auto px-8 py-12">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-4xl font-medium text-canvas-night">
            Your Cart
          </h1>
          <button
            onClick={clearCart}
            className="font-body text-sm text-shade-50 hover:text-red-500 transition-colors"
          >
            Clear all
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Cart Items */}
          <div className="flex-1 flex flex-col gap-4">
            {cart.map(item => (
              <div
                key={item.id}
                className="bg-canvas-light border border-hairline-light rounded-lg p-4 flex gap-4"
              >
                {/* Image */}
                <div className="w-24 h-24 rounded-md overflow-hidden shrink-0 bg-shade-30 flex items-center justify-center">
                  {item.product?.image ? (
                    <img
                      src={item.product.image}
                      alt={item.product?.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ShoppingBag size={24} className="text-shade-50" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <p className="font-body text-xs text-shade-50">
                      {item.product?.category?.name}
                    </p>
                    <h3 className="font-body text-sm font-medium text-canvas-night mt-0.5">
                      {item.product?.name}
                    </h3>
                    <p className="font-body text-sm text-shade-60 mt-1">
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0,
                      }).format(item.product?.price)}
                    </p>
                  </div>

                  {/* Quantity + Remove */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-hairline-light rounded-pill p-1 bg-canvas-cream">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={updating === item.id || item.quantity <= 1}
                        className="w-7 h-7 rounded-pill flex items-center justify-center hover:bg-shade-30 transition-colors disabled:opacity-30"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center font-body text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={updating === item.id}
                        className="w-7 h-7 rounded-pill flex items-center justify-center hover:bg-shade-30 transition-colors disabled:opacity-30"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      disabled={updating === item.id}
                      className="text-shade-40 hover:text-red-500 transition-colors disabled:opacity-30"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-80 shrink-0">
            <div className="bg-canvas-light border border-hairline-light rounded-lg p-6 flex flex-col gap-4 sticky top-8">
              <h2 className="font-display text-xl text-canvas-night">Order Summary</h2>

              <div className="flex flex-col gap-2 border-b border-hairline-light pb-4">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between">
                    <p className="font-body text-sm text-shade-50">
                      {item.product?.name} × {item.quantity}
                    </p>
                    <p className="font-body text-sm text-canvas-night">
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0,
                      }).format((item.product?.price || 0) * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between">
                <p className="font-body text-sm font-medium text-canvas-night">Total</p>
                <p className="font-body text-sm font-medium text-canvas-night">{formattedTotal}</p>
              </div>

              <Button
                variant="primary"
                className="w-full"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </Button>

              <Link to="/catalog" className="text-center">
                <p className="font-body text-sm text-shade-50 hover:text-canvas-night transition-colors">
                  Continue Shopping
                </p>
              </Link>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Cart