import React from 'react';
import './product-card.css';

function ProductCard({ product }) {
  if (!product) return null;

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <span>${product.price}</span>
    </div>
  );
}

export default ProductCard;

