import type { AxiosResponse } from 'axios';
import api from '../api/axios';
import type { CreateInput, Id, Inventario, UpdateInput } from '../types';

export const inventarioService = {
  getAll: (): Promise<AxiosResponse<Inventario[]>> => api.get<Inventario[]>('/inventario'),
  getById: (id: Id): Promise<AxiosResponse<Inventario>> => api.get<Inventario>(`/inventario/${id}`),
  create: (data: CreateInput<Inventario>): Promise<AxiosResponse<Inventario>> => api.post<Inventario>('/inventario', data),
  update: (id: Id, data: UpdateInput<Inventario>): Promise<AxiosResponse<Inventario>> => api.put<Inventario>(`/inventario/${id}`, data),
  delete: (id: Id): Promise<AxiosResponse<void>> => api.delete<void>(`/inventario/${id}`),
};

export default inventarioService;