import type { AxiosResponse } from 'axios';
import api from '../api/axios';
import type { CreateInput, Galeria, Id, UpdateInput } from '../types';

export const galeriaService = {
  getAll: (): Promise<AxiosResponse<Galeria[]>> => api.get<Galeria[]>('/galeria'),
  getById: (id: Id): Promise<AxiosResponse<Galeria>> => api.get<Galeria>(`/galeria/${id}`),
  create: (data: CreateInput<Galeria>): Promise<AxiosResponse<Galeria>> => api.post<Galeria>('/galeria', data),
  update: (id: Id, data: UpdateInput<Galeria>): Promise<AxiosResponse<Galeria>> => api.put<Galeria>(`/galeria/${id}`, data),
  delete: (id: Id): Promise<AxiosResponse<void>> => api.delete<void>(`/galeria/${id}`),
};

export default galeriaService;