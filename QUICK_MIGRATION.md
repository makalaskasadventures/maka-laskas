# Quick Start: Migrate Local Data to Production

## Fastest Method (3 Steps)

### Step 1: Install Dependencies
```bash
cd maka-laskas
npm install
```

### Step 2: Get Production Database URL

**From Vercel Dashboard:**
1. Go to your project → Storage tab
2. Click on your Postgres database
3. Copy `POSTGRES_PRISMA_URL` (or `POSTGRES_URL_NON_POOLING`)

**Or from External Provider:**
- Copy connection string from Neon/Supabase/Railway dashboard

### Step 3: Run Migration

Create/update `.env.local` in the root directory:

```env
# Your local database (should already be here)
DATABASE_URL="postgresql://user:password@localhost:5432/maka_laskas?schema=public"

# Add your production database URL
PRODUCTION_DATABASE_URL="paste-your-production-url-here"
```

Then run:
```bash
npm run db:migrate:data
```

That's it! Your data will be migrated. ✅

---

## What This Does

- ✅ Exports all data from your local database
- ✅ Imports to production database
- ✅ Preserves all relationships
- ✅ Handles duplicates safely
- ✅ Migrates: Countries, Destinations, Adventures, Users, Bookings, Testimonials, etc.

---

## Troubleshooting

**"Cannot connect to production database"**
- Check your `PRODUCTION_DATABASE_URL` is correct
- For external databases, add `?sslmode=require` at the end

**"Table doesn't exist"**
- Run migrations first: `npm run db:migrate:deploy` (with production DATABASE_URL)

**Need more help?** See `DATA_MIGRATION.md` for detailed instructions.














