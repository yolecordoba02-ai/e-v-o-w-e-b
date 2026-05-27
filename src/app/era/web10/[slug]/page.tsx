import './web10.css';

interface Web10PostPageProps {
  params: { slug: string };
}

export default function Web10PostPage({ params }: Web10PostPageProps) {
  return (
    <section className="era-web10-container min-h-screen px-6 py-12">
      <div className="mx-auto max-w-3xl rounded-xl border border-slate-500/60 bg-white/90 p-8 text-black">
        <h1 className="text-center text-4xl font-bold">Post Web 1.0 — {params.slug}</h1>
        <p className="mt-4">Contenido individual de post en la era Web 1.0. Este es un stub de la fundación.</p>
      </div>
    </section>
  );
}
