// Tarjeta de servicio del salón con props desestructuradas.
// Sigue el patrón de FincaCard: componente puro, datos por props.
export default function ServicioCard({
  id,
  nombre,
  categoria,
  duracionMin,
  precio,
  estilistaNombre,
  onReservar,
  onVerDetalle,
}) {
  return (
    <article className="servicio-card">
      <div className="servicio-card-header">
        <h3>💇‍♀️ {nombre}</h3>
        <span className="badge-categoria">{categoria}</span>
      </div>

      <div className="servicio-card-body">
        <p>
          <strong>Duración:</strong> {duracionMin} min
        </p>
        <p>
          <strong>Estilista:</strong> {estilistaNombre || 'A confirmar'}
        </p>
        <p className="servicio-precio">
          <strong>Precio:</strong>{' '}
          {precio.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
        </p>
      </div>

      <div className="servicio-card-footer">
        <button className="btn btn-sm btn-outline" onClick={() => onVerDetalle(id)}>
          Ver detalles
        </button>
        <button className="btn btn-sm btn-primario" onClick={onReservar}>
          ✨ Reservar
        </button>
      </div>
    </article>
  );
}