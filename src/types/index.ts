export type Id = number | string;

export interface Perfil {
  id: Id;
  nombre: string;
  descripcion?: string;
  permisos?: string[];
}

export interface Usuario {
  id: Id;
  nombre: string;
  email: string;
  telefono?: string;
  activo?: boolean;
  perfil?: Perfil;
  perfilId?: Id;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegistroRequest {
  nombre: string;
  email: string;
  password: string;
  telefono?: string;
  perfilId?: Id;
}

export interface AuthResponse {
  token: string;
  usuario: Usuario;
}

export type EstadoCita = 'Pendiente' | 'Confirmada' | 'En proceso' | 'Cancelada' | 'Completada' | string;

export interface Cita {
  id: Id;
  clienteId: Id;
  servicioId: Id;
  estilistaId?: Id;
  agendaId?: Id;
  clienteNombre?: string;
  servicioNombre?: string;
  estilistaNombre?: string;
  fecha: string;
  hora: string;
  estado: EstadoCita;
  observaciones?: string;
  precio?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Agenda {
  id: Id;
  estilistaId?: Id;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  disponible?: boolean;
  citas?: Cita[];
}

export interface SlotBloqueado {
  id: Id;
  agendaId?: Id;
  estilistaId?: Id;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  motivo?: string;
}

export interface Servicio {
  id: Id;
  nombre: string;
  descripcion?: string;
  categoria?: string;
  duracionMin: number;
  precio: number;
  estilistaId?: Id;
  estilistaNombre?: string;
  activo?: boolean;
  productos?: ServicioProducto[];
}

export interface ServicioProducto {
  id: Id;
  servicioId: Id;
  productoId: Id;
  cantidad: number;
  producto?: Producto;
}

export interface CatalogoPrecio {
  id: Id;
  servicioId: Id;
  precio: number;
  fechaInicio: string;
  fechaFin?: string;
  activo?: boolean;
}

export interface Producto {
  id: Id;
  nombre: string;
  descripcion?: string;
  sku?: string;
  unidadMedida?: string;
  stockMinimo?: number;
  activo?: boolean;
}

export interface Proveedor {
  id: Id;
  nombre: string;
  contacto?: string;
  email?: string;
  telefono?: string;
  direccion?: string;
  activo?: boolean;
}

export interface ProductoProveedor {
  id: Id;
  productoId: Id;
  proveedorId: Id;
  codigoProveedor?: string;
  precioCompra?: number;
  proveedor?: Proveedor;
  producto?: Producto;
}

export interface Inventario {
  id: Id;
  productoId: Id;
  cantidad: number;
  tipoMovimiento?: 'ENTRADA' | 'SALIDA' | 'AJUSTE' | string;
  motivo?: string;
  fecha?: string;
  producto?: Producto;
}

export interface Galeria {
  id: Id;
  titulo?: string;
  descripcion?: string;
  url: string;
  tipo?: string;
  orden?: number;
  activo?: boolean;
}

export interface Recordatorio {
  id: Id;
  citaId?: Id;
  usuarioId?: Id;
  fechaProgramada: string;
  enviado?: boolean;
  canal?: 'EMAIL' | 'SMS' | 'WHATSAPP' | string;
  mensaje?: string;
}

export interface Notificacion {
  id: Id;
  usuarioId?: Id;
  titulo: string;
  mensaje: string;
  leida?: boolean;
  tipo?: string;
  createdAt?: string;
}

export type CreateInput<T extends { id: Id }> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateInput<T extends { id: Id }> = Partial<CreateInput<T>>;