import React, { useState } from 'react'; // ← Añadido useState aquí
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Products = () => {
    const { user } = useAuth();
    const { addToCart } = useCart(); 

    // Estado para la notificación personalizada (reemplazando alert())
    const [notificationMsg, setNotificationMsg] = useState(''); // ← Estado añadido

    
    // Productos (Hardcoded por ahora)
    const products = [
        { id: 1, name: 'Laptop Gaming', price: 1200, description: 'Laptop para gaming de alta performance', image: '💻' },
        { id: 2, name: 'Smartphone Pro', price: 800, description: 'Teléfono inteligente última generación', image: '📱' },
        { id: 3, name: 'Tablet Pro', price: 500, description: 'Tablet perfecta para trabajo y entretenimiento', image: '📟' },
        { id: 4, name: 'Auriculares ANC', price: 150, description: 'Cancelación de ruido activa, sonido cristalino', image: '🎧' },
        { id: 5, name: 'Smartwatch', price: 250, description: 'Monitoriza tu salud y recibe notificaciones', image: '⌚' },
        { id: 6, name: 'Monitor 4K', price: 450, description: 'Pantalla ultra HD para creadores de contenido', image: '🖥️' },
    ];

    const handleAddToCart = (product) => {
        addToCart(product);
        
        // Reemplazo de alert() con un mensaje en el estado
        setNotificationMsg(`✅ ¡${product.name} agregado al carrito!`);
        
        // Limpiar el mensaje después de 3 segundos
        setTimeout(() => {
            setNotificationMsg('');
        }, 3000);
    };

    return (
        // Se reemplazó "products-page" por clases de Tailwind
        <div className="space-y-8 p-4">
            
            {/* 1. NOTIFICACIÓN FLOTANTE (Reemplazo de "product-notification") */}
            {notificationMsg && (
                <div className="fixed top-20 right-6 bg-green-500 text-white p-3 rounded-lg shadow-xl z-50 transition-all duration-300 transform animate-pulse">
                    {notificationMsg}
                </div>
            )}
            
            {/* 2. HERO SECTION (Reemplazo de "products-hero") */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-10 rounded-xl shadow-lg text-center">
                <h1 className="text-4xl font-extrabold mb-2">Nuestra Tecnología</h1>
                <p className="text-lg opacity-90 mb-6">Descubre la mejor tecnología al mejor precio</p>
                
                {!user && (
                    // Reemplazo de "hero-actions"
                    <div className="mt-6 border-t border-blue-400 pt-4"> 
                        <p className="text-sm">💡 <strong>Inicia sesión</strong> para acceder a tu dashboard personal</p>
                        <Link 
                            to="/login" 
                            // Reemplazo de "hero-login-btn"
                            className="mt-3 inline-block bg-white text-blue-600 px-6 py-2 rounded-full font-bold shadow-md hover:bg-gray-100 transition-colors" 
                        >
                            🚀 Iniciar Sesión
                        </Link>
                    </div>
                )}
            </div>
            
            {/* 3. GRID DE PRODUCTOS (Reemplazo de "product-grid") */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                    // Reemplazo de "product-card"
                    <div key={product.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center"> 
                        {/* Reemplazo de "product-image" */}
                        <div className="text-5xl mb-4 p-3 bg-gray-100 rounded-full">{product.image}</div> 
                        {/* Reemplazo de "product-name" */}
                        <h2 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h2> 
                        {/* Reemplazo de "product-description" */}
                        <p className="text-sm text-gray-500 mb-4 flex-grow">{product.description}</p> 
                        
                        {/* Reemplazo de "product-footer" */}
                        <div className="w-full pt-4 border-t border-gray-100 flex justify-between items-center mt-auto"> 
                            {/* Reemplazo de "product-price" */}
                            <span className="text-2xl font-extrabold text-blue-600">${product.price.toFixed(2)}</span> 
                            <button 
                                onClick={() => handleAddToCart(product)} 
                                // Reemplazo de "add-to-cart-btn"
                                className="px-4 py-2 text-white bg-green-500 rounded-lg font-semibold hover:bg-green-600 transition-colors shadow-md shadow-green-400/50" 
                            >
                                Añadir 🛒
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;