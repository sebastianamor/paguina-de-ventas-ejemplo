import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./product-card.css";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-link">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.description}</p>
          <p className="product-price">${product.price}</p>
        </div>
      </Link>

      {/* BOTÓN CARRITO */}
      <button
        className="add-to-cart-btn"
        onClick={() => addToCart(product)}
      >
        🛒 Agregar al carrito
      </button>
    </div>
  );
};

export default ProductCard;
