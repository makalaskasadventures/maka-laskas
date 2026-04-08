import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { sanitizeGuestImageField } from '@/lib/testimonial-api-utils'

function parseRating(v: unknown): number {
  const n = typeof v === 'string' ? parseInt(v, 10) : Number(v)
  if (!Number.isInteger(n) || n < 1 || n > 5) {
    throw new Error('Invalid rating')
  }
  return n
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const testimonials = await prisma.testimonial.findMany({
      include: {
        user: { select: { id: true, name: true, email: true, avatar: true } },
        adventure: { select: { id: true, title: true, slug: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ testimonials })
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    const content = typeof body.content === 'string' ? body.content.trim() : ''
    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 })
    }

    let rating: number
    try {
      rating = parseRating(body.rating ?? 5)
    } catch {
      return NextResponse.json({ error: 'Rating must be an integer from 1 to 5' }, { status: 400 })
    }

    const userId =
      typeof body.userId === 'string' && body.userId.trim() !== '' ? body.userId.trim() : null
    const guestName =
      typeof body.guestName === 'string' ? body.guestName.trim() : ''
    const guestLocation =
      typeof body.guestLocation === 'string' ? body.guestLocation.trim() : ''
    const guestImageSanitized = sanitizeGuestImageField(body.guestImage)
    if (!guestImageSanitized.ok) {
      return NextResponse.json({ error: guestImageSanitized.error }, { status: 400 })
    }
    const guestImage = guestImageSanitized.value

    if (!userId && !guestName) {
      return NextResponse.json(
        { error: 'Either link a registered user or enter the customer name' },
        { status: 400 }
      )
    }

    if (userId) {
      const user = await prisma.user.findUnique({ where: { id: userId } })
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 400 })
      }
    }

    let adventureId: string | null =
      typeof body.adventureId === 'string' && body.adventureId.trim() !== ''
        ? body.adventureId.trim()
        : null
    if (adventureId) {
      const adv = await prisma.adventure.findUnique({ where: { id: adventureId } })
      if (!adv) {
        return NextResponse.json({ error: 'Adventure not found' }, { status: 400 })
      }
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        title: typeof body.title === 'string' ? body.title.trim() || null : null,
        content,
        rating,
        isVerified: Boolean(body.isVerified),
        isFeatured: Boolean(body.isFeatured),
        isPublished: Boolean(body.isPublished),
        userId,
        guestName: guestName || null,
        guestLocation: guestLocation || null,
        guestImage,
        adventureId,
      },
      include: {
        user: { select: { id: true, name: true, email: true, avatar: true } },
        adventure: { select: { id: true, title: true, slug: true } },
      },
    })

    return NextResponse.json({ testimonial })
  } catch (error) {
    console.error('Error creating testimonial:', error)
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 })
  }
}
