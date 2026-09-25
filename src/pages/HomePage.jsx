import { Link } from 'react-router-dom';
import { servicioApi } from '../services/api';
import useFetch from '../hooks/useFetch';

const categorias = ['Corte', 'Tinte', 'Peinado', 'Manicure', 'Pedicure', 'Tratamiento'];

// Pagina de inicio: presenta el salón, estadísticas y enlaces rápidos.
export default function HomePage() {
  const { datos: servicios, cargando } = useFetch(servicioApi.listar);
  const apiUrl = import.meta.env.VITE_API_URL;

  return (
    <main className="page">
      <section className="hero">
        <h1>💖 Bienvenido a Salon Glitt</h1>
        <p className="lead">
          Tu salón de belleza de confianza: cortes, tintes, manicure y tratamientos
          para que luzcas increíble.
        </p>
        <span className="badge-status">API Spring Boot: {apiUrl}</span>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <h2>{cargando ? '…' : servicios.length}</h2>
          <p>Servicios disponibles</p>
        </div>
        <div className="stat-card">
          <h2>{categorias.length}</h2>
          <p>Categorías de belleza</p>
        </div>
        <div className="stat-card">
          <h2>100%</h2>
          <p>Estilistas profesionales</p>
        </div>
      </section>

      <section className="categorias-section">
        <h2>Categorías de servicios</h2>
        <div className="categorias-chips">
          {categorias.map((cat) => (
            <Link key={cat} to={`/servicios?categoria=${cat}`} className="chip">
              {cat}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}