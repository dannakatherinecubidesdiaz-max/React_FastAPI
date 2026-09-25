import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

// Acceso rápido al contexto de autenticación con validación.
// Lanza un error si se usa fuera del AuthProvider.
export default function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  }
  return context;
}