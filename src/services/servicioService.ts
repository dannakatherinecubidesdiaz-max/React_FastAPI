import type { AxiosResponse } from 'axios';
import api from '../api/axios';
import type { CreateInput, Id, Servicio, UpdateInput } from '../types';

export const servicioService = {
  getAll: (): Promise<AxiosResponse<Servicio[]>> => api.get<Servicio[]>('/servicios'),
  getById: (id: Id): Promise<AxiosResponse<Servicio>> => api.get<Servicio>(`/servicios/${id}`),
  create: (data: CreateInput<Servicio>): Promise<AxiosResponse<Servicio>> => api.post<Servicio>('/servicios', data),
  update: (id: Id, data: UpdateInput<Servicio>): Promise<AxiosResponse<Servicio>> => api.put<Servicio>(`/servicios/${id}`, data),
  delete: (id: Id): Promise<AxiosResponse<void>> => api.delete<void>(`/servicios/${id}`),
};

export default servicioService;