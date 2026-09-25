// Esqueleto de carga: simula la forma de una tarjeta mientras llegan los datos.
export default function Skeleton({ reps = 3 }) {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: reps }, (_, i) => (
        <div className="skeleton-card" key={i}>
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton skeleton-line"></div>
          <div className="skeleton skeleton-line"></div>
          <div className="skeleton skeleton-btn"></div>
        </div>
      ))}
    </div>
  );
}