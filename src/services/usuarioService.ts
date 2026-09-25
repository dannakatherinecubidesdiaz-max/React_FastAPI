import type { AxiosResponse } from 'axios';
import api from '../api/axios';
import type { CreateInput, Id, UpdateInput, Usuario } from '../types';

export const usuarioService = {
  getAll: (): Promise<AxiosResponse<Usuario[]>> => api.get<Usuario[]>('/usuarios'),
  getById: (id: Id): Promise<AxiosResponse<Usuario>> => api.get<Usuario>(`/usuarios/${id}`),
  create: (data: CreateInput<Usuario>): Promise<AxiosResponse<Usuario>> => api.post<Usuario>('/usuarios', data),
  update: (id: Id, data: UpdateInput<Usuario>): Promise<AxiosResponse<Usuario>> => api.put<Usuario>(`/usuarios/${id}`, data),
  delete: (id: Id): Promise<AxiosResponse<void>> => api.delete<void>(`/usuarios/${id}`),
};

export default usuarioService;