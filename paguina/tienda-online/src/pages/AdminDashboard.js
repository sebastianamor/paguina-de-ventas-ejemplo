import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

function AdminDashboard() {
  const { user } = useAuth();
  const [allOrders, setAllOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [adminStats, setAdminStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    pendingOrders: 0,
    revenue: 0
  });

  useEffect(() => {
    // Simular datos del administrador
    const orders = [
      { id: 1, user: 'Usuario 1', product: 'Producto A', status: 'pending', amount: 100 },
      { id: 2, user: 'Usuario 2', product: 'Producto B', status: 'completed', amount: 150 },
      { id: 3, user: 'Usuario 1', product: 'Producto C', status: 'pending', amount: 200 }
    ];
    
    const userList = [
      { id: 1, name: 'Usuario 1', email: 'user1@example.com', joinDate: '2024-01-01' },
      { id: 2, name: 'Usuario 2', email: 'user2@example.com', joinDate: '2024-01-05' }
    ];

    setAllOrders(orders);
    setUsers(userList);
    setAdminStats({
      totalUsers: userList.length,
      totalOrders: orders.length,
      pendingOrders: orders.filter(order => order.status === 'pending').length,
      revenue: orders.filter(order => order.status === 'completed')
                   .reduce((sum, order) => sum + order.amount, 0)
    });
  }, []);

  const updateOrderStatus = (orderId, newStatus) => {
    setAllOrders(orders => 
      orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="admin-dashboard">
      <h1>Panel de Administración</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Usuarios</h3>
          <p className="stat-number">{adminStats.totalUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Total Pedidos</h3>
          <p className="stat-number">{adminStats.totalOrders}</p>
        </div>
        <div className="stat-card">
          <h3>Pedidos Pendientes</h3>
          <p className="stat-number">{adminStats.pendingOrders}</p>
        </div>
        <div className="stat-card">
          <h3>Ingresos</h3>
          <p className="stat-number">${adminStats.revenue}</p>
        </div>
      </div>

      <div className="admin-sections">
        <div className="section">
          <h2>Todos los Pedidos</h2>
          {allOrders.map(order => (
            <div key={order.id} className="order-item admin-order">
              <div>
                <strong>{order.product}</strong>
                <p>Usuario: {order.user}</p>
                <p>Monto: ${order.amount}</p>
              </div>
              <div className="order-actions">
                <select 
                  value={order.status} 
                  onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                >
                  <option value="pending">Pendiente</option>
                  <option value="completed">Completado</option>
                  <option value="cancelled">Cancelado</option>
                </select>
              </div>
            </div>
          ))}
        </div>

        <div className="section">
          <h2>Usuarios Registrados</h2>
          {users.map(user => (
            <div key={user.id} className="user-item">
              <strong>{user.name}</strong>
              <p>{user.email}</p>
              <small>Se unió: {user.joinDate}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;