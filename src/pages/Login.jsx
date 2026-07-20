import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/api'
import useAuthStore from '../store/authStore'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

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
    <div className="min-h-screen bg-[#faf9f5] flex items-center justify-center px-4 font-['Hanken_Grotesk'] text-[#1b1c1a]">
      <div className="w-full max-w-md bg-[#ffffff] p-8 rounded-[0.5rem] shadow-[0_4px_15px_rgba(51,69,55,0.06)]">

        <div className="mb-8">
          <h1 className="font-['Libre_Caslon_Text'] text-3xl font-semibold text-[#1b1c1a]">
            Welcome back
          </h1>
          <p className="font-['Hanken_Grotesk'] text-xs font-semibold tracking-[0.05em] text-[#737872] uppercase mt-2">
            Sign in to your account to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <div>
            <label className="font-['Hanken_Grotesk'] text-sm font-medium text-[#434843] block mb-1.5">Username</label>
            <input
              name="username"
              type="text"
              placeholder="yourname"
              value={form.username}
              onChange={handleChange}
              className="w-full font-['Hanken_Grotesk'] text-sm px-4 py-3 rounded-[0.25rem] bg-[#faf9f5] text-[#1b1c1a] placeholder:text-[#c3c8c1] outline-none border border-[#c3c8c1] focus:border-[#334537] transition-colors"
            />
          </div>

          <div>
            <label className="font-['Hanken_Grotesk'] text-sm font-medium text-[#434843] block mb-1.5">Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="w-full font-['Hanken_Grotesk'] text-sm px-4 py-3 rounded-[0.25rem] bg-[#faf9f5] text-[#1b1c1a] placeholder:text-[#c3c8c1] outline-none border border-[#c3c8c1] focus:border-[#334537] transition-colors"
            />
          </div>

          {error && (
            <p className="font-['Hanken_Grotesk'] text-xs font-semibold tracking-[0.05em] text-[#ba1a1a] uppercase bg-[#ffdad6] p-3 rounded-[0.25rem]">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#334537] hover:bg-[#4a5d4e] text-[#ffffff] font-['Hanken_Grotesk'] text-xs font-semibold tracking-[0.05em] py-3.5 rounded-[0.25rem] uppercase transition-colors disabled:opacity-40 shadow-[0_4px_15px_rgba(51,69,55,0.06)]"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

        </form>

        <p className="font-['Hanken_Grotesk'] text-xs font-semibold tracking-[0.05em] text-[#737872] mt-8 text-center uppercase">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#334537] hover:text-[#4a5d4e] ml-1">
            Register
          </Link>
        </p>

      <div className="flex gap-3 mt-6">
        <button
          type="button"
          onClick={() => setForm({ username: 'pelanggan', password: 'pelanggan123' })}
          className="w-full border border-dashed border-[#c3c8c1] text-[#737872] hover:border-[#334537] hover:text-[#334537] text-xs font-['Hanken_Grotesk'] font-semibold tracking-[0.05em] uppercase py-3 rounded-[0.25rem] transition-colors"
        >
          Demo as Pelanggan
        </button>
        <button
          type="button"
          onClick={() => setForm({ username: 'admin', password: 'admin123' })}
          className="w-full border border-dashed border-[#c3c8c1] text-[#737872] hover:border-[#334537] hover:text-[#334537] text-xs font-['Hanken_Grotesk'] font-semibold tracking-[0.05em] uppercase py-3 rounded-[0.25rem] transition-colors"
        >
          Demo as Admin
        </button>
      </div>

      </div>
    </div>
  )
}

export default Login