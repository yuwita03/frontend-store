

import axios from 'axios'

// Ganti yang lama dengan yang baru ini:
const api = axios.create({
  baseURL: 'https://saas-ecommerce-production-28b4.up.railway.app/api'
  // baseURL: 'http://localhost:3000/api'
  
  // baseURL: 'https://saas-ecommerce-production-28b4.up.railway.app/api'
  
})

// Automatically attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  console.log("API ERROR:", error.response?.data || error.message) // ✅ ganti err → error
  return Promise.reject(error) // ✅
})

export default api