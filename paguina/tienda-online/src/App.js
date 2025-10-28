import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Header from "./components/common/Header";
import Sidebar from "./components/common/Sidebar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail"; // 🆕 Página individual del producto
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import About from "./pages/About"; // 🆕 Página "Quiénes Somos"
import Footer from "./components/common/Footer";
import "./App.css";

// === RUTA PROTEGIDA ===
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

 // === LAYOUT PRINCIPAL ===
function AppLayout() {
  return (
    <div className="app">
      <Header /> {/* 🔍 Contiene la búsqueda y categorías */}
      <div className="app-body">
        <Sidebar />
        <main className="main-content">
          <Outlet /> {/* Aquí se renderizan las páginas hijas */}
        </main>
      </div>
      <Footer /> {/* 👈 Lo movemos AQUÍ, fuera del body */}
    </div>
  );
}


// === CONTENIDO PRINCIPAL ===
function AppContent() {
  const { user, loading } = useAuth();

  if (loading) return <div className="loading">Cargando...</div>;

  return (
    <Router>
      <Routes>
        {/* === RUTAS PÚBLICAS SIN LAYOUT === */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* === RUTAS CON LAYOUT === */}
        <Route element={<AppLayout />}>
          {/* === RUTAS PÚBLICAS === */}
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} /> {/* 🆕 */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} /> {/* 🆕 */}

          {/* === RUTAS PROTEGIDAS === */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                {user?.role === "admin" ? (
                  <AdminDashboard />
                ) : (
                  <Dashboard />
                )}
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* === RUTA POR DEFECTO === */}
          <Route path="/" element={<Navigate to="/products" />} />
        </Route>

        {/* === RUTA NO ENCONTRADA === */}
        <Route path="*" element={<Navigate to="/products" />} />
      </Routes>
    </Router>
  );
}

// === APP PRINCIPAL ===
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
