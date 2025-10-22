// components/common/Header.js
import React from 'react';
import { useAuth } from '../../context/AuthContext';

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-content">
        <h1>Tienda Online</h1>
        <div className="user-info">
          <span>Hola, {user?.name}</span>
          <button onClick={logout} className="logout-btn">Cerrar Sesión</button>
        </div>
      </div>
    </header>
  );
}

export default Header;