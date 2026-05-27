import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET ?? 'evoweb_secret';
const JWT_ISSUER = 'evoweb-admin';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function signJwt(payload: Record<string, unknown>): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(JWT_ISSUER)
    .setExpirationTime('7d')
    .sign(new TextEncoder().encode(JWT_SECRET));
}

export async function verifyJwt(token: string): Promise<Record<string, unknown>> {
  const verified = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET), {
    issuer: JWT_ISSUER
  });
  return verified.payload as Record<string, unknown>;
}
