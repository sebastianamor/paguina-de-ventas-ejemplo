import React, { createContext, useContext, useState } from 'react';

// Crear contexto
const CartContext = createContext();

// Hook personalizado para acceder fácilmente al contexto
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // ➕ Agregar producto al carrito
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        // Si ya está en el carrito, aumenta la cantidad
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Si no existe, lo agrega
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // 🔄 Actualizar cantidad de un producto
  const updateQuantity = (productId, newQuantity) => {
    setCartItems((prevItems) => {
      // Si la cantidad es 0 o menor, elimina el producto
      if (newQuantity <= 0) {
        return prevItems.filter((item) => item.id !== productId);
      }
      
      // Actualiza la cantidad del producto
      return prevItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      );
    });
  };

  // ➖ Eliminar producto del carrito
  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  // 🧹 Vaciar carrito
  const clearCart = () => setCartItems([]);

  // 🧮 Contar cantidad total de productos
  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // 💰 Calcular total del carrito
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity, // ← AÑADIR ESTA LÍNEA
        removeFromCart,
        clearCart,
        getCartItemsCount,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};