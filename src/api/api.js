import axios from 'axios'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`
})

// Automatically attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {ls
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  console.log("API ERROR:", error.response?.data || error.message)
  return Promise.reject(error)
})

export default api