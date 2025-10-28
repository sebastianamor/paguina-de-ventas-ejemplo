import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';

function Header() {
  const { user, logout } = useAuth();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      // Redirige a la página de productos con el término de búsqueda
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
              <Link to="/cart" className="cart-link">🛒 Carrito</Link>
              <span className="user-name">Hola, {user?.name}</span>
              <button onClick={logout} className="logout-btn">Cerrar Sesión</button>
            </>
          ) : (
            <div className="auth-links">
              <Link to="/cart" className="cart-link">🛒 Carrito</Link>
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
