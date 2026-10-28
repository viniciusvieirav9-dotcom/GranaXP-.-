import { NextResponse } from 'next/server'
import { createSession } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const { password } = await req.json()
    const configuredAdminPassword = process.env.ADMIN_PASSWORD || '31181022'

    if (!password || password !== configuredAdminPassword) {
      return NextResponse.json({ error: 'Senha administrativa incorreta.' }, { status: 401 })
    }

    // Cria sessão administrativa temporária
    await createSession('ADMIN_ROOT_USER', 'ADMIN')

    return NextResponse.json({ success: true, redirect: '/admin' })
  } catch (error) {
    return NextResponse.json({ error: 'Erro de validação' }, { status: 500 })
  }
}