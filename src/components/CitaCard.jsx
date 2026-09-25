// Tarjeta de cita/reserva agendada en el salón.
export default function CitaCard({ cita, onCancelar }) {
  const { clienteNombre, servicioNombre, estilistaNombre, fecha, hora, estado } = cita;

  return (
    <article className={`cita-card cita-${estadoBajo(estado)}`}>
      <header className="cita-header">
        <h3>📅 {fecha} · {hora}</h3>
        <span className={`badge-estado badge-${estadoBajo(estado)}`}>{estado}</span>
      </header>
      <div className="cita-body">
        <p><strong>Cliente:</strong> {clienteNombre}</p>
        <p><strong>Servicio:</strong> {servicioNombre}</p>
        <p><strong>Estilista:</strong> {estilistaNombre}</p>
      </div>
      {estado !== 'Cancelada' && (
        <footer className="cita-footer">
          <button className="btn btn-sm btn-danger" onClick={() => onCancelar(cita)}>
            Cancelar cita
          </button>
        </footer>
      )}
    </article>
  );
}

// Normaliza el estado para usarlo en clases CSS.
function estadoBajo(estado) {
  switch (estado) {
    case 'Confirmada': return 'confirmada';
    case 'En proceso': return 'proceso';
    case 'Cancelada': return 'cancelada';
    case 'Completada': return 'completada';
    default: return 'pendiente';
  }
}