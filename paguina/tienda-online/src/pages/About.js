import React from "react";
import "./about.css";  // ← Agrega el ./
export default function About() {
  return (
    <div className="about-page">
      <h1>Quiénes Somos</h1>
      <div className="about-content">
        <div className="about-card">
          <p>
            Somos una tienda en línea dedicada a ofrecer los mejores productos al
            mejor precio. Nuestro compromiso es la calidad, el servicio y la
            confianza.
          </p>
        </div>
        <div className="about-card">
          <p>
            Fundada por profesionales apasionados, trabajamos cada día para brindar
            una experiencia de compra única.
          </p>
        </div>
      </div>
    </div>
  );
}