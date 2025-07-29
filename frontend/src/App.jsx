import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/UserNavbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Login from './pages/client/Login';
import Register from './pages/client/Register';
import Dashboard from './pages/client/Dashboard';
import Shop from './pages/client/Shop';
import Cart from './pages/client/Cart';
import Orders from './pages/client/Orders';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminFlowers from './pages/admin/AdminFlowers';
import AdminOrders from './pages/admin/AdminOrders';
import ProtectedRoute from './components/common/ProtectedRoute';
import Unauthorized from './pages/client/Unauthorized';
import ShippingAddress from './pages/client/ShippingAddress';
import Checkout from './pages/client/CheckOut';

function App() {
  return (
    <>
        <Router>
          <div className="min-h-screen bg-gradient-pink">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/shipping-address" element={<ShippingAddress />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                
                {/* User Protected Routes */}
                <Route path="/dashboard" element={
                  // <ProtectedRoute>
                    <Dashboard />
                  // </ProtectedRoute>
                } />
                <Route path="/cart" element={
                  // <ProtectedRoute>
                    <Cart />
                  // </ProtectedRoute>
                } />
                <Route path="/orders" element={
                  // <ProtectedRoute>
                    <Orders />
                  // </ProtectedRoute>
                } />
                
                {/* Admin Protected Routes */}
                <Route path="/admin" element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin/flowers" element={
                  <ProtectedRoute>
                    <AdminFlowers />
                  </ProtectedRoute>
                } />
                <Route path="/admin/orders" element={
                  <ProtectedRoute>
                    <AdminOrders />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
    </>
  );
}

export default App;