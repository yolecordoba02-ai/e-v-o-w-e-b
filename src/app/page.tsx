import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="min-h-screen px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-12 backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">EvoWeb — Fundación</p>
          <h1 className="mt-6 text-5xl font-bold tracking-tight text-white">De la página estática a la red colaborativa</h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            Repositorio pedagógico interactivo sobre la evolución de la Web. Asignatura Narrativas Digitales — Universidad Sergio Arboleda.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <Link href="/timeline" className="rounded-3xl border border-white/10 bg-slate-950/80 px-6 py-8 text-left transition hover:bg-slate-900">
              <h2 className="text-xl font-semibold">🕰 Recorre la línea del tiempo</h2>
              <p className="mt-2 text-sm text-slate-400">Desde los mainframes hasta la Web 2.0.</p>
            </Link>
            <Link href="/era/web10" className="rounded-3xl border border-white/10 bg-slate-950/80 px-6 py-8 text-left transition hover:bg-slate-900">
              <h2 className="text-xl font-semibold">📜 Explora la Web 1.0</h2>
              <p className="mt-2 text-sm text-slate-400">Estética retro con GIFs, tablas y Times New Roman.</p>
            </Link>
            <Link href="/era/web20" className="rounded-3xl border border-white/10 bg-slate-950/80 px-6 py-8 text-left transition hover:bg-slate-900">
              <h2 className="text-xl font-semibold">✨ Descubre la Web 2.0</h2>
              <p className="mt-2 text-sm text-slate-400">Contenido moderno, reacciones y comentarios.</p>
            </Link>
            <Link href="/mainframe" className="rounded-3xl border border-white/10 bg-slate-950/80 px-6 py-8 text-left transition hover:bg-slate-900">
              <h2 className="text-xl font-semibold">🖥 Entra al Mainframe (VR)</h2>
              <p className="mt-2 text-sm text-slate-400">Sala VR del mainframe para explorar los orígenes.</p>
            </Link>
          </div>
          <div className="mt-12 rounded-3xl bg-slate-950/70 p-8 text-slate-300">
            <h2 className="text-2xl font-semibold text-white">Sobre el proyecto</h2>
            <p className="mt-4 leading-8">
              EvoWeb encarna la evolución de la Web a través de tres experiencias visuales: Web 1.0, Web 2.0 y una sala VR del Mainframe. La fundación prepara arquitectura, rutas y servicios, mientras que cada stream completa su estética propia.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
