# How to Create Admin User in Vercel Database

This guide shows you how to add an admin user directly to your Prisma database in Vercel.

## Method 1: Using Vercel CLI (Recommended)

This is the easiest and recommended method. It pulls your Vercel environment variables and runs the script locally.

### Step 1: Install Vercel CLI (if not already installed)

```bash
npm i -g vercel
```

### Step 2: Pull Environment Variables from Vercel

Navigate to your project directory and pull the environment variables:

```bash
cd maka-laskas
vercel env pull .env.local
```

This will create a `.env.local` file with all your Vercel environment variables.

### Step 3: Run the Admin Creation Script

Run the script with the environment variables:

**Default Admin (Email: admin@maka-laskas.com, Password: admin123):**
```bash
npm run db:create-admin
```

**Custom Admin (specify email, password, and name):**
```bash
ADMIN_EMAIL=your-email@example.com ADMIN_PASSWORD=your-password ADMIN_NAME="Your Name" npm run db:create-admin
```

### Step 4: Verify the Admin User

The script will output confirmation messages. You should see:
```
✅ Admin user created successfully!

📧 Login Credentials:
   Email: admin@maka-laskas.com
   Password: admin123
```

---

## Method 2: Run Seed Script (Creates Admin + Sample Data)

If you want to create the admin user along with all sample data (countries, adventures, etc.), you can run the seed script:

```bash
# Pull environment variables first
vercel env pull .env.local

# Run the seed script
npm run db:seed
```

This will create:
- Admin user: `admin@maka-laskas.com` / `admin123`
- Sample countries and destinations
- Sample adventures
- Test users and testimonials

---

## Method 3: Using Vercel Database Interface (If Available)

Some Vercel database interfaces allow direct SQL access. If available:

1. Go to your Vercel Dashboard
2. Navigate to your project → **Storage** tab
3. Click on your PostgreSQL database
4. Look for a "SQL Editor" or "Query" option
5. Run this SQL (replace the password hash with your bcrypt hash):

```sql
INSERT INTO users (id, email, name, password, role, "isActive", "createdAt", "updatedAt")
VALUES (
  'clx1234567890',  -- Generate a unique ID (or let Prisma generate it)
  'admin@maka-laskas.com',
  'Admin User',
  '$2a$12$YourBcryptHashHere',  -- You'll need to hash the password first
  'ADMIN',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (email) DO UPDATE 
SET role = 'ADMIN', password = EXCLUDED.password, "isActive" = true;
```

**Note:** You'll need to hash the password first using bcrypt. The easiest way is to use Method 1.

---

## Method 4: Create a Temporary API Endpoint (For One-Time Use)

If you can't use the CLI, you can create a temporary API endpoint that creates the admin user. **⚠️ Delete this after use for security!**

1. Create `/api/admin/create-admin-user/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    // SECURITY: Only allow in development or with a secret token
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.ADMIN_CREATE_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { email = 'admin@maka-laskas.com', password = 'admin123', name = 'Admin User' } = await request.json()

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.upsert({
      where: { email },
      update: {
        role: 'ADMIN',
        password: hashedPassword,
        name,
        isActive: true,
      },
      create: {
        email,
        name,
        password: hashedPassword,
        role: 'ADMIN',
        isActive: true,
      }
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Admin user created/updated',
      email: user.email 
    })
  } catch (error) {
    console.error('Error creating admin:', error)
    return NextResponse.json({ error: 'Failed to create admin' }, { status: 500 })
  }
}
```

2. Add a temporary secret to Vercel environment variables:
   ```
   ADMIN_CREATE_SECRET=your-random-secret-here
   ```

3. Call the endpoint:
   ```bash
   curl -X POST https://your-app.vercel.app/api/admin/create-admin-user \
     -H "Authorization: Bearer your-random-secret-here" \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@maka-laskas.com","password":"admin123","name":"Admin User"}'
   ```

4. **⚠️ IMPORTANT:** Delete the endpoint file after use!

---

## Default Admin Credentials

After running the script, you can log in with:

- **Email:** `admin@maka-laskas.com`
- **Password:** `admin123`
- **Role:** `ADMIN`

**⚠️ Important:** Change the password immediately after first login for security!

---

## Troubleshooting

### "Cannot find module '@prisma/client'"
Make sure Prisma Client is generated:
```bash
npx prisma generate
```

### "Error: Can't reach database server"
- Verify your `DATABASE_URL` is correct in `.env.local`
- Check that your database is accessible from your network
- If using Vercel Postgres, ensure the connection string is correct

### "Unique constraint failed on email"
The user already exists. The script will update it instead. Check the console output.

---

## Security Notes

1. **Never commit `.env.local`** to git
2. **Change the default password** immediately after creating the admin
3. **Remove any temporary admin creation endpoints** after use
4. **Use strong passwords** for production admin accounts
5. **Consider 2FA** for admin accounts in the future

---

## Next Steps

After creating the admin user:

1. ✅ Log in at `/auth/signin` with your admin credentials
2. ✅ Access the admin dashboard at `/admin`
3. ✅ Change the password in your user settings (if available)
4. ✅ Start managing your adventures and content!





