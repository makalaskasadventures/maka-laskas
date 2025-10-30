import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const theme = searchParams.get('theme');
    const country = searchParams.get('country');
    const featured = searchParams.get('featured');

    const where: any = {
      isActive: true, // Only show active adventures to public
    };

    if (category) {
      where.category = { slug: category };
    }

    if (theme) {
      where.theme = { slug: theme };
    }

    if (country) {
      where.country = { code: country };
    }

    if (featured === 'true') {
      where.isFeatured = true;
    }

    const adventures = await prisma.adventure.findMany({
      where,
      include: {
        country: true,
        destination: true,
        category: true,
        theme: true,
      },
      orderBy: [
        { isFeatured: 'desc' },
        { createdAt: 'desc' },
      ],
    });

    return NextResponse.json({ adventures });
  } catch (error) {
    console.error('Error fetching adventures:', error);
    return NextResponse.json({ error: 'Failed to fetch adventures' }, { status: 500 });
  }
}


