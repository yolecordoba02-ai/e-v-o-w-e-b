# EvoWeb — Fundación

Este repositorio contiene la base de la fundación de EvoWeb según el prompt `PROMPTS_EVOWEB_FUNDACION.md`.

## Qué se ha creado

- Proyecto Next.js con `src/` y App Router.
- Diseño base y layout global con identidad bridge.
- Rutas stub para `page.tsx`, `timeline`, `era/web10`, `era/web20`, `mainframe`, `admin/*`.
- Servicios de datos en `src/lib/` y rutas API básicas para `system`, `auth`, `posts`.
- Migraciones en `supabase/migrations/` y seed en `data/seed.json`.
- Componentes UI y shared mínimos para la fundación.

## Instalación

Copiar `.env.example` a `.env.local` y completar las variables de entorno.

Luego ejecutar:

```bash
npm install
npm run dev
```

## Nota

La instalación de dependencias puede requerir ejecutar `npm` desde un terminal con permisos adecuados en Windows si hay políticas de ejecución de PowerShell.
