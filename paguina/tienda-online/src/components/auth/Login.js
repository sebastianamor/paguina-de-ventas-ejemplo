// components/auth/Login.js
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simular login
    const user = {
      id: 1,
      name: 'Usuario Demo',
      email: formData.email,
      role: formData.email.includes('admin') ? 'admin' : 'user'
    };
    login(user);
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Iniciar Sesión</h2>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          required
        />
        <button type="submit">Entrar</button>
        <p>¿No tienes cuenta? <a href="/register">Regístrate</a></p>
      </form>
    </div>
  );
}

export default Login;