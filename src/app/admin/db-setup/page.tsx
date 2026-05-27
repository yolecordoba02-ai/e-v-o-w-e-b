"use client";

import { useState } from 'react';

export default function AdminDbSetupPage() {
  const [secret, setSecret] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleBootstrap() {
    setLoading(true);
    setStatus(null);

    const response = await fetch('/api/system/bootstrap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret })
    });

    const json = await response.json();
    setStatus(json.message ?? 'Bootstrap ejecutado');
    setLoading(false);
  }

  return (
    <section className="min-h-screen px-6 py-20 text-white">
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-slate-950/80 p-12">
        <h1 className="text-4xl font-bold">Admin DB Setup — Fundación</h1>
        <p className="mt-4 text-slate-300">
          Aplica la fundación del sistema: migrations y seed inicial.
        </p>
        <div className="mt-8 space-y-4">
          <label className="block text-sm font-medium text-slate-200">ADMIN_BOOTSTRAP_SECRET</label>
          <input
            value={secret}
            onChange={(event) => setSecret(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
            placeholder="Escribe el secreto de bootstrap"
          />
          <button
            type="button"
            onClick={handleBootstrap}
            disabled={loading}
            className="rounded-2xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-50"
          >
            {loading ? 'Ejecutando...' : 'Aplicar bootstrap'}
          </button>
        </div>
        {status ? <p className="mt-6 text-slate-200">{status}</p> : null}
      </div>
    </section>
  );
}
