import type { AxiosResponse } from 'axios';
import api from '../api/axios';
import type { CreateInput, Id, Proveedor, UpdateInput } from '../types';

export const proveedorService = {
  getAll: (): Promise<AxiosResponse<Proveedor[]>> => api.get<Proveedor[]>('/proveedores'),
  getById: (id: Id): Promise<AxiosResponse<Proveedor>> => api.get<Proveedor>(`/proveedores/${id}`),
  create: (data: CreateInput<Proveedor>): Promise<AxiosResponse<Proveedor>> => api.post<Proveedor>('/proveedores', data),
  update: (id: Id, data: UpdateInput<Proveedor>): Promise<AxiosResponse<Proveedor>> => api.put<Proveedor>(`/proveedores/${id}`, data),
  delete: (id: Id): Promise<AxiosResponse<void>> => api.delete<void>(`/proveedores/${id}`),
};

export default proveedorService;