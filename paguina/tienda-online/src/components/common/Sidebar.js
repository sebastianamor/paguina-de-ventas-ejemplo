import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();

  // Si no hay usuario, no mostrar sidebar
  if (!user) {
    return null;
  }

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
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;