import { NextResponse } from 'next/server';
import { getCurrentAdmin } from '@/lib/withAuth';

export async function GET() {
  const user = await getCurrentAdmin();
  if (!user) {
    return NextResponse.json({ message: 'No autenticado' }, { status: 401 });
  }
  return NextResponse.json({ user });
}
