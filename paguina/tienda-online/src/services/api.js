// Simulación de API
export const mockAPI = {
  login: (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = {
          id: 1,
          name: email.includes('admin') ? 'Administrador' : 'Usuario Demo',
          email: email,
          role: email.includes('admin') ? 'admin' : 'user'
        };
        resolve(user);
      }, 1000);
    });
  },

  getOrders: (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const orders = [
          { id: 1, product: 'Producto A', status: 'pending', date: '2024-01-15' },
          { id: 2, product: 'Producto B', status: 'completed', date: '2024-01-10' },
        ];
        resolve(orders);
      }, 500);
    });
  }
};