import { NotificationContext } from '../../context/NotificationContext';
import { useContext } from 'react';

// Contenedor fijo que visualiza las notificaciones del NotificationContext.
export default function ToastContainer() {
  const { notificaciones, descartar } = useContext(NotificationContext);

  return (
    <div className="toast-container">
      {notificaciones.map(({ id, mensaje, tipo }) => (
        <button key={id} className={`toast toast-${tipo}`} onClick={() => descartar(id)}>
          <span className="toast-emoji" aria-hidden="true">
            {tipo === 'exito' && '✔'}
            {tipo === 'error' && '✖'}
            {tipo === 'info' && 'ℹ'}
          </span>
          <span className="toast-mensaje">{mensaje}</span>
          <span className="toast-cerrar" aria-hidden="true">×</span>
        </button>
      ))}
    </div>
  );
}