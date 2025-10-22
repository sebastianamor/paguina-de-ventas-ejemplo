import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      alert('Por favor inicia sesión para proceder al checkout');
      navigate('/login');
      return;
    }

    alert(`¡Compra realizada por $${getCartTotal()}! Gracias por tu compra.`);
    clearCart();
    navigate('/orders');
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <h1>🛒 Carrito de Compras</h1>
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Tu carrito está vacío</h2>
          <p>Agrega algunos productos increíbles</p>
          <button onClick={() => navigate('/products')} className="continue-shopping-btn">
            Continuar Comprando
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>🛒 Carrito de Compras</h1>
      
      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <div className="item-image">{item.image}</div>
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="item-description">{item.description}</p>
                <p className="item-price">${item.price} c/u</p>
              </div>
              <div className="item-controls">
                <div className="quantity-controls">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
                <div className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="remove-btn"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Resumen del Pedido</h3>
          <div className="summary-details">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Envío:</span>
              <span>Gratis</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
          </div>
          <button onClick={handleCheckout} className="checkout-btn">
            Proceder al Pago
          </button>
          <button onClick={clearCart} className="clear-cart-btn">
            Vaciar Carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;