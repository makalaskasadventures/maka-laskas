import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const adventure = await prisma.adventure.findUnique({
      where: { 
        slug: params.slug,
        isActive: true,
      },
      include: {
        country: true,
        destination: true,
        category: true,
        theme: true,
        highlights: true,
        itinerary: {
          orderBy: {
            day: 'asc',
          },
        },
        testimonials: {
          where: {
            isPublished: true,
          },
          include: {
            user: {
              select: {
                name: true,
                avatar: true,
              },
            },
          },
          take: 10,
        },
      },
    });

    if (!adventure) {
      return NextResponse.json({ error: 'Adventure not found' }, { status: 404 });
    }

    return NextResponse.json({ adventure });
  } catch (error) {
    console.error('Error fetching adventure:', error);
    return NextResponse.json({ error: 'Failed to fetch adventure' }, { status: 500 });
  }
}


