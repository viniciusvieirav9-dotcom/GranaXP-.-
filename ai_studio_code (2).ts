import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'secret-fallback-key-32-chars-length')

export async function createSession(userId: string, role = 'USER') {
  const token = await new SignJWT({ userId, role })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET_KEY)

  cookies().set('granaxp_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7 // 7 dias
  })
}

export async function getSession() {
  const token = cookies().get('granaxp_session')?.value
  if (!token) return null

  try {
    const verified = await jwtVerify(SECRET_KEY, token)
    return verified.payload as { userId: string; role: string }
  } catch (err) {
    return null
  }
}

export function clearSession() {
  cookies().delete('granaxp_session')
}