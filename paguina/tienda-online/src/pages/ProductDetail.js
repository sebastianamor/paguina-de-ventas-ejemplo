import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext"; // ← IMPORTAR useCart
import axios from "axios";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart(); // ← OBTENER addToCart del contexto

  useEffect(() => {
    axios
      .get(`http://localhost:3001/products/${id}`) // ← CORREGÍ ESTO (tenías backticks mal)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      alert(`${product.name} agregado al carrito!`); // ← Feedback al usuario
    }
  };

  if (!product) return <p>Cargando producto...</p>;

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.name} />
      <div className="detail-info">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <h2>${product.price}</h2>
        <button onClick={handleAddToCart}>Agregar al carrito</button> {/* ← AGREGUÉ onClick */}
      </div>
    </div>
  );
};

export default ProductDetail;