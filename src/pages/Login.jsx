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
      login(res.data.data)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4 antialiased text-stone-800">
      <div className="w-full max-w-md bg-white border border-stone-200 p-8 rounded-2xl shadow-xs">

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-stone-900 tracking-tight">
            Welcome back
          </h1>
          <p className="font-mono text-xs text-stone-400 uppercase tracking-wider mt-2">
            Sign in to your account to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <Input
            label="Username"
            name="username"
            type="text"
            placeholder="yourname"
            value={form.username}
            onChange={handleChange}
            className="font-mono text-sm"
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            className="font-mono text-sm"
          />

          {error && (
            <p className="font-mono text-xs text-rose-600 font-bold uppercase tracking-wide bg-rose-50 p-3 rounded-lg border border-rose-100">
              {error}
            </p>
          )}

          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            className="w-full mt-2 bg-stone-950 text-white hover:bg-stone-800 text-xs font-mono font-bold py-3 rounded-lg transition-colors shadow-xs disabled:opacity-40"
          >
            {loading ? 'SIGNING IN...' : 'SIGN IN'}
          </Button>

        </form>

        {/* Footer */}
        <p className="font-mono text-xs text-stone-400 mt-8 text-center uppercase tracking-wider">
          Don't have an account?{' '}
          <Link to="/register" className="text-stone-900 font-bold hover:underline ml-1">
            Register
          </Link>
        </p>
      {/* Demo Login Button */}
      <div className=' flex gap-5'>
      <button
        type="button"
        onClick={() => {
          setForm({ username: 'pelanggan', password: 'pelanggan123' })
        }}
        className="w-full border border-dashed border-stone-300 text-stone-500 hover:border-stone-400 hover:text-stone-700 text-xs font-mono uppercase tracking-wider py-3 rounded-lg transition-colors"
        >
        Try Demo as Pelanggan
      </button>
      <button
        type="button"
        onClick={() => {
          setForm({ username: 'admin', password: 'admin123' })
        }}
        className="w-full border border-dashed border-stone-300 text-stone-500 hover:border-stone-400 hover:text-stone-700 text-xs font-mono uppercase tracking-wider py-3 rounded-lg transition-colors"
        >
        Try Demo as Admin
      </button>
      </div>
      </div>
    </div>
  )
}

export default Login