// components/common/Sidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/products', label: 'Productos' },
    { path: '/orders', label: 'Mis Pedidos' },
    { path: '/profile', label: 'Perfil' }
  ];

  return (
    <aside className="sidebar">
      <nav>
        <ul>
          {menuItems.map(item => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={location.pathname === item.path ? 'active' : ''}
              >
                {item.label}
              </Link>
            </li>
          ))}
          {user?.role === 'admin' && (
            <li>
              <Link 
                to="/admin" 
                className={location.pathname === '/admin' ? 'active' : ''}
              >
                Administración
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;