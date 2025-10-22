import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Intentando iniciar sesión con:', formData.email);
    
    // Simular login - CUALQUIER email y contraseña funciona
    const user = {
      id: Date.now(),
      name: formData.email.includes('admin') ? 'Administrador' : 'Usuario',
      email: formData.email,
      role: formData.email.includes('admin') ? 'admin' : 'user'
    };
    
    console.log('Usuario creado:', user);
    login(user);
    navigate('/dashboard'); // Redirige al dashboard
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
        
        <button type="submit" className="login-btn">
          Entrar
        </button>
        
        <div className="login-tips">
          <p><strong>Emails de prueba:</strong></p>
          <p>• admin@test.com → Panel Administrador</p>
          <p>• usuario@test.com → Panel Usuario</p>
          <p><small>¡Cualquier contraseña funciona!</small></p>
        </div>
      </form>
    </div>
  );
}

export default Login;