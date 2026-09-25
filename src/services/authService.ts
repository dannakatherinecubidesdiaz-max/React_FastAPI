import type { AxiosResponse } from 'axios';
import api from '../api/axios';
import type { AuthResponse, LoginRequest, RegistroRequest, Usuario } from '../types';

export const authService = {
  login: (credentials: LoginRequest): Promise<AxiosResponse<AuthResponse>> =>
    api.post<AuthResponse>('/auth/login', credentials),
  registro: (data: RegistroRequest): Promise<AxiosResponse<AuthResponse>> =>
    api.post<AuthResponse>('/auth/registro', data),
  perfil: (): Promise<AxiosResponse<Usuario>> => api.get<Usuario>('/auth/perfil'),
};

export default authService;