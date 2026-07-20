import { create } from 'zustand'

const useAuthStore = create((set) => {
  // Ambil data user lama dari localStorage jika ada
  const savedUser = localStorage.getItem('user')
  
  return {
    user: savedUser ? JSON.parse(savedUser) : null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),

    login: (data) => {
      
      const userData = {
        username: data.username,
        name: data.name,
        email: data.email,
        role: data.role,
      }

      // Simpan keduanya ke localStorage
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(userData))
      
      set({
        user: userData,
        token: data.token,
        isAuthenticated: true,
      })
    },

    logout: () => {
      localStorage.removeItem('token')
      localStorage.removeItem('user') // Ikut dihapus saat logout
      set({
        user: null,
        token: null,
        isAuthenticated: false,
      })
    },
  }
})

export default useAuthStore
