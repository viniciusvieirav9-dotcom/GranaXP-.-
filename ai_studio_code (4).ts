import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { createSession } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const { username, password, displayName } = await req.json()

    if (!username || !password) {
      return NextResponse.json({ error: 'Usuário e senha são obrigatórios' }, { status: 400 })
    }

    const cleanUsername = username.trim().toLowerCase()

    const existingUser = await prisma.user.findUnique({
      where: { username: cleanUsername }
    })

    if (existingUser) {
      return NextResponse.json({ error: 'Este nome de usuário já está em uso' }, { status: 409 })
    }

    const passwordHash = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        username: cleanUsername,
        displayName: displayName?.trim() || cleanUsername,
        passwordHash,
        xp: 25 // Bônus de boas-vindas
      }
    })

    await createSession(user.id, 'USER')

    return NextResponse.json({ success: true, message: 'Conta criada com sucesso!' })
  } catch (error) {
    return NextResponse.json({ error: 'Erro interno ao processar cadastro' }, { status: 500 })
  }
}