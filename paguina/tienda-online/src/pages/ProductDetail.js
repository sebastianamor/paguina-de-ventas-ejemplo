import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showNotification, setShowNotification] = useState(false); // ← NUEVO
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      
      // ← MOSTRAR NOTIFICACIÓN
      setShowNotification(true);
      
      // ← OCULTAR DESPUÉS DE 3 SEGUNDOS
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }
  };

  if (!product) return <p>Cargando producto...</p>;

  return (
    <div className="product-detail">
      {/* ← NOTIFICACIÓN FLOTANTE */}
      {showNotification && (
        <div className="cart-notification">
          ✅ ¡Producto agregado al carrito!
        </div>
      )}

      <img src={product.image} alt={product.name} />
      <div className="detail-info">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <h2>${product.price}</h2>
        <button onClick={handleAddToCart} className="add-to-cart-btn">
          🛒 Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;