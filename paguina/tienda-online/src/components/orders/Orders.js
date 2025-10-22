import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import OrderCard from '../components/orders/OrderCard';

function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Simular datos de pedidos
    const userOrders = [
      { id: 1, product: 'Producto A', status: 'pending', date: '2024-01-15', amount: 100 },
      { id: 2, product: 'Producto B', status: 'completed', date: '2024-01-10', amount: 150 },
      { id: 3, product: 'Producto C', status: 'pending', date: '2024-01-12', amount: 200 }
    ];
    setOrders(userOrders);
  }, []);

  return (
    <div className="orders-page">
      <h1>Mis Pedidos</h1>
      <div className="orders-list">
        {orders.map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;