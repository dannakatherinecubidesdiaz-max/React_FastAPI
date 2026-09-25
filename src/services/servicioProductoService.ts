import type { AxiosResponse } from 'axios';
import api from '../api/axios';
import type { CreateInput, Id, ServicioProducto, UpdateInput } from '../types';

export const servicioProductoService = {
  getAll: (): Promise<AxiosResponse<ServicioProducto[]>> => api.get<ServicioProducto[]>('/servicio-productos'),
  getById: (id: Id): Promise<AxiosResponse<ServicioProducto>> => api.get<ServicioProducto>(`/servicio-productos/${id}`),
  create: (data: CreateInput<ServicioProducto>): Promise<AxiosResponse<ServicioProducto>> => api.post<ServicioProducto>('/servicio-productos', data),
  update: (id: Id, data: UpdateInput<ServicioProducto>): Promise<AxiosResponse<ServicioProducto>> => api.put<ServicioProducto>(`/servicio-productos/${id}`, data),
  delete: (id: Id): Promise<AxiosResponse<void>> => api.delete<void>(`/servicio-productos/${id}`),
};

export default servicioProductoService;