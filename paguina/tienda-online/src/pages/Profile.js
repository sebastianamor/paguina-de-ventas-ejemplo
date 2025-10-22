import React from 'react';
import { useAuth } from '../context/AuthContext';

function Profile() {
  const { user } = useAuth();

  return (
    <div className="profile-page">
      <h1>Mi Perfil</h1>
      <div className="profile-card">
        <div className="profile-info">
          <p><strong>Nombre:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Rol:</strong> {user?.role === 'admin' ? 'Administrador' : 'Usuario'}</p>
          <p><strong>ID:</strong> {user?.id}</p>
        </div>
        <div className="profile-actions">
          <button className="edit-btn">Editar Perfil</button>
          <button className="change-password-btn">Cambiar Contraseña</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;