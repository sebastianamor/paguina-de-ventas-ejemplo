import React from 'react';
import './order-card.css';
function OrderCard({ order }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#e67e22';
      case 'completed': return '#27ae60';
      case 'cancelled': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'completed': return 'Completado';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  return (
    <div className="order-card">
      <div className={`order-card ${order.status}`}>
      <div className="order-header">
        <h3>Pedido #{order.id}</h3>
        <span 
          className="status-badge"
          style={{ backgroundColor: getStatusColor(order.status) }}
        >
          {getStatusText(order.status)}
        </span>
      </div>
      <div className="order-details">
        <p><strong>Producto:</strong> {order.product}</p>
        <p><strong>Fecha:</strong> {order.date}</p>
        {order.amount && <p><strong>Monto:</strong> ${order.amount}</p>}
        {order.user && <p><strong>Usuario:</strong> {order.user}</p>}
      </div>
    </div>
    </div>
  );
}

export default OrderCard;