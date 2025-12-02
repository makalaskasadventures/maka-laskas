import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/media/[key] - public endpoint returning published entries for a given key
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const { key } = await params
    const { searchParams } = new URL(req.url)
    const limit = parseInt(searchParams.get('limit') ?? '20', 10)

    const sections = await prisma.mediaSection.findMany({
      where: {
        key,
        isActive: true,
      },
      orderBy: [
        { publishedAt: 'desc' },
        { updatedAt: 'desc' },
      ],
      take: isNaN(limit) ? 20 : limit,
    })

    return NextResponse.json({ success: true, data: sections })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}
