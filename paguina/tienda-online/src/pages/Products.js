import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/products/ProductCard';
import './products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [searchParams] = useSearchParams();

  // Categorías disponibles
  const categories = [
    { id: 'all', name: 'Todos', icon: '🛍️' },
    { id: 'ropa', name: 'Ropa', icon: '👕' },
    { id: 'electronica', name: 'Electrónica', icon: '💻' },
    { id: 'hogar', name: 'Hogar', icon: '🏠' },
    { id: 'deportes', name: 'Deportes', icon: '⚽' },
  ];

  // Cargar productos
  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:3001/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error cargando productos:', err);
        setLoading(false);
      });
  }, []);

  // Filtrar y ordenar productos
  useEffect(() => {
    let result = [...products];

    // Filtrar por búsqueda (del Header)
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtrar por categoría (del Header o botones)
    const categoryParam = searchParams.get('cat') || selectedCategory;
    if (categoryParam && categoryParam !== 'all') {
      result = result.filter(product => 
        product.category?.toLowerCase() === categoryParam.toLowerCase()
      );
    }

    // Ordenar
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [products, selectedCategory, sortBy, searchParams]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="products-container">
        <div className="products-header">
          <h2>Cargando productos...</h2>
        </div>
        <div className="products-grid">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="product-card skeleton">
              <div className="skeleton-image"></div>
              <div className="skeleton-content">
                <div className="skeleton-line"></div>
                <div className="skeleton-line short"></div>
                <div className="skeleton-line"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="products-container">
      {/* HEADER */}
      <div className="products-header">
        <div>
          <h2>Nuestros Productos</h2>
          <p className="products-count">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'} 
            {searchParams.get('search') && ` para "${searchParams.get('search')}"`}
          </p>
        </div>

        {/* ORDENAR */}
        <div className="sort-container">
          <label htmlFor="sort">Ordenar por:</label>
          <select 
            id="sort"
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="default">Predeterminado</option>
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
            <option value="name">Nombre: A-Z</option>
          </select>
        </div>
      </div>

      {/* FILTROS DE CATEGORÍA */}
      <div className="category-filters">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => handleCategoryChange(category.id)}
          >
            <span className="category-icon">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      {/* GRID DE PRODUCTOS */}
      {filteredProducts.length === 0 ? (
        <div className="no-products">
          <div className="no-products-icon">🔍</div>
          <h3>No se encontraron productos</h3>
          <p>Intenta ajustar los filtros o busca otro término</p>
          <button 
            onClick={() => {
              setSelectedCategory('all');
              setSortBy('default');
              window.history.pushState({}, '', '/products');
            }}
            className="reset-filters-btn"
          >
            Limpiar filtros
          </button>
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