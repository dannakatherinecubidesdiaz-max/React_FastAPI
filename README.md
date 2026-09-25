# Salon Glitt 💇‍♀️

Sistema de gestión front-end para **Salon Glitt**, un salón de belleza.
Consume una API REST construida con **Spring Boot** (puerto 31026).

## Stack tecnológico

- **React 19** + Vite 6
- React Router 7
- Axios (cliente HTTP hacia Spring Boot)

## Estructura del proyecto

```
salon-glitt/
├── public/                 # Estáticos directos (favicon, logo)
├── src/
│   ├── assets/             # Imágenes, iconos y fuentes procesadas
│   ├── components/         # Componentes UI reutilizables
│   │   ├── ui/             # Botones, Modales, Toasts, Skeletons
│   │   └── layout/         # Navbar, Footer
│   ├── context/            # AuthContext, ThemeContext, NotificationContext
│   ├── hooks/              # useFetch, useDebounce, useAuth
│   ├── pages/              # HomePage, ServiciosPage, CitasPage, ClientesPage
│   ├── api/                # Cliente Axios tipado e interceptores JWT
│   ├── services/           # Módulos CRUD tipados por recurso
│   ├── types/              # Interfaces TypeScript de los modelos REST
│   ├── App.jsx             # Enrutador principal y layout
│   ├── main.jsx            # Punto de montaje ReactDOM en #root
│   └── index.css           # Tokens de diseño y estilos globales
├── .env                    # VITE_API_URL (http://localhost:31026/api)
└── vite.config.js          # Configuración del empaquetador y Proxy
```

## ¿Cómo ejecutar?

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo (HMR activo)
npm run dev

# 3. Abrir en el navegador
# http://localhost:5173/
```

> Asegúrate de tener la API de Spring Boot corriendo en `http://localhost:31026/api`.

### Responsabilidad de cada carpeta

| Carpeta        | Responsabilidad |
|----------------|-----------------|
| `components/ui`| Botones, modales, toasts y skeletons reutilizables |
| `components/layout` | Barra de navegación y footer que envuelven las vistas |
| `pages`        | Vistas principales del enrutador (Servicios, Citas, Clientes) |
| `hooks`        | Lógica reutilizable con estado (fetch, debounce, auth) |
| `context`      | Estado global (autenticación, tema, notificaciones) |
| `api`          | Cliente Axios centralizado e interceptores JWT |
| `services`     | Comunicación con la API de Spring Boot (servicios CRUD) |
| `types`        | Interfaces y tipos compartidos de TypeScript |
| `assets`       | Recursos estáticos procesados por Vite |

### Capa REST tipada

El cliente central está en `src/api/axios.ts`. Lee `VITE_API_URL`, añade
automáticamente el token guardado en `localStorage` como `Authorization: Bearer
<token>` y limpia la sesión cuando la API responde `401`.

Cada recurso tiene un servicio en `src/services`, por ejemplo:

```ts
import { servicioService } from './services/servicioService';

const respuesta = await servicioService.getAll();
const servicio = await servicioService.getById(1);
```

Los modelos y los tipos reutilizables de creación y actualización están en
`src/types/index.ts`. Las rutas usan los nombres REST plurales del backend,
como `/servicios`, `/citas`, `/productos` y `/notificaciones`.