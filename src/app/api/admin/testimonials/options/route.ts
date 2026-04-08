import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const [users, adventures] = await Promise.all([
      prisma.user.findMany({
        select: { id: true, name: true, email: true },
        orderBy: [{ name: 'asc' }, { email: 'asc' }],
        take: 500,
      }),
      prisma.adventure.findMany({
        where: { isActive: true },
        select: { id: true, title: true },
        orderBy: { title: 'asc' },
      }),
    ])

    return NextResponse.json({ users, adventures })
  } catch (error) {
    console.error('Error fetching testimonial options:', error)
    return NextResponse.json({ error: 'Failed to load options' }, { status: 500 })
  }
}
