# Vercel Deployment Setup Guide

This guide will help you connect your deployed Maka-Laskas project to a PostgreSQL database and configure Vercel Blob storage.

## Quick Checklist

- [ ] Create Vercel Postgres database
- [ ] Create Vercel Blob store
- [ ] Add all required environment variables in Vercel
- [ ] Redeploy to apply changes
- [ ] Run database migrations (if not auto-run)
- [ ] Seed initial data (optional)

---

## Step 1: Set Up PostgreSQL Database

### Option A: Vercel Postgres (Recommended - Easiest)

1. **Navigate to Vercel Dashboard:**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Select your project

2. **Create Postgres Database:**
   - Click on the **Storage** tab in your project
   - Click **Create Database**
   - Select **Postgres**
   - Give it a name (e.g., `maka-laskas-db`)
   - Choose a region closest to your users
   - Click **Create**

3. **Important Note:**
   - Vercel automatically creates these environment variables:
     - `POSTGRES_URL` (direct connection)
     - `POSTGRES_PRISMA_URL` (connection pooler for Prisma)
     - `POSTGRES_URL_NON_POOLING` (direct connection without pooler)
   - **However**, Prisma expects `DATABASE_URL`
   - You'll need to add `DATABASE_URL` manually (see Step 3)

### Option B: External PostgreSQL Database

If you prefer an external provider:

#### Neon (Recommended)
1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string from the dashboard
4. It will look like: `postgresql://user:password@host.neon.tech/database?sslmode=require`

#### Supabase
1. Sign up at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to **Settings** → **Database**
4. Copy the connection string (use the "Connection pooling" URI if available)

#### Railway
1. Sign up at [railway.app](https://railway.app)
2. Create a new PostgreSQL service
3. Copy the connection string from the **Variables** tab

---

## Step 2: Set Up Vercel Blob Storage

1. **In Vercel Dashboard:**
   - Go to your project's **Storage** tab
   - Click **Create Database**
   - Select **Blob**
   - Give it a name (e.g., `maka-laskas-storage`)
   - Click **Create**

2. **Get the Token:**
   - After creation, Vercel automatically creates `BLOB_READ_WRITE_TOKEN`
   - You'll need to verify this is set correctly (see Step 3)

---

## Step 3: Configure Environment Variables

1. **Go to Vercel Dashboard:**
   - Navigate to your project
   - Click **Settings** → **Environment Variables**

2. **Add/Verify Required Variables:**

   #### Database Connection
   ```
   DATABASE_URL=your_postgres_connection_string
   ```
   
   **If using Vercel Postgres:**
   - You can use `POSTGRES_PRISMA_URL` value for `DATABASE_URL`
   - Or copy the value from the Storage tab and set it as `DATABASE_URL`
   
   **If using external database:**
   - Use the connection string from your provider
   - Ensure it includes `?sslmode=require` for secure connections

   #### NextAuth Configuration
   ```
   NEXTAUTH_URL=https://your-domain.vercel.app
   NEXTAUTH_SECRET=your-secret-key-here
   ```
   
   **Generate NEXTAUTH_SECRET:**
   ```bash
   # Run this command locally:
   openssl rand -base64 32
   ```
   Or use an online generator: https://generate-secret.vercel.app/32

   #### Storage (Vercel Blob)
   ```
   BLOB_READ_WRITE_TOKEN=vercel_blob_token_here
   ```
   
   **If using Vercel Blob:**
   - This should already be set automatically
   - Verify it exists in Environment Variables
   - If missing, copy it from the Storage tab

3. **Set Environment for All Environments:**
   - Make sure to add these variables for:
     - ✅ **Production**
     - ✅ **Preview** (if you want preview deployments to work)
     - ✅ **Development** (optional, for local testing)

---

## Step 4: Update Vercel Configuration

The `vercel.json` file has been updated to automatically run migrations during build. This ensures your database schema is always up to date.

If you need to manually run migrations, you can use Vercel's CLI:

```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Run migrations manually
vercel env pull .env.local  # Pull environment variables
npx prisma migrate deploy
```

---

## Step 5: Redeploy Your Application

After setting up environment variables:

1. **Trigger a New Deployment:**
   - Go to **Deployments** tab in Vercel
   - Click the **⋯** menu on the latest deployment
   - Select **Redeploy**
   - Or push a new commit to trigger automatic deployment

2. **Monitor the Build:**
   - Watch the build logs to ensure:
     - Prisma generates successfully
     - Migrations run without errors
     - Build completes successfully

---

## Step 6: Verify Database Connection

After deployment, verify your database is connected:

1. **Check Application Logs:**
   - Go to **Deployments** → Click on your latest deployment
   - Check the **Functions** tab for any database errors

2. **Test via API (if you have a test endpoint):**
   - Visit: `https://your-domain.vercel.app/api/test-db` (if available)
   - Or test any endpoint that uses the database

3. **Check Database in Prisma Studio (local):**
   ```bash
   # Pull environment variables first
   vercel env pull .env.local
   
   # Open Prisma Studio
   npm run db:studio
   ```

---

## Step 7: Seed Initial Data (Optional)

If you want to populate your database with initial data:

1. **Pull Environment Variables Locally:**
   ```bash
   vercel env pull .env.local
   ```

2. **Run Seed Script:**
   ```bash
   npm run db:seed
   ```

   This will create:
   - Sample countries and destinations
   - Adventure categories and themes
   - Sample adventures
   - Test user accounts

---

## Troubleshooting

### Database Connection Issues

**Error: Can't reach database server**
- Verify `DATABASE_URL` is set correctly in Vercel
- Check that your database allows connections from Vercel's IP ranges
- For external databases, ensure SSL is enabled (`?sslmode=require`)

**Error: Relation does not exist**
- Migrations haven't been run
- Check build logs to see if `prisma migrate deploy` ran successfully
- Manually run migrations if needed

**Error: Environment variable not found**
- Ensure all environment variables are set in Vercel dashboard
- Redeploy after adding new variables
- Check that variables are set for the correct environment (Production/Preview)

### Storage Issues

**Error: BLOB_READ_WRITE_TOKEN is not defined**
- Verify the token exists in Vercel Environment Variables
- Check that you created a Vercel Blob store
- Copy the token from the Storage tab if needed

**Error: File upload fails**
- Check file size (4.5MB limit for free tier)
- Verify `BLOB_READ_WRITE_TOKEN` is correct
- Check application logs for specific error messages

### Build Issues

**Error: Prisma Client not generated**
- Build command should include `prisma generate`
- Check that `@prisma/client` is in dependencies
- Verify `package.json` has `postinstall` script: `"postinstall": "prisma generate"`

**Error: Migration fails during build**
- Database might not be accessible during build
- Check database connection string
- Try running migrations manually after deployment

---

## Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `DATABASE_URL` | ✅ Yes | PostgreSQL connection string | `postgresql://user:pass@host:5432/db?sslmode=require` |
| `NEXTAUTH_URL` | ✅ Yes | Your application URL | `https://your-app.vercel.app` |
| `NEXTAUTH_SECRET` | ✅ Yes | Secret for NextAuth sessions | (32+ character random string) |
| `BLOB_READ_WRITE_TOKEN` | ✅ Yes | Vercel Blob storage token | (auto-generated by Vercel) |

**For Vercel Postgres:**
- `POSTGRES_URL` - Auto-created, direct connection
- `POSTGRES_PRISMA_URL` - Auto-created, pooler connection (recommended for Prisma)
- `POSTGRES_URL_NON_POOLING` - Auto-created, direct without pooler

---

## Next Steps

Once everything is set up:

1. ✅ Test user authentication
2. ✅ Upload a test image to verify storage
3. ✅ Create test data via admin panel
4. ✅ Verify all features work correctly
5. ✅ Set up monitoring and error tracking (optional)

---

## Additional Resources

- [Vercel Postgres Documentation](https://vercel.com/docs/storage/vercel-postgres)
- [Vercel Blob Documentation](https://vercel.com/docs/storage/vercel-blob)
- [Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment)
- [NextAuth.js Deployment](https://next-auth.js.org/deployment)

---

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check database connection logs
3. Verify all environment variables are set
4. Ensure migrations have run successfully





