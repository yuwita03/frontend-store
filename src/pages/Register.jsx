import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/api'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

function Register() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
  })
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
      await api.post('/users', form)
      navigate('/login')
    } catch (err) {
      setError(
  err.response?.data?.message ||
  err.response?.data?.errors ||
  'Registration failed'
)
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
            Create account
          </h1>
          <p className="font-body text-sm text-shade-50 mt-2">
            Join us and start shopping today
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
            label="Full Name"
            name="name"
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
          />

          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
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
            {loading ? 'Creating account...' : 'Create account'}
          </Button>

        </form>

        {/* Footer */}
        <p className="font-body text-sm text-shade-50 mt-6 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-canvas-night font-medium hover:underline">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Register