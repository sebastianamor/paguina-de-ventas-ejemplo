import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/products/ProductCard';
import './products.css';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error cargando productos:', err));
  }, []);

  return (
    <div className="products-container">
      <h2>Productos</h2>

      {products.length === 0 ? (
        <p>No hay productos</p>
      ) : (
        <div className="products-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;

