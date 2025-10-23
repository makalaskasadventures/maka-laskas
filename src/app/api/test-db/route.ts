import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Test database connection by fetching some data
    const countries = await prisma.country.findMany({
      take: 3,
      select: {
        id: true,
        name: true,
        code: true,
        description: true,
      },
    })

    const adventures = await prisma.adventure.findMany({
      take: 3,
      select: {
        id: true,
        title: true,
        price: true,
        rating: true,
        country: {
          select: {
            name: true,
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Database connection successful!',
      data: {
        countries,
        adventures,
      },
    })
  } catch (error) {
    console.error('Database connection error:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Database connection failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
