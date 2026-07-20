import { Navigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'

function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthenticated, user } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  const isAdmin = user?.role?.toUpperCase() === 'ADMIN'

  if (adminOnly && !isAdmin) {
    console.warn('Akses ditolak! Bukan ADMIN.')
    return <Navigate to="/" replace />
  }
  if (!adminOnly && isAdmin) {
    return <Navigate to="/admin" replace />
  }

  return children
}
export default ProtectedRoute
