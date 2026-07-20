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
      <div className="min-h-screen bg-[#faf9f5] flex items-center justify-center">
        <p className="font-['Hanken_Grotesk'] text-sm text-[#737872] animate-pulse">Loading cart...</p>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#faf9f5] flex flex-col items-center justify-center gap-6 font-['Hanken_Grotesk']">
        <ShoppingBag size={48} className="text-[#c3c8c1]" />
        <div className="text-center">
          <h2 className="font-['Libre_Caslon_Text'] text-2xl font-semibold text-[#1b1c1a]">Your cart is empty</h2>
          <p className="text-sm text-[#737872] mt-2">
            Looks like you haven't added anything yet
          </p>
        </div>
        <Link to="/catalog">
          <Button variant="primary" className="!bg-[#334537] !text-[#ffffff] !rounded-[0.25rem] !font-semibold !tracking-[0.05em] !text-xs !uppercase !shadow-[0_4px_15px_rgba(51,69,55,0.06)] hover:!bg-[#4a5d4e]">Browse Catalog</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#faf9f5] font-['Hanken_Grotesk']">
      <div className="max-w-[1280px] mx-auto px-6 py-12">

        <div className="flex items-center justify-between mb-8">
          <h1 className="font-['Libre_Caslon_Text'] text-[32px] font-semibold leading-10 text-[#1b1c1a]">
            Your Cart
          </h1>
          <button
            onClick={clearCart}
            className="text-sm text-[#737872] hover:text-[#ba1a1a] transition-colors"
          >
            Clear all
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          <div className="flex-1 flex flex-col gap-4">
            {cart.map(item => (
              <div
                key={item.id}
                className="bg-[#ffffff] rounded-[0.5rem] p-4 flex gap-4 shadow-[0_4px_15px_rgba(51,69,55,0.06)]"
              >
                <div className="w-24 h-24 rounded-[0.25rem] overflow-hidden shrink-0 bg-[#efeeea] flex items-center justify-center">
                  {item.product?.image ? (
                    <img
                      src={item.product.image}
                      alt={item.product?.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ShoppingBag size={24} className="text-[#737872]" />
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-medium text-[#737872]">
                      {item.product?.category?.name}
                    </p>
                    <h3 className="text-sm font-medium text-[#1b1c1a] mt-0.5">
                      {item.product?.name}
                    </h3>
                    <p className="text-sm text-[#fe932c] font-semibold mt-1">
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0,
                      }).format(item.product?.price)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-[#c3c8c1] rounded-[0.25rem] p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={updating === item.id || item.quantity <= 1}
                        className="w-7 h-7 rounded-[0.25rem] flex items-center justify-center hover:bg-[#efeeea] transition-colors disabled:opacity-30 text-[#434843]"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center text-sm font-medium text-[#1b1c1a]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={updating === item.id}
                        className="w-7 h-7 rounded-[0.25rem] flex items-center justify-center hover:bg-[#efeeea] transition-colors disabled:opacity-30 text-[#434843]"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      disabled={updating === item.id}
                      className="text-[#737872] hover:text-[#ba1a1a] transition-colors disabled:opacity-30"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

          <div className="w-full lg:w-80 shrink-0">
            <div className="bg-[#ffffff] rounded-[0.5rem] p-6 flex flex-col gap-4 sticky top-8 shadow-[0_4px_15px_rgba(51,69,55,0.06)]">
              <h2 className="font-['Libre_Caslon_Text'] text-xl font-semibold text-[#1b1c1a]">Order Summary</h2>

              <div className="flex flex-col gap-2 border-b border-[#e3e2df] pb-4">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between">
                    <p className="text-sm text-[#737872]">
                      {item.product?.name} &times; {item.quantity}
                    </p>
                    <p className="text-sm text-[#1b1c1a]">
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
                <p className="text-sm font-medium text-[#1b1c1a]">Total</p>
                <p className="text-sm font-medium text-[#1b1c1a]">{formattedTotal}</p>
              </div>

              <Button
                variant="primary"
                className="!w-full !bg-[#fe932c] !text-[#ffffff] !rounded-[0.25rem] !font-semibold !tracking-[0.05em] !text-xs !uppercase hover:!bg-[#904d00] !shadow-[0_4px_15px_rgba(51,69,55,0.06)]"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </Button>

              <Link to="/catalog" className="text-center">
                <p className="text-sm text-[#737872] hover:text-[#334537] transition-colors">
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