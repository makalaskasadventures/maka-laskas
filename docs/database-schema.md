# Database Schema Documentation

## Overview

The Maka-Laskas Adventures database is built with PostgreSQL and Prisma ORM. The schema is designed to support a comprehensive travel booking and management system.

## Core Models

### User Management
- **User**: Customer, admin, guide, and partner accounts
- **UserRole**: Enum for different user types

### Geographic Data
- **Country**: East African countries (Uganda, Tanzania, Rwanda, Kenya, Burundi, DRC)
- **Destination**: Specific locations within countries (national parks, cities, etc.)

### Adventure System
- **AdventureCategory**: Types of adventures (Signature Journeys, Ubuntu Trails, etc.)
- **AdventureTheme**: Travel themes (Nature & Wildlife, Community & Culture, etc.)
- **Adventure**: Main adventure/trip model with pricing, duration, and details
- **AdventureHighlight**: Key features and selling points for each adventure
- **ItineraryItem**: Day-by-day breakdown of adventure activities

### Booking System
- **Booking**: Customer reservations with status tracking
- **Payment**: Payment records linked to bookings
- **BookingStatus**: Enum for booking states
- **PaymentStatus**: Enum for payment states
- **PaymentMethod**: Enum for payment types

### Content & Reviews
- **Testimonial**: Customer reviews and ratings
- **BlogPost**: Company blog and travel stories
- **Inquiry**: Contact form submissions and customer inquiries

### Business Operations
- **Partnership**: Partner organizations and collaborations
- **ImpactMetric**: Track social and environmental impact metrics

## Key Features

### Data Relationships
- Adventures are linked to countries, destinations, categories, and themes
- Bookings connect users to adventures with payment tracking
- Testimonials can be linked to specific adventures or be general
- Impact metrics track annual performance across different areas

### Business Logic
- Pricing supports both regular and sale prices
- Adventures have difficulty levels and age requirements
- Group size limits and duration tracking
- Rating and review count aggregation
- Featured and active status management

### Scalability Considerations
- Uses CUID for primary keys (better than UUIDs for performance)
- Proper indexing on foreign keys and unique fields
- Cascade deletes where appropriate
- Array fields for flexible data storage (gallery images, activities, etc.)

## Environment Setup

### Database Connection
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/maka_laskas?schema=public"
```

### Available Scripts
- `npm run db:seed` - Populate database with sample data
- `npm run db:reset` - Reset database and re-run migrations
- `npm run db:studio` - Open Prisma Studio for database management

## Sample Data

The seed script creates:
- 6 East African countries
- 4 major destinations
- 5 adventure categories
- 4 adventure themes
- 3 sample adventures with full details
- Adventure highlights and itinerary items
- Sample testimonials and impact metrics

## API Endpoints

- `GET /api/test-db` - Test database connection and return sample data

## Next Steps

1. Create API routes for CRUD operations on adventures
2. Implement user authentication and authorization
3. Add booking and payment processing
4. Create admin dashboard for content management
5. Implement search and filtering for adventures
6. Add image upload and management
7. Create email notifications for bookings
8. Implement analytics and reporting
