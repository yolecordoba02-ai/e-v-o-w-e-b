interface EmptyStateProps {
  title?: string;
  description?: string;
}

export function EmptyState({ title = 'Nada por aquí', description = 'No hay contenido disponible en este momento.' }: EmptyStateProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-8 text-center text-slate-300">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <p className="mt-2">{description}</p>
    </div>
  );
}
