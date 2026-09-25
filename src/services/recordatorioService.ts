import type { AxiosResponse } from 'axios';
import api from '../api/axios';
import type { CreateInput, Id, Recordatorio, UpdateInput } from '../types';

export const recordatorioService = {
  getAll: (): Promise<AxiosResponse<Recordatorio[]>> => api.get<Recordatorio[]>('/recordatorios'),
  getById: (id: Id): Promise<AxiosResponse<Recordatorio>> => api.get<Recordatorio>(`/recordatorios/${id}`),
  create: (data: CreateInput<Recordatorio>): Promise<AxiosResponse<Recordatorio>> => api.post<Recordatorio>('/recordatorios', data),
  update: (id: Id, data: UpdateInput<Recordatorio>): Promise<AxiosResponse<Recordatorio>> => api.put<Recordatorio>(`/recordatorios/${id}`, data),
  delete: (id: Id): Promise<AxiosResponse<void>> => api.delete<void>(`/recordatorios/${id}`),
};

export default recordatorioService;