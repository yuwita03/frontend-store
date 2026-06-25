import { create } from 'zustand'
import { persist } from 'zustand/middleware' // 1. Import middleware persist

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (data) => {
        console.log('LOGIN CALLED', data)
        
        const userData = {
          username: data.username,
          name: data.name,
          email: data.email,
          role: data.role,
        }

        set({
          user: userData,
          token: data.token,
          isAuthenticated: true,
        })
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })
      },
    }),
    {
      name: 'auth-store'
    }
  )
)

export default useAuthStore