import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { Prisma } from '@prisma/client'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { sanitizeGuestImageField } from '@/lib/testimonial-api-utils'

function jsonErrorFromCaught(error: unknown, fallback: string) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return NextResponse.json(
      { error: error.message, code: error.code, meta: error.meta },
      { status: 400 }
    )
  }
  if (error instanceof Prisma.PrismaClientValidationError) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
  console.error(fallback, error)
  return NextResponse.json({ error: fallback }, { status: 500 })
}

function parseRating(v: unknown): number | undefined {
  if (v === undefined) return undefined
  const n = typeof v === 'string' ? parseInt(v, 10) : Number(v)
  if (!Number.isInteger(n) || n < 1 || n > 5) {
    throw new Error('Invalid rating')
  }
  return n
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const testimonial = await prisma.testimonial.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true, avatar: true } },
        adventure: { select: { id: true, title: true, slug: true } },
      },
    })

    if (!testimonial) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json({ testimonial })
  } catch (error: unknown) {
    return jsonErrorFromCaught(error, 'Failed to fetch testimonial')
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const existing = await prisma.testimonial.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const body = await request.json()
    const data: Prisma.TestimonialUpdateInput = {}

    if (body.title !== undefined) {
      data.title =
        typeof body.title === 'string' ? body.title.trim() || null : body.title ?? null
    }
    if (body.content !== undefined) {
      const content = typeof body.content === 'string' ? body.content.trim() : ''
      if (!content) {
        return NextResponse.json({ error: 'Content cannot be empty' }, { status: 400 })
      }
      data.content = content
    }
    if (body.rating !== undefined) {
      try {
        const r = parseRating(body.rating)
        if (r !== undefined) data.rating = r
      } catch {
        return NextResponse.json({ error: 'Rating must be an integer from 1 to 5' }, { status: 400 })
      }
    }
    if (body.isVerified !== undefined) data.isVerified = Boolean(body.isVerified)
    if (body.isFeatured !== undefined) data.isFeatured = Boolean(body.isFeatured)
    if (body.isPublished !== undefined) data.isPublished = Boolean(body.isPublished)

    if (body.guestName !== undefined) {
      data.guestName =
        typeof body.guestName === 'string' ? body.guestName.trim() || null : null
    }
    if (body.guestLocation !== undefined) {
      data.guestLocation =
        typeof body.guestLocation === 'string' ? body.guestLocation.trim() || null : null
    }
    if (body.guestImage !== undefined) {
      const img = sanitizeGuestImageField(body.guestImage)
      if (!img.ok) {
        return NextResponse.json({ error: img.error }, { status: 400 })
      }
      data.guestImage = img.value
    }

    const mergedUserId =
      body.userId === undefined
        ? existing.userId
        : typeof body.userId === 'string' && body.userId.trim() !== ''
          ? body.userId.trim()
          : null

    const mergedGuestName =
      body.guestName === undefined
        ? existing.guestName
        : typeof body.guestName === 'string'
          ? body.guestName.trim() || null
          : null

    const mergedGuestStr =
      typeof mergedGuestName === 'string' ? mergedGuestName.trim() : ''

    if (!mergedUserId && !mergedGuestStr) {
      return NextResponse.json(
        { error: 'Either link a registered user or enter the customer name' },
        { status: 400 }
      )
    }

    if (body.userId !== undefined) {
      if (mergedUserId) {
        const user = await prisma.user.findUnique({ where: { id: mergedUserId } })
        if (!user) {
          return NextResponse.json({ error: 'User not found' }, { status: 400 })
        }
        data.user = { connect: { id: mergedUserId } }
      } else {
        data.user = { disconnect: true }
      }
    }

    if (body.adventureId !== undefined) {
      const raw =
        typeof body.adventureId === 'string' && body.adventureId.trim() !== ''
          ? body.adventureId.trim()
          : null
      if (raw) {
        const adv = await prisma.adventure.findUnique({ where: { id: raw } })
        if (!adv) {
          return NextResponse.json({ error: 'Adventure not found' }, { status: 400 })
        }
        data.adventure = { connect: { id: raw } }
      } else {
        data.adventure = { disconnect: true }
      }
    }

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data,
      include: {
        user: { select: { id: true, name: true, email: true, avatar: true } },
        adventure: { select: { id: true, title: true, slug: true } },
      },
    })

    return NextResponse.json({ testimonial })
  } catch (error: unknown) {
    return jsonErrorFromCaught(error, 'Failed to update testimonial')
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.testimonial.delete({ where: { id } })

    return NextResponse.json({ ok: true })
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    return jsonErrorFromCaught(error, 'Failed to delete testimonial')
  }
}
