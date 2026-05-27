# PROMPT 0 — FUNDACIÓN: EvoWeb
> Ejecutar PRIMERO — en equipo o asignado a un integrante
> Nadie empieza su stream hasta que esto esté commiteado en `main`
> Plan de referencia: `doc/PLAN_EVOWEB.md`

---

```
Actúa EXCLUSIVAMENTE como Ingeniero Fullstack Senior especializado en
Next.js + Supabase + Vercel Blob + Three.js, y como diseñador de sistemas
que implementa identidades visuales duales (Web 1.0 retro vs Web 2.0
moderno) en código. Tu tarea es crear la fundación completa del proyecto
EvoWeb: un repositorio pedagógico interactivo sobre la evolución de la
Web, que incluye una sala VR del mainframe.

CARÁCTER DEL SISTEMA:
- Sitio público para estudiantes de Diseño Digital (asignatura Narrativas
  Digitales). No requiere registro ni login para visitantes.
- Solo el admin (profesor) tiene login con JWT para gestionar contenido.
- Tres experiencias visuales distintas: Web 1.0 retro, Web 2.0 moderno, y
  Sala VR del Mainframe.
- 3 streams paralelos sin conflictos después de esta fundación.

Antes de escribir código lee doc/PLAN_EVOWEB.md completo. Presta especial
atención a:
- Sección 7: stack y variables de entorno
- Sección 8-9: bootstrap, migrations 0001-0004 y data/seed.json con 7 posts
- Sección 10: API completa del dataService
- Sección 13: identidad visual dual (debes preparar el sistema para que
  cada era tenga su CSS scoped sin que se contaminen mutuamente)
- Sección 14: arquitectura de rutas con propiedad por stream
- Sección 19: protocolo de colaboración

LO QUE DEBES CREAR:

1. PROYECTO NEXT.JS
   npx create-next-app@latest evoweb --typescript --tailwind --app --src-dir
   Instalar:
   - @supabase/supabase-js pg @types/pg bcryptjs @types/bcryptjs jose
   - @vercel/blob
   - three @types/three @react-three/fiber @react-three/drei @react-three/xr
   - framer-motion lucide-react zod
   - marked @types/marked
   - md5 @types/md5  (para Gravatar)

2. CONFIGURACIÓN DE FUENTES en `app/layout.tsx`
   - Para Web 2.0 (default): Inter (cuerpo) + Plus_Jakarta_Sans (display)
   - Para Web 1.0: NO se usa next/font — Times New Roman es nativa del SO
   - Definir variables: --font-display, --font-body, --font-retro

3. DESIGN SYSTEM en `app/globals.css`
   Implementar variables CSS GLOBALES (no scoped):
   --color-primary-modern: #3B82F6
   --color-bridge-bg: #0A0A0F
   --color-accent-retro: #39FF14   (verde fósforo CRT)
   --color-accent-modern: #3B82F6
   Las variables retro de la Web 1.0 (gris #C0C0C0, links azul #0000EE)
   van en el CSS scoped que crea Estudiante A — no las pongas globales.

4. ESTRUCTURA DE CARPETAS según sección 14 del plan completa.

5. SUPABASE Y BLOB CLIENTS (lib/)
   - lib/supabase.ts → server-side client con SUPABASE_SERVICE_ROLE_KEY
   - lib/supabase-client.ts → browser client con NEXT_PUBLIC_SUPABASE_ANON_KEY
   - lib/blobImages.ts → upload a Vercel Blob público con getBlobToken() lazy
     Función uploadPostCover(postId, buffer, mimeType) retorna URL pública.
   - lib/blobAudit.ts → patrón estándar del curso (get() del SDK,
     withFileLock, getBlobToken lazy)

6. MIGRATIONS (supabase/migrations/)
   Implementar las 4 migrations EXACTAMENTE como en la sección 11 del plan.
   La migration 0002_init_posts.sql con CHECK era IN ('web10','web20','general')
   y status IN ('draft','published') es CRÍTICA — la era determina la estética
   con que se renderiza el post.

7. SEED Y SEEDREADER
   Crear data/seed.json con la estructura de la sección 9.1:
   - 1 admin: admin@evoweb.edu.co / admin123 (bcrypt hash)
   - 7 posts: 1989-tim-berners-lee (general), 1991-primera-pagina-web
     (web10), 1996-geocities (web10), 1999-blogger (web10),
     2004-conferencia-web2 (web20), 2005-youtube (web20), 2006-twitter (web20)
   Cada post DEBE tener: slug, title, era, year, excerpt, content (markdown
   real con párrafos pedagógicos sobre el hito), status='published'.
   Crear lib/seedReader.ts que expone users y posts para modo seed.

8. PG MIGRATE
   lib/pgMigrate.ts que aplica migrations en orden y registra en _migrations.
   Patrón estándar del curso.

9. DATA SERVICE COMPLETO (lib/dataService.ts)
   Implementar TODOS los métodos de la sección 10 del plan:
   - System: getSystemMode, recordAudit, readAuditMonth
   - Auth: getUserByEmail, getUserById
   - Posts públicos: getPublishedPosts, getPostBySlug, getTimelinePosts
   - Posts admin: getAllPosts, createPost, updatePost, deletePost
   - Comentarios: getCommentsByPost (destacados primero), createComment,
     deleteComment, toggleFeaturedComment
   - Reacciones: reactToPost (toggle), getReactionsByPost
   - Imágenes: uploadPostCover (delegando a blobImages)

   IMPORTANTE: getPostBySlug retorna PostWithStats con commentCount y
   reactionCount (subqueries o queries adicionales). getCommentsByPost
   NO incluye el campo author_email en la respuesta — solo se usa
   internamente para Gravatar (RN-04).

10. AUTH (lib/auth.ts, lib/withAuth.ts)
    JWT con jose, cookie HttpOnly, Secure, SameSite=Strict.
    El JWT incluye: userId, email, role.
    withAuth(handler) verifica la cookie y pasa el user al handler.
    Solo hay un rol: 'admin'. Los visitantes son anónimos.

11. DEVICE ID (lib/deviceId.ts + lib/hooks/useDeviceId.ts)
    'use client' — patrón estándar del curso:
    getOrCreateDeviceId() lee/escribe localStorage.evoweb_device_id
    useDeviceId() retorna el deviceId (null durante SSR).

12. MARKDOWN (lib/markdown.ts)
    Función renderMarkdown(content: string): string
    Usa `marked` con sanitización básica. Soporta: headings, párrafos,
    enlaces, imágenes, código inline, listas, blockquotes, énfasis.

13. COMPONENTES COMPARTIDOS
    En components/ui/:
    - Button.tsx (Primary, Outline, Ghost variants)
    - Input.tsx, Textarea.tsx
    - Toast.tsx, Modal.tsx
    - Badge.tsx (con variants para era: web10, web20, general)

    En components/layout/:
    - Navbar.tsx — CRÍTICO: detecta la ruta actual con usePathname y cambia
      su estética según en qué era esté el visitante:
      * En /, /timeline, /mainframe, /admin/* → estética bridge
        (fondo #0A0A0F, texto blanco, acentos azul + verde fósforo)
      * En /era/web10/* → estética retro (fondo gris, links azules
        subrayados, fuente Times)
      * En /era/web20/* → estética moderna (fondo blanco, animaciones)
      Usa CSS variables que cambian con clases del body.
    - Footer.tsx — minimalista, igual en todas las eras

    En components/shared/:
    - PostCard.tsx (versión base genérica — los streams A y B la usan
      como punto de partida pero crean sus propias variantes con estética)
    - EraBadge.tsx (badge con color por era)
    - LoadingState.tsx, EmptyState.tsx

14. NAVEGACIÓN CON STUBS
    - app/page.tsx → stub con texto "Landing — Stream A"
    - app/timeline/page.tsx → stub
    - app/era/web10/page.tsx → stub
    - app/era/web10/[slug]/page.tsx → stub
    - app/era/web20/page.tsx → stub
    - app/era/web20/[slug]/page.tsx → stub
    - app/mainframe/page.tsx → stub con texto "Sala VR — Stream C"
    - app/admin/login/page.tsx → stub
    - app/admin/dashboard/page.tsx → stub
    - Etc. para todas las rutas admin

15. PÁGINA DE BOOTSTRAP (app/admin/db-setup/page.tsx)
    Patrón estándar del curso:
    - Estado actual del sistema
    - Botón "Aplicar bootstrap" con campo ADMIN_BOOTSTRAP_SECRET
    - Llama a /api/system/bootstrap
    Informa: "Aplicará 4 migrations y cargará: 1 usuario admin y 7 posts
    iniciales del repositorio pedagógico."

16. API ROUTES BÁSICAS (Fundación)
    - app/api/system/mode | diagnose | bootstrap (patrón del curso)
    - app/api/auth/login (POST: email + password → JWT cookie)
    - app/api/auth/logout (POST: borra cookie)
    - app/api/auth/me (GET: retorna user del JWT)
    - app/api/posts/route.ts → GET ?era=web10|web20|general lista pública
    - app/api/posts/[slug]/route.ts → GET un post con stats

17. NEXT.CONFIG.TS
    Headers `no-store` para /api/:path*

18. PRELOAD DE FUENTES Y CSS GLOBAL
    En globals.css:
    - Reset mínimo
    - Body con --font-body por defecto
    - Clase .era-web10 para aplicar estilos retro al body
    - Clase .era-web20 para aplicar estilos modernos al body
    - Clase .bridge para landing/timeline/mainframe/admin

19. VARIABLES DE ENTORNO (.env.local)
    NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY, DATABASE_URL,
    BLOB_READ_WRITE_TOKEN, JWT_SECRET, ADMIN_BOOTSTRAP_SECRET

AL TERMINAR:
- npm run typecheck → cero errores
- npm run dev → app corre en localhost:3000
- Ver landing stub con Navbar bridge (negro)
- Ir a /era/web10 → Navbar cambia a estética retro (Times, fondo gris)
- Ir a /era/web20 → Navbar cambia a estética moderna
- Ir a /mainframe → Navbar bridge de nuevo
- Ir a /admin/db-setup → ejecutar bootstrap → modo live
- Verificar en Supabase Studio que las 4 tablas existen y tienen datos
- Ir a /admin/login y autenticarse con admin@evoweb.edu.co / admin123
  → JWT cookie + redirect a /admin/dashboard (aunque sea stub)

Hacer commit:
git add -A
git commit -m "feat: fundación completa EvoWeb (Supabase + Auth + design system dual)"
git push origin main

Notificar al equipo: "Fundación lista. Pueden crear sus branches:
- Estudiante A: feat/stream-a-timeline-web10
- Estudiante B: feat/stream-b-web20-comments
- Estudiante C: feat/stream-c-mainframe-admin"

IMPORTANTE: No implementes ninguna pantalla real (landing, timeline,
posts, sala VR, panel admin). Solo stubs. Las pantallas las hacen los
streams en branches paralelos.

Tu trabajo termina aquí.
```
