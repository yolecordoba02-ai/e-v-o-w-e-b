# EvoWeb — Plan Maestro del Sistema
> Evolución de la Web 1.0 a 2.0 — Repositorio Pedagógico Interactivo | Versión 1.0
> Proyecto de Grado | Mayo 2026
> Stack: Next.js + TypeScript + Supabase Postgres + Three.js (R3F) + Vercel
> Equipo: 3 estudiantes (Estudiante A · Estudiante B · Estudiante C)
> Universidad Sergio Arboleda — Diseño Digital, Santa Marta
> Asignatura vinculada: Narrativas Digitales

---

## El concepto que distingue este proyecto

EvoWeb no es solo un blog *sobre* la evolución de la web. Es un sitio que **encarna** esa evolución en su propia estética y arquitectura. Tres experiencias distintas conectadas por un timeline:

1. **Web 1.0** — Estética retro genuina (Times New Roman, GIFs, contadores de visitas, "bajo construcción"). El estudiante experimenta la linealidad y la rigidez del medio.
2. **Web 2.0** — Estética moderna (animaciones, comentarios en vivo, reacciones). Demuestra la colaboración y participación que define la era.
3. **Sala VR del Mainframe** — Experiencia inmersiva tridimensional que sumerge al estudiante en la pre-historia de la web: tarjetas perforadas, terminales de texto, cintas magnéticas. El origen físico de todo lo que vino después.

El sitio enseña por inmersión: el visitante no lee sobre la diferencia entre eras — la siente cambiando de estética al navegar.

---

## Índice General

1. [Definición del sistema](#1-definición-del-sistema)
2. [Actores del sistema](#2-actores-del-sistema)
3. [Roles y permisos](#3-roles-y-permisos)
4. [Casos de uso](#4-casos-de-uso)
5. [Requerimientos funcionales](#5-requerimientos-funcionales)
6. [Reglas de negocio](#6-reglas-de-negocio)
7. [Stack tecnológico](#7-stack-tecnológico)
8. [Arquitectura de persistencia](#8-arquitectura-de-persistencia)
9. [Bootstrap y migrations](#9-bootstrap-y-migrations)
10. [Capa de datos unificada (dataService)](#10-capa-de-datos-unificada)
11. [Modelo de datos — Supabase Postgres](#11-modelo-de-datos--supabase-postgres)
12. [La sala VR del Mainframe](#12-la-sala-vr-del-mainframe)
13. [Identidad visual dual: Web 1.0 vs Web 2.0](#13-identidad-visual-dual)
14. [Arquitectura de rutas](#14-arquitectura-de-rutas)
15. [Inventario de pantallas y propiedad por stream](#15-inventario)
16. [Stream A — Timeline histórico + Web 1.0 (Estudiante A)](#16-stream-a)
17. [Stream B — Web 2.0 + Sistema de comentarios (Estudiante B)](#17-stream-b)
18. [Stream C — Sala VR del Mainframe + Panel Admin (Estudiante C)](#18-stream-c)
19. [Plan de trabajo y protocolo sin conflictos](#19-protocolo)
20. [Glosario](#20-glosario)

---

## 1. Definición del sistema

**EvoWeb** es una aplicación web pedagógica que documenta y demuestra la evolución de la Web desde sus orígenes en los mainframes hasta la era de la web colaborativa. Está dirigida a estudiantes de Diseño Digital de la asignatura **Narrativas Digitales** y a cualquier visitante interesado en la historia técnica y estética del internet.

El sistema combina tres tipos de contenido:

- **Posts pedagógicos** organizados por hito cronológico, con texto, imágenes históricas y casos de estudio.
- **Una línea de tiempo interactiva** que conecta los hitos de 1991 a hoy.
- **Una sala VR del mainframe** que permite sumergirse en la era pre-web a través de WebXR.

Los visitantes pueden leer, comentar, reaccionar y explorar la sala VR sin necesidad de registrarse. El profesor (admin) gestiona el contenido desde un panel privado.

---

## 2. Actores del sistema

| Actor | Tipo | Descripción |
|---|---|---|
| **Visitante** | Externo | Estudiante de la asignatura o visitante general. Lee posts, recorre el timeline, comenta, reacciona y explora la sala VR. Identidad: nombre + email para comentar (sin cuenta). |
| **Admin** | Interno | Profesor o autor del proyecto. Gestiona posts, modera comentarios y administra el contenido del repositorio. |
| **Sistema** | No humano | Sirve el contenido, gestiona los comentarios y reacciones, registra auditoría de operaciones del admin. |

> No hay registro público con login. Los comentarios solo requieren nombre y email (que se usa internamente y para mostrar avatar de Gravatar).

---

## 3. Roles y permisos

| Recurso / Acción | Visitante | Admin |
|---|:-:|:-:|
| Login de admin | ❌ | ✅ |
| Acceder a `/admin/db-setup` | ❌ | ✅ |
| **CONTENIDO PÚBLICO** | | |
| Ver landing y timeline | ✅ | ✅ |
| Ver posts de Web 1.0 / Web 2.0 | ✅ | ✅ |
| Ingresar a la sala VR del Mainframe | ✅ | ✅ |
| Comentar en un post | ✅ (con nombre y email) | ✅ |
| Reaccionar a un post | ✅ (anónimo por device_id) | ✅ |
| **GESTIÓN DE POSTS** | | |
| Crear / editar / eliminar posts | ❌ | ✅ |
| Cambiar estado (borrador / publicado) | ❌ | ✅ |
| **MODERACIÓN** | | |
| Eliminar un comentario | ❌ | ✅ |
| Marcar comentario como destacado | ❌ | ✅ |
| **AUDITORÍA** | | |
| Ver bitácora de operaciones del admin | ❌ | ✅ |

---

## 4. Casos de uso

### Visitante

| ID | Caso de uso | Descripción |
|---|---|---|
| CU-01 | Ver landing | Página de bienvenida con introducción al proyecto y entrada a las tres experiencias. |
| CU-02 | Recorrer timeline | Línea de tiempo interactiva con scroll horizontal/vertical. Cada hito (1991, 1995, 1999, 2004…) abre un post detallado. |
| CU-03 | Leer post de Web 1.0 | Post en estética retro (Times New Roman, GIFs animados, contador de visitas). |
| CU-04 | Leer post de Web 2.0 | Post en estética moderna con elementos interactivos. |
| CU-05 | Entrar a la sala VR del Mainframe | Experiencia 3D inmersiva con WebXR. Funciona también en navegador sin headset (modo orbital). |
| CU-06 | Comentar un post | Formulario con nombre, email y texto. El email no se muestra públicamente; sirve para Gravatar. |
| CU-07 | Reaccionar a un post | Botón de "me gusta" o "interesante" sin necesidad de cuenta. Persistido por device_id. |
| CU-08 | Compartir un post | Botón "Compartir" que copia la URL al portapapeles. |

### Admin

| ID | Caso de uso | Descripción |
|---|---|---|
| CU-A1 | Iniciar sesión | Email y contraseña. JWT en cookie HttpOnly. |
| CU-A2 | Crear post | Formulario con título, slug, era (web10/web20/general), año cronológico, contenido en Markdown, imagen de portada y estado (borrador/publicado). |
| CU-A3 | Editar post | Modifica cualquier campo del post. |
| CU-A4 | Eliminar post | Borra el post y sus comentarios asociados. Confirmación obligatoria. |
| CU-A5 | Listar comentarios | Vista agregada de todos los comentarios con filtro por post. |
| CU-A6 | Eliminar comentario | Borra un comentario. Útil para moderación. |
| CU-A7 | Destacar comentario | Marca un comentario como destacado (aparece arriba con badge especial). |

---

## 5. Requerimientos funcionales

| ID | Requerimiento |
|---|---|
| RF-B1 | El sistema debe poder ejecutarse sin Supabase configurado, sirviendo el seed de `data/` para mostrar posts de ejemplo iniciales. |
| RF-B2 | El sistema debe ofrecer `/admin/db-setup` con secreto para diagnóstico, migrations y seed. |
| RF-01 | El sistema muestra una landing con introducción al proyecto y enlaces a las tres experiencias (Timeline, Web 1.0, Web 2.0, Sala VR). |
| RF-02 | El sistema muestra una línea de tiempo interactiva con los hitos cronológicos de la evolución de la web. |
| RF-03 | El sistema renderiza posts con dos estilos visuales claramente diferenciados según la era (Web 1.0 retro / Web 2.0 moderno). |
| RF-04 | El sistema ofrece una sala VR del mainframe accesible desde el menú principal, compatible con WebXR y con fallback a vista 3D orbital en navegador. |
| RF-05 | El sistema permite a los visitantes dejar comentarios en los posts proporcionando nombre y correo electrónico. |
| RF-06 | El sistema permite a los visitantes reaccionar a un post con un toque (sin cuenta), persistiendo por device_id. |
| RF-07 | El sistema permite al admin crear, editar y eliminar posts. |
| RF-08 | El sistema permite al admin cambiar el estado del post entre borrador y publicado. Solo los publicados son visibles al público. |
| RF-09 | El sistema permite al admin moderar comentarios (eliminar, destacar). |
| RF-10 | El sistema mantiene una bitácora de auditoría de las operaciones del admin. |

---

## 6. Reglas de negocio

| ID | Regla | Implementación técnica |
|---|---|---|
| RN-01 | Solo los posts en estado `publicado` son visibles al público. Los borradores solo los ve el admin. | Filtro `WHERE status='published'` en queries públicas. |
| RN-02 | El slug del post debe ser único y URL-friendly (solo letras minúsculas, números y guiones). | UNIQUE en `posts.slug`, validación con Zod regex. |
| RN-03 | Cada post pertenece a una de tres eras: `web10`, `web20`, o `general`. La era determina la estética con que se renderiza. | CHECK en Postgres + enum en TypeScript. |
| RN-04 | Un visitante puede comentar sin cuenta proporcionando nombre y email. El email NO se muestra públicamente. | Campo `email` no se serializa en respuestas públicas. |
| RN-05 | Un visitante puede reaccionar a un post solo una vez. La identidad del visitante para reacciones es `device_id` (UUID en localStorage). | UNIQUE en `reactions(post_id, device_id)`. |
| RN-06 | Eliminar un post borra automáticamente todos sus comentarios y reacciones (cascade). | `ON DELETE CASCADE` en las foreign keys. |
| RN-07 | El admin no puede eliminar la cuenta de admin que está usando para iniciar sesión. | Verificar `userId !== JWT.userId` antes de eliminar. |
| RN-08 | La auditoría registra toda operación del admin con timestamp, action y entity_id. | `recordAudit()` en cada endpoint del admin. |
| RN-09 | Los comentarios destacados aparecen al inicio de la lista, con un badge visible. Solo el admin puede destacar. | Campo `is_featured` boolean + ORDER BY. |

---

## 7. Stack tecnológico

| Capa | Tecnología | Versión | Propósito |
|---|---|---|---|
| Framework | Next.js (App Router) | 16.x | Rutas, server components, API routes |
| Lenguaje | TypeScript | 5.x | Tipado estático |
| UI | React | 19.x | Componentes del cliente |
| Estilos | Tailwind CSS | 4.x | Utilidades para Web 2.0 |
| CSS retro | CSS modules | — | Estilos auténticos de Web 1.0 (Times, table layouts) |
| Animaciones | Framer Motion | 12.x | Web 2.0, timeline scroll |
| **3D / VR** | **React Three Fiber** | 9.x | Sala VR del Mainframe |
| **VR** | **@react-three/xr** | 6.x | Soporte WebXR en navegadores compatibles |
| 3D utils | @react-three/drei | 9.x | OrbitControls, Text 3D, Environment |
| 3D | three | 0.169.x | Motor 3D base |
| Markdown | `next-mdx-remote` o `marked` | — | Renderizar contenido de posts |
| Validación | Zod | 4.x | Validación servidor y cliente |
| Autenticación admin | JWT (jose) + bcryptjs | — | Sesión del admin |
| Base de datos | Supabase Postgres | — | Posts, comentarios, reacciones, usuarios |
| Cliente DB (migrations) | `pg` (node-postgres) | 8.x | SQL crudo desde bootstrap |
| Cliente DB (queries) | `@supabase/supabase-js` | 2.x | Queries del día a día |
| Storage de imágenes | Vercel Blob | — | Imágenes de portada de posts |
| Auditoría | `@vercel/blob` | — | Logs append-only del admin |
| Iconos | Lucide React | — | Iconografía moderna |
| Fuentes | next/font | — | Times New Roman (Web 1.0), Inter + Plus Jakarta (Web 2.0) |
| Deploy | Vercel | — | Hosting serverless |

### Variables de entorno requeridas

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=
BLOB_READ_WRITE_TOKEN=
JWT_SECRET=
ADMIN_BOOTSTRAP_SECRET=
```

---

## 8. Arquitectura de persistencia

### 8.1 Destinos de persistencia

| Destino | Qué guarda | Por qué |
|---|---|---|
| **Supabase Postgres** | Usuarios admin, posts, comentarios, reacciones. | SQL para consultas filtradas por era, búsqueda, agregaciones. |
| **Vercel Blob (público)** | Imágenes de portada de posts. | URL públicas accesibles directamente desde `<img src>`. |
| **Vercel Blob (privado)** | Auditoría del admin (`audit/<YYYYMM>.json`). | Logs append-only. |
| **`data/` en el repo** | Seed: admin + posts iniciales pedagógicos. | Read-only. Solo para arrancar antes del bootstrap. |

### 8.2 Reglas de oro

1. **`dataService.ts` es el ÚNICO punto de acceso a datos en el servidor.**
2. **Imágenes en Blob público** → URL accesible sin autenticación.
3. **Reacciones por device_id** — sin login, identidad por UUID en localStorage.
4. **Comentarios sin cuenta** — nombre y email son los únicos datos identificadores.
5. **CERO caché** en `/api/:path*`. Headers `no-store`.
6. **`get()` del SDK de Blob, nunca `fetch(url)`** para auditoría.
7. **Token de Blob accedido con función lazy** (`getBlobToken()`).

---

## 9. Bootstrap y migrations

### 9.1 Estructura de `data/`

```
data/
  config.json     ← { "version": "1.0", "system_name": "EvoWeb" }
  seed.json       ← {
                      "users": [{
                        email: "admin@evoweb.edu.co",
                        password_hash: "<bcrypt admin123>",
                        name: "Administrador",
                        role: "admin"
                      }],
                      "posts": [
                        { slug: "1989-tim-berners-lee", title: "1989: Tim Berners-Lee y la propuesta del WWW",
                          era: "general", year: 1989, status: "published",
                          excerpt: "El origen de la web en el CERN..." },
                        { slug: "1991-primera-pagina-web", title: "1991: La primera página web",
                          era: "web10", year: 1991, status: "published" },
                        { slug: "1996-geocities", title: "1996: GeoCities y la web del usuario",
                          era: "web10", year: 1996, status: "published" },
                        { slug: "1999-blogger", title: "1999: Blogger y el inicio del blogging",
                          era: "web10", year: 1999, status: "published" },
                        { slug: "2004-conferencia-web2", title: "2004: La Conferencia Web 2.0",
                          era: "web20", year: 2004, status: "published" },
                        { slug: "2005-youtube", title: "2005: YouTube y la democratización del video",
                          era: "web20", year: 2005, status: "published" },
                        { slug: "2006-twitter", title: "2006: Twitter y los microposts",
                          era: "web20", year: 2006, status: "published" }
                      ]
                    }
  README.md
```

### 9.2 Estructura de `supabase/migrations/`

```
supabase/migrations/
  0001_init_users.sql        ← Fase 1: users (admin) + _migrations
  0002_init_posts.sql        ← Fase 1: posts
  0003_init_comments.sql     ← Fase 1: comments
  0004_init_reactions.sql    ← Fase 1: reactions
```

---

## 10. Capa de datos unificada

`lib/dataService.ts` es el **único punto de acceso a datos en el servidor**.

```typescript
// Sistema
export async function getSystemMode(): Promise<'seed' | 'live'>

// Auth (admin)
export async function getUserByEmail(email: string): Promise<User | null>
export async function getUserById(id: string): Promise<User | null>

// Posts
export async function getPublishedPosts(filters?: { era?: 'web10' | 'web20' | 'general' }): Promise<Post[]>
export async function getPostBySlug(slug: string): Promise<PostWithStats | null>
// PostWithStats incluye reactionCount y commentCount
export async function getTimelinePosts(): Promise<Post[]>  // ordenados por year ASC
export async function getAllPosts(): Promise<Post[]>  // admin: incluye borradores
export async function createPost(userId: string, data: CreatePostRequest): Promise<Post>
export async function updatePost(id: string, userId: string, data: UpdatePostRequest): Promise<Post>
export async function deletePost(id: string, userId: string): Promise<void>

// Comentarios
export async function getCommentsByPost(postId: string): Promise<Comment[]>
// Ordenados: destacados primero, luego por fecha DESC
export async function createComment(data: CreateCommentRequest): Promise<Comment>
export async function deleteComment(id: string, userId: string): Promise<void>
export async function toggleFeaturedComment(id: string, userId: string): Promise<Comment>

// Reacciones
export async function reactToPost(postId: string, deviceId: string): Promise<{ liked: boolean; total: number }>
// Toggle: si ya existe la reacción del device → la elimina (unlike). Si no → la crea.
export async function getReactionsByPost(postId: string): Promise<{ total: number; reactedByDevice: boolean }>

// Imágenes (Blob público)
export async function uploadPostCover(postId: string, file: Buffer, mimeType: string): Promise<string>
// Retorna la URL pública del Blob

// Auditoría
export async function recordAudit(entry: AuditEntry): Promise<void>
export async function readAuditMonth(yyyymm: string): Promise<AuditEntry[]>
```

---

## 11. Modelo de datos — Supabase Postgres

### Migration `0001_init_users.sql`

```sql
CREATE TABLE IF NOT EXISTS users (
  id                   UUID         DEFAULT gen_random_uuid() PRIMARY KEY,
  name                 VARCHAR(100) NOT NULL,
  email                VARCHAR(255) UNIQUE NOT NULL,
  password_hash        TEXT         NOT NULL,
  role                 VARCHAR(15)  NOT NULL DEFAULT 'admin'
                       CHECK (role IN ('admin')),
  is_active            BOOLEAN      DEFAULT true,
  must_change_password BOOLEAN      DEFAULT false,
  last_login_at        TIMESTAMPTZ,
  created_at           TIMESTAMPTZ  DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

CREATE TABLE IF NOT EXISTS _migrations (
  id         SERIAL       PRIMARY KEY,
  filename   VARCHAR(255) UNIQUE NOT NULL,
  applied_at TIMESTAMPTZ  DEFAULT NOW()
);
```

### Migration `0002_init_posts.sql`

```sql
CREATE TABLE IF NOT EXISTS posts (
  id              UUID         DEFAULT gen_random_uuid() PRIMARY KEY,
  slug            VARCHAR(150) UNIQUE NOT NULL,                    -- RN-02
  title           VARCHAR(200) NOT NULL,
  era             VARCHAR(10)  NOT NULL CHECK (era IN ('web10', 'web20', 'general')),  -- RN-03
  year            INTEGER      NOT NULL CHECK (year >= 1960 AND year <= 2030),
  excerpt         TEXT,
  content         TEXT         NOT NULL DEFAULT '',
  cover_image_url TEXT,        -- URL pública del Blob
  status          VARCHAR(15)  NOT NULL DEFAULT 'draft'
                  CHECK (status IN ('draft', 'published')),         -- RN-01
  created_by      UUID         REFERENCES users(id) ON DELETE SET NULL,
  published_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ  DEFAULT NOW(),
  updated_at      TIMESTAMPTZ  DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_posts_slug    ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_era     ON posts(era, status);
CREATE INDEX IF NOT EXISTS idx_posts_year    ON posts(year);
CREATE INDEX IF NOT EXISTS idx_posts_status  ON posts(status, published_at DESC);
```

### Migration `0003_init_comments.sql`

```sql
CREATE TABLE IF NOT EXISTS comments (
  id           UUID         DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id      UUID         NOT NULL REFERENCES posts(id) ON DELETE CASCADE,  -- RN-06
  author_name  VARCHAR(100) NOT NULL,
  author_email VARCHAR(255) NOT NULL,                             -- RN-04: NO se serializa al público
  content      TEXT         NOT NULL CHECK (LENGTH(content) >= 1 AND LENGTH(content) <= 2000),
  is_featured  BOOLEAN      DEFAULT false,                         -- RN-09
  created_at   TIMESTAMPTZ  DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_comments_post     ON comments(post_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_featured ON comments(post_id, is_featured DESC, created_at DESC);
```

### Migration `0004_init_reactions.sql`

```sql
CREATE TABLE IF NOT EXISTS reactions (
  id         UUID         DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id    UUID         NOT NULL REFERENCES posts(id) ON DELETE CASCADE,  -- RN-06
  device_id  VARCHAR(64)  NOT NULL,                                 -- UUID del dispositivo
  created_at TIMESTAMPTZ  DEFAULT NOW(),
  UNIQUE (post_id, device_id)                                       -- RN-05
);

CREATE INDEX IF NOT EXISTS idx_reactions_post ON reactions(post_id);
```

---

## 12. La sala VR del Mainframe

### 12.1 Concepto pedagógico

El mainframe es el ancestro físico de la web. Antes de las páginas, los hipervínculos y los navegadores, había salas refrigeradas con armarios de metal, terminales de texto monocromáticas, cintas magnéticas girando y operadores en bata blanca insertando tarjetas perforadas. **Sumergir al estudiante en ese entorno** explica visualmente algo que el texto no puede: la web actual heredó conceptos de allí (procesamiento por lotes, terminales, almacenamiento secuencial).

### 12.2 Diseño 3D de la sala

La sala se construye con **primitivas de Three.js** (BoxGeometry, CylinderGeometry, etc.), no con modelos GLB importados. Esto mantiene el bundle ligero y le da estilo low-poly coherente con la era.

**Elementos de la escena:**

| Elemento | Implementación |
|---|---|
| **Piso** | PlaneGeometry grande (20×20m) con material de baldosa cuadriculada (textura procedural o mesh). |
| **Paredes y techo** | BoxGeometry hueco. Color: gris claro `#D4D4D4`. Iluminación tenue. |
| **Mainframe principal** | Conjunto de 5–6 BoxGeometry verticales (armarios) con luces LED parpadeantes. Color: beige institucional `#C8B89A`. Cada armario tiene paneles con luces rojas y verdes (esferas pequeñas con MeshStandardMaterial emissive). |
| **Terminal de operador** | Mesa + monitor CRT (BoxGeometry con pantalla CanvasTexture mostrando texto verde sobre fondo negro). |
| **Cintas magnéticas** | Dos CylinderGeometry rotando lentamente sobre cada armario. |
| **Tarjetas perforadas** | Pila de planos delgados sobre la mesa. Interactivas: hover → rotación + tooltip con info histórica. |
| **Iluminación** | DirectionalLight tenue + 3 PointLight cálidos para evocar tubos fluorescentes de los 60s. |
| **Texto flotante** | `<Text>` de @react-three/drei con explicaciones de cada elemento al acercarse. |
| **Audio ambiental** | Loop suave del zumbido del mainframe (asset opcional, controlable con botón mute). |

### 12.3 Modos de visualización

| Modo | Cómo se activa | Controles |
|---|---|---|
| **VR** | Usuario tiene headset (Quest, Vive) y hace clic en "Entrar a VR" | Joysticks: caminar, agarrar tarjetas |
| **3D Orbital** | Modo por defecto en navegador sin VR | Mouse: rotar cámara con OrbitControls de drei |
| **Touch** | Móvil sin VR | Drag para rotar, pellizcar para zoom |

### 12.4 Elementos interactivos

- **Tarjetas perforadas:** al hacer click/tocar, se elevan y muestran un texto explicativo.
- **Terminal CRT:** muestra una "sesión" con prompts y comandos antiguos (FORTRAN, COBOL).
- **Botón "Volver a la web 2.0":** un portal flotante que regresa al sitio principal con animación de transición.

### 12.5 Implementación técnica

```typescript
// app/mainframe/page.tsx — 'use client'

import { Canvas } from '@react-three/fiber';
import { XR, VRButton, Controllers } from '@react-three/xr';
import { OrbitControls, Environment } from '@react-three/drei';
import { MainframeScene } from '@/components/mainframe/MainframeScene';

export default function MainframePage() {
  return (
    <>
      <VRButton />
      <Canvas camera={{ position: [0, 1.6, 5], fov: 70 }}>
        <XR>
          <Controllers />
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 10, 5]} intensity={0.8} color="#FFE9C4" />
          <MainframeScene />
          <OrbitControls enablePan={false} />
        </XR>
      </Canvas>
    </>
  );
}
```

> **Nota:** el componente `MainframeScene` y todos sus subcomponentes son responsabilidad del Estudiante C en el Stream C.

---

## 13. Identidad visual dual

### 13.1 Tema Web 1.0 — "El internet que era"

| Elemento | Especificación |
|---|---|
| **Fuente principal** | `Times New Roman, serif` (sí, real) |
| **Tamaño base** | 16px |
| **Color de fondo** | `#C0C0C0` (gris clásico de Windows 95) o textura tileable de "fondo estrellado" |
| **Color de texto** | Negro puro `#000000` |
| **Links** | Azul `#0000EE`, subrayados, **morados** después de visitados (`#551A8B`) |
| **Imágenes** | Bordes con `border: 2px solid` azul. Centradas. |
| **Tablas para layout** | Sí — usar tablas HTML para estructurar contenido (auténtico) |
| **Adornos** | GIFs animados de "bajo construcción", contadores de visitas falsos, líneas horizontales `<hr>` |
| **Botones** | Estilo bevel 3D con border-style: outset, fondo gris |
| **Headers** | Texto centrado con `<h1>` grandes en serif |
| **Música de fondo** | Botón opcional con MIDI de la era (puede ser solo decorativo) |
| **Marquee** | `<marquee>` de texto desplazándose (sí, vamos a usarlo aquí) |

### 13.2 Tema Web 2.0 — "El internet que es"

| Elemento | Especificación |
|---|---|
| **Fuente de display** | Plus Jakarta Sans Bold |
| **Fuente de cuerpo** | Inter Regular |
| **Color primario** | `#3B82F6` (azul moderno) |
| **Color de fondo** | Blanco `#FFFFFF` con secciones en `#F8FAFC` |
| **Border radius** | 12px en tarjetas, 8px en botones |
| **Sombras** | Suaves con blur (`0 4px 20px rgba(0,0,0,0.08)`) |
| **Animaciones** | Framer Motion en entrada de elementos, hover sutiles |
| **Componentes interactivos** | Comentarios en vivo, reacciones, infinite scroll (opcional) |
| **Iconos** | Lucide React (línea moderna) |
| **Imágenes** | Bordes redondeados, lazy loading nativo |

### 13.3 Tema "puente" — Landing y Timeline

El landing y el timeline NO pertenecen a una era específica. Son **el puente**. Estética minimalista oscura con destellos de los dos mundos. Esto le da identidad propia al sitio sin perder coherencia.

| Elemento | Especificación |
|---|---|
| **Fondo** | Negro mate `#0A0A0F` con un patrón sutil de líneas de circuito |
| **Acento Web 1.0** | Verde fósforo `#39FF14` (color de los CRTs antiguos) |
| **Acento Web 2.0** | Azul moderno `#3B82F6` |
| **Tipografía** | Plus Jakarta Sans para títulos, Inter para cuerpo |

---

## 14. Arquitectura de rutas

```
app/
  layout.tsx                     ← FUNDACIÓN: navbar global, fonts, providers
  globals.css                    ← FUNDACIÓN: variables CSS globales
  page.tsx                       ← STREAM A: Landing
  timeline/page.tsx              ← STREAM A: Timeline interactivo

  era/
    web10/
      page.tsx                   ← STREAM A: Listado posts Web 1.0 (estética retro)
      [slug]/page.tsx            ← STREAM A: Post individual Web 1.0
      web10.css                  ← STREAM A: estilos retro scoped

    web20/
      page.tsx                   ← STREAM B: Listado posts Web 2.0 (moderno)
      [slug]/page.tsx            ← STREAM B: Post individual Web 2.0

  mainframe/page.tsx             ← STREAM C: Sala VR

  admin/
    db-setup/page.tsx            ← FUNDACIÓN
    login/page.tsx               ← STREAM C
    dashboard/page.tsx           ← STREAM C
    posts/
      page.tsx                   ← STREAM C: Listado de posts (incl. borradores)
      new/page.tsx               ← STREAM C: Crear post
      [id]/edit/page.tsx         ← STREAM C: Editar post
    comments/page.tsx            ← STREAM C: Moderación
    audit/page.tsx               ← STREAM C: Bitácora

  api/
    system/bootstrap | diagnose | mode    ← FUNDACIÓN
    auth/login | logout | me              ← FUNDACIÓN
    posts/route.ts                        ← FUNDACIÓN: GET públicos
    posts/[slug]/route.ts                 ← FUNDACIÓN: GET por slug
    comments/route.ts                     ← STREAM B: GET por post | POST nuevo
    reactions/route.ts                    ← STREAM B: POST toggle reacción
    admin/posts/route.ts                  ← STREAM C: GET todos | POST crear
    admin/posts/[id]/route.ts             ← STREAM C: PUT | DELETE
    admin/posts/[id]/cover/route.ts       ← STREAM C: POST upload imagen
    admin/comments/route.ts               ← STREAM C: GET todos
    admin/comments/[id]/route.ts          ← STREAM C: DELETE
    admin/comments/[id]/feature/route.ts  ← STREAM C: PATCH toggle destacado
    admin/audit/route.ts                  ← STREAM C: GET por mes

components/
  ui/                            ← FUNDACIÓN: Button, Input, Toast, Modal
  layout/                        ← FUNDACIÓN: Navbar (cambia de estética según ruta), Footer
  shared/                        ← FUNDACIÓN: PostCard, EraBadge, LoadingState, EmptyState
  timeline/                      ← STREAM A
  web10/                         ← STREAM A: PostCardRetro, MarqueeBanner, VisitCounter, GifBanner
  web20/                         ← STREAM B: PostCardModern, ReactionButton, CommentForm, CommentList
  mainframe/                     ← STREAM C: MainframeScene, PunchCard, TerminalCRT, TapeReel
  admin/                         ← STREAM C: PostForm, CoverUploader, MarkdownEditor

lib/
  supabase.ts                    ← FUNDACIÓN
  dataService.ts                 ← FUNDACIÓN
  blobAudit.ts                   ← FUNDACIÓN
  blobImages.ts                  ← FUNDACIÓN: para imágenes públicas de portada
  pgMigrate.ts                   ← FUNDACIÓN
  seedReader.ts                  ← FUNDACIÓN
  auth.ts                        ← FUNDACIÓN: JWT, hashPassword, verifyPassword
  withAuth.ts                    ← FUNDACIÓN
  withRole.ts                    ← FUNDACIÓN
  deviceId.ts                    ← FUNDACIÓN
  markdown.ts                    ← FUNDACIÓN: render Markdown a HTML
  types.ts                       ← FUNDACIÓN
  schemas.ts                     ← FUNDACIÓN
  hooks/
    useDeviceId.ts               ← FUNDACIÓN
```

---

## 15. Inventario de pantallas y propiedad por stream

| ID | Pantalla / Funcionalidad | Stream | Responsable |
|---|---|---|---|
| P-01 | Landing / Home | A | Estudiante A |
| P-02 | Timeline interactivo | A | Estudiante A |
| P-03 | Listado Web 1.0 (retro) | A | Estudiante A |
| P-04 | Post individual Web 1.0 | A | Estudiante A |
| P-05 | Listado Web 2.0 (moderno) | B | Estudiante B |
| P-06 | Post individual Web 2.0 | B | Estudiante B |
| P-07 | Sistema de comentarios | B | Estudiante B |
| P-08 | Sistema de reacciones | B | Estudiante B |
| **P-09** | **Sala VR del Mainframe** | **C** | **Estudiante C** |
| P-10 | Login admin | C | Estudiante C |
| P-11 | Dashboard admin | C | Estudiante C |
| P-12 | CRUD de posts (admin) | C | Estudiante C |
| P-13 | Moderación de comentarios (admin) | C | Estudiante C |
| P-14 | Auditoría (admin) | C | Estudiante C |

---

## 16. Stream A — Timeline histórico + Web 1.0

### Archivos exclusivos
```
app/page.tsx                              (landing)
app/timeline/page.tsx
app/era/web10/page.tsx
app/era/web10/[slug]/page.tsx
app/era/web10/web10.css                  (estilos retro scoped)
components/timeline/Timeline.tsx
components/timeline/TimelineMilestone.tsx
components/timeline/TimelineProgress.tsx
components/web10/PostCardRetro.tsx
components/web10/MarqueeBanner.tsx
components/web10/VisitCounter.tsx
components/web10/GifBanner.tsx
components/web10/UnderConstruction.tsx
public/gifs-web10/*                       (assets retro)
```

### Landing (P-01)
- Hero con animación de transición de Web 1.0 → Web 2.0
- 3 cards con CTA: "Recorre el Timeline" / "Visita la Web 1.0" / "Entra a la Web 2.0" / "Sumérgete en el Mainframe"
- Texto introductorio sobre el propósito pedagógico

### Timeline (P-02)
- Scroll vertical (mobile) o horizontal (desktop) con hitos cronológicos
- Cada hito muestra: año, título, breve descripción
- Click en hito → navega al post correspondiente
- Visualización: línea con nodos. Animación con Framer Motion en scroll
- La estética cambia gradualmente del lado izquierdo (verde fósforo, retro) al derecho (azul moderno) — narrativa visual de la evolución

### Web 1.0 (P-03 y P-04)
- Layout con `<table>` real (auténtico de la era)
- Fondo gris `#C0C0C0`, fuente Times, links azules subrayados
- Banner GIF "Bajo construcción"
- Contador de visitas falso (puede usar device_id para incrementar localmente)
- Marquee desplazándose con noticias de la era
- "Mejor visualizado con Netscape Navigator 2.0" como nota al pie
- Posts individuales en formato HTML simple, una sola columna estrecha (640px)

---

## 17. Stream B — Web 2.0 + Sistema de comentarios

### Archivos exclusivos
```
app/era/web20/page.tsx
app/era/web20/[slug]/page.tsx
app/api/comments/route.ts
app/api/comments/[id]/route.ts            (no admin; solo metadata pública)
app/api/reactions/route.ts
components/web20/PostCardModern.tsx
components/web20/PostHero.tsx
components/web20/ReactionButton.tsx
components/web20/CommentForm.tsx
components/web20/CommentList.tsx
components/web20/CommentItem.tsx
components/web20/ShareButton.tsx
```

### Web 2.0 (P-05 y P-06)
- Grid moderno de PostCardModern con animaciones Framer Motion
- Hero del post con imagen de portada grande, título tipográfico
- Markdown renderizado con tipografía cuidada
- Barra lateral sticky con: tabla de contenidos, botón compartir, contador de reacciones

### Sistema de comentarios (P-07)
- CommentForm: nombre, email (no se muestra), texto. Validación con Zod
- CommentList: comentarios destacados primero (con badge ⭐), luego por fecha DESC
- Avatar generado con Gravatar (hash MD5 del email)
- Sin paginación en v1 — máximo 50 comentarios visibles
- Sin login necesario

### Sistema de reacciones (P-08)
- Botón de "❤️ Me interesa" con contador
- Toggle: si ya reaccionaste, se muestra activo; click → unlike
- Persistencia por device_id (UUID en localStorage)
- POST /api/reactions con { postId, deviceId }
- Animación de corazón al reaccionar (Framer Motion + scale)

---

## 18. Stream C — Sala VR del Mainframe + Panel Admin

### Archivos exclusivos
```
app/mainframe/page.tsx
app/admin/login/page.tsx
app/admin/dashboard/page.tsx
app/admin/posts/page.tsx
app/admin/posts/new/page.tsx
app/admin/posts/[id]/edit/page.tsx
app/admin/comments/page.tsx
app/admin/audit/page.tsx
app/api/admin/posts/route.ts
app/api/admin/posts/[id]/route.ts
app/api/admin/posts/[id]/cover/route.ts
app/api/admin/comments/route.ts
app/api/admin/comments/[id]/route.ts
app/api/admin/comments/[id]/feature/route.ts
app/api/admin/audit/route.ts
components/mainframe/MainframeScene.tsx
components/mainframe/MainframeCabinet.tsx
components/mainframe/PunchCard.tsx
components/mainframe/TerminalCRT.tsx
components/mainframe/TapeReel.tsx
components/mainframe/PortalToWeb.tsx
components/mainframe/AmbientSound.tsx
components/admin/PostForm.tsx
components/admin/CoverUploader.tsx
components/admin/MarkdownEditor.tsx
components/admin/AdminLayout.tsx
public/sounds/mainframe-hum.mp3           (asset opcional)
```

### Sala VR (P-09)
- Implementación según sección 12 de este plan
- Tres modos: VR (con headset), 3D orbital (escritorio), touch (mobile)
- Elementos interactivos: tarjetas perforadas, terminal CRT, portal de salida
- Tooltips con explicaciones históricas al acercarse a cada elemento

### Panel Admin (P-10 a P-14)
- Login simple con email + password (Fundación creó la API y el helper auth)
- Dashboard con conteo de posts, comentarios y reacciones agregadas
- CRUD de posts con MarkdownEditor (puede ser un `<textarea>` con preview o usar `react-markdown` para preview)
- Upload de imagen de portada al Vercel Blob público
- Listado de comentarios con filtro por post + acciones (eliminar, destacar)
- Vista de auditoría con selector de mes

### Reglas del admin
- El admin no puede eliminar la cuenta con la que está logueado (RN-07)
- Toda operación se registra en auditoría (RN-08)

---

## 19. Plan de trabajo y protocolo sin conflictos

### Fase 0 — Fundación (TODO el equipo, antes de los streams · 1-2 días)

**Tareas:**
1. Crear proyecto Next.js + instalar dependencias (Estudiante C, ya que será quien más use Three.js)
2. Configurar Tailwind 4, fonts y variables CSS globales (Estudiante A)
3. Crear migrations 0001–0004 + `data/seed.json` con 7 posts iniciales (Estudiante B)
4. Implementar `lib/supabase.ts`, `lib/dataService.ts`, `lib/auth.ts`, `lib/blobImages.ts`, `lib/blobAudit.ts`, `lib/markdown.ts` (Estudiante C)
5. Implementar componentes compartidos: Button, Input, Toast, Modal, PostCard base (Estudiante A)
6. Implementar Navbar con detección de ruta para cambiar de estética (Estudiante B)
7. Crear `lib/deviceId.ts` y `useDeviceId` (Estudiante B)
8. Crear `app/admin/db-setup/page.tsx` y endpoints de bootstrap (Estudiante C)
9. Commit a `main` y notificar al equipo

### Fase 1 — Streams paralelos (cada uno en su branch · 4-5 días)

```
main
├── feat/stream-a-timeline-web10     (Estudiante A)
├── feat/stream-b-web20-comments     (Estudiante B)
└── feat/stream-c-mainframe-admin    (Estudiante C)
```

### Fase 2 — Integración (1 día)

Merge en orden: **C → B → A** (de menor a mayor dependencia con los componentes públicos del navbar/landing).

### Reglas de oro

1. **Solo escribes en tu carpeta de stream.**
2. **Todo lo de Fundación es de solo lectura** durante los streams.
3. **Si encuentras un bug en Fundación:** abrir Issue, no arreglar en tu PR.
4. **Antes de mergear:** `git pull origin main`.
5. **Commits diarios** en cada branch.

### Mapa de propiedad

| Carpeta / Archivo | Quién escribe |
|---|---|
| `app/page.tsx`, `app/timeline/`, `app/era/web10/`, `components/timeline/`, `components/web10/` | Solo Estudiante A |
| `app/era/web20/`, `app/api/comments/`, `app/api/reactions/`, `components/web20/` | Solo Estudiante B |
| `app/mainframe/`, `app/admin/`, `app/api/admin/`, `components/mainframe/`, `components/admin/` | Solo Estudiante C |
| Todo lo demás (`lib/`, `components/ui/`, `components/layout/`, `components/shared/`) | Fundación — solo lectura |

### Importaciones permitidas entre streams

```typescript
// Estudiante B en su Web 2.0 puede usar componentes shared:
import { PostCard } from '@/components/shared/PostCard';

// Estudiante C en el admin puede importar tipos y dataService:
import { dataService } from '@/lib/dataService';
import type { Post, Comment } from '@/lib/types';

// Estudiante A en el landing puede linkear a /mainframe (de Estudiante C)
// y a /era/web20 (de Estudiante B). Las rutas son strings — no hay conflictos.
```

---

## 20. Glosario

| Término | Definición |
|---|---|
| **Web 1.0** | Era de la web estática (1991-2003). Sitios de solo lectura, generados por administradores. |
| **Web 2.0** | Era de la web colaborativa (2004 en adelante). Usuarios crean y comparten contenido. |
| **Mainframe** | Computadora central de las eras 1950-1980. Predecesor conceptual de la web. |
| **WebXR** | Estándar W3C que permite experiencias VR/AR directamente en el navegador. |
| **React Three Fiber** | Librería que permite usar Three.js declarativamente en React. |
| **Device ID** | UUID generado en el primer uso, guardado en localStorage. Identifica al visitante para reacciones sin requerir login. |
| **Slug** | Versión URL-friendly del título de un post. Ejemplo: `2004-conferencia-web2`. |
| **Era** | Categoría del post: `web10`, `web20` o `general`. Determina la estética con que se renderiza. |
| **Bootstrap** | Proceso inicial donde el admin aplica migrations y carga el seed. |
| **dataService** | Único punto de acceso a datos en el servidor. |
| **JWT** | JSON Web Token — credencial firmada en cookie HttpOnly (solo para el admin). |

---

> **Nombres del equipo (para reemplazar):**
> - **Estudiante A** (Stream A — Timeline + Web 1.0): _________________
> - **Estudiante B** (Stream B — Web 2.0 + Comentarios): _________________
> - **Estudiante C** (Stream C — Sala VR + Admin): _________________
> - **Tutor:** _________________

---

> Última actualización: Mayo 2026
> Diseño Digital — Universidad Sergio Arboleda, Santa Marta
> Asignatura: Narrativas Digitales
