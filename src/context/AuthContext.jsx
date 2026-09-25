import { createContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';

export const AuthContext = createContext(null);

// Estado global de autenticación: usuario actual + token.
// Persiste la sesión en localStorage para que sobreviva a recargas.
export default function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const guardado = localStorage.getItem('user');
    return guardado ? JSON.parse(guardado) : null;
  });
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(usuario));
  }, [usuario]);

  async function login(email, password) {
    setCargando(true);
    try {
      const res = await authApi.login(email, password);
      localStorage.setItem('token', res.data.token);
      setUsuario(res.data.usuario);
      return { ok: true, usuario: res.data.usuario };
    } catch (err) {
      return { ok: false, error: err.response?.data?.message || 'Credenciales inválidas' };
    } finally {
      setCargando(false);
    }
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, cargando, login, logout, estaAutenticado: !!usuario }}>
      {children}
    </AuthContext.Provider>
  );
}