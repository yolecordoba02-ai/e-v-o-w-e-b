"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@evoweb.edu.co');
  const [password, setPassword] = useState('admin123');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    setMessage(data.message || 'Login ejecutado');
    setLoading(false);

    if (response.ok) {
      router.push('/admin/dashboard');
    }
  }

  return (
    <section className="min-h-screen px-6 py-20 text-white">
      <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-slate-950/80 p-12">
        <h1 className="text-3xl font-bold">Admin Login — Fundación</h1>
        <p className="mt-4 text-slate-300">Inicia sesión con el usuario admin para validar la fundación.</p>
        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <label className="block text-sm font-medium text-slate-200">Email</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
          />
          <label className="block text-sm font-medium text-slate-200">Password</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
          />
          <button
            type="submit"
            className="w-full rounded-2xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Autenticando...' : 'Iniciar sesión'}
          </button>
        </form>
        {message ? <p className="mt-4 text-slate-200">{message}</p> : null}
      </div>
    </section>
  );
}
