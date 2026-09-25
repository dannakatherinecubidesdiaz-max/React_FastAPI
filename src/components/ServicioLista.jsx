import ServicioCard from './ServicioCard';

// Renderiza la grilla de servicios usando .map() con key única (regla 4).
export default function ServicioLista({ servicios, onReservar, onVerDetalle, cargando }) {
  if (cargando) {
    return <p className="estado-carga">Cargando servicios…</p>;
  }

  if (!servicios || servicios.length === 0) {
    return (
      <div className="empty-state">
        <p>⚠️ Aún no hay servicios registrados en Salon Glitt.</p>
      </div>
    );
  }

  return (
    <div className="servicios-grid">
      {servicios.map((servicio) => (
        <ServicioCard
          key={servicio.id}
          id={servicio.id}
          nombre={servicio.nombre}
          categoria={servicio.categoria}
          duracionMin={servicio.duracionMin}
          precio={servicio.precio}
          estilistaNombre={servicio.estilistaNombre}
          onReservar={() => onReservar(servicio)}
          onVerDetalle={(id) => onVerDetalle(id)}
        />
      ))}
    </div>
  );
}