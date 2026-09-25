import type { AxiosResponse } from 'axios';
import api from '../api/axios';
import type { CreateInput, Id, SlotBloqueado, UpdateInput } from '../types';

export const slotBloqueadoService = {
  getAll: (): Promise<AxiosResponse<SlotBloqueado[]>> => api.get<SlotBloqueado[]>('/slots-bloqueados'),
  getById: (id: Id): Promise<AxiosResponse<SlotBloqueado>> => api.get<SlotBloqueado>(`/slots-bloqueados/${id}`),
  create: (data: CreateInput<SlotBloqueado>): Promise<AxiosResponse<SlotBloqueado>> => api.post<SlotBloqueado>('/slots-bloqueados', data),
  update: (id: Id, data: UpdateInput<SlotBloqueado>): Promise<AxiosResponse<SlotBloqueado>> => api.put<SlotBloqueado>(`/slots-bloqueados/${id}`, data),
  delete: (id: Id): Promise<AxiosResponse<void>> => api.delete<void>(`/slots-bloqueados/${id}`),
};

export default slotBloqueadoService;