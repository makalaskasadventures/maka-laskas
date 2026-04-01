import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { isAdventureTier } from '@/lib/adventure-tier';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const adventure = await prisma.adventure.findUnique({
      where: { id },
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

    if (!adventure) {
      return NextResponse.json({ error: 'Adventure not found' }, { status: 404 });
    }

    return NextResponse.json({ adventure });
  } catch (error) {
    console.error('Error fetching adventure:', error);
    return NextResponse.json({ error: 'Failed to fetch adventure' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Scalars + foreign keys only (no nested relation writes). Mixing `connect` with
    // `highlights`/`itinerary` create in one update makes Prisma XOR-resolve to an input that
    // drops fields like `tier` and fails at runtime.
    const scalarData: Record<string, unknown> = {};

    if (body.title !== undefined) scalarData.title = body.title;
    if (body.slug !== undefined) scalarData.slug = body.slug;
    if (body.description !== undefined) scalarData.description = body.description;
    if (body.shortDescription !== undefined) scalarData.shortDescription = body.shortDescription;
    if (body.image !== undefined) scalarData.image = body.image;
    if (body.gallery !== undefined) scalarData.gallery = body.gallery;
    if (body.duration !== undefined) scalarData.duration = parseInt(body.duration, 10);
    if (body.groupSize !== undefined) scalarData.groupSize = parseInt(body.groupSize, 10);
    if (body.minAge !== undefined) scalarData.minAge = body.minAge ? parseInt(body.minAge, 10) : null;
    if (body.difficulty !== undefined) scalarData.difficulty = body.difficulty;
    if (body.price !== undefined) scalarData.price = parseFloat(body.price);
    if (body.originalPrice !== undefined) {
      scalarData.originalPrice = body.originalPrice ? parseFloat(body.originalPrice) : null;
    }
    if (body.isActive !== undefined) scalarData.isActive = body.isActive;
    if (body.isFeatured !== undefined) scalarData.isFeatured = body.isFeatured;
    if (body.isOnSale !== undefined) scalarData.isOnSale = body.isOnSale;
    if (body.countryId !== undefined) scalarData.countryId = body.countryId;
    if (body.destinationId !== undefined) scalarData.destinationId = body.destinationId || null;
    if (body.categoryId !== undefined) scalarData.categoryId = body.categoryId;
    if (body.themeId !== undefined) scalarData.themeId = body.themeId || null;
    if (body.tier !== undefined && isAdventureTier(body.tier)) scalarData.tier = body.tier;
    if (body.homepageFeaturedOrder !== undefined) scalarData.homepageFeaturedOrder = body.homepageFeaturedOrder;
    if (body.homepageSaleOrder !== undefined) scalarData.homepageSaleOrder = body.homepageSaleOrder;

    if (body.highlights !== undefined) {
      await prisma.adventureHighlight.deleteMany({
        where: { adventureId: id },
      });
    }

    if (body.itinerary !== undefined) {
      await prisma.itineraryItem.deleteMany({
        where: { adventureId: id },
      });
    }

    const nestedData: Record<string, unknown> = {};
    if (body.highlights !== undefined && body.highlights.length > 0) {
      nestedData.highlights = {
        create: body.highlights.map((h: any) => ({
          title: h.title,
          description: h.description || null,
          icon: h.icon || null,
        })),
      };
    }
    if (body.itinerary !== undefined && body.itinerary.length > 0) {
      nestedData.itinerary = {
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

    if (Object.keys(scalarData).length > 0) {
      await prisma.adventure.update({
        where: { id },
        data: scalarData as any,
      });
    }

    if (Object.keys(nestedData).length > 0) {
      await prisma.adventure.update({
        where: { id },
        data: nestedData as any,
      });
    }

    const adventure = await prisma.adventure.findUnique({
      where: { id },
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

    if (!adventure) {
      return NextResponse.json({ error: 'Adventure not found' }, { status: 404 });
    }

    return NextResponse.json({ adventure });
  } catch (error) {
    console.error('Error updating adventure:', error);
    return NextResponse.json({ error: 'Failed to update adventure' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.adventure.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting adventure:', error);
    return NextResponse.json({ error: 'Failed to delete adventure' }, { status: 500 });
  }
}





