import { NextResponse } from 'next/server';
import { loginSchema } from '@/lib/schemas';
import { getUserByEmail } from '@/lib/dataService';
import { verifyPassword, signJwt } from '@/lib/auth';

export async function POST(req: Request) {
  const body = await req.json();
  const parse = loginSchema.safeParse(body);
  if (!parse.success) {
    return NextResponse.json({ message: 'Datos inválidos' }, { status: 400 });
  }

  const { email, password } = parse.data;
  const user = await getUserByEmail(email);
  if (!user) {
    return NextResponse.json({ message: 'Usuario no encontrado' }, { status: 401 });
  }

  const passwordMatch = await verifyPassword(password, (user as any).password_hash ?? '');
  if (!passwordMatch) {
    return NextResponse.json({ message: 'Credenciales inválidas' }, { status: 401 });
  }

  const token = await signJwt({ userId: user.id, email: user.email, role: user.role });
  const response = NextResponse.json({ message: 'Autenticado' });
  response.cookies.set('evoweb_auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  });
  return response;
}
