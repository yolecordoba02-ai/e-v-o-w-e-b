import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  children: ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold transition focus:outline-none';
  const styles =
    variant === 'primary'
      ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
      : variant === 'outline'
      ? 'border border-white/10 bg-transparent text-white hover:bg-white/5'
      : 'bg-transparent text-white hover:bg-white/5';

  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
}
