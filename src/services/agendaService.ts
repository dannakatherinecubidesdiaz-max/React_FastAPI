import type { AxiosResponse } from 'axios';
import api from '../api/axios';
import type { Agenda, CreateInput, Id, UpdateInput } from '../types';

export const agendaService = {
  getAll: (): Promise<AxiosResponse<Agenda[]>> => api.get<Agenda[]>('/agenda'),
  getById: (id: Id): Promise<AxiosResponse<Agenda>> => api.get<Agenda>(`/agenda/${id}`),
  create: (data: CreateInput<Agenda>): Promise<AxiosResponse<Agenda>> => api.post<Agenda>('/agenda', data),
  update: (id: Id, data: UpdateInput<Agenda>): Promise<AxiosResponse<Agenda>> => api.put<Agenda>(`/agenda/${id}`, data),
  delete: (id: Id): Promise<AxiosResponse<void>> => api.delete<void>(`/agenda/${id}`),
};

export default agendaService;