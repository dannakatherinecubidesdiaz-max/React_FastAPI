import { useState } from 'react';
import { clienteApi } from '../services/api';
import useFetch from '../hooks/useFetch';
import useDebounce from '../hooks/useDebounce';
import Button from '../components/ui/Button';
import { NotificationContext } from '../context/NotificationContext';
import { useContext } from 'react';

// Registro de clientes habituales de Salon Glitt.
export default function ClientesPage() {
  const { notificar } = useContext(NotificationContext);
  const { datos: clientes, cargando, refetch } = useFetch(clienteApi.listar);

  const [termino, setTermino] = useState('');
  const terminoDebounced = useDebounce(termino, 400);

  const [formulario, setFormulario] = useState({
    nombre: '',
    telefono: '',
    email: '',
    favoritos: '',
  });
  const [enviando, setEnviando] = useState(false);

  const filtrados = (clientes || []).filter((c) =>
    terminoDebounced.trim() === ''
      ? true
      : c.nombre.toLowerCase().includes(terminoDebounced.toLowerCase()) ||
        (c.email || '').toLowerCase().includes(terminoDebounced.toLowerCase()),
  );

  async function registrarCliente(e) {
    e.preventDefault();
    if (!formulario.nombre || !formulario.telefono) {
      notificar('Nombre y teléfono son obligatorios', 'error');
      return;
    }
    setEnviando(true);
    try {
      await clienteApi.crear(formulario);
      notificar('💃 Cliente registrado con éxito');
      setFormulario({ nombre: '', telefono: '', email: '', favoritos: '' });
      refetch();
    } catch (err) {
      notificar(err.response?.data?.message || 'No se pudo registrar el cliente', 'error');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main className="page">
      <header className="page-header">
        <h1>Nuestras clientas</h1>
        <input
          className="input search-input"
          type="search"
          placeholder="🔍 Buscar por nombre o email…"
          value={termino}
          onChange={(e) => setTermino(e.target.value)}
        />
      </header>

      <section className="clientes-layout">
        <form className="form-cliente" onSubmit={registrarCliente}>
          <h2>Registrar nueva clienta</h2>

          <label className="form-field">
            <span>Nombre completo</span>
            <input
              className="input"
              type="text"
              placeholder="María Fernanda López"
              value={formulario.nombre}
              onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })}
            />
          </label>

          <label className="form-field">
            <span>Teléfono</span>
            <input
              className="input"
              type="tel"
              placeholder="310 123 4567"
              value={formulario.telefono}
              onChange={(e) => setFormulario({ ...formulario, telefono: e.target.value })}
            />
          </label>

          <label className="form-field">
            <span>Email</span>
            <input
              className="input"
              type="email"
              placeholder="cliente@correo.com"
              value={formulario.email}
              onChange={(e) => setFormulario({ ...formulario, email: e.target.value })}
            />
          </label>

          <label className="form-field">
            <span>Servicios favoritos</span>
            <input
              className="input"
              type="text"
              placeholder="Manicure, Tinte…"
              value={formulario.favoritos}
              onChange={(e) => setFormulario({ ...formulario, favoritos: e.target.value })}
            />
          </label>

          <Button type="submit" variant="primario" loading={enviando}>
            Registrar clienta
          </Button>
        </form>

        <div className="clientes-lista">
          {cargando ? (
            <p className="estado-carga">Cargando clientas…</p>
          ) : filtrados.length === 0 ? (
            <div className="empty-state">
              <p>👀 No se encontraron clientas.</p>
            </div>
          ) : (
            <table className="tabla">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Teléfono</th>
                  <th>Email</th>
                  <th>Favoritos</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map((c) => (
                  <tr key={c.id}>
                    <td>💁‍♀️ {c.nombre}</td>
                    <td>{c.telefono}</td>
                    <td>{c.email || '—'}</td>
                    <td>{c.favoritos || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </main>
  );
}