# Quick Start: Connect Database & Storage to Vercel

## 🚀 5-Minute Setup

### 1. Create Vercel Postgres Database
- Vercel Dashboard → Your Project → **Storage** tab
- Click **Create Database** → Select **Postgres**
- Name it (e.g., `maka-laskas-db`) → **Create**

### 2. Create Vercel Blob Store
- Same **Storage** tab
- Click **Create Database** → Select **Blob**
- Name it (e.g., `maka-laskas-storage`) → **Create**

### 3. Add Environment Variables
Go to **Settings** → **Environment Variables** and add:

```
DATABASE_URL=[Copy value from POSTGRES_PRISMA_URL in Storage tab]
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=[Generate with: openssl rand -base64 32]
BLOB_READ_WRITE_TOKEN=[Already auto-created, verify it exists]
```

**Important:** Set for **Production**, **Preview**, and **Development** environments.

### 4. Redeploy
- Go to **Deployments** tab
- Click **⋯** on latest deployment → **Redeploy**

### 5. Verify
- Check build logs for successful migration
- Test your app - database and storage should work!

---

## ⚠️ Common Issues

**Database not connecting?**
- Verify `DATABASE_URL` matches `POSTGRES_PRISMA_URL` from Storage tab
- Ensure variable is set for correct environment

**Migrations failing?**
- Check `DATABASE_URL` is correct
- Verify database was created successfully
- Check build logs for specific errors

**File uploads not working?**
- Verify `BLOB_READ_WRITE_TOKEN` exists in Environment Variables
- Check file size (4.5MB limit for free tier)

---

## 📋 Full Guide
See `VERCEL_SETUP.md` for detailed instructions and troubleshooting.





