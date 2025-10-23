import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import './App.css';

// Componente para rutas protegidas (requieren login)
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  // Si no hay usuario, redirige a login. Si hay, renderiza los hijos.
  return user ? children : <Navigate to="/login" />;
}

// Componente para layout con Header y Sidebar
// Este layout ahora actúa como el "padre" de las rutas que lo necesitan
function AppLayout() {
  return (
    <div className="app">
      <Header />
      <div className="app-body">
        <Sidebar />
        <main className="main-content">
          {/* El <Outlet /> renderiza el componente de la ruta hija (Products, Dashboard, etc.) */}
          <Outlet /> 
        </main>
      </div>
    </div>
  );
}

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <Router>
      <Routes>
        
        {/* Rutas PÚBLICAS sin Layout (Login/Register) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        
        {/*           * Ruta Layout Padre: Envolvemos todas las rutas que necesitan Header y Sidebar. 
          * Utilizamos el componente AppLayout como elemento padre.
          */}
        <Route element={<AppLayout />}>
          
          {/* Rutas PÚBLICAS CON Layout (Products, Cart) */}
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />

          {/*             * Rutas PROTEGIDAS CON Layout 
            * Usamos ProtectedRoute como wrapper directo del componente.
            * Ya NO necesitamos envolver con AppLayout aquí, porque AppLayout es el PADRE.
            */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              {user?.role === 'admin' ? <AdminDashboard /> : <Dashboard />}
            </ProtectedRoute>
          } />
          
          <Route path="/orders" element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
        
          {/* Ruta de inicio por defecto (dentro del Layout) */}
          <Route path="/" element={<Navigate to="/products" />} />
        </Route>

        {/* Manejo de ruta no encontrada (redirige fuera del Layout) */}
        <Route path="*" element={<Navigate to="/products" />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;    