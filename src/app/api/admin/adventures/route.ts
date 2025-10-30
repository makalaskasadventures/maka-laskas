import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

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
      },
      orderBy: {
        createdAt: 'desc',
      },
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

    const adventure = await prisma.adventure.create({
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description,
        shortDescription: body.shortDescription,
        image: body.image,
        gallery: body.gallery || [],
        duration: parseInt(body.duration),
        groupSize: parseInt(body.groupSize),
        minAge: body.minAge ? parseInt(body.minAge) : null,
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
      },
      include: {
        country: true,
        category: true,
      },
    });

    return NextResponse.json({ adventure }, { status: 201 });
  } catch (error) {
    console.error('Error creating adventure:', error);
    return NextResponse.json({ error: 'Failed to create adventure' }, { status: 500 });
  }
}


