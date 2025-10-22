import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { user } = useAuth();
  const [userOrders, setUserOrders] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0
  });

  useEffect(() => {
    // Simular datos del usuario
    const orders = [
      { id: 1, product: 'Producto A', status: 'pending', date: '2024-01-15' },
      { id: 2, product: 'Producto B', status: 'completed', date: '2024-01-10' },
      { id: 3, product: 'Producto C', status: 'pending', date: '2024-01-12' }
    ];
    
    setUserOrders(orders);
    setStats({
      totalOrders: orders.length,
      pendingOrders: orders.filter(order => order.status === 'pending').length,
      completedOrders: orders.filter(order => order.status === 'completed').length
    });
  }, []);

  return (
    <div className="dashboard">
      <h1>Bienvenido, {user?.name}</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Pedidos</h3>
          <p className="stat-number">{stats.totalOrders}</p>
        </div>
        <div className="stat-card">
          <h3>Pendientes</h3>
          <p className="stat-number">{stats.pendingOrders}</p>
        </div>
        <div className="stat-card">
          <h3>Completados</h3>
          <p className="stat-number">{stats.completedOrders}</p>
        </div>
      </div>

      <div className="recent-orders">
        <h2>Pedidos Recientes</h2>
        {userOrders.map(order => (
          <div key={order.id} className="order-item">
            <span>{order.product}</span>
            <span className={`status ${order.status}`}>
              {order.status === 'pending' ? 'Pendiente' : 'Completado'}
            </span>
            <span>{order.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;