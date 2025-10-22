import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function Products() {
  const { user } = useAuth();
  const { addToCart, getCartItemsCount } = useCart();

  const products = [
    { id: 1, name: 'Laptop Gaming', price: 1200, description: 'Laptop para gaming de alta performance', image: '💻' },
    { id: 2, name: 'Smartphone', price: 800, description: 'Teléfono inteligente última generación', image: '📱' },
    { id: 3, name: 'Tablet', price: 500, description: 'Tablet perfecta para trabajo y entretenimiento', image: '📟' },
  ];

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`¡${product.name} agregado al carrito!`);
  };

  return (
    <div className="products-page">
      <div className="products-hero">
        <h1>Nuestros Productos</h1>
        <p>Descubre la mejor tecnología al mejor precio</p>
        
        {/* ESTE BOTÓN SIEMPRE SE VE SI NO ESTÁS LOGUEADO */}
        {!user && (
          <div className="hero-actions">
            <p>💡 <strong>Inicia sesión</strong> para acceder a tu dashboard personal</p>
            <Link to="/login" className="hero-login-btn">
              🚀 Iniciar Sesión
            </Link>
          </div>
        )}
      </div>
      
      {/* Resto del código... */}
    </div>
  );
}

export default Products;