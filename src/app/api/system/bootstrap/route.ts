import { NextResponse } from 'next/server';
import { applyMigrations } from '@/lib/pgMigrate';
import { readSeedData } from '@/lib/seedReader';
import { getSystemMode } from '@/lib/dataService';

export async function POST(req: Request) {
  const body = await req.json();
  const secret = body.secret as string | undefined;

  if (secret !== process.env.ADMIN_BOOTSTRAP_SECRET) {
    return NextResponse.json({ message: 'Secreto inválido' }, { status: 401 });
  }

  const mode = await getSystemMode();
  const seed = readSeedData();

  if (mode === 'seed') {
    return NextResponse.json({ message: 'Modo seed detectado. No hay base de datos configurada.', seed: { users: seed.users.length, posts: seed.posts.length } });
  }

  try {
    const applied = await applyMigrations();
    return NextResponse.json({ message: 'Bootstrap aplicado', applied });
  } catch (error) {
    return NextResponse.json({ message: 'Error al aplicar bootstrap', error: String(error) }, { status: 500 });
  }
}
