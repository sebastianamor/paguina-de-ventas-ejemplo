import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      // Agregar la cantidad seleccionada
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  if (!product) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando producto...</p>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      {/* NOTIFICACIÓN */}
      {showNotification && (
        <div className="cart-notification">
          ✅ ¡{quantity} {quantity > 1 ? 'productos agregados' : 'producto agregado'} al carrito!
        </div>
      )}

      {/* BOTÓN VOLVER */}
      <button onClick={() => navigate('/products')} className="back-btn">
        ← Volver a productos
      </button>

      {/* CONTENIDO PRINCIPAL */}
      <div className="product-detail">
        {/* IMAGEN */}
        <div className="product-image-container">
          <img src={product.image} alt={product.name} className="product-image" />
        </div>

        {/* INFORMACIÓN */}
        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>
          
          {/* PRECIO */}
          <div className="price-section">
            <span className="price">${product.price}</span>
            <span className="stock-badge">✓ En stock</span>
          </div>

          {/* DESCRIPCIÓN */}
          <div className="description-section">
            <h3>Descripción</h3>
            <p>{product.description}</p>
          </div>

          {/* SELECTOR DE CANTIDAD */}
          <div className="quantity-section">
            <label>Cantidad:</label>
            <div className="quantity-controls">
              <button onClick={decreaseQuantity} className="qty-btn">-</button>
              <span className="quantity-value">{quantity}</span>
              <button onClick={increaseQuantity} className="qty-btn">+</button>
            </div>
          </div>

          {/* BOTONES DE ACCIÓN */}
          <div className="action-buttons">
            <button onClick={handleAddToCart} className="add-to-cart-btn">
              🛒 Agregar al carrito
            </button>
            <button onClick={() => navigate('/cart')} className="view-cart-btn">
              Ver carrito
            </button>
          </div>

          {/* INFORMACIÓN ADICIONAL */}
          <div className="additional-info">
            <div className="info-item">
              <span className="icon">🚚</span>
              <div>
                <strong>Envío gratis</strong>
                <p>En compras mayores a $50</p>
              </div>
            </div>
            <div className="info-item">
              <span className="icon">↩️</span>
              <div>
                <strong>Devolución gratis</strong>
                <p>30 días para devolver</p>
              </div>
            </div>
            <div className="info-item">
              <span className="icon">🔒</span>
              <div>
                <strong>Pago seguro</strong>
                <p>Protección del comprador</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;