interface Web20PostPageProps {
  params: { slug: string };
}

export default function Web20PostPage({ params }: Web20PostPageProps) {
  return (
    <section className="min-h-screen bg-white px-6 py-20 text-slate-900">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-slate-50 p-12 shadow-lg">
        <h1 className="text-4xl font-bold">Web 2.0 Post — {params.slug}</h1>
        <p className="mt-4 text-slate-600">Este es un stub de la fundación para el post individual de Web 2.0.</p>
      </div>
    </section>
  );
}
