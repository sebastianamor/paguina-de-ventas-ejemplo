import React from "react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart } = useCart();

  return (
    <div style={{ padding: 20 }}>
      <h2>🛒 Carrito</h2>

      {cart.length === 0 && <p>Carrito vacío</p>}

      {cart.map(item => (
        <div key={item.id}>
          <h4>{item.name}</h4>
          <p>Precio: ${item.price}</p>
          <p>Cantidad: {item.quantity}</p>
        </div>
      ))}
    </div>
  );
};

export default Cart;
