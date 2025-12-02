import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const requireAdmin = async () => {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') {
    return null
  }
  return session
}

// GET /api/admin/media - Get all media sections (published and draft)
export async function GET(req: NextRequest) {
  try {
    const session = await requireAdmin()
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type') ?? undefined

    const sections = await prisma.mediaSection.findMany({
      where: type ? { key: type } : undefined,
      orderBy: [
        { isActive: 'desc' },
        { publishedAt: 'desc' },
        { updatedAt: 'desc' },
      ],
      select: {
        id: true,
        key: true,
        title: true,
        thumbnail: true,
        isActive: true,
        publishedAt: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return NextResponse.json({ success: true, data: sections })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

// POST /api/admin/media - Create a new media entry (draft or published)
export async function POST(req: NextRequest) {
  try {
    const session = await requireAdmin()
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { key, title, content, thumbnail, isActive, itemsPerPage, isPaginated } = body ?? {}

    if (!key || !title) {
      return NextResponse.json({ success: false, message: 'key and title are required' }, { status: 400 })
    }

    const now = new Date()
    const saved = await prisma.mediaSection.create({
      data: {
        key,
        title,
        thumbnail,
        content: content ?? { blocks: [] },
        itemsPerPage: typeof itemsPerPage === 'number' ? itemsPerPage : 9,
        isPaginated: typeof isPaginated === 'boolean' ? isPaginated : true,
        isActive: Boolean(isActive),
        publishedAt: isActive ? now : null,
      },
    })

    return NextResponse.json({ success: true, data: saved })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}
