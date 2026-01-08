# Data Migration Guide: Local to Production

This guide will help you migrate all your local database data to your production database on Vercel.

## Prerequisites

- ✅ Local database is running and has data
- ✅ Production database is created (Vercel Postgres or external)
- ✅ Production database migrations have been run
- ✅ You have the production database connection string

---

## Method 1: Using the Migration Script (Recommended)

This method uses a TypeScript script to migrate data while preserving relationships.

### Step 1: Install Required Dependencies

```bash
npm install dotenv
```

### Step 2: Get Your Production Database URL

**If using Vercel Postgres:**
1. Go to your Vercel dashboard
2. Navigate to your project → Storage tab
3. Click on your Postgres database
4. Copy the `POSTGRES_PRISMA_URL` or `POSTGRES_URL_NON_POOLING`

**If using external database (Neon, Supabase, etc.):**
- Copy your connection string from your provider's dashboard

### Step 3: Set Up Environment Variables

Create or update `.env.local` file in the root directory:

```env
# Local database (should already exist)
DATABASE_URL="postgresql://user:password@localhost:5432/maka_laskas?schema=public"

# Production database URL
PRODUCTION_DATABASE_URL="postgresql://user:password@host:5432/database?schema=public&sslmode=require"
```

**⚠️ Important:** 
- For Vercel Postgres, use `POSTGRES_PRISMA_URL` format
- For external databases, add `?sslmode=require` at the end
- Never commit `.env.local` to git (it should be in `.gitignore`)

### Step 4: Run the Migration Script

```bash
npm run db:migrate:data
```

The script will:
- ✅ Connect to both local and production databases
- ✅ Export all data from local database
- ✅ Import data to production database
- ✅ Preserve all relationships and IDs
- ✅ Handle conflicts with upsert operations

### What Gets Migrated

The script migrates all data including:
- Countries
- Destinations
- Adventure Categories
- Adventure Themes
- Adventures (with highlights and itineraries)
- Users (including passwords)
- Testimonials
- Bookings (with payments)
- Media Sections
- Impact Metrics
- Inquiries

---

## Method 2: Using pg_dump (Alternative - Faster for Large Databases)

This method uses PostgreSQL's native `pg_dump` tool, which is faster for large databases.

### Step 1: Export Local Database

```bash
# Export data only (no schema)
pg_dump --data-only --column-inserts --no-owner --no-privileges \
  -h localhost -U postgres -d maka_laskas > local_data.sql
```

Or if you need to specify password:
```bash
PGPASSWORD=your_password pg_dump --data-only --column-inserts --no-owner --no-privileges \
  -h localhost -U postgres -d maka_laskas > local_data.sql
```

### Step 2: Import to Production Database

**For Vercel Postgres:**
```bash
# Get connection string from Vercel dashboard
psql "your-production-connection-string" < local_data.sql
```

**For External Database:**
```bash
psql "postgresql://user:password@host:5432/database?sslmode=require" < local_data.sql
```

### Step 3: Handle Foreign Key Constraints

If you get foreign key constraint errors, you may need to temporarily disable them:

```sql
-- Before import
SET session_replication_role = 'replica';

-- After import
SET session_replication_role = 'origin';
```

Or import in the correct order (the migration script handles this automatically).

---

## Method 3: Using Prisma Seed (For Fresh Start)

If you want to start fresh with seed data instead of migrating existing data:

### Step 1: Run Migrations on Production

```bash
# Set production DATABASE_URL
export DATABASE_URL="your-production-database-url"

# Run migrations
npm run db:migrate:deploy
```

### Step 2: Seed Production Database

```bash
# Make sure DATABASE_URL is set to production
export DATABASE_URL="your-production-database-url"

# Run seed
npm run db:seed
```

**⚠️ Warning:** This will only create seed data, not your actual local data. Use this only if you want to start with sample data.

---

## Method 4: Manual Export/Import via Prisma Studio

For small amounts of data or selective migration:

### Step 1: Open Prisma Studio for Local Database

```bash
# Make sure DATABASE_URL points to local
npm run db:studio
```

### Step 2: Export Data Manually

1. Open each table in Prisma Studio
2. Copy the data (you can export as JSON)
3. Save to files

### Step 3: Import to Production

1. Set `DATABASE_URL` to production URL
2. Open Prisma Studio: `npm run db:studio`
3. Manually create records or use the migration script

---

## Troubleshooting

### Error: "Connection refused" or "Cannot connect"

**Solution:**
- Verify your production database URL is correct
- Check if your production database allows connections from your IP
- For Vercel Postgres, ensure you're using the correct connection string format
- For external databases, check firewall settings

### Error: "Foreign key constraint violation"

**Solution:**
- The migration script handles this automatically by migrating in the correct order
- If using pg_dump, ensure you import in the correct order
- Or temporarily disable foreign key checks (not recommended)

### Error: "Duplicate key violation"

**Solution:**
- The migration script uses `upsert` which handles duplicates
- If using pg_dump, you may need to delete existing data first:
  ```sql
  TRUNCATE TABLE table_name CASCADE;
  ```

### Error: "SSL connection required"

**Solution:**
- Add `?sslmode=require` to your connection string
- For Vercel Postgres, use the provided connection strings which include SSL

### Data Not Appearing

**Solution:**
- Check if migrations ran successfully: `npm run db:migrate:deploy`
- Verify connection string is correct
- Check Vercel function logs for errors
- Test connection: `npm run db:studio` with production URL

---

## Verification Steps

After migration, verify your data:

### 1. Check Database Connection

```bash
# Set production DATABASE_URL
export DATABASE_URL="your-production-database-url"

# Test connection
npm run db:studio
```

### 2. Verify Data Counts

```bash
# Run this in Prisma Studio or via API
# Check that record counts match between local and production
```

### 3. Test Your Application

1. Deploy to Vercel (if not already deployed)
2. Visit your production URL
3. Test key features:
   - View adventures
   - User login
   - Admin dashboard
   - Data displays correctly

### 4. Check via API

Visit: `https://your-app.vercel.app/api/test-db`

This should return data from your production database.

---

## Best Practices

1. **Backup First:** Always backup your production database before migration
2. **Test Locally:** Test the migration script with a test database first
3. **Verify Data:** Always verify data after migration
4. **Update Passwords:** Consider updating user passwords after migration
5. **Check Relationships:** Verify that all relationships are preserved
6. **Monitor:** Watch for errors during and after migration

---

## Quick Reference

```bash
# Method 1: Migration Script (Recommended)
npm install dotenv
# Add PRODUCTION_DATABASE_URL to .env.local
npm run db:migrate:data

# Method 2: pg_dump
pg_dump --data-only --column-inserts -h localhost -U postgres -d maka_laskas > local_data.sql
psql "production-url" < local_data.sql

# Method 3: Seed (Fresh Start)
export DATABASE_URL="production-url"
npm run db:migrate:deploy
npm run db:seed

# Verify
export DATABASE_URL="production-url"
npm run db:studio
```

---

## Need Help?

If you encounter issues:
1. Check the error message carefully
2. Verify your connection strings
3. Ensure migrations have run
4. Check Vercel logs
5. Review the troubleshooting section above

Good luck with your migration! 🚀

