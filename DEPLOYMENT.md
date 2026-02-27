# Deployment Guide: Maka-Laskas to Vercel

This guide will walk you through deploying your Maka-Laskas project to Vercel with PostgreSQL database and file storage configured.

## Prerequisites

- A GitHub account
- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Your project code pushed to a GitHub repository

---

## Step 1: Prepare Your Project

### 1.1 Ensure Your Code is on GitHub

```bash
# If not already done, initialize git and push to GitHub
cd maka-laskas
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 1.2 Create `.env.example` File

Create a `.env.example` file in the root directory to document required environment variables:

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Storage (if using Vercel Blob)
BLOB_READ_WRITE_TOKEN="your-blob-token"
```

---

## Step 2: Set Up PostgreSQL Database

You have two options for PostgreSQL:

### Option A: Vercel Postgres (Recommended - Easiest)

1. **Create Vercel Postgres Database:**
   - Go to your Vercel dashboard
   - Navigate to your project (or create a new one)
   - Go to the **Storage** tab
   - Click **Create Database** → Select **Postgres**
   - Choose a name for your database (e.g., `maka-laskas-db`)
   - Select a region closest to your users
   - Click **Create**

2. **Get Connection String:**
   - After creation, Vercel will automatically add the `POSTGRES_URL` environment variable
   - Note: Vercel uses `POSTGRES_URL` but Prisma expects `DATABASE_URL`
   - We'll configure this in Step 4

### Option B: External PostgreSQL (Neon, Supabase, Railway, etc.)

If you prefer an external database provider:

**Neon (Recommended for external):**
1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string (it will look like: `postgresql://user:password@host/database?sslmode=require`)

**Supabase:**
1. Sign up at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings → Database
4. Copy the connection string

**Railway:**
1. Sign up at [railway.app](https://railway.app)
2. Create a new PostgreSQL service
3. Copy the connection string from the Variables tab

---

## Step 3: Set Up File Storage

Currently, your app stores images as base64 data URLs. For production, you need proper file storage.

### Option A: Vercel Blob Storage (Recommended)

1. **Create Vercel Blob Store:**
   - In your Vercel dashboard, go to **Storage** tab
   - Click **Create Database** → Select **Blob**
   - Name it (e.g., `maka-laskas-storage`)
   - Click **Create**
   - Copy the `BLOB_READ_WRITE_TOKEN` (you'll need this)

2. **Install Vercel Blob SDK:**
   ```bash
   npm install @vercel/blob
   ```

3. **Create Upload API Route:**
   Create `src/app/api/upload/route.ts`:
   ```typescript
   import { put } from '@vercel/blob'
   import { NextRequest, NextResponse } from 'next/server'
   import { getServerSession } from 'next-auth'
   import { authOptions } from '@/lib/auth'

   export async function POST(request: NextRequest) {
     try {
       // Check authentication
       const session = await getServerSession(authOptions)
       if (!session || session.user.role !== 'ADMIN') {
         return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
       }

       const formData = await request.formData()
       const file = formData.get('file') as File

       if (!file) {
         return NextResponse.json({ error: 'No file provided' }, { status: 400 })
       }

       // Upload to Vercel Blob
       const blob = await put(file.name, file, {
         access: 'public',
         token: process.env.BLOB_READ_WRITE_TOKEN,
       })

       return NextResponse.json({ url: blob.url })
     } catch (error) {
       console.error('Upload error:', error)
       return NextResponse.json(
         { error: 'Failed to upload file' },
         { status: 500 }
       )
     }
   }
   ```

### Option B: Cloudinary (Alternative)

1. **Sign up at [cloudinary.com](https://cloudinary.com)**
2. **Install Cloudinary SDK:**
   ```bash
   npm install cloudinary
   ```
3. **Create upload API route** (similar to above but using Cloudinary)

### Option C: AWS S3 (For advanced users)

Requires AWS account and S3 bucket setup.

---

## Step 4: Deploy to Vercel

### 4.1 Connect Repository

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **Add New Project**
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings

### 4.2 Configure Build Settings

Vercel should auto-detect:
- **Framework Preset:** Next.js
- **Build Command:** `npm run build` (or `next build`)
- **Output Directory:** `.next`
- **Install Command:** `npm install`

### 4.3 Configure Environment Variables

In the Vercel project settings, go to **Environment Variables** and add:

#### Required Variables:

```
DATABASE_URL=your-postgres-connection-string
NEXTAUTH_URL=https://your-project.vercel.app
NEXTAUTH_SECRET=generate-a-random-secret-here
```

**For Vercel Postgres:**
- If using Vercel Postgres, add: `POSTGRES_PRISMA_URL` and `POSTGRES_URL_NON_POOLING`
- Then add: `DATABASE_URL=$POSTGRES_PRISMA_URL` (or use `POSTGRES_PRISMA_URL` directly)

**For Vercel Blob Storage:**
```
BLOB_READ_WRITE_TOKEN=your-blob-token
```

#### Generate NEXTAUTH_SECRET:

```bash
# Run this command locally to generate a secure secret
openssl rand -base64 32
```

Or use an online generator: [generate-secret.vercel.app](https://generate-secret.vercel.app/32)

### 4.4 Update Prisma Schema (if using Vercel Postgres)

If you're using Vercel Postgres, you may need to update your `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("POSTGRES_PRISMA_URL")  // Use POSTGRES_PRISMA_URL for Vercel Postgres
  // OR
  // url      = env("DATABASE_URL")  // For external databases
}
```

### 4.5 Add Build Script for Prisma

Update your `package.json` to include Prisma generation in the build:

```json
{
  "scripts": {
    "build": "prisma generate && next build",
    "postinstall": "prisma generate"
  }
}
```

### 4.6 Deploy

1. Click **Deploy**
2. Wait for the build to complete
3. Your site will be live at `https://your-project.vercel.app`

---

## Step 5: Run Database Migrations

After deployment, you need to run Prisma migrations on your production database.

### Option 1: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link your project
vercel link

# Pull environment variables
vercel env pull .env.local

# Run migrations
npx prisma migrate deploy
```

### Option 2: Using Prisma Migrate Deploy Script

Add a script to your `package.json`:

```json
{
  "scripts": {
    "db:migrate:deploy": "prisma migrate deploy"
  }
}
```

Then run it locally with production DATABASE_URL:

```bash
DATABASE_URL="your-production-database-url" npm run db:migrate:deploy
```

### Option 3: Using Vercel Postgres Dashboard

If using Vercel Postgres, you can:
1. Go to your database in Vercel dashboard
2. Use the SQL editor to run migrations manually
3. Or use Prisma Studio: `npx prisma studio` (with production DATABASE_URL)

---

## Step 6: Seed Production Database (Optional)

If you want to seed your production database:

```bash
# Set production DATABASE_URL
export DATABASE_URL="your-production-database-url"

# Run seed
npm run db:seed
```

**⚠️ Warning:** Only seed if you want initial data. Don't run this if you already have production data.

---

## Step 7: Update Image Upload Components

Update your image upload handlers to use the new upload API:

### Update `AdventureForm.tsx`:

```typescript
const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]
  if (!file) return

  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    if (response.ok) {
      const { url } = await response.json()
      handleChange('image', url)
    } else {
      console.error('Upload failed')
    }
  } catch (error) {
    console.error('Upload error:', error)
  }
}
```

Do the same for other image upload handlers in `ElementSettingsPanel.tsx`.

---

## Step 8: Configure Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Navigate to **Domains**
3. Add your custom domain
4. Follow DNS configuration instructions

---

## Step 9: Set Up Environment Variables for All Environments

In Vercel, configure environment variables for:
- **Production**
- **Preview** (for pull requests)
- **Development** (for local development)

Make sure `NEXTAUTH_URL` is different for each:
- Production: `https://your-domain.com`
- Preview: `https://your-project-git-branch.vercel.app`
- Development: `http://localhost:3000`

---

## Troubleshooting

### Database Connection Issues

1. **Check connection string format:**
   - Should start with `postgresql://`
   - For Vercel Postgres, use `POSTGRES_PRISMA_URL`
   - For external, ensure SSL is enabled: `?sslmode=require`

2. **Check environment variables:**
   - Ensure `DATABASE_URL` is set in Vercel dashboard
   - Redeploy after adding environment variables

### Build Failures

1. **Prisma Client not generated:**
   - Add `prisma generate` to build script
   - Or add `postinstall` script: `"postinstall": "prisma generate"`

2. **Type errors:**
   - Your `next.config.ts` has `ignoreBuildErrors: true`, but fix them for production

### Image Upload Issues

1. **CORS errors:**
   - Ensure upload API route has proper authentication
   - Check Vercel Blob token is set correctly

2. **File size limits:**
   - Vercel Blob: 4.5MB per file (free tier)
   - Consider image optimization before upload

---

## Post-Deployment Checklist

- [ ] Database migrations run successfully
- [ ] Environment variables configured
- [ ] Test user registration/login
- [ ] Test image uploads
- [ ] Test admin dashboard access
- [ ] Verify database connection
- [ ] Check error logs in Vercel dashboard
- [ ] Set up monitoring/alerts (optional)
- [ ] Configure backup strategy for database

---

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment)
- [NextAuth.js Deployment](https://next-auth.js.org/deployment)
- [Vercel Blob Storage Docs](https://vercel.com/docs/storage/vercel-blob)

---

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check Vercel function logs
3. Review Prisma migration status
4. Verify all environment variables are set correctly

Good luck with your deployment! 🚀















