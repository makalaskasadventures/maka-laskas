import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get stats from database
    const [
      totalUsers,
      totalAdventures,
      totalBookings,
      totalRevenue
    ] = await Promise.all([
      prisma.user.count(),
      prisma.adventure.count(),
      prisma.booking.count(),
      prisma.booking.aggregate({
        _sum: {
          totalAmount: true
        }
      })
    ])

    return NextResponse.json({
      totalUsers,
      totalAdventures,
      totalBookings,
      totalRevenue: totalRevenue._sum.totalAmount || 0
    })
  } catch (error) {
    console.error('Admin stats error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
