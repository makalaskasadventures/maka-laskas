import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create Countries
  const countries = await Promise.all([
    prisma.country.upsert({
      where: { code: 'UG' },
      update: {},
      create: {
        name: 'Uganda',
        code: 'UG',
        description: 'The Pearl of Africa - home to mountain gorillas and pristine lakes',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      },
    }),
    prisma.country.upsert({
      where: { code: 'TZ' },
      update: {},
      create: {
        name: 'Tanzania',
        code: 'TZ',
        description: 'Home to the Serengeti migration and Mount Kilimanjaro',
        image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      },
    }),
    prisma.country.upsert({
      where: { code: 'RW' },
      update: {},
      create: {
        name: 'Rwanda',
        code: 'RW',
        description: 'Land of a thousand hills and cultural heritage',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      },
    }),
    prisma.country.upsert({
      where: { code: 'KE' },
      update: {},
      create: {
        name: 'Kenya',
        code: 'KE',
        description: 'Maasai Mara safaris and pristine beaches',
        image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      },
    }),
    prisma.country.upsert({
      where: { code: 'BI' },
      update: {},
      create: {
        name: 'Burundi',
        code: 'BI',
        description: 'Coffee culture and traditional communities',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      },
    }),
    prisma.country.upsert({
      where: { code: 'CD' },
      update: {},
      create: {
        name: 'Democratic Republic of Congo',
        code: 'CD',
        description: 'Rainforests and mighty rivers',
        image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      },
    }),
  ])

  console.log('✅ Countries created')

  // Create Destinations
  const destinations = await Promise.all([
    prisma.destination.upsert({
      where: { id: 'bwindi-uganda' },
      update: {},
      create: {
        id: 'bwindi-uganda',
        name: 'Bwindi Impenetrable Forest',
        region: 'Southwest Uganda',
        description: 'Home to half of the world\'s remaining mountain gorillas',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        countryId: countries[0].id, // Uganda
      },
    }),
    prisma.destination.upsert({
      where: { id: 'serengeti-tanzania' },
      update: {},
      create: {
        id: 'serengeti-tanzania',
        name: 'Serengeti National Park',
        region: 'Northern Tanzania',
        description: 'Witness the greatest wildlife spectacle on Earth',
        image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        countryId: countries[1].id, // Tanzania
      },
    }),
    prisma.destination.upsert({
      where: { id: 'volcanoes-rwanda' },
      update: {},
      create: {
        id: 'volcanoes-rwanda',
        name: 'Volcanoes National Park',
        region: 'Northern Rwanda',
        description: 'Explore Rwanda\'s volcanic landscapes and cultural heritage',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        countryId: countries[2].id, // Rwanda
      },
    }),
    prisma.destination.upsert({
      where: { id: 'masai-mara-kenya' },
      update: {},
      create: {
        id: 'masai-mara-kenya',
        name: 'Maasai Mara Reserve',
        region: 'Southwest Kenya',
        description: 'Incredible biodiversity and Maasai culture',
        image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        countryId: countries[3].id, // Kenya
      },
    }),
  ])

  console.log('✅ Destinations created')

  // Create Adventure Categories
  const categories = await Promise.all([
    prisma.adventureCategory.upsert({
      where: { slug: 'signature-journeys' },
      update: {},
      create: {
        name: 'Signature Journeys',
        slug: 'signature-journeys',
        description: 'Our most transformative and carefully crafted adventures',
        icon: 'Star',
      },
    }),
    prisma.adventureCategory.upsert({
      where: { slug: 'ubuntu-trails' },
      update: {},
      create: {
        name: 'Ubuntu Trails',
        slug: 'ubuntu-trails',
        description: 'Community-focused journeys that connect travelers with local people',
        icon: 'Heart',
      },
    }),
    prisma.adventureCategory.upsert({
      where: { slug: 'purposeful-safaris' },
      update: {},
      create: {
        name: 'Purposeful Safaris',
        slug: 'purposeful-safaris',
        description: 'Wildlife experiences that contribute to conservation',
        icon: 'Leaf',
      },
    }),
    prisma.adventureCategory.upsert({
      where: { slug: 'village-immersions' },
      update: {},
      create: {
        name: 'Village Immersions',
        slug: 'village-immersions',
        description: 'Deep cultural experiences living with local communities',
        icon: 'Users',
      },
    }),
    prisma.adventureCategory.upsert({
      where: { slug: 'founder-led-healing' },
      update: {},
      create: {
        name: 'Founder-Led Healing Tours',
        slug: 'founder-led-healing',
        description: 'Special journeys led by our founder for personal transformation',
        icon: 'Heart',
      },
    }),
  ])

  console.log('✅ Adventure categories created')

  // Create Adventure Themes
  const themes = await Promise.all([
    prisma.adventureTheme.upsert({
      where: { slug: 'nature-wildlife' },
      update: {},
      create: {
        name: 'Nature & Wildlife',
        slug: 'nature-wildlife',
        description: 'Explore the incredible biodiversity of East Africa',
        color: '#10B981', // Green
      },
    }),
    prisma.adventureTheme.upsert({
      where: { slug: 'community-culture' },
      update: {},
      create: {
        name: 'Community & Culture',
        slug: 'community-culture',
        description: 'Immerse yourself in local traditions and daily life',
        color: '#EF4444', // Red
      },
    }),
    prisma.adventureTheme.upsert({
      where: { slug: 'climate-conservation' },
      update: {},
      create: {
        name: 'Climate & Conservation',
        slug: 'climate-conservation',
        description: 'Learn about environmental challenges and conservation efforts',
        color: '#3B82F6', // Blue
      },
    }),
    prisma.adventureTheme.upsert({
      where: { slug: 'healing-spiritual' },
      update: {},
      create: {
        name: 'Healing & Spiritual Travel',
        slug: 'healing-spiritual',
        description: 'Journeys designed for personal growth and spiritual connection',
        color: '#8B5CF6', // Purple
      },
    }),
  ])

  console.log('✅ Adventure themes created')

  // Create Sample Adventures
  const adventures = await Promise.all([
    prisma.adventure.upsert({
      where: { slug: 'gorilla-trekking-cultural-immersion' },
      update: {},
      create: {
        title: 'Gorilla Trekking & Cultural Immersion',
        slug: 'gorilla-trekking-cultural-immersion',
        description: 'A 7-day journey combining the magic of mountain gorilla encounters with deep cultural experiences in local communities. Experience the thrill of tracking gorillas through Bwindi\'s misty forests, then immerse yourself in the rich traditions of the Batwa people.',
        shortDescription: 'Combine gorilla trekking with cultural immersion in local communities',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        ],
        duration: 7,
        groupSize: 6,
        minAge: 15,
        difficulty: 'MODERATE',
        price: 2800,
        originalPrice: 3200,
        isActive: true,
        isFeatured: true,
        isOnSale: true,
        rating: 4.9,
        reviewCount: 127,
        countryId: countries[0].id, // Uganda
        destinationId: destinations[0].id, // Bwindi
        categoryId: categories[0].id, // Signature Journeys
        themeId: themes[0].id, // Nature & Wildlife
      },
    }),
    prisma.adventure.upsert({
      where: { slug: 'serengeti-migration-safari' },
      update: {},
      create: {
        title: 'Serengeti Migration Safari',
        slug: 'serengeti-migration-safari',
        description: 'Witness the greatest wildlife spectacle on Earth while supporting local Maasai communities. Follow the Great Migration across the Serengeti plains, staying in eco-friendly camps and learning about conservation efforts.',
        shortDescription: 'Witness the Great Migration while supporting local communities',
        image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        ],
        duration: 10,
        groupSize: 8,
        minAge: 12,
        difficulty: 'EASY',
        price: 4200,
        isActive: true,
        isFeatured: true,
        rating: 4.8,
        reviewCount: 89,
        countryId: countries[1].id, // Tanzania
        destinationId: destinations[1].id, // Serengeti
        categoryId: categories[2].id, // Purposeful Safaris
        themeId: themes[0].id, // Nature & Wildlife
      },
    }),
    prisma.adventure.upsert({
      where: { slug: 'volcanoes-village-life' },
      update: {},
      create: {
        title: 'Volcanoes & Village Life',
        slug: 'volcanoes-village-life',
        description: 'Explore Rwanda\'s volcanic landscapes and immerse yourself in traditional village life. Trek through the Virunga Mountains, visit local communities, and learn about Rwanda\'s remarkable transformation.',
        shortDescription: 'Explore volcanic landscapes and traditional village life',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        ],
        duration: 8,
        groupSize: 6,
        minAge: 16,
        difficulty: 'CHALLENGING',
        price: 2400,
        isActive: true,
        isFeatured: true,
        rating: 4.7,
        reviewCount: 156,
        countryId: countries[2].id, // Rwanda
        destinationId: destinations[2].id, // Volcanoes
        categoryId: categories[1].id, // Ubuntu Trails
        themeId: themes[1].id, // Community & Culture
      },
    }),
  ])

  console.log('✅ Adventures created')

  // Create Adventure Highlights
  await Promise.all([
    prisma.adventureHighlight.create({
      data: {
        title: 'Gorilla Trekking Experience',
        description: 'Spend 1 hour with a family of mountain gorillas in their natural habitat',
        icon: 'Mountain',
        adventureId: adventures[0].id,
      },
    }),
    prisma.adventureHighlight.create({
      data: {
        title: 'Cultural Village Visit',
        description: 'Learn traditional crafts and cooking with local Batwa communities',
        icon: 'Users',
        adventureId: adventures[0].id,
      },
    }),
    prisma.adventureHighlight.create({
      data: {
        title: 'Great Migration Viewing',
        description: 'Witness thousands of wildebeest and zebra crossing the plains',
        icon: 'Eye',
        adventureId: adventures[1].id,
      },
    }),
    prisma.adventureHighlight.create({
      data: {
        title: 'Maasai Cultural Exchange',
        description: 'Visit Maasai villages and learn about their traditional way of life',
        icon: 'Heart',
        adventureId: adventures[1].id,
      },
    }),
  ])

  console.log('✅ Adventure highlights created')

  // Create Sample Itinerary Items
  await Promise.all([
    prisma.itineraryItem.create({
      data: {
        day: 1,
        title: 'Arrival in Entebbe',
        description: 'Welcome to Uganda! Transfer to your hotel and brief orientation.',
        activities: ['Airport pickup', 'Hotel check-in', 'Welcome dinner'],
        meals: ['Dinner'],
        accommodation: 'Lake Victoria Hotel',
        adventureId: adventures[0].id,
      },
    }),
    prisma.itineraryItem.create({
      data: {
        day: 2,
        title: 'Journey to Bwindi',
        description: 'Scenic drive through the countryside to Bwindi Impenetrable Forest.',
        activities: ['Morning drive', 'Lunch stop', 'Forest arrival'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Bwindi Lodge',
        adventureId: adventures[0].id,
      },
    }),
    prisma.itineraryItem.create({
      data: {
        day: 3,
        title: 'Gorilla Trekking Day',
        description: 'The highlight of your journey - tracking and spending time with mountain gorillas.',
        activities: ['Early morning briefing', 'Gorilla trekking', 'Cultural village visit'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Bwindi Lodge',
        adventureId: adventures[0].id,
      },
    }),
  ])

  console.log('✅ Itinerary items created')

  // Hash password for demo users
  const hashedPassword = await bcrypt.hash('admin123', 12)

  // Delete existing testimonials and users first to ensure fresh data
  await prisma.testimonial.deleteMany({
    where: {
      user: {
        email: {
          in: [
            'admin@maka-laskas.com',
            'sarah.johnson@example.com',
            'michael.chen@example.com'
          ]
        }
      }
    }
  })

  await prisma.user.deleteMany({
    where: {
      email: {
        in: [
          'admin@maka-laskas.com',
          'sarah.johnson@example.com',
          'michael.chen@example.com'
        ]
      }
    }
  })

  // Create Sample Users (including admin)
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'admin@maka-laskas.com',
        name: 'Admin User',
        role: 'ADMIN',
        password: hashedPassword,
      },
    }),
    prisma.user.create({
      data: {
        email: 'sarah.johnson@example.com',
        name: 'Sarah Johnson',
        role: 'USER',
        password: hashedPassword,
      },
    }),
    prisma.user.create({
      data: {
        email: 'michael.chen@example.com',
        name: 'Michael Chen',
        role: 'USER',
        password: hashedPassword,
      },
    }),
  ])

  await Promise.all([
    prisma.testimonial.create({
      data: {
        title: 'Life-changing experience!',
        content: 'The gorilla trekking was absolutely incredible. Spending time with these magnificent creatures in their natural habitat was a dream come true. The cultural immersion with the Batwa community was equally amazing.',
        rating: 5,
        isVerified: true,
        isFeatured: true,
        isPublished: true,
        userId: users[0].id,
        adventureId: adventures[0].id,
      },
    }),
    prisma.testimonial.create({
      data: {
        title: 'Perfect safari experience',
        content: 'The Serengeti migration was everything we hoped for and more. Our guide was knowledgeable, the accommodations were comfortable, and we felt good knowing our trip was supporting local communities.',
        rating: 5,
        isVerified: true,
        isFeatured: true,
        isPublished: true,
        userId: users[1].id,
        adventureId: adventures[1].id,
      },
    }),
  ])

  console.log('✅ Testimonials created')

  // Create Impact Metrics
  await Promise.all([
    prisma.impactMetric.create({
      data: {
        year: 2024,
        metric: 'community_hours',
        value: 5600,
        description: 'Total volunteer and training hours with local communities',
      },
    }),
    prisma.impactMetric.create({
      data: {
        year: 2024,
        metric: 'local_spend_percentage',
        value: 48,
        description: 'Percentage of trip spending with local vendors and communities',
      },
    }),
    prisma.impactMetric.create({
      data: {
        year: 2024,
        metric: 'conservation_funding',
        value: 120000,
        description: 'Total funding provided to conservation projects and rangers',
      },
    }),
    prisma.impactMetric.create({
      data: {
        year: 2024,
        metric: 'youth_beneficiaries',
        value: 800,
        description: 'Number of young people engaged through our programs',
      },
    }),
  ])

  console.log('✅ Impact metrics created')

  console.log('🎉 Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
