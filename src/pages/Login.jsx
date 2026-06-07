import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/api'
import useAuthStore from '../store/authStore'
import Button from '../components/ui/Button'
import Input from '../components/UI/Input'

function Login() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)

  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
const handleSubmit = async (e) => {
  e.preventDefault()
  setError('')
  setLoading(true)

  try {
    const res = await api.post('/users/login', form)
    console.log('res.data:', res.data) // ✅ taruh di sini dulu
    login(res.data.data)
    navigate('/')
  } catch (err) {
    setError(err.response?.data?.message || 'Login failed')
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="min-h-screen bg-canvas-cream flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-medium text-canvas-night">
            Welcome back
          </h1>
          <p className="font-body text-sm text-shade-50 mt-2">
            Sign in to your account to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <Input
            label="Username"
            name="username"
            type="text"
            placeholder="yourname"
            value={form.username}
            onChange={handleChange}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
          />

          {error && (
            <p className="font-body text-sm text-red-500">{error}</p>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full mt-2"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>

        </form>

        {/* Footer */}
        <p className="font-body text-sm text-shade-50 mt-6 text-center">
          Don't have an account?{' '}
          <Link to="/register" className="text-canvas-night font-medium hover:underline">
            Register
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Login