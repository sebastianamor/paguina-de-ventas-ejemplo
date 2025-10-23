import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import './header.css';

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
          <h1>🛒 Tienda Online</h1>
        </Link>
        <div className="user-info">
          {user ? (
            <>
              <Link to="/cart" className="cart-link">
                🛒 Carrito
              </Link>
              <span>Hola, {user?.name}</span>
              <button onClick={logout} className="logout-btn">Cerrar Sesión</button>
            </>
          ) : (
            <div className="auth-links">
              <Link to="/cart" className="cart-link">
                🛒 Carrito
              </Link>
              <Link to="/login" className="auth-link">Iniciar Sesión</Link>
              <Link to="/register" className="auth-link">Registrarse</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;