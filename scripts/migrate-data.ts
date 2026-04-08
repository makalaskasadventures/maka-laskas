import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env.local') })

const localPrisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL, // Local database
    },
  },
})

// Production Prisma client - will be initialized with production URL
let productionPrisma: PrismaClient | null = null

async function initializeProduction() {
  const prodUrl = process.env.PRODUCTION_DATABASE_URL
  if (!prodUrl) {
    throw new Error('PRODUCTION_DATABASE_URL environment variable is required')
  }

  productionPrisma = new PrismaClient({
    datasources: {
      db: {
        url: prodUrl,
      },
    },
  })

  // Test connection
  await productionPrisma.$connect()
  console.log('✅ Connected to production database')
}

async function exportAndImportData() {
  console.log('🚀 Starting data migration from local to production...\n')

  if (!productionPrisma) {
    await initializeProduction()
  }

  try {
    // 1. Export and import Countries
    console.log('📦 Migrating Countries...')
    const countries = await localPrisma.country.findMany()
    for (const country of countries) {
      await productionPrisma!.country.upsert({
        where: { code: country.code },
        update: {
          name: country.name,
          description: country.description,
          image: country.image,
          isActive: country.isActive,
        },
        create: {
          id: country.id,
          name: country.name,
          code: country.code,
          description: country.description,
          image: country.image,
          isActive: country.isActive,
          createdAt: country.createdAt,
          updatedAt: country.updatedAt,
        },
      })
    }
    console.log(`✅ Migrated ${countries.length} countries\n`)

    // 2. Export and import Destinations
    console.log('📦 Migrating Destinations...')
    const destinations = await localPrisma.destination.findMany()
    for (const destination of destinations) {
      await productionPrisma!.destination.upsert({
        where: { id: destination.id },
        update: {
          name: destination.name,
          region: destination.region,
          description: destination.description,
          image: destination.image,
          isActive: destination.isActive,
          countryId: destination.countryId,
        },
        create: {
          id: destination.id,
          name: destination.name,
          region: destination.region,
          description: destination.description,
          image: destination.image,
          isActive: destination.isActive,
          countryId: destination.countryId,
          createdAt: destination.createdAt,
          updatedAt: destination.updatedAt,
        },
      })
    }
    console.log(`✅ Migrated ${destinations.length} destinations\n`)

    // 3. Export and import Adventure Categories
    console.log('📦 Migrating Adventure Categories...')
    const categories = await localPrisma.adventureCategory.findMany()
    for (const category of categories) {
      await productionPrisma!.adventureCategory.upsert({
        where: { slug: category.slug },
        update: {
          name: category.name,
          description: category.description,
          icon: category.icon,
          isActive: category.isActive,
        },
        create: {
          id: category.id,
          name: category.name,
          slug: category.slug,
          description: category.description,
          icon: category.icon,
          isActive: category.isActive,
          createdAt: category.createdAt,
          updatedAt: category.updatedAt,
        },
      })
    }
    console.log(`✅ Migrated ${categories.length} categories\n`)

    // 4. Export and import Adventure Themes
    console.log('📦 Migrating Adventure Themes...')
    const themes = await localPrisma.adventureTheme.findMany()
    for (const theme of themes) {
      await productionPrisma!.adventureTheme.upsert({
        where: { slug: theme.slug },
        update: {
          name: theme.name,
          description: theme.description,
          color: theme.color,
          isActive: theme.isActive,
        },
        create: {
          id: theme.id,
          name: theme.name,
          slug: theme.slug,
          description: theme.description,
          color: theme.color,
          isActive: theme.isActive,
          createdAt: theme.createdAt,
          updatedAt: theme.updatedAt,
        },
      })
    }
    console.log(`✅ Migrated ${themes.length} themes\n`)

    // 5. Export and import Adventures (with related data)
    console.log('📦 Migrating Adventures...')
    const adventures = await localPrisma.adventure.findMany({
      include: {
        highlights: true,
        itinerary: true,
      },
    })

    for (const adventure of adventures) {
      // Create adventure
      await productionPrisma!.adventure.upsert({
        where: { slug: adventure.slug },
        update: {
          title: adventure.title,
          description: adventure.description,
          shortDescription: adventure.shortDescription,
          image: adventure.image,
          gallery: adventure.gallery,
          duration: adventure.duration,
          groupSize: adventure.groupSize,
          minAge: adventure.minAge,
          difficulty: adventure.difficulty,
          price: adventure.price,
          originalPrice: adventure.originalPrice,
          isActive: adventure.isActive,
          isFeatured: adventure.isFeatured,
          isOnSale: adventure.isOnSale,
          homepageFeaturedOrder: adventure.homepageFeaturedOrder,
          homepageSaleOrder: adventure.homepageSaleOrder,
          rating: adventure.rating,
          reviewCount: adventure.reviewCount,
          countryId: adventure.countryId,
          destinationId: adventure.destinationId,
          categoryId: adventure.categoryId,
          themeId: adventure.themeId,
        },
        create: {
          id: adventure.id,
          title: adventure.title,
          slug: adventure.slug,
          description: adventure.description,
          shortDescription: adventure.shortDescription,
          image: adventure.image,
          gallery: adventure.gallery,
          duration: adventure.duration,
          groupSize: adventure.groupSize,
          minAge: adventure.minAge,
          difficulty: adventure.difficulty,
          price: adventure.price,
          originalPrice: adventure.originalPrice,
          isActive: adventure.isActive,
          isFeatured: adventure.isFeatured,
          isOnSale: adventure.isOnSale,
          homepageFeaturedOrder: adventure.homepageFeaturedOrder,
          homepageSaleOrder: adventure.homepageSaleOrder,
          rating: adventure.rating,
          reviewCount: adventure.reviewCount,
          countryId: adventure.countryId,
          destinationId: adventure.destinationId,
          categoryId: adventure.categoryId,
          themeId: adventure.themeId,
          createdAt: adventure.createdAt,
          updatedAt: adventure.updatedAt,
        },
      })

      // Migrate highlights
      if (adventure.highlights.length > 0) {
        await productionPrisma!.adventureHighlight.deleteMany({
          where: { adventureId: adventure.id },
        })
        await productionPrisma!.adventureHighlight.createMany({
          data: adventure.highlights.map((h) => ({
            id: h.id,
            title: h.title,
            description: h.description,
            icon: h.icon,
            adventureId: adventure.id,
            createdAt: h.createdAt,
            updatedAt: h.updatedAt,
          })),
        })
      }

      // Migrate itinerary
      if (adventure.itinerary.length > 0) {
        await productionPrisma!.itineraryItem.deleteMany({
          where: { adventureId: adventure.id },
        })
        await productionPrisma!.itineraryItem.createMany({
          data: adventure.itinerary.map((item) => ({
            id: item.id,
            day: item.day,
            title: item.title,
            description: item.description,
            activities: item.activities,
            meals: item.meals,
            accommodation: item.accommodation,
            adventureId: adventure.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          })),
        })
      }
    }
    console.log(`✅ Migrated ${adventures.length} adventures with highlights and itineraries\n`)

    // 6. Export and import Users
    console.log('📦 Migrating Users...')
    const users = await localPrisma.user.findMany()
    for (const user of users) {
      await productionPrisma!.user.upsert({
        where: { email: user.email },
        update: {
          name: user.name,
          phone: user.phone,
          avatar: user.avatar,
          password: user.password,
          emailVerified: user.emailVerified,
          role: user.role,
          isActive: user.isActive,
        },
        create: {
          id: user.id,
          email: user.email,
          name: user.name,
          phone: user.phone,
          avatar: user.avatar,
          password: user.password,
          emailVerified: user.emailVerified,
          role: user.role,
          isActive: user.isActive,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      })
    }
    console.log(`✅ Migrated ${users.length} users\n`)

    // 7. Export and import Testimonials
    console.log('📦 Migrating Testimonials...')
    const testimonials = await localPrisma.testimonial.findMany()
    for (const testimonial of testimonials) {
      await productionPrisma!.testimonial.upsert({
        where: { id: testimonial.id },
        update: {
          title: testimonial.title,
          content: testimonial.content,
          rating: testimonial.rating,
          isVerified: testimonial.isVerified,
          isFeatured: testimonial.isFeatured,
          isPublished: testimonial.isPublished,
          guestName: testimonial.guestName,
          guestLocation: testimonial.guestLocation,
          guestImage: testimonial.guestImage,
          userId: testimonial.userId,
          adventureId: testimonial.adventureId,
        },
        create: {
          id: testimonial.id,
          title: testimonial.title,
          content: testimonial.content,
          rating: testimonial.rating,
          isVerified: testimonial.isVerified,
          isFeatured: testimonial.isFeatured,
          isPublished: testimonial.isPublished,
          guestName: testimonial.guestName,
          guestLocation: testimonial.guestLocation,
          guestImage: testimonial.guestImage,
          userId: testimonial.userId,
          adventureId: testimonial.adventureId,
          createdAt: testimonial.createdAt,
          updatedAt: testimonial.updatedAt,
        },
      })
    }
    console.log(`✅ Migrated ${testimonials.length} testimonials\n`)

    // 8. Export and import Bookings
    console.log('📦 Migrating Bookings...')
    const bookings = await localPrisma.booking.findMany({
      include: {
        payments: true,
      },
    })
    for (const booking of bookings) {
      await productionPrisma!.booking.upsert({
        where: { bookingNumber: booking.bookingNumber },
        update: {
          status: booking.status,
          totalAmount: booking.totalAmount,
          depositAmount: booking.depositAmount,
          paidAmount: booking.paidAmount,
          currency: booking.currency,
          startDate: booking.startDate,
          endDate: booking.endDate,
          participants: booking.participants,
          specialRequests: booking.specialRequests,
          notes: booking.notes,
          userId: booking.userId,
          adventureId: booking.adventureId,
        },
        create: {
          id: booking.id,
          bookingNumber: booking.bookingNumber,
          status: booking.status,
          totalAmount: booking.totalAmount,
          depositAmount: booking.depositAmount,
          paidAmount: booking.paidAmount,
          currency: booking.currency,
          startDate: booking.startDate,
          endDate: booking.endDate,
          participants: booking.participants,
          specialRequests: booking.specialRequests,
          notes: booking.notes,
          userId: booking.userId,
          adventureId: booking.adventureId,
          createdAt: booking.createdAt,
          updatedAt: booking.updatedAt,
        },
      })

      // Migrate payments
      if (booking.payments.length > 0) {
        await productionPrisma!.payment.deleteMany({
          where: { bookingId: booking.id },
        })
        await productionPrisma!.payment.createMany({
          data: booking.payments.map((p) => ({
            id: p.id,
            amount: p.amount,
            currency: p.currency,
            status: p.status,
            method: p.method,
            transactionId: p.transactionId,
            bookingId: p.bookingId,
            createdAt: p.createdAt,
            updatedAt: p.updatedAt,
          })),
        })
      }
    }
    console.log(`✅ Migrated ${bookings.length} bookings with payments\n`)

    // 9. Export and import Media Sections
    console.log('📦 Migrating Media Sections...')
    const mediaSections = await localPrisma.mediaSection.findMany()
    for (const section of mediaSections) {
      await productionPrisma!.mediaSection.upsert({
        where: { id: section.id },
        update: {
          key: section.key,
          title: section.title,
          thumbnail: section.thumbnail,
          content: section.content as any,
          itemsPerPage: section.itemsPerPage,
          isPaginated: section.isPaginated,
          isActive: section.isActive,
          publishedAt: section.publishedAt,
        },
        create: {
          id: section.id,
          key: section.key,
          title: section.title,
          thumbnail: section.thumbnail,
          content: section.content as any,
          itemsPerPage: section.itemsPerPage,
          isPaginated: section.isPaginated,
          isActive: section.isActive,
          publishedAt: section.publishedAt,
          createdAt: section.createdAt,
          updatedAt: section.updatedAt,
        },
      })
    }
    console.log(`✅ Migrated ${mediaSections.length} media sections\n`)

    // 10. Export and import Impact Metrics
    console.log('📦 Migrating Impact Metrics...')
    const impactMetrics = await localPrisma.impactMetric.findMany()
    for (const metric of impactMetrics) {
      await productionPrisma!.impactMetric.upsert({
        where: { id: metric.id },
        update: {
          year: metric.year,
          metric: metric.metric,
          value: metric.value,
          description: metric.description,
        },
        create: {
          id: metric.id,
          year: metric.year,
          metric: metric.metric,
          value: metric.value,
          description: metric.description,
          createdAt: metric.createdAt,
          updatedAt: metric.updatedAt,
        },
      })
    }
    console.log(`✅ Migrated ${impactMetrics.length} impact metrics\n`)

    // 11. Export and import Inquiries
    console.log('📦 Migrating Inquiries...')
    const inquiries = await localPrisma.inquiry.findMany()
    for (const inquiry of inquiries) {
      await productionPrisma!.inquiry.upsert({
        where: { id: inquiry.id },
        update: {
          type: inquiry.type,
          subject: inquiry.subject,
          message: inquiry.message,
          status: inquiry.status,
          response: inquiry.response,
          userId: inquiry.userId,
          email: inquiry.email,
          name: inquiry.name,
          phone: inquiry.phone,
        },
        create: {
          id: inquiry.id,
          type: inquiry.type,
          subject: inquiry.subject,
          message: inquiry.message,
          status: inquiry.status,
          response: inquiry.response,
          userId: inquiry.userId,
          email: inquiry.email,
          name: inquiry.name,
          phone: inquiry.phone,
          createdAt: inquiry.createdAt,
          updatedAt: inquiry.updatedAt,
        },
      })
    }
    console.log(`✅ Migrated ${inquiries.length} inquiries\n`)

    console.log('🎉 Data migration completed successfully!')
  } catch (error) {
    console.error('❌ Error during migration:', error)
    throw error
  } finally {
    await localPrisma.$disconnect()
    if (productionPrisma) {
      await productionPrisma.$disconnect()
    }
  }
}

// Run migration
exportAndImportData()
  .then(() => {
    console.log('\n✅ All done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Migration failed:', error)
    process.exit(1)
  })














