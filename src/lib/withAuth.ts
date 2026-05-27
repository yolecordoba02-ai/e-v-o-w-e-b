import { cookies } from 'next/headers';
import { verifyJwt } from './auth';

export interface AuthUser {
  userId: string;
  email: string;
  role: string;
}

export async function getCurrentAdmin(): Promise<AuthUser | null> {
  const cookieStore = cookies();
  const token = cookieStore.get('evoweb_auth_token')?.value;
  if (!token) return null;

  try {
    const payload = await verifyJwt(token);
    return {
      userId: String(payload.userId ?? ''),
      email: String(payload.email ?? ''),
      role: String(payload.role ?? '')
    };
  } catch {
    return null;
  }
}

export function requireAdmin(user: AuthUser | null) {
  if (!user || user.role !== 'admin') {
    throw new Error('Unauthorized');
  }
  return user;
}
