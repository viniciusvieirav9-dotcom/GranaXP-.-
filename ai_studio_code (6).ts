import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function GET() {
  const session = await getSession()
  if (!session || session.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 403 })
  }

  const [totalUsers, totalTransactions, totalGoals] = await Promise.all([
    prisma.user.count(),
    prisma.transaction.count(),
    prisma.goal.count()
  ])

  return NextResponse.json({
    totalUsers,
    totalTransactions,
    totalGoals,
    systemStatus: 'Operacional'
  })
}