import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* 🔹 Sección 1: Marca y descripción */}
        <div className="footer-section">
          <h2 className="footer-title">🛒 Tienda Online</h2>
          <p className="footer-description">
            Tu tienda de confianza. Productos de calidad, atención personalizada y entregas rápidas.
          </p>
        </div>

        {/* 🔹 Sección 2: Enlaces rápidos */}
        <div className="footer-section">
          <h3>Enlaces útiles</h3>
          <ul>
            <li><Link to="/products">Productos</Link></li>
            <li><Link to="/quienes-somos">Quiénes Somos</Link></li>
            <li><Link to="/cart">Carrito</Link></li>
            <li><Link to="/profile">Mi Perfil</Link></li>
          </ul>
        </div>

        {/* 🔹 Sección 3: Contacto */}
        <div className="footer-section">
          <h3>Contáctanos</h3>
          <p>📞 +81 080-1234-5678</p>
          <p>✉️ soporte@tiendaonline.com</p>
          <p>📍 Tokio, Japón</p>
        </div>

        {/* 🔹 Sección 4: Redes Sociales */}
        <div className="footer-section">
          <h3>Síguenos</h3>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-tiktok"></i></a>
          </div>
        </div>

      </div>

      {/* Línea inferior */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Tienda Online — Todos los derechos reservados</p>
      </div>
    </footer>
  );
}

export default Footer;
