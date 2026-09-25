import type { AxiosResponse } from 'axios';
import api from '../api/axios';
import type { CreateInput, Id, Producto, UpdateInput } from '../types';

export const productoService = {
  getAll: (): Promise<AxiosResponse<Producto[]>> => api.get<Producto[]>('/productos'),
  getById: (id: Id): Promise<AxiosResponse<Producto>> => api.get<Producto>(`/productos/${id}`),
  create: (data: CreateInput<Producto>): Promise<AxiosResponse<Producto>> => api.post<Producto>('/productos', data),
  update: (id: Id, data: UpdateInput<Producto>): Promise<AxiosResponse<Producto>> => api.put<Producto>(`/productos/${id}`, data),
  delete: (id: Id): Promise<AxiosResponse<void>> => api.delete<void>(`/productos/${id}`),
};

export default productoService;