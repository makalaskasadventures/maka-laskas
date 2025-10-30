import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const adventure = await prisma.adventure.findUnique({
      where: { id: params.id },
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
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const updateData: any = {};

    // Only update fields that are provided
    if (body.title !== undefined) updateData.title = body.title;
    if (body.slug !== undefined) updateData.slug = body.slug;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.shortDescription !== undefined) updateData.shortDescription = body.shortDescription;
    if (body.image !== undefined) updateData.image = body.image;
    if (body.gallery !== undefined) updateData.gallery = body.gallery;
    if (body.duration !== undefined) updateData.duration = parseInt(body.duration);
    if (body.groupSize !== undefined) updateData.groupSize = parseInt(body.groupSize);
    if (body.minAge !== undefined) updateData.minAge = body.minAge ? parseInt(body.minAge) : null;
    if (body.difficulty !== undefined) updateData.difficulty = body.difficulty;
    if (body.price !== undefined) updateData.price = parseFloat(body.price);
    if (body.originalPrice !== undefined) updateData.originalPrice = body.originalPrice ? parseFloat(body.originalPrice) : null;
    if (body.isActive !== undefined) updateData.isActive = body.isActive;
    if (body.isFeatured !== undefined) updateData.isFeatured = body.isFeatured;
    if (body.isOnSale !== undefined) updateData.isOnSale = body.isOnSale;
    if (body.countryId !== undefined) updateData.countryId = body.countryId;
    if (body.destinationId !== undefined) updateData.destinationId = body.destinationId || null;
    if (body.categoryId !== undefined) updateData.categoryId = body.categoryId;
    if (body.themeId !== undefined) updateData.themeId = body.themeId || null;

    const adventure = await prisma.adventure.update({
      where: { id: params.id },
      data: updateData,
      include: {
        country: true,
        category: true,
      },
    });

    return NextResponse.json({ adventure });
  } catch (error) {
    console.error('Error updating adventure:', error);
    return NextResponse.json({ error: 'Failed to update adventure' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.adventure.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting adventure:', error);
    return NextResponse.json({ error: 'Failed to delete adventure' }, { status: 500 });
  }
}


