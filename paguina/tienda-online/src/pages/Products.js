import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import "./products.css"; // Asegúrate que el nombre coincida con tu archivo

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  // 🧠 Obtener productos desde JSON Server
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/products");
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error cargando productos:", err);
        setError("Error al cargar los productos");
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      quantity: 1
    });
    
    alert(`✅ ${product.name} añadido al carrito`);
  };

  if (loading) {
    return (
      <div className="products-loading">
        <h2>Cargando productos...</h2>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-error">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-btn">
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="products-page">
      <h1>Nuestros Productos</h1>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`} className="product-link">
              <img 
                src={product.image} 
                alt={product.name}
                className="product-image"
              />
            </Link>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">
                {product.description || "Producto de alta calidad con garantía."}
              </p>
              <div className="product-price">${product.price}</div>
              <button 
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(product)}
              >
                🛒 Añadir al Carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;