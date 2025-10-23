# Authentication System Documentation

## Overview

The Maka-Laskas Adventures app uses NextAuth.js for authentication with a custom credentials provider and role-based access control.

## Features

### User Roles
- **USER**: Regular customers who can browse adventures and make bookings
- **ADMIN**: Administrators who can access the admin dashboard and manage the system

### Authentication Methods
- Email/Password authentication
- Session-based authentication with JWT tokens
- Role-based route protection

## Database Schema

### User Model
```prisma
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  name          String?
  phone         String?
  avatar        String?
  password      String?  // Hashed with bcrypt
  emailVerified DateTime?
  role          UserRole @default(USER)
  isActive      Boolean  @default(true)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

### NextAuth Models
- **Account**: OAuth provider accounts
- **Session**: User sessions
- **VerificationToken**: Email verification tokens

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/signin` - User sign in (NextAuth)
- `POST /api/auth/signout` - User sign out (NextAuth)

### Admin
- `GET /api/admin/stats` - Admin dashboard statistics

## Pages

### Public Pages
- `/auth/signin` - Sign in page
- `/auth/signup` - Registration page

### Protected Pages
- `/admin` - Admin dashboard (ADMIN role required)

## Security Features

### Password Security
- Passwords are hashed using bcrypt with salt rounds of 12
- Minimum password length of 6 characters

### Route Protection
- Middleware protects admin routes
- Automatic redirect to sign-in for unauthenticated users
- Role-based access control

### Session Management
- JWT-based sessions
- Automatic session refresh
- Secure session storage

## Demo Credentials

### Admin User
- **Email**: admin@maka-laskas.com
- **Password**: admin123
- **Role**: ADMIN

### Regular User
- **Email**: sarah.johnson@example.com
- **Password**: admin123
- **Role**: USER

## Usage Examples

### Sign In
```typescript
import { signIn } from 'next-auth/react'

const result = await signIn('credentials', {
  email: 'user@example.com',
  password: 'password123',
  redirect: false,
})
```

### Check Authentication Status
```typescript
import { useSession } from 'next-auth/react'

const { data: session, status } = useSession()

if (session?.user?.role === 'ADMIN') {
  // Admin-only content
}
```

### Sign Out
```typescript
import { signOut } from 'next-auth/react'

await signOut({ callbackUrl: '/' })
```

## Environment Variables

```env
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
DATABASE_URL="postgresql://postgres:password@localhost:5432/maka_laskas?schema=public"
```

## Middleware Configuration

The middleware protects admin routes and redirects unauthorized users:

```typescript
// src/middleware.ts
export const config = {
  matcher: ['/admin/:path*']
}
```

## Components

### SessionProvider
Wraps the app to provide authentication context.

### Header Component
- Shows sign in/sign up buttons for unauthenticated users
- Shows user menu with sign out option for authenticated users
- Shows admin link for admin users

## Admin Dashboard

The admin dashboard includes:
- User statistics
- Adventure statistics
- Booking statistics
- Revenue tracking
- Quick action buttons
- Recent activity feed

## Future Enhancements

1. **OAuth Providers**: Add Google, Facebook, GitHub login
2. **Email Verification**: Implement email verification for new accounts
3. **Password Reset**: Add forgot password functionality
4. **Two-Factor Authentication**: Add 2FA for admin accounts
5. **User Profiles**: Allow users to update their profiles
6. **Activity Logging**: Track user actions for security
7. **Role Management**: Allow admins to manage user roles
8. **Session Management**: Allow users to view and manage active sessions
