import React from "react";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* === Sección 1: Nombre del sitio === */}
        <div className="footer-section">
          <h3>🛒 Tienda Online</h3>
          <p>
            Tu mejor lugar para comprar productos de calidad al mejor precio.
          </p>
        </div>

        {/* === Sección 2: Enlaces útiles === */}
        <div className="footer-section">
          <h4>Enlaces útiles</h4>
          <ul>
            <li><a href="/about">Sobre nosotros</a></li>
            <li><a href="/contact">Contacto</a></li>
            <li><a href="/privacy">Política de Privacidad</a></li>
            <li><a href="/terms">Términos y Condiciones</a></li>
          </ul>
        </div>

        {/* === Sección 3: Redes sociales === */}
        <div className="footer-section redes">
          <h4>Síguenos</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Facebook size={22} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram size={22} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter size={22} />
            </a>
            <a href="mailto:contacto@tienda.com">
              <Mail size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* === Línea inferior === */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} Tienda Online. Todos los derechos reservados.
      </div>
    </footer>
  );
}

export default Footer;
