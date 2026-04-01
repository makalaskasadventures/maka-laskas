import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { isAdventureTier } from '@/lib/adventure-tier';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const adventures = await prisma.adventure.findMany({
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
      },
      orderBy: [
        { createdAt: 'desc' },
      ],
    });

    return NextResponse.json({ adventures });
  } catch (error) {
    console.error('Error fetching adventures:', error);
    return NextResponse.json({ error: 'Failed to fetch adventures' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Unchecked create only: scalar FKs + tier. Omit highlights/itinerary unless non-empty — passing
    // `undefined` for those keys pushes Prisma XOR toward AdventureCreateInput and `tier` then errors.
    const createData: Record<string, unknown> = {
      title: body.title,
      slug: body.slug,
      description: body.description,
      shortDescription: body.shortDescription,
      image: body.image,
      gallery: body.gallery || [],
      duration: parseInt(body.duration, 10),
      groupSize: parseInt(body.groupSize, 10),
      minAge: body.minAge ? parseInt(body.minAge, 10) : null,
      difficulty: body.difficulty,
      price: parseFloat(body.price),
      originalPrice: body.originalPrice ? parseFloat(body.originalPrice) : null,
      isActive: body.isActive ?? true,
      isFeatured: body.isFeatured ?? false,
      isOnSale: body.isOnSale ?? false,
      countryId: body.countryId,
      destinationId: body.destinationId || null,
      categoryId: body.categoryId,
      themeId: body.themeId || null,
      tier: isAdventureTier(body.tier) ? body.tier : 'EMBARK_AND_DISCOVER',
    };

    if (body.highlights?.length > 0) {
      createData.highlights = {
        create: body.highlights.map((h: any) => ({
          title: h.title,
          description: h.description || null,
          icon: h.icon || null,
        })),
      };
    }

    if (body.itinerary?.length > 0) {
      createData.itinerary = {
        create: body.itinerary.map((item: any) => ({
          day: item.day,
          title: item.title,
          description: item.description || null,
          activities: item.activities || [],
          meals: item.meals || [],
          accommodation: item.accommodation || null,
        })),
      };
    }

    const adventure = await prisma.adventure.create({
      data: createData as any,
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
      },
    });

    return NextResponse.json({ adventure }, { status: 201 });
  } catch (error) {
    console.error('Error creating adventure:', error);
    return NextResponse.json({ error: 'Failed to create adventure' }, { status: 500 });
  }
}





