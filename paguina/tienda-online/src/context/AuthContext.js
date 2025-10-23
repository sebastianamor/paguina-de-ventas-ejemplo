import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // 🟢 Iniciar sesión
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // 🔴 Cerrar sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // 🟡 Actualizar perfil (nombre/email)
  const updateUser = (newData) => {
    setUser((prev) => {
      const updated = { ...prev, ...newData };
      localStorage.setItem('user', JSON.stringify(updated));
      return updated;
    });
  };

  // 🔐 Cambiar contraseña (solo ejemplo)
  const changePassword = (oldPassword, newPassword) => {
    console.log('Contraseña actual:', oldPassword);
    console.log('Nueva contraseña:', newPassword);
    alert('✅ Contraseña cambiada correctamente (simulación)');
    // Aquí podrías conectar con tu backend real si lo deseas
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, changePassword, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado
export const useAuth = () => useContext(AuthContext);
