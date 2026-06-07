import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import AdminLayout from './components/admin/AdminLayout'
import ProtectedRoute from './router/ProtectedRoute'

import Home from './pages/Home'
import Catalog from './pages/Catalog'
import ProductDetail from './pages/ProductDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import Checkout from './pages/Checkout'
import Cart from './pages/Cart'
import OrderDetail from './pages/OrderDetail'
import Orders from './pages/Orders'
import AdminProducts from './pages/admin/Products'
import AdminOrders from './pages/admin/Orders'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public & User Protected Route */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/cart" element={
            <ProtectedRoute><Cart /></ProtectedRoute>
          } />
          <Route path="/checkout" element={
            <ProtectedRoute><Checkout /></ProtectedRoute>
          } />
          <Route path="/orders" element={
            <ProtectedRoute><Orders /></ProtectedRoute>
          } />
          <Route path="/orders/:id" element={
            <ProtectedRoute><OrderDetail /></ProtectedRoute>
          } />
        </Route>

        {/* Admin Route */}
        <Route path="/admin" element={
          <ProtectedRoute adminOnly={true}>
            <AdminLayout />
          </ProtectedRoute>
        }>
          {/* Tambahkan index route agar /admin tidak blank */}
          <Route index element={<AdminProducts />} /> 
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
