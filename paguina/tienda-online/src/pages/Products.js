import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/products/ProductCard';
import './products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Configuración de API - VARIAS OPCIONES:
  const getAPIUrl = () => {
    // OPCIÓN 1: API de prueba pública (JSONPlaceholder)
    // return 'https://jsonplaceholder.typicode.com/photos';
    
    // OPCIÓN 2: Tu servidor local (ajusta el puerto)
    // return 'http://localhost:5000/api/products';
    
    // OPCIÓN 3: Variable de entorno
    const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    return `${baseUrl}/api/products`;
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // OPCIÓN 1: Con Axios (recomendado)
      const response = await axios.get(getAPIUrl(), {
        timeout: 5000, // 5 segundos timeout
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      console.log('Respuesta de API:', response.data);
      
      // Si usas JSONPlaceholder
      if (response.data[0]?.albumId) {
        // Transformar datos de JSONPlaceholder
        const transformedData = response.data.slice(0, 20).map(item => ({
          id: item.id,
          name: item.title.substring(0, 30),
          description: item.title,
          price: Math.floor(Math.random() * 100) + 10,
          image: item.url,
          category: Math.random() > 0.5 ? 'electronics' : 'clothing'
        }));
        setProducts(transformedData);
        setFilteredProducts(transformedData);
      } else {
        // Si es tu propia API
        setProducts(response.data);
        setFilteredProducts(response.data);
      }
      
    } catch (err) {
      console.error('Error cargando productos:', err);
      
      // Si hay error, usar datos de ejemplo para desarrollo
      if (process.env.NODE_ENV === 'development') {
        console.log('Usando datos de ejemplo para desarrollo');
        setError('Conectando con datos de ejemplo (Backend no disponible)');
        
        const sampleProducts = [
          { id: 1, name: 'Laptop Gaming', description: 'Laptop de alto rendimiento para gamers', price: 1299.99, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400', category: 'electronics' },
          { id: 2, name: 'Camiseta Casual', description: 'Camiseta 100% algodón', price: 24.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w-400', category: 'clothing' },
          { id: 3, name: 'Smartphone', description: 'Teléfono inteligente última generación', price: 799.99, image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400', category: 'electronics' },
          { id: 4, name: 'Audífonos Bluetooth', description: 'Audífonos inalámbricos con cancelación de ruido', price: 199.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', category: 'electronics' },
          { id: 5, name: 'Zapatos Deportivos', description: 'Zapatos cómodos para running', price: 89.99, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', category: 'clothing' },
          { id: 6, name: 'Tablet', description: 'Tablet 10 pulgadas con 128GB', price: 349.99, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400', category: 'electronics' },
          { id: 7, name: 'Reloj Inteligente', description: 'Smartwatch con monitor de actividad', price: 249.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', category: 'electronics' },
          { id: 8, name: 'Jeans', description: 'Jeans ajustados de mezclilla', price: 59.99, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400', category: 'clothing' },
        ];
        
        setProducts(sampleProducts);
        setFilteredProducts(sampleProducts);
      } else {
        setError('No se pudo conectar con el servidor. Error: ' + (err.message || 'Desconocido'));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ... resto del código se mantiene igual

  return (
    <div className="products-container">
      <div className="products-header">
        <h1>Nuestros Productos</h1>
        
        <div className="filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="category-filter">
            <button
              className={!selectedCategory ? 'active' : ''}
              onClick={() => setSelectedCategory('')}
            >
              Todos
            </button>
            <button
              className={selectedCategory === 'electronics' ? 'active' : ''}
              onClick={() => setSelectedCategory('electronics')}
            >
              Electrónica
            </button>
            <button
              className={selectedCategory === 'clothing' ? 'active' : ''}
              onClick={() => setSelectedCategory('clothing')}
            >
              Ropa
            </button>
            <button
              className={selectedCategory === 'books' ? 'active' : ''}
              onClick={() => setSelectedCategory('books')}
            >
              Libros
            </button>
          </div>
        </div>
        
        {error && (
          <div className="api-warning">
            ⚠️ {error}
            <button onClick={fetchProducts} className="retry-small">
              Reintentar conexión
            </button>
          </div>
        )}
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Cargando productos...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="no-products">
          <p>No se encontraron productos</p>
          {(searchTerm || selectedCategory) && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
              }}
              className="clear-filters"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;