import { Navigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'

function ProtectedRoute({ children, adminOnly = false }) {
  // Panggil langsung destructuring objeknya, cara ini paling aman dari eror selector
  const { isAuthenticated, user } = useAuthStore()

  console.log('--- PROTECTED ROUTE CHECK ---')
  console.log('Is Authenticated:', isAuthenticated)
  console.log('User Data:', user)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (adminOnly) {
    if (!user || user.role?.toUpperCase() !== 'ADMIN') {
      console.warn('Akses ditolak! Anda bukan ADMIN.')
      return <Navigate to="/" replace />
    }
  }

  return children
}

export default ProtectedRoute
