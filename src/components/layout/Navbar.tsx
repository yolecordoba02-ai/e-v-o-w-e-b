"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Inicio', href: '/' },
  { label: 'Timeline', href: '/timeline' },
  { label: 'Web 1.0', href: '/era/web10' },
  { label: 'Web 2.0', href: '/era/web20' },
  { label: 'Mainframe', href: '/mainframe' },
  { label: 'Admin', href: '/admin/db-setup' }
];

export function Navbar() {
  const pathname = usePathname();
  const eraClass = pathname.startsWith('/era/web10')
    ? 'era-web10'
    : pathname.startsWith('/era/web20')
    ? 'era-web20'
    : 'bridge';

  return (
    <header className={`sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 ${eraClass === 'bridge' ? 'text-white' : eraClass === 'era-web10' ? 'text-black' : 'text-slate-900'}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-bold tracking-[0.18em] uppercase">
          EvoWeb
        </Link>
        <nav className="hidden items-center gap-4 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm transition hover:text-cyan-300">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
