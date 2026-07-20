import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/api'

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
    <div className="min-h-screen bg-[#faf9f5] flex items-center justify-center px-4 font-['Hanken_Grotesk']">
      <div className="w-full max-w-md">

        <div className="mb-8">
          <h1 className="font-['Libre_Caslon_Text'] text-3xl font-semibold text-[#1b1c1a]">
            Create account
          </h1>
          <p className="text-sm text-[#737872] mt-2">
            Join us and start shopping today
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <div>
            <label className="text-sm font-medium text-[#434843] block mb-1.5">Username</label>
            <input
              name="username"
              type="text"
              placeholder="yourname"
              value={form.username}
              onChange={handleChange}
              className="w-full text-sm px-4 py-3 rounded-[0.25rem] bg-[#faf9f5] text-[#1b1c1a] placeholder:text-[#c3c8c1] outline-none border border-[#c3c8c1] focus:border-[#334537] transition-colors"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[#434843] block mb-1.5">Full Name</label>
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full text-sm px-4 py-3 rounded-[0.25rem] bg-[#faf9f5] text-[#1b1c1a] placeholder:text-[#c3c8c1] outline-none border border-[#c3c8c1] focus:border-[#334537] transition-colors"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[#434843] block mb-1.5">Email</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className="w-full text-sm px-4 py-3 rounded-[0.25rem] bg-[#faf9f5] text-[#1b1c1a] placeholder:text-[#c3c8c1] outline-none border border-[#c3c8c1] focus:border-[#334537] transition-colors"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[#434843] block mb-1.5">Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="w-full text-sm px-4 py-3 rounded-[0.25rem] bg-[#faf9f5] text-[#1b1c1a] placeholder:text-[#c3c8c1] outline-none border border-[#c3c8c1] focus:border-[#334537] transition-colors"
            />
          </div>

          {error && (
            <p className="text-xs font-semibold tracking-[0.05em] text-[#ba1a1a] uppercase bg-[#ffdad6] p-3 rounded-[0.25rem]">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#334537] hover:bg-[#4a5d4e] text-[#ffffff] text-xs font-semibold tracking-[0.05em] py-3.5 rounded-[0.25rem] uppercase transition-colors disabled:opacity-40 shadow-[0_4px_15px_rgba(51,69,55,0.06)]"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>

        </form>

        <p className="text-sm text-[#737872] mt-8 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-[#334537] font-medium hover:text-[#4a5d4e]">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Register