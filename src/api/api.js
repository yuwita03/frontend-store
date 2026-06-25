

import axios from 'axios'

// Ganti yang lama dengan yang baru ini:
const api = axios.create({
  baseURL: 'https://saas-ecommerce-production-28b4.up.railway.app/api'
  // baseURL: 'http://localhost:3000/api'
  
  // baseURL: 'https://saas-ecommerce-production-28b4.up.railway.app/api'
  
})

// Automatically attach token to every request
api.interceptors.request.use((config) => {
  const authData = localStorage.getItem('auth-store')
  if (authData) {
    const parsed = JSON.parse(authData)
    const token = parsed?.state?.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

export default api