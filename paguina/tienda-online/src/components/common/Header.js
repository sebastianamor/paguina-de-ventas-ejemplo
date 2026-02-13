import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext'; // ← IMPORTAR useCart
import { Link, useNavigate } from 'react-router-dom';
import './header.css';

function Header() {
  const { user, logout } = useAuth();
  const { getItemCount } = useCart(); // ← OBTENER cantidad de items
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const cartCount = getItemCount(); // ← Calcular cantidad

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search)}`);
      setSearch('');
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* 🔷 LOGO */}
        <Link to="/" className="logo-link">
          <h1>🛒 Tienda Online</h1>
        </Link>

        {/* 🔍 BARRA DE BÚSQUEDA */}
        <form onSubmit={handleSearch} className="search-bar">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">🔍</button>
        </form>

        {/* 👤 INFORMACIÓN DEL USUARIO */}
        <div className="user-info">
          {user ? (
            <>
              <Link to="/cart" className="cart-link">
                🛒 Carrito
                {cartCount > 0 && ( // ← MOSTRAR BADGE solo si hay items
                  <span className="cart-badge">{cartCount}</span>
                )}
              </Link>
              <span className="user-name">Hola, {user?.name}</span>
              <button onClick={logout} className="logout-btn">Cerrar Sesión</button>
            </>
          ) : (
            <div className="auth-links">
              <Link to="/cart" className="cart-link">
                🛒 Carrito
                {cartCount > 0 && ( // ← MOSTRAR BADGE también para no logueados
                  <span className="cart-badge">{cartCount}</span>
                )}
              </Link>
              <Link to="/login" className="auth-link">Iniciar Sesión</Link>
              <Link to="/register" className="auth-link">Registrarse</Link>
            </div>
          )}
        </div>
      </div>

      {/* 🧭 BARRA DE CATEGORÍAS */}
      <nav className="categories-nav">
        <Link to="/products">Todos</Link>
        <Link to="/products?cat=ropa">Ropa</Link>
        <Link to="/products?cat=electronica">Electrónica</Link>
        <Link to="/products?cat=hogar">Hogar</Link>
        <Link to="/about">Quiénes Somos</Link>
      </nav>
    </header>
  );
}

export default Header;