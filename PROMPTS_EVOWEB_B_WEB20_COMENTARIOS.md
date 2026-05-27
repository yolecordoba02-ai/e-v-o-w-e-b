# PROMPT STREAM B — WEB 2.0 + COMENTARIOS Y REACCIONES
> Responsable: Estudiante B
> Branch: `feat/stream-b-web20-comments`
> Dominio exclusivo: `app/era/web20/`, `app/api/comments/`, `app/api/reactions/`, `components/web20/`
> Prerrequisito: Fundación commiteada en `main`

---

```
Actúa EXCLUSIVAMENTE como Diseñador Frontend Obsesivo + Ingeniero React
con experiencia en interfaces modernas, animaciones con Framer Motion,
sistemas de comentarios sin login y reacciones tipo redes sociales. Tu
tarea es implementar el Stream B del proyecto EvoWeb: la sección Web 2.0
con su estética moderna y todo el sistema de interacción social
(comentarios y reacciones) que demuestra en vivo lo que la era enseña.

CARÁCTER PEDAGÓGICO: La Web 2.0 se define por la participación del
usuario. El sitio que el visitante está leyendo NO solo le habla de
participación — le permite participar. Comentarios y reacciones son la
demostración en vivo del concepto.

ANTES de escribir código:
1. git checkout main && git pull origin main
2. git checkout -b feat/stream-b-web20-comments
3. Leer doc/PLAN_EVOWEB.md — secciones 13.2 (tema Web 2.0), 17 (Stream B
   completo), reglas RN-04 (email no se serializa), RN-05 (reacciones
   por device_id, una por dispositivo), y la migration de comments y
   reactions en sección 11
4. NO modificar ningún archivo fuera de tu dominio.

ARCHIVOS QUE VAS A CREAR (y SOLO estos):
- app/era/web20/page.tsx (REEMPLAZA el stub)
- app/era/web20/[slug]/page.tsx (REEMPLAZA el stub)
- app/api/comments/route.ts
- app/api/comments/[id]/route.ts (público — sin DELETE; solo metadata)
- app/api/reactions/route.ts
- components/web20/PostCardModern.tsx
- components/web20/PostHero.tsx
- components/web20/ReactionButton.tsx
- components/web20/CommentForm.tsx
- components/web20/CommentList.tsx
- components/web20/CommentItem.tsx
- components/web20/ShareButton.tsx
- components/web20/PostMeta.tsx

---

TAREA 1: app/era/web20/page.tsx (Listado Web 2.0 — P-05)

Server component. Estética moderna usando Tailwind 4.

Hacer fetch interno a dataService.getPublishedPosts({ era: 'web20' }).

Layout:
- Hero superior:
  - Título: "La Web 2.0" (Plus Jakarta Sans Bold 56px)
  - Subtítulo: "Cuando los usuarios se convirtieron en autores"
    (Inter Regular 20px, gris)
  - Pequeño badge: "Era moderna"
- Grid de PostCardModern (md:grid-cols-2 lg:grid-cols-3 con gap-6)
- Animación de entrada con Framer Motion stagger:
  Cada card aparece con delay incremental (0.1s entre cada una)

Si filtros futuros (por año, autor): dejar el espacio en el header pero
no implementar.

---

TAREA 2: app/era/web20/[slug]/page.tsx (Post individual Web 2.0 — P-06)

Marcar como 'use client' por interactividad de comentarios y reacciones.

Datos: hacer fetch a /api/posts/[slug] (Fundación lo creó) → retorna
PostWithStats (incluye commentCount y reactionCount).

Si no existe o no es era='web20': usar notFound() de next/navigation.

Layout (column-based, max-w-3xl mx-auto):

1. Botón "← Volver" arriba (gris, link)

2. <PostHero> — sección visual destacada:
   - Imagen de portada full-width (aspect-video, lazy loading nativo,
     borde redondeado xl, sombra sutil)
   - Badge de era + año al pie de la imagen
   - Título display Plus Jakarta Sans Bold 48px
   - Excerpt en Inter Regular 18px gris
   - Animación de entrada: fade + slide up con Framer Motion

3. <PostMeta> — barra horizontal con:
   - "Publicado el [fecha]" en pequeño
   - <ReactionButton postId={post.id} initialCount={...} />
   - <ShareButton url={url} title={post.title} />
   - Conteo de comentarios: "💬 12 comentarios" (link a #comments)

4. Contenido del post — markdown renderizado con tipografía cuidada:
   - <article> con clase prose (Tailwind typography plugin) o estilos
     manuales: párrafos con leading-relaxed, headings con margin
     generoso, links subrayados con color primary moderno

5. <hr /> divisor sutil

6. Sección "Comentarios" con id="comments":
   - Título "Comentarios ({count})"
   - <CommentForm postId={post.id} onCommentAdded={...} />
   - <CommentList postId={post.id} />

---

TAREA 3: components/web20/PostCardModern.tsx

Tarjeta moderna estética Web 2.0:
- Card con rounded-2xl, sombra suave (shadow-md hover:shadow-xl)
- Imagen de portada arriba (aspect-video, object-cover, rounded-t-2xl)
- Padding 6 en el contenido
- Badge de era arriba con color azul
- Título line-clamp-2 (Plus Jakarta Sans Bold 20px)
- Excerpt line-clamp-3 (Inter Regular 14px gris)
- Footer: "Año {year}" + "→ Leer" en gradient azul
- hover: scale-[1.02] con transition

Wrappear con motion.div para animación de entrada.

---

TAREA 4: components/web20/ReactionButton.tsx

```typescript
'use client';

type Props = { postId: string; initialCount: number };

export function ReactionButton({ postId, initialCount }: Props) {
  const deviceId = useDeviceId();  // hook de Fundación
  const [count, setCount] = useState(initialCount);
  const [reacted, setReacted] = useState(false);
  const [animating, setAnimating] = useState(false);

  // Al montar: GET /api/reactions?postId=X&deviceId=Y para saber si ya reaccionó
  // (este endpoint debe verificar y retornar { total, reactedByDevice })

  const handleClick = async () => {
    if (!deviceId) return;
    setAnimating(true);
    const res = await fetch('/api/reactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId, deviceId }),
    });
    const data = await res.json();
    setCount(data.total);
    setReacted(data.liked);
    setTimeout(() => setAnimating(false), 600);
  };

  return (
    <button onClick={handleClick} className={...}>
      <motion.span animate={animating ? { scale: [1, 1.4, 1] } : {}}>
        {reacted ? '❤️' : '🤍'}
      </motion.span>
      <span>{count}</span>
    </button>
  );
}
```

Estilo: rounded-full, border, padding, color que cambia según `reacted`.
Animación de corazón al hacer click (scale).

---

TAREA 5: components/web20/CommentForm.tsx

Formulario con validación Zod.
Campos: nombre, email (no se muestra públicamente — usar para Gravatar),
texto del comentario.

```typescript
type Props = {
  postId: string;
  onCommentAdded: (comment: Comment) => void;
};
```

Validaciones:
- Nombre: trim, min 2 chars, max 100
- Email: formato válido (Zod email)
- Contenido: trim, min 1 char, max 2000 chars
- Mostrar contador "X / 2000" cerca del textarea

Submit:
- POST /api/comments con { postId, authorName, authorEmail, content }
- En éxito: limpiar form + llamar onCommentAdded(newComment) +
  mostrar Toast "Comentario publicado ✓"
- En error: Toast con mensaje de error

Estética moderna:
- Inputs con rounded-xl, focus:ring-2 ring-blue-500
- Botón "Publicar comentario" en azul primary
- Texto al pie: "Tu correo no será publicado. Sirve para mostrar tu avatar."

---

TAREA 6: components/web20/CommentList.tsx

```typescript
'use client';

type Props = { postId: string };

// Al montar: GET /api/comments?postId=X
// Estado: comments[]
// Recibe nuevos comentarios desde el form (a través de un context o
// props pasados desde el parent)
```

Renderiza:
- Si no hay comentarios: empty state moderno con ícono
  "Sé el primero en comentar este post."
- Si hay: lista de <CommentItem />, ordenados como vienen del servidor
  (destacados primero, luego por fecha DESC — el dataService ya lo hace)

---

TAREA 7: components/web20/CommentItem.tsx

```typescript
type Props = { comment: Comment };
// El comment NO viene con email (Fundación ya lo filtra en getCommentsByPost)
// PERO necesitamos un avatar — usamos Gravatar con un truco:
// El servidor debe enviarnos el hash MD5 del email en vez del email.
// Para esto, modificar el dataService para incluir un campo computado
// "gravatar_hash" en la respuesta pública.
```

NOTA: La Fundación creó dataService.getCommentsByPost. Si NO incluye el
gravatar_hash, escribe en el RESUMEN al final que necesitas que se
agregue ese campo computado. Mientras tanto: usa un avatar genérico con
las iniciales del nombre.

Layout de cada comentario:
- Avatar redondo a la izquierda (40px)
  Si gravatar_hash: <img src={`https://www.gravatar.com/avatar/${hash}?d=identicon&s=80`} />
  Si no: círculo con iniciales del nombre con bg-gradient
- A la derecha:
  - Nombre del autor en bold
  - Fecha relativa ("hace 2 horas") con date-fns o cálculo manual
  - Si comment.is_featured: badge "⭐ Destacado" en amarillo
  - Contenido del comentario en párrafo
- Separador sutil entre comentarios
- Animación de entrada al aparecer (Framer Motion fade-in + slide)

---

TAREA 8: components/web20/ShareButton.tsx

```typescript
'use client';
type Props = { url: string; title: string };
```

Botón "Compartir" que al hacer click:
- Usa navigator.share() si disponible (mobile)
- Si no: copia URL al clipboard con navigator.clipboard.writeText()
- Muestra Toast: "Enlace copiado ✓"

---

TAREA 9: app/api/comments/route.ts

GET (público):
- Query: ?postId=X
- Llama a dataService.getCommentsByPost(postId)
- Retorna array de comentarios SIN email pero CON gravatar_hash
- Si no se proporciona postId: 400

POST (público):
- Body: { postId, authorName, authorEmail, content }
- Validar con Zod (RN-04: el email es obligatorio internamente)
- Verificar que el post existe y está publicado
- Llamar dataService.createComment()
- Retornar el comment creado (sin email, con gravatar_hash)
- 201 Created

---

TAREA 10: app/api/comments/[id]/route.ts

Solo GET (público) que retorna metadata de un comentario por id.
NO permite DELETE — eso es del admin (Stream C).

---

TAREA 11: app/api/reactions/route.ts

GET (público):
- Query: ?postId=X&deviceId=Y
- Llama a dataService.getReactionsByPost(postId)
- Verifica si ese deviceId ya reaccionó:
  SELECT COUNT(*) FROM reactions WHERE post_id=X AND device_id=Y
- Retorna { total: N, reactedByDevice: boolean }

POST (público):
- Body: { postId, deviceId }
- Validar con Zod (deviceId debe ser UUID v4)
- Llamar dataService.reactToPost(postId, deviceId) — patrón TOGGLE:
  Si ya existe reacción: la elimina (unlike) → retorna { liked: false }
  Si no existe: la crea → retorna { liked: true }
- Recalcular total de reacciones del post
- Retorna { liked: boolean, total: N }

CRÍTICO RN-05: UNIQUE en (post_id, device_id) garantiza que un dispositivo
no pueda reaccionar dos veces. Capturar el error de Postgres si por algún
race condition llegan dos requests del mismo deviceId — devolver el
estado correcto en vez de error.

---

AL TERMINAR:
- npm run dev
- Ir a /era/web20 → ver listado moderno con animaciones stagger
- Click en un post → ver detalle con hero, contenido, reacción, comentarios
- Probar flujo de reacción:
  1. Sin reaccionar: corazón blanco, count = 0
  2. Click → corazón rojo, animación, count = 1, persistido en Supabase
  3. Recargar página → corazón sigue rojo (mismo deviceId)
  4. Abrir en navegador privado → corazón blanco, count = 1
- Probar flujo de comentario:
  1. Llenar formulario con nombre, email, texto
  2. Submit → comentario aparece en la lista al instante
  3. Recargar → comentario sigue ahí
  4. Avatar generado (Gravatar o iniciales)
- Probar share button: en mobile usa navigator.share, en desktop copia URL
- Verificar que ningún email se devuelve en /api/comments respuesta
- Verificar que el Navbar (Fundación) usa estética moderna en /era/web20/*

Hacer commit:
git add app/era/web20 app/api/comments app/api/reactions components/web20
git commit -m "feat(stream-b): Web 2.0 con comentarios y reacciones en tiempo real"
git push origin feat/stream-b-web20-comments

Notificar al equipo. Si necesitas que se agregue gravatar_hash al
dataService de Fundación, anotarlo claramente para la fase de merge.
Tu trabajo en el Stream B termina aquí.
```
