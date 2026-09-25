import type { AxiosResponse } from 'axios';
import api from '../api/axios';
import type { CreateInput, Id, ProductoProveedor, UpdateInput } from '../types';

export const productoProveedorService = {
  getAll: (): Promise<AxiosResponse<ProductoProveedor[]>> => api.get<ProductoProveedor[]>('/producto-proveedores'),
  getById: (id: Id): Promise<AxiosResponse<ProductoProveedor>> => api.get<ProductoProveedor>(`/producto-proveedores/${id}`),
  create: (data: CreateInput<ProductoProveedor>): Promise<AxiosResponse<ProductoProveedor>> => api.post<ProductoProveedor>('/producto-proveedores', data),
  update: (id: Id, data: UpdateInput<ProductoProveedor>): Promise<AxiosResponse<ProductoProveedor>> => api.put<ProductoProveedor>(`/producto-proveedores/${id}`, data),
  delete: (id: Id): Promise<AxiosResponse<void>> => api.delete<void>(`/producto-proveedores/${id}`),
};

export default productoProveedorService;