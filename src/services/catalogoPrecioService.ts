import type { AxiosResponse } from 'axios';
import api from '../api/axios';
import type { CatalogoPrecio, CreateInput, Id, UpdateInput } from '../types';

export const catalogoPrecioService = {
  getAll: (): Promise<AxiosResponse<CatalogoPrecio[]>> => api.get<CatalogoPrecio[]>('/catalogo-precios'),
  getById: (id: Id): Promise<AxiosResponse<CatalogoPrecio>> => api.get<CatalogoPrecio>(`/catalogo-precios/${id}`),
  create: (data: CreateInput<CatalogoPrecio>): Promise<AxiosResponse<CatalogoPrecio>> => api.post<CatalogoPrecio>('/catalogo-precios', data),
  update: (id: Id, data: UpdateInput<CatalogoPrecio>): Promise<AxiosResponse<CatalogoPrecio>> => api.put<CatalogoPrecio>(`/catalogo-precios/${id}`, data),
  delete: (id: Id): Promise<AxiosResponse<void>> => api.delete<void>(`/catalogo-precios/${id}`),
};

export default catalogoPrecioService;