import type { AxiosResponse } from 'axios';
import api from '../api/axios';
import type { Cita, CreateInput, Id, UpdateInput } from '../types';

export const citaService = {
  getAll: (): Promise<AxiosResponse<Cita[]>> => api.get<Cita[]>('/citas'),
  getById: (id: Id): Promise<AxiosResponse<Cita>> => api.get<Cita>(`/citas/${id}`),
  create: (data: CreateInput<Cita>): Promise<AxiosResponse<Cita>> => api.post<Cita>('/citas', data),
  update: (id: Id, data: UpdateInput<Cita>): Promise<AxiosResponse<Cita>> => api.put<Cita>(`/citas/${id}`, data),
  delete: (id: Id): Promise<AxiosResponse<void>> => api.delete<void>(`/citas/${id}`),
  getByCliente: (clienteId: Id): Promise<AxiosResponse<Cita[]>> => api.get<Cita[]>(`/citas/cliente/${clienteId}`),
};

export default citaService;