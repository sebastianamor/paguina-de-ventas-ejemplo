import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔍 Para leer el término de búsqueda desde la URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get("search") || "";
  const category = queryParams.get("cat") || "";

  // 🧠 Cargar los productos desde el backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/products");
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error cargando productos:", err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // 🔎 Filtrar productos cuando cambia "search" o "category"
  useEffect(() => {
    let filteredList = products;

    if (category) {
      filteredList = filteredList.filter(
        (p) =>
          p.category?.toLowerCase() === category.toLowerCase()
      );
    }

    if (search) {
      filteredList = filteredList.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(filteredList);
  }, [search, category, products]);

  if (loading) {
    return <div className="loading">Cargando productos...</div>;
  }

  return (
    <div className="products-page">
      <h2 className="title">
        {category
          ? `Categoría: ${category}`
          : search
          ? `Resultados para "${search}"`
          : "Todos los Productos"}
      </h2>

      <div className="product-grid">
        {filtered.length > 0 ? (
          filtered.map((product) => (
            <div key={product._id} className="product-card">
              <img
                src={product.image || "https://via.placeholder.com/150"}
                alt={product.name}
              />
              <h3>{product.name}</h3>
              <p className="description">{product.description}</p>
              <p className="price">${product.price}</p>
              <button className="buy-btn">Agregar al carrito 🛒</button>
            </div>
          ))
        ) : (
          <p>No se encontraron productos.</p>
        )}
      </div>
    </div>
  );
}

export default Products;
