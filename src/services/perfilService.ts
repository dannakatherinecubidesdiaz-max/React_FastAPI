import type { AxiosResponse } from 'axios';
import api from '../api/axios';
import type { CreateInput, Id, Perfil, UpdateInput } from '../types';

export const perfilService = {
  getAll: (): Promise<AxiosResponse<Perfil[]>> => api.get<Perfil[]>('/perfiles'),
  getById: (id: Id): Promise<AxiosResponse<Perfil>> => api.get<Perfil>(`/perfiles/${id}`),
  create: (data: CreateInput<Perfil>): Promise<AxiosResponse<Perfil>> => api.post<Perfil>('/perfiles', data),
  update: (id: Id, data: UpdateInput<Perfil>): Promise<AxiosResponse<Perfil>> => api.put<Perfil>(`/perfiles/${id}`, data),
  delete: (id: Id): Promise<AxiosResponse<void>> => api.delete<void>(`/perfiles/${id}`),
};

export default perfilService;