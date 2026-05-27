# PROMPT STREAM C — SALA VR DEL MAINFRAME + PANEL ADMIN
> Responsable: Estudiante C
> Branch: `feat/stream-c-mainframe-admin`
> Dominio exclusivo: `app/mainframe/`, `app/admin/`, `app/api/admin/`, `components/mainframe/`, `components/admin/`
> Prerrequisito: Fundación commiteada en `main`

---

```
Actúa EXCLUSIVAMENTE como dos roles trabajando en conjunto:

(1) Ingeniero 3D / WebXR especializado en React Three Fiber y experiencias
inmersivas low-poly. Tu trabajo en este aspecto: construir una sala
virtual del mainframe que sumerja al estudiante en la pre-historia de
la web. Debe funcionar en 3 modos: VR (con headset), 3D orbital
(escritorio) y touch (móvil).

(2) Ingeniero Fullstack para el panel admin: CRUD de posts con upload
de imágenes a Vercel Blob, moderación de comentarios y vista de
auditoría. Patrón estándar del curso.

CONCEPTO PEDAGÓGICO de la sala VR: el mainframe es el ancestro físico de
la web. Antes de las páginas y los hipervínculos había salas refrigeradas
con armarios de metal, cintas magnéticas, terminales CRT y tarjetas
perforadas. Sumergir al estudiante en ese entorno explica visualmente
algo que el texto no puede: la web actual heredó conceptos de allí.

ANTES de escribir código:
1. git checkout main && git pull origin main
2. git checkout -b feat/stream-c-mainframe-admin
3. Leer doc/PLAN_EVOWEB.md — secciones 12 (la sala VR completa con
   todos los elementos), 18 (Stream C), reglas RN-07 (admin no puede
   borrar su propia cuenta) y RN-08 (auditoría obligatoria)
4. NO modificar ningún archivo fuera de tu dominio.

ARCHIVOS QUE VAS A CREAR (y SOLO estos):

PARTE 1 — SALA VR:
- app/mainframe/page.tsx (REEMPLAZA el stub)
- components/mainframe/MainframeScene.tsx
- components/mainframe/MainframeCabinet.tsx
- components/mainframe/PunchCard.tsx
- components/mainframe/TerminalCRT.tsx
- components/mainframe/TapeReel.tsx
- components/mainframe/PortalToWeb.tsx
- components/mainframe/AmbientSound.tsx
- components/mainframe/ModeSelector.tsx (selector de VR/3D/touch)

PARTE 2 — PANEL ADMIN:
- app/admin/login/page.tsx (REEMPLAZA el stub)
- app/admin/dashboard/page.tsx (REEMPLAZA el stub)
- app/admin/posts/page.tsx (listado completo incl. borradores)
- app/admin/posts/new/page.tsx
- app/admin/posts/[id]/edit/page.tsx
- app/admin/comments/page.tsx
- app/admin/audit/page.tsx
- app/api/admin/posts/route.ts
- app/api/admin/posts/[id]/route.ts
- app/api/admin/posts/[id]/cover/route.ts
- app/api/admin/comments/route.ts
- app/api/admin/comments/[id]/route.ts
- app/api/admin/comments/[id]/feature/route.ts
- app/api/admin/audit/route.ts
- components/admin/AdminLayout.tsx
- components/admin/PostForm.tsx
- components/admin/CoverUploader.tsx
- components/admin/MarkdownEditor.tsx
- components/admin/CommentRow.tsx

---

═══════════════════════════════════════════════════
PARTE 1 — SALA VR DEL MAINFRAME
═══════════════════════════════════════════════════

TAREA 1: app/mainframe/page.tsx (P-09)

Marcar como 'use client'. Estética bridge (negra) — el wrapper externo,
porque dentro del Canvas vive la sala 3D propia.

```typescript
'use client';
import dynamic from 'next/dynamic';

// IMPORTANTE: Three.js + R3F NO funcionan con SSR
const MainframeExperience = dynamic(
  () => import('@/components/mainframe/MainframeScene').then(m => m.MainframeExperience),
  { ssr: false, loading: () => <div>Cargando sala 3D...</div> }
);

export default function MainframePage() {
  return (
    <main className="relative w-full h-screen bg-black overflow-hidden">
      <header className="absolute top-4 left-4 z-10 text-white">
        <h1 className="text-2xl font-bold">Sala del Mainframe</h1>
        <p className="text-sm text-gray-400">El origen de la web — Año 1965</p>
      </header>
      <MainframeExperience />
    </main>
  );
}
```

---

TAREA 2: components/mainframe/MainframeScene.tsx

Componente principal que monta el Canvas de R3F + XR.

```typescript
'use client';
import { Canvas } from '@react-three/fiber';
import { XR, VRButton, Controllers, Hands } from '@react-three/xr';
import { OrbitControls } from '@react-three/drei';
import { MainframeCabinet } from './MainframeCabinet';
import { TerminalCRT } from './TerminalCRT';
import { TapeReel } from './TapeReel';
import { PunchCard } from './PunchCard';
import { PortalToWeb } from './PortalToWeb';
import { AmbientSound } from './AmbientSound';
import { ModeSelector } from './ModeSelector';

export function MainframeExperience() {
  return (
    <>
      <VRButton />
      <ModeSelector />
      <AmbientSound />
      <Canvas shadows camera={{ position: [0, 1.6, 5], fov: 70 }}>
        <XR>
          <Controllers />
          {/* Iluminación cálida tipo fluorescente de los 60s */}
          <ambientLight intensity={0.3} color="#FFE9C4" />
          <directionalLight
            position={[5, 10, 5]}
            intensity={0.8}
            color="#FFE9C4"
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          {/* Tubos fluorescentes — 3 luces puntuales cálidas */}
          <pointLight position={[-3, 4, 0]} intensity={0.4} color="#FFD89E" />
          <pointLight position={[0, 4, -3]} intensity={0.4} color="#FFD89E" />
          <pointLight position={[3, 4, 0]} intensity={0.4} color="#FFD89E" />

          {/* Suelo */}
          <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="#A0A0A0" />
          </mesh>

          {/* Pared trasera */}
          <mesh position={[0, 3, -10]} receiveShadow>
            <boxGeometry args={[20, 6, 0.1]} />
            <meshStandardMaterial color="#D4D4D4" />
          </mesh>

          {/* 5 armarios de mainframe */}
          <MainframeCabinet position={[-4, 0, -3]} />
          <MainframeCabinet position={[-2, 0, -3]} />
          <MainframeCabinet position={[0, 0, -3]} hasDoor />
          <MainframeCabinet position={[2, 0, -3]} />
          <MainframeCabinet position={[4, 0, -3]} />

          {/* Cintas magnéticas sobre los armarios */}
          <TapeReel position={[-3, 2.5, -3]} />
          <TapeReel position={[3, 2.5, -3]} />

          {/* Mesa con terminal CRT */}
          <TerminalCRT position={[0, 0, 1]} />

          {/* Tarjetas perforadas sobre la mesa */}
          <PunchCard position={[-1.5, 0.85, 1]} />
          <PunchCard position={[-1.5, 0.87, 1.2]} />
          <PunchCard position={[-1.5, 0.89, 1.4]} />

          {/* Portal de salida flotante a la derecha */}
          <PortalToWeb position={[6, 1.5, 0]} />

          <OrbitControls
            enablePan={false}
            minDistance={2}
            maxDistance={12}
            target={[0, 1, 0]}
          />
        </XR>
      </Canvas>
    </>
  );
}
```

---

TAREA 3: components/mainframe/MainframeCabinet.tsx

Armario del mainframe — la pieza visual principal.

```typescript
import { Box } from '@react-three/drei';

type Props = { position: [number, number, number]; hasDoor?: boolean };

export function MainframeCabinet({ position, hasDoor }: Props) {
  return (
    <group position={position}>
      {/* Cuerpo principal del armario — 0.8m x 2m x 0.6m */}
      <Box args={[0.8, 2, 0.6]} position={[0, 1, 0]} castShadow>
        <meshStandardMaterial color="#C8B89A" />  {/* beige institucional */}
      </Box>

      {/* Panel frontal con luces LED */}
      {/* Generar grid 4x6 de luces parpadeantes */}
      {Array.from({ length: 24 }).map((_, i) => {
        const row = Math.floor(i / 4);
        const col = i % 4;
        const x = (col - 1.5) * 0.15;
        const y = 1.6 - row * 0.15;
        const isGreen = (i + Math.floor(performance.now() / 1000)) % 3 === 0;
        return (
          <mesh key={i} position={[x, y, 0.31]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshStandardMaterial
              color={isGreen ? '#22FF66' : '#FF3322'}
              emissive={isGreen ? '#22FF66' : '#FF3322'}
              emissiveIntensity={1}
            />
          </mesh>
        );
      })}

      {/* Etiqueta "IBM 360" o similar */}
      {/* ... */}
    </group>
  );
}
```

NOTA: para hacer las luces "parpadear" de verdad, mejor usar useFrame
y un estado en el componente. La aleatoriedad de cada frame da el efecto
de actividad del mainframe.

---

TAREA 4: components/mainframe/TerminalCRT.tsx

Mesa + monitor CRT con pantalla mostrando texto verde sobre negro.

Construcción:
- Mesa: BoxGeometry plana (1.2 x 0.8 x 0.05) sobre 4 patas (cilindros)
- Monitor: caja gruesa con pantalla (PlaneGeometry frontal)
- Pantalla: usar CanvasTexture para dibujar texto programáticamente

Texto a mostrar (estilo terminal antiguo):
```
> READY
> RUN PROGRAM.WEB
> COMPILING...
> NETWORK ACK 0x7F
> WAITING FOR REQUEST_
```

El cursor `_` parpadea con useFrame.

Color del texto: verde fósforo #39FF14 sobre fondo negro #000000.

---

TAREA 5: components/mainframe/TapeReel.tsx

Cintas magnéticas que giran lentamente.

```typescript
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder } from '@react-three/drei';

export function TapeReel({ position }: Props) {
  const reelRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (reelRef.current) reelRef.current.rotation.z += delta * 0.3;
  });

  return (
    <group position={position}>
      {/* Eje horizontal con dos cilindros — los carretes */}
      <Cylinder args={[0.3, 0.3, 0.05, 32]} rotation={[Math.PI/2, 0, 0]} position={[-0.4, 0, 0]}>
        <meshStandardMaterial color="#2A2A2A" />
      </Cylinder>
      <group ref={reelRef}>
        <Cylinder args={[0.25, 0.25, 0.04, 32]} rotation={[Math.PI/2, 0, 0]} position={[-0.4, 0, 0.05]}>
          <meshStandardMaterial color="#1A1A1A" />
        </Cylinder>
      </group>
      {/* Repetir para el segundo carrete */}
      <Cylinder args={[0.3, 0.3, 0.05, 32]} rotation={[Math.PI/2, 0, 0]} position={[0.4, 0, 0]}>
        <meshStandardMaterial color="#2A2A2A" />
      </Cylinder>
      {/* Cinta entre los dos (banda delgada) */}
      <Box args={[0.8, 0.02, 0.001]} position={[0, 0.3, 0.05]}>
        <meshStandardMaterial color="#3A2A1A" />
      </Box>
    </group>
  );
}
```

---

TAREA 6: components/mainframe/PunchCard.tsx

Tarjeta perforada interactiva. Al hacer hover/click, se eleva y muestra
un tooltip explicando qué era y cómo se usaba.

```typescript
'use client';
import { useState } from 'react';
import { useSpring, animated } from '@react-spring/three';
import { Html } from '@react-three/drei';

export function PunchCard({ position }: Props) {
  const [hovered, setHovered] = useState(false);
  const { y, rotation } = useSpring({
    y: hovered ? 0.5 : 0,
    rotation: hovered ? Math.PI / 12 : 0,
  });

  return (
    <animated.group position={position} position-y={y} rotation-x={rotation}>
      <Box args={[0.18, 0.005, 0.08]}
           onPointerOver={() => setHovered(true)}
           onPointerOut={() => setHovered(false)}>
        <meshStandardMaterial color="#F4E5C3" />
      </Box>
      {/* Perforaciones — 80 columnas, 12 filas posibles */}
      {/* Implementar como pequeños cilindros oscuros sobre la superficie */}

      {hovered && (
        <Html position={[0, 0.6, 0]} center>
          <div style={{
            background: 'rgba(0,0,0,0.85)',
            color: '#39FF14',
            padding: '8px 12px',
            borderRadius: 4,
            fontFamily: 'monospace',
            fontSize: 12,
            width: 220
          }}>
            <strong>Tarjeta perforada</strong><br/>
            Soporte de datos de los años 60. Cada perforación
            representaba un bit.
          </div>
        </Html>
      )}
    </animated.group>
  );
}
```

> Nota: si no quieres usar @react-spring/three, puedes lograr el mismo
efecto con useFrame + lerp manual, o con useState + transition CSS en
un Html overlay.

---

TAREA 7: components/mainframe/PortalToWeb.tsx

Portal flotante a la derecha que regresa al sitio principal.
Visualmente: un anillo girando con texto "← Volver a la Web".

```typescript
import { useRouter } from 'next/navigation';
import { Torus, Text, Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export function PortalToWeb({ position }: Props) {
  const router = useRouter();
  const ringRef = useRef();

  useFrame((_, delta) => {
    if (ringRef.current) ringRef.current.rotation.y += delta * 0.3;
  });

  return (
    <group position={position}>
      <Torus ref={ringRef} args={[0.8, 0.05, 16, 100]}>
        <meshStandardMaterial color="#3B82F6" emissive="#3B82F6" emissiveIntensity={0.5} />
      </Torus>
      <Html center>
        <button
          onClick={() => router.push('/')}
          style={{
            background: 'rgba(59, 130, 246, 0.9)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: 999,
            border: 'none',
            fontFamily: 'sans-serif',
            cursor: 'pointer'
          }}>
          ← Volver a la Web
        </button>
      </Html>
    </group>
  );
}
```

---

TAREA 8: components/mainframe/AmbientSound.tsx

Componente que reproduce un loop suave del zumbido del mainframe.
- 'use client'
- Audio en /public/sounds/mainframe-hum.mp3 (asset opcional — si no
  existe, no falla; solo no reproduce nada)
- Botón mute/unmute en la esquina inferior izquierda
- Por defecto: muteado (no autoplay sin interacción del usuario por
  política de navegadores)

---

TAREA 9: components/mainframe/ModeSelector.tsx

UI superpuesta al Canvas para indicar al usuario los modos disponibles.

Posición: esquina superior derecha, fixed.
Muestra:
- "🥽 VR" — visible si navigator.xr existe (gris si no)
- "🖱 Escritorio" — siempre disponible (modo actual indicado)
- "📱 Toque" — disponible automáticamente en mobile

Texto explicativo breve en hover.

---

═══════════════════════════════════════════════════
PARTE 2 — PANEL ADMIN
═══════════════════════════════════════════════════

TAREA 10: app/admin/login/page.tsx

Login simple del admin.
- Form con email + password
- POST a /api/auth/login (Fundación lo creó)
- En éxito: redirect a /admin/dashboard
- Estética bridge moderna (la del sitio principal en modo admin)
- Logo de EvoWeb en la parte superior

---

TAREA 11: components/admin/AdminLayout.tsx

Layout compartido por todas las páginas admin.
- Sidebar izquierdo con: Dashboard, Posts, Comentarios, Auditoría, Cerrar sesión
- Header superior con: nombre del admin + botón logout
- Contenido principal a la derecha
- Estética sobria, profesional, no distrae del contenido

Verifica autenticación: si no hay JWT válido → redirect a /admin/login.
Usar withAuth de Fundación en los layout.tsx o mediante middleware.

---

TAREA 12: app/admin/dashboard/page.tsx

Dashboard con KPIs:
- Total de posts (publicados / borradores)
- Total de comentarios (con destacados)
- Total de reacciones agregadas
- Lista de últimos 5 comentarios para moderación rápida
- Lista de últimos 5 posts editados

Llama a un endpoint /api/admin/dashboard-summary (debes crearlo) que
agrega los datos.

---

TAREA 13: app/admin/posts/page.tsx

Listado de TODOS los posts (incluye borradores).
Tabla con: título, era, año, estado (badge: borrador / publicado),
fecha de creación, acciones (editar, eliminar, publicar/despublicar).

Filtros: era, status.
Búsqueda por título.

Botón "Crear nuevo post" arriba → /admin/posts/new.

---

TAREA 14: components/admin/PostForm.tsx

Formulario reutilizado en /new y /edit.

Campos:
- Título (input text)
- Slug (input text con validación regex /^[a-z0-9-]+$/)
  Botón "Generar desde título" que slugify el título
- Era (select: web10 / web20 / general)
- Año (input number, validación 1960-2030)
- Excerpt (textarea, max 300 chars)
- Imagen de portada → <CoverUploader />
- Contenido (Markdown) → <MarkdownEditor />
- Estado (radio: borrador / publicado)

Validación con Zod antes de submit.

---

TAREA 15: components/admin/CoverUploader.tsx

Upload de imagen de portada al Vercel Blob público.

- Drag & drop o click para seleccionar
- Preview de la imagen
- Validar: tipo image/jpeg|png|webp, tamaño max 2MB
- POST a /api/admin/posts/[id]/cover con FormData
- En respuesta: la URL pública del Blob — guardar en el form state
  como cover_image_url

Si es post nuevo (sin id aún): subir DESPUÉS de crear el post, o
hacer upload temporal y asociar al guardar.

---

TAREA 16: components/admin/MarkdownEditor.tsx

Editor de Markdown con preview.
- Tabs "Editar" / "Preview"
- Editar: <textarea> con monospace
- Preview: renderiza con lib/markdown.ts (Fundación)
- Toolbar con botones para insertar: # heading, **bold**, *italic*,
  [link](url), ![image](url), - lista, > quote, `code`

---

TAREA 17: app/admin/comments/page.tsx (P-13 Moderación)

Lista de TODOS los comentarios del sistema.
- Cada CommentRow muestra: post asociado (título + link), autor, email
  (sí, aquí SI se muestra — admin lo ve), preview de contenido,
  fecha, badge si destacado.
- Acciones por fila: 
  - Botón "⭐ Destacar" / "Quitar destacado" (toggle)
  - Botón "🗑 Eliminar" (con confirmación)
- Filtro por post.
- Filtro por destacados.

API endpoints:
- GET /api/admin/comments (lista todos con datos completos incluyendo email)
- DELETE /api/admin/comments/[id]
- PATCH /api/admin/comments/[id]/feature

---

TAREA 18: app/admin/audit/page.tsx (P-14)

Vista de auditoría con selector de mes (YYYY-MM).
GET /api/admin/audit?month=YYYYMM → lee del Blob.

Tabla con: timestamp, user_email, action, entity, summary, metadata.
Filtros: action, entity.

---

TAREA 19: ENDPOINTS ADMIN (todos con withAuth + withRole(['admin']))

POST /api/admin/posts:
- Body validado con Zod (CreatePostRequest)
- Llama dataService.createPost
- recordAudit({ action: 'create_post', entity: 'post', entity_id, summary })
- 201 con el post creado

PUT /api/admin/posts/[id]:
- Mismo patrón con updatePost + audit

DELETE /api/admin/posts/[id]:
- Llama deletePost (cascade elimina comentarios y reacciones por RN-06)
- audit

POST /api/admin/posts/[id]/cover:
- FormData con archivo
- Validar tipo y tamaño
- Llama dataService.uploadPostCover (delegando a blobImages)
- updatePost con la URL nueva
- audit

GET /api/admin/comments:
- Lista todos los comentarios con email visible (admin)

DELETE /api/admin/comments/[id]:
- Elimina + audit

PATCH /api/admin/comments/[id]/feature:
- Toggle is_featured + audit

GET /api/admin/audit?month=YYYYMM:
- Lee del Blob privado y retorna JSON

---

VERIFICACIONES OBLIGATORIAS:

1. RN-07: Intentar eliminar la cuenta del admin con la que estás logueado
   debe retornar 409 con mensaje claro. (Aunque en este sistema solo hay
   un admin por defecto, la regla aplica cuando se agreguen más.)

2. RN-08: Toda acción del admin debe quedar registrada en auditoría.
   Verificar en /admin/audit que aparecen las operaciones recientes.

3. La sala VR debe abrir sin errores en navegadores modernos. Si falla
   el Canvas (por algún navegador antiguo): mostrar fallback con imagen
   estática de la sala + mensaje "Tu navegador no soporta WebGL".

4. El admin no aparece como autor visible en los posts publicados al
   público — solo internamente.

---

AL TERMINAR:

PROBAR LA SALA VR:
- Ir a /mainframe
- Modo escritorio: rotar la cámara con OrbitControls, ver los armarios,
  cintas girando, terminal con texto verde, tarjetas perforadas
- Hover sobre tarjeta perforada → tooltip aparece
- Click en portal → vuelta a /
- Si tienes headset: click "Enter VR" → entrar en modo inmersivo

PROBAR EL ADMIN:
- Login con admin@evoweb.edu.co / admin123
- Crear un post nuevo en era web20
  Subir imagen de portada
  Escribir contenido en Markdown
  Guardar como borrador
  Verificar que NO aparece en /era/web20 público
  Cambiar a publicado
  Verificar que SÍ aparece
- Editar el post
- Ir a /era/web20/[slug] como visitante anónimo y dejar un comentario
- Volver a /admin/comments y destacar ese comentario
- Volver al post como visitante → ver badge "⭐ Destacado"
- Eliminar el comentario desde admin → verificar que desaparece
- Ir a /admin/audit → ver las acciones registradas

Hacer commit:
git add app/mainframe app/admin app/api/admin components/mainframe components/admin
git commit -m "feat(stream-c): sala VR del mainframe + panel admin completo"
git push origin feat/stream-c-mainframe-admin

Notificar al equipo. Tu trabajo en el Stream C termina aquí.
```
