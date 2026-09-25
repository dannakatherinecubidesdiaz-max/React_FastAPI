import type { AxiosResponse } from 'axios';
import api from '../api/axios';
import type { CreateInput, Id, Notificacion, UpdateInput } from '../types';

export const notificacionService = {
  getAll: (): Promise<AxiosResponse<Notificacion[]>> => api.get<Notificacion[]>('/notificaciones'),
  getById: (id: Id): Promise<AxiosResponse<Notificacion>> => api.get<Notificacion>(`/notificaciones/${id}`),
  create: (data: CreateInput<Notificacion>): Promise<AxiosResponse<Notificacion>> => api.post<Notificacion>('/notificaciones', data),
  update: (id: Id, data: UpdateInput<Notificacion>): Promise<AxiosResponse<Notificacion>> => api.put<Notificacion>(`/notificaciones/${id}`, data),
  delete: (id: Id): Promise<AxiosResponse<void>> => api.delete<void>(`/notificaciones/${id}`),
};

export default notificacionService;