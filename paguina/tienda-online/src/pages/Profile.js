import React, { useState } from 'react';
import './profile.css';
import { useAuth } from '../context/AuthContext';

function Profile() {
  const { user, updateUser, changePassword } = useAuth();

  // Estado para modales
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Formularios
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
  });

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateUser(formData);
    setShowEditModal(false);
    alert('✅ Perfil actualizado correctamente');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    changePassword(passwordData.oldPassword, passwordData.newPassword);
    setShowPasswordModal(false);
  };

  return (
    <div className="profile-page">
      <h1>Mi Perfil</h1>
      <div className="profile-card">
        <div className="profile-avatar">
          {user?.name?.charAt(0).toUpperCase()}
        </div>

        <div className="profile-info">
          <p><strong>Nombre:</strong> <span>{user?.name}</span></p>
          <p><strong>Email:</strong> <span>{user?.email}</span></p>
          <p><strong>Rol:</strong> <span>{user?.role === 'admin' ? 'Administrador' : 'Usuario'}</span></p>
          <p><strong>ID:</strong> <span>{user?.id}</span></p>
        </div>

        <div className="profile-actions">
          <button className="edit-btn" onClick={() => setShowEditModal(true)}>
            Editar Perfil
          </button>
          <button className="change-password-btn" onClick={() => setShowPasswordModal(true)}>
            Cambiar Contraseña
          </button>
        </div>
      </div>

      {/* Modal para Editar Perfil */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowEditModal(false)}>✕</button>
            <h2>Editar Perfil</h2>
            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                placeholder="Nombre"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <button type="submit">Guardar Cambios</button>
            </form>
          </div>
        </div>
      )}

      {/* Modal para Cambiar Contraseña */}
      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowPasswordModal(false)}>✕</button>
            <h2>Cambiar Contraseña</h2>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                placeholder="Contraseña actual"
                value={passwordData.oldPassword}
                onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
              />
              <input
                type="password"
                placeholder="Nueva contraseña"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              />
              <button type="submit">Actualizar Contraseña</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
