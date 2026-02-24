import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./product-card.css";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart(product);
    setIsAdding(true);
    
    setTimeout(() => {
      setIsAdding(false);
    }, 1500);
  };

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="product-image-wrapper">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image" 
        />
        {product.stock < 5 && product.stock > 0 && (
          <span className="stock-badge low">Pocas unidades</span>
        )}
        {product.stock === 0 && (
          <span className="stock-badge out">Agotado</span>
        )}
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">
          {product.description?.length > 80 
            ? `${product.description.substring(0, 80)}...` 
            : product.description}
        </p>
        
        <div className="product-footer">
          <p className="product-price">${product.price.toFixed(2)}</p>
          
          <button
            className={`add-to-cart-btn ${isAdding ? 'added' : ''}`}
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            {isAdding ? (
              <>✓ Agregado</>
            ) : product.stock === 0 ? (
              <>Agotado</>
            ) : (
              <>🛒 Agregar</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;