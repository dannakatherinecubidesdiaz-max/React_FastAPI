import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { servicioApi } from '../services/api';
import useFetch from '../hooks/useFetch';
import useDebounce from '../hooks/useDebounce';
import ServicioLista from '../components/ServicioLista';
import Skeleton from '../components/ui/Skeleton';
import { NotificationContext } from '../context/NotificationContext';
import { useContext } from 'react';

// Catálogo de servicios del salón con búsqueda y filtro por categoría.
export default function ServiciosPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoriaFiltro = searchParams.get('categoria') || '';

  const [termino, setTermino] = useState('');
  const terminoDebounced = useDebounce(termino, 400);
  const { notificar } = useContext(NotificationContext);

  const { datos: servicios, cargando, error } = useFetch(servicioApi.listar);

  const filtrados = (servicios || []).filter((s) =>
    categoriaFiltro ? s.categoria.toLowerCase() === categoriaFiltro.toLowerCase() : true,
  );

  const coincidencias = filtrados.filter((s) =>
    terminoDebounced.trim() === ''
      ? true
      : s.nombre.toLowerCase().includes(terminoDebounced.toLowerCase()),
  );

  function verDetalle(id) {
    navigate(`/servicios/${id}`);
  }

  function reservar(servicio) {
    navigate(`/citas/nueva?servicio=${servicio.id}`);
    notificar(`Reserva de "${servicio.nombre}" iniciada`, 'info');
  }

  return (
    <main className="page">
      <header className="page-header">
        <h1>Todos los servicios</h1>
        <input
          className="input search-input"
          type="search"
          placeholder="🔍 Buscar servicio…"
          value={termino}
          onChange={(e) => setTermino(e.target.value)}
        />
      </header>

      <div className="filtros">
        <button
          className={`filtro-chip ${categoriaFiltro === '' ? 'active' : ''}`}
          onClick={() => navigate('/servicios')}
        >
          Todos
        </button>
        {['Corte', 'Tinte', 'Peinado', 'Manicure', 'Pedicure', 'Tratamiento'].map((cat) => (
          <button
            key={cat}
            className={`filtro-chip ${categoriaFiltro === cat ? 'active' : ''}`}
            onClick={() => navigate(`/servicios?categoria=${cat}`)}
          >
            {cat}
          </button>
        ))}
      </div>

      {error && <p className="error-mensaje">❌ Error al cargar los servicios.</p>}
      {cargando ? (
        <Skeleton reps={6} />
      ) : (
        <ServicioLista
          servicios={coincidencias}
          onReservar={reservar}
          onVerDetalle={verDetalle}
        />
      )}
    </main>
  );
}