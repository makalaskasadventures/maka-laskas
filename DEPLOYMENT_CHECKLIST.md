# Quick Deployment Checklist

Use this checklist to ensure a smooth deployment to Vercel.

## Pre-Deployment

- [ ] Code is pushed to GitHub repository
- [ ] All environment variables documented
- [ ] Dependencies are up to date (`npm install`)
- [ ] Project builds locally (`npm run build`)
- [ ] Database migrations are ready

## Vercel Setup

- [ ] Created Vercel account
- [ ] Connected GitHub repository to Vercel
- [ ] Project imported successfully

## Database Setup

- [ ] Created PostgreSQL database (Vercel Postgres or external)
- [ ] Database connection string obtained
- [ ] Environment variable `DATABASE_URL` or `POSTGRES_PRISMA_URL` added to Vercel
- [ ] Database migrations run on production database

## Storage Setup

- [ ] Created Vercel Blob store (or alternative storage)
- [ ] `BLOB_READ_WRITE_TOKEN` added to Vercel environment variables
- [ ] Upload API route created (`/api/upload/route.ts`)
- [ ] Image upload components updated to use new API

## Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

- [ ] `DATABASE_URL` or `POSTGRES_PRISMA_URL` (for database)
- [ ] `NEXTAUTH_URL` (set to your Vercel domain)
- [ ] `NEXTAUTH_SECRET` (generate with `openssl rand -base64 32`)
- [ ] `BLOB_READ_WRITE_TOKEN` (if using Vercel Blob)

## Build Configuration

- [ ] `package.json` includes `postinstall: "prisma generate"`
- [ ] `package.json` includes `build: "prisma generate && next build"`
- [ ] `vercel.json` configured (optional, Vercel auto-detects Next.js)

## Post-Deployment

- [ ] Deployment successful (no build errors)
- [ ] Site is accessible at Vercel URL
- [ ] Database connection working (test with `/api/test-db`)
- [ ] User registration/login works
- [ ] Admin dashboard accessible
- [ ] Image uploads working
- [ ] All API routes functioning

## Testing

- [ ] Test user registration
- [ ] Test user login
- [ ] Test admin access
- [ ] Test adventure creation
- [ ] Test image upload
- [ ] Test booking flow (if implemented)
- [ ] Test on mobile devices

## Security

- [ ] Environment variables are secure (not in code)
- [ ] `NEXTAUTH_SECRET` is strong and unique
- [ ] Database credentials are secure
- [ ] Admin routes are protected
- [ ] File uploads are validated

## Monitoring

- [ ] Check Vercel deployment logs
- [ ] Check Vercel function logs
- [ ] Set up error monitoring (optional)
- [ ] Set up analytics (optional)

## Optional Enhancements

- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Database backups configured
- [ ] Monitoring/alerting set up
- [ ] CDN configured (Vercel handles this automatically)

---

## Quick Commands Reference

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Run migrations on production
DATABASE_URL="your-production-url" npx prisma migrate deploy

# Seed production database (careful!)
DATABASE_URL="your-production-url" npm run db:seed

# Check deployment logs
vercel logs

# Pull environment variables locally
vercel env pull .env.local
```

---

## Common Issues & Solutions

### Build fails with "Prisma Client not generated"
- **Solution:** Ensure `postinstall` script includes `prisma generate`

### Database connection errors
- **Solution:** Check connection string format and SSL settings
- For Vercel Postgres, use `POSTGRES_PRISMA_URL`
- For external, add `?sslmode=require`

### Image upload fails
- **Solution:** Check `BLOB_READ_WRITE_TOKEN` is set correctly
- Verify file size limits (4.5MB for Vercel Blob free tier)

### NextAuth errors
- **Solution:** Ensure `NEXTAUTH_URL` matches your deployment URL
- Verify `NEXTAUTH_SECRET` is set and strong

---

**Need help?** Check the full deployment guide in `DEPLOYMENT.md`















