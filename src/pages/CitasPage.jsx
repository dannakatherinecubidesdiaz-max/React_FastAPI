import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { citaApi, servicioApi, clienteApi, estilistaApi } from '../services/api';
import useFetch from '../hooks/useFetch';
import CitaCard from '../components/CitaCard';
import Button from '../components/ui/Button';
import { NotificationContext } from '../context/NotificationContext';
import { useContext } from 'react';

// Agenda de citas del salón + formulario para agendar una nueva.
export default function CitasPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { notificar } = useContext(NotificationContext);

  const servicioEnQuery = searchParams.get('servicio') || '';

  const { datos: citas, cargando, refetch } = useFetch(citaApi.listar);
  const { datos: servicios } = useFetch(servicioApi.listar);
  const { datos: clientes } = useFetch(clienteApi.listar);
  const { datos: estilistas } = useFetch(estilistaApi.listar);

  const [formulario, setFormulario] = useState({
    clienteId: '',
    servicioId: servicioEnQuery || '',
    estilistaId: '',
    fecha: '',
    hora: '',
  });
  const [enviando, setEnviando] = useState(false);

  async function agendarCita(e) {
    e.preventDefault();
    if (!formulario.clienteId || !formulario.servicioId || !formulario.estilistaId || !formulario.fecha) {
      notificar('Completa todos los campos obligatorios', 'error');
      return;
    }
    setEnviando(true);
    try {
      await citaApi.crear({ ...formulario, estado: 'Pendiente' });
      notificar('🎉 Cita agendada exitosamente');
      setFormulario({ clienteId: '', servicioId: '', estilistaId: '', fecha: '', hora: '' });
      navigate('/citas');
      refetch();
    } catch (err) {
      notificar(err.response?.data?.message || 'No se pudo agendar la cita', 'error');
    } finally {
      setEnviando(false);
    }
  }

  async function cancelarCita(cita) {
    try {
      await citaApi.actualizar(cita.id, { ...cita, estado: 'Cancelada' });
      notificar('Cita cancelada', 'info');
      refetch();
    } catch (err) {
      notificar('Error al cancelar la cita', 'error');
    }
  }

  return (
    <main className="page">
      <header className="page-header">
        <h1>Agenda de citas</h1>
      </header>

      <section className="citas-layout">
        <form className="form-cita" onSubmit={agendarCita}>
          <h2>Agendar nueva cita</h2>

          <label className="form-field">
            <span>Cliente</span>
            <select
              className="input"
              value={formulario.clienteId}
              onChange={(e) => setFormulario({ ...formulario, clienteId: e.target.value })}
            >
              <option value="">— Seleccionar cliente —</option>
              {clientes.map((c) => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </select>
          </label>

          <label className="form-field">
            <span>Servicio</span>
            <select
              className="input"
              value={formulario.servicioId}
              onChange={(e) => setFormulario({ ...formulario, servicioId: e.target.value })}
            >
              <option value="">— Seleccionar servicio —</option>
              {servicios.map((s) => (
                <option key={s.id} value={s.id}>{s.nombre}</option>
              ))}
            </select>
          </label>

          <label className="form-field">
            <span>Estilista</span>
            <select
              className="input"
              value={formulario.estilistaId}
              onChange={(e) => setFormulario({ ...formulario, estilistaId: e.target.value })}
            >
              <option value="">— Seleccionar estilista —</option>
              {estilistas.map((e) => (
                <option key={e.id} value={e.id}>{e.nombre}</option>
              ))}
            </select>
          </label>

          <label className="form-field">
            <span>Fecha</span>
            <input
              className="input"
              type="date"
              value={formulario.fecha}
              onChange={(e) => setFormulario({ ...formulario, fecha: e.target.value })}
            />
          </label>

          <label className="form-field">
            <span>Hora</span>
            <input
              className="input"
              type="time"
              value={formulario.hora}
              onChange={(e) => setFormulario({ ...formulario, hora: e.target.value })}
            />
          </label>

          <Button type="submit" variant="primario" loading={enviando}>
            Agendar cita ✨
          </Button>
        </form>

        <div className="citas-lista">
          {cargando ? (
            <p className="estado-carga">Cargando citas…</p>
          ) : citas.length === 0 ? (
            <div className="empty-state">
              <p>📭 No hay citas registradas.</p>
            </div>
          ) : (
            citas.map((cita) => (
              <CitaCard key={cita.id} cita={cita} onCancelar={cancelarCita} />
            ))
          )}
        </div>
      </section>
    </main>
  );
}