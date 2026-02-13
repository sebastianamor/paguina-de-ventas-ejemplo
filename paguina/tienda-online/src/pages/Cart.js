import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './cart.css';

const Cart = () => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getTotal,
    getItemCount 
  } = useCart();
  
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('El carrito está vacío');
      return;
    }
    // Aquí puedes redirigir a una página de checkout o procesar la orden
    alert('Procesando orden...');
    // navigate('/checkout'); // Si tienes una página de checkout
  };

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Tu carrito está vacío</h2>
        <p>¡Agrega algunos productos para comenzar!</p>
        <button onClick={() => navigate('/products')} className="btn-continue">
          Ver Productos
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Carrito de Compras</h1>
        <span className="cart-count">{getItemCount()} artículos</span>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img 
                src={item.image} 
                alt={item.name} 
                className="cart-item-image"
              />
              
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p className="cart-item-description">{item.description}</p>
                <p className="cart-item-price">${item.price.toFixed(2)}</p>
              </div>

              <div className="cart-item-actions">
                <div className="quantity-controls">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="qty-btn"
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>

                <p className="item-subtotal">
                  Subtotal: ${(item.price * item.quantity).toFixed(2)}
                </p>

                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="btn-remove"
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Resumen del Pedido</h2>
          
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${getTotal().toFixed(2)}</span>
          </div>
          
          <div className="summary-row">
            <span>Envío:</span>
            <span>Gratis</span>
          </div>
          
          <div className="summary-row total">
            <strong>Total:</strong>
            <strong>${getTotal().toFixed(2)}</strong>
          </div>

          <button onClick={handleCheckout} className="btn-checkout">
            Proceder al Pago
          </button>

          <button onClick={clearCart} className="btn-clear">
            Vaciar Carrito
          </button>

          <button 
            onClick={() => navigate('/products')} 
            className="btn-continue-shopping"
          >
            ← Continuar Comprando
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;