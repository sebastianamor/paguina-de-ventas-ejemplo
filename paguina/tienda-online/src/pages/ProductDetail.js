import React from "react";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();

  // Simula obtener los datos del producto (puedes conectar a tu backend)
  const product = {
    id,
    name: "Producto " + id,
    description: "Descripción detallada del producto " + id,
    price: (10 * id).toFixed(2),
    image: "/img/product-" + id + ".jpg",
  };

  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "300px", borderRadius: "10px" }}
      />
      <p>{product.description}</p>
      <h3>${product.price}</h3>
      <button className="btn-comprar">Agregar al carrito</button>
    </div>
  );
}
