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

// GET /api/admin/media/[id] - Retrieve a single media entry
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAdmin()
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const section = await prisma.mediaSection.findUnique({
      where: { id },
    })

    if (!section) {
      return NextResponse.json({ success: false, message: 'Media entry not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: section })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

// PUT /api/admin/media/[id] - Update a media entry
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAdmin()
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await req.json()
    const { key, title, content, thumbnail, isActive, itemsPerPage, isPaginated } = body ?? {}

    if (!key || !title) {
      return NextResponse.json({ success: false, message: 'key and title are required' }, { status: 400 })
    }

    const existing = await prisma.mediaSection.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ success: false, message: 'Media entry not found' }, { status: 404 })
    }

    const shouldPublish = Boolean(isActive)
    const publishedAt = shouldPublish
      ? existing.publishedAt ?? new Date()
      : null

    const updated = await prisma.mediaSection.update({
      where: { id },
      data: {
        key,
        title,
        thumbnail,
        content: content ?? existing.content,
        itemsPerPage: typeof itemsPerPage === 'number' ? itemsPerPage : existing.itemsPerPage,
        isPaginated: typeof isPaginated === 'boolean' ? isPaginated : existing.isPaginated,
        isActive: shouldPublish,
        publishedAt,
      },
    })

    return NextResponse.json({ success: true, data: updated })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

// DELETE /api/admin/media/[id] - Remove a media entry
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAdmin()
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    await prisma.mediaSection.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}

