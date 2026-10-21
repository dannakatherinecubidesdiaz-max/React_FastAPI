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

## Backend de ejemplo con FastAPI

El backend FastAPI vive en `backend/` y puede ejecutarse junto al frontend.
Incluye CRUD para `Item`, SQLAlchemy con SQLite, esquemas de Pydantic v2 y CORS
para el origen de desarrollo de Vite (`http://localhost:5173`). La base de datos
`backend/items.db` se crea automáticamente al iniciar el servidor.

### Estructura del backend

```text
backend/
├── app/
│   ├── routers/
│   │   └── items.py      # Endpoints CRUD y documentación OpenAPI
│   ├── crud.py           # Consultas y operaciones de persistencia
│   ├── database.py       # Motor, Base declarativa y sesión reutilizable
│   ├── main.py           # FastAPI, CORS y registro de rutas
│   ├── models.py         # Modelo SQLAlchemy Item
│   └── schemas.py        # Validación y serialización Pydantic v2
└── requirements.txt
```

### Ejecutar FastAPI

Requiere Python 3.10 o superior. Desde la raíz del repositorio, en PowerShell:

```powershell
py -m venv backend\.venv
.\backend\.venv\Scripts\Activate.ps1
python -m pip install -r backend\requirements.txt
python -m uvicorn app.main:app --app-dir backend --reload --port 8000
```

La API queda disponible en `http://localhost:8000/api`; la documentación
interactiva de Swagger está en `http://localhost:8000/docs`.

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/api/items` | Crea un artículo (respuesta `201`) |
| `GET` | `/api/items` | Lista artículos; admite `skip` y `limit` |
| `GET` | `/api/items/{item_id}` | Obtiene un artículo por ID |
| `PUT` | `/api/items/{item_id}` | Reemplaza nombre, descripción y precio |
| `DELETE` | `/api/items/{item_id}` | Elimina un artículo (respuesta `204`) |

Las rutas por ID devuelven `404` cuando el artículo no existe. La creación y
actualización validan nombre (1–100 caracteres), descripción (hasta 500) y
precio no negativo.

Para consumir este ejemplo desde React con el cliente Axios existente, configura
`VITE_API_URL=http://localhost:8000/api` en el entorno del frontend y llama, por
ejemplo, a `api.get('/items')` o `api.post('/items', { name, description, price })`.
El `vite.config.js` actual conserva su proxy hacia Spring Boot; si se prefiere
usar ese proxy en lugar de llamar directamente a FastAPI, cambia su destino a
`http://localhost:8000`. No es necesario usar el proxy para el ejemplo porque
FastAPI ya permite CORS desde Vite.

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