import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './auth.css';

function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      role: 'user',
    };
    login(user);
    alert(`¡Bienvenido, ${formData.name}!`);
    window.location.href = '/products';
  };

  return (
    <div className="auth-container">
       <div className="floating-particle"></div>
       <div className="floating-particle"></div>
       <div className="floating-particle"></div>
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Registrarse</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />

        <input
          type="direccion"
          placeholder="dirección"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />



        <button type="submit">Crear Cuenta</button>
      </form>
    </div>
  );
}

export default Register;
