# PROMPT STREAM A — TIMELINE HISTÓRICO + WEB 1.0
> Responsable: Estudiante A
> Branch: `feat/stream-a-timeline-web10`
> Dominio exclusivo: `app/page.tsx`, `app/timeline/`, `app/era/web10/`, `components/timeline/`, `components/web10/`
> Prerrequisito: Fundación commiteada en `main`

---

```
Actúa EXCLUSIVAMENTE como Diseñador Frontend Obsesivo + Ingeniero React
con sensibilidad histórica para reproducir auténticamente la estética de
la Web 1.0 (1991-2003) y un timeline interactivo con scroll-based
animation usando Framer Motion. Tu tarea es implementar el Stream A del
proyecto EvoWeb: la landing, el timeline cronológico y la sección Web 1.0
con su estética retro genuina.

ANTES de escribir código:
1. git checkout main && git pull origin main
2. git checkout -b feat/stream-a-timeline-web10
3. Leer doc/PLAN_EVOWEB.md — secciones 13.1 (tema Web 1.0 — los detalles
   son críticos), 13.3 (tema bridge), 16 (Stream A) y la introducción de
   El concepto que distingue este proyecto.
4. NO modificar ningún archivo fuera de tu dominio.

ARCHIVOS QUE VAS A CREAR (y SOLO estos):
- app/page.tsx (REEMPLAZA el stub: Landing)
- app/timeline/page.tsx (REEMPLAZA el stub)
- app/era/web10/page.tsx (REEMPLAZA el stub)
- app/era/web10/[slug]/page.tsx (REEMPLAZA el stub)
- app/era/web10/web10.css (estilos retro scoped)
- components/timeline/Timeline.tsx
- components/timeline/TimelineMilestone.tsx
- components/timeline/TimelineProgress.tsx
- components/web10/PostCardRetro.tsx
- components/web10/MarqueeBanner.tsx
- components/web10/VisitCounter.tsx
- components/web10/GifBanner.tsx
- components/web10/UnderConstruction.tsx
- public/gifs-web10/* (si necesitas assets)

---

TAREA 1: app/page.tsx (Landing — P-01)

Estética: bridge (negra, minimalista). Marcar como server component.

Layout:
- Hero a pantalla completa con fondo negro #0A0A0F y patrón sutil de
  líneas de circuito (puede ser SVG inline)
- Título display grande: "De la página estática a la red colaborativa"
  (Plus Jakarta Sans Bold 48-64px, blanco)
- Subtítulo: "Repositorio pedagógico interactivo sobre la evolución de la
  Web. Asignatura Narrativas Digitales — Universidad Sergio Arboleda."
  (Inter Regular, gris claro)

- Animación de transición visual entre los dos extremos:
  Una franja horizontal que va de izquierda (verde fósforo #39FF14, pixel
  art retro) a derecha (azul moderno #3B82F6, gradient suave). Esto
  visualiza la evolución antes de que el usuario lea una palabra.
  Usar Framer Motion con animación de entrada al hacer scroll.

- 4 cards CTA grandes en una grid 2x2:
  CARD 1: "🕰 Recorre la línea del tiempo" → href="/timeline"
  CARD 2: "📜 Explora la Web 1.0" → href="/era/web10"
       (sutilmente con hover Times New Roman + color azul subrayado)
  CARD 3: "✨ Descubre la Web 2.0" → href="/era/web20"
       (sutilmente con hover sombras suaves modernas)
  CARD 4: "🖥 Entra al Mainframe (VR)" → href="/mainframe"
       (sutilmente con hover efecto de scanlines CRT)

  Cada card tiene un teaser visual de la estética que vas a encontrar al
  entrar — esto vende la experiencia.

- Sección "Sobre el proyecto" más abajo con texto pedagógico breve
  explicando el propósito (sacar del documento del usuario).

---

TAREA 2: app/timeline/page.tsx (Timeline — P-02)

Estética: bridge. Marcar como 'use client' (animaciones Framer Motion).

Datos: hacer fetch a /api/posts (Fundación lo creó) — retorna todos los
posts publicados. Filtrar y ordenar por year ASC.

Layout:
- Header sticky: "Línea del tiempo de la Web" + indicador de progreso
  visual (barra horizontal que se llena al hacer scroll)
- Vista vertical en mobile / horizontal en desktop (usar matchMedia o
  CSS @media para alternar layouts)

Cada hito (TimelineMilestone) muestra:
- Año grande (Plus Jakarta Sans Bold 56px)
- Título del hito
- Excerpt de 1-2 líneas
- Color del nodo según era:
  * 'general' → blanco
  * 'web10' → verde fósforo #39FF14
  * 'web20' → azul moderno #3B82F6
- Línea conectora entre hitos
- Click → navega a /era/{era}/{slug} (web10 o web20) o a /post/{slug}
  para 'general'

Animación crítica:
La estética del timeline EVOLUCIONA conforme se avanza:
- Al inicio (años 1989-1991, era de los mainframes) los nodos tienen
  estética verde fósforo, líneas pixeladas
- En el medio (1996-2003, Web 1.0) tipografía serif, decoración minimal
- Al final (2004+, Web 2.0) tipografía sans-serif moderna, sombras suaves

Esto se logra con Framer Motion `useScroll` + `useTransform` para
interpolar colores y tamaños según la posición del scroll.

---

TAREA 3: app/era/web10/web10.css (CSS scoped retro)

CRÍTICO: La autenticidad de la estética Web 1.0 es lo que hace especial
este stream. NO uses Tailwind aquí — escribe CSS real auténtico de los 90s.

```css
/* Aplicar a todo el contenido bajo /era/web10/* */
.era-web10-container {
  background-color: #C0C0C0;
  background-image: url('data:image/svg+xml,<svg ...');  /* patrón estrellado */
  font-family: "Times New Roman", Times, serif;
  color: #000000;
  font-size: 16px;
  line-height: 1.4;
  padding: 0;
}

.era-web10-container a {
  color: #0000EE;
  text-decoration: underline;
}
.era-web10-container a:visited { color: #551A8B; }
.era-web10-container a:active { color: #FF0000; }

.era-web10-container h1, .era-web10-container h2 {
  font-family: "Times New Roman", Times, serif;
  text-align: center;
  font-weight: bold;
}

.era-web10-container hr {
  border: 0;
  border-top: 2px ridge #999999;
  margin: 1em 0;
}

.era-web10-container button {
  border: 2px outset #DDDDDD;
  background: #C0C0C0;
  font-family: inherit;
  padding: 4px 12px;
  cursor: pointer;
}
.era-web10-container button:active {
  border-style: inset;
}

/* Tabla como layout (auténtico) */
.era-web10-container table.layout {
  width: 640px;
  margin: 0 auto;
  border-collapse: collapse;
}
.era-web10-container table.layout td {
  vertical-align: top;
  padding: 8px;
}
```

---

TAREA 4: app/era/web10/page.tsx (Listado Web 1.0 — P-03)

Server component. Importar el CSS scoped: `import './web10.css';`

Hacer fetch interno a dataService.getPublishedPosts({ era: 'web10' }).

Layout AUTÉNTICO de Web 1.0:
- Fondo #C0C0C0 visible. NO usar contenedor Tailwind centrado.
- Tabla HTML real con role="presentation" como contenedor principal
  (640px de ancho, centrada con margin: 0 auto)
- Banner GIF animado en la parte superior: "Bienvenido a la Web 1.0!"
  (puedes generar un GIF placeholder o usar un SVG animado)
- <marquee> real con: "★ ¡Bienvenido a EvoWeb! ★ Visita nuestros archivos
  ★ Mejor visualizado con Netscape Navigator 2.0 ★"
- <h1> centrado en Times Bold con efecto "pulsar":
  "📜 Archivos de la Web 1.0 📜"
- Lista vertical de posts con PostCardRetro
- Al pie: <UnderConstruction /> + <VisitCounter />
- Texto microscópico al pie: "Última actualización: 1999"

NOTA: Estás haciendo este sitio en 2026, pero debe verse como hecho en
1999. Esto es intencional. La autenticidad es el diferenciador.

---

TAREA 5: app/era/web10/[slug]/page.tsx (Post individual Web 1.0 — P-04)

Server component que recibe params.slug.
Llama a dataService.getPostBySlug(slug). Si no existe o no es era='web10'
o status≠'published': notFound().

Layout retro:
- Mismo CSS scoped
- Tabla 640px centrada
- Título <h1> grande centrado con líneas <hr> arriba y abajo
- "Por: Administrador | Año: 1999 | Hits: 4267" (info ficticia retro)
- Imagen de portada con border="2" (atributo HTML deprecated, sí, usar)
- Contenido del post renderizado (usar lib/markdown.ts de Fundación)
- Al final: "← Volver a archivos" como link azul subrayado
- Banner GIF "Firma este libro de visitas" (no funcional, decorativo)
- Comentarios NO van en Web 1.0 (es coherente con la era — los blogs de
  los 90s no tenían comentarios. Es una decisión pedagógica.)

---

TAREA 6: components/web10/MarqueeBanner.tsx

Wrapper del elemento `<marquee>` (sí, deprecated pero queremos auténtico).
Si la consola advierte, ignorar — es intencional.

```typescript
type Props = { children: React.ReactNode; behavior?: 'scroll' | 'alternate' };
// Renderiza <marquee scrollamount="4" behavior={behavior}>{children}</marquee>
```

Si tienes preocupaciones de accesibilidad: implementarlo con CSS
animation pero manteniendo el aspecto visual idéntico.

---

TAREA 7: components/web10/VisitCounter.tsx

Contador de visitas falso. Usa device_id:
- Lee localStorage 'evoweb_visit_count_web10'
- Si no existe: inicializa con un número alto entre 4200 y 9999
- Cada vez que se monta: incrementa en 1
- Renderiza con dígitos LCD verdes sobre fondo negro
  (CSS con letter-spacing y monospace)

```
┌────────────────────┐
│  04267  Visitantes │
└────────────────────┘
```

---

TAREA 8: components/web10/GifBanner.tsx

Componente que renderiza un "GIF animado" hecho con CSS animation.
Tema "Bajo construcción" o "Bienvenido":
- Texto pulsante con animation de color
- Emoji o ícono ASCII art
- Tamaño 468x60px (banner clásico de los 90s)

Usar style inline con animation keyframes para darle vida.

---

TAREA 9: components/web10/UnderConstruction.tsx

Banner clásico "🚧 BAJO CONSTRUCCIÓN 🚧" con un trabajador GIF (puede ser
un emoji 👷 con animación CSS de balanceo).

---

TAREA 10: components/web10/PostCardRetro.tsx

Tarjeta de post estética Web 1.0:
- Borde con border-style: ridge (auténtico)
- Título como link azul subrayado en Times Bold
- Excerpt en Times Regular
- "Leer más →" como link
- "Año: XXXX" en monospace pequeño
- Imagen con border="2" (atributo HTML)

---

TAREA 11: components/timeline/Timeline.tsx

Componente principal del timeline. 'use client'.
Recibe `posts: Post[]` ordenados por year.

Implementación con Framer Motion:
- useScroll() para obtener el progreso del scroll
- useTransform() para interpolar colores en función del progreso
- Cada TimelineMilestone se anima con whileInView para fade-in al
  entrar en viewport
- Línea conectora SVG que se "dibuja" mientras se hace scroll

---

TAREA 12: components/timeline/TimelineMilestone.tsx

Cada punto del timeline:
```typescript
type Props = {
  year: number;
  title: string;
  excerpt: string;
  era: 'web10' | 'web20' | 'general';
  slug: string;
  position: 'left' | 'right';  // alterna
};
```

Layout:
- Círculo grande con el año adentro
- Tarjeta lateral con título + excerpt + link
- Color del círculo y borde según era
- Animation de entrada Framer Motion: fade + slide desde el lado

---

TAREA 13: components/timeline/TimelineProgress.tsx

Barra de progreso fija en la parte superior que se llena conforme se
hace scroll. Usa useScroll + scaleX en un motion.div.

---

AL TERMINAR:
- npm run dev
- Ir a / → ver landing con 4 cards y animación de transición de eras
- Ir a /timeline → ver hitos con animación al hacer scroll
- Ir a /era/web10 → ver autenticidad retro: Times, fondo gris, marquee,
  contador de visitas, "bajo construcción"
- Ir a /era/web10/1991-primera-pagina-web → ver post individual retro
- Verificar que la estética NO se filtra a otras rutas (no contamina /,
  /timeline, etc.)
- Verificar que el Navbar (Fundación) cambia automáticamente a estética
  retro cuando estás en /era/web10/* y vuelve a bridge en otras rutas

Hacer commit:
git add app/page.tsx app/timeline app/era/web10 components/timeline components/web10
git commit -m "feat(stream-a): landing, timeline interactivo y sección Web 1.0 retro"
git push origin feat/stream-a-timeline-web10

Notificar al equipo. Tu trabajo en el Stream A termina aquí.
```
