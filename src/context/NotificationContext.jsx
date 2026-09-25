import { createContext, useState, useCallback } from 'react';

export const NotificationContext = createContext(null);

let siguienteId = 0;

// Sistema de toasts global: mostrarNotificacion('Cita creada', 'exito').
export default function NotificationProvider({ children }) {
  const [notificaciones, setNotificaciones] = useState([]);

  // useCallback evita que el proveedor se vuelva a renderizar en cada render del padre.
  const notificar = useCallback((mensaje, tipo = 'exito') => {
    const id = ++siguienteId;
    setNotificaciones((prev) => [...prev, { id, mensaje, tipo }]);
    setTimeout(() => {
      setNotificaciones((prev) => prev.filter((n) => n.id !== id));
    }, 3500);
  }, []);

  const descartar = useCallback((id) => {
    setNotificaciones((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ notificar, descartar, notificaciones }}>
      {children}
    </NotificationContext.Provider>
  );
}