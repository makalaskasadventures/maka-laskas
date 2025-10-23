import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/media/[key]
export async function GET(
  _req: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const section = await prisma.mediaSection.findUnique({ where: { key: params.key } })
    if (!section) {
      return NextResponse.json({ success: true, data: null })
    }
    return NextResponse.json({ success: true, data: section })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

// PUT /api/media/[key]
export async function PUT(
  req: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const body = await req.json()
    const { title, content, itemsPerPage, isPaginated, isActive } = body ?? {}

    if (!title || !content) {
      return NextResponse.json({ success: false, message: 'title and content are required' }, { status: 400 })
    }

    const saved = await prisma.mediaSection.upsert({
      where: { key: params.key },
      create: {
        key: params.key,
        title,
        content,
        itemsPerPage: typeof itemsPerPage === 'number' ? itemsPerPage : undefined,
        isPaginated: typeof isPaginated === 'boolean' ? isPaginated : undefined,
        isActive: typeof isActive === 'boolean' ? isActive : undefined,
      },
      update: {
        title,
        content,
        itemsPerPage: typeof itemsPerPage === 'number' ? itemsPerPage : undefined,
        isPaginated: typeof isPaginated === 'boolean' ? isPaginated : undefined,
        isActive: typeof isActive === 'boolean' ? isActive : undefined,
      },
    })

    return NextResponse.json({ success: true, data: saved })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

