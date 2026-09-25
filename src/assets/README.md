# assets/

Recursos procesados por Vite: imágenes, iconos y fuentes del salón.

- Los archivos importados desde aquí (`import logo from '../assets/logo.png'`)
  pasan por el pipeline de optimización y reciben un hash en producción.
- Los estáticos que no necesiten procesamiento van en `public/`. (Mismo lugar para mejorar renderizacion y velocidad)

Sugerencia de estructura:

```
assets/
├── images/     # Fotografías de servicios, salón y equipo
├── icons/      # Íconos SVG propios
└── fonts/      # Tipografías locales (si no se usan Google Fonts)
```

> Para importar: `import logoGlitt from '../assets/icons/logo-glitt.png'`