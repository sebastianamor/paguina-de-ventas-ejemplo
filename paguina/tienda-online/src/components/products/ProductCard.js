  import { Link } from "react-router-dom";
import React from 'react';
import Productscar from '../../pages/Products';
import './productcard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-link">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />

        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.description}</p>
          <p className="product-price">${product.price}</p>
        </div>
      </Link>

      <button className="add-to-cart-btn">Comprar</button>
    </div>
  );
};

export default ProductCard;

