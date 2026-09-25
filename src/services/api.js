// Compatibilidad para las pantallas JavaScript existentes.
// El cliente y sus interceptores viven en api/axios.ts.
import api from '../api/axios';

// ─── Endpoints: Servicios del salón ───────────────────────────────
export const servicioApi = {
  listar: () => api.get('/servicios'),
  obtener: (id) => api.get(`/servicios/${id}`),
  crear: (datos) => api.post('/servicios', datos),
  actualizar: (id, datos) => api.put(`/servicios/${id}`, datos),
  eliminar: (id) => api.delete(`/servicios/${id}`),
};

// ─── Endpoints: Citas / Reservas ──────────────────────────────────
export const citaApi = {
  listar: () => api.get('/citas'),
  obtener: (id) => api.get(`/citas/${id}`),
  crear: (datos) => api.post('/citas', datos),
  actualizar: (id, datos) => api.put(`/citas/${id}`, datos),
  eliminar: (id) => api.delete(`/citas/${id}`),
  porCliente: (clienteId) => api.get(`/citas/cliente/${clienteId}`),
};

// ─── Endpoints: Clientes ──────────────────────────────────────────
export const clienteApi = {
  listar: () => api.get('/clientes'),
  obtener: (id) => api.get(`/clientes/${id}`),
  crear: (datos) => api.post('/clientes', datos),
  actualizar: (id, datos) => api.put(`/clientes/${id}`, datos),
  eliminar: (id) => api.delete(`/clientes/${id}`),
  buscar: (termino) => api.get(`/clientes/buscar?q=${termino}`),
};

// ─── Endpoints: Estilistas ────────────────────────────────────────
export const estilistaApi = {
  listar: () => api.get('/estilistas'),
  obtener: (id) => api.get(`/estilistas/${id}`),
  crear: (datos) => api.post('/estilistas', datos),
  actualizar: (id, datos) => api.put(`/estilistas/${id}`, datos),
  eliminar: (id) => api.delete(`/estilistas/${id}`),
};

// ─── Autenticación ────────────────────────────────────────────────
export const authApi = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  registro: (datos) => api.post('/auth/registro', datos),
  perfil: () => api.get('/auth/perfil'),
};

export default api;