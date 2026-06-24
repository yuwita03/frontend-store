import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Plus } from 'lucide-react'
import api from '../api/api'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

function Checkout() {
  const navigate = useNavigate()

  const [cart, setCart] = useState([])
  const [addresses, setAddresses] = useState([])
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [loading, setLoading] = useState(true)
  const [placing, setPlacing] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
    // Fix state
    const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    province: '',
    postalCode: '',
    isDefault: false,
    })
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cartRes, addressRes] = await Promise.all([
        api.get('/cart'),
        api.get('/addresses'),
        ])
        setCart(cartRes.data.data?.items || [])  // ← fix this line
        const addrs = addressRes.data.data || []
        setAddresses(addrs)
        // Auto select default address
        const defaultAddr = addrs.find(a => a.isDefault) || addrs[0]
        if (defaultAddr) setSelectedAddress(defaultAddr.id)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleAddAddress = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post('/addresses', newAddress)
      const created = res.data.data
      setAddresses(prev => [...prev, created])
      setSelectedAddress(created.id)
      setShowAddForm(false)
      setNewAddress({ name: '', phone: '', street: '', city: '', province: '', postalCode: '' })
    } catch (err) {
      console.error(err)
    }
  }

const handleCheckout = async () => {
  if (!selectedAddress) {
    alert('Please select a shipping address')
    return
  }
  setPlacing(true)
  try {
    // 1. Place order
    const orderRes = await api.post('/orders', {
      addressId: selectedAddress,
    })
    const order = orderRes.data.data

    // 2. Create Midtrans payment
    const paymentRes = await api.post(`/payment/${order.id}`)
    const paymentUrl = paymentRes.data.data?.redirectUrl
      || paymentRes.data.data?.payment_url
      || paymentRes.data.redirectUrl
      || paymentRes.data.payment_url

    // 3. Open Midtrans in new tab instead of replacing current page
    if (paymentUrl) {
      window.open(paymentUrl, '_blank')
    }

    // 4. Redirect user to order detail page
    navigate(`/orders/${order.id}`)

  } catch (err) {
    alert(err.response?.data?.message || 'Checkout failed')
  } finally {
    setPlacing(false)
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
        <p className="font-body text-shade-50">Loading checkout...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-canvas-cream">
      <div className="max-w-5xl mx-auto px-8 py-12">

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl font-medium text-canvas-night">
            Checkout
          </h1>
          <p className="font-body text-sm text-shade-50 mt-2">
            Review your order and select a shipping address
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left — Address */}
          <div className="flex-1 flex flex-col gap-6">

            <div className="bg-canvas-light border border-hairline-light rounded-lg p-6">
              <h2 className="font-display text-xl text-canvas-night mb-4">
                Shipping Address
              </h2>

              {/* Address List */}
              <div className="flex flex-col gap-3">
<div className="flex flex-col gap-3">
  {addresses.map(address => (
    <div
      key={address.id}
      onClick={() => setSelectedAddress(address.id)}
      className={`
        w-full text-left p-4 rounded-lg border-2 transition-colors cursor-pointer
        ${selectedAddress === address.id
          ? 'border-canvas-night bg-canvas-cream'
          : 'border-hairline-light hover:border-shade-40'}
      `}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <MapPin size={16} className="text-shade-50 mt-0.5 shrink-0" />
          <div>
            <p className="font-body text-sm font-medium text-canvas-night">
              {address.name}
              {address.isDefault && (
                <span className="ml-2 text-xs bg-aloe text-canvas-night px-2 py-0.5 rounded-pill">
                  Default
                </span>
              )}
            </p>
            <p className="font-body text-sm text-shade-50 mt-1">
              {address.phone} — {address.street}, {address.city}, {address.province} {address.postalCode}
            </p>
          </div>
        </div>

        {!address.isDefault && (
          <button
            onClick={async (e) => {
              e.stopPropagation()
              try {
                await api.patch(`/addresses/${address.id}/default`)
                const res = await api.get('/addresses')
                setAddresses(res.data.data || [])
              } catch (err) {
                console.error(err)
              }
            }}
            className="shrink-0 font-body text-xs text-shade-50 hover:text-canvas-night underline transition-colors"
          >
            Set default
          </button>
        )}
      </div>
    </div>
  ))}
</div>

                {/* Add new address */}
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="w-full text-left p-4 rounded-lg border-2 border-dashed border-hairline-light hover:border-shade-40 transition-colors flex items-center gap-2"
                >
                  <Plus size={16} className="text-shade-50" />
                  <p className="font-body text-sm text-shade-50">Add new address</p>
                </button>

                {/* New Address Form */}
                    {showAddForm && (
                    <form onSubmit={handleAddAddress} className="flex flex-col gap-3 p-4 bg-canvas-cream rounded-lg border border-hairline-light">
                        <Input
                        label="Full Name"
                        placeholder="Nekoyuu"
                        value={newAddress.name}
                        onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                        />
                        <Input
                        label="Phone Number"
                        placeholder="081234567890"
                        value={newAddress.phone}
                        onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                        />
                        <Input
                        label="Street"
                        placeholder="Jl. Merdeka No.1"
                        value={newAddress.street}
                        onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                        />
                        <div className="grid grid-cols-2 gap-3">
                        <Input
                            label="City"
                            placeholder="Jakarta"
                            value={newAddress.city}
                            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                        />
                        <Input
                            label="Province"
                            placeholder="DKI Jakarta"
                            value={newAddress.province}
                            onChange={(e) => setNewAddress({ ...newAddress, province: e.target.value })}
                        />
                        </div>
                        <Input
                        label="Postal Code"
                        placeholder="10110"
                        value={newAddress.postalCode}
                        onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                        />
                        <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="isDefault"
                            checked={newAddress.isDefault}
                            onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                        />
                        </div>
                        <div className="flex gap-2">
                        <Button type="submit" variant="primary" className="flex-1">
                            Save Address
                        </Button>
                        <Button
                            type="button"
                            variant="outline_light"
                            className="flex-1"
                            onClick={() => setShowAddForm(false)}
                        >
                            Cancel
                        </Button>
                        </div>
                    </form>
                    )}
              </div>
            </div>

          </div>

          {/* Right — Order Summary */}
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
                variant="aloe"
                className="w-full"
                onClick={handleCheckout}
              >
                {placing ? 'Placing Order...' : 'Place Order'}
              </Button>

              <p className="font-body text-xs text-shade-40 text-center">
                By placing your order you agree to our terms and conditions
              </p>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Checkout