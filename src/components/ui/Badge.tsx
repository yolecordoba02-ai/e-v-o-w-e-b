import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'web10' | 'web20' | 'general';
}

const variantStyles: Record<NonNullable<BadgeProps['variant']>, string> = {
  web10: 'bg-green-500/15 text-emerald-300 border border-emerald-400/20',
  web20: 'bg-sky-500/15 text-sky-300 border border-sky-400/20',
  general: 'bg-white/10 text-white border border-white/10'
};

export function Badge({ children, variant = 'general' }: BadgeProps) {
  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm ${variantStyles[variant]}`}>{children}</span>;
}
