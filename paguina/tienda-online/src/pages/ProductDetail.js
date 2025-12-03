import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("🔄 Cargando producto ID:", id);
        
        // Verifica que la ID sea válida
        if (!id || isNaN(id)) {
          throw new Error("ID de producto inválido");
        }
        
        const res = await axios.get(`http://localhost:3000/products/${id}`);
        
        if (res.data) {
          console.log("✅ Producto encontrado:", res.data);
          setProduct(res.data);
        } else {
          console.log("❌ Producto no encontrado en API, usando fallback");
          setProduct({
            id: id,
            name: `Producto ${id}`,
            price: 99.99,
            image: "https://via.placeholder.com/600x600/6b7280/ffffff?text=Producto+" + id,
            description: `Descripción del producto ${id}. Producto de alta calidad con garantía.`,
            category: "general"
          });
        }
      } catch (err) {
        console.error("❌ Error al cargar producto:", err);
        setError(err.message);
        
        // Fallback si la API falla
        setProduct({
          id: id,
          name: `Producto ${id}`,
          price: 99.99,
          image: "https://via.placeholder.com/600x600/6b7280/ffffff?text=Producto+" + id,
          description: `Descripción del producto ${id}. Producto de alta calidad con garantía.`,
          category: "general"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
        quantity: quantity
      });
      alert(`✅ ${quantity} ${product.name} añadido al carrito`);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
        quantity: quantity
      });
      navigate("/cart");
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando producto...</p>
      </div>
    );
  }

  if (error && !product) {
    return (
      <div className="error-container">
        <h2>Error al cargar el producto</h2>
        <p>{error}</p>
        <div className="button-group">
          <button onClick={() => navigate("/products")} className="btn-primary">
            Volver a Productos
          </button>
          <button onClick={() => window.location.reload()} className="btn-secondary">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="error-container">
        <h2>Producto no encontrado</h2>
        <p>El producto que buscas no existe en nuestra base de datos.</p>
        <button onClick={() => navigate("/products")} className="btn-primary">
          Volver a Productos
        </button>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <nav className="breadcrumb">
        <span onClick={() => navigate("/")}>Inicio</span> &gt; 
        <span onClick={() => navigate("/products")}>Productos</span> &gt; 
        <span className="current">{product.name}</span>
      </nav>

      <div className="product-detail-container">
        <div className="product-gallery">
          <div className="main-image">
            <img src={product.image} alt={product.name} />
          </div>
        </div>

        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>
          
          <div className="product-rating">
            <span className="stars">★★★★★</span>
            <span className="rating-value">4.5/5</span>
            <span className="reviews">(124 reseñas)</span>
          </div>

          <div className="product-price">
            <span className="current-price">${product.price}</span>
            <span className="original-price">${(product.price * 1.2).toFixed(2)}</span>
            <span className="discount">20% OFF</span>
          </div>

          <p className="product-description">{product.description}</p>

          <div className="key-specs">
            <h3>Características principales:</h3>
            <ul>
              <li>✓ Calidad premium garantizada</li>
              <li>✓ Envío gratis disponible</li>
              <li>✓ Devolución en 30 días</li>
              <li>✓ Soporte técnico incluido</li>
            </ul>
          </div>

          <div className="quantity-selector">
            <label>Cantidad:</label>
            <div className="quantity-controls">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>
                +
              </button>
            </div>
            <span className="stock-info">En stock</span>
          </div>

          <div className="action-buttons">
            <button className="btn-add-to-cart" onClick={handleAddToCart}>
              🛒 Añadir al Carrito
            </button>
            <button className="btn-buy-now" onClick={handleBuyNow}>
              ⚡ Comprar Ahora
            </button>
          </div>

          <div className="shipping-info">
            <p>🚚 Envío gratis en pedidos superiores a $50</p>
            <p>↩️ Devolución gratis en 30 días</p>
            <p>🔒 Pago seguro garantizado</p>
          </div>
        </div>
      </div>

      <div className="specifications-section">
        <h2>Información del Producto</h2>
        <div className="specs-grid">
          <div className="spec-item">
            <span className="spec-label">Categoría:</span>
            <span className="spec-value">{product.category}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">SKU:</span>
            <span className="spec-value">PROD-{product.id}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Disponibilidad:</span>
            <span className="spec-value">En stock</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Garantía:</span>
            <span className="spec-value">12 meses</span>
          </div>
        </div>
      </div>

      {/* Navegación entre productos */}
      <div className="product-navigation">
        <button 
          onClick={() => navigate(`/product/${parseInt(id) - 1}`)} 
          disabled={parseInt(id) <= 1}
        >
          ← Producto Anterior
        </button>
        <button onClick={() => navigate(`/product/${parseInt(id) + 1}`)}>
          Siguiente Producto →
        </button>
      </div>
    </div>
  );
}